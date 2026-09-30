import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

const FUNNEL_STAGES = [
  { name: 'Awareness', metric: '20,000 monthly reach', widthTop: '0%', widthBot: '10%' },
  { name: 'Engagement', metric: '2,000 engagements/mo', widthTop: '10%', widthBot: '20%' },
  { name: 'Loyalty', metric: '8,000 FB followers', widthTop: '20%', widthBot: '30%' },
  { name: 'Revenue', metric: 'KES 30,000+/mo', widthTop: '30%', widthBot: '40%' }
];

export default function AudienceFunnel() {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-1 py-8">
      {FUNNEL_STAGES.map((stage, idx) => (
        <FunnelLayer key={stage.name} stage={stage} index={idx} />
      ))}
    </div>
  );
}

function FunnelLayer({ stage, index }: { stage: any, index: number, key?: React.Key }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="relative h-20 w-full transition-all duration-1000 ease-out"
      style={{
        '--top-w': stage.widthTop,
        '--bot-w': stage.widthBot,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 200}ms`
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-signal-amber/10 border border-signal-amber/30 funnel-trap backdrop-blur-sm flex items-center justify-center flex-col">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${index * 200 + 400}ms` }}>
          <span className="block text-maize-cream font-display uppercase tracking-wider text-sm">{stage.name}</span>
          <span className="block text-signal-amber font-mono text-xs">{stage.metric}</span>
        </div>
      </div>
      
      {/* Fill Animation */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-signal-amber/20 funnel-trap transition-all duration-1000 ease-in-out origin-bottom"
        style={{
          height: isVisible ? '100%' : '0%',
          transitionDelay: `${index * 200 + 200}ms`
        }}
      ></div>
    </div>
  );
}
