import React, { useState } from 'react';
import { Award, Gift, Smartphone, Zap, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function LoyaltyClubEngine() {
  const [points, setPoints] = useState<number>(340);
  const [redeemedItem, setRedeemedItem] = useState<string | null>(null);

  const earnActivities = [
    { name: 'Daily Morning USSD Check-In (*483#)', pts: 10 },
    { name: 'Vote in Kumekucha WhatsApp Morning Poll', pts: 15 },
    { name: 'Check-in at Hapa Tulipo Market Roadshow', pts: 50 },
    { name: 'Submit Verified Citizen Journalism Tip', pts: 100 },
  ];

  const rewardCatalog = [
    { id: 'r1', title: 'KSh 50 Safaricom Airtime (Instant M-Pesa)', costPts: 100, sponsor: 'Safaricom B2C' },
    { id: 'r2', title: 'Official Nyota FM 107.3 Branded Cap', costPts: 250, sponsor: 'Nyota Merch Hub' },
    { id: 'r3', title: 'Solar Lantern with Mobile Charger', costPts: 600, sponsor: 'D.Light Solar Western' },
    { id: 'r4', title: 'VIP Bungoma Studio Co-Host Experience', costPts: 1500, sponsor: 'Editorial Board' },
  ];

  const handleEarn = (pts: number) => {
    setPoints((prev) => prev + pts);
  };

  const handleRedeem = (item: typeof rewardCatalog[0]) => {
    if (points >= item.costPts) {
      setPoints((prev) => prev - item.costPts);
      setRedeemedItem(item.title);
      setTimeout(() => setRedeemedItem(null), 3500);
    }
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Award size={14} />
            <span className="uppercase tracking-widest font-semibold">Audience Gamification · Strategy 5.8</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Safaricom B2C M-Pesa API & First-Party Listener Retention Data" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            "Twang'aa Club" Listener Loyalty & Instant M-Pesa Rewards
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Simulate how Nyota FM incentivizes daily radio listening and mobile participation. Listeners accumulate first-party verified points redeemable for automated airtime and local sponsor merchandise.
          </p>
        </div>

        {/* Current Points Badge */}
        <div className="rounded-xl border border-brass/50 bg-ink p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brass/20 text-brass flex items-center justify-center font-bold">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
              Active Loyalty Balance
            </span>
            <span className="font-display text-2xl font-bold text-brass tabular-nums">
              {points.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>

      {redeemedItem && (
        <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-section-entrance">
          <Check size={16} />
          <span>Success! Redeemed <strong>{redeemedItem}</strong>. Dispatched to registered Safaricom mobile line.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ways to Earn Points */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-mono text-brass uppercase tracking-wider font-semibold block">
            HOW LISTENERS ACCUMULATE POINTS
          </span>
          <div className="space-y-2">
            {earnActivities.map((act, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-ink border border-hairline flex items-center justify-between text-xs font-mono"
              >
                <span className="text-paper">{act.name}</span>
                <button
                  type="button"
                  onClick={() => handleEarn(act.pts)}
                  className="px-2.5 py-1 rounded bg-brass/15 text-brass font-bold border border-brass/40 hover:bg-brass hover:text-ink transition-colors"
                >
                  +{act.pts} pts
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Catalog */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
            REDEEM FIRST-PARTY REWARDS
          </span>
          <div className="space-y-2">
            {rewardCatalog.map((rew) => {
              const canAfford = points >= rew.costPts;
              return (
                <div
                  key={rew.id}
                  className="p-3 rounded-lg bg-ink border border-hairline flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <span className="text-paper font-semibold block">{rew.title}</span>
                    <span className="text-[10px] text-sage-dim">Sponsored by {rew.sponsor}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRedeem(rew)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded font-bold transition-all ${
                      canAfford
                        ? 'bg-brass text-ink hover:brightness-110 shadow'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    {rew.costPts} pts
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
