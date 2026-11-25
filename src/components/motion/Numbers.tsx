import React from 'react';
import { useInView, useTween } from './hooks';

/** Number count-up when scrolled into view (re-counts on re-entry with `repeat`). */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', repeat = false, duration = 1600, className = '' }: { value: number; decimals?: number; prefix?: string; suffix?: string; repeat?: boolean; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ repeat });
  const v = useTween(value, inView, { duration });
  const fmt = (n: number) => n.toLocaleString('en-KE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">{`${prefix}${fmt(value)}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {fmt(v)}
        {suffix}
      </span>
    </span>
  );
}

/** Odometer: each digit rolls vertically to its value on entry. */
export function Odometer({ text, className = '' }: { text: string; className?: string }) {
  let d = 0;
  return (
    <span className={`odo ${className}`} data-io="">
      <span className="sr-only">{text}</span>
      {Array.from(text).map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} className="odo-col" aria-hidden="true" style={{ '--d': Number(c), '--i': d++ } as React.CSSProperties}>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {c}
          </span>
        ),
      )}
    </span>
  );
}
