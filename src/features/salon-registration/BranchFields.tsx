import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TextField } from '@/components/ui/Form';
import type { BranchValues } from './schemas';

interface Props {
  register: UseFormRegister<BranchValues>;
  errors: FieldErrors<BranchValues>;
}

export function BranchFields({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <TextField label="Branch name" error={errors.name?.message} {...register('name')} />
      <TextField label="Street address" autoComplete="address-line1" error={errors.addressLine1?.message} {...register('addressLine1')} />
      <TextField label="Address line 2 (optional)" autoComplete="address-line2" error={errors.addressLine2?.message} {...register('addressLine2')} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="City" autoComplete="address-level2" error={errors.city?.message} {...register('city')} />
        <TextField label="Postal code (optional)" autoComplete="postal-code" error={errors.postalCode?.message} {...register('postalCode')} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Branch phone (optional)" type="tel" inputMode="tel" error={errors.contactPhone?.message} {...register('contactPhone')} />
        <TextField label="Branch email (optional)" type="email" error={errors.contactEmail?.message} {...register('contactEmail')} />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <TextField label="Time zone" hint="IANA name, like Asia/Colombo" error={errors.timezone?.message} {...register('timezone')} />
        <TextField label="Latitude (optional)" inputMode="decimal" error={errors.latitude?.message} {...register('latitude')} />
        <TextField label="Longitude (optional)" inputMode="decimal" error={errors.longitude?.message} {...register('longitude')} />
      </div>
    </div>
  );
}
