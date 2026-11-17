import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { newIdempotencyKey } from '@/api/client';
import { salonApi } from '@/api/salon.api';
import Button from '@/components/ui/Button';
import { Notice, SelectField, TextAreaField, TextField } from '@/components/ui/Form';
import { Check } from '@/components/ui/Icons';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/features/auth/AuthProvider';
import LoginForm from '@/features/auth/LoginForm';
import RegisterForm from '@/features/auth/RegisterForm';
import { usePersistentState } from '@/hooks/usePersistentState';
import { applyServerErrors } from '@/lib/formErrors';
import { cn } from '@/lib/cn';
import { BranchFields } from './BranchFields';
import {
  branchDefaults, branchSchema, branchToRequest, businessDefaults, businessSchema, businessToRequest,
  type BranchValues, type BusinessValues,
} from './schemas';

const STEPS = ['Account', 'Business', 'Branch', 'Review'] as const;

interface Draft {
  step: number;
  business: BusinessValues;
  branch: BranchValues;
  /** One key per registration attempt, so a double click or retry cannot create two salons. */
  idempotencyKey: string;
  /** Set once the salon exists, so a failed branch call can be retried without re-creating it. */
  salonId: string | null;
}

const initialDraft = (): Draft => ({ step: 0, business: businessDefaults, branch: branchDefaults, idempotencyKey: newIdempotencyKey(), salonId: null });

