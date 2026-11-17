import PortalLayout from '@/components/portal/PortalLayout';
import ComingSoon from '@/components/portal/ComingSoon';
import { ActiveSalonProvider } from './ActiveSalon';

export function BeauticianLayout() {
  return (
    <ActiveSalonProvider>
      <PortalLayout title="My day" nav={[{ label: 'Today', to: '/beautician', end: true }, { label: 'My schedule', to: '/beautician/schedule' }]} />
    </ActiveSalonProvider>
  );
}

export const BeauticianToday = () => (
  <ComingSoon title="Today" description="Your appointments for today, in order, with client notes." needs="the booking and staff modules" planned={['Today’s appointments', 'Client notes', 'Mark visit started and finished']} />
);
export const BeauticianSchedule = () => (
  <ComingSoon title="My schedule" description="Your weekly hours and time off." needs="the scheduling module" planned={['Your weekly hours', 'Request time off']} />
);
