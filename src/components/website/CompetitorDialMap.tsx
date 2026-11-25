import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';
import { stations, DIAL_MIN, DIAL_MAX, type Station } from '../../data/stations';
import { sourceById } from '../../data/sources';

const pos = (f: number) => ((f - DIAL_MIN) / (DIAL_MAX - DIAL_MIN)) * 100;
const TICKS = [88, 92, 96, 100, 104, 108];

/** A true-to-scale FM dial: marker position = frequency. Shares are Tier 0. */
export function CompetitorDialMap() {
  const [selected, setSelected] = useState<Station>(stations.find((s) => s.isNyota)!);
  const source = selected.sourceId ? sourceById(selected.sourceId) : undefined;

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="border-b border-hairline pb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-brass">
          <Radio size={14} />
          <span className="uppercase tracking-widest font-semibold">Competitive Landscape · Part 2.2</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">The FM dial around Bungoma (to scale)</h3>
        <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
          Each marker sits at its real frequency. Audience shares are not shown: no public Western-Kenya share data exists, so
          they stay a Tier 0 gap until a GeoPoll/KARF Western oversample is commissioned (Ask 6).
        </p>
      </div>

      <div className="rounded-xl border border-hairline bg-ink p-4">
        <div className="relative h-24" role="group" aria-label="FM dial, 87.5 to 108 megahertz">
          <div className="absolute inset-x-0 top-12 h-px bg-hairline" aria-hidden="true" />
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute top-14 -translate-x-1/2 font-mono text-[11px] text-sage-dim"
              style={{ left: `${pos(t)}%` }}
              aria-hidden="true"
            >
              {t}
            </span>
          ))}
          {stations.map((st, i) => {
            const isSel = st.name === selected.name;
            return (
              <button
                key={st.name}
                type="button"
                onClick={() => setSelected(st)}
                aria-pressed={isSel}
                aria-label={`${st.name}, ${st.freq.toFixed(1)} FM`}
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${pos(st.freq)}%`, top: i % 2 ? 0 : 18 }}
              >
                <span className={`h-6 w-1 rounded ${st.isNyota ? 'bg-brass' : isSel ? 'bg-paper' : 'bg-sage-dim'}`} />
                <span className={`mt-0.5 hidden sm:block font-mono text-[11px] whitespace-nowrap ${isSel || st.isNyota ? 'text-paper' : 'text-sage-dim'}`}>
                  {st.freq.toFixed(1)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 font-mono text-[11px] text-sage-dim">MHz · tap a marker for details</p>
      </div>

      <div className="rounded-xl border border-hairline bg-ink p-4 space-y-2" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display text-lg text-paper font-semibold">
            {selected.name} <span className="font-mono text-sm text-brass">{selected.freq.toFixed(1)} FM</span>
          </h4>
          {source ? (
            <TierBadge tier={1} citation={`${source.publisher}: ${source.title}`} url={source.url} accessDate={source.accessed} />
          ) : (
            <TierBadge tier={0} gapMethod="Confirm frequency and ownership with the CA frequency register" />
          )}
        </div>
        <dl className="grid gap-2 sm:grid-cols-3 text-xs">
          <div>
            <dt className="text-sage-dim">Owner</dt>
            <dd className="text-paper">{selected.owner}</dd>
          </div>
          <div>
            <dt className="text-sage-dim">Notes</dt>
            <dd className="text-paper">{selected.note}</dd>
          </div>
          <div>
            <dt className="text-sage-dim">Western audience share</dt>
            <dd className="text-brick-text">Tier 0 · survey needed</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
