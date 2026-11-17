import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/cn';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40';

const variants = {
  primary: 'border-ink bg-ink text-paper hover:bg-paper hover:text-ink',
  outline: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  inverse: 'border-paper bg-paper text-ink hover:bg-transparent hover:text-paper',
  'inverse-outline': 'border-paper bg-transparent text-paper hover:bg-paper hover:text-ink',
} as const;

const sizes = { md: 'h-11 px-6 text-sm', lg: 'h-14 px-8 text-base' } as const;

interface Common {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children?: ReactNode;
}

type ButtonAsLink = Common & { to: string; href?: never } & Omit<LinkProps, 'to' | 'className' | 'children'>;
type ButtonAsAnchor = Common & { href: string; to?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;
type ButtonAsButton = Common & { to?: never; href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/** Renders a router <Link> when `to` is set, an <a> when `href` is set, else a <button>. */
export default function Button(props: ButtonAsLink | ButtonAsAnchor | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest as Omit<ButtonAsLink, keyof Common>;
    return <Link to={to} className={classes} {...linkRest}>{children}</Link>;
  }
  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof Common>;
    return <a href={href} className={classes} {...anchorRest}>{children}</a>;
  }
  const { to: _to, href: _href, type = 'button', ...buttonRest } = rest as Omit<ButtonAsButton, keyof Common>;
  return <button type={type} className={classes} {...buttonRest}>{children}</button>;
}
