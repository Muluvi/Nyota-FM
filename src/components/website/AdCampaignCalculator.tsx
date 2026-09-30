import React, { useState } from 'react';
import { DollarSign, Radio, Calculator, Copy, Check, Sparkles, MessageCircle, Truck, Volume2, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function AdCampaignCalculator() {
  const [daypart, setDaypart] = useState<'breakfast' | 'midday' | 'drive' | 'night' | 'all'>('breakfast');
  const [spotsPerDay, setSpotsPerDay] = useState<number>(4);
  const [weeks, setWeeks] = useState<number>(4);
  const [includeOB, setIncludeOB] = useState<boolean>(true);
  const [includeWhatsApp, setIncludeWhatsApp] = useState<boolean>(true);
  const [includeLiveMentions, setIncludeLiveMentions] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  // Rate Card (derived from verified Western Kenya regional commercial ad benchmarks)
  const spotRates = {
    breakfast: 2800, // KSh per 30s prime morning
    drive: 2500,     // KSh per 30s prime evening
    midday: 1800,    // KSh per 30s day
    night: 1200,     // KSh per 30s late night
    all: 2100,       // blended run-of-station
  };

  const totalSpots = spotsPerDay * 7 * weeks;
  const spotRate = spotRates[daypart];
  const grossSpotsCost = totalSpots * spotRate;

  // Add-ons
  const obCost = includeOB ? 180000 : 0;
  const whatsAppCost = includeWhatsApp ? 35000 * Math.max(1, Math.round(weeks / 2)) : 0;
  const liveMentionsCost = includeLiveMentions * 4500;

  const totalGross = grossSpotsCost + obCost + whatsAppCost + liveMentionsCost;

  // Tiered volume discount
  const discountRate = weeks >= 8 ? 0.20 : weeks >= 4 ? 0.15 : weeks >= 2 ? 0.08 : 0;
  const discountAmount = Math.round(totalGross * discountRate);
  const netInvestment = totalGross - discountAmount;

  // Audience reach modelled
  const estimatedGrossImpressions = Math.round(totalSpots * 45000 + (includeOB ? 25000 : 0) + (includeWhatsApp ? 20000 : 0));

  const copyProposal = () => {
    const text = `NYOTA FM 107.3 · TAILORED MEDIA CAMPAIGN SUMMARY
Duration: ${weeks} Weeks (${totalSpots} Total Spots)
Daypart: ${daypart.toUpperCase()} (KSh ${spotRate.toLocaleString()}/spot)
Spots Spend: KSh ${grossSpotsCost.toLocaleString()}
Add-ons: ${includeOB ? '1× Outside Broadcast Market Activation (KSh 180,000)' : 'No OB'}, ${includeWhatsApp ? 'WhatsApp Listener Push' : ''}, ${includeLiveMentions} Presenter Mentions
Gross Investment: KSh ${totalGross.toLocaleString()}
Volume Partner Discount (${(discountRate * 100).toFixed(0)}%): -KSh ${discountAmount.toLocaleString()}
NET INVESTMENT: KSh ${netInvestment.toLocaleString()}
Estimated Impressions: ${estimatedGrossImpressions.toLocaleString()} Listener Touches
Coverage: Western Kenya (Bungoma, Kakamega, Trans Nzoia, Busia, Vihiga)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Interactive Media Kit
            </span>
            <span className="font-mono text-xs text-sage-dim">· Real-Time Campaign Cost & Reach Estimator</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Build a Custom Nyota FM 107.3 Media Plan
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Designed for brand managers, agencies, and county desks. Select dayparts, airtime frequency, and field activations to calculate immediate investment requirements and volume discounts.
          </p>
        </div>
        <TierBadge tier={1} citation="ReelAnalytics Prevailing Radio Ad Rate Cards & Regional Benchmark" url="reelanalytics.net" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Daypart Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-sage-dim tracking-wider font-semibold block">
              1. Choose Broadcast Daypart
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              {[
                { id: 'breakfast', label: 'Breakfast', time: '06:00–10:00', rate: '2,800' },
                { id: 'midday', label: 'Midday', time: '10:00–14:00', rate: '1,800' },
                { id: 'drive', label: 'Drive Home', time: '16:00–19:00', rate: '2,500' },
                { id: 'night', label: 'Evening', time: '19:00–22:00', rate: '1,200' },
                { id: 'all', label: 'Run of Station', time: 'Blended Day', rate: '2,100' },
              ].map((dp) => (
                <button
                  key={dp.id}
                  type="button"
                  onClick={() => setDaypart(dp.id as any)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    daypart === dp.id
                      ? 'bg-brass text-ink border-brass font-bold shadow-md'
                      : 'bg-ink text-sage hover:text-paper border-hairline'
                  }`}
                >
                  <div className="font-semibold text-xs truncate">{dp.label}</div>
                  <div className="text-[10px] opacity-80">{dp.time}</div>
                  <div className="text-[11px] mt-1 font-bold">KSh {dp.rate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Grid: Frequency & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-ink p-4 rounded-lg border border-hairline space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sage-dim uppercase font-semibold">Spots Per Day</span>
                <span className="text-brass font-bold">{spotsPerDay} Spots / Day</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="2"
                value={spotsPerDay}
                onChange={(e) => setSpotsPerDay(parseInt(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-sage-dim">
                <span>2 (Lite)</span>
                <span>4 (Standard)</span>
                <span>8 (Heavy)</span>
                <span>12 (Blitz)</span>
              </div>
            </div>

            <div className="bg-ink p-4 rounded-lg border border-hairline space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sage-dim uppercase font-semibold">Campaign Duration</span>
                <span className="text-brass font-bold">{weeks} Weeks</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={weeks}
                onChange={(e) => setWeeks(parseInt(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-sage-dim">
                <span>1 Wk</span>
                <span>4 Wks (1 Mo)</span>
                <span>8 Wks (2 Mo)</span>
                <span>12 Wks (1 Qtr)</span>
              </div>
            </div>
          </div>

          {/* Add-on Multi-Platform Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-sage-dim tracking-wider font-semibold block">
              2. Multi-Platform Amplifiers (Highest Conversion Levers)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setIncludeOB(!includeOB)}
                className={`p-3 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                  includeOB ? 'bg-moss/20 border-moss text-paper' : 'bg-ink border-hairline text-sage-dim'
                }`}
              >
                <Truck size={16} className={includeOB ? 'text-moss mt-0.5' : 'text-sage-dim mt-0.5'} />
                <div>
                  <div className="font-semibold text-paper">Outside Broadcast (OB)</div>
                  <div className="text-[11px] text-sage mt-0.5">+KSh 180,000 (1 Day Market Rig)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncludeWhatsApp(!includeWhatsApp)}
                className={`p-3 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                  includeWhatsApp ? 'bg-moss/20 border-moss text-paper' : 'bg-ink border-hairline text-sage-dim'
                }`}
              >
                <MessageCircle size={16} className={includeWhatsApp ? 'text-moss mt-0.5' : 'text-sage-dim mt-0.5'} />
                <div>
                  <div className="font-semibold text-paper">WhatsApp Push Blast</div>
                  <div className="text-[11px] text-sage mt-0.5">+KSh 35,000 (10K Contacts)</div>
                </div>
              </button>

              <div className="p-3 rounded-lg bg-ink border border-hairline space-y-1">
                <div className="flex justify-between text-[11px] text-sage font-mono">
                  <span>Live Mentions</span>
                  <span className="text-brass font-bold">{includeLiveMentions}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="5"
                  value={includeLiveMentions}
                  onChange={(e) => setIncludeLiveMentions(parseInt(e.target.value))}
                  className="w-full accent-brass cursor-pointer"
                />
                <div className="text-[10px] text-sage-dim">KSh 4,500 / live read</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Quotation Summary Card */}
        <div className="rounded-xl bg-ink p-5 border border-brass/40 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-hairline pb-2.5">
              <span className="font-mono text-xs uppercase tracking-wider text-brass font-bold">
                CAMPAIGN TOTALS
              </span>
              <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] text-brass">
                {totalSpots} Total Spots
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-hairline/60">
                <span className="text-sage">Airtime Spots ({totalSpots}×)</span>
                <span className="text-paper">KSh {grossSpotsCost.toLocaleString()}</span>
              </div>

              {includeOB && (
                <div className="flex justify-between py-1 border-b border-hairline/60">
                  <span className="text-sage">Field Outside Broadcast</span>
                  <span className="text-moss font-semibold">+KSh 180,000</span>
                </div>
              )}

              {includeWhatsApp && (
                <div className="flex justify-between py-1 border-b border-hairline/60">
                  <span className="text-sage">WhatsApp Push Outreach</span>
                  <span className="text-moss font-semibold">+KSh {whatsAppCost.toLocaleString()}</span>
                </div>
              )}

              {includeLiveMentions > 0 && (
                <div className="flex justify-between py-1 border-b border-hairline/60">
                  <span className="text-sage">Presenter Live Reads ({includeLiveMentions}×)</span>
                  <span className="text-paper">+KSh {liveMentionsCost.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between py-1 text-sage-dim">
                <span>Gross Value</span>
                <span>KSh {totalGross.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between py-1 text-emerald-400 font-bold bg-moss/10 px-2 rounded">
                  <span>Volume Incentive ({(discountRate * 100).toFixed(0)}%)</span>
                  <span>-KSh {discountAmount.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Net Total Investment Box */}
            <div className="rounded-lg bg-ink-2 p-3.5 border border-brass/50 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-sage-dim">
                Net Campaign Investment
              </div>
              <div className="text-2xl sm:text-3xl font-mono text-brass font-bold mt-0.5">
                KSh {netInvestment.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1">
                ≈ {estimatedGrossImpressions.toLocaleString()} Listener Impressions
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={copyProposal}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brass py-2.5 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Campaign Proposal Copied!' : 'Copy Media Plan Summary'}</span>
            </button>
            <div className="text-[10px] font-mono text-center text-sage-dim">
              Includes pre-campaign script production & post-campaign broadcast log
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
