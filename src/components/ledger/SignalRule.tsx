import React from 'react';

/** Brass rule that draws in as it scrolls into view (CSS only; static under reduced motion). */
export function SignalRule() {
  return (
    <div className="w-full h-[1px] mt-4 mb-8" aria-hidden="true">
      <div className="signal-rule h-full bg-brass" />
    </div>
  );
}
