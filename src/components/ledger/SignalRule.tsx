import React from 'react';
import { useInView } from './useInView';

export function SignalRule() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="w-full h-[1px] mt-4 mb-8">
      <div className={`h-full bg-brass ${inView ? 'animate-draw-rule' : 'w-0'}`} />
    </div>
  );
}
