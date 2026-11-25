import React, { lazy } from 'react';
import { Deferred } from '../components/Deferred';

const ListenerTools = lazy(() => import('./ListenerTools'));
const AdvertiserTools = lazy(() => import('./AdvertiserTools'));
const OperationsTools = lazy(() => import('./OperationsTools'));
const EvidenceTools = lazy(() => import('./EvidenceTools'));

export const PREVIEW_GROUPS = [
  { id: 'preview-listener', title: 'Listener experience', blurb: 'Live player, schedule, lexicon, emergency alerts, USSD/WhatsApp, diaspora, loyalty and podcasts.', Body: ListenerTools },
  { id: 'preview-advertiser', title: 'Advertiser experience', blurb: 'Media plan and quote, county campaign sample plan and political-advertising policy.', Body: AdvertiserTools },
  { id: 'preview-operations', title: 'Operations', blurb: 'Studio plan, visual-radio switcher, power, outside broadcasts, asset register, editorial handbook and brand.', Body: OperationsTools },
  { id: 'preview-evidence', title: 'Market evidence explorers', blurb: 'County coverage and economy, transmitter illustration, commodity prices and music royalties.', Body: EvidenceTools },
] as const;

/**
 * Appendix B. Prototypes of the future public station website (Product B), kept apart
 * from the board case and loaded only when scrolled near.
 */
export function ProductPreview() {
  return (
    <div className="space-y-10">
      <p className="max-w-3xl rounded border border-brass/40 bg-brass/10 p-4 text-sm text-paper">
        These are prototypes of the future public station website. Content is illustrative unless marked Tier 1. Nothing on
        these pages collects or stores personal data; any form opens your own email or WhatsApp.
      </p>
      {PREVIEW_GROUPS.map(({ id, title, blurb, Body }) => (
        <section key={id} id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 space-y-4">
          <header>
            <h3 id={`${id}-h`} className="font-display text-2xl text-paper">
              {title}
            </h3>
            <p className="text-sm text-sage">{blurb}</p>
            <p className="text-xs text-sage-dim">Prototype · content is illustrative unless marked Tier 1.</p>
          </header>
          <Deferred label={title} minHeight={480}>
            <Body />
          </Deferred>
        </section>
      ))}
    </div>
  );
}

/** "See it working →" link from a chapter to its preview group. */
export function SeeItWorking({ group, children }: { group: (typeof PREVIEW_GROUPS)[number]['id']; children?: React.ReactNode }) {
  return (
    <a href={`#${group}`} className="inline-flex items-center gap-1 text-sm font-mono text-brass underline underline-offset-4 hover:text-paper">
      {children ?? 'See it working'} →
    </a>
  );
}
