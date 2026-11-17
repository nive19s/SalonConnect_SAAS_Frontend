// Backend error contract: RFC 9457 problem details with a stable `code` (shared/error/ErrorCode.java).

export type ErrorCode =
  | 'VALIDATION_FAILED' | 'MALFORMED_REQUEST'
  | 'UNAUTHENTICATED' | 'INVALID_CREDENTIALS' | 'INVALID_TOKEN'
  | 'ACCESS_DENIED' | 'TENANT_ACCESS_DENIED' | 'ACCOUNT_DISABLED'
  | 'NOT_FOUND'
  | 'CONFLICT' | 'EMAIL_ALREADY_REGISTERED' | 'CONCURRENT_MODIFICATION'
  | 'IDEMPOTENT_REQUEST_IN_PROGRESS' | 'SLOT_UNAVAILABLE'
  | 'IDEMPOTENCY_KEY_REUSED' | 'BUSINESS_RULE_VIOLATION' | 'INVALID_STATE_TRANSITION'
  | 'RATE_LIMITED' | 'INTERNAL_ERROR'
  // client-side only
  | 'NETWORK_ERROR' | 'UNKNOWN';

export interface FieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: ErrorCode,
    message: string,
    readonly correlationId?: string,
    readonly fieldErrors: FieldError[] = [],
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

const FRIENDLY: Partial<Record<ErrorCode, string>> = {
  INVALID_CREDENTIALS: 'Email or password is incorrect.',
  ACCOUNT_DISABLED: 'This account is not active. Please contact support.',
  EMAIL_ALREADY_REGISTERED: 'An account with this email already exists. Try logging in instead.',
  RATE_LIMITED: 'Too many attempts. Please wait a moment and try again.',
  NETWORK_ERROR: 'We could not reach the server. Check your connection and try again.',
  TENANT_ACCESS_DENIED: 'You do not have access to this salon.',
  ACCESS_DENIED: 'You do not have permission to do that.',
  CONCURRENT_MODIFICATION: 'Someone else changed this. Reload the page and try again.',
  IDEMPOTENT_REQUEST_IN_PROGRESS: 'This request is already being processed. Please wait a moment.',
  SLOT_UNAVAILABLE: 'That time was just taken. Please pick another.',
};

/** Message that is safe to show to a visitor. Includes the reference id for unexpected errors. */
export function userMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (!isApiError(error)) return fallback;
  const friendly = FRIENDLY[error.code];
  if (friendly) return friendly;
  if (error.code === 'INTERNAL_ERROR' || error.code === 'UNKNOWN') {
    return error.correlationId ? `${fallback} (reference ${error.correlationId})` : fallback;
  }
  return error.message || fallback;
}
