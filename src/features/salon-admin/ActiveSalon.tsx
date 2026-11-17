import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import { salonApi } from '@/api/salon.api';
import type { MembershipView, SalonBusiness } from '@/api/types';
import { useAuth } from '@/features/auth/AuthProvider';
import { roleCan, type SalonPermission } from '@/lib/permissions';

const STORAGE_KEY = 'glamora.activeSalon';

interface ActiveSalonValue {
  membership: MembershipView;
  salon: SalonBusiness | undefined;
  salonLoading: boolean;
  options: { membership: MembershipView; salon: SalonBusiness | undefined }[];
  setActive: (salonBusinessId: string) => void;
  can: (permission: SalonPermission) => boolean;
}

const Ctx = createContext<ActiveSalonValue | null>(null);

/**
 * The user can belong to several salons. The backend returns membership ids from /me, so the
 * names come from one GET per salon (cached). Adding the name and status to MembershipView on
 * the backend would remove these extra calls.
 */
export function ActiveSalonProvider({ children }: { children: ReactNode }) {
  const { me } = useAuth();
  const memberships = me?.memberships ?? [];
  const [activeId, setActiveId] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });

  const results = useQueries({
    queries: memberships.map((m) => ({
      queryKey: ['salon', m.salonBusinessId],
      queryFn: () => salonApi.get(m.salonBusinessId),
      staleTime: 60_000,
    })),
  });

  const membership = memberships.find((m) => m.salonBusinessId === activeId) ?? memberships[0];

  useEffect(() => {
    if (membership) try { localStorage.setItem(STORAGE_KEY, membership.salonBusinessId); } catch { /* ignore */ }
  }, [membership]);

  const value = useMemo<ActiveSalonValue | null>(() => {
    if (!membership) return null;
    const idx = memberships.findIndex((m) => m.salonBusinessId === membership.salonBusinessId);
    return {
      membership,
      salon: results[idx]?.data,
      salonLoading: !!results[idx]?.isLoading,
      options: memberships.map((m, i) => ({ membership: m, salon: results[i]?.data })),
      setActive: setActiveId,
      can: (p) => roleCan(membership.role, p),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membership, results.map((r) => r.data?.id).join(','), results.map((r) => r.isLoading).join(',')]);

  if (!value) return null;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useActiveSalon(): ActiveSalonValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useActiveSalon must be used inside <ActiveSalonProvider>');
  return ctx;
}
