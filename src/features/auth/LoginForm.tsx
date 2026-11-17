import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { userMessage } from '@/api/errors';
import Button from '@/components/ui/Button';
import { Notice, TextField } from '@/components/ui/Form';
import { useAuth } from './AuthProvider';
import { loginSchema, type LoginForm as LoginValues } from './schemas';

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const submit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await login({ email: values.email.trim(), password: values.password });
      onSuccess();
    } catch (e) {
      setFormError(userMessage(e));
    }
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
      {formError && <Notice>{formError}</Notice>}
      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <TextField label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
      <div className="flex items-center justify-between gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? 'Logging in…' : 'Log in'}</Button>
        <Link to="/forgot-password" className="link-underline text-sm">Forgot password?</Link>
      </div>
    </form>
  );
}
