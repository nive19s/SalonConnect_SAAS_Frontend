import type { ReactNode } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export interface PortalNavItem {
  label: string;
  to: string;
  end?: boolean;
}

interface Props {
  title: string;
  nav: PortalNavItem[];
  /** Optional control shown above the nav, e.g. the salon switcher. */
  switcher?: ReactNode;
}

/** App shell for staff-facing areas: top bar, sidebar on desktop, scrolling tab bar on mobile. */
export default function PortalLayout({ title, nav, switcher }: Props) {
  const { me, logout } = useAuth();

  return (
    <div className="min-h-screen bg-bone">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-2xl" aria-label="Glamora home">Glamora</Link>
            <span className="hidden text-sm text-ash sm:inline">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm sm:inline">{me?.fullName}</span>
            <Button variant="outline" onClick={() => void logout()}>Log out</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-[14rem_1fr] md:gap-10 md:px-8 md:py-8">
        <aside className="bg-paper md:bg-transparent">
          <nav aria-label={title} className="flex gap-1 overflow-x-auto border-b border-line px-5 py-3 md:flex-col md:border-0 md:px-0 md:py-0">
            {switcher && <div className="mr-4 shrink-0 md:mb-6 md:mr-0">{switcher}</div>}
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn('shrink-0 px-3 py-2 text-sm transition-colors', isActive ? 'bg-ink text-paper' : 'hover:bg-line')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 px-5 py-8 md:px-0 md:py-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
