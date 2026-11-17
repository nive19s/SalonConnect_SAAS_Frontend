import { isValidPhone } from '@/lib/phone';

export const isValidEmail = (value: string): boolean => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

interface Details { name: string; phone: string; email: string }

export function validateDetails({ name, phone, email }: Details): Partial<Record<'name' | 'phone' | 'email', string>> {
  const errors: Partial<Record<'name' | 'phone' | 'email', string>> = {};
  if (!name.trim()) errors.name = 'Enter your name.';
  if (!isValidPhone(phone)) errors.phone = 'Enter a mobile number like 077 123 4567.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address or leave it blank.';
  return errors;
}
