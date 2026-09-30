import { useEffect, useRef, useState } from 'react';

export default function CircularProgress({ progress = 100, delay = 0 }: { progress?: number, delay?: number }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsAnimating(true), delay);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isAnimating ? circumference - (progress / 100) * circumference : circumference;

  return (
    <div ref={ref} className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 64 64">
        <circle 
          cx="32" cy="32" r={radius} 
          className="stroke-maize-cream/10" 
          strokeWidth="4" fill="none" 
        />
        <circle 
          cx="32" cy="32" r={radius} 
          className="stroke-signal-amber transition-all duration-[1500ms] ease-out" 
          strokeWidth="4" fill="none" 
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-signal-amber">
        1YR
      </div>
    </div>
  );
}
