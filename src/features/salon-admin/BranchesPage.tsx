import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { salonApi } from '@/api/salon.api';
import type { CreateBranchRequest } from '@/api/types';
import Button from '@/components/ui/Button';
import { Notice } from '@/components/ui/Form';
import Spinner from '@/components/ui/Spinner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { applyServerErrors } from '@/lib/formErrors';
import { BranchFields } from '@/features/salon-registration/BranchFields';
import { branchSchema, branchToRequest, branchDefaults, BRANCH_FIELDS, type BranchValues } from '@/features/salon-registration/schemas';
import { useActiveSalon } from './ActiveSalon';

export default function BranchesPage() {
  useDocumentTitle('Branches');
  const { membership, can, salon } = useActiveSalon();
  const salonId = membership.salonBusinessId;
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const branches = useQuery({ queryKey: ['branches', salonId], queryFn: () => salonApi.listBranches(salonId) });
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<BranchValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: branchDefaults,
  });

  const add = useMutation({
    mutationFn: (body: CreateBranchRequest) => salonApi.addBranch(salonId, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches', salonId] });
      reset(branchDefaults);
      setAdding(false);
    },
    onError: (e) => setFormError(applyServerErrors(e, setError, BRANCH_FIELDS)),
  });

  const canAdd = can('MANAGE_BRANCHES');

  return (
    <div className="max-w-3xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Branches</h1>
          <p className="mt-2 text-ash">{salon?.displayName}</p>
        </div>
        {canAdd && !adding && <Button onClick={() => setAdding(true)}>Add branch</Button>}
      </header>

      {adding && (
        <form
          noValidate
          onSubmit={handleSubmit((v) => { setFormError(null); add.mutate(branchToRequest(v)); })}
          className="space-y-6 bg-paper p-6"
        >
          <h2 className="font-display text-2xl">New branch</h2>
          {formError && <Notice>{formError}</Notice>}
          <BranchFields register={register} errors={errors} />
          <div className="flex gap-3">
            <Button type="submit" disabled={add.isPending}>{add.isPending ? 'Saving…' : 'Save branch'}</Button>
            <Button variant="outline" onClick={() => { setAdding(false); setFormError(null); }}>Cancel</Button>
          </div>
        </form>
      )}

      {branches.isLoading && <Spinner label="Loading branches" />}
      {branches.isError && <Notice>We could not load branches. Please refresh the page.</Notice>}
      {branches.data?.length === 0 && !adding && <Notice tone="info">No branches yet. Add your first branch so customers can find you.</Notice>}

      <ul className="space-y-3">
        {branches.data?.map((b) => (
          <li key={b.id} className="bg-paper p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl">{b.name}</h3>
                <p className="mt-1 text-sm text-ash">{[b.addressLine1, b.addressLine2, b.city, b.postalCode].filter(Boolean).join(', ')}</p>
                <p className="mt-1 text-xs text-ash">{b.timezone}{b.contactPhone ? ` · ${b.contactPhone}` : ''}</p>
              </div>
              <span className="shrink-0 border border-ink px-2 py-1 text-xs">{b.published ? 'Published' : 'Not published'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
