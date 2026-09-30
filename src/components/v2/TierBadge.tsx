import React, { useState } from 'react';
import { Database, Calculator, HelpCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export interface TierBadgeProps {
  tier: 1 | 2 | 0;
  citation?: string;
  url?: string;
  accessDate?: string;
  method?: string;
  inputs?: string;
  gapMethod?: string;
  indicativeCost?: string;
  timeline?: string;
  inline?: boolean;
}

export function TierBadge({
  tier,
  citation,
  url,
  accessDate = '2026-09-30',
  method,
  inputs,
  gapMethod,
  indicativeCost,
  timeline,
  inline = false
}: TierBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getTierDetails = () => {
    switch (tier) {
      case 1:
        return {
          label: 'TIER 1 · HARD DATA',
          bg: 'bg-moss/20 hover:bg-moss/30 border-moss/60 text-emerald-300',
          dot: 'bg-emerald-400',
          icon: <Database size={11} className="mr-1 shrink-0" />,
        };
      case 2:
        return {
          label: 'TIER 2 · MODELLED',
          bg: 'bg-brass/20 hover:bg-brass/30 border-brass/60 text-amber-300',
          dot: 'bg-amber-400',
          icon: <Calculator size={11} className="mr-1 shrink-0" />,
        };
      case 0:
      default:
        return {
          label: 'TIER 0 · DATA GAP',
          bg: 'bg-brick/25 hover:bg-brick/35 border-brick/70 text-rose-300',
          dot: 'bg-rose-400',
          icon: <HelpCircle size={11} className="mr-1 shrink-0" />,
        };
    }
  };

  const details = getTierDetails();
  const hasMeta = citation || method || gapMethod || indicativeCost || timeline;

  return (
    <span className={`${inline ? 'inline-flex' : 'flex'} flex-col gap-1 align-middle my-0.5`}>
      <button
        type="button"
        onClick={() => hasMeta && setIsOpen(!isOpen)}
        className={`inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded border transition-all duration-150 ${details.bg} ${hasMeta ? 'cursor-pointer' : 'cursor-default'}`}
        title={hasMeta ? 'Click to inspect methodology & data citation' : undefined}
      >
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${details.dot} animate-pulse`} />
        {details.icon}
        <span className="font-semibold tracking-wider">{details.label}</span>
        {hasMeta && (
          <span className="ml-1 text-sage-dim hover:text-paper">
            {isOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </span>
        )}
      </button>

      {isOpen && hasMeta && (
        <span className="block p-2 text-xs font-mono rounded bg-ink-2 border border-hairline text-paper/90 shadow-lg text-left mt-1 z-20 max-w-sm">
          {tier === 1 && (
            <span className="space-y-1 block">
              <span className="text-sage text-[10px] block uppercase tracking-wider font-semibold">Verified Source Citation</span>
              <span className="block text-paper font-medium">{citation}</span>
              {url && (
                <a
                  href={`https://${url.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-brass hover:underline text-[11px] mt-0.5"
                >
                  <span>{url}</span>
                  <ExternalLink size={10} className="ml-1" />
                </a>
              )}
              {accessDate && <span className="block text-sage-dim text-[10px]">Accessed: {accessDate}</span>}
            </span>
          )}

          {tier === 2 && (
            <span className="space-y-1 block">
              <span className="text-amber-400 text-[10px] block uppercase tracking-wider font-semibold">Modelled Derivation</span>
              {method && <span className="block text-paper/90"><span className="text-sage-dim">Method: </span>{method}</span>}
              {inputs && <span className="block text-sage"><span className="text-sage-dim">Inputs: </span>{inputs}</span>}
            </span>
          )}

          {tier === 0 && (
            <span className="space-y-1 block">
              <span className="text-rose-400 text-[10px] block uppercase tracking-wider font-semibold">Identified Primary Research Gap</span>
              {gapMethod && <span className="block text-paper/90"><span className="text-sage-dim">Recommended Method: </span>{gapMethod}</span>}
              {indicativeCost && <span className="block text-brass"><span className="text-sage-dim">Indicative Budget: </span>{indicativeCost}</span>}
              {timeline && <span className="block text-sage"><span className="text-sage-dim">Timeline: </span>{timeline}</span>}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
