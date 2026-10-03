import React, { useState } from 'react';
import { Sparkles, Palette, Layers, Type, Volume2, Check, Copy } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function BrandIdentityViewer() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: 'Broadcast Ink', hex: '#090B0A', role: '60% Dominant Canvas', rgb: 'rgb(9, 11, 10)' },
    { name: 'Secondary Ink', hex: '#141816', role: '30% Structural Panels', rgb: 'rgb(20, 24, 22)' },
    { name: 'Brass Gold', hex: '#D6A75C', role: '10% High-Intent Accent', rgb: 'rgb(214, 167, 92)' },
    { name: 'Mulembe Moss', hex: '#34D399', role: 'Agricultural Vitality', rgb: 'rgb(52, 211, 153)' },
    { name: 'Paper Alabaster', hex: '#F5F3EF', role: 'Editorial Typography', rgb: 'rgb(245, 243, 239)' },
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Palette size={14} />
            <span className="uppercase tracking-widest font-semibold">Visual Identity & Design System</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Nyota FM Official Brand Architecture & Guidelines 2026" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Nyota FM 107.3 Brand Identity & Visual System
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Explore the official color palette, typographic architecture, mic-flag physical specifications, and acoustic jingle audio branding that anchor the station’s regional presence.
          </p>
        </div>
      </div>

      {/* 60-30-10 Color System */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-brass uppercase tracking-wider font-semibold block">
          CURATED 60-30-10 COLOR PALETTE
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => handleCopyColor(c.hex)}
              className="rounded-xl border border-hairline bg-ink p-3 text-left space-y-2 hover:border-brass/50 transition-all group"
            >
              <div
                className="h-14 rounded-lg w-full border border-hairline shadow-inner relative flex items-center justify-center"
                style={{ backgroundColor: c.hex }}
              >
                {copiedHex === c.hex && (
                  <span className="bg-ink/90 text-brass text-[10px] font-mono px-2 py-0.5 rounded shadow">
                    COPIED
                  </span>
                )}
              </div>
              <div>
                <span className="font-bold text-paper text-xs block">{c.name}</span>
                <span className="text-[10px] font-mono text-brass block">{c.hex}</span>
                <span className="text-[10px] font-mono text-sage-dim block mt-0.5">{c.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Typographic & Spatial Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="rounded-xl border border-hairline bg-ink p-4 space-y-2.5">
          <span className="text-brass uppercase tracking-wider font-semibold block">
            TYPOGRAPHIC ARCHITECTURE (THE 2+1 RULE)
          </span>
          <div className="space-y-2 text-sage">
            <div className="p-2.5 rounded bg-ink-2 border border-hairline">
              <span className="text-paper font-bold block">Display Serif: Cormorant / Playfair</span>
              <span className="text-[11px] text-sage-dim">Used for headlines, station slogans, and chapter numbers.</span>
            </div>
            <div className="p-2.5 rounded bg-ink-2 border border-hairline">
              <span className="text-paper font-bold block">Body Prose: Plus Jakarta Sans / Satoshi</span>
              <span className="text-[11px] text-sage-dim">High-legibility humanist sans-serif for comfortable long-form reading.</span>
            </div>
            <div className="p-2.5 rounded bg-ink-2 border border-hairline">
              <span className="text-paper font-bold block">Tabular Figures: JetBrains Mono / IBM Plex</span>
              <span className="text-[11px] text-sage-dim">Strict vertical alignment for financial payback models and rates.</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-ink p-4 space-y-2.5">
          <span className="text-moss uppercase tracking-wider font-semibold block">
            PHYSICAL ASSETS & MIC FLAG SPECIFICATIONS
          </span>
          <div className="space-y-2 text-sage">
            <div className="p-2.5 rounded bg-ink-2 border border-hairline">
              <span className="text-paper font-bold block">Studio Mic Flag: 65mm × 65mm Square</span>
              <span className="text-[11px] text-sage-dim">Matte black acrylic with embossed gold star logo on Shure SM7B rigs.</span>
            </div>
            <div className="p-2.5 rounded bg-ink-2 border border-hairline">
              <span className="text-paper font-bold block">OB Van Livery & Vehicle Wrap</span>
              <span className="text-[11px] text-sage-dim">High-visibility reflective gold & moss green along Toyota Land Cruiser flank.</span>
            </div>
            <div className="p-2.5 rounded bg-ink-2 border border-hairline">
              <span className="text-paper font-bold block">Presenter Uniform & Field Jackets</span>
              <span className="text-[11px] text-sage-dim">Waterproof storm jackets with embroidered 107.3 FM frequency beacon.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
