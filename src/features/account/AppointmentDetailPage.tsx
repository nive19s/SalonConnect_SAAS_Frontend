import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelMyAppointment, getMyAppointment } from '@/mocks/marketplaceApi';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDay, formatDuration, formatPrice } from '@/lib/format';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

export default function AppointmentDetailPage() {
  useDocumentTitle('Appointment');
  const { bookingId = '' } = useParams();
  const queryClient = useQueryClient();
  const { data: a, isLoading } = useQuery({ queryKey: ['my-appointment', bookingId], queryFn: () => getMyAppointment(bookingId) });

  const cancel = useMutation({
    mutationFn: () => cancelMyAppointment(bookingId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['my-appointment', bookingId] });
      void queryClient.invalidateQueries({ queryKey: ['my-appointments'] });
    },
  });

  if (isLoading) return <Spinner label="Loading appointment" />;
  if (!a) return <div><p className="text-ash">We could not find that appointment.</p><Button to="/account/appointments" className="mt-6">Back to appointments</Button></div>;

  const rows: [string, string][] = [
    ['Salon', a.salonName],
    ['Service', `${a.service.name} (${formatDuration(a.service.durationMinutes)})`],
    ['Stylist', a.stylist.name],
    ['When', `${formatDay(a.date)}, ${a.time}`],
    ['Price', `${formatPrice(a.service.price)}, pay at the salon`],
    ['Status', a.status === 'CONFIRMED' ? 'Confirmed' : a.status === 'COMPLETED' ? 'Completed' : 'Cancelled'],
    ['Reference', a.id],
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <Link to="/account/appointments" className="link-underline text-sm">Back to appointments</Link>
      <h2 className="font-display text-4xl">{a.service.name}</h2>
      <dl className="divide-y divide-line border-y border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]"><dt className="text-sm text-ash">{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3">
        <Button to={`/salons/${a.salonId}/book?service=${a.service.id}`}>Book again</Button>
        {a.status === 'CONFIRMED' && (
          <Button variant="outline" disabled={cancel.isPending} onClick={() => { if (window.confirm('Cancel this appointment?')) cancel.mutate(); }}>
            {cancel.isPending ? 'Cancelling…' : 'Cancel appointment'}
          </Button>
        )}
      </div>
    </div>
  );
}
