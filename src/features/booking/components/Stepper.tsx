import { STEPS } from '../bookingReducer';
import { cn } from '@/lib/cn';

/** Completed steps are buttons so people can go back; later steps are inert. */
export default function Stepper({ current, onNavigate }: { current: number; onNavigate: (step: number) => void }) {
  return (
    <nav aria-label="Booking progress">
      <ol className="flex gap-2 md:gap-4">
        {STEPS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                disabled={!done}
                onClick={() => onNavigate(i)}
                aria-current={active ? 'step' : undefined}
                className={cn('w-full border-t-2 pt-3 text-left text-sm', done || active ? 'border-ink' : 'border-line text-ash', done && 'hover:opacity-70')}
              >
                <span className="hidden md:inline">{i + 1}. </span>{label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
