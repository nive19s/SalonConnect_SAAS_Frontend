import ComingSoon from '@/components/portal/ComingSoon';

export const CalendarPage = () => (
  <ComingSoon title="Calendar" description="Run the day on one calendar: see every beautician's bookings, move them and add walk-ins." needs="the scheduling and booking modules" planned={['Day and week view per beautician', 'Drag to reschedule', 'Add walk-in bookings']} />
);
export const AppointmentsAdminPage = () => (
  <ComingSoon title="Appointments" description="Handle booking requests and see every appointment." needs="the booking module" planned={['Accept or reject pending requests', 'Check in, start and complete visits', 'Mark no-shows']} />
);
export const BeauticiansPage = () => (
  <ComingSoon title="Beauticians" description="Manage your team and what each person can do." needs="the staff module" planned={['Invite and deactivate beauticians', 'Link services to beauticians', 'Set roles and branch access']} />
);
export const ServicesPage = () => (
  <ComingSoon title="Services" description="Build your menu with prices and durations." needs="the service catalogue module" planned={['Categories and services', 'Branch prices', 'Switch services on and off']} />
);
export const SchedulePage = () => (
  <ComingSoon title="Schedule" description="Set working hours, breaks and time off." needs="the scheduling module" planned={['Weekly hours per branch and beautician', 'Block time off and holidays', 'Booking rules: notice, cancel limits, booking window']} />
);
