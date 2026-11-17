import { ApiError, type ErrorCode, type FieldError } from './errors';
import { tokenStore } from './tokenStore';
import type { TokenResponse } from './types';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');

/** Fired when the refresh token is rejected, so the UI can drop the session. */
export const SESSION_ENDED_EVENT = 'glamora:session-ended';

interface RawOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
  idempotencyKey?: string;
  signal?: AbortSignal;
}

export interface RequestOptions extends Omit<RawOptions, 'token'> {
  /** Attach the bearer token (default true). Auth endpoints pass false. */
  auth?: boolean;
}

async function rawFetch<T>(path: string, opts: RawOptions): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.idempotencyKey) headers['Idempotency-Key'] = opts.idempotencyKey;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: opts.method ?? 'GET',
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') throw cause;
    throw new ApiError(0, 'NETWORK_ERROR', 'Network error');
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const json: unknown = text ? safeParse(text) : undefined;

  if (!res.ok) throw toApiError(res.status, json, res.headers.get('X-Correlation-Id') ?? undefined);
  return json as T;
}

const safeParse = (text: string): unknown => {
  try { return JSON.parse(text); } catch { return undefined; }
};

function toApiError(status: number, body: unknown, headerCorrelationId?: string): ApiError {
  const problem = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const code = (typeof problem.code === 'string' ? problem.code : status >= 500 ? 'INTERNAL_ERROR' : 'UNKNOWN') as ErrorCode;
  const detail = typeof problem.detail === 'string' ? problem.detail : 'Request failed.';
  const correlationId = typeof problem.correlationId === 'string' ? problem.correlationId : headerCorrelationId;
  const fieldErrors = Array.isArray(problem.errors) ? (problem.errors as FieldError[]) : [];
  return new ApiError(status, code, detail, correlationId, fieldErrors);
}

// ---------------------------------------------------------------- refresh

let inFlightRefresh: Promise<boolean> | null = null;

/**
 * Refresh tokens rotate on every use, and the API treats re-use of an old token as theft
 * (it revokes ALL sessions). So refreshes must never run in parallel:
 *  - within one tab, concurrent callers share one promise;
 *  - across tabs, the Web Locks API serialises them, and the latest token is re-read from storage inside the lock.
 */
export function refreshSession(): Promise<boolean> {
  if (!inFlightRefresh) {
    const run: Promise<boolean> = navigator.locks ? (navigator.locks.request('glamora-refresh', runRefresh) as unknown as Promise<boolean>) : runRefresh();
    inFlightRefresh = run.finally(() => { inFlightRefresh = null; });
  }
  return inFlightRefresh;
}

async function runRefresh(): Promise<boolean> {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return false;
  try {
    const session = await rawFetch<TokenResponse>('/api/v1/auth/refresh', { method: 'POST', body: { refreshToken } });
    tokenStore.setSession(session);
    return true;
  } catch (e) {
    if (e instanceof ApiError && e.code === 'NETWORK_ERROR') throw e; // offline: keep the session
    tokenStore.clear();
    window.dispatchEvent(new Event(SESSION_ENDED_EVENT));
    return false;
  }
}

// ---------------------------------------------------------------- public API

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { auth = true, ...rest } = opts;

  if (auth && tokenStore.hasRefreshToken() && tokenStore.accessExpiresSoon()) {
    await refreshSession();
  }

  try {
    return await rawFetch<T>(path, { ...rest, token: auth ? tokenStore.getAccessToken() : null });
  } catch (e) {
    const expired = e instanceof ApiError && e.status === 401 && (e.code === 'INVALID_TOKEN' || e.code === 'UNAUTHENTICATED');
    if (auth && expired && tokenStore.hasRefreshToken() && (await refreshSession())) {
      return rawFetch<T>(path, { ...rest, token: tokenStore.getAccessToken() });
    }
    throw e;
  }
}

/** A fresh key per user action. Keep the same key for retries of the same action. */
export const newIdempotencyKey = (): string => crypto.randomUUID();
