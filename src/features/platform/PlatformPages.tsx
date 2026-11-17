import PortalLayout from '@/components/portal/PortalLayout';
import ComingSoon from '@/components/portal/ComingSoon';

export const PlatformLayout = () => (
  <PortalLayout
    title="Platform admin"
    nav={[
      { label: 'Overview', to: '/platform', end: true },
      { label: 'Salons', to: '/platform/salons' },
      { label: 'Customers', to: '/platform/customers' },
      { label: 'Reports', to: '/platform/reports' },
    ]}
  />
);

export const PlatformOverview = () => (
  <ComingSoon title="Overview" description="Watch over the platform: new salons, bookings and issues." needs="the platform module (/api/v1/platform/**) and an admin bootstrap" planned={['Salons waiting for approval', 'Booking volume', 'Open complaints']} />
);
export const PlatformSalons = () => (
  <ComingSoon title="Salons" description="Review new salons, then approve, request changes, reject or suspend." needs="GET /api/v1/platform/salons and the approve and reject actions" planned={['Approval queue with details', 'Approve, or reject with a required reason', 'Suspend with a summary of affected bookings']} />
);
export const PlatformCustomers = () => (
  <ComingSoon title="Customers" description="Find customers and help with account issues." needs="the platform module" planned={['Search customers', 'Suspend or reactivate accounts']} />
);
export const PlatformReports = () => (
  <ComingSoon title="Reports" description="Platform-wide numbers." needs="the reports module" planned={['Bookings and revenue', 'Salon sign-ups and approvals']} />
);
