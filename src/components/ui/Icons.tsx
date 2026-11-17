import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

export const ArrowRight = (p: IconProps) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Check = (p: IconProps) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Star = (p: IconProps) => (<svg {...base} fill="currentColor" stroke="none" {...p}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" /></svg>);
export const Menu = (p: IconProps) => (<svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>);
export const Close = (p: IconProps) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
