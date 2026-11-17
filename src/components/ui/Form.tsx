import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-xs text-ash">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium">{error}</p>}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string };

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, className, ...rest }, ref,
) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <input ref={ref} id={id} className={cn('field', className)} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} {...rest} />
    </FieldShell>
  );
});

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string };

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { label, error, hint, className, ...rest }, ref,
) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <textarea ref={ref} id={id} rows={4} className={cn('field h-auto resize-y border py-3 px-3', className)} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} {...rest} />
    </FieldShell>
  );
});

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; hint?: string };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, hint, className, children, ...rest }, ref,
) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <select ref={ref} id={id} className={cn('field', className)} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} {...rest}>
        {children}
      </select>
    </FieldShell>
  );
});

/** Page-level error or notice. */
export function Notice({ tone = 'error', children }: { tone?: 'error' | 'info'; children: ReactNode }) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={cn('border px-4 py-3 text-sm', tone === 'error' ? 'border-ink bg-bone' : 'border-line')}>
      {children}
    </div>
  );
}
