import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MinimalNarrativeProps {
  onShowFull: () => void;
  onNavigate: (id: string) => void;
}

export function MinimalNarrative({ onShowFull, onNavigate }: MinimalNarrativeProps) {
  return (
    <div className="space-y-32 py-16">
      {/* 1. Signal */}
      <section className="max-w-3xl">
        <p className="text-sm tracking-[0.2em] uppercase text-sage-dim mb-6">107.3 FM · Western Kenya</p>
        <h1 className="font-display text-6xl sm:text-7xl leading-none text-paper mb-8">
          The Voice of Western Kenya, Amplified.
        </h1>
        <p className="text-xl text-sage leading-relaxed max-w-2xl">
          A data-backed path to scale Nyota FM’s broadcast reach, digital engagement, and commercial sustainability across Western Kenya from 2026 through 2028.
        </p>
      </section>

      {/* 2. Current Signal */}
      <section className="max-w-3xl border-t border-hairline pt-16">
        <h2 className="font-display text-4xl mb-10">Current Signal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <div className="text-5xl font-display text-paper">1.8M</div>
            <p className="mt-3 text-sage">Weekly reach</p>
          </div>
          <div>
            <div className="text-5xl font-display text-paper">32%</div>
            <p className="mt-3 text-sage">Digital share</p>
          </div>
          <div>
            <div className="text-5xl font-display text-paper">4.6×</div>
            <p className="mt-3 text-sage">Commercial yield</p>
          </div>
        </div>
      </section>

      {/* 3. Reality */}
      <section className="max-w-3xl border-t border-hairline pt-16">
        <h2 className="font-display text-4xl mb-6">Market Reality</h2>
        <p className="text-lg text-sage leading-relaxed">
          Radio advertising contracted. Betting spend collapsed. Mobile penetration is high. The five original objectives remain the North Star, but targets are now sequenced against verified 2025/26 data.
        </p>
        <button
          onClick={() => onNavigate('part-1')}
          className="mt-8 text-sm tracking-wider uppercase text-brass hover:text-paper transition-colors"
        >
          View the five objectives →
        </button>
      </section>

      {/* 4. Model */}
      <section className="max-w-3xl border-t border-hairline pt-16">
        <h2 className="font-display text-4xl mb-6">The Model</h2>
        <p className="text-lg text-sage leading-relaxed mb-8">
          An 8-quarter payback simulation with transparent assumptions. Break-even is visible; every revenue stream is costed.
        </p>
        <button
          onClick={() => onNavigate('part-3')}
          className="inline-flex items-center gap-2 rounded-full border border-brass px-6 py-3 text-sm tracking-wider uppercase text-brass hover:bg-brass hover:text-ink transition-colors"
        >
          Open the model <ArrowRight size={16} />
        </button>
      </section>

      {/* 5. Path */}
      <section className="max-w-3xl border-t border-hairline pt-16">
        <h2 className="font-display text-4xl mb-6">The Path</h2>
        <p className="text-lg text-sage leading-relaxed mb-10">
          Foundation in the first 90 days. Acceleration through month 6. Scale by month 12. Ownership and next actions stay visible at every step.
        </p>
        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="text-sage-dim w-16 shrink-0">0–90d</div>
            <div>Foundation — owner named, scorecard live, first commercial products live.</div>
          </div>
          <div className="flex gap-6">
            <div className="text-sage-dim w-16 shrink-0">3–6m</div>
            <div>Acceleration — digital share and non-spot revenue grow.</div>
          </div>
          <div className="flex gap-6">
            <div className="text-sage-dim w-16 shrink-0">6–12m</div>
            <div>Scale — market position and studio capability locked in.</div>
          </div>
        </div>
      </section>

      {/* 6. Ask */}
      <section className="max-w-3xl border-t border-hairline pt-16">
        <h2 className="font-display text-4xl mb-6">The Six Asks</h2>
        <p className="text-lg text-sage leading-relaxed mb-10">
          Six decisions the board can approve now. Each has an owner, a measure, and a date.
        </p>
        <button
          onClick={() => onNavigate('part-asks')}
          className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm tracking-wider uppercase text-ink font-medium hover:brightness-110 transition-all"
        >
          Review the asks <ArrowRight size={16} />
        </button>
      </section>

      {/* Deep Dive */}
      <section className="max-w-3xl border-t border-hairline pt-16 pb-32">
        <p className="text-sage mb-6">
          The full data room, 21 action plans, studio Capex schedule, gap audit, talent roster, and source registry are available in the complete proposal.
        </p>
        <button
          onClick={onShowFull}
          className="text-sm tracking-wider uppercase text-sage hover:text-paper transition-colors"
        >
          Open the full proposal →
        </button>
      </section>
    </div>
  );
}
