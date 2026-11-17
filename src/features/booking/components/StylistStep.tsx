import { getStylists } from '@/mocks/marketplaceApi';
import { useAsync } from '@/hooks/useAsync';
import Spinner from '@/components/ui/Spinner';
import type { Stylist } from '@/types/domain';
import OptionRow from './OptionRow';

interface Props {
  selected: Stylist | null;
  onSelect: (stylist: Stylist) => void;
}

export default function StylistStep({ selected, onSelect }: Props) {
  const { data, loading } = useAsync(getStylists, []);
  if (loading || !data) return <Spinner label="Loading stylists" />;
  return (
    <div className="border-t border-ink">
      {data.map((s) => (
        <OptionRow key={s.id} title={s.name} subtitle={s.role} selected={selected?.id === s.id} onSelect={() => onSelect(s)} />
      ))}
    </div>
  );
}
