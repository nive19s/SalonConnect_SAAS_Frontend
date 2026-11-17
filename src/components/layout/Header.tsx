import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '@/config/site';
import { useAuth } from '@/features/auth/AuthProvider';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Close, Menu } from '@/components/ui/Icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { status, me, logout } = useAuth();
  const signedIn = status === 'authenticated';
  const hasSalon = (me?.memberships.length ?? 0) > 0;
  const isStaff = me?.roles.some((r) => r.startsWith('PLATFORM_')) ?? false;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="font-display text-2xl tracking-tight md:text-3xl" aria-label="Glamora home">
          Glamora
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <NavLink key={item.label} to={item.to} className="link-underline pb-1 text-sm font-medium">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-6 md:flex">
            {signedIn ? (
              <>
                {hasSalon && <Link to="/salon-admin" className="link-underline text-sm font-medium">Salon admin</Link>}
                {isStaff && <Link to="/platform" className="link-underline text-sm font-medium">Platform</Link>}
                <Link to="/account" className="link-underline text-sm font-medium">{me?.fullName.split(' ')[0] ?? 'Account'}</Link>
              </>
            ) : (
              status !== 'loading' && <Link to="/login" className="link-underline text-sm font-medium">Log in</Link>
            )}
          </div>
          <Button to="/salons" size="md" className="hidden sm:inline-flex">Book now</Button>
          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close width={26} height={26} /> : <Menu width={26} height={26} />}
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper md:hidden">
        <Container as="nav" aria-label="Mobile" className="flex flex-col gap-2 py-8">
          {site.nav.map((item) => (
            <Link key={item.label} to={item.to} className="border-b border-line py-5 font-display text-4xl">{item.label}</Link>
          ))}
          {signedIn ? (
            <>
              <Link to="/account" className="border-b border-line py-5 font-display text-4xl">My account</Link>
              {hasSalon && <Link to="/salon-admin" className="border-b border-line py-5 font-display text-4xl">Salon admin</Link>}
              {isStaff && <Link to="/platform" className="border-b border-line py-5 font-display text-4xl">Platform</Link>}
              <Button variant="outline" size="lg" className="mt-8" onClick={() => void logout()}>Log out</Button>
            </>
          ) : (
            <Link to="/login" className="border-b border-line py-5 font-display text-4xl">Log in</Link>
          )}
          <Button to="/salons" size="lg" className="mt-4">Book now</Button>
        </Container>
      </div>
    </header>
  );
}
