import React from 'react';
import { sourceById } from '../../data/sources';
import type { Series } from '../../data/series';

/** Figure wrapper: title, the chart, a source line, and a visually hidden data table. */
export function ChartFrame({ series, children, valueFormat = (v) => String(v) }: { series: Series; children: React.ReactNode; valueFormat?: (v: number) => string }) {
  const src = sourceById(series.sourceId);
  return (
    <figure className="rounded-xl border border-hairline bg-ink-2 p-4">
      <figcaption className="mb-2">
        <span className="block font-display text-base text-paper">{series.title}</span>
        {series.note && <span className="block text-xs text-sage">{series.note}</span>}
      </figcaption>
      <div aria-hidden="true">{children}</div>
      <div className="sr-only">
        <table>
        <caption>{series.title}</caption>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Value ({series.unit})</th>
          </tr>
        </thead>
        <tbody>
          {series.points.map((p) => (
            <tr key={p.label}>
              <th scope="row">{p.label}</th>
              <td>{valueFormat(p.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {src && (
        <p className="mt-2 text-[11px] text-sage-dim">
          Source:{' '}
          <a href={src.url} target="_blank" rel="noreferrer" className="underline hover:text-paper">
            {src.publisher}, {src.title}
          </a>{' '}
          (accessed {src.accessed})
        </p>
      )}
    </figure>
  );
}
