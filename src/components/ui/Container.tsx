import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export default function Container({ as: Tag = 'div', className, children, ...rest }: Props) {
  return (
    <Tag className={cn('mx-auto w-full max-w-7xl px-5 md:px-8', className)} {...rest}>
      {children}
    </Tag>
  );
}
