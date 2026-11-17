import { request } from './client';
import type { LoginRequest, MeResponse, RegisterRequest, TokenResponse } from './types';

export const authApi = {
  register: (body: RegisterRequest) => request<TokenResponse>('/api/v1/auth/register', { method: 'POST', body, auth: false }),
  login: (body: LoginRequest) => request<TokenResponse>('/api/v1/auth/login', { method: 'POST', body, auth: false }),
  logout: (refreshToken: string) =>
    request<void>('/api/v1/auth/logout', { method: 'POST', body: { refreshToken }, auth: false }),
  me: () => request<MeResponse>('/api/v1/me'),
};
