import { useCallback, useState } from 'react';

/** useState that mirrors to localStorage, so a half-finished form survives a reload. */
export function usePersistentState<T>(key: string, initial: T): [T, (next: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? ({ ...initial, ...JSON.parse(raw) } as T) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      try { localStorage.setItem(key, JSON.stringify(resolved)); } catch { /* storage blocked */ }
      return resolved;
    });
  }, [key]);

  const clear = useCallback(() => {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, set, clear];
}
