import React, { useState } from 'react';
import Reveal from './Reveal';
import { Accordion } from './Accordion';
import { Copy, Share2 } from 'lucide-react';

const SOURCES = [
  { source: 'DataReportal, Digital 2025: Kenya', data: '27.4M internet users (48.0%), 15.1M social identities, 4h19m daily social media.', year: '2025' },
  { source: 'CA Sector Statistics', data: 'Smartphone penetration 80.8%→92.9%; Facebook 69.9%, WhatsApp 56.0%, TikTok 30.3%; 29.6M feature phones.', year: '2025' },
  { source: 'GeoPoll', data: 'Citizen Radio leads; Western region fragmented (Ingo, Mulembe, West Kenya).', year: '2026' },
  { source: 'Official Facebook pages', data: 'Mulembe FM (254,901), Sulwe FM (255,668).', year: '2026' },
  { source: 'ODPC Guidance Note', data: 'Registration KES 4,000, renewal KES 2,000.', year: '2024' },
];

const ASSUMPTIONS = [
  'Follower and revenue projections are deliberately conservative; organic-first; meaningful income from Month 4.',
  'Equipment prices are current Kenyan retail and will fluctuate with the USD/KES rate.',
  'Revenue assumes Nyota FM leverages its existing on-air audience to drive social growth.',
  'TikTok Live gifts & YouTube ad revenue are modelled as modest because Kenyan payouts are variable.',
  'BTL revenue is the largest, most reliable line because it rests on existing local trust.',
  'Team hours assume a small existing staff re-tasked, not new hires.'
];

const CASE_STUDIES = [
  { name: 'Ghetto Radio (Nairobi)', takeaway: 'Mid-size station running full stack with grant support — proof the model scales.' },
  { name: 'MADIBAZ Radio (SA)', takeaway: 'Using TikTok to grow youth listenership and disseminate news.' },
  { name: 'Zimbabwe community radio', takeaway: 'Basic phones + WhatsApp + offline distro works for low-budget stations.' }
];

export default function Appendix() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Nyota FM Rate Card Text..."); // Mock
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  };

  return (
    <div className="py-12 border-t border-static-grey/10">
      <div className="max-w-4xl mx-auto px-6">
        <details className="group marker:content-['']">
          <summary className="flex items-center justify-between cursor-pointer py-4 opacity-50 hover:opacity-100 transition-opacity">
            <h4 className="font-mono text-sm uppercase tracking-widest text-maize-cream">Appendix · Evidence & Tools</h4>
            <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </summary>
          
          <div className="mt-8 space-y-2">
            <Accordion title="Data Sources" isOpen={openSection === 'sources'} onClick={() => setOpenSection(openSection === 'sources' ? null : 'sources')}>
              <div className="space-y-4">
                {SOURCES.map((s, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 text-xs font-mono">
                    <div>
                      <strong className="text-maize-cream block mb-1">{s.source}</strong>
                      <span className="text-static-grey">{s.data}</span>
                    </div>
                    <span className="bg-white/5 px-2 py-1 rounded text-static-grey shrink-0">{s.year}</span>
                  </div>
                ))}
              </div>
            </Accordion>
            
            <Accordion title="Key Assumptions" isOpen={openSection === 'assumptions'} onClick={() => setOpenSection(openSection === 'assumptions' ? null : 'assumptions')}>
              <div className="space-y-3">
                {ASSUMPTIONS.map((a, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-signal-amber mt-1.5 shrink-0"></div>
                    <span className="text-static-grey">{a}</span>
                  </div>
                ))}
              </div>
            </Accordion>
            
            <Accordion title="Case Studies" isOpen={openSection === 'cases'} onClick={() => setOpenSection(openSection === 'cases' ? null : 'cases')}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CASE_STUDIES.map((c, i) => (
                  <div key={i} className="glass-panel p-4">
                    <strong className="text-maize-cream text-sm block mb-2">{c.name}</strong>
                    <span className="text-xs text-static-grey leading-relaxed block"><strong>{c.takeaway}</strong></span>
                  </div>
                ))}
              </div>
            </Accordion>
            
            <Accordion title="Rate Card (One-Pager)" isOpen={openSection === 'ratecard'} onClick={() => setOpenSection(openSection === 'ratecard' ? null : 'ratecard')}>
              <div className="flex flex-col items-center py-4">
                {/* Phone-share-ready card */}
                <div className="w-full max-w-[400px] bg-maize-cream text-broadcast-night p-6 rounded shadow-xl relative aspect-[9/16] overflow-y-auto hide-scrollbar border-4 border-white/10">
                  <div className="text-center mb-6">
                    <h2 className="font-display text-2xl uppercase tracking-tighter">NYOTA FM</h2>
                    <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Advertise Where Western Kenya Lives</p>
                  </div>
                  <p className="text-xs text-center font-medium italic mb-6">On air, on their phones, and at the soko.</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="border border-broadcast-night/20 p-3 rounded">
                      <div className="flex justify-between font-bold text-sm mb-1">
                        <span>MULEMBE STARTER</span>
                        <span>5,000/mo</span>
                      </div>
                      <p className="text-[10px] opacity-70">4 FB posts + 1 WA broadcast</p>
                    </div>
                    <div className="border border-broadcast-night/20 p-3 rounded bg-broadcast-night/5">
                      <div className="flex justify-between font-bold text-sm mb-1">
                        <span>SOKO PACKAGE</span>
                        <span>15,000/ev</span>
                      </div>
                      <p className="text-[10px] opacity-70">Market tent, live stream, mentions</p>
                    </div>
                    <div className="border border-broadcast-night/20 p-3 rounded">
                      <div className="flex justify-between font-bold text-sm mb-1">
                        <span>BOSS PACKAGE</span>
                        <span>25,000/mo</span>
                      </div>
                      <p className="text-[10px] opacity-70">Cross-platform + Boda stickers + Activation</p>
                    </div>
                  </div>
                  
                  <div className="text-center text-[10px] space-y-1 mb-4">
                    <p><strong>WhatsApp:</strong> 07XX XXX XXX</p>
                    <p><strong>Till:</strong> XXXXXX</p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-4 mt-6 relative">
                  <button onClick={handleCopy} className="glass-panel px-4 py-2 flex items-center gap-2 text-xs font-mono uppercase hover:text-signal-amber transition-colors">
                    <Copy size={14} /> Copy Text
                  </button>
                  <a href="#" className="glass-panel px-4 py-2 flex items-center gap-2 text-xs font-mono uppercase hover:text-mulembe-green transition-colors">
                    <Share2 size={14} /> WhatsApp
                  </a>
                  {copyToast && (
                     <div className="absolute -top-10 left-4 text-[10px] bg-white text-black px-2 py-1 rounded shadow animate-pop-in">
                       Copied to clipboard!
                     </div>
                  )}
                </div>
              </div>
            </Accordion>
          </div>
        </details>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-static-grey uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-maize-cream animate-[pulse-clay_4s_infinite]">NYOTA FM</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Prepared with</span>
            <img src="https://res.cloudinary.com/da5j0zjok/image/upload/v1786407396/Horizontal_logo_clear_png_v0cjbd.png" alt="Firefly Management" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-maize-cream transition-colors">
            Back to top ↑
          </button>
        </div>
      </div>
    </div>
  );
}
