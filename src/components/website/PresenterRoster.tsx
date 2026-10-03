import React, { useState } from 'react';
import { Users, Mic, Sparkles, Heart, Radio, ShieldCheck, Check } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface Presenter {
  id: string;
  name: string;
  show: string;
  slot: string;
  vernacular: string;
  catchphrase: string;
  bio: string;
  endorsements: string[];
  followerCount: string;
}

const PRESENTERS: Presenter[] = [
  {
    id: 'p-1',
    name: 'Achieng & Otieno',
    show: 'The Morning Signal (Kumekucha)',
    slot: '06:00 – 10:00 Weekdays',
    vernacular: 'Swahili, Bukusu & Luo Blended',
    catchphrase: 'Kumekucha Western! Amka twang\'aa, jasho ya mkulima hailali!',
    bio: 'Western Kenya’s commanding breakfast duo. Hard-hitting county governance accountability, rural citizen advocacy, and real-time Chwele wholesale commodity prices.',
    endorsements: ['Equity Bank Kilimo', 'Kenya Seed Company', 'Safaricom M-Pesa'],
    followerCount: '145,000+ Cross-Platform',
  },
  {
    id: 'p-2',
    name: 'Miriam Wekesa',
    show: 'Soko Nyota & Mulembe Midday',
    slot: '10:00 – 14:00 Weekdays',
    vernacular: 'Conversational Swahili & Bukusu',
    catchphrase: 'Soko imefunguka! Pesa mfukoni, furaha nyumbani!',
    bio: 'Beloved household radio companion for market traders, rural mothers, and cooperative society leaders. Focuses on maternal health, agribusiness tips, and Luhya classics.',
    endorsements: ['Unga Limited (Taifa)', 'Kenchic Feeds', 'SHIF / Healthcare Brands'],
    followerCount: '98,000+ Cross-Platform',
  },
  {
    id: 'p-3',
    name: 'Juma & Sifa',
    show: 'Drive Home 107.3 (Kurejea Nyumbani)',
    slot: '16:00 – 19:00 Weekdays',
    vernacular: 'Sheng, Swahili & Wanga Dialect',
    catchphrase: 'Tuko kwa barabara, ngoma kwa mpigo! Hapa Tulipo, Twang\'aa!',
    bio: 'High-octane evening drive show featuring Malaba border freight logistics updates, regional sports banter (AFC Leopards & Kakamega Homeboyz), and viral comedy.',
    endorsements: ['TotalEnergies Kenya', 'Boda-Boda SACCOs', 'Energy Drinks'],
    followerCount: '120,000+ Cross-Platform',
  },
  {
    id: 'p-4',
    name: 'Brenda Nekesa',
    show: 'Wanawake wa Twang\'aa',
    slot: '08:00 – 12:00 Saturdays',
    vernacular: 'Bukusu & Swahili',
    catchphrase: 'Mwanamke hodari, taa ya jamii nzima!',
    bio: 'Award-winning community champion profiling women entrepreneurs, table-banking SACCO networks, and championing girl-child education across Mt. Elgon and Sirisia.',
    endorsements: ['Co-operative Bank Wezesha', 'Solar Water Pump Manufacturers'],
    followerCount: '76,000+ Cross-Platform',
  },
];

export function PresenterRoster() {
  const [activePresenter, setActivePresenter] = useState<Presenter>(PRESENTERS[0]);

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Mic size={14} />
            <span className="uppercase tracking-widest font-semibold">Broadcast Talent & On-Air Roster</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Audience Panel Recognition & Vernacular Authenticity Study" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Nyota FM Anchor Lineup & Commercial Endorsers
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Meet the authentic on-air voices that command listener trust across Western Kenya. Presenters driving 68% peak morning share and high-conversion commercial live mentions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Presenter Cards List */}
        <div className="lg:col-span-5 space-y-2">
          {PRESENTERS.map((p) => {
            const isSelected = activePresenter.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePresenter(p)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-brass bg-brass/10 text-paper font-semibold shadow'
                    : 'border-hairline bg-ink text-sage hover:text-paper hover:border-hairline-light'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-paper">{p.name}</h4>
                  <span className="text-[10px] text-brass font-mono">{p.show}</span>
                  <span className="text-[10px] text-sage-dim block font-mono">{p.slot}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {p.followerCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Presenter Profile Card */}
        <div className="lg:col-span-7 rounded-xl border border-hairline bg-ink p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between border-b border-hairline pb-3">
            <div>
              <h4 className="font-display text-2xl font-bold text-paper">{activePresenter.name}</h4>
              <span className="text-xs font-mono text-brass block mt-0.5">
                {activePresenter.show} · {activePresenter.slot}
              </span>
              <span className="text-[11px] font-mono text-moss block mt-0.5">
                Vernacular Fluency: {activePresenter.vernacular}
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-brass/20 text-brass flex items-center justify-center border border-brass/40">
              <Mic size={18} />
            </div>
          </div>

          <div className="p-3 rounded bg-ink-2 border border-hairline/80 italic font-serif text-paper text-sm leading-relaxed">
            "{activePresenter.catchphrase}"
          </div>

          <p className="text-xs font-sans text-sage leading-relaxed">
            {activePresenter.bio}
          </p>

          <div className="pt-2 border-t border-hairline space-y-1.5">
            <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block font-bold">
              TRUSTED ADVERTISER ENDORSEMENTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activePresenter.endorsements.map((end, idx) => (
                <span
                  key={idx}
                  className="rounded bg-ink-2 border border-hairline px-2.5 py-1 text-xs font-mono text-paper"
                >
                  {end}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
