import React, { useState, useEffect, useRef } from 'react';
import { Shirt } from 'lucide-react';
import Reveal from './Reveal';

export default function StreetTeamIcons() {
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
    <div ref={ref} className="py-8">
      <Reveal>
        <h4 className="text-xl font-display text-maize-cream mb-2 text-center">Nyota FM Street Team</h4>
        <p className="font-mono text-signal-amber text-xs text-center mb-8 uppercase tracking-widest">10–20 Volunteers</p>
      </Reveal>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {[...Array(20)].map((_, idx) => (
          <div 
            key={idx}
            className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <Shirt 
              size={32} 
              className={`transition-colors duration-1000 ${isVisible ? 'text-mulembe-green fill-mulembe-green/20' : 'text-static-grey fill-transparent'}`}
              style={{ transitionDelay: `${idx * 100 + 300}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
