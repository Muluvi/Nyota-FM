import React from 'react';
import GlassCard from './GlassCard';

interface CompetitorInfo {
  name: string;
  followers: string;
  talkingAbout: string;
  notes: string;
  active: boolean;
}

const COMPETITORS: CompetitorInfo[] = [
  {
    name: 'Mulembe FM',
    followers: '254,901',
    talkingAbout: '49,058',
    notes: 'Royal Media Services. 20th anniversary reached. Extensive road shows and packages.',
    active: true
  },
  {
    name: 'Sulwe FM',
    followers: '255,668',
    talkingAbout: '81,839',
    notes: 'Broadcasts in Lubukusu across all five Nyota counties. High live engagement.',
    active: true
  },
  {
    name: 'Nyota FM (Today)',
    followers: 'Minimal',
    talkingAbout: 'Dormant',
    notes: 'KES 0 in digital/BTL revenue. Missing direct listener engagement loops.',
    active: false
  }
];

export default function SwipeableCards() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex overflow-x-auto scroll-snap-x gap-4 md:grid md:grid-cols-3 md:gap-6 pb-6 hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0">
        {COMPETITORS.map((comp, i) => (
          <div key={i} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 scroll-snap-center first:ml-4 md:first:ml-0 last:mr-4 md:last:mr-0 flex-shrink-0 h-full">
            <GlassCard active={!comp.active} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-display text-xl uppercase tracking-wider text-maize-cream">{comp.name}</h3>
                  {comp.active ? (
                    <div className="w-2 h-2 rounded-full bg-mulembe-green animate-pulse"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-alert-clay"></div>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-[10px] text-static-grey uppercase tracking-wider font-mono mb-1">Facebook Followers</div>
                    <div className={`font-mono text-2xl font-bold ${comp.active ? 'text-maize-cream' : 'text-alert-clay'}`}>
                      {comp.followers}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-static-grey uppercase tracking-wider font-mono mb-1">Talking About This</div>
                    <div className={`font-mono text-xl ${comp.active ? 'text-signal-amber' : 'text-static-grey'}`}>
                      {comp.talkingAbout}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-static-grey pt-4 border-t border-maize-cream/10 leading-relaxed">
                {comp.notes}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="flex justify-center gap-2 md:hidden mt-2">
        {COMPETITORS.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-static-grey/30"></div>
        ))}
      </div>
    </div>
  );
}
