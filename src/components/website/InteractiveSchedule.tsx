import React, { useState } from 'react';
import { Calendar, Clock, Radio, Play, Pause, Volume2, User, Sparkles, DollarSign, Award } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface ShowItem {
  id: string;
  time: string;
  title: string;
  hosts: string;
  category: 'News & Current Affairs' | 'Lifestyle & Music' | 'Faith & Inspiration' | 'Civic & Agriculture';
  demographic: string;
  commercialRate: string;
  description: string;
  toneFrequency: number;
}

const WEEKDAY_SHOWS: ShowItem[] = [
  { id: 'w-1', time: '06:00 – 10:00', title: 'The Morning Signal (Kumekucha)', hosts: 'Achieng & Otieno', category: 'News & Current Affairs', demographic: 'Working adults, farmers, transport operators (25–54)', commercialRate: 'KSh 350,000 / mo Title Sponsor', description: 'Western Kenya\'s agenda-setting breakfast show. Local news headlines in Swahili and Bukusu, agricultural commodity prices, and hard-hitting interview segments.', toneFrequency: 440 },
  { id: 'w-2', time: '10:00 – 14:00', title: 'Mulembe Midday & Soko Nyota', hosts: 'Miriam Wekesa', category: 'Lifestyle & Music', demographic: 'Market traders, homemakers, SMEs, rural mothers', commercialRate: 'KSh 220,000 / mo Title Sponsor', description: 'Lively community call-in discussions, household economics, health advice, and traditional Luhya music classics interspersed with contemporary Afrobeats.', toneFrequency: 523.25 },
  { id: 'w-3', time: '14:00 – 16:00', title: 'The Community Desk & Civic Radar', hosts: 'Nyota Newsroom Hub', category: 'Civic & Agriculture', demographic: 'Community leaders, grassroots civil society, youth', commercialRate: 'KSh 180,000 / mo Title Sponsor', description: 'Investigative civic journalism, county assembly tracking in Bungoma and Kakamega, and rural citizen grievance resolution.', toneFrequency: 587.33 },
  { id: 'w-4', time: '16:00 – 19:00', title: 'Drive Home 107.3 (Kurejea Nyumbani)', hosts: 'Juma & Sifa', category: 'Lifestyle & Music', demographic: 'Commuters, cross-border traders, urban professionals', commercialRate: 'KSh 280,000 / mo Title Sponsor', description: 'High-energy evening drive show with real-time road condition alerts, border logistics news, sports roundup, and comedic listener call-ins.', toneFrequency: 659.25 },
  { id: 'w-5', time: '19:00 – 22:00', title: 'The Night Beacon (Mwangaza wa Usiku)', hosts: 'Pastor Barasa & Guests', category: 'Faith & Inspiration', demographic: 'Family audiences, elders, students', commercialRate: 'KSh 140,000 / mo Title Sponsor', description: 'Reflective evening storytelling, relationship counselling, folk heritage preservation, and calming acoustic music.', toneFrequency: 783.99 },
];

const WEEKEND_SHOWS: ShowItem[] = [
  { id: 'sat-1', time: '08:00 – 12:00 (Sat)', title: 'Wanawake wa Twang\'aa', hosts: 'Brenda Nekesa', category: 'Lifestyle & Music', demographic: 'Women entrepreneurs, table-banking SACCOs', commercialRate: 'KSh 180,000 / mo Package', description: 'Financial literacy, maternal health advice, and profile features on inspiring women leaders in Western Kenya.', toneFrequency: 493.88 },
  { id: 'sat-2', time: '18:00 – 23:00 (Sat)', title: 'Hapa Tulipo DJ Club Mix', hosts: 'DJ Dan & MC Mike', category: 'Lifestyle & Music', demographic: 'Youth (18–34), university students, boda-boda operators', commercialRate: 'KSh 240,000 / mo Package', description: 'Premier weekend dance party broadcast live from partnering clubs and regional festivals across Bungoma and Kakamega.', toneFrequency: 392.0 },
  { id: 'sun-1', time: '06:00 – 11:00 (Sun)', title: 'Asuhi ya Imani (Gospel Dawn)', hosts: 'Evangelist Wafula', category: 'Faith & Inspiration', demographic: 'All-family religious demographic', commercialRate: 'KSh 260,000 / mo Package', description: 'Uplifting choir ministry, regional church announcements, scripture reflection, and phone-in prayers.', toneFrequency: 523.25 },
  { id: 'sun-2', time: '16:00 – 19:00 (Sun)', title: 'Sauti ya Nchi (Civic Townhall)', hosts: 'Senior Editorial Team', category: 'Civic & Agriculture', demographic: 'County policymakers, MPs, MCA aspirants, teachers', commercialRate: 'KSh 200,000 / mo Package', description: 'High-stakes Sunday evening debate with regional political leaders, vetting county expenditures and accountability.', toneFrequency: 659.25 },
];

