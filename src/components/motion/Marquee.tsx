import React from 'react';

/** Ticker that loops, pauses on hover/focus and off-screen, and skews with scroll velocity. */
export function Marquee({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="fx-marquee" data-io="repeat" role="region" aria-label={label}>
      <div className="fx-marquee-track">
        <div className="flex shrink-0 gap-12">{children}</div>
        <div className="flex shrink-0 gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
