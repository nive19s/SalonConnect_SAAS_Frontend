import { categories } from '@/data/services';
import { formatDuration, formatPrice } from '@/lib/format';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import type { Service } from '@/types/domain';

interface Props { salonId: string; services: Service[]; loading: boolean }

export default function ServiceMenu({ salonId, services, loading }: Props) {
  if (loading) return <Spinner label="Loading services" />;

  return (
    <div className="space-y-12">
      {categories
        .filter((c) => services.some((s) => s.categoryId === c.id))
        .map((c) => (
          <div key={c.id}>
            <h3 className="font-display text-2xl md:text-3xl">{c.name}</h3>
            <ul className="mt-4 border-t border-ink">
              {services
                .filter((s) => s.categoryId === c.id)
                .map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4 border-b border-line py-5">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="mt-1 text-sm text-ash">{formatDuration(s.durationMinutes)} · {formatPrice(s.price)}</p>
                    </div>
                    <Button to={`/salons/${salonId}/book?service=${s.id}`} variant="outline" aria-label={`Book ${s.name}`}>
                      Book
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
