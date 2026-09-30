import React, { useState, useEffect } from 'react';
import { Video, Camera, Play, Pause, Radio, Layers, Volume2, ShieldCheck, Sparkles, Cast, Users, Tv } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

type CamAngle = 'cam1' | 'cam2' | 'cam3';

export function VisualRadioStudioSimulator() {
  const [activeProgramCam, setActiveProgramCam] = useState<CamAngle>('cam1');
  const [previewCam, setPreviewCam] = useState<CamAngle>('cam2');
  const [lowerThirdActive, setLowerThirdActive] = useState<boolean>(true);
  const [tickerActive, setTickerActive] = useState<boolean>(true);
  const [sponsorBugActive, setSponsorBugActive] = useState<boolean>(true);
  const [vuLevels, setVuLevels] = useState<number[]>([65, 78, 55, 82]);

  // Simulate audio VU meter bounce
  useEffect(() => {
    const timer = setInterval(() => {
      setVuLevels([
        Math.floor(40 + Math.random() * 55),
        Math.floor(45 + Math.random() * 50),
        Math.floor(35 + Math.random() * 60),
        Math.floor(50 + Math.random() * 45),
      ]);
    }, 180);
    return () => clearInterval(timer);
  }, []);

  const cutToPreview = () => {
    const prev = activeProgramCam;
    setActiveProgramCam(previewCam);
    setPreviewCam(prev);
  };

  const cameraFeeds = {
    cam1: {
      name: 'CAM 1 · Lead Presenter (Robotic PTZ)',
      description: 'Tight 50mm framing on primary host mic and acoustic sound baffle.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      label: 'MAIN MIC 1',
    },
    cam2: {
      name: 'CAM 2 · Co-Host / Studio Guest (Robotic PTZ)',
      description: 'Framing across guest consultation table and WhatsApp interaction monitor.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
      label: 'GUEST DESK',
    },
    cam3: {
      name: 'CAM 3 · Wide Broadcast Rig (Fixed Wide-Angle)',
      description: 'Comprehensive studio master view showing acoustic wood fins, on-air neon, and mixing desk.',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      label: 'STUDIO WIDE',
    },
  };

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/10 border border-brass/30 px-2.5 py-0.5 text-[10px] font-mono text-brass font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Interactive Hardware Simulator · Studio Build
            </span>
            <TierBadge tier={1} citation="Blackmagic ATEM Studio HD & 2× PTZ NDI Rig (KSh 627,299 Capex)" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Visual Radio Live Production Switcher (Blackmagic ATEM)
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Experience how Nyota FM's Phase 1 studio setup automates YouTube & Facebook visual streams in real time. Switch between robotic PTZ camera feeds, toggle dynamic lower-thirds, and inspect on-air graphics.
          </p>
        </div>

        {/* Live On-Air Indicator */}
        <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-1.5 text-xs font-mono text-red-400">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-bold tracking-wider">PROGRAM ON AIR · 1080p 60fps</span>
        </div>
      </div>

      {/* Main Switcher Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Video Monitor (Program Feed) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-red-500/60 bg-ink shadow-2xl">
            {/* Background Camera Image */}
            <img
              src={cameraFeeds[activeProgramCam].image}
              alt={cameraFeeds[activeProgramCam].name}
              className="h-full w-full object-cover brightness-90 transition-all duration-300"
            />

            {/* Top Overlay: Tally & Station Watermark */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow">
                  PGM: {activeProgramCam.toUpperCase()}
                </span>
                <span className="rounded bg-ink/80 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-paper border border-hairline">
                  107.3 FM LIVE STREAM
                </span>
              </div>

              {/* Station Logo & Sponsor Bug */}
              <div className="flex items-center gap-2">
                {sponsorBugActive && (
                  <span className="rounded bg-ink/85 border border-brass/50 px-2 py-0.5 text-[9px] font-mono font-bold text-brass uppercase shadow">
                    SPONSOR: SAFARICOM M-PESA
                  </span>
                )}
                <div className="rounded bg-brass text-ink font-mono font-bold text-xs px-2 py-0.5 shadow">
                  NYOTA FM
                </div>
              </div>
            </div>

            {/* Audio VU Meters overlay */}
            <div className="absolute right-3 bottom-16 flex items-end gap-1 rounded bg-ink/80 backdrop-blur-sm p-1.5 border border-hairline">
              <Volume2 size={12} className="text-brass mr-1" />
              {vuLevels.map((lvl, idx) => (
                <div key={idx} className="h-10 w-1.5 rounded-full bg-stone-800 flex flex-col justify-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-150 ${
                      lvl > 75 ? 'bg-red-500' : lvl > 50 ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                    style={{ height: `${lvl}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Lower Thirds Overlay */}
            {lowerThirdActive && (
              <div className="absolute bottom-6 left-3 right-16 rounded-md bg-ink-2/95 border-l-4 border-brass p-2.5 backdrop-blur-md shadow-xl text-paper">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-brass/20 text-brass text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase">
                    KUMEKUCHA BREAKFAST
                  </span>
                  <span className="text-[10px] text-sage-dim font-mono">06:00 – 10:00 AM</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-paper mt-0.5">
                  Achieng & Otieno · Discussing Western Kenya Maize & Fertilizer Subsidies
                </h4>
              </div>
            )}

            {/* Bottom News/WhatsApp Ticker */}
            {tickerActive && (
              <div className="absolute bottom-0 left-0 right-0 bg-ink-2/95 border-t border-hairline px-3 py-1 flex items-center gap-2 text-[10px] font-mono overflow-hidden">
                <span className="bg-[#25D366] text-ink font-bold px-1.5 py-0.2 rounded shrink-0">
                  WHATSAPP 0720...
                </span>
                <div className="animate-marquee whitespace-nowrap text-paper">
                  Mulembe Nyota FM! Sisi wakulima wa Chwele tunapongeza bei mpya za mbolea. Tuko ndani kabisa ya 107.3 FM! · Chwele Market: Mahindi 90kg KSh 3,400 ·
                </div>
              </div>
            )}
          </div>

          {/* Current Camera Meta */}
          <div className="flex items-center justify-between text-xs font-mono text-sage px-1">
            <span>Active: <strong>{cameraFeeds[activeProgramCam].name}</strong></span>
            <span className="text-brass">Output: NDI Stream → OBS Studio / ATEM</span>
          </div>
        </div>

        {/* ATEM Hardware Control Console */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-2.5">
              <span className="text-xs font-mono font-bold text-paper uppercase tracking-wider flex items-center gap-2">
                <Tv size={14} className="text-brass" />
                ATEM Switcher Console
              </span>
              <span className="text-[10px] font-mono text-sage-dim">Model: HD8 Studio</span>
            </div>

            {/* Program Row (Red Tally) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                PROGRAM (ON AIR):
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['cam1', 'cam2', 'cam3'] as CamAngle[]).map((cam) => (
                  <button
                    key={cam}
                    type="button"
                    onClick={() => setActiveProgramCam(cam)}
                    className={`h-11 rounded font-mono text-xs font-bold transition-all flex flex-col items-center justify-center ${
                      activeProgramCam === cam
                        ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.8)] border border-red-400'
                        : 'bg-ink-2 text-sage hover:text-paper border border-hairline'
                    }`}
                  >
                    <span>{cam.toUpperCase()}</span>
                    <span className="text-[8px] font-normal opacity-80">
                      {cam === 'cam1' ? 'HOST' : cam === 'cam2' ? 'GUEST' : 'WIDE'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Row (Green Tally) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                PREVIEW (NEXT):
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['cam1', 'cam2', 'cam3'] as CamAngle[]).map((cam) => (
                  <button
                    key={cam}
                    type="button"
                    onClick={() => setPreviewCam(cam)}
                    className={`h-11 rounded font-mono text-xs font-bold transition-all flex flex-col items-center justify-center ${
                      previewCam === cam
                        ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.7)] border border-emerald-400'
                        : 'bg-ink-2 text-sage hover:text-paper border border-hairline'
                    }`}
                  >
                    <span>{cam.toUpperCase()}</span>
                    <span className="text-[8px] font-normal opacity-80">
                      {cam === 'cam1' ? 'HOST' : cam === 'cam2' ? 'GUEST' : 'WIDE'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transition Cut / Auto Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={cutToPreview}
                className="w-full h-11 rounded-lg bg-brass text-ink font-mono font-bold text-xs flex items-center justify-center gap-2 hover:bg-brass-light active:scale-98 transition-all shadow-md"
              >
                <span>CUT TO PREVIEW ({previewCam.toUpperCase()})</span>
              </button>
            </div>

            {/* Graphics Overlays Toggles */}
            <div className="pt-2 border-t border-hairline space-y-2">
              <span className="text-[10px] font-mono text-brass font-bold uppercase tracking-wider block">
                BROADCAST OVERLAYS (DSK):
              </span>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setLowerThirdActive(!lowerThirdActive)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono border transition-all ${
                    lowerThirdActive
                      ? 'border-brass bg-brass/10 text-paper font-semibold'
                      : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                  }`}
                >
                  <span>Lower-Third Presenter Card</span>
                  <span className={`text-[10px] ${lowerThirdActive ? 'text-brass font-bold' : 'text-sage-dim'}`}>
                    {lowerThirdActive ? 'LIVE' : 'MUTED'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTickerActive(!tickerActive)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono border transition-all ${
                    tickerActive
                      ? 'border-brass bg-brass/10 text-paper font-semibold'
                      : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                  }`}
                >
                  <span>WhatsApp Community Ticker</span>
                  <span className={`text-[10px] ${tickerActive ? 'text-brass font-bold' : 'text-sage-dim'}`}>
                    {tickerActive ? 'LIVE' : 'MUTED'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSponsorBugActive(!sponsorBugActive)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono border transition-all ${
                    sponsorBugActive
                      ? 'border-brass bg-brass/10 text-paper font-semibold'
                      : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                  }`}
                >
                  <span>Corner Sponsor Bug (Safaricom)</span>
                  <span className={`text-[10px] ${sponsorBugActive ? 'text-brass font-bold' : 'text-sage-dim'}`}>
                    {sponsorBugActive ? 'LIVE' : 'MUTED'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
