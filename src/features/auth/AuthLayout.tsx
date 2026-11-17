import type { ReactNode } from 'react';
import Img from '@/components/ui/Img';
import { heroMedia } from '@/data/media';

/** Two-column auth screen: form on the left, photo on large screens. */
export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="flex items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-display">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-ash">{subtitle}</p>}
          <div className="mt-10">{children}</div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Img photo={heroMedia.photo} alt="" className="h-full" sizes="50vw" widths={[800, 1200, 1600]} />
      </div>
    </div>
  );
}
