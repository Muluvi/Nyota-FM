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
    <section id={id} className="pt-24 pb-12 border-b border-hairline last:border-0">
      <Reveal>
        <div className="flex items-center gap-4 mb-4">
          <LedgerStamp chapter={number} />
          <h2 className="font-display text-paper m-0 leading-tight">{title}</h2>
        </div>
        <SignalRule />
      </Reveal>
      <div className="mt-8">
        {children}
      </div>
    </section>
  );
}
