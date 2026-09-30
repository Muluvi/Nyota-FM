import React from 'react';
import Reveal from './Reveal';

export default function ShakeCallout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <Reveal>
      <div className="glass-panel border-signal-amber/40 bg-signal-amber/5 p-6 animate-shake-once">
        <h4 className="text-signal-amber font-mono text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          {title}
        </h4>
        <div className="text-static-grey text-sm md:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </Reveal>
  );
}
