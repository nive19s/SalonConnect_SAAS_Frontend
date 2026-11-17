import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyAppointments } from '@/mocks/marketplaceApi';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDay, formatPrice } from '@/lib/format';
import { Notice } from '@/components/ui/Form';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import type { Appointment } from '@/types/domain';

const today = () => new Date().toISOString().slice(0, 10);

function Row({ a }: { a: Appointment }) {
  return (
    <li>
      <Link to={`/account/appointments/${a.id}`} className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-5 hover:bg-bone sm:px-3">
        <div>
          <p className="font-display text-2xl">{a.service.name}</p>
          <p className="mt-1 text-sm text-ash">{a.salonName} · with {a.stylist.name}</p>
        </div>
        <div className="text-right text-sm">
          <p>{formatDay(a.date)}, {a.time}</p>
          <p className="mt-1 text-ash">{a.status === 'CANCELLED' ? 'Cancelled' : a.status === 'COMPLETED' ? 'Completed' : formatPrice(a.service.price)}</p>
        </div>
      </Link>
    </li>
  );
}

export default function AppointmentsPage() {
  useDocumentTitle('My appointments');
  const { data, isLoading } = useQuery({ queryKey: ['my-appointments'], queryFn: getMyAppointments });

  if (isLoading || !data) return <Spinner label="Loading appointments" />;

  const upcoming = data.filter((a) => a.status === 'CONFIRMED' && a.date >= today());
  const past = data.filter((a) => !upcoming.includes(a));

  return (
    <div className="max-w-3xl space-y-12">
      <Notice tone="info">These are sample appointments. Real bookings will appear here once the booking service is connected.</Notice>

      <section>
        <h2 className="font-display text-3xl">Upcoming</h2>
        {upcoming.length === 0 ? (
          <div className="mt-4 space-y-4"><p className="text-ash">No upcoming appointments.</p><Button to="/salons">Find a salon</Button></div>
        ) : (
          <ul className="mt-4 border-t border-ink">{upcoming.map((a) => <Row key={a.id} a={a} />)}</ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-3xl">Past</h2>
        {past.length === 0 ? <p className="mt-4 text-ash">Nothing yet.</p> : <ul className="mt-4 border-t border-ink">{past.map((a) => <Row key={a.id} a={a} />)}</ul>}
      </section>
    </div>
  );
}
