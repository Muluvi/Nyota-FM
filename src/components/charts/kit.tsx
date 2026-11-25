import React, { useId, useRef, useState } from 'react';
import { sourceById } from '../../data/sources';

export type Row = { label: string; value: string };

/** Shared gradient and glow definitions for a chart SVG (ids are unique per chart). */
export function useChartIds() {
  const id = useId().replace(/:/g, '');
  return { brass: `${id}-brass`, sage: `${id}-sage`, moss: `${id}-moss`, brick: `${id}-brick`, glow: `${id}-glow`, area: `${id}-area` };
}

export function ChartDefs({ ids }: { ids: ReturnType<typeof useChartIds> }) {
  return (
    <defs>
      <linearGradient id={ids.brass} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#8f6a2f" />
        <stop offset="1" stopColor="var(--color-brass)" />
      </linearGradient>
      <linearGradient id={ids.sage} x1="0" x2="1">
        <stop offset="0" stopColor="#3b4a42" />
        <stop offset="1" stopColor="var(--color-sage-dim)" />
      </linearGradient>
      <linearGradient id={ids.moss} x1="0" x2="1">
        <stop offset="0" stopColor="#3f6b4f" />
        <stop offset="1" stopColor="var(--color-moss)" />
      </linearGradient>
      <linearGradient id={ids.brick} x1="0" x2="1">
        <stop offset="0" stopColor="#6e3f2e" />
        <stop offset="1" stopColor="var(--color-brick-text)" />
      </linearGradient>
      <linearGradient id={ids.area} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="var(--color-brass)" stopOpacity="0.45" />
        <stop offset="1" stopColor="var(--color-brass)" stopOpacity="0" />
      </linearGradient>
      <filter id={ids.glow} x="-0.5" y="-0.5" width="2" height="2">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** Pointer-following tooltip scoped to a chart card. */
export function useTooltip() {
  const host = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; body: React.ReactNode } | null>(null);
  const show = (e: React.PointerEvent | React.FocusEvent, body: React.ReactNode) => {
    const r = host.current?.getBoundingClientRect();
    if (!r) return;
    let x: number;
    let y: number;
    if ('clientX' in e) {
      x = e.clientX - r.left;
      y = e.clientY - r.top;
    } else {
      const t = (e.target as Element).getBoundingClientRect();
      x = t.left + t.width / 2 - r.left;
      y = t.top - r.top;
    }
    setTip({ x: Math.max(70, Math.min(r.width - 70, x)), y: Math.max(40, y), body });
  };
  const hide = () => setTip(null);
  const node = (
    <div className="c-tip" hidden={!tip} style={{ left: tip?.x ?? 0, top: tip?.y ?? 0 }} role="presentation">
      {tip?.body}
    </div>
  );
  return { host, show, hide, node };
}

/**
 * Chart card: kicker, title, a headline figure, the chart, legend, source line, and a
 * visually hidden data table. Reveals with a slide-up; its charts animate on entry.
 */
export function ChartCard({
  kicker,
  title,
  note,
  headline,
  sourceId,
  rows,
  legend,
  children,
  hostRef,
  className = '',
}: {
  kicker?: string;
  title: string;
  note?: React.ReactNode;
  headline?: React.ReactNode;
  sourceId?: string;
  rows: Row[];
  legend?: { label: string; color: string }[];
  children: React.ReactNode;
  hostRef?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  const src = sourceId ? sourceById(sourceId) : undefined;
  return (
    <figure data-reveal="up" className={`group rounded-2xl border border-hairline bg-gradient-to-b from-ink-2 to-ink p-4 sm:p-5 fx-glow ${className}`} data-spotlight="">
      <figcaption className="mb-3 flex items-start justify-between gap-3">
        <span>
          {kicker && <span className="block font-mono text-[11px] uppercase tracking-widest text-brass">{kicker}</span>}
          <span className="block font-display text-lg leading-tight text-paper">{title}</span>
          {note && <span className="mt-0.5 block text-xs text-sage">{note}</span>}
        </span>
        {headline && <span className="shrink-0 text-right font-display text-3xl leading-none text-brass">{headline}</span>}
      </figcaption>
      <div ref={hostRef} className="chart" data-io="" aria-hidden="true">
        {children}
      </div>
      {legend && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-sage" aria-hidden="true">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
              {l.label}
            </li>
          ))}
        </ul>
      )}
      <div className="sr-only">
        <table>
          <caption>{title}</caption>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {src && (
        <p className="mt-3 border-t border-hairline/60 pt-2 text-[11px] text-sage-dim">
          Source:{' '}
          <a href={src.url} target="_blank" rel="noreferrer" className="fx-underline hover:text-paper">
            {src.publisher}, {src.title}
          </a>{' '}
          · accessed {src.accessed}
        </p>
      )}
    </figure>
  );
}
