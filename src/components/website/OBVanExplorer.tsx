import React, { useState } from 'react';
import { Truck, MapPin, Radio, DollarSign, Volume2, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface TourStop {
  id: string;
  name: string;
  county: string;
  day: string;
  crowdSize: string;
  primaryAdvertisers: string[];
  expectedYield: string;
  highlight: string;
}

const TOUR_STOPS: TourStop[] = [
  {
    id: 'chwele',
    name: 'Chwele Open-Air Market Day',
    county: 'Bungoma',
    day: 'Wednesdays & Saturdays',
    crowdSize: '35,000+ Active Traders',
    primaryAdvertisers: ['Kenya Seed Company', 'One Acre Fund', 'Equity Bank Kilimo'],
    expectedYield: 'KSh 250,000 – 380,000',
    highlight: '2nd largest open market in Kenya. Live agricultural commodity pricing and farmer interviews.',
  },
  {
    id: 'lubao',
    name: 'Lubao Livestock & Cattle Market',
    county: 'Kakamega',
    day: 'Thursdays',
    crowdSize: '18,000 Pastoralists & Butchers',
    primaryAdvertisers: ['Veterinary Pharmaceutical Brands', 'Safaricom M-Pesa Till', 'Cooper K-Brands'],
    expectedYield: 'KSh 180,000 – 260,000',
    highlight: 'East Africa’s premier cattle hub. High cash-velocity market with immediate retail activation.',
  },
  {
    id: 'busia',
    name: 'Busia Cross-Border Freight Terminal',
    county: 'Busia',
    day: 'Fridays',
    crowdSize: '22,000 Transporters & Border Traders',
    primaryAdvertisers: ['Logistics Transporters', 'Forex Bureaus', 'Energy Drinks'],
    expectedYield: 'KSh 220,000 – 320,000',
    highlight: 'High cross-border transit volume. Currency exchange trends and cross-border music DJ battles.',
  },
  {
    id: 'kimilili',
    name: 'Kimilili Agribusiness & Dairy Hub',
    county: 'Bungoma',
    day: 'Mondays',
    crowdSize: '15,000 Farmers & Co-ops',
    primaryAdvertisers: ['New KCC Dairy', 'Agro-Chemical Dealers', 'Motorbike Dealers'],
    expectedYield: 'KSh 160,000 – 240,000',
    highlight: 'Rich agricultural hinterland on the slopes of Mt. Elgon. Co-operative SACCO sponsorships.',
  },
];

export function OBVanExplorer() {
  const [selectedStop, setSelectedStop] = useState<TourStop>(TOUR_STOPS[0]);
  const [activeGearTab, setActiveGearTab] = useState<'audio' | 'link' | 'power'>('audio');

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Truck size={14} />
            <span className="uppercase tracking-widest font-semibold">Mobile Studio Unit · Hapa Tulipo Rig</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Empirical Local Vehicle Conversion & Broadcast RF Quotes" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            "Hapa Tulipo" Outside Broadcast (OB) Van & Roadshow Unit
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Explore the deployable Western Kenya field broadcast van that generates KSh 180,000 – 380,000 per activation day through live market broadcasts, PA activations, and FMCG sampling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Van Rig Architecture */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-brass uppercase tracking-wider font-semibold">
                OB RIG HARDWARE SPECIFICATIONS
              </span>
              <span className="text-[10px] font-mono text-moss">Phase 2 Capex: KSh 320,000 Conversion</span>
            </div>

            {/* Gear Selector Tabs */}
            <div className="flex rounded border border-hairline bg-ink-2 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveGearTab('audio')}
                className={`flex-1 py-1.5 rounded transition-all ${
                  activeGearTab === 'audio' ? 'bg-brass text-ink font-bold' : 'text-sage hover:text-paper'
                }`}
              >
                Mixer & Audio
              </button>
              <button
                type="button"
                onClick={() => setActiveGearTab('link')}
                className={`flex-1 py-1.5 rounded transition-all ${
                  activeGearTab === 'link' ? 'bg-brass text-ink font-bold' : 'text-sage hover:text-paper'
                }`}
              >
                Wireless Link / 4G
              </button>
              <button
                type="button"
                onClick={() => setActiveGearTab('power')}
                className={`flex-1 py-1.5 rounded transition-all ${
                  activeGearTab === 'power' ? 'bg-brass text-ink font-bold' : 'text-sage hover:text-paper'
                }`}
              >
                Generator & Stage
              </button>
            </div>

            {/* Gear Details */}
            {activeGearTab === 'audio' && (
              <div className="space-y-2 text-xs font-mono text-sage">
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Console</span>
                  <span className="text-brass">Behringer X32 Producer Digital Rack</span>
                </div>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Microphones</span>
                  <span className="text-brass">4× Shure BLX288 Wireless Handheld Units</span>
                </div>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">PA Sound System</span>
                  <span className="text-brass">2× RCF ART 715-A (1400W) + Subwoofer</span>
                </div>
              </div>
            )}

            {activeGearTab === 'link' && (
              <div className="space-y-2 text-xs font-mono text-sage">
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Transmission Link</span>
                  <span className="text-brass">Barix Instreamer + Comrex Audio Over IP</span>
                </div>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Cellular Bonding</span>
                  <span className="text-brass">Dual SIM (Safaricom + Airtel 4G LTE)</span>
                </div>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Audio Latency</span>
                  <span className="text-brass">&lt; 380ms to Bungoma Main Studio</span>
                </div>
              </div>
            )}

            {activeGearTab === 'power' && (
              <div className="space-y-2 text-xs font-mono text-sage">
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Silent Generator</span>
                  <span className="text-brass">Honda EU30is Inverter (3kVA, Ultra-Quiet)</span>
                </div>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Deployment Time</span>
                  <span className="text-brass">15 minutes setup on market grounds</span>
                </div>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline flex justify-between">
                  <span className="text-paper">Mobile Stage</span>
                  <span className="text-brass">Hydraulic Fold-out Branding Backdrop</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Western Kenya Market Roadshow Route & Commercial Economics */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3">
            <span className="text-xs font-mono text-brass uppercase tracking-wider font-semibold block">
              SELECT MARKET ACTIVATION HUB
            </span>
            <div className="grid grid-cols-2 gap-2">
              {TOUR_STOPS.map((stop) => (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => setSelectedStop(stop)}
                  className={`p-2.5 rounded border text-left text-xs font-mono transition-all ${
                    selectedStop.id === stop.id
                      ? 'border-brass bg-brass/10 text-paper font-semibold'
                      : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                  }`}
                >
                  <span className="text-paper font-bold block">{stop.name}</span>
                  <span className="text-[10px] text-sage-dim">{stop.county} · {stop.day}</span>
                </button>
              ))}
            </div>

            {/* Selected Stop Brief */}
            <div className="rounded-lg bg-ink-2 border border-hairline p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <span className="font-bold text-paper text-sm">{selectedStop.name}</span>
                <span className="text-emerald-400 font-mono font-bold">{selectedStop.expectedYield}</span>
              </div>
              <p className="text-sage text-xs leading-relaxed">{selectedStop.highlight}</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1 text-sage">
                <div>
                  <span className="text-sage-dim block">Footfall:</span>
                  <strong className="text-paper">{selectedStop.crowdSize}</strong>
                </div>
                <div>
                  <span className="text-sage-dim block">Sponsor Targets:</span>
                  <strong className="text-brass">{selectedStop.primaryAdvertisers.join(', ')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
