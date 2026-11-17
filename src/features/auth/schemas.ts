import { z } from 'zod';
import { isValidPhone } from '@/lib/phone';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email.').email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Enter your name.').max(150),
    email: z.string().trim().min(1, 'Enter your email.').email('Enter a valid email address.').max(254),
    phone: z.string().trim().refine((v) => v === '' || isValidPhone(v), 'Enter a valid mobile number, like 077 123 4567.'),
    password: z.string().min(8, 'Use at least 8 characters.').max(72, 'Use at most 72 characters.'),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match.' });
export type RegisterForm = z.infer<typeof registerSchema>;
