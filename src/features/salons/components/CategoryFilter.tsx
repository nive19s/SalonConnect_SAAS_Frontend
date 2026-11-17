import { categories } from '@/data/services';
import { cn } from '@/lib/cn';

export default function CategoryFilter({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const options = [{ id: '', name: 'All' }, ...categories];
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id || 'all'}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn('rounded-full border border-ink px-4 py-2 text-sm transition-colors', value === o.id ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-bone')}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
}
