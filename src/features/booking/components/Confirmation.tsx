import { formatDay } from '@/lib/format';
import Button from '@/components/ui/Button';
import { Check } from '@/components/ui/Icons';
import type { Appointment, Salon } from '@/types/domain';

interface Props {
  booking: Appointment;
  salon: Salon;
  onReset: () => void;
}

export default function Confirmation({ booking, salon, onReset }: Props) {
  return (
    <div className="max-w-xl">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper"><Check width={26} height={26} /></span>
      <h1 className="mt-8 font-display text-display">You are booked.</h1>
      <p className="mt-4 text-lg text-ash">
        {booking.service.name} at {salon.name} on {formatDay(booking.date)} at {booking.time}.
        We will send a reminder to {booking.details.phone}.
      </p>
      <p className="mt-6 text-sm">Booking reference: <span className="font-medium">{booking.id}</span></p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/account/appointments" variant="outline">My appointments</Button>
        <Button to={`/salons/${salon.id}`} variant="outline">Back to {salon.name}</Button>
        <Button onClick={onReset}>Book another service</Button>
      </div>
    </div>
  );
}
