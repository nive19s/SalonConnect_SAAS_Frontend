import { ratingBreakdown } from '@/data/reviews';
import Stars from '@/components/ui/Stars';
import Spinner from '@/components/ui/Spinner';
import type { Review, Salon } from '@/types/domain';

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

interface Props { salon: Salon; reviews: Review[] | null; loading: boolean }

export default function ReviewList({ salon, reviews, loading }: Props) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
      <div>
        <p className="font-display text-7xl">{salon.rating}</p>
        <Stars value={salon.rating} size={20} />
        <p className="mt-2 text-sm text-ash">{salon.reviews} reviews</p>
        <ul className="mt-6 space-y-2">
          {ratingBreakdown.map((r) => (
            <li key={r.stars} className="flex items-center gap-3 text-sm">
              <span className="w-3">{r.stars}</span>
              <span className="h-1.5 flex-1 bg-line"><span className="block h-full bg-ink" style={{ width: `${r.percent}%` }} /></span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {loading && <Spinner label="Loading reviews" />}
        <ul className="border-t border-ink">
          {(reviews ?? []).map((r) => (
            <li key={r.id} className="border-b border-line py-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium">{r.name}</p>
                <time className="text-sm text-ash" dateTime={r.date}>{dateFmt.format(new Date(r.date))}</time>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Stars value={r.rating} size={14} />
                <span className="text-sm text-ash">{r.service}</span>
              </div>
              <p className="mt-3 max-w-prose leading-relaxed">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
