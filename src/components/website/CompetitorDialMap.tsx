import React, { useState } from 'react';
import { Radio, BarChart3, Users, Globe2, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface StationDial {
  freq: string;
  name: string;
  owner: string;
  vernacular: string;
  marketShareWestern: string;
  studioTech: string;
  digitalStrategy: string;
  spotRate30s: string;
  isNyota?: boolean;
}

const STATIONS: StationDial[] = [
  {
    freq: '89.5 FM',
    name: 'Sulwe FM',
    owner: 'Royal Media Services (RMS)',
    vernacular: 'Pure Bukusu Sub-dialect',
    marketShareWestern: '18.4%',
    studioTech: 'Centralized Nairobi feed + regional opt-outs',
    digitalStrategy: 'Viusasa app locked behind paywalls',
    spotRate30s: 'KSh 3,200',
  },
  {
    freq: '99.7 FM',
    name: 'Mulembe FM',
    owner: 'Royal Media Services (RMS)',
    vernacular: 'Blended Luhya Sub-dialects',
    marketShareWestern: '22.1%',
    studioTech: 'Nairobi Studios (Remote presentation)',
    digitalStrategy: 'YouTube highlights, slow local reply',
    spotRate30s: 'KSh 3,800',
  },
  {
    freq: '104.1 FM',
    name: 'West FM',
    owner: 'West Media Group (Local)',
    vernacular: 'Bukusu & Swahili',
    marketShareWestern: '14.2%',
    studioTech: 'Analog audio console, no visual live stream',
    digitalStrategy: 'Standard Facebook page, zero USSD integration',
    spotRate30s: 'KSh 2,200',
  },
  {
    freq: '106.7 FM',
    name: 'Radio Citizen',
    owner: 'Royal Media Services (RMS)',
    vernacular: 'National Standard Swahili',
    marketShareWestern: '19.5%',
    studioTech: 'Fully automated Nairobi broadcast center',
    digitalStrategy: 'Citizen Digital app (National focus)',
    spotRate30s: 'KSh 12,500',
  },
  {
    freq: '107.3 FM',
    name: 'Nyota FM (Twang\'aa)',
    owner: 'Independent Local Ownership',
    vernacular: 'Conversational Swahili + Bukusu & Luhya Idioms',
    marketShareWestern: 'Target 24.5%',
    studioTech: 'Phase 1 Visual Radio: 2× PTZ + ATEM HD + Solar ATS',
    digitalStrategy: 'Zero-data USSD (*483*107#) + WhatsApp BSP CRM',
    spotRate30s: 'KSh 2,800 (High-yield SME friendly)',
    isNyota: true,
  },
];

export function CompetitorDialMap() {
  const [selectedStation, setSelectedStation] = useState<StationDial>(STATIONS[4]);

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Radio size={14} />
            <span className="uppercase tracking-widest font-semibold">Competitive Landscape · Part 2.2</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="GeoPoll & KARF Audience Market Share Audit 2025/2026" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Western Kenya FM Radio Dial & Competitor Spectrum
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Compare Nyota FM (107.3 MHz) against Royal Media Services (RMS) incumbents and legacy local stations across programming tone, studio technology, and digital monetization.
          </p>
        </div>
      </div>

      {/* FM Dial Interactive Radio Band */}
      <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3">
        <span className="text-[10px] font-mono text-brass uppercase tracking-wider font-semibold block">
          WESTERN KENYA FM BROADCAST SPECTRUM (88.0 – 108.0 MHz)
        </span>
        <div className="relative h-20 bg-ink-2 rounded-lg border border-hairline overflow-hidden flex items-center px-6">
          {/* Radio dial frequency ruler markings */}
          <div className="absolute inset-x-0 bottom-0 h-4 flex justify-between px-4 text-[9px] font-mono text-sage-dim border-t border-hairline/40">
            <span>88.0</span>
            <span>92.0</span>
            <span>96.0</span>
            <span>100.0</span>
            <span>104.0</span>
            <span>108.0 MHz</span>
          </div>

          {/* Station Frequency Pins on the Dial */}
          <div className="w-full flex justify-between items-center relative z-10">
            {STATIONS.map((st) => {
              const isSelected = selectedStation.name === st.name;
              return (
                <button
                  key={st.freq}
                  type="button"
                  onClick={() => setSelectedStation(st)}
                  className={`flex flex-col items-center group transition-all ${
                    isSelected ? 'scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`h-7 px-2.5 rounded flex items-center justify-center font-mono text-xs font-bold transition-all shadow ${
                      st.isNyota
                        ? 'bg-brass text-ink ring-2 ring-brass/50'
                        : isSelected
                        ? 'bg-paper text-ink'
                        : 'bg-ink border border-hairline text-paper'
                    }`}
                  >
                    {st.freq}
                  </div>
                  <span className="text-[10px] font-mono text-sage mt-1">
                    {st.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Comparative Profile */}
      <div className="rounded-xl border border-hairline bg-ink p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-paper">{selectedStation.name}</span>
              <span className="font-mono text-xs text-brass px-2 py-0.5 rounded bg-brass/10 border border-brass/30">
                {selectedStation.freq}
              </span>
            </div>
            <span className="text-xs font-mono text-sage-dim block mt-0.5">
              Ownership: {selectedStation.owner}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-sage-dim block uppercase">Western Share</span>
            <span className="font-display text-lg font-bold text-emerald-400">
              {selectedStation.marketShareWestern}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="rounded bg-ink-2 border border-hairline p-3 space-y-1">
            <span className="text-sage-dim block">Vernacular Voice:</span>
            <strong className="text-paper">{selectedStation.vernacular}</strong>
          </div>
          <div className="rounded bg-ink-2 border border-hairline p-3 space-y-1">
            <span className="text-sage-dim block">Studio Production Rig:</span>
            <strong className="text-paper">{selectedStation.studioTech}</strong>
          </div>
          <div className="rounded bg-ink-2 border border-hairline p-3 space-y-1">
            <span className="text-sage-dim block">Digital Strategy & Mobile:</span>
            <strong className="text-brass">{selectedStation.digitalStrategy}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
