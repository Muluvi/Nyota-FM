import React, { useEffect, useState } from 'react';

type Toast = { id: number; text: string; kind: 'ok' | 'error'; leaving?: boolean };
let push: ((t: Omit<Toast, 'id'>) => void) | null = null;

/** Show a short confirmation. Success draws a check, failure draws a cross. */
export function toast(text: string, kind: 'ok' | 'error' = 'ok') {
  push?.({ text, kind });
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    let n = 0;
    push = (t) => {
      const id = ++n;
      setItems((xs) => [...xs, { ...t, id }]);
      setTimeout(() => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, leaving: true } : x))), 2600);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 2900);
    };
    return () => {
      push = null;
    };
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[60] flex flex-col items-end gap-2 md:bottom-20" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} data-leaving={t.leaving || undefined} className="fx-toast flex items-center gap-2 rounded-lg border border-hairline bg-ink-2/95 px-3 py-2 text-sm text-paper shadow-2xl backdrop-blur">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke={t.kind === 'ok' ? 'var(--color-moss)' : 'var(--color-brick-text)'} strokeWidth="2" opacity="0.5" />
            <path
              d={t.kind === 'ok' ? 'M7 12.5l3.2 3.2L17 9' : 'M8 8l8 8M16 8l-8 8'}
              stroke={t.kind === 'ok' ? 'var(--color-moss)' : 'var(--color-brick-text)'}
              strokeWidth="2.4"
              strokeLinecap="round"
              className="fx-check"
            />
          </svg>
          {t.text}
        </div>
      ))}
    </div>
  );
}
