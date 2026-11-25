import React, { useState } from 'react';
import { Headphones, Calendar, Youtube } from 'lucide-react';
import { Illustrative } from '../Illustrative';

/**
 * Season 1 plan. No episodes have been recorded yet, so this shows planned
 * concepts only: no fake playback, dates, hosts or sponsors.
 */
interface PlannedEpisode {
  id: string;
  series: string;
  title: string;
  length: string;
  summary: string;
}

const EPISODES: PlannedEpisode[] = [
  {
    id: 'ep-1',
    series: 'Kumekucha Deep Dive',
    title: 'Chwele market and Bungoma’s cross-border trade corridor',
    length: '≈25–30 min',
    summary: 'Infrastructure, wholesale grain pricing and transport links with Uganda, reported from the market.',
  },
  {
    id: 'ep-2',
    series: 'Sauti ya Nchi Townhall',
    title: 'Sugarcane revival and farmer arrears',
    length: '≈40 min',
    summary: 'A moderated debate on mill revival and farmer payments. Figures will be checked against official sources before recording.',
  },
  {
    id: 'ep-3',
    series: 'Wanawake wa Twang’aa',
    title: 'Table banking in Sirisia and Webuye',
    length: '≈25 min',
    summary: 'How women-led savings groups finance small enterprises without commercial collateral.',
  },
  {
    id: 'ep-4',
    series: 'Mulembe Folk Legends',
    title: 'The litungu and Bukusu musical heritage',
    length: '≈35 min',
    summary: 'Recording and explaining traditional litungu melodies and proverbs with cultural elders.',
  },
];

export function PodcastArchivePlayer() {
  const [activeEp, setActiveEp] = useState<PlannedEpisode>(EPISODES[0]);

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-brass">
            <Headphones size={14} />
            <span className="uppercase tracking-widest font-semibold">Podcasts · Strategy 5.9</span>
            <Illustrative note="Planned episodes; nothing recorded yet" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">Season 1 plan</h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            8 planned episodes, video-first on YouTube with audio on Spotify and Apple Podcasts, launching around Month 4. Nairobi
            accounts for most Kenyan podcast streams (Spotify, 2025), so the target listener is the diaspora and Nairobi-based
            Luhya audience, not local FM listeners.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <ul className="lg:col-span-6 space-y-2">
          {EPISODES.map((ep) => {
            const selected = ep.id === activeEp.id;
            return (
              <li key={ep.id}>
                <button
                  type="button"
                  onClick={() => setActiveEp(ep)}
                  aria-pressed={selected}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selected ? 'border-brass bg-brass/10' : 'border-hairline bg-ink hover:border-brass/50'
                  }`}
                >
                  <span className="text-[11px] font-mono text-brass">{ep.series}</span>
                  <h4 className="text-sm font-semibold text-paper">{ep.title}</h4>
                  <span className="text-[11px] font-mono text-sage-dim">{ep.length} · planned</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-6 rounded-xl border border-hairline bg-ink p-5 space-y-3">
          <span className="text-[11px] font-mono text-brass uppercase tracking-wider">{activeEp.series}</span>
          <h4 className="font-display text-lg text-paper font-semibold">{activeEp.title}</h4>
          <p className="text-xs text-sage leading-relaxed">{activeEp.summary}</p>
          <div className="flex flex-wrap gap-3 pt-2 border-t border-hairline text-[11px] font-mono text-sage-dim">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> Release: from Month 4 (planned)
            </span>
            <span className="flex items-center gap-1.5">
              <Youtube size={12} /> Video on YouTube; audio feeds via RSS
            </span>
          </div>
          <p className="text-[11px] font-mono text-moss">Title sponsor: slot available</p>
        </div>
      </div>
    </div>
  );
}
