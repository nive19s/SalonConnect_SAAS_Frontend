import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { salonApi } from '@/api/salon.api';
import type { SalonBusinessStatus } from '@/api/types';
import Spinner from '@/components/ui/Spinner';
import { Notice } from '@/components/ui/Form';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn } from '@/lib/cn';
import { useActiveSalon } from './ActiveSalon';

const STATUS_TEXT: Record<SalonBusinessStatus, { title: string; body: string }> = {
  PENDING_APPROVAL: { title: 'Waiting for approval', body: 'Glamora is reviewing your salon. You can keep setting up while you wait. Your salon will appear in search once it is approved.' },
  CHANGES_REQUESTED: { title: 'Changes requested', body: 'Glamora asked for changes before approving your salon. Update your details and we will review them again.' },
  ACTIVE: { title: 'Approved', body: 'Your salon is approved. Finish the setup checklist so customers can book.' },
  REJECTED: { title: 'Not approved', body: 'Glamora could not approve this salon. Please contact support for the reason.' },
  SUSPENDED: { title: 'Suspended', body: 'This salon is suspended and is not visible to customers. Please contact support.' },
  DEACTIVATED: { title: 'Deactivated', body: 'This salon is deactivated.' },
};

interface Task {
  label: string;
  state: 'done' | 'todo' | 'locked' | 'waiting';
  to?: string;
  note?: string;
}

export default function DashboardPage() {
  useDocumentTitle('Salon dashboard');
  const { salon, salonLoading, membership } = useActiveSalon();
  const branches = useQuery({
    queryKey: ['branches', membership.salonBusinessId],
    queryFn: () => salonApi.listBranches(membership.salonBusinessId),
  });

  if (salonLoading || !salon) return <Spinner label="Loading your salon" />;

  const status = STATUS_TEXT[salon.status];
  const tasks: Task[] = [
    { label: 'Register your salon', state: 'done' },
    { label: 'Approval by Glamora', state: salon.status === 'ACTIVE' ? 'done' : 'waiting', note: salon.status === 'ACTIVE' ? undefined : status.title },
    { label: 'Add a branch', state: branches.data && branches.data.length > 0 ? 'done' : 'todo', to: '/salon-admin/branches' },
    { label: 'Add services', state: 'locked', note: 'Needs the service catalogue module' },
    { label: 'Add beauticians', state: 'locked', note: 'Needs the staff module' },
    { label: 'Link services to beauticians', state: 'locked', note: 'Needs the staff module' },
    { label: 'Set working hours', state: 'locked', note: 'Needs the scheduling module' },
  ];
  const doneCount = tasks.filter((t) => t.state === 'done').length;

  return (
    <div className="max-w-3xl space-y-10">
      <header>
        <h1 className="font-display text-4xl">{salon.displayName}</h1>
        <p className="mt-2 text-ash">{salon.contactEmail} · {salon.contactPhone}</p>
      </header>

      <Notice tone="info"><strong>{status.title}.</strong> {status.body}</Notice>

      <section aria-labelledby="checklist">
        <div className="flex items-baseline justify-between">
          <h2 id="checklist" className="font-display text-2xl">Setup checklist</h2>
          <p className="text-sm text-ash">{doneCount} of {tasks.length} done</p>
        </div>
        <div className="mt-3 h-1 bg-line"><div className="h-full bg-ink transition-all" style={{ width: `${(doneCount / tasks.length) * 100}%` }} /></div>
        <ul className="mt-4 bg-paper">
          {tasks.map((t) => (
            <li key={t.label} className="flex items-center justify-between gap-4 border-b border-line px-4 py-4 last:border-0">
              <div className="flex items-center gap-3">
                <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs', t.state === 'done' ? 'border-ink bg-ink text-paper' : 'border-line text-ash')} aria-hidden>
                  {t.state === 'done' ? '✓' : ''}
                </span>
                <div>
                  <p className={cn(t.state === 'locked' && 'text-ash')}>{t.label}</p>
                  {t.note && <p className="text-xs text-ash">{t.note}</p>}
                </div>
              </div>
              {t.state === 'todo' && t.to && <Link to={t.to} className="link-underline shrink-0 text-sm font-medium">Start</Link>}
              {t.state === 'locked' && <span className="shrink-0 text-xs text-ash">Soon</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
