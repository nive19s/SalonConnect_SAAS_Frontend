import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { useAuth } from './AuthProvider';
import type { PlatformRole, SalonRole } from '@/api/types';

function Loading() {
  return <Container><Spinner label="Checking your session" /></Container>;
}

function Forbidden({ message }: { message: string }) {
  return (
    <Container className="py-24">
      <h1 className="font-display text-display">No access</h1>
      <p className="mt-4 max-w-md text-lg text-ash">{message}</p>
      <Button to="/" className="mt-8">Back to home</Button>
    </Container>
  );
}

/** Signed-in users only. Anonymous visitors are sent to /login and returned afterwards. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const location = useLocation();
  if (status === 'loading') return <Loading />;
  if (status === 'anonymous') return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

/** Users who belong to at least one salon, optionally with one of `roles`. */
export function RequireSalonMember({ children, roles }: { children: ReactNode; roles?: SalonRole[] }) {
  const { me } = useAuth();
  return (
    <RequireAuth>
      {me && me.memberships.some((m) => !roles || roles.includes(m.role)) ? (
        children
      ) : (
        <Forbidden message="This area is for salon teams. Register your salon to get started." />
      )}
    </RequireAuth>
  );
}

/** Platform staff only (admin, support, finance). */
export function RequirePlatformRole({ children, roles }: { children: ReactNode; roles?: PlatformRole[] }) {
  const { me } = useAuth();
  const allowed = roles ?? ['PLATFORM_ADMIN', 'PLATFORM_SUPPORT', 'PLATFORM_FINANCE'];
  return (
    <RequireAuth>
      {me && me.roles.some((r) => allowed.includes(r)) ? children : <Forbidden message="This area is for Glamora staff." />}
    </RequireAuth>
  );
}
