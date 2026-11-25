import React, { useState } from 'react';
import { Music, Check, X, RefreshCw } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

const RATE = 0.04; // Consolidated Music Tariffs 2026–2028: 4% of net revenue (radio)
const NATIONAL_MINIMUM = 500_000; // KSh per year for national radio; regional minimum is lower (to be confirmed)

const CMO_STATUS = [
  { name: 'PAVRISK', status: 'licensed', note: 'Licensed from 5 Nov 2025 (one year)' },
  { name: 'KAMP', status: 'review', note: 'Licensed 5 Nov 2025; suspended 90 days from 1 Jul 2026 (upheld 24 Aug 2026)' },
  { name: 'MCSK', status: 'unlicensed', note: 'Not licensed for 2025–26; barred from collecting' },
] as const;

const fmt = (n: number) => `KSh ${Math.round(n).toLocaleString('en-KE')}`;

export function CMORoyaltyCalculator() {
  const [netRevenueM, setNetRevenueM] = useState<number>(18);
  const percentRoyalty = netRevenueM * 1_000_000 * RATE;

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-brass">
            <Music size={14} />
            <span className="uppercase tracking-widest font-semibold">Music Royalties · Part 2.6</span>
            <TierBadge
              tier={1}
              citation="KECOBO Consolidated Music Tariffs 2026–2028 (via Khusoko, 14 Apr 2026); KECOBO CMO licensing statement 2025"
              url="https://khusoko.com/2026/04/14/kecobo-consolidated-music-royalty-tariffs-2026-2028/"
              accessDate="2026-11-25"
            />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">Music royalty estimator (2026–2028 tariff)</h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            From 1 January 2026, radio pays 4% of net revenue. National stations pay at least KSh 500,000 a year; regional stations
            (broadcasting within five counties, as Nyota does) have a lower minimum, still to be confirmed from the gazetted tariff.
            Late payment attracts a 5% monthly compounded penalty.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 rounded-xl border border-hairline bg-ink p-4 space-y-3">
          <label htmlFor="cmo-revenue" className="flex items-center justify-between text-xs font-mono text-sage-dim uppercase tracking-wider">
            <span>Station net revenue (per year)</span>
            <span className="text-brass font-bold">KSh {netRevenueM}M</span>
          </label>
          <input
            id="cmo-revenue"
            type="range"
            min={2}
            max={60}
            step={1}
            value={netRevenueM}
            onChange={(e) => setNetRevenueM(Number(e.target.value))}
            className="w-full accent-brass cursor-pointer"
          />
          <p className="text-[11px] text-sage-dim font-mono">Illustrative input. Use audited net revenue once available (Ask 6).</p>

          <div className="rounded-lg bg-ink-2 border border-hairline p-3 flex items-center justify-between">
            <span className="text-sage text-xs">4% of net revenue</span>
            <span className="font-display text-xl font-bold text-brass tabular-nums" aria-live="polite">
              {fmt(percentRoyalty)} / yr
            </span>
          </div>
          <p className="text-[11px] text-sage leading-relaxed">
            If 4% falls below the regional minimum, the minimum applies instead. For comparison, the national minimum is{' '}
            {fmt(NATIONAL_MINIMUM)}.
          </p>
        </div>

        <div className="lg:col-span-6 rounded-xl border border-hairline bg-ink p-4 space-y-3 text-xs">
          <span className="text-[11px] font-mono text-brass uppercase tracking-wider font-bold block">Who to pay (status, Nov 2026)</span>
          <ul className="space-y-2">
            {CMO_STATUS.map((c) => (
              <li key={c.name} className="flex items-start gap-2">
                {c.status === 'licensed' && <Check size={14} className="text-moss shrink-0 mt-0.5" aria-label="Licensed" />}
                {c.status === 'review' && <RefreshCw size={14} className="text-brass shrink-0 mt-0.5" aria-label="Under review" />}
                {c.status === 'unlicensed' && <X size={14} className="text-brick-text shrink-0 mt-0.5" aria-label="Not licensed" />}
                <span>
                  <strong className="text-paper">{c.name}</strong> <span className="text-sage">· {c.note}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-sage-dim leading-relaxed border-t border-hairline pt-2">
            KECOBO invited 2027 CMO licence applications on 4 Sep 2026. Update this card after the 2027 licensing round. Pay only CMOs
            licensed for the year. Video sync rights for streamed music need direct negotiation (Tier 0).
          </p>
        </div>
      </div>
    </div>
  );
}
