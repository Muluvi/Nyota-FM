import React, { useMemo, useState } from 'react';
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ChevronDown,
  ExternalLink,
  Facebook,
  Instagram,
  Link2,
  Play,
  Sparkles,
  Tag,
  Video,
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';

import { touchpointGroups, groupTotal, touchpointCount, type TouchpointGroup as DataGroup } from '../../data/rateCard';

type TouchpointGroup = DataGroup & {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
};

const UI: Record<string, Pick<TouchpointGroup, 'icon' | 'accent'>> = {
  youtube: { icon: Play, accent: 'text-brick-text' },
  instagram: { icon: Instagram, accent: 'text-brass' },
  tiktok: { icon: Video, accent: 'text-sage' },
  multi: { icon: BriefcaseBusiness, accent: 'text-brass' },
};

/** The single rate card from src/data/rateCard.ts, with display icons. */
const TOUCHPOINT_GROUPS: TouchpointGroup[] = touchpointGroups.map((g) => ({ ...g, ...UI[g.id] }));

const money = (value: number) => `KSh ${value.toLocaleString('en-KE')}`;

const TOUCHPOINT_COUNT = touchpointCount;

export function TouchpointEcosystem() {
  const [selectedId, setSelectedId] = useState('youtube');
  const selected = useMemo(
    () => TOUCHPOINT_GROUPS.find((group) => group.id === selectedId) ?? TOUCHPOINT_GROUPS[0],
    [selectedId],
  );
  const total = TOUCHPOINT_GROUPS.reduce((sum, group) => sum + groupTotal(group), 0);

  return (
    <section id="touchpoint-ecosystem" className="mobile-section-deferred scroll-mt-24 border-y border-hairline/70 py-10 sm:py-14">
      <Reveal>
        <div className="mb-6 max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-brass">
            <Sparkles size={14} />
            Commercial inventory · Digital expansion
          </div>
          <h2 className="font-display text-[clamp(1.9rem,8vw,2.5rem)] font-semibold tracking-tight text-paper sm:text-4xl">
            The Touchpoint Ecosystem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sage sm:text-base">
            Nyota FM can monetise the same trusted content beyond the transmitter. Companies and other corporations can buy precise, measurable access to audiences across social media, streaming platforms and premium digital formats—not only traditional radio airtime.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          <div className="rounded border border-brass/40 bg-ink-2 p-4 sm:col-span-2">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-sage-dim">
              <BadgeDollarSign size={14} className="text-brass" />
              Total rate-card inventory
            </div>
            <div className="mt-2 font-mono text-2xl font-semibold text-brass">{money(total)}</div>
            <div className="mt-1 text-xs text-sage">{TOUCHPOINT_COUNT} commercial touchpoints across the ecosystem</div>
          </div>
          <div className="rounded border border-hairline bg-ink-2 p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">Highest-value channel</div>
            <div className="mt-2 font-display text-lg text-paper">YouTube</div>
            <div className="mt-1 font-mono text-xs text-brass">{money(Math.max(...TOUCHPOINT_GROUPS.map(groupTotal)))}</div>
          </div>
          <div className="rounded border border-hairline bg-ink-2 p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">Premium formats</div>
            <div className="mt-2 font-display text-lg text-paper">Exclusive</div>
            <div className="mt-1 font-mono text-xs text-brass">{money(TOUCHPOINT_GROUPS.flatMap((g) => g.touchpoints).filter((t) => t.name.startsWith('Exclusive')).reduce((n, t) => n + t.price, 0))}</div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded border border-hairline bg-ink-2 p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 border-b border-hairline px-2 pb-3 text-[10px] font-mono uppercase tracking-wider text-sage-dim">
              <Tag size={14} className="text-brass" />
              Choose a commercial channel
            </div>
            <div className="flex flex-col gap-2">
              {TOUCHPOINT_GROUPS.map((group) => {
                const Icon = group.icon;
                const active = group.id === selected.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setSelectedId(group.id)}
                    className={`flex items-center justify-between rounded border p-3 text-left transition-colors ${active ? 'border-brass/60 bg-ink text-paper' : 'border-transparent text-sage hover:border-hairline hover:bg-ink'}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={17} className={active ? group.accent : 'text-sage-dim'} />
                      <span>
                        <span className="block text-sm font-medium">{group.platform}</span>
                        <span className="mt-0.5 block text-[11px] text-sage-dim">{group.touchpoints.length} touchpoints</span>
                      </span>
                    </span>
                    <span className="font-mono text-xs text-brass">{money(groupTotal(group))}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 border-t border-hairline pt-4 text-xs leading-relaxed text-sage">
              <Link2 size={14} className="mb-2 text-brass" />
              Bundle placements around one campaign objective: awareness, product trial, conversion or community participation.
            </div>
          </div>

          <div className="rounded border border-brass/40 bg-ink-2 p-4 sm:p-5">
            <div className="flex flex-col gap-3 border-b border-hairline pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-brass">Selected inventory</div>
                <h3 className="mt-1 font-display text-xl text-paper">{selected.platform}</h3>
                <p className="mt-1 text-xs text-sage">{selected.subtitle}</p>
              </div>
              <div className="rounded bg-brass/10 px-3 py-2 text-right">
                <div className="text-[9px] font-mono uppercase tracking-wider text-sage-dim">Channel total</div>
                <div className="font-mono text-sm font-semibold text-brass">{money(groupTotal(selected))}</div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {selected.touchpoints.map((touchpoint) => (
                <div key={touchpoint.name} className="flex items-center justify-between gap-3 rounded border border-hairline bg-ink p-3">
                  <span className="text-xs leading-snug text-paper">{touchpoint.name}</span>
                  <span className="shrink-0 font-mono text-xs text-brass">{money(touchpoint.price)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3 text-xs">
              <span className="text-sage">Advertiser entry points from single placements to full-funnel bundles</span>
              <ExternalLink size={14} className="shrink-0 text-brass" />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-5 rounded border border-hairline bg-ink-2 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-paper">How the inventory works</h3>
              <p className="mt-1 text-xs leading-relaxed text-sage">One interview, show or market activation can be repackaged into multiple paid brand moments without diluting the editorial core.</p>
            </div>
            <ChevronDown size={18} className="shrink-0 text-brass" />
          </div>
          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
            {[
              ['01', 'Capture', 'Record the live show, interview or event once.'],
              ['02', 'Atomise', 'Create a full video, short clips, stories, posts and links.'],
              ['03', 'Sell', 'Package the right touchpoints against the advertiser\'s objective.'],
            ].map(([number, title, copy]) => (
              <div key={number} className="border-l border-brass/50 pl-3">
                <div className="font-mono text-brass">{number} · {title}</div>
                <p className="mt-1 leading-relaxed text-sage">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default TouchpointEcosystem;
