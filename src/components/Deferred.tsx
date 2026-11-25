import React, { Suspense, useEffect, useRef, useState } from 'react';

/**
 * Renders children only once the placeholder is within about one viewport of the
 * screen, so heavy chunks (lazy components) load on demand. Falls back to rendering
 * immediately where IntersectionObserver is unavailable, and always before printing.
 */
export function Deferred({ children, minHeight = 320, label }: { children: React.ReactNode; minHeight?: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '100% 0px' }, // data-ok: UI constant
    );
    io.observe(el);
    const beforePrint = () => setShow(true);
    window.addEventListener('beforeprint', beforePrint);
    return () => {
      io.disconnect();
      window.removeEventListener('beforeprint', beforePrint);
    };
  }, [show]);

  // Skeleton shimmer (static under reduced motion) that resolves into the chapter.
  const placeholder = (
    <div className="space-y-4 rounded-xl border border-dashed border-hairline p-5" style={{ minHeight }} role="status">
      <span className="sr-only">Loading {label}…</span>
      <div aria-hidden="true" className="space-y-4">
        <div className="fx-skeleton h-4 w-40" />
        <div className="fx-skeleton h-8 w-3/4" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="fx-skeleton h-40" />
          <div className="fx-skeleton h-40" />
          <div className="fx-skeleton h-40" />
        </div>
        <div className="fx-skeleton h-56" />
        <p className="text-center text-xs font-mono text-sage-dim">Loading {label}…</p>
      </div>
    </div>
  );

  return (
    <div ref={ref}>
      {show ? (
        <Suspense fallback={placeholder}>
          <div className="fx-resolve">{children}</div>
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
