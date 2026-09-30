import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ 
  value, 
  duration = 1200,
  delay = 0,
  decimals = 0
}: { 
  value: number; 
  duration?: number;
  delay?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Check reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (hasRun) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setHasRun(true), delay);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [delay, hasRun]);

  useEffect(() => {
    if (!hasRun) return;
    if (value === 0) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }
    
    let startTimestamp: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(easeProgress * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasRun, value, duration, prefersReducedMotion]);

  return (
    <span ref={elementRef} className="font-mono">
      {Number(count.toFixed(decimals)).toLocaleString('en-US', { minimumFractionDigits: decimals })}
    </span>
  );
}
