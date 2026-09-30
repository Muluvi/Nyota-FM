import React from 'react';
import { LedgerStamp } from './LedgerStamp';
import { SignalRule } from './SignalRule';
import { Reveal } from './Reveal';

interface ChapterSectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}

export function ChapterSection({ id, number, title, children }: ChapterSectionProps) {
  return (
    <section id={id} className="pt-20 sm:pt-28 pb-16 border-b border-hairline last:border-0 scroll-mt-20 sm:scroll-mt-24">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-brass/50 bg-brass/10 font-mono text-base sm:text-lg font-bold text-brass shadow-sm">
              {number}
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-brass font-bold block">
                PART {number} · STRATEGIC MODULE
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-paper font-semibold m-0 leading-tight">
                {title}
              </h2>
            </div>
          </div>
        </div>
        <SignalRule />
      </Reveal>
      <div className="mt-8">
        {children}
      </div>
    </section>
  );
}
