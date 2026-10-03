import React, { useState } from 'react';
import { AlertTriangle, Volume2, ShieldAlert, Radio, Check, Sparkles } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface AlertItem {
  id: string;
  category: 'Flood Advisory' | 'Landslide Alert' | 'Livestock Quarantine' | 'Severe Weather';
  county: string;
  headline: string;
  swahiliBulletin: string;
  bukusuBulletin: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
  toneHz: number;
}

const ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    category: 'Flood Advisory',
    county: 'Busia (Budalangi Sub-County)',
    headline: 'River Nzoia Dykes Exceed Red Watermark at Bunyala',
    swahiliBulletin: 'Tahadhari ya mafuriko Budalangi: Maji ya Mto Nzoia yamevuka kingo za kinga. Wakazi wa maeneo tambarare wahamie kwenye vituo salama mara moja.',
    bukusuBulletin: 'Khabari ye kumwalo kwo lulwanda lwa Nzoia: Kamaesi kafukile. Bakeni be Budalangi bakesie habundu ha luyenje.',
    severity: 'Critical',
    toneHz: 880,
  },
  {
    id: 'alt-2',
    category: 'Landslide Alert',
    county: 'Bungoma (Mt. Elgon / Kapsokwony)',
    headline: 'Continuous Heavy Downpour Along Cheptais & Mt. Elgon Slopes',
    swahiliBulletin: 'Tahadhari ya mmomonyoko wa ardhi Mt. Elgon: Wakazi wa kando ya miteremko ya Cheptais na Kapsokwony watakiwa kuwa waangalifu kutokana na mvua kubwa.',
    bukusuBulletin: 'Khabari yo kumururu kwo lukoosi lwa Elgon: Liloba lilukhe likwa. Babandu babe banyanga.',
    severity: 'Warning',
    toneHz: 659.25,
  },
  {
    id: 'alt-3',
    category: 'Livestock Quarantine',
    county: 'Kakamega (Malava & Lurambi)',
    headline: 'Foot & Mouth Disease Restriction at Lubao Cattle Market',
    swahiliBulletin: 'Marufuku ya usafirishaji wa mifugo: Idara ya mifugo ya Kaunti ya Kakamega imetangaza marufuku ya wiki mbili katika soko la Lubao kuzuia ugonjwa wa miguu na midomo.',
    bukusuBulletin: 'Kumulimo kwo kusikisia tsing\'ombe ku Lubao: Tsikaunti ya Kakamega yakalusia lilakano.',
    severity: 'Advisory',
    toneHz: 523.25,
  },
];

export function EmergencyAlertConsole() {
  const [activeAlert, setActiveAlert] = useState<AlertItem>(ALERTS[0]);
  const [isPlayingSiren, setIsPlayingSiren] = useState<boolean>(false);

  const triggerAlertSiren = (item: AlertItem) => {
    setIsPlayingSiren(true);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(item.toneHz, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(item.toneHz * 1.5, ctx.currentTime + 0.25);
      osc.frequency.linearRampToValueAtTime(item.toneHz, ctx.currentTime + 0.5);
      osc.frequency.linearRampToValueAtTime(item.toneHz * 1.5, ctx.currentTime + 0.75);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {}

    setTimeout(() => {
      setIsPlayingSiren(false);
    }, 1300);
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <ShieldAlert size={14} />
            <span className="uppercase tracking-widest font-semibold">Civic Safety & Public Emergency Service</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="National Disaster Operations Centre & Kenya Meteorological Dept" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Emergency Civic Broadcast & Disaster Weather Alert Console
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Experience Nyota FM’s emergency broadcast override protocol. Rapid multi-dialect bulletins dispatched during River Nzoia floods, Mt. Elgon mudslides, and county livestock quarantines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => triggerAlertSiren(activeAlert)}
          className={`px-3.5 py-2 rounded font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
            isPlayingSiren
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30'
          }`}
        >
          <Volume2 size={14} />
          <span>{isPlayingSiren ? 'BROADCASTING SIREN' : 'TEST EMERGENCY TONE'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Alert selector */}
        <div className="lg:col-span-5 space-y-2">
          {ALERTS.map((item) => {
            const isSelected = activeAlert.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveAlert(item);
                  triggerAlertSiren(item);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-red-500/80 bg-red-950/20 text-paper font-semibold shadow'
                    : 'border-hairline bg-ink text-sage hover:text-paper'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-brass uppercase font-bold">{item.category}</span>
                  <span className="text-red-400 font-bold px-1 rounded bg-red-950/50 border border-red-800">
                    {item.severity}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-paper">{item.headline}</h4>
                <span className="text-[10px] text-sage-dim font-mono block mt-1">{item.county}</span>
              </button>
            );
          })}
        </div>

        {/* Live Bilingual On-Air Bulletin Display */}
        <div className="lg:col-span-7 rounded-xl border border-red-500/40 bg-ink p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-2.5">
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <AlertTriangle size={12} />
              ON-AIR BULLETIN CUE · HIGH PRIORITY OVERRIDE
            </span>
            <span className="text-[10px] font-mono text-sage-dim">Zone: {activeAlert.county}</span>
          </div>

          {/* Swahili broadcast text */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-brass uppercase tracking-wider block font-bold">
              KISWAHILI ON-AIR BULLETIN
            </span>
            <p className="text-xs sm:text-sm font-sans text-paper leading-relaxed bg-ink-2 p-3 rounded border border-hairline">
              {activeAlert.swahiliBulletin}
            </p>
          </div>

          {/* Bukusu vernacular broadcast text */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
              LUKUSU (VERNACULAR) ON-AIR BULLETIN
            </span>
            <p className="text-xs sm:text-sm font-sans text-paper leading-relaxed bg-ink-2 p-3 rounded border border-hairline">
              {activeAlert.bukusuBulletin}
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-sage-dim pt-1 border-t border-hairline">
            <span>Disaster Response: Red Cross Western & Bungoma County Police</span>
            <span className="text-brass">Toll Free: 1199</span>
          </div>
        </div>
      </div>
    </div>
  );
}
