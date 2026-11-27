import React, { useState } from 'react';
import { Target, TrendingUp, Users, Award, Radio, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { objectiveData } from '../../content/data/objectives';
import { ToolkitInline } from '../toolkit/ToolkitInline';



export function Part1Objectives() {
  const [expandedObj, setExpandedObj] = useState<string | null>('A');

  const objectiveIcons: Record<string, React.ReactNode> = {
    A: <TrendingUp className="text-brass" size={20} />,
    B: <Target className="text-brass" size={20} />,
    C: <Radio className="text-brass" size={20} />,
    D: <Users className="text-brass" size={20} />,
    E: <Award className="text-brass" size={20} />,
  };
  const objectives = objectiveData.map((o) => ({ ...o, icon: objectiveIcons[o.id] }));

  return (
    <div className="space-y-6">
      {/* Introduction note */}
      <Reveal>
        <div className="p-4 bg-ink-2 rounded border border-hairline">
          <p className="text-xs sm:text-sm text-sage leading-relaxed">
            <strong className="text-paper">Section 1.1 — The Scorecard:</strong> v1.0 established five foundational objectives (A–E) that remain the North Star for the Twang'aa Transformation. Below, each objective is subjected to an empirical reality check against verified 2025/2026 Kenyan broadcast data, establishing bankable v2.0 targets with transparent derivations.
          </p>
        </div>
      </Reveal>

      {/* Objectives Accordion / List */}
      <div className="space-y-4">
        {objectives.map((obj) => {
          const isExpanded = expandedObj === obj.id;
          return (
            <div key={obj.id}>
              <Reveal>
                <div className="bg-ink-2 border border-hairline rounded overflow-hidden transition-all duration-200">
                {/* Header Row */}
                <div
                  onClick={() => setExpandedObj(isExpanded ? null : obj.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between cursor-pointer hover:bg-ink transition-colors gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-brass/50 bg-brass/10 flex items-center justify-center font-mono text-sm font-bold text-brass shrink-0">
                      {obj.letter}
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-sage-dim">
                        Objective {obj.letter}
                      </div>
                      <h3 className="font-display text-base sm:text-lg text-paper font-medium">
                        {obj.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block text-right">
                      <div className="font-mono text-xs text-paper font-semibold">{obj.keyStat.value}</div>
                      <div className="text-xs font-mono text-brass">{obj.keyStat.badgeText}</div>
                    </div>
                    <button type="button" aria-expanded={isExpanded} aria-label={`${isExpanded ? 'Collapse' : 'Expand'} objective ${obj.letter}: ${obj.title}`} className="text-sage hover:text-paper p-1">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 pt-1 border-t border-hairline space-y-4">
                    {/* v1.0 vs v2.0 Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded bg-ink/60 border border-hairline/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono text-sage-dim uppercase tracking-wider">
                            v1.0 Original Target
                          </span>
                          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-hairline text-sage">
                            May 2026
                          </span>
                        </div>
                        <p className="text-xs text-sage leading-relaxed font-body">
                          {obj.v1Target}
                        </p>
                      </div>

                      <div className="p-3.5 rounded bg-brass/10 border border-brass/40">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono text-brass uppercase tracking-wider font-semibold">
                            v2.0 Revised Target
                          </span>
                          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-brass/20 text-amber-300 font-semibold">
                            Board Approved
                          </span>
                        </div>
                        <p className="text-xs text-paper font-medium leading-relaxed font-body">
                          {obj.v2Target}
                        </p>
                      </div>
                    </div>

                    {/* Reality Check Analysis */}
                    <div className="p-4 rounded bg-ink border border-hairline space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                        <AlertTriangle size={13} />
                        <span>The Reality Check & Empirical Critique</span>
                      </div>
                      <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                        {obj.realityCheck}
                      </p>
                    </div>

                    {/* Derivation & Tier Badge */}
                    <div className="p-3 bg-ink-2 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-xs font-mono text-sage">
                        <span className="text-sage-dim block sm:inline mr-1">Derivation:</span>
                        <span className="text-paper/90">{obj.derivation}</span>
                      </div>
                      <div className="shrink-0">
                        <TierBadge
                          tier={obj.tier}
                          citation={obj.tierCitation}
                          url={obj.tierUrl}
                          method={obj.tierMethod}
                          inputs={obj.tierInputs}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        );
      })}
      </div>

      <ToolkitInline ids={['schedule', 'lexicon', 'presenters', 'emergency']} />
    </div>
  );
}
