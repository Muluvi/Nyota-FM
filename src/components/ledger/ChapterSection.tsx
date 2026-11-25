import React from 'react';
import { SignalRule } from './SignalRule';
import { Reveal } from './Reveal';
import { Scramble, SplitText } from '../motion/Text';

interface ChapterSectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}

/**
 * Chapter shell. The heading choreographs on entry: the number tile pops and fills, the
 * eyebrow decodes, the title rises word by word, and the brass rule draws across.
 */
export function ChapterSection({ id, number, title, children }: ChapterSectionProps) {
  const eyebrow = /^[A-Z]$/.test(number) ? `APPENDIX ${number}` : `CHAPTER ${number}`;
  return (
    <section id={id} data-chapter className="pt-20 sm:pt-28 pb-16 border-b border-hairline last:border-0 scroll-mt-20 sm:scroll-mt-24">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3.5">
            <div
              data-reveal="pop"
              className="fx-glow flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-brass/50 bg-brass/10 font-mono text-base sm:text-lg font-bold text-brass shadow-sm"
            >
              <span className="fx-outline-fill" data-io="">
                {number}
              </span>
            </div>
            <div>
              <Scramble text={eyebrow} className="font-mono text-xs uppercase tracking-widest text-brass font-bold block" />
              <SplitText as="h2" text={title} className="font-display text-2xl sm:text-4xl text-paper font-semibold m-0 leading-tight" />
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
