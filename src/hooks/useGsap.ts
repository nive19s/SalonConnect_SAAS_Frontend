import { useLayoutEffect, useRef, type DependencyList } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Runs `setup` inside a scoped gsap.matchMedia context, only when the visitor has not asked for
 * reduced motion. Everything created inside is reverted on cleanup (StrictMode safe) and selectors
 * are scoped to the returned ref.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(setup: () => void, deps: DependencyList = []) {
  const scope = useRef<T>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => { setup(); }, scope.current ?? undefined);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
