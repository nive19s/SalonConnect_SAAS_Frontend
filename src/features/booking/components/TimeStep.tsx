import { useMemo } from 'react';
import { getSlots } from '@/mocks/marketplaceApi';
import { useAsync } from '@/hooks/useAsync';
import { nextDays } from '@/lib/dates';
import { formatDay } from '@/lib/format';
import { cn } from '@/lib/cn';
import Spinner from '@/components/ui/Spinner';
import type { Service, Stylist } from '@/types/domain';

interface Props {
  service: Service;
  stylist: Stylist;
  date: string | null;
  time: string | null;
  onDate: (date: string) => void;
  onTime: (time: string) => void;
}

export default function TimeStep({ service, stylist, date, time, onDate, onTime }: Props) {
  const days = useMemo(() => nextDays(14), []);
  const { data: slots, loading } = useAsync(
    () => (date ? getSlots({ date, stylistId: stylist.id, durationMinutes: service.durationMinutes }) : Promise.resolve([])),
    [date, stylist.id, service.durationMinutes],
  );

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-medium">Choose a day</h3>
        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Day">
          {days.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={date === d}
              onClick={() => onDate(d)}
              className={cn('shrink-0 border border-ink px-4 py-3 text-sm transition-colors', date === d ? 'bg-ink text-paper' : 'hover:bg-bone')}
            >
              {formatDay(d)}
            </button>
          ))}
        </div>
      </div>

      {date && (
        <div aria-live="polite">
          <h3 className="text-sm font-medium">Choose a time</h3>
          {loading || !slots ? (
            <Spinner label="Checking availability" />
          ) : (
            <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {slots.map((s) => (
                <li key={s.time}>
                  <button
                    type="button"
                    disabled={!s.available}
                    aria-pressed={time === s.time}
                    onClick={() => onTime(s.time)}
                    className={cn(
                      'w-full border border-ink py-3 text-sm transition-colors',
                      time === s.time ? 'bg-ink text-paper' : 'hover:bg-bone',
                      !s.available && 'border-line text-ash line-through hover:bg-transparent',
                    )}
                  >
                    {s.time}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
