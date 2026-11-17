import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { refreshSession, SESSION_ENDED_EVENT } from '@/api/client';
import { tokenStore } from '@/api/tokenStore';
import type { LoginRequest, MeResponse, RegisterRequest } from '@/api/types';

type Status = 'loading' | 'anonymous' | 'authenticated';

interface AuthContextValue {
  status: Status;
  me: MeResponse | null;
  login: (body: LoginRequest) => Promise<MeResponse>;
  register: (body: RegisterRequest) => Promise<MeResponse>;
  logout: () => Promise<void>;
  reloadMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<Status>(() => (tokenStore.hasRefreshToken() ? 'loading' : 'anonymous'));
  const [me, setMe] = useState<MeResponse | null>(null);

  const endSession = useCallback(() => {
    tokenStore.clear();
    setMe(null);
    setStatus('anonymous');
    queryClient.clear();
  }, [queryClient]);

  // Restore the session on page load: refresh token -> access token -> /me.
  useEffect(() => {
    if (!tokenStore.hasRefreshToken()) return;
    let cancelled = false;
    (async () => {
      try {
        const ok = await refreshSession();
        if (!ok) throw new Error('no session');
        const profile = await authApi.me();
        if (!cancelled) { setMe(profile); setStatus('authenticated'); }
      } catch {
        if (!cancelled) setStatus('anonymous');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // The API client fires this when the refresh token is rejected (expired, revoked, reused).
  useEffect(() => {
    window.addEventListener(SESSION_ENDED_EVENT, endSession);
    return () => window.removeEventListener(SESSION_ENDED_EVENT, endSession);
  }, [endSession]);

  const startSession = useCallback(async (promise: ReturnType<typeof authApi.login>) => {
    const session = await promise;
    tokenStore.setSession(session);
    const profile = await authApi.me();
    setMe(profile);
    setStatus('authenticated');
    return profile;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      me,
      login: (body) => startSession(authApi.login(body)),
      register: (body) => startSession(authApi.register(body)),
      logout: async () => {
        const refreshToken = tokenStore.getRefreshToken();
        if (refreshToken) await authApi.logout(refreshToken).catch(() => undefined);
        endSession();
      },
      reloadMe: async () => setMe(await authApi.me()),
    }),
    [status, me, startSession, endSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
