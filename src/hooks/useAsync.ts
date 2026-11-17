import { useEffect, useState, type DependencyList } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: unknown;
}

/** Minimal data-loading hook for the mock marketplace API. Real API calls use TanStack Query. */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error: unknown) => !cancelled && setState({ data: null, loading: false, error }));
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
