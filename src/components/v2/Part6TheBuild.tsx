import React, { useState } from 'react';
import { 
  Calendar, Wrench, Users, Shield, Clock, CheckCircle2, 
  DollarSign, FileText, ChevronRight, Layers, ArrowRight 
} from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { capex, phaseGates, phaseTotal, capexTotal, studioPhasesTotal, unquotedLines, PHASES, type Phase } from '../../data/capex';
import { onTabListKeyDown } from '../../lib/tabs';
import { formatKshRange, displayValue } from '../../data/format';

const PHASE_KEY = { p1: 'P1', p2: 'P2', p3: 'P3' } as const;

/** One capex table, rendered from the single capex register. */
function CapexPhaseTable({ phase }: { phase: Phase }) {
  const meta = PHASES.find((p) => p.id === phase)!;
  const lines = capex.filter((l) => l.phase === phase);
  const total = phaseTotal(phase);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-sage">
        <span>
          {meta.label} ({meta.months})
        </span>
      </div>
      <div tabIndex={0} className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <caption className="sr-only">
            {meta.label}: equipment, vendor, cost and evidence tier
          </caption>
          <thead>
            <tr className="border-b border-hairline text-sage-dim">
              <th scope="col" className="py-2 pr-3">Item</th>
              <th scope="col" className="py-2 px-3">Vendor / basis</th>
              <th scope="col" className="py-2 px-3">Cost</th>
              <th scope="col" className="py-2 pl-3">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-paper/90">
            {lines.map((l) => (
              <tr key={l.id}>
                <td className="py-2.5 pr-3 font-body">
                  {l.item}
                  {!l.inModel && <span className="ml-1 text-[11px] text-brick-text">(was missing from totals)</span>}
                </td>
                <td className="py-2.5 px-3 text-sage">{l.vendor}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{formatKshRange(l.cost)}</td>
                <td className="py-2.5 pl-3">Tier {l.tier}</td>
              </tr>
            ))}
            <tr className="font-bold border-t border-brass/40">
              <td className="py-2.5 pr-3 text-paper" colSpan={2}>
                Total (quoted lines)
              </td>
              <td className="py-2.5 px-3 text-brass whitespace-nowrap">{formatKshRange(total)}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Part6TheBuild() {
  const [activePhase, setActivePhase] = useState<'p1' | 'p2' | 'p3'>('p1');

  const roadmapQuarters = [
    {
      q: 'Q1 2027 (Months 1–3)',
      title: 'Foundation & Procurement',
      milestones: [
        'Brand build begins & visual identity refresh',
        'Studio Phase 1 procurement & acoustic installation begins',
        'Social media channel audit & handle rationalization',
        'WhatsApp BSP onboarding with Africa’s Talking',
        'GAA filing and county supplier prequalification submitted',
        'USSD code application filed via Africa’s Talking',
        'Political rate card (station policy) published before primaries (8 May 2027)'
      ]
    },
    {
      q: 'Q2 2027 (Months 4–6)',
      title: 'Live Visual Launch & Shows 1–2',
      milestones: [
        'Brand book officially launched across station',
        'Studio Phase 1 complete & signed off',
        'Live video streaming on air (2×/week YouTube/FB)',
        'First two pre-recorded shows broadcast (Asubuhi ya Imani, Hapa Tulipo Mix)',
        'YouTube channel relaunch & initial SEO push',
        'Podcast distribution live on Spotify & Apple',
        'Election campaign window opens 29 May 2027: political bookings under station policy'
      ]
    },
    {
      q: 'Q3 2027 (Months 7–9)',
      title: 'Mobile Scale & Field Roadshow',
      milestones: [
        'Studio Phase 2 multi-cam build begins',
        'Dedicated USSD shortcode live with Safaricom & AT', // data-ok: market fact, not a sponsor
        'Nyota FM mobile application v1.0 internal beta',
        'Hapa Tulipo Outside Broadcast circuit launches',
        'Shows 3 & 4 broadcast (Sauti ya Nchi, Wanawake wa Twang’aa)',
        '12-SKU merchandise catalogue launched',
        'Election campaign closes 7 Aug; election day 10 Aug 2027'
      ]
    },
    {
      q: 'Q4 2027 (Months 10–12)',
      title: 'Commercial Automation & Loyalty',
      milestones: [
        'Studio Phase 2 complete & control room operational',
        'Nyota Mobile App v1.0 public release on Google Play',
        'First marquee tentpole OB festival activation',
        'Self-serve advertiser portal live on nyotafm.com',
        'Twang’aa Club listener loyalty programme rollout'
      ]
    },
    {
      q: 'Q1 2028 (Months 13–15)',
      title: 'Hub Expansion & Civic Prequalification',
      milestones: [
        'Studio Phase 3 secondary studio construction begins',
        'County communications contracts renewed with the new county administrations'
      ]
    },
    {
      q: 'Q2 2028 (Months 16–18)',
      title: 'Syndication & Diaspora Bridge',
      milestones: [
        'Nyota App v1.1 update with livestream chat',
        'First cross-border regional syndication contract signed',
        'Diaspora Sunday programme block & remittance partnerships live'
      ]
    },
    {
      q: 'Q3 2028 (Months 19–21)',
      title: 'Asset Completion & Election Cycle',
      milestones: [
        'Studio Phase 3 complete (DAM & AI auto-clipping running)',
        'Second regional syndication affiliate onboarded'
      ]
    },
    {
      q: 'Q4 2028 (Months 22–24)',
      title: 'Leadership Assertion & Year 3 Scale',
      milestones: [
        'Market-leadership assertion across Western Kenya',
        'Independent GeoPoll audience measurement validation audit',
        'Presentation of the Year 3 strategic horizon to Ownership'
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* 6.1 Master Timeline */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-hairline pb-3">
            <span className="text-xs font-mono text-brass uppercase tracking-widest font-semibold block">
              SECTION 6.1
            </span>
            <h4 className="font-display text-paper text-base font-semibold">Master 24-Month Roadmap (Months 1–24: Q1 2027 – Q4 2028)</h4>
            <p className="text-xs text-sage mt-0.5">Quarter-by-quarter operational delivery schedule from day 1 to market leadership</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {roadmapQuarters.map((rq, idx) => (
              <div key={idx} className="p-3.5 bg-ink rounded border border-hairline hover:border-brass/50 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-brass font-bold text-xs">{rq.q}</span>
                    <span className="text-xs text-sage-dim">M{idx * 3 + 1}–M{idx * 3 + 3}</span>
                  </div>
                  <div className="font-semibold text-paper text-[13px] mb-2">{rq.title}</div>
                  <ul className="space-y-1 text-sage text-[11px] font-body">
                    {rq.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-1.5">
                        <span className="text-brass text-xs">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 6.2 Consolidated Studio Capex Schedule */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-xs font-mono text-brass uppercase tracking-widest font-semibold block">
                SECTION 6.2
              </span>
              <h4 className="font-display text-paper text-base font-semibold">Studio Build — Consolidated Cost Schedule</h4>
              <p className="text-xs text-sage mt-0.5">One register for every equipment line; totals are computed</p>
            </div>
            <div role="tablist" aria-label="Capex phase" onKeyDown={onTabListKeyDown} className="flex items-center gap-1">
              {(['p1', 'p2', 'p3'] as const).map((ph) => (
                <button
                  key={ph}
                  onClick={() => setActivePhase(ph)}
                role="tab"
                aria-selected={activePhase === ph}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold uppercase ${
                    activePhase === ph ? 'bg-brass text-ink' : 'bg-ink text-sage hover:text-paper'
                  }`}
                >
                  {ph === 'p1' ? 'Phase 1' : ph === 'p2' ? 'Phase 2' : 'Phase 3'}
                </button>
              ))}
            </div>
          </div>

          <CapexPhaseTable phase={PHASE_KEY[activePhase]} />

          {/* Lines that were missing from the original envelope */}
          <div className="space-y-2">
            <h5 className="font-display text-sm text-paper font-semibold">Also needed, previously outside the phase totals</h5>
            <p className="text-xs text-sage">
              Power resilience and the outside-broadcast rig appeared in the tools but not in any phase, and two Phase 2 lines were
              listed elsewhere. They are added here so the board sees the full envelope.
            </p>
            <CapexPhaseTable phase="Power" />
            <CapexPhaseTable phase="OB" />
          </div>

          {/* Totals, computed from src/data/capex.ts */}
          <div className="p-4 bg-ink rounded border border-brass/50 grid gap-3 sm:grid-cols-2 text-xs font-mono">
            <div>
              <span className="text-sage block">Studio phases 1–3 (original schedule)</span>
              <span className="text-paper text-base font-bold">{formatKshRange(studioPhasesTotal())}</span>
            </div>
            <div>
              <span className="text-brass font-bold block">Full envelope incl. power, OB rig and missing lines</span>
              <span className="text-paper text-base font-bold">{formatKshRange(capexTotal())}</span>
              <span className="text-sage block text-[11px] mt-0.5">
                Plus {unquotedLines().length} unquoted line(s) (Tier 0): {unquotedLines().map((l) => l.item).join(', ')}
              </span>
            </div>
            <div className="sm:col-span-2 font-body">
              <span className="text-paper font-semibold text-xs block mb-1">Phase gates</span>
              <ul className="space-y-1 text-[11px] text-sage">
                {phaseGates.map((g) => (
                  <li key={g.phase}>
                    <strong className="text-paper">{PHASES.find((p) => p.id === g.phase)!.label}:</strong> {g.condition}.{' '}
                    <span className="text-brick-text">Threshold: {displayValue(g.threshold)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="sm:col-span-2 text-sage font-body text-[11px]">
              Phases 2 and 3 are released only when their gates are met (gates below). Prices are vendor listings from September
              2026 and need re-quoting with dates; imported equipment is exposed to the USD exchange rate.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 6.3 People & Capability & 6.4 Regulatory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 6.3 People */}
        <div className="bg-ink-2 border border-hairline rounded p-4 space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-hairline pb-2">
            <span className="text-paper font-bold text-sm">6.3 People & Salary Benchmarks</span>
            <TierBadge tier={1} citation="Payscale Kenya & Industry Survey 2026" url="payscale.com" />
          </div>

          <div className="space-y-1.5">
            <div className="text-brass text-[11px] font-bold uppercase">Role Evolution Map:</div>
            <div className="text-sage text-[11px] leading-snug">
              • Presenter → <strong className="text-paper">On-camera presenter</strong> (dual audience performance)<br />
              • Producer → <strong className="text-paper">Multi-platform producer</strong> (commissioning social clips)<br />
              • Engineer → <strong className="text-paper">IT/AV engineer</strong> (streaming, switchers & NDI routing)
            </div>
          </div>

          <div className="space-y-1 pt-1 border-t border-hairline">
            <div className="text-brass text-[11px] font-bold uppercase">New Hire Monthly Benchmarks:</div>
            <div className="divide-y divide-hairline">
              <div className="flex justify-between py-1"><span className="text-sage">Head of Digital</span><span className="text-paper font-semibold">KSh 120,000–200,000</span></div>
              <div className="flex justify-between py-1"><span className="text-sage">Video Producer</span><span className="text-paper font-semibold">KSh 60,000–100,000</span></div>
              <div className="flex justify-between py-1"><span className="text-sage">Social Media Manager</span><span className="text-paper font-semibold">KSh 60,000–100,000</span></div>
              <div className="flex justify-between py-1"><span className="text-sage">Community Manager</span><span className="text-paper font-semibold">KSh 50,000–80,000</span></div>
              <div className="flex justify-between py-1"><span className="text-sage">Data & Insights Lead</span><span className="text-paper font-semibold">KSh 80,000–150,000</span></div>
            </div>
          </div>

          <div className="p-2 bg-ink rounded border border-hairline text-sage text-[11px] font-body">
            <strong>Induction:</strong> 12-week intensive training led by Firefly covering camera posture, multi-platform SOPs, switcher operations, and community SLAs.
          </div>
        </div>

        {/* 6.4 Regulatory & 6.5 Governance */}
        <div className="bg-ink-2 border border-hairline rounded p-4 space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-hairline pb-2">
            <span className="text-paper font-bold text-sm">6.4 Statutory & Regulatory Schedule</span>
            <TierBadge tier={1} citation="CA Kenya, ODPC & GAA" url="gaa.go.ke" />
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">WhatsApp BSP Setup</strong>
                <span className="text-sage">Africa’s Talking onboarding</span>
              </div>
              <span className="text-brass font-bold">$85 + $50/mo (Months 1–3)</span>
            </div>

            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">USSD Shortcode Allocation</strong>
                <span className="text-sage">CA Kenya & Africa’s Talking</span>
              </div>
              <span className="text-brass font-bold">KSh 70K/mo (Safaricom, Months 1–9)</span>{/* data-ok: market fact, not a sponsor */}
            </div>

            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">GAA Accreditation</strong>
                <span className="text-sage">National Register prequalification</span>
              </div>
              <span className="text-brass font-bold">KSh 100,000 (Q1–Q2)</span>
            </div>

            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">County Prequalification</strong>
                <span className="text-sage">Bungoma & Kakamega IFMIS</span>
              </div>
              <span className="text-brass font-bold">KSh 50,000 (Months 4–6)</span>
            </div>

            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">ODPC Data Controller</strong>
                <span className="text-sage">Data Protection Act 2019</span>
              </div>
              <span className="text-moss font-bold">KSh 4,000–16,000 (Q1)</span>
            </div>
          </div>

          {/* 6.5 Governance */}
          <div className="pt-2 border-t border-hairline space-y-1">
            <span className="text-brass text-[11px] font-bold uppercase block">6.5 Governance & Steering</span>
            <p className="text-sage text-[11px] font-body leading-snug">
              Monthly <strong>Joint Steering Committee</strong> (Ownership + Firefly + GM) overseeing budget release phase-gates. Quarterly commercial business reviews and annual independent brand audits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
