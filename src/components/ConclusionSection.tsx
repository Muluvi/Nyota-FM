import React, { useState } from 'react';
import Reveal from './Reveal';
import { Check, Copy, Share2 } from 'lucide-react';

export default function ConclusionSection() {
  const [isApproved, setIsApproved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApproved(true);
    }, 1500);
  };

  const shareText = "Nyota FM Digital Blueprint ready for review.";
  const waLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText("+254 700 000000"); // Example number
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  };

  return (
    <section className="py-32 relative" id="ask">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <Reveal>
          <h2 className="text-static-grey font-mono text-sm md:text-base tracking-widest uppercase mb-4">08 · The Ask</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mt-16 overflow-hidden">
          <Reveal className="split-in-left">
            <div className="glass-panel p-8 text-left h-full border-t-2 border-alert-clay">
              <h4 className="font-display text-2xl uppercase text-maize-cream mb-6">You Invest</h4>
              <ul className="space-y-4 text-static-grey">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-alert-clay shrink-0"></div>
                  <span><strong className="text-maize-cream">≈ KES 127,000</strong> one-time build</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-alert-clay shrink-0"></div>
                  <span><strong className="text-maize-cream">≈ KES 15,000</strong> monthly ops avg</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-alert-clay shrink-0"></div>
                  <span>Small team re-tasked (2-week training)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-alert-clay shrink-0"></div>
                  <span><strong className="text-maize-cream font-mono">≈ KES 307,000</strong> Year-1 total</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="split-in-right">
            <div className="glass-panel-active p-8 text-left h-full border-t-2 border-mulembe-green bg-broadcast-night">
              <h4 className="font-display text-2xl uppercase text-maize-cream mb-6">You Gain</h4>
              <ul className="space-y-4 text-static-grey">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mulembe-green shrink-0"></div>
                  <span><strong className="text-mulembe-green">≈ KES 441K – 1.2M</strong> new revenue</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mulembe-green shrink-0"></div>
                  <span>Self-funding by Month 4</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mulembe-green shrink-0"></div>
                  <span>BTL Activation System & CRM</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mulembe-green shrink-0 animate-pulse"></div>
                  <span className="text-maize-cream">A first-mover moat rivals can't copy</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="glass-panel p-8 md:p-12 bg-broadcast-night max-w-3xl mx-auto mb-24 border border-static-grey/10">
            <p className="text-lg md:text-xl text-maize-cream font-light leading-relaxed mb-6">
              Radio is not dying; it is converging. Stations that converge will thrive; those that stay on the transmitter alone will slowly fade.
            </p>
            <p className="text-static-grey leading-relaxed">
              Every month of delay is a month your rivals deepen their lead. Doing nothing is not staying still — it is falling behind, at speed.
            </p>
            <div className="mt-8 flex justify-center gap-8 font-mono text-sm opacity-50">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase mb-1">Mulembe FM</span>
                <span className="text-signal-amber animate-pulse">254,901</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase mb-1">Sulwe FM</span>
                <span className="text-mulembe-green animate-pulse">255,668</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-tighter mb-16 gradient-text animate-letter-space">
            Mulembe. Let us take the leap, together.
          </h2>
        </Reveal>

        <Reveal delay={600}>
          <div className="flex flex-col items-center gap-6">
            {isApproved ? (
               <div className="flex flex-col items-center animate-pop-in">
                 <div className="w-16 h-16 rounded-full bg-mulembe-green/20 border border-mulembe-green flex items-center justify-center text-mulembe-green mb-4">
                   <Check size={32} />
                 </div>
                 <p className="text-mulembe-green font-mono uppercase tracking-widest text-sm">Asante! Team will follow up within 24h.</p>
               </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded bg-gradient-to-r from-signal-amber to-[#f59e0b] text-broadcast-night font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[240px]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-broadcast-night border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Approve the Blueprint'
                  )}
                </button>
                <a 
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded border border-white/20 bg-white/5 text-maize-cream font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <img src="https://res.cloudinary.com/da5j0zjok/image/upload/v1780508491/Digital_Inline_Green_RGB_2026_b09uro.png" alt="WhatsApp" className="h-4 w-auto object-contain" loading="lazy" />
                  Share via WhatsApp
                </a>
              </div>
            )}
            
            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-static-grey relative">
               <button onClick={handleCopy} className="hover:text-maize-cream transition-colors flex items-center gap-1 group">
                 <Copy size={12} className="group-hover:text-signal-amber" /> +254 700 000000
               </button>
               <span className="opacity-30">|</span>
               <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-maize-cream transition-colors flex items-center gap-1 group">
                 <Share2 size={12} className="group-hover:text-mulembe-green" /> WhatsApp
               </a>
               
               {copyToast && (
                 <div className="absolute -top-8 left-0 text-[10px] bg-white text-black px-2 py-1 rounded shadow animate-pop-in">
                   Copied!
                 </div>
               )}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
