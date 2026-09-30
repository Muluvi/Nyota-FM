import React, { useEffect, useState, useRef } from 'react';
import Reveal from './Reveal';

export default function StudioFloorPlan() {
  const [isDrawn, setIsDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal>
      <div ref={ref} className="glass-panel p-8 relative overflow-hidden aspect-square max-w-sm mx-auto">
        <h4 className="text-maize-cream font-mono text-sm tracking-widest uppercase mb-6 absolute top-8 left-8 z-10">
          CONTENT NOOK
        </h4>
        
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-static-grey fill-none" strokeWidth="1.5">
          {/* Walls */}
          <path 
            d="M 10,90 L 10,10 L 90,10" 
            className={`transition-all duration-1000 ${isDrawn ? 'stroke-maize-cream stroke-dashoffset-0' : 'stroke-dashoffset-1000'}`}
            style={{ strokeDasharray: 200, strokeDashoffset: isDrawn ? 0 : 200 }}
          />
          {/* Acoustic Foam panels */}
          <g className={`transition-all duration-1000 delay-500 opacity-0 ${isDrawn ? 'opacity-100' : ''}`}>
            {[...Array(5)].map((_, i) => (
              <line key={`foam1-${i}`} x1="8" y1={20 + i * 10} x2="12" y2={20 + i * 10} stroke="var(--color-signal-amber)" strokeWidth="2" />
            ))}
            {[...Array(5)].map((_, i) => (
              <line key={`foam2-${i}`} x1={20 + i * 10} y1="8" x2={20 + i * 10} y2="12" stroke="var(--color-signal-amber)" strokeWidth="2" />
            ))}
          </g>

          {/* Backdrop */}
          <line 
            x1="20" y1="20" x2="80" y2="80" 
            stroke="var(--color-mulembe-green)" strokeWidth="2" strokeDasharray="4 4"
            className={`transition-all duration-1000 delay-[1000ms] opacity-0 ${isDrawn ? 'opacity-100' : ''}`}
          />

          {/* Chairs */}
          <circle cx="35" cy="65" r="6" className={`transition-all duration-700 delay-[1500ms] opacity-0 ${isDrawn ? 'opacity-100' : ''}`} />
          <circle cx="65" cy="35" r="6" className={`transition-all duration-700 delay-[1700ms] opacity-0 ${isDrawn ? 'opacity-100' : ''}`} />

          {/* Ring Light & Phone */}
          <g className={`transition-all duration-700 delay-[2000ms] opacity-0 ${isDrawn ? 'opacity-100' : ''}`}>
            <circle cx="50" cy="50" r="8" stroke="var(--color-signal-amber)" strokeWidth="1" />
            <rect x="47" y="46" width="6" height="8" rx="1" fill="var(--color-broadcast-night)" stroke="var(--color-maize-cream)" />
          </g>
        </svg>

        {/* Labels */}
        <div className={`absolute bottom-8 right-8 text-xs font-mono text-static-grey transition-all duration-700 delay-[2500ms] ${isDrawn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-signal-amber"></span> Acoustic Foam</div>
          <div className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-mulembe-green opacity-50"></span> Backdrop</div>
          <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full border border-static-grey"></span> Chair</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border border-signal-amber flex items-center justify-center"><span className="w-1 h-1.5 border border-maize-cream rounded-sm block"></span></span> Ring Light</div>
        </div>
      </div>
    </Reveal>
  );
}
