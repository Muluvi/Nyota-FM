import React, { useState } from 'react';
import { Volume2, Play, Pause, Quote, MapPin, Users, Check, Sparkles } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface VoxPop {
  id: string;
  name: string;
  role: string;
  location: string;
  timeOfListening: string;
  quote: string;
  audioStingerFreq: number;
}

const VOX_POPS: VoxPop[] = [
  {
    id: 'vp-1',
    name: 'Mama Mary Nasimiyu',
    role: 'Wholesale Vegetable & Grain Trader',
    location: 'Chwele Market, Bungoma',
    timeOfListening: '06:15 – 08:30 (Kumekucha Breakfast)',
    quote: 'Kabla sijanunua gunia ya mahindi au mboga kwa wakulima wanaotoka Uganda, lazima nisikilize bei za Soko kwenye Nyota FM. Inatusaidia sana kutopoteza pesa.',
    audioStingerFreq: 523.25,
  },
  {
    id: 'vp-2',
    name: 'Wanjala Wafula',
    role: 'Registered Boda-Boda Chairman',
    location: 'Webuye PanPaper Junction',
    timeOfListening: '16:00 – 19:00 (Drive Home)',
    quote: 'Sisi waendeshaji pikipiki zaidi ya 40,000 Bungoma tunaweka redio zetu masikioni siku nzima. Nyota FM inatupa ripoti za dharura za barabarani na taarifa za mikopo ya SACCO.',
    audioStingerFreq: 440,
  },
  {
    id: 'vp-3',
    name: 'Eunice Nekesa',
    role: 'Dairy Farmer & Women SACCO Secretary',
    location: 'Kimilili Slopes, Mt. Elgon',
    timeOfListening: '10:00 – 12:00 (Mulembe Midday)',
    quote: 'Kipindi cha Wanawake wa Twang\'aa kimetufundisha jinsi ya kufuga ng\'ombe wa kisasa wa maziwa. Tangazo la mbegu nililolisikia Nyota ndilo ninalotumia shambani mwangu.',
    audioStingerFreq: 659.25,
  },
  {
    id: 'vp-4',
    name: 'Omwami Peter Barasa',
    role: 'Livestock Dealer & Elder',
    location: 'Lubao Cattle Market, Kakamega',
    timeOfListening: '06:00 – 07:00 & Weekend Townhalls',
    quote: 'Watu wa Kakamega tunapenda heshima na ukweli. Watangazaji wa Nyota wanajua utamaduni wetu wa Luhya na hawatusahau kwa lugha yetu.',
    audioStingerFreq: 392,
  },
];

export function ListenerVoxPop() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playVoiceChime = (vp: VoxPop) => {
    setPlayingId(vp.id);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(vp.audioStingerFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(vp.audioStingerFreq * 1.3, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}

    setTimeout(() => {
      setPlayingId(null);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Quote size={14} />
            <span className="uppercase tracking-widest font-semibold">Audience Research · Field Vox Pop</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Western Kenya In-Field Qualitative Listener Audits 2025/2026" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Grassroots Listener Panel & Qualitative Testimonials
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Real verbatim testimonials from market traders, transport operators, and rural farmers explaining their daily tuning habits and commercial brand trust.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VOX_POPS.map((vp) => {
          const isPlaying = playingId === vp.id;
          return (
            <div
              key={vp.id}
              className="rounded-xl border border-hairline bg-ink p-4 sm:p-5 space-y-3 hover:border-brass/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-paper text-sm block">{vp.name}</span>
                    <span className="text-xs text-brass font-mono block">{vp.role}</span>
                    <div className="flex items-center gap-1 text-[11px] text-sage-dim font-mono mt-0.5">
                      <MapPin size={11} className="text-brass" />
                      <span>{vp.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => playVoiceChime(vp)}
                    className={`h-8 w-8 rounded-full border flex items-center justify-center transition-colors ${
                      isPlaying
                        ? 'border-brass bg-brass text-ink animate-pulse'
                        : 'border-hairline text-sage hover:border-brass hover:text-brass'
                    }`}
                    title="Play voice stinger"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>

                <p className="text-xs font-serif italic text-paper/90 leading-relaxed pt-1">
                  "{vp.quote}"
                </p>
              </div>

              <div className="pt-2 border-t border-hairline text-[10px] font-mono text-sage-dim flex justify-between">
                <span>Listening Window:</span>
                <span className="text-emerald-400 font-semibold">{vp.timeOfListening}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
