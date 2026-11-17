import { useState, type FormEvent } from 'react';
import { validateDetails } from '@/lib/validators';
import Button from '@/components/ui/Button';
import { TextField } from '@/components/ui/Form';
import type { BookingDetails } from '@/types/domain';

interface Props {
  details: BookingDetails;
  onChange: (patch: Partial<BookingDetails>) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export default function DetailsStep({ details, onChange, onSubmit, submitting }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof BookingDetails, string>>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateDetails(details);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit();
  };

  const bind = (key: keyof BookingDetails) => ({ value: details[key], onChange: (e: { target: { value: string } }) => onChange({ [key]: e.target.value }) });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <TextField label="Full name" autoComplete="name" error={errors.name} {...bind('name')} />
      <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" placeholder="077 123 4567" error={errors.phone} {...bind('phone')} />
      <TextField label="Email (optional)" type="email" autoComplete="email" error={errors.email} {...bind('email')} />
      <TextField label="Notes for the salon (optional)" {...bind('notes')} />
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? 'Booking…' : 'Confirm booking'}
      </Button>
    </form>
  );
}
