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

  const placeholder = (
    <div className="grid place-items-center rounded-xl border border-dashed border-hairline text-xs font-mono text-sage-dim" style={{ minHeight }}>
      Loading {label}…
    </div>
  );

  return <div ref={ref}>{show ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}</div>;
}
