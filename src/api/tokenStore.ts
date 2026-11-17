import type { TokenResponse } from './types';

// Access token: memory only (lost on reload, restored via refresh).
// Refresh token: localStorage until the backend can set an httpOnly cookie.
const REFRESH_KEY = 'glamora.refreshToken';

let access: { token: string; expiresAt: number } | null = null;

const read = (): string | null => {
  try { return localStorage.getItem(REFRESH_KEY); } catch { return null; }
};

export const tokenStore = {
  getAccessToken: () => access?.token ?? null,
  /** True when there is no access token or it expires within `skewMs`. */
  accessExpiresSoon: (skewMs = 30_000) => !access || access.expiresAt - Date.now() < skewMs,
  getRefreshToken: read,
  hasRefreshToken: () => read() !== null,
  setSession(t: TokenResponse) {
    access = { token: t.accessToken, expiresAt: Date.parse(t.accessTokenExpiresAt) };
    try { localStorage.setItem(REFRESH_KEY, t.refreshToken); } catch { /* storage blocked */ }
  },
  clear() {
    access = null;
    try { localStorage.removeItem(REFRESH_KEY); } catch { /* storage blocked */ }
  },
};
