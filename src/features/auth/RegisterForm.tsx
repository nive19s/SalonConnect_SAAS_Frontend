import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyServerErrors } from '@/lib/formErrors';
import { normalizePhone } from '@/lib/phone';
import Button from '@/components/ui/Button';
import { Notice, TextField } from '@/components/ui/Form';
import { useAuth } from './AuthProvider';
import { registerSchema, type RegisterForm as RegisterValues } from './schemas';

const FIELDS = ['fullName', 'email', 'phone', 'password'] as const;

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const { register: signUp } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const submit = handleSubmit(async (v) => {
    setFormError(null);
    try {
      await signUp({
        fullName: v.fullName.trim(),
        email: v.email.trim(),
        phone: v.phone.trim() ? normalizePhone(v.phone) : undefined,
        password: v.password,
      });
      onSuccess();
    } catch (e) {
      setFormError(applyServerErrors(e, setError, FIELDS));
    }
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
      {formError && <Notice>{formError}</Notice>}
      <TextField label="Full name" autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <TextField label="Mobile number (optional)" type="tel" inputMode="tel" autoComplete="tel" placeholder="077 123 4567" error={errors.phone?.message} {...register('phone')} />
      <TextField label="Password" type="password" autoComplete="new-password" hint="At least 8 characters." error={errors.password?.message} {...register('password')} />
      <TextField label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );
}
