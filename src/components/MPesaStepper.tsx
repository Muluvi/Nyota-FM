import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  { title: 'Go to m-pesaforbusiness.co.ke', desc: 'Click "Apply Now."' },
  { title: 'Choose Buy Goods (Till)', desc: 'Or Paybill if you want account references (e.g., per-advertiser tracking).' },
  { title: 'Select ownership type', desc: 'Upload: business permit, KRA PIN, ID, bank letter/cancelled cheque, registered Safaricom line.' },
  { title: 'Sign terms; submit.', desc: 'Approval typically 24–72 hours.' },
  { title: 'Activate via *234#', desc: 'Send a test payment.' }
];

export default function MPesaStepper() {
  return (
    <div className="relative pl-6 md:pl-8 space-y-8 py-8">
      {/* Vertical line */}
      <div className="absolute left-[11px] md:left-[15px] top-8 bottom-8 w-0.5 bg-mulembe-green/20"></div>

      {STEPS.map((step, idx) => (
        <StepperItem key={idx} step={step} index={idx} />
      ))}
      
      <Reveal delay={600}>
        <div className="mt-8 ml-2">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mulembe-green/10 border border-mulembe-green/30 text-mulembe-green font-mono text-xs uppercase tracking-widest animate-tada" style={{ animationDelay: '1s' }}>
            <span className="w-2 h-2 rounded-full bg-mulembe-green animate-pulse"></span>
            Till is FREE for customers
          </span>
          <p className="text-xs text-static-grey mt-3 max-w-sm">
            The merchant pays a small settlement fee (~0.5–1%). Use unique Till/Paybill account numbers per event for attribution.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

const StepperItem: React.FC<{ step: any, index: number }> = ({ step, index }) => {
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
    <div ref={ref} className="relative">
      <div 
        className={`absolute -left-[30px] md:-left-[35px] w-6 h-6 rounded-full bg-broadcast-night border-2 z-10 flex items-center justify-center transition-all duration-500 ${isVisible ? 'border-mulembe-green' : 'border-static-grey/30'}`}
      >
        {isVisible && (
          <svg className="w-3 h-3 text-mulembe-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" className="animate-draw-check" />
          </svg>
        )}
      </div>
      <div 
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <h5 className="text-maize-cream font-medium text-sm md:text-base">{index + 1}. {step.title}</h5>
        <p className="text-static-grey text-xs md:text-sm mt-1">{step.desc}</p>
      </div>
    </div>
  );
}