export default function RegisterSalonWizard() {
  const { me, status } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [draft, setDraft, clearDraft] = usePersistentState<Draft>('glamora.salonDraft', initialDraft());
  const [accountTab, setAccountTab] = useState<'register' | 'login'>('register');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const patch = (p: Partial<Draft>) => setDraft((d) => ({ ...d, ...p }));
  const step = status === 'authenticated' ? Math.max(draft.step, 1) : 0;

  const businessForm = useForm<BusinessValues>({ resolver: zodResolver(businessSchema), defaultValues: draft.business });
  const branchForm = useForm<BranchValues>({ resolver: zodResolver(branchSchema), defaultValues: draft.branch });

  // Save as the owner types (J6 step 2).
  useEffect(() => {
    const a = businessForm.watch((v) => setDraft((d) => ({ ...d, business: { ...d.business, ...(v as BusinessValues) } })));
    const b = branchForm.watch((v) => setDraft((d) => ({ ...d, branch: { ...d.branch, ...(v as BranchValues) } })));
    return () => { a.unsubscribe(); b.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefill contact details from the account once.
  useEffect(() => {
    if (me && !draft.business.contactEmail) businessForm.setValue('contactEmail', me.email);
    if (me?.phone && !draft.business.contactPhone) businessForm.setValue('contactPhone', me.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      let salonId = draft.salonId;
      if (!salonId) {
        const salon = await salonApi.register(businessToRequest(draft.business), draft.idempotencyKey);
        salonId = salon.id;
        patch({ salonId });
      }
      await salonApi.addBranch(salonId, branchToRequest(draft.branch));
      await queryClient.invalidateQueries();
      clearDraft();
      setDone(true);
    } catch (e) {
      setSubmitError(applyServerErrors(e, () => undefined, []));
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') return <Spinner label="Checking your session" />;

  if (done) {
    return (
      <div className="max-w-xl">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper"><Check width={26} height={26} /></span>
        <h1 className="mt-8 font-display text-display">Your salon is submitted.</h1>
        <p className="mt-4 text-lg text-ash">
          Glamora will review your details. You will be able to take bookings once your salon is approved and setup is complete.
          You can keep setting up while you wait.
        </p>
        <Button className="mt-10" size="lg" onClick={() => navigate('/salon-admin')}>Go to salon admin</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-display">List your salon</h1>
      <p className="mt-4 text-lg text-ash">Tell us about your business. It takes about five minutes, and your answers are saved as you go.</p>

      <ol className="mt-10 flex gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} className={cn('flex-1 border-t-2 pt-3 text-sm', i <= step ? 'border-ink' : 'border-line text-ash')} aria-current={i === step ? 'step' : undefined}>
            <span className="hidden sm:inline">{i + 1}. </span>{label}
          </li>
        ))}
      </ol>

      <div className="mt-10">
        {step === 0 && (
          <div className="space-y-8">
            <div className="flex gap-6 border-b border-line">
              {(['register', 'login'] as const).map((t) => (
                <button key={t} type="button" onClick={() => setAccountTab(t)} className={cn('-mb-px border-b-2 pb-3 text-sm font-medium', accountTab === t ? 'border-ink' : 'border-transparent text-ash')}>
                  {t === 'register' ? 'Create an account' : 'I already have an account'}
                </button>
              ))}
            </div>
            {accountTab === 'register' ? <RegisterForm onSuccess={() => patch({ step: 1 })} /> : <LoginForm onSuccess={() => patch({ step: 1 })} />}
          </div>
        )}

        {step === 1 && (
          <form noValidate className="space-y-7" onSubmit={businessForm.handleSubmit(() => patch({ step: 2 }))}>
            <TextField label="Business name (registered)" error={businessForm.formState.errors.legalName?.message} {...businessForm.register('legalName')} />
            <TextField label="Salon name (shown to customers)" error={businessForm.formState.errors.displayName?.message} {...businessForm.register('displayName')} />
            <TextAreaField label="About your salon (optional)" error={businessForm.formState.errors.description?.message} {...businessForm.register('description')} />
            <div className="grid gap-7 sm:grid-cols-2">
              <TextField label="Contact email" type="email" error={businessForm.formState.errors.contactEmail?.message} {...businessForm.register('contactEmail')} />
              <TextField label="Contact phone" type="tel" inputMode="tel" placeholder="077 123 4567" error={businessForm.formState.errors.contactPhone?.message} {...businessForm.register('contactPhone')} />
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <SelectField label="Country" {...businessForm.register('countryCode')}><option value="LK">Sri Lanka</option></SelectField>
              <SelectField label="Currency" {...businessForm.register('defaultCurrency')}><option value="LKR">Sri Lankan rupee (LKR)</option></SelectField>
            </div>
            <Button type="submit" size="lg">Continue</Button>
          </form>
        )}

        {step === 2 && (
          <form noValidate className="space-y-7" onSubmit={branchForm.handleSubmit(() => patch({ step: 3 }))}>
            <BranchFields register={branchForm.register} errors={branchForm.formState.errors} />
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => patch({ step: 1 })}>Back</Button>
              <Button type="submit" size="lg">Continue</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-8">
            {submitError && <Notice>{submitError}</Notice>}
            <ReviewBlock title="Business" onEdit={() => patch({ step: 1 })} rows={[
              ['Salon name', draft.business.displayName],
              ['Registered name', draft.business.legalName],
              ['Contact', `${draft.business.contactEmail} · ${draft.business.contactPhone}`],
            ]} />
            <ReviewBlock title="Branch" onEdit={() => patch({ step: 2 })} rows={[
              ['Name', draft.branch.name],
              ['Address', [draft.branch.addressLine1, draft.branch.addressLine2, draft.branch.city].filter(Boolean).join(', ')],
              ['Time zone', draft.branch.timezone],
            ]} />
            <p className="text-sm text-ash">By submitting you confirm these details are correct. Your salon starts as “pending approval”.</p>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => patch({ step: 2 })} disabled={submitting}>Back</Button>
              <Button size="lg" onClick={() => void submit()} disabled={submitting}>
                {submitting ? 'Submitting…' : draft.salonId ? 'Retry adding branch' : 'Submit for approval'}
              </Button>
            </div>
            {draft.salonId && <p className="text-sm text-ash">Your salon was created. Only the branch still needs saving.</p>}
          </div>
        )}
      </div>

      <p className="mt-12 text-sm text-ash">Already registered a salon? <Link to="/salon-admin" className="link-underline text-ink">Go to salon admin</Link></p>
    </div>
  );
}

function ReviewBlock({ title, rows, onEdit }: { title: string; rows: [string, string][]; onEdit: () => void }) {
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-ink pb-2">
        <h2 className="font-display text-2xl">{title}</h2>
        <button type="button" onClick={onEdit} className="link-underline text-sm">Edit</button>
      </div>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
            <dt className="text-sm text-ash">{k}</dt><dd>{v || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
