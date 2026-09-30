import React, { useEffect, useState } from 'react';
import { useInView } from './useInView';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
}

export function AnimatedNumber({ value, duration = 900, decimals = 0 }: AnimatedNumberProps) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentValue(value);
      return;
    }

    let startTime: number;
    const startValue = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      // ease-out
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      
      setCurrentValue(startValue + (value - startValue) * easeOut);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  const formattedValue = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(currentValue);

  return <span ref={ref} className="font-mono">{formattedValue}</span>;
}
