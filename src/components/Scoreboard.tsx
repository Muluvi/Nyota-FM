import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import Reveal from './Reveal';

export default function Scoreboard() {
  return (
    <Reveal delay={200}>
      <div className="bg-[#050810] border border-maize-cream/10 p-6 md:p-10 rounded-xl font-mono shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden mb-6">
        <div className="text-[10px] text-static-grey uppercase tracking-widest mb-6 opacity-60">Live Following</div>
        
        <div className="space-y-6 md:space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 gap-2">
            <div className="text-maize-cream font-bold uppercase tracking-wider text-sm md:text-base">Mulembe FM</div>
            <div className="text-3xl md:text-5xl font-black text-[#2ecc71] tabular-nums">
              <AnimatedCounter value={254901} duration={2500} decimals={0} delay={300} />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 gap-2">
            <div className="text-maize-cream font-bold uppercase tracking-wider text-sm md:text-base">Sulwe FM</div>
            <div className="text-3xl md:text-5xl font-black text-mulembe-green tabular-nums">
              <AnimatedCounter value={255668} duration={2500} decimals={0} delay={400} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between pt-2 gap-2">
            <div className="text-signal-amber font-bold uppercase tracking-wider text-sm md:text-base flex items-center gap-3">
              Nyota FM
              <div className="flex items-end gap-[2px] h-3 opacity-30">
                <div className="w-1 bg-signal-amber h-[20%]"></div>
                <div className="w-1 bg-signal-amber h-[20%]"></div>
                <div className="w-1 bg-signal-amber h-[20%]"></div>
                <div className="w-1 bg-signal-amber h-[20%]"></div>
              </div>
            </div>
            <div className="text-3xl md:text-5xl font-black text-signal-amber/40 tabular-nums animate-[glitch_4s_infinite]">
              <span className="opacity-50">—</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center font-mono text-[12px] md:text-[14px] text-alert-clay uppercase tracking-wider animate-[pulse-clay_2s_infinite]">
        Every day this gap stays open, attention and shillings flow to them.
      </div>
    </Reveal>
  );
}
