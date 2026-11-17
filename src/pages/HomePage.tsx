import { lazy, Suspense } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Hero from '@/features/home/components/Hero';

// Everything below the fold loads after the hero has painted.
const Showcase = lazy(() => import('@/features/home/HomeBelowFold'));

export default function HomePage() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
        <Showcase />
      </Suspense>
    </>
  );
}
