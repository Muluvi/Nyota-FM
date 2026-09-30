import React, { useState } from 'react';
import Reveal from './Reveal';
import { ChevronDown } from 'lucide-react';

const RISKS = [
  { risk: 'Power cuts', likelihood: 'High', impact: 'Med', mitigation: 'Power banks (2×20,000mAh); pre-record & schedule; small inverter/solar; download content for offline posting.', level: 'alert' },
  { risk: 'Equipment theft', likelihood: 'Med', impact: 'High', mitigation: 'Lockable cabinet for kit; sign-out log; engrave/label gear; insure key items; never leave phones unattended at events.', level: 'alert' },
  { risk: 'Negative comments / political misinformation', likelihood: 'High', impact: 'High', mitigation: 'Community Management Playbook; delete + block per moderation rules; never post unverified political claims; escalate to owner.', level: 'alert' },
  { risk: 'Low digital literacy (team)', likelihood: 'Med', impact: 'Med', mitigation: '2-week free micro-training; simple written workflows; start with easiest platforms; buddy system.', level: 'amber' },
  { risk: 'Internet data costs', likelihood: 'High', impact: 'Med', mitigation: 'Buy value bundles (Airtel Smarta / Faiba); schedule uploads on Wi-Fi/night bundles; compress video; free-WhatsApp plans.', level: 'amber' },
  { risk: 'Copyright infringement (music/clips)', likelihood: 'Med', impact: 'Med', mitigation: 'Use licensed/local artists (with permission), TikTok/Reels licensed audio libraries, original content; credit creators.', level: 'amber' },
  { risk: 'Data protection compliance', likelihood: 'Med', impact: 'High', mitigation: 'Register with ODPC (KES 4,000); log consent for CRM; privacy notice; secure the Google Sheet (restricted access).', level: 'alert' },
  { risk: 'Low turnout at BTL activations', likelihood: 'Med', impact: 'Med', mitigation: 'Pre-promote on air 3–5 days; partner with existing market days/events; free giveaways; go where crowds already are.', level: 'amber' },
  { risk: 'Vandalism of outdoor branding', likelihood: 'Med', impact: 'Low', mitigation: 'Place high/secured; cheap-to-replace stickers; rotate; budget small replacement fund.', level: 'grey' },
  { risk: 'Street Team volunteer drop-off', likelihood: 'High', impact: 'Med', mitigation: 'Clear incentives (airtime/shout-outs); recognition; rotate roles; over-recruit (20 to keep 12 active); monthly appreciation.', level: 'amber' }
];

export default function RiskAccordion() {
  return (
    <div className="space-y-3">
      {RISKS.map((item, idx) => (
        <Reveal key={idx} delay={idx * 50}>
          <RiskCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

function RiskCard({ item }: { item: typeof RISKS[0], key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const borderColors = {
    alert: 'border-l-alert-clay',
    amber: 'border-l-signal-amber',
    grey: 'border-l-static-grey'
  };
  
  const pulseClass = item.level === 'alert' ? 'animate-[pulse-clay_2s_infinite]' : '';

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div 
      className={`glass-panel border-l-4 cursor-pointer overflow-hidden transition-all duration-300 ${borderColors[item.level as keyof typeof borderColors]} ${pulseClass}`}
      onClick={toggleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <h5 className="text-maize-cream font-medium text-sm md:text-base">{item.risk}</h5>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-broadcast-night border border-static-grey/30 text-static-grey">Likelihood: {item.likelihood}</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-broadcast-night border border-static-grey/30 text-static-grey">Impact: {item.impact}</span>
          </div>
        </div>
        <ChevronDown size={20} className={`text-static-grey transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <div className={`px-4 pb-4 text-sm text-static-grey bg-broadcast-night/40 border-t border-static-grey/10 transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 border-transparent overflow-hidden'}`}>
        <strong className="text-signal-amber font-mono text-xs uppercase tracking-widest block mb-1">Mitigation</strong>
        {item.mitigation}
      </div>
    </div>
  );
}
