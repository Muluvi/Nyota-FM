import React, { useState } from 'react';
import { Video, Mic, Radio, Sliders, ShieldCheck, Check, Layers, Sparkles, DollarSign, Box } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface StudioRoom {
  id: string;
  name: string;
  code: string;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3';
  dimensions: string;
  purpose: string;
  gearList: {
    name: string;
    vendor: string;
    cost: string;
    tier: 1 | 2;
    why: string;
  }[];
}

const ROOMS: StudioRoom[] = [
  {
    id: 'room-onair',
    name: 'Master On-Air Broadcast Suite',
    code: 'ROOM 01',
    phase: 'Phase 1',
    dimensions: '4.8m × 3.6m (Acoustic Sealed)',
    purpose: 'Flagship live broadcast studio for Breakfast, Midday, and Drive Home. Visual radio multi-cam enabled.',
    gearList: [
      { name: '2× PTZ Cameras (KTUH86 NDI/HDMI)', vendor: 'Broadcast Solutions Int (bsint.net)', cost: 'KSh 228,000', tier: 1, why: 'Automated robotic presenter tracking; eliminates manual cameraman payroll.' },
      { name: 'Blackmagic ATEM Television Studio HD', vendor: 'Cellular Kenya (cameraplacekenya.com)', cost: 'KSh 154,999', tier: 1, why: 'Hardware live video switcher with direct broadcast graphics and lower-thirds overlay.' },
      { name: 'VISICO LED-50A 3-Light Kit', vendor: 'Rondamo Technologies (rondamo.co.ke)', cost: 'KSh 34,300', tier: 1, why: 'High-CRI broadcast lighting for pristine YouTube/Facebook video stream aesthetic.' },
      { name: 'Soundproofing Kenya Acoustic Panels (20 m²)', vendor: 'Soundproofing Company Kenya', cost: 'KSh 110,000–250,000', tier: 1, why: 'High-density Rockwool & acoustic foam panels eliminating street and rain noise in Bungoma.' },
    ],
  },
  {
    id: 'room-podcast',
    name: 'Pre-Record & Podcast Suite',
    code: 'ROOM 02',
    phase: 'Phase 2',
    dimensions: '3.2m × 3.0m (Isolated Booth)',
    purpose: 'Production studio for the 4 weekly pre-recorded shows (Asuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi, Wanawake wa Twang\'aa) and diaspora interviews.',
    gearList: [
      { name: 'Rode Rodecaster Pro II Production Console', vendor: 'Local Audio Distributor (Tier 2)', cost: 'KSh 95,000', tier: 2, why: 'Dedicated podcast recording with onboard sound pads and phone call audio Bluetooth routing.' },
      { name: '2× Shure SM7B Microphones + Cloudlifters', vendor: 'Broadcast Solutions Int', cost: 'KSh 120,000', tier: 1, why: 'Industry-standard broadcast vocal clarity and excellent rejection of room resonance.' },
      { name: 'Sony ZV-E10 4K Studio Camera', vendor: 'Cellular Kenya', cost: 'KSh 98,000', tier: 1, why: 'Dedicated close-up interview camera with rapid autofocus for YouTube video podcasting.' },
    ],
  },
  {
    id: 'room-digital',
    name: 'Digital Asset & WhatsApp Newsroom',
    code: 'ROOM 03',
    phase: 'Phase 1',
    dimensions: '4.0m × 3.2m (Open Plan Desk)',
    purpose: 'Real-time social media atomization desk, WhatsApp listener hotline, and USSD campaign coordination.',
    gearList: [
      { name: 'High-Spec Editing Workstation (M3/Core i7)', vendor: 'Computer City Kenya', cost: 'KSh 145,000', tier: 1, why: 'Rapid 15-minute turnaround of on-air highlights into TikTok, Instagram Reels, and YouTube Shorts.' },
      { name: 'Hardware Streaming Encoder Box', vendor: 'Industry Benchmark', cost: 'KSh 50,000–80,000', tier: 2, why: 'Decouples live video streaming from studio audio computer, preventing on-air crashes.' },
      { name: 'Africa\'s Talking Dedicated WhatsApp Gateway', vendor: 'Africa\'s Talking Ltd', cost: 'KSh 11,000 ($85 setup)', tier: 1, why: 'Official WhatsApp BSP integration for verified green badge and automated inbound listener bots.' },
    ],
  },
  {
    id: 'room-ob',
    name: 'Outside Broadcast (OB) Kit Depo',
    code: 'ROOM 04',
    phase: 'Phase 2',
    dimensions: '3.0m × 2.4m (Secure Storage)',
    purpose: 'Storage, testing, and rapid deployment station for the Hapa Tulipo weekly outside market broadcast circuit.',
    gearList: [
      { name: 'Mobile 4G/5G Bonding LiveU / Teradek Rig', vendor: 'BS International', cost: 'KSh 320,000', tier: 2, why: 'Enables crystal-clear audio/video transmission from Chwele, Kitale, or Mumias markets back to studio.' },
      { name: 'Yamaha Powered PA System + Inverter Kit', vendor: 'Music World Kenya', cost: 'KSh 185,000', tier: 1, why: 'Heavy-duty field public address sound for market crowds and rural roadshows.' },
      { name: 'Nyota Branded Pop-Up Gazebos & Flags', vendor: 'Local Bungoma Signage Vendor', cost: 'KSh 65,000', tier: 1, why: 'Unmistakable brand physical visibility at every agricultural expo and political gathering.' },
    ],
  },
];

