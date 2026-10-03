import React, { useState } from 'react';
import { Zap, Sun, Battery, Gauge, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function PowerResilienceMatrix() {
  const [gridStatus, setGridStatus] = useState<'online' | 'blackout'>('online');
  const [solarGenerationKw, setSolarGenerationKw] = useState<number>(7.4); // kW
  const [activeLoadKw, setActiveLoadKw] = useState<number>(4.8); // transmitter + studio + computers

  // In a blackout, if solar >= load, solar powers it. If not, battery or generator kicks in.
  const isBatteryDischarging = gridStatus === 'blackout' && solarGenerationKw < activeLoadKw;
  const generatorRunning = gridStatus === 'blackout' && solarGenerationKw < 2.0;

  const batteryHoursRemaining = isBatteryDischarging
    ? ((15.0 / (activeLoadKw - solarGenerationKw)).toFixed(1))
    : '12.0+';

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Zap size={14} />
            <span className="uppercase tracking-widest font-semibold">Engineering Resilience · Power Architecture</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Schneider Electric & Perkins 15kVA Local Kenya Quotations" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Studio Power Resilience & Zero-Downtime Grid Failover
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Simulate how the automatic transfer switch (ATS), 10kVA hybrid solar array, and 15kVA diesel generator guarantee 99.98% on-air uptime during Western Kenya national grid blackouts.
          </p>
        </div>

        {/* Live Grid Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGridStatus(gridStatus === 'online' ? 'blackout' : 'online')}
            className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
              gridStatus === 'online'
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                : 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${gridStatus === 'online' ? 'bg-emerald-400' : 'bg-red-500'}`} />
            <span>GRID: {gridStatus === 'online' ? 'KPLC MAINS ONLINE' : 'BLACKOUT SIMULATED'}</span>
          </button>
        </div>
      </div>

      {/* 3-Tier Power Architecture Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1: KPLC Grid */}
        <div className={`rounded-xl border p-4 transition-all ${
          gridStatus === 'online'
            ? 'border-emerald-500/40 bg-ink'
            : 'border-hairline bg-ink opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-sage-dim flex items-center gap-1.5">
              <Zap size={14} className={gridStatus === 'online' ? 'text-emerald-400' : 'text-sage-dim'} />
              Primary: Kenya Power (Mains)
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              gridStatus === 'online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-400'
            }`}>
              {gridStatus === 'online' ? 'ACTIVE' : 'CUT'}
            </span>
          </div>
          <span className="font-display text-2xl font-bold text-paper block">
            {gridStatus === 'online' ? '240V / 50Hz' : '0V'}
          </span>
          <p className="text-xs text-sage mt-2">
            {gridStatus === 'online'
              ? 'Supplying Bungoma studio equipment and battery float charge.'
              : 'National grid failure detected. ATS triggered within 15 milliseconds.'}
          </p>
        </div>

        {/* Tier 2: Solar & Lithium Battery Bank */}
        <div className="rounded-xl border border-brass/40 bg-ink p-4 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-brass flex items-center gap-1.5">
              <Sun size={14} />
              Hybrid Solar (10kVA Inverter)
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-brass/20 text-brass">
              15.4 kWh LFP
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-paper tabular-nums">
              {solarGenerationKw} kW
            </span>
            <span className="text-xs font-mono text-emerald-400">
              Solar + Battery
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
            <div className="h-full bg-brass transition-all" style={{ width: '85%' }} />
          </div>
          <p className="text-xs text-sage leading-relaxed">
            Powers broadcast console, Shure microphones, and PTZ video cameras silently.
          </p>
        </div>

        {/* Tier 3: 15kVA Diesel Generator */}
        <div className={`rounded-xl border p-4 transition-all ${
          generatorRunning
            ? 'border-red-500/50 bg-ink shadow-lg shadow-red-950/20'
            : 'border-hairline bg-ink'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-sage-dim flex items-center gap-1.5">
              <Gauge size={14} className={generatorRunning ? 'text-red-400' : 'text-sage-dim'} />
              Emergency: Perkins 15kVA Gen
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              generatorRunning ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-stone-800 text-stone-400'
            }`}>
              {generatorRunning ? 'RUNNING' : 'STANDBY'}
            </span>
          </div>
          <span className="font-display text-2xl font-bold text-paper block">
            {generatorRunning ? '1,500 RPM' : 'Auto-ATS'}
          </span>
          <p className="text-xs text-sage mt-2">
            {generatorRunning
              ? 'Heavy-duty diesel generator engaged for sustained nighttime blackout.'
              : 'Automatic auto-start crank configured if batteries drop below 35%.'}
          </p>
        </div>
      </div>

      {/* Operational Economics */}
      <div className="rounded-lg border border-hairline bg-ink p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div>
          <span className="text-sage-dim block">Average Studio Load</span>
          <span className="text-sm font-bold text-paper tabular-nums">{activeLoadKw} kW</span>
        </div>
        <div>
          <span className="text-sage-dim block">Battery Runtime</span>
          <span className="text-sm font-bold text-brass tabular-nums">{batteryHoursRemaining} hrs</span>
        </div>
        <div>
          <span className="text-sage-dim block">Solar OPEX Savings</span>
          <span className="text-sm font-bold text-emerald-400 tabular-nums">KSh 38,000 / mo</span>
        </div>
        <div>
          <span className="text-sage-dim block">Switchover Latency</span>
          <span className="text-sm font-bold text-paper tabular-nums">0 ms (Online UPS)</span>
        </div>
      </div>
    </div>
  );
}