export function InteractiveSchedule() {
  const [dayType, setDayType] = useState<'weekday' | 'weekend'>('weekday');
  const [activeShowId, setActiveShowId] = useState<string>(WEEKDAY_SHOWS[0].id);
  const [playingShowId, setPlayingShowId] = useState<string | null>(null);

  const activeShows = dayType === 'weekday' ? WEEKDAY_SHOWS : WEEKEND_SHOWS;
  const currentShow = activeShows.find((s) => s.id === activeShowId) || activeShows[0];

  const playShowStinger = (show: ShowItem) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(show.toneFrequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(show.toneFrequency * 1.5, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(show.toneFrequency, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);

      setPlayingShowId(show.id);
      setTimeout(() => setPlayingShowId(null), 1200);
    } catch (e) {
      console.warn('Stinger playback error', e);
    }
  };

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Programming Grid
            </span>
            <span className="font-mono text-xs text-sage-dim">· 7-Day Broadcast Architecture</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Flagship Broadcast Schedule & Audio Stinger Previewer
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Explore Nyota FM&apos;s disciplined programme lineup. Click on any show to view presenter profiles, audience demographics, sponsorship rates, and play synthesized show sound stingers.
          </p>
        </div>

        {/* Weekday vs Weekend Switcher */}
        <div className="flex items-center gap-1.5 font-mono text-xs bg-ink p-1 rounded-lg border border-hairline">
          <button
            type="button"
            onClick={() => {
              setDayType('weekday');
              setActiveShowId(WEEKDAY_SHOWS[0].id);
            }}
            className={`px-3 py-1.5 rounded transition-all ${
              dayType === 'weekday' ? 'bg-brass text-ink font-bold shadow-md' : 'text-sage hover:text-paper'
            }`}
          >
            Monday – Friday Grid
          </button>
          <button
            type="button"
            onClick={() => {
              setDayType('weekend');
              setActiveShowId(WEEKEND_SHOWS[0].id);
            }}
            className={`px-3 py-1.5 rounded transition-all ${
              dayType === 'weekend' ? 'bg-brass text-ink font-bold shadow-md' : 'text-sage hover:text-paper'
            }`}
          >
            Weekend Flagship Shows
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Show Timeslot List (1 col) */}
        <div className="space-y-2 lg:border-r lg:border-hairline lg:pr-4">
          <div className="text-[11px] font-mono uppercase text-sage-dim tracking-wider font-semibold mb-2">
            Select Timeslot
          </div>
          {activeShows.map((show) => {
            const isSelected = activeShowId === show.id;
            return (
              <div
                key={show.id}
                onClick={() => setActiveShowId(show.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-brass/15 border-brass text-paper'
                    : 'bg-ink border-hairline text-sage hover:text-paper hover:bg-ink-2'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-brass font-bold">{show.time}</span>
                  </div>
                  <h4 className="font-display text-sm font-semibold mt-0.5 text-paper">{show.title}</h4>
                  <div className="text-[11px] text-sage-dim font-mono">{show.hosts}</div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playShowStinger(show);
                  }}
                  className={`size-8 rounded-full grid place-items-center transition-all ${
                    playingShowId === show.id ? 'bg-moss text-ink' : 'bg-ink text-brass hover:bg-brass hover:text-ink'
                  }`}
                  title="Play show audio stinger"
                >
                  {playingShowId === show.id ? <Volume2 size={13} className="animate-ping" /> : <Play size={13} className="ml-0.5" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Active Show Deep-Dive Card (2 cols) */}
        <div className="lg:col-span-2 rounded-xl bg-ink p-5 sm:p-6 border border-hairline flex flex-col justify-between space-y-5 animate-section-entrance">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-brass font-bold">{currentShow.time}</span>
                  <span className="rounded bg-hairline px-2 py-0.5 font-mono text-[10px] text-sage">
                    {currentShow.category}
                  </span>
                </div>
                <h4 className="font-display text-2xl text-paper font-bold mt-1">{currentShow.title}</h4>
                <div className="text-xs font-mono text-brass flex items-center gap-1.5 mt-0.5">
                  <User size={12} />
                  <span>Presented by {currentShow.hosts}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => playShowStinger(currentShow)}
                className="flex items-center gap-2 rounded-lg bg-brass px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Play size={13} />
                <span>Play Sound Stinger</span>
              </button>
            </div>

            <p className="text-sm font-body text-paper/90 leading-relaxed">
              {currentShow.description}
            </p>

            {/* Demographics & Commercial Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-ink-2 border border-hairline space-y-1">
                <span className="text-[10px] font-mono uppercase text-sage-dim tracking-wider block">
                  Core Audience Demographic
                </span>
                <span className="text-xs font-mono text-paper font-semibold block">
                  {currentShow.demographic}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-ink-2 border border-brass/40 space-y-1">
                <span className="text-[10px] font-mono uppercase text-brass tracking-wider block">
                  Title Sponsorship Benchmark
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  {currentShow.commercialRate}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-sage-dim">
            <span>Broadcasts in Swahili & regional vernacular across 5 Western Kenya counties.</span>
            <span className="text-brass">Includes live video feed on YouTube & Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
}
