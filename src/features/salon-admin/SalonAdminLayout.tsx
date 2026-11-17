import PortalLayout, { type PortalNavItem } from '@/components/portal/PortalLayout';
import { ActiveSalonProvider, useActiveSalon } from './ActiveSalon';
import type { SalonPermission } from '@/lib/permissions';

const NAV: (PortalNavItem & { needs: SalonPermission })[] = [
  { label: 'Dashboard', to: '/salon-admin', end: true, needs: 'VIEW_BUSINESS' },
  { label: 'Calendar', to: '/salon-admin/calendar', needs: 'VIEW_ALL_BOOKINGS' },
  { label: 'Appointments', to: '/salon-admin/appointments', needs: 'VIEW_ALL_BOOKINGS' },
  { label: 'Beauticians', to: '/salon-admin/beauticians', needs: 'MANAGE_STAFF_SCHEDULES' },
  { label: 'Services', to: '/salon-admin/services', needs: 'MANAGE_CATALOGUE' },
  { label: 'Schedule', to: '/salon-admin/schedule', needs: 'MANAGE_STAFF_SCHEDULES' },
  { label: 'Branches', to: '/salon-admin/branches', needs: 'VIEW_BUSINESS' },
  { label: 'Settings', to: '/salon-admin/settings', needs: 'VIEW_BUSINESS' },
];

function Switcher() {
  const { membership, options, setActive } = useActiveSalon();
  if (options.length < 2) return null;
  return (
    <label className="block text-xs text-ash">
      Salon
      <select
        className="mt-1 block w-full border border-ink bg-paper px-2 py-2 text-sm text-ink"
        value={membership.salonBusinessId}
        onChange={(e) => setActive(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.membership.salonBusinessId} value={o.membership.salonBusinessId}>
            {o.salon?.displayName ?? 'Loading…'}
          </option>
        ))}
      </select>
    </label>
  );
}

function Shell() {
  const { can } = useActiveSalon();
  return <PortalLayout title="Salon admin" nav={NAV.filter((n) => can(n.needs))} switcher={<Switcher />} />;
}

export default function SalonAdminLayout() {
  return (
    <ActiveSalonProvider>
      <Shell />
    </ActiveSalonProvider>
  );
}
