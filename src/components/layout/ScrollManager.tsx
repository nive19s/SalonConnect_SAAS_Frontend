import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the #hash target if present, otherwise to the top, on every navigation. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // Wait a frame so lazily rendered sections have mounted.
    const id = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
