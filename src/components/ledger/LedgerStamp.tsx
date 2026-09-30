import React from 'react';
import { useInView } from './useInView';

export function LedgerStamp({ chapter }: { chapter: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div 
      ref={ref}
      className={`flex items-center justify-center w-9 h-9 rounded-full border-[1.5px] border-brass font-mono text-brass text-sm ${inView ? 'animate-stamp' : 'opacity-0'}`}
      style={{ flexShrink: 0 }}
    >
      {chapter}
    </div>
  );
}
