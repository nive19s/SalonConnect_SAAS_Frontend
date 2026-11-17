import { cn } from '@/lib/cn';

interface Props {
  title: string;
  subtitle?: string;
  meta?: string;
  selected: boolean;
  onSelect: () => void;
}

/** Large selectable row used for services and stylists. */
export default function OptionRow({ title, subtitle, meta, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex w-full items-center justify-between gap-4 border-b border-ink px-3 py-5 text-left transition-colors md:px-5',
        selected ? 'bg-ink text-paper' : 'hover:bg-bone',
      )}
    >
      <span>
        <span className="block font-display text-xl md:text-2xl">{title}</span>
        {subtitle && <span className={cn('mt-1 block text-sm', selected ? 'text-paper/70' : 'text-ash')}>{subtitle}</span>}
      </span>
      {meta && <span className="shrink-0 text-sm">{meta}</span>}
    </button>
  );
}
