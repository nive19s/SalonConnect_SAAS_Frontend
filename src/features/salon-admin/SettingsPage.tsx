import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Spinner from '@/components/ui/Spinner';
import { Notice } from '@/components/ui/Form';
import { useActiveSalon } from './ActiveSalon';

export default function SettingsPage() {
  useDocumentTitle('Salon settings');
  const { salon, salonLoading } = useActiveSalon();
  if (salonLoading || !salon) return <Spinner label="Loading settings" />;

  const rows: [string, string][] = [
    ['Display name', salon.displayName],
    ['Legal name', salon.legalName],
    ['Public address', `glamora.lk/salons/${salon.slug}`],
    ['Contact email', salon.contactEmail],
    ['Contact phone', salon.contactPhone],
    ['Country', salon.countryCode],
    ['Currency', salon.defaultCurrency],
    ['Description', salon.description || 'None'],
  ];

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-display text-4xl">Settings</h1>
      <Notice tone="info">Editing salon details is not available yet. It needs a salon update endpoint in the API.</Notice>
      <dl className="divide-y divide-line bg-paper">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
            <dt className="text-sm text-ash">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
