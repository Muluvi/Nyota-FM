import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { Mic, Radio, Smartphone, Share2, Youtube, Instagram, Twitter } from 'lucide-react';

export default function ContentAtomization() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const nodes = [
    { icon: Mic, label: 'Podcast', angle: -90 },
    { icon: Smartphone, label: 'TikTok', angle: -30 },
    { icon: Share2, label: 'Facebook', angle: 30 },
    { icon: Radio, label: 'WhatsApp', angle: 90 },
    { icon: Instagram, label: 'Instagram', angle: 150 },
    { icon: Twitter, label: 'X (Twitter)', angle: 210 },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-lg mx-auto aspect-square py-12">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center Node */}
        <div className="relative z-20 glass-panel-active p-6 rounded-full flex flex-col items-center justify-center text-signal-amber bg-broadcast-night">
          <Mic size={32} className="mb-2" />
          <span className="font-mono text-xs uppercase tracking-widest text-center">1 Recording</span>
        </div>

        {/* Radiating Lines & Nodes */}
        {nodes.map((node, idx) => {
          const delay = idx * 300;
          const rad = (node.angle * Math.PI) / 180;
          const distance = 140; // px distance from center
          const x = Math.cos(rad) * distance;
          const y = Math.sin(rad) * distance;

          return (
            <React.Fragment key={idx}>
              {/* Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                <line
                  x1="50%" y1="50%"
                  x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
                  stroke="var(--color-static-grey)"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={isVisible ? 0 : 100}
                  className="transition-all duration-700 ease-out"
                  style={{ transitionDelay: `${delay}ms` }}
                />
              </svg>
              
              {/* Outer Node */}
              <div 
                className={`absolute w-16 h-16 glass-panel rounded-full flex items-center justify-center text-static-grey transition-all duration-500 bg-broadcast-night z-10 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                style={{ 
                  transform: `translate(${x}px, ${y}px) ${isVisible ? 'scale(1)' : 'scale(0.5)'}`,
                  transitionDelay: `${delay + 500}ms` 
                }}
              >
                <node.icon size={20} />
                <div className="absolute -bottom-6 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider">
                  {node.label}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      
      <div className={`absolute bottom-0 w-full text-center transition-all duration-1000 delay-[2500ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-maize-cream font-display text-lg tracking-wide uppercase">
          One recording. Six touchpoints. One hour.
        </p>
      </div>
    </div>
  );
}
