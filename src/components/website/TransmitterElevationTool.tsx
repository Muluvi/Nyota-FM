import React, { useState } from 'react';
import { Radio, Mountain, Zap, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function TransmitterElevationTool() {
  const [towerHeight, setTowerHeight] = useState<number>(65); // meters
  const [transmitterPower, setTransmitterPower] = useState<number>(3000); // watts (3kW)
  const [mastLocation, setMastLocation] = useState<'chetambe' | 'elgon' | 'bungoma_cbd'>('chetambe');

  const locations = {
    chetambe: {
      name: 'Chetambe Hills Mast (Webuye)',
      elevation: 1620, // meters above sea level
      description: 'Strategic volcanic ridge overlooking the Nzoia River basin. Unobstructed line-of-sight toward Kakamega, Bungoma, and Busia.',
      terrainLossDb: 1.2,
    },
    elgon: {
      name: 'Mt. Elgon Foothills (Kapsokwony)',
      elevation: 2040,
      description: 'Ultra-high altitude transmission point. Reaches Trans Nzoia and eastern Uganda border, but shadowed in southern Kakamega valleys.',
      terrainLossDb: 2.1,
    },
    bungoma_cbd: {
      name: 'Bungoma Town Studio Rooftop',
      elevation: 1385,
      description: 'Urban rooftop repeater. Low capex link, but limited regional coverage beyond a 25km radius.',
      terrainLossDb: 3.4,
    },
  };

  const loc = locations[mastLocation];
  const totalAltitude = loc.elevation + towerHeight;

  // Radio horizon formula: d (km) ≈ 4.12 * sqrt(h (m))
  const theoreticalHorizonKm = Math.round(4.12 * Math.sqrt(totalAltitude - 1200));
  const effectivePowerKw = (transmitterPower * 0.001 * 4.2).toFixed(1); // ERP with 4-bay dipole array
  const populationReached = Math.min(6.8, +(theoreticalHorizonKm * 0.078).toFixed(2));

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Radio size={14} />
            <span className="uppercase tracking-widest font-semibold">Engineering Simulator · 107.3 MHz</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Communications Authority of Kenya (CA) Technical Standards" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Transmitter Elevation & FM Propagation Tool
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Simulate Nyota FM’s 107.3 MHz broadcast signal coverage based on mast coordinates, antenna mast height, and transmitter wattage across Western Kenya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg border border-hairline bg-ink p-4 space-y-4">
            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-2">
                Transmission Mast Site
              </label>
              <div className="space-y-1.5">
                {(Object.keys(locations) as Array<keyof typeof locations>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMastLocation(key)}
                    className={`w-full text-left p-2.5 rounded border text-xs font-mono transition-all flex items-center justify-between ${
                      mastLocation === key
                        ? 'border-brass bg-brass/10 text-paper font-semibold'
                        : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                    }`}
                  >
                    <span>{locations[key].name}</span>
                    <span className="text-[10px] text-brass">{locations[key].elevation}m ASL</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-sage-dim mt-2 leading-relaxed font-sans">
                {loc.description}
              </p>
            </div>

            {/* Mast Height Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-sage">Tower Mast Height</span>
                <span className="text-paper font-bold tabular-nums">{towerHeight} meters</span>
              </div>
              <input
                type="range"
                min={30}
                max={120}
                step={5}
                value={towerHeight}
                onChange={(e) => setTowerHeight(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-sage-dim mt-0.5">
                <span>30m (Guyed mast)</span>
                <span>65m (Standard)</span>
                <span>120m (Lattice tower)</span>
              </div>
            </div>

            {/* Transmitter Wattage */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-sage">Transmitter Power (RF Out)</span>
                <span className="text-brass font-bold tabular-nums">{transmitterPower / 1000} kW</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 3000, 5000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setTransmitterPower(w)}
                    className={`py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                      transmitterPower === w
                        ? 'bg-brass text-ink font-bold border-brass'
                        : 'bg-ink-2 text-sage border-hairline hover:text-paper'
                    }`}
                  >
                    {w / 1000} kW
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output Metrics & Signal Horizon Visualization */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1">
              <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
                Total Mast Altitude
              </span>
              <span className="font-display text-lg font-bold text-paper tabular-nums">
                {totalAltitude.toLocaleString()} m
              </span>
              <span className="text-[10px] text-sage-dim font-mono block">Above sea level</span>
            </div>

            <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1">
              <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
                Signal Radius
              </span>
              <span className="font-display text-lg font-bold text-brass tabular-nums">
                {theoreticalHorizonKm} km
              </span>
              <span className="text-[10px] text-emerald-400 font-mono block">54 dBµV/m protected contour</span>
            </div>

            <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
                Gross Population Reach
              </span>
              <span className="font-display text-lg font-bold text-paper tabular-nums">
                {populationReached}M
              </span>
              <span className="text-[10px] text-moss font-mono block">Western Kenya footprint</span>
            </div>
          </div>

          {/* Visual Elevation Profile & Coverage Contours */}
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3">
            <span className="text-[10px] font-mono text-brass uppercase tracking-wider font-semibold block">
              TERRAIN CONTOUR & LINE-OF-SIGHT PROPAGATION
            </span>
            <div className="h-32 rounded bg-ink-2 border border-hairline relative overflow-hidden flex items-end px-4 pb-2">
              {/* Ground Profile SVG */}
              <svg className="w-full h-24 text-brass/20" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path
                  d="M0,80 Q60,40 120,60 T240,30 T360,70 L400,85 L400,100 L0,100 Z"
                  fill="currentColor"
                />
                <path
                  d="M0,85 Q80,65 160,75 T320,50 L400,90 L400,100 L0,100 Z"
                  fill="rgba(214,167,92,0.3)"
                />
              </svg>

              {/* Antenna Mast Pin */}
              <div
                className="absolute text-brass flex flex-col items-center transition-all duration-300"
                style={{
                  left: mastLocation === 'chetambe' ? '30%' : mastLocation === 'elgon' ? '15%' : '55%',
                  bottom: '24px',
                }}
              >
                <div className="h-10 w-0.5 bg-brass relative">
                  <span className="absolute -top-2 -left-1.5 h-3 w-3 rounded-full border border-brass bg-ink animate-ping" />
                  <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-brass" />
                </div>
                <span className="text-[9px] font-mono text-paper font-bold mt-1 bg-ink px-1 rounded border border-hairline whitespace-nowrap">
                  107.3 FM ({towerHeight}m)
                </span>
              </div>

              {/* County Ground Markers */}
              <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[9px] font-mono text-sage-dim">
                <span>Mt. Elgon</span>
                <span>Webuye (Chetambe)</span>
                <span>Bungoma CBD</span>
                <span>Kakamega</span>
                <span>Busia Border</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-sage">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Effective Radiated Power: <strong>{effectivePowerKw} kW ERP</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                <span>Antenna System: <strong>4-Bay Dipole Shunt</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
