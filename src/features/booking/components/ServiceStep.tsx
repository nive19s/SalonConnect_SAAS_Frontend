import { getServices } from '@/mocks/marketplaceApi';
import { useAsync } from '@/hooks/useAsync';
import { formatDuration, formatPrice } from '@/lib/format';
import Spinner from '@/components/ui/Spinner';
import type { Service } from '@/types/domain';
import OptionRow from './OptionRow';

interface Props {
  salonId: string;
  selected: Service | null;
  onSelect: (service: Service) => void;
}

export default function ServiceStep({ salonId, selected, onSelect }: Props) {
  const { data, loading } = useAsync(() => getServices(salonId), [salonId]);
  if (loading || !data) return <Spinner label="Loading services" />;
  return (
    <div className="border-t border-ink">
      {data.map((s) => (
        <OptionRow key={s.id} title={s.name} subtitle={formatDuration(s.durationMinutes)} meta={formatPrice(s.price)} selected={selected?.id === s.id} onSelect={() => onSelect(s)} />
      ))}
    </div>
  );
}
