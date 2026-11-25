import React, { useState } from 'react';
import { Users, Mic, Sparkles, Heart, Radio, ShieldCheck, Check } from 'lucide-react';
import { Illustrative } from '../Illustrative';

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
    name: 'Breakfast co-hosts (to be cast)',
    show: 'The Morning Signal (Kumekucha)',
    slot: '06:00 – 10:00 Weekdays',
    vernacular: 'Swahili & Bukusu',
    catchphrase: 'Kumekucha Western! Amka twang\'aa, jasho ya mkulima hailali!',
    bio: 'Proposed format: a breakfast pairing with county governance accountability, rural citizen advocacy, and real-time Chwele wholesale commodity prices.',
    endorsements: ['Agricultural lender', 'Seed & agro-input supplier', 'Mobile money provider'],
    followerCount: 'TBC',
  },
  {
    id: 'p-2',
    name: 'Midday host (to be cast)',
    show: 'Soko Nyota & Mulembe Midday',
    slot: '10:00 – 14:00 Weekdays',
    vernacular: 'Conversational Swahili & Bukusu',
    catchphrase: 'Soko imefunguka! Pesa mfukoni, furaha nyumbani!',
    bio: 'Proposed format: a household companion show for market traders, rural mothers, and cooperative society leaders. Focuses on maternal health, agribusiness tips, and Luhya classics.',
    endorsements: ['Flour & FMCG brand', 'Animal-feed supplier', 'Health services'],
    followerCount: 'TBC',
  },
  {
    id: 'p-3',
    name: 'Drive co-hosts (to be cast)',
    show: 'Drive Home 107.3 (Kurejea Nyumbani)',
    slot: '16:00 – 19:00 Weekdays',
    vernacular: 'Sheng, Swahili & Wanga Dialect',
    catchphrase: 'Tuko kwa barabara, ngoma kwa mpigo! Hapa Tulipo, Twang\'aa!',
    bio: 'Proposed format: an evening drive show with Malaba border freight logistics updates, regional sports banter (AFC Leopards & Kakamega Homeboyz), and viral comedy.',
    endorsements: ['Fuel retailer', 'Boda-boda SACCOs', 'Beverage brand'],
    followerCount: 'TBC',
  },
  {
    id: 'p-4',
    name: 'Weekend women’s show host (to be cast)',
    show: 'Wanawake wa Twang\'aa',
    slot: '08:00 – 12:00 Saturdays',
    vernacular: 'Bukusu & Swahili',
    catchphrase: 'Mwanamke hodari, taa ya jamii nzima!',
    bio: 'Proposed format: a weekend show profiling women entrepreneurs, table-banking SACCO networks, and girl-child education across Mt. Elgon and Sirisia.',
    endorsements: ['Bank women’s-enterprise product', 'Solar equipment supplier'],
    followerCount: 'TBC',
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
            <span className="uppercase tracking-widest font-semibold">Talent Model · Roles We Will Cast</span>
            <span className="text-sage-dim">·</span>
            <Illustrative note="Roles to be cast; no named presenters or brand endorsements until contracted" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Proposed On-Air Roles & Sponsor Categories
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            The on-air roles the v2 schedule needs, with the kinds of sponsor each format suits. Real Nyota presenters, with consent, replace these placeholders; brand names appear only once contracts exist.
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
                <span className="text-xs font-mono text-sage-dim font-bold">
                  Followers: {p.followerCount}
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
              SPONSOR CATEGORIES THIS FORMAT SUITS
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
