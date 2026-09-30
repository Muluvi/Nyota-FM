import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { MapPin, Smartphone, Clock } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  location: string;
  age: string;
  color: string;
  colorHex: string;
  emoji: string;
  primaryPlatforms: string[];
  device: string;
  content: string;
  hotHours: number[][];
  btl: string;
}

const PLATFORM_ICONS: Record<string, string> = {
  Facebook: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765889247/AZsnL4dMdfGc81To27QzCg-AZsnL4dMtdFVyuKofE0Y6Q_20251216_154319_0000_nq9hvp.png',
  WhatsApp: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1780508490/Digital_Glyph_Green_RGB_2026_fokvoc.png',
  TikTok: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765720754/TikTok-logo-RGB-Horizontal-white_vh4efn.png',
  Instagram: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1768409776/Instagram_Glyph_Gradient_kvn0tu.png',
  YouTube: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765721612/yt_logo_fullcolor_white_digital_d6vxgj.png',
  SMS: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1780508490/Digital_Glyph_Green_RGB_2026_fokvoc.png' // using wa for sms placeholder
};

export default function PersonaCard({ persona, isFirst }: { persona: Persona, isFirst: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`flip-card w-full h-[400px] cursor-pointer ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front">
          <GlassCard className="h-full w-full flex flex-col items-center justify-center text-center relative border-t-4" style={{ borderTopColor: persona.colorHex }}>
            <div className="text-6xl mb-6">{persona.emoji}</div>
            <h3 className="font-display text-2xl uppercase tracking-wide text-maize-cream mb-2">{persona.name}</h3>
            <div className="flex gap-2 items-center mb-6">
              <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-static-grey">{persona.location}</span>
              <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-static-grey">AGE {persona.age}</span>
            </div>
            <div className="flex gap-3 items-center">
              {persona.primaryPlatforms.map(p => (
                <img key={p} src={PLATFORM_ICONS[p]} alt={p} className="h-5 w-5 object-contain" />
              ))}
            </div>
            
            {isFirst && !flipped && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-signal-amber font-mono uppercase tracking-widest animate-pulse">
                Tap to flip
              </div>
            )}
          </GlassCard>
        </div>

        {/* BACK */}
        <div className="flip-card-back">
          <GlassCard className="h-full w-full flex flex-col relative border-t-4 text-left p-6" style={{ borderTopColor: persona.colorHex }}>
            <h4 className="font-display text-lg uppercase tracking-wider text-maize-cream mb-4 border-b border-white/10 pb-2">{persona.name}</h4>
            
            <div className="flex-1 space-y-4 overflow-y-auto hide-scrollbar">
              <div>
                <div className="flex items-center gap-1.5 text-signal-amber mb-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">Device & Access</span>
                </div>
                <p className="text-xs text-static-grey leading-relaxed">{persona.device}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-1.5 text-signal-amber mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">Content & Timing</span>
                </div>
                <p className="text-xs text-static-grey leading-relaxed">{persona.content}</p>
              </div>
              
              <div className="pt-2">
                <div className="flex items-start gap-1.5 text-mulembe-green mb-1 bg-mulembe-green/10 p-2 rounded">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider block mb-0.5">BTL Touchpoint</span>
                    <p className="text-xs text-maize-cream leading-tight">{persona.btl}</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
