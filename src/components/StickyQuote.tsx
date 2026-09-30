import React from 'react';
import Reveal from './Reveal';

export default function StickyQuote() {
  return (
    <div className="relative h-[150vh] md:h-[200vh]">
      <div className="sticky top-[30vh] md:top-[40vh] flex justify-center items-center px-4 md:px-0">
        <Reveal>
          <div className="max-w-3xl text-center">
            <div className="font-display text-[80px] md:text-[120px] leading-none text-maize-cream uppercase tracking-tight opacity-10 absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 pointer-events-none w-full">
              " "
            </div>
            <p className="font-display text-[24px] md:text-[40px] leading-[1.2] uppercase text-maize-cream relative z-10">
              The moat competitors are digging is <span className="text-signal-amber">trust and recall</span>.<br/>
              The longer you wait, the <span className="text-mulembe-green">deeper it gets</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
