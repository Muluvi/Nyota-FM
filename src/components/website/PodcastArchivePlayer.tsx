import React, { useState } from 'react';
import { Play, Pause, Headphones, Clock, Calendar, Volume2, Share2, Sparkles, Check, Bookmark } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface PodcastEpisode {
  id: string;
  series: string;
  title: string;
  duration: string;
  date: string;
  host: string;
  summary: string;
  sponsors: string;
  frequencyHz: number;
}

const EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-1',
    series: 'Kumekucha Deep Dive',
    title: 'The Great Chwele Market Expansion: Bungoma’s Trade Corridor',
    duration: '28 min',
    date: 'Oct 2026',
    host: 'Achieng & Otieno',
    summary: 'An investigative report into infrastructure upgrades, wholesale grain pricing disputes, and cross-border transport linkages with Uganda.',
    sponsors: 'One Acre Fund Kilimo',
    frequencyHz: 440,
  },
  {
    id: 'ep-2',
    series: 'Sauti ya Nchi Townhall',
    title: 'Sugarcane Revival: Nzoia vs Mumias Mills and Farmer Arrears',
    duration: '42 min',
    date: 'Sep 2026',
    host: 'Senior Editorial Team',
    summary: 'High-stakes debate vetting the KSh 1.2B government bailout, sugarcane poaching disputes, and direct payment timelines for Western farmers.',
    sponsors: 'Kenya Sugar Board & KCB',
    frequencyHz: 523.25,
  },
  {
    id: 'ep-3',
    series: 'Wanawake wa Twang\'aa',
    title: 'The Table-Banking Revolution in Sirisia & Webuye',
    duration: '24 min',
    date: 'Sep 2026',
    host: 'Brenda Nekesa',
    summary: 'How grassroots women-led SACCOs are financing solar-powered water pumps and poultry enterprises without commercial collateral.',
    sponsors: 'Equity Bank Mama Special',
    frequencyHz: 659.25,
  },
  {
    id: 'ep-4',
    series: 'Mulembe Folk Legends',
    title: 'The Sound of the Litungu: Preserving Bukusu Musical Heritage',
    duration: '35 min',
    date: 'Aug 2026',
    host: 'Pastor Barasa & Cultural Elders',
    summary: 'An acoustic archive recording exploring traditional Luhya seven-stringed litungu melodies, lyrical proverbs, and modern recording techniques.',
    sponsors: 'Bungoma County Cultural Fund',
    frequencyHz: 392,
  },
];

export function PodcastArchivePlayer() {
  const [activeEp, setActiveEp] = useState<PodcastEpisode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const togglePlay = (ep: PodcastEpisode) => {
    if (activeEp.id === ep.id && isPlaying) {
      setIsPlaying(false);
      return;
    }

    setActiveEp(ep);
    setIsPlaying(true);

    // Play subtle audio stinger
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(ep.frequencyHz, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(ep.frequencyHz * 1.5, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Headphones size={14} />
            <span className="uppercase tracking-widest font-semibold">Digital Syndication · Strategy 5.4</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="African Podcast Advertising CPM Benchmarks ($3–$8 CPM)" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Nyota On-Demand Digital Podcast Archive
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Stream flagship investigative packages and civic townhalls on-demand. Digital derivative distribution across Spotify, Apple Podcasts, and the Nyota mobile web player.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Episode Playlist */}
        <div className="lg:col-span-6 space-y-2">
          {EPISODES.map((ep) => {
            const isSelected = activeEp.id === ep.id;
            const currentPlaying = isSelected && isPlaying;
            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => togglePlay(ep)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-brass bg-brass/10 text-paper font-semibold shadow'
                    : 'border-hairline bg-ink text-sage hover:text-paper hover:border-hairline-light'
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center transition-colors ${
                    currentPlaying
                      ? 'bg-brass text-ink animate-pulse'
                      : 'bg-ink-2 border border-hairline text-brass'
                  }`}
                >
                  {currentPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-brass">
                    <span>{ep.series}</span>
                    <span className="text-sage-dim">·</span>
                    <span className="text-sage-dim">{ep.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-paper mt-0.5 truncate">{ep.title}</h4>
                  <p className="text-[11px] text-sage-dim font-sans line-clamp-1 mt-0.5">{ep.summary}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Player Deck */}
        <div className="lg:col-span-6 rounded-xl border border-hairline bg-ink p-5 space-y-4">
          <div className="flex items-start justify-between border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-wider block">
                {activeEp.series}
              </span>
              <h4 className="font-display text-base font-bold text-paper mt-0.5">
                {activeEp.title}
              </h4>
              <span className="text-[10px] font-mono text-sage-dim block mt-0.5">
                Hosted by {activeEp.host} · {activeEp.date}
              </span>
            </div>

            <button
              type="button"
              onClick={() => togglePlay(activeEp)}
              className="h-10 w-10 rounded-full bg-brass text-ink flex items-center justify-center hover:brightness-110 shadow"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
          </div>

          <p className="text-xs font-sans text-sage leading-relaxed">
            {activeEp.summary}
          </p>

          {/* Player controls */}
          <div className="rounded-lg bg-ink-2 border border-hairline p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-sage">
              <span>{isPlaying ? '04:12' : '00:00'}</span>
              <div className="flex-1 mx-3 h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-brass transition-all duration-300"
                  style={{ width: isPlaying ? '35%' : '0%' }}
                />
              </div>
              <span>{activeEp.duration}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-sage">
                <span>Speed:</span>
                {[1, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      playbackSpeed === spd ? 'bg-brass text-ink font-bold' : 'text-sage hover:text-paper'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-mono text-moss">
                Title Sponsor: {activeEp.sponsors}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
