import React from 'react';
import { useInView } from './useInView';

export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  
  return (
    <div 
      ref={ref}
      className={`${inView ? 'animate-section-entrance' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
