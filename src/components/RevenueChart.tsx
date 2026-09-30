import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { CheckCircle2 } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const DATA = [
  { m: 1, d: 0, b: 0, f: 1000, e: 500 },
  { m: 2, d: 0, b: 0, f: 2500, e: 1200 },
  { m: 3, d: 3, b: 5, f: 4000, e: 2000 },
  { m: 4, d: 6, b: 12, f: 6000, e: 3000 },
  { m: 5, d: 8, b: 15, f: 8000, e: 4500 },
  { m: 6, d: 12, b: 20, f: 11000, e: 6000 },
  { m: 7, d: 15, b: 25, f: 14000, e: 8000 },
  { m: 8, d: 18, b: 28, f: 17000, e: 10000 },
  { m: 9, d: 22, b: 33, f: 20000, e: 12000 },
  { m: 10, d: 26, b: 38, f: 24000, e: 14000 },
  { m: 11, d: 30, b: 42, f: 28000, e: 16000 },
  { m: 12, d: 35, b: 48, f: 33000, e: 18000 }
]; // figures in thousands for KES

export default function RevenueChart() {
  const [currentMonth, setCurrentMonth] = useState(1);
  const [isDrawn, setIsDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsDrawn(true), 500);
        // auto-play slider once drawn
        setTimeout(() => {
           let m = 1;
           const interval = setInterval(() => {
             m++;
             if(m <= 12) setCurrentMonth(m);
             else clearInterval(interval);
           }, 200);
        }, 1500);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const d = DATA[currentMonth - 1];
  const totalKes = (d.d + d.b) * 1000;
  
  // Calculate SVG paths (simplified stacked area)
  const w = 800;
  const h = 200;
  const maxTotal = 35 + 48; // max possible sum
  
  const getPoints = (getValue: (d: any) => number) => {
    return DATA.map((point, i) => {
      const x = (i / 11) * w;
      const y = h - (getValue(point) / maxTotal) * h;
      return `${x},${y}`;
    }).join(' ');
  };
  
  const btlPoints = getPoints(p => p.b);
  const combinedPoints = getPoints(p => p.b + p.d);
  
  const btlArea = `M0,${h} L${btlPoints} L${w},${h} Z`;
  const combinedArea = `M0,${h} L${combinedPoints} L${w},${h} Z`;

  return (
    <div ref={ref} className="py-12 relative w-full">
      <Reveal>
        <div className="glass-panel p-6 md:p-8 overflow-hidden">
          <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-8">12-Month Projection</h4>
          
          {/* Animated Chart */}
          <div className="relative w-full h-48 md:h-64 mb-8">
            <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              <line x1="0" y1="0" x2={w} y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1={h/2} x2={w} y2={h/2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              
              <g className={`transition-all duration-[2000ms] ease-out origin-left ${isDrawn ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
                {/* Combined Area (Digital is the gap between BTL and combined) */}
                <path d={combinedArea} fill="rgba(46,204,113,0.1)" />
                <polyline points={combinedPoints} fill="none" stroke="#2ecc71" strokeWidth="2" />
                
                {/* BTL Area */}
                <path d={btlArea} fill="rgba(234,179,8,0.1)" />
                <polyline points={btlPoints} fill="none" stroke="#eab308" strokeWidth="2" />
              </g>
              
              {/* Scrubber Line */}
              <line 
                x1={((currentMonth - 1) / 11) * w} 
                y1="0" 
                x2={((currentMonth - 1) / 11) * w} 
                y2={h} 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
            </svg>
            
            {/* Chart Legend */}
            <div className="absolute top-0 right-0 flex gap-4 text-[10px] font-mono uppercase tracking-widest bg-broadcast-night/80 p-2 rounded">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-mulembe-green"></span> Digital</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-signal-amber"></span> BTL</div>
            </div>
          </div>

          {/* Scrubber Slider */}
          <div className="mb-8 px-2 relative">
            <input 
              ref={sliderRef}
              type="range" 
              min="1" 
              max="12" 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-grab active:cursor-grabbing outline-none"
              style={{
                background: `linear-gradient(to right, var(--color-mulembe-green) 0%, var(--color-mulembe-green) ${(currentMonth - 1) * (100 / 11)}%, rgba(255,255,255,0.1) ${(currentMonth - 1) * (100 / 11)}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
            {/* Custom thumb styles added via CSS but basic appearance-none handles it mostly */}
            <style>{`
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background: var(--color-mulembe-green);
                box-shadow: 0 0 10px rgba(46,204,113,0.5);
                margin-top: -11px;
                border: 4px solid var(--color-broadcast-night);
              }
            `}</style>
            <div className="flex justify-between text-[10px] font-mono text-static-grey mt-2 px-1">
              <span>M1</span>
              <span>M6</span>
              <span>M12</span>
            </div>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-3 gap-4 border-t border-static-grey/20 pt-6">
            <div>
              <div className="text-[10px] uppercase font-mono text-static-grey mb-1">Followers</div>
              <div className="font-mono text-lg md:text-2xl text-maize-cream">{d.f.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-static-grey mb-1">Engagement/mo</div>
              <div className="font-mono text-lg md:text-2xl text-maize-cream">{d.e.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-static-grey mb-1">Total KES/mo</div>
              <div className="font-mono text-lg md:text-2xl text-signal-amber">
                <AnimatedCounter value={totalKes} duration={300} decimals={0} />
              </div>
            </div>
          </div>
          
          {/* Year Total Checkmark */}
          {currentMonth === 12 && (
             <div className="absolute bottom-6 right-6 flex items-center gap-2 animate-pop-in">
               <span className="font-mono text-sm text-static-grey">Yr 1:</span>
               <span className="font-display text-xl text-maize-cream">≈ 441,000</span>
               <CheckCircle2 size={20} className="text-signal-amber" />
             </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
