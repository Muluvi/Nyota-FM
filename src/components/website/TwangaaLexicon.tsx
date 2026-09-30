import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Music, Play, Check, Globe2 } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface LexiconWord {
  term: string;
  phonetic: string;
  dialect: 'Bukusu' | 'Maragoli' | 'Wanga' | 'Tachoni' | 'Regional Swahili';
  translation: string;
  stationContext: string;
  commercialValue: string;
  frequencyHz: number;
}

const WORDS: LexiconWord[] = [
  {
    term: 'Twang\'aa',
    phonetic: 'twan-GAH',
    dialect: 'Bukusu',
    translation: 'To shine brightly, radiate excellence, or illuminate the community.',
    stationContext: 'The core tagline of Nyota FM ("Sauti Yetu, Twang\'aa!"). Used at top of the hour and after commercial breaks.',
    commercialValue: 'Forms the emotional anchor of the brand, differentiating Nyota FM from sterile Nairobi national radio.',
    frequencyHz: 523.25,
  },
  {
    term: 'Mulembe',
    phonetic: 'moo-LEM-bay',
    dialect: 'Regional Swahili',
    translation: 'Peace, tranquility, and the universal greetings of Western Kenya Luhya communities.',
    stationContext: 'Opening greeting across all morning, midday, and drive shows ("Mulembe Bungoma, Mulembe Western!").',
    commercialValue: 'Universal cultural salute that unites all 18 Luhya sub-tribes across Bungoma, Kakamega, Busia, and Vihiga.',
    frequencyHz: 440.0,
  },
  {
    term: 'Kumekucha',
    phonetic: 'koo-may-KOO-cha',
    dialect: 'Regional Swahili',
    translation: 'The dawn has broken / The new day has arrived.',
    stationContext: 'Flagship breakfast show title (06:00–10:00). Signals the start of trade at Chwele Market and farming activities.',
    commercialValue: 'Commanding morning daypart listenership (68% peak morning share), prime slot for banks and agro-input ads.',
    frequencyHz: 587.33,
  },
  {
    term: 'Omusomi',
    phonetic: 'oh-moo-SOH-mee',
    dialect: 'Bukusu',
    translation: 'The learned reader, scholar, or trusted civic leader whose words carry integrity.',
    stationContext: 'Used by news anchors to address teachers, civil society voices, and senior county advisors on the Sunday Townhall.',
    commercialValue: 'Establishes high journalistic authority, indispensable for winning GAA public sector civic campaigns.',
    frequencyHz: 659.25,
  },
  {
    term: 'Soko Nyota',
    phonetic: 'SOH-koh NYOH-tah',
    dialect: 'Regional Swahili',
    translation: 'The Star Marketplace / Grassroots Commerce Hub.',
    stationContext: 'Midday show segment (10:00–14:00) offering live farm commodity prices and local market classifieds.',
    commercialValue: 'Direct monetization stream for local SMEs, agro-vets, hardware stores, and mobile money agents.',
    frequencyHz: 493.88,
  },
  {
    term: 'Hapa Tulipo',
    phonetic: 'HAH-pah too-LEE-poh',
    dialect: 'Regional Swahili',
    translation: 'Right where we are / On the ground with the people.',
    stationContext: 'Nyota FM outside broadcast (OB) rig branding and weekend roadshow tour vehicle.',
    commercialValue: 'Generates KSh 150,000–350,000 per field market day through FMCG product samplings and brand activations.',
    frequencyHz: 392.0,
  },
  {
    term: 'Kamabeka',
    phonetic: 'kah-mah-BAY-kah',
    dialect: 'Bukusu',
    translation: 'The rhythmic shoulder-shivering traditional Luhya celebration dance.',
    stationContext: 'Featured during Friday evening and Saturday night club mixes ("Hapa Tulipo DJ Club Mix").',
    commercialValue: 'Drives youth brand sponsorships (telecom bundles, energy drinks, and fashion retail).',
    frequencyHz: 783.99,
  },
];

