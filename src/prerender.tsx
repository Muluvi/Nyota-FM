import React from 'react';
import { renderToString } from 'react-dom/server';
import { DecisionSummary } from './components/v2/DecisionSummary';
import { sections } from './content/sections';

/**
 * Static first screen rendered at build time into dist/index.html (scripts/prerender.mjs),
 * so Opera Mini / data-saver readers and link scrapers get the decision without running
 * JavaScript. React replaces it on start-up.
 */
function StaticCover() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-20 pb-10 bg-ink text-paper font-body">
      <p className="text-eyebrow text-brass font-mono">Nyota FM 107.3 · Board proposal</p>
      <h1 className="font-display text-3xl sm:text-5xl text-paper my-3">The Voice of Western Kenya, Amplified.</h1>
      <p className="text-sage max-w-2xl mb-6">
        A 24-month plan, dated from board approval, to grow and diversify Nyota FM&apos;s revenue across five Western Kenya counties.
      </p>
      <DecisionSummary onNavigate={() => {}} />
      <nav aria-label="Chapters" className="mt-6">
        <ol className="grid gap-1 text-sm text-sage sm:grid-cols-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="underline">
                {s.number} · {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <noscript>
        <p className="mt-6 text-sm text-brass">JavaScript is off: this is the summary. Enable JavaScript for the full proposal and models.</p>
      </noscript>
    </div>
  );
}

export function render(): string {
  return renderToString(<StaticCover />);
}
