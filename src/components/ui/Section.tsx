import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import Container from './Container';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}

/** Consistent vertical rhythm for page sections. `tone="dark"` inverts the palette. */
export default function Section({ id, tone = 'light', className, children, ...rest }: Props) {
  return (
    <section id={id} className={cn('py-20 md:py-28', tone === 'dark' ? 'bg-ink text-paper' : 'bg-paper text-ink', className)} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}