export function TwangaaLexicon() {
  const [activeWord, setActiveWord] = useState<LexiconWord>(WORDS[0]);
  const [playingTerm, setPlayingTerm] = useState<string | null>(null);

  const pronounceWord = (word: LexiconWord) => {
    setPlayingTerm(word.term);

    // Play harmonious synth stinger
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(word.frequencyHz, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(word.frequencyHz * 1.5, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}

    // Web Speech Synthesis if available
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word.term);
        utterance.rate = 0.85;
        utterance.pitch = 1.05;
        utterance.lang = 'sw-KE';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}

    setTimeout(() => {
      setPlayingTerm(null);
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/10 border border-brass/30 px-2.5 py-0.5 text-[10px] font-mono text-brass font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Cultural Moat & Linguistic Authenticity
            </span>
            <TierBadge tier={1} citation="KNBS County Census & Luhya Linguistic Dialect Atlas" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Western Kenya Dialect & Audio Lexicon Engine
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Nyota FM's irreplaceable competitive advantage over Nairobi broadcasters is genuine regional vernacular resonance. Listen to key broadcast terms and discover how cultural intimacy drives commercial retention.
          </p>
        </div>
      </div>

      {/* Grid: Term Selector & Word Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Term List */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brass font-semibold block px-1">
            KEY BROADCAST VOCABULARY
          </span>
          <div className="space-y-1.5">
            {WORDS.map((w) => {
              const isSelected = activeWord.term === w.term;
              const isPlaying = playingTerm === w.term;
              return (
                <button
                  key={w.term}
                  type="button"
                  onClick={() => {
                    setActiveWord(w);
                    pronounceWord(w);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between min-h-[48px] ${
                    isSelected
                      ? 'border-brass bg-brass/10 text-paper font-semibold shadow'
                      : 'border-hairline bg-ink text-sage hover:text-paper hover:border-hairline-light'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm text-paper">{w.term}</span>
                      <span className="text-[9px] font-mono rounded bg-ink-2 px-1.5 py-0.5 text-brass border border-hairline">
                        {w.dialect}
                      </span>
                    </div>
                    <span className="text-[11px] text-sage-dim font-mono block mt-0.5">
                      /{w.phonetic}/
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`h-8 w-8 rounded-full border flex items-center justify-center transition-colors ${
                        isPlaying
                          ? 'border-brass bg-brass text-ink animate-pulse'
                          : 'border-hairline text-sage hover:border-brass hover:text-brass'
                      }`}
                    >
                      <Volume2 size={14} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Word Deep Dive Panel */}
        <div className="lg:col-span-7 rounded-xl border border-hairline bg-ink p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between border-b border-hairline pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display text-2xl font-bold text-paper">{activeWord.term}</h4>
                <button
                  type="button"
                  onClick={() => pronounceWord(activeWord)}
                  className="rounded-full bg-brass/15 border border-brass/40 px-2.5 py-1 text-xs font-mono text-brass flex items-center gap-1.5 hover:bg-brass hover:text-ink transition-colors"
                >
                  <Volume2 size={13} />
                  <span>Pronounce ({activeWord.phonetic})</span>
                </button>
              </div>
              <span className="text-xs font-mono text-moss mt-1 block">
                Dialect: {activeWord.dialect} · Cultural Heritage Register
              </span>
            </div>
          </div>

          {/* Translation */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block font-bold">
              LITERAL & CULTURAL MEANING
            </span>
            <p className="text-sm text-paper font-serif italic leading-relaxed">
              "{activeWord.translation}"
            </p>
          </div>

          {/* On-Air Programming Context */}
          <div className="rounded-lg border border-hairline bg-ink-2 p-3.5 space-y-1">
            <span className="text-[10px] font-mono text-brass uppercase tracking-wider block font-bold flex items-center gap-1.5">
              <Music size={12} />
              ON-AIR BROADCAST APPLICATION
            </span>
            <p className="text-xs text-sage leading-relaxed">
              {activeWord.stationContext}
            </p>
          </div>

          {/* Commercial & Advertiser Value */}
          <div className="rounded-lg border border-hairline bg-ink-2 p-3.5 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold flex items-center gap-1.5">
              <Globe2 size={12} />
              COMMERCIAL ADVERTISER VALUE
            </span>
            <p className="text-xs text-sage leading-relaxed">
              {activeWord.commercialValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
