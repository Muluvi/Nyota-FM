import React from 'react';

const CHAPTERS = [
  { id: 'summary', number: '01', title: 'Executive Summary', desc: 'The bottom line on ROI and the gap in the market.' },
  { id: 'landscape', number: '02', title: 'The Digital Landscape', desc: 'Why the opportunity is now.' },
  { id: 'personas', number: '03', title: 'Your Listeners', desc: 'Who they are and how to reach them.' },
  { id: 'platforms', number: '04', title: 'Platform Deep Dive', desc: 'Facebook, WhatsApp, TikTok, YouTube & more.' },
  { id: 'equipment', number: '05', title: 'Studio Transformation', desc: 'Building a content hub without disruption.' },
  { id: 'roadmap', number: '06', title: 'Implementation Roadmap', desc: 'From 90-day launch to 12-month scale-up.' },
  { id: 'monetization', number: '07', title: 'Monetization & Tracking', desc: 'Revenue streams, touchpoints, and the dashboard.' },
  { id: 'conclusion', number: '08', title: 'Conclusion & The Ask', desc: 'The request for investment.' },
  { id: 'appendix', number: 'AP', title: 'Appendix', desc: 'Data sources, case studies, and rate card.' }
];

export function ContentsOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const handleNav = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      // Offset for header
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 bg-ink z-[70] overflow-y-auto overflow-x-hidden pb-12 animate-section-entrance">
      <div className="sticky top-0 bg-ink border-b border-hairline h-[56px] px-4 md:px-6 flex items-center justify-between z-10">
        <span className="font-display text-paper text-xl">Contents</span>
        <button 
          onClick={onClose}
          className="text-brass font-body text-[15px] hover:opacity-80"
        >
          Close
        </button>
      </div>
      
      <div className="max-w-[640px] mx-auto px-4 md:px-6 pt-12">
        <div className="flex flex-col">
          {CHAPTERS.map(ch => (
            <button 
              key={ch.id} 
              onClick={() => handleNav(ch.id)}
              className="group flex flex-col sm:flex-row sm:items-center py-5 border-b border-hairline text-left hover:bg-ink-2 transition-colors -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              <div className="flex items-center gap-4 mb-2 sm:mb-0 sm:w-[40%]">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-[1.5px] border-brass font-mono text-brass text-sm shrink-0">
                  {ch.number}
                </div>
                <span className="font-body text-paper text-base group-hover:text-brass transition-colors">{ch.title}</span>
              </div>
              <div className="sm:w-[60%] sm:pl-4">
                <span className="font-body text-sage-dim text-sm">{ch.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
