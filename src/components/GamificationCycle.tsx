import React from 'react';
import { KeyRound, MapPin, Gift, Camera, Hash } from 'lucide-react';
import Reveal from './Reveal';

const STEPS = [
  { icon: KeyRound, title: 'Code Word', desc: 'Announced on air' },
  { icon: MapPin, title: 'Visit Stand', desc: 'At the market' },
  { icon: Gift, title: 'Claim Prize', desc: 'Sticker/Airtime' },
  { icon: Camera, title: 'Take Selfie', desc: 'At branded backdrop' },
  { icon: Hash, title: '#NyotaFM Post', desc: 'Listener posts online' }
];

export default function GamificationCycle() {
  return (
    <Reveal>
      <div className="relative w-full max-w-md mx-auto aspect-square py-12">
        <div className="absolute inset-0 animate-rotate-slow pointer-events-none flex justify-center items-center">
          {/* Dashed Circle */}
          <div className="w-[70%] h-[70%] rounded-full border border-dashed border-signal-amber/40"></div>
          
          {STEPS.map((step, idx) => {
            const angle = (idx * (360 / STEPS.length) - 90) * (Math.PI / 180);
            const radius = 42; // percentage
            const top = `calc(50% + ${Math.sin(angle) * radius}%)`;
            const left = `calc(50% + ${Math.cos(angle) * radius}%)`;
            
            return (
              <div 
                key={idx}
                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full glass-panel-active bg-broadcast-night flex items-center justify-center text-signal-amber"
                style={{
                  top, left,
                  transform: 'translate(-50%, -50%)',
                  animation: 'rotate-slow 24s linear infinite reverse'
                }}
              >
                <step.icon size={24} />
              </div>
            );
          })}
        </div>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          <div className="text-center p-4 glass-panel bg-broadcast-night/80 rounded-full w-32 h-32 flex flex-col items-center justify-center border-signal-amber/30">
            <span className="font-display text-sm uppercase text-maize-cream">Social-to-Physical</span>
            <span className="font-mono text-xs text-signal-amber">LOOP</span>
          </div>
        </div>
      </div>
      
      {/* Legend for accessibility/clarity */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {STEPS.map((step, idx) => (
          <div key={idx} className="text-center">
            <span className="block font-mono text-signal-amber text-xs mb-1">{idx + 1}. {step.title}</span>
            <span className="block text-static-grey text-[10px] uppercase tracking-wider">{step.desc}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