export function InteractiveStudioPlan() {
  const [activeRoomId, setActiveRoomId] = useState<string>('room-onair');
  const activeRoom = ROOMS.find((r) => r.id === activeRoomId) || ROOMS[0];

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Studio Architecture
            </span>
            <span className="font-mono text-xs text-sage-dim">· Bungoma Broadcast Facility Layout</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Interactive Studio Floor Plan & Equipment Rack
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Click on any broadcast room below to inspect technical floor plans, dimensions, researched equipment vendors, and bankable cost citations.
          </p>
        </div>
        <TierBadge tier={1} citation="BS International, Cellular Kenya & Soundproofing Kenya" url="bsint.net" />
      </div>

      {/* Room Selector Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            type="button"
            onClick={() => setActiveRoomId(room.id)}
            className={`p-3.5 rounded-lg border text-left transition-all relative ${
              activeRoomId === room.id
                ? 'bg-brass text-ink border-brass font-bold shadow-md'
                : 'bg-ink text-sage hover:text-paper border-hairline hover:border-brass/40'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] opacity-80 uppercase">
              <span>{room.code}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                room.phase === 'Phase 1' ? 'bg-moss/30 text-emerald-950 font-bold' : 'bg-hairline text-paper'
              }`}>
                {room.phase}
              </span>
            </div>
            <div className="font-semibold text-sm truncate mt-1">{room.name}</div>
            <div className="text-[10px] opacity-75 mt-0.5">{room.dimensions}</div>
          </button>
        ))}
      </div>

      {/* Selected Room Details Workbench */}
      <div className="rounded-xl bg-ink p-5 sm:p-6 border border-hairline space-y-5 animate-section-entrance">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-brass font-bold">{activeRoom.code}</span>
              <span className="text-hairline">·</span>
              <span className="font-mono text-xs text-sage">{activeRoom.dimensions}</span>
            </div>
            <h4 className="font-display text-2xl text-paper font-bold mt-0.5">{activeRoom.name}</h4>
            <p className="text-xs sm:text-sm text-sage mt-1 font-body leading-relaxed max-w-3xl">
              {activeRoom.purpose}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded bg-ink-2 px-3 py-1.5 border border-brass/40 font-mono text-xs text-brass">
            <Layers size={14} />
            <span>Target: {activeRoom.phase} Activation</span>
          </div>
        </div>

        {/* Gear Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-sage-dim">
            <span>Researched Hardware Specifications</span>
            <span className="text-emerald-400 font-semibold">Real Local Supplier Quotes</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-hairline text-sage-dim">
                  <th className="py-2 pr-3">Hardware Component</th>
                  <th className="py-2 px-3">Local Kenyan Supplier</th>
                  <th className="py-2 px-3">Cost Commitment</th>
                  <th className="py-2 pl-3">Operational Value & Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {activeRoom.gearList.map((gear, idx) => (
                  <tr key={idx} className="hover:bg-ink-2/60 transition-colors">
                    <td className="py-3 pr-3 font-semibold text-paper flex items-center gap-2">
                      <Box size={13} className="text-brass shrink-0" />
                      <span>{gear.name}</span>
                    </td>
                    <td className="py-3 px-3 text-sage">{gear.vendor}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400 whitespace-nowrap">{gear.cost}</td>
                    <td className="py-3 pl-3 text-sage-dim text-[11px] font-body leading-snug">{gear.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-3 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-sage-dim">
          <span>Phase 1 total procurement saves KSh 1.5M compared to May 2026 v1.0 initial estimates.</span>
          <span className="text-brass">Zero foreign currency exposure; local Nairobi/Kisumu warranty.</span>
        </div>
      </div>
    </div>
  );
}
