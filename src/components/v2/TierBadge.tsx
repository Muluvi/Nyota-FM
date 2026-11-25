import React, { useId } from 'react';
import { Database, Calculator, HelpCircle, ExternalLink, X } from 'lucide-react';
import { factById } from '../../data/facts';
import { sourceById } from '../../data/sources';
import { displayValue } from '../../data/format';

export interface TierBadgeProps {
  /** Preferred: look up tier, source, method and dates from src/data/facts.ts. */
  factId?: string;
  /** Legacy props, used while components migrate to factId. */
  tier?: 1 | 2 | 0;
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

const STYLE = {
  1: { label: 'Tier 1 · Published source', cls: 'border-moss/60 bg-moss/15 text-moss', icon: Database },
  2: { label: 'Tier 2 · Modelled', cls: 'border-brass/60 bg-brass/15 text-brass', icon: Calculator },
  0: { label: 'Tier 0 · Data gap', cls: 'border-brick/70 bg-brick/15 text-brick-text', icon: HelpCircle },
} as const;

/**
 * Evidence badge. Opens a native popover (Esc and click-outside close it) with the
 * source, deep link and access date (Tier 1), method and inputs (Tier 2), or the
 * research needed (Tier 0).
 */
export function TierBadge(props: TierBadgeProps) {
  const popoverId = useId();
  const fact = props.factId ? factById(props.factId) : undefined;
  const source = fact?.sourceId ? sourceById(fact.sourceId) : undefined;

  const tier = (fact?.tier ?? props.tier ?? 0) as 0 | 1 | 2;
  const citation = source ? `${source.publisher}: ${source.title}` : props.citation;
  const rawUrl = source?.url ?? props.url;
  const url = rawUrl ? (rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`) : undefined;
  const isDeep = source ? source.deep : Boolean(url && new URL(url).pathname.length > 1);
  const accessed = source?.accessed ?? props.accessDate;
  const method = fact?.method ?? props.method ?? props.gapMethod;
  const inputs = fact?.inputs ?? props.inputs;

  const s = STYLE[tier];
  const Icon = s.icon;

  return (
    <span className={`${props.inline ? 'inline-flex' : 'flex'} align-middle my-0.5`}>
      <button
        type="button"
        popoverTarget={popoverId}
        className={`inline-flex min-h-6 items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide transition-colors hover:brightness-110 ${s.cls}`}
        aria-label={`${s.label}: show evidence details`}
      >
        <Icon size={11} className="shrink-0" aria-hidden="true" />
        <span>{s.label}</span>
      </button>

      <span
        id={popoverId}
        popover="auto"
        className="m-auto w-[min(92vw,26rem)] rounded-lg border border-hairline bg-ink-2 p-4 text-left font-body text-sm text-paper shadow-2xl backdrop:bg-ink/60"
      >
        <span className="mb-2 flex items-start justify-between gap-3">
          <span className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px] font-semibold ${s.cls}`}>
            <Icon size={11} aria-hidden="true" /> {s.label}
          </span>
          <button
            type="button"
            popoverTarget={popoverId}
            popoverTargetAction="hide"
            className="grid h-8 w-8 place-items-center rounded text-sage hover:text-paper"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </span>

        {fact && (
          <span className="block mb-2">
            <span className="text-sage">{fact.label}: </span>
            <strong>{displayValue(fact.value)}</strong>
            {fact.period && <span className="text-sage-dim"> ({fact.period})</span>}
          </span>
        )}

        {tier === 1 && (
          <span className="block space-y-1">
            <span className="block text-paper/90">{citation ?? 'Source not recorded'}</span>
            {url && (
              <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 break-all text-brass hover:underline">
                {isDeep ? 'Open the source document' : `${new URL(url).hostname} (home page only; deep link needed)`}
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            )}
            <span className="block font-mono text-xs text-sage-dim">Accessed: {accessed ?? 'not recorded'}</span>
            {fact?.note && <span className="block text-xs text-sage">{fact.note}</span>}
          </span>
        )}

        {tier === 2 && (
          <span className="block space-y-1 text-paper/90">
            {props.citation && !fact && <span className="block">{props.citation}</span>}
            {method && <span className="block"><span className="text-sage">Method: </span>{method}</span>}
            {inputs && <span className="block"><span className="text-sage">Inputs: </span>{inputs}</span>}
            {!method && !inputs && !props.citation && <span className="block text-sage">Method not yet documented.</span>}
          </span>
        )}

        {tier === 0 && (
          <span className="block space-y-1 text-paper/90">
            <span className="block text-sage">This figure is not yet known. It needs primary research or station records.</span>
            {method && <span className="block"><span className="text-sage">How to close the gap: </span>{method}</span>}
            {props.indicativeCost && <span className="block"><span className="text-sage">Indicative budget: </span>{props.indicativeCost}</span>}
            {props.timeline && <span className="block"><span className="text-sage">Timeline: </span>{props.timeline}</span>}
          </span>
        )}
      </span>
    </span>
  );
}
