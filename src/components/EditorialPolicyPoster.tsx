import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

export default function EditorialPolicyPoster() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsOpen(true), 500);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-12 flex justify-center perspective-1000">
      <div className="relative w-full max-w-2xl bg-maize-cream text-broadcast-night p-8 md:p-12 shadow-2xl rounded-sm transform rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
        
        {/* Curtains */}
        <div className={`absolute inset-0 z-20 flex ${isOpen ? 'curtain-open' : ''} pointer-events-none`}>
          <div className="curtain-panel-l w-1/2 h-full bg-broadcast-night border-r border-signal-amber/30 flex items-center justify-end pr-4">
             <span className="text-signal-amber font-mono text-sm tracking-widest rotate-[-90deg]">EDITORIAL</span>
          </div>
          <div className="curtain-panel-r w-1/2 h-full bg-broadcast-night border-l border-signal-amber/30 flex items-center justify-start pl-4">
             <span className="text-signal-amber font-mono text-sm tracking-widest rotate-90">POLICY</span>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter mb-8 text-center border-b-2 border-broadcast-night pb-4">
            Digital Editorial Policy
          </h3>
          
          <div className="space-y-6 font-body text-base md:text-lg font-medium leading-relaxed">
            <div className="flex gap-4">
              <span className="font-display text-2xl text-alert-clay">1.</span>
              <p><strong>No unverified political claims.</strong> If it is not confirmed by a named, credible source, it does not go out — on air, online, or on the ground.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-display text-2xl text-alert-clay">2.</span>
              <p><strong>No hate speech or ethnic incitement.</strong> Zero tolerance. Delete, block, report. Western Kenya's peace is worth more than any click.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-display text-2xl text-alert-clay">3.</span>
              <p><strong>All sponsored content clearly labelled "Sponsored."</strong> Trust is the business. Never disguise an ad as news.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center border-t border-broadcast-night/20 pt-4">
            <p className="font-mono text-xs uppercase tracking-widest text-broadcast-night/60">Nyota FM · The 3-Point Box</p>
          </div>
        </div>
      </div>
    </div>
  );
}
