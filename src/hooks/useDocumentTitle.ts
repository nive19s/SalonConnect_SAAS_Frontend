import { useEffect } from 'react';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} – Glamora` : 'Glamora – Book salons and beauty parlours in Sri Lanka';
  }, [title]);
}
