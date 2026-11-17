import { formatDay, formatDuration, formatPrice } from '@/lib/format';
import Img from '@/components/ui/Img';
import type { Salon } from '@/types/domain';
import type { BookingState } from '../bookingReducer';

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line py-3 text-sm">
      <dt className="text-ash">{label}</dt>
      <dd className="text-right font-medium">{value ?? '—'}</dd>
    </div>
  );
}

export default function Summary({ salon, state }: { salon: Salon; state: BookingState }) {
  const { service, stylist, date, time } = state;
  return (
    <aside className="border border-ink p-6 lg:sticky lg:top-28">
      <Img photo={salon.cover} alt="" ratio="aspect-[16/9]" sizes="(min-width: 1024px) 30vw, 100vw" widths={[400, 640]} />
      <h2 className="mt-5 font-display text-2xl">{salon.name}</h2>
      <p className="mt-1 text-sm text-ash">{salon.area}</p>
      <dl className="mt-6">
        <Row label="Service" value={service?.name} />
        <Row label="Duration" value={service && formatDuration(service.durationMinutes)} />
        <Row label="Stylist" value={stylist?.name} />
        <Row label="When" value={date && time ? `${formatDay(date)}, ${time}` : null} />
      </dl>
      <p className="mt-6 flex items-baseline justify-between">
        <span className="text-sm text-ash">Total, pay at the salon</span>
        <span className="font-display text-2xl">{service ? formatPrice(service.price) : '—'}</span>
      </p>
    </aside>
  );
}
