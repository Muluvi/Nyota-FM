import React, { useState } from 'react';
import { Music, ShieldCheck, Scale, Check, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function CMORoyaltyCalculator() {
  const [stationRevenueTier, setStationRevenueTier] = useState<'Regional FM' | 'Community FM' | 'Commercial Commercial'>('Regional FM');
  const [localMusicPercent, setLocalMusicPercent] = useState<number>(68); // 68% local Luhya/Kenyan music
  const [syncLicenseIncluded, setSyncLicenseIncluded] = useState<boolean>(true);

  // Statutory joint CMO tariff (MCSK + KAMP + PRISK)
  const baseTariffKsh = stationRevenueTier === 'Regional FM' ? 180000 : stationRevenueTier === 'Community FM' ? 75000 : 350000;
  const syncLicenseKsh = syncLicenseIncluded ? 60000 : 0; // YouTube video live-sync clearance
  const totalAnnualRoyaltyKsh = baseTariffKsh + syncLicenseKsh;

  const isCAQuotaCompliant = localMusicPercent >= 40;

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Music size={14} />
            <span className="uppercase tracking-widest font-semibold">Regulatory Audit · Strategy 2.6 / 7.1</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Kenya Copyright Board (KECOBO) Joint CMO Tariff 2025/2026" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Music Copyright Licensing (MCSK, PRISK, KAMP) & Local Content Quota
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Audit blanket music licensing costs across the three statutory CMOs, verify YouTube sync rights, and maintain CA Kenya’s 40%+ local vernacular content mandate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded text-xs font-mono font-bold border flex items-center gap-1.5 ${
            isCAQuotaCompliant
              ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
              : 'bg-red-500/15 border-red-500/50 text-red-400'
          }`}>
            <span className={`h-2 w-2 rounded-full ${isCAQuotaCompliant ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span>{isCAQuotaCompliant ? 'CA LOCAL QUOTA PASSED (68%)' : 'BELOW 40% MANDATE'}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Licensing Parameters */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3.5">
            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Broadcaster License Classification
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Community FM', 'Regional FM', 'Commercial Commercial'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setStationRevenueTier(t)}
                    className={`py-2 px-1 text-center rounded text-xs font-mono transition-all border ${
                      stationRevenueTier === t
                        ? 'border-brass bg-brass text-ink font-bold'
                        : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-sage">Local Kenyan / Vernacular Music Rotation</span>
                <span className="text-brass font-bold tabular-nums">{localMusicPercent}% on air</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={localMusicPercent}
                onChange={(e) => setLocalMusicPercent(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-sage-dim mt-0.5">
                <span>20% (Non-compliant)</span>
                <span>40% (CA Minimum)</span>
                <span>68% (Nyota FM Actual)</span>
                <span>100%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-hairline space-y-2 text-xs font-mono">
              <label className="flex items-center gap-2 cursor-pointer text-sage hover:text-paper">
                <input
                  type="checkbox"
                  checked={syncLicenseIncluded}
                  onChange={(e) => setSyncLicenseIncluded(e.target.checked)}
                  className="accent-brass"
                />
                <span>Include YouTube & Social Visual Synchronization Rights (+KSh 60,000)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Audit Receipts Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-5 space-y-4 text-xs font-mono">
            <span className="text-[10px] text-brass uppercase tracking-wider font-bold block">
              ANNUAL STATUTORY ROYALTY VOUCHER
            </span>

            <div className="space-y-2 divide-y divide-hairline">
              <div className="flex justify-between pt-1">
                <span className="text-sage">MCSK (Music Copyright Society of Kenya)</span>
                <span className="text-paper font-bold tabular-nums">40% of Tariff</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sage">KAMP (Producers Association of Kenya)</span>
                <span className="text-paper font-bold tabular-nums">35% of Tariff</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sage">PRISK (Performers Rights Society of Kenya)</span>
                <span className="text-paper font-bold tabular-nums">25% of Tariff</span>
              </div>
              {syncLicenseIncluded && (
                <div className="flex justify-between pt-2">
                  <span className="text-sage">Visual Radio Online Sync Clearance</span>
                  <span className="text-paper font-bold tabular-nums">KSh 60,000 / yr</span>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-ink-2 border border-hairline p-3 flex items-center justify-between">
              <span className="text-sage-dim">Consolidated Annual Clearance:</span>
              <span className="font-display text-xl font-bold text-brass tabular-nums">
                KSh {totalAnnualRoyaltyKsh.toLocaleString()} / yr
              </span>
            </div>

            <p className="text-[11px] font-sans text-sage leading-relaxed">
              Protection against KECOBO copyright enforcement raids or on-air transmitter impoundments. Automatically submits monthly digital broadcast log sheets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
