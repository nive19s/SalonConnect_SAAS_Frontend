import { NavLink, Outlet } from 'react-router-dom';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/cn';

const tabs = [
  { label: 'Profile', to: '/account', end: true },
  { label: 'Appointments', to: '/account/appointments', end: false },
];

export default function AccountLayout() {
  return (
    <Container className="py-10 md:py-16">
      <h1 className="font-display text-display">My account</h1>
      <nav aria-label="Account" className="mt-8 flex gap-8 border-b border-line">
        {tabs.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => cn('-mb-px border-b-2 pb-3 text-sm font-medium', isActive ? 'border-ink' : 'border-transparent text-ash hover:text-ink')}>
            {t.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-10"><Outlet /></div>
    </Container>
  );
}
