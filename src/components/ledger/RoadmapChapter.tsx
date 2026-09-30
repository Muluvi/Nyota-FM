import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { Users, Megaphone, Trophy, Calendar, CheckCircle } from 'lucide-react';

interface QuarterPhase {
  id: string;
  quarter: string;
  name: string;
  timeframe: string;
  targetReach: string;
  focus: string;
  deliverables: string[];
  milestone: string;
}

const PHASES: QuarterPhase[] = [
  {
    id: 'q1',
    quarter: 'Phase 01',
    name: 'Foundation & Content Nook',
    timeframe: 'Months 1 – 3',
    targetReach: '15,000 Verified CRM',
    focus: 'Studio buildout, staff training, and official WhatsApp Channel deployment.',
    deliverables: [
      'Install 15-item hardware kit in Content Nook corner',
      'Train 4 presenters on CapCut vertical video editing and phone capture',
      'Launch official Nyota FM WhatsApp Channel (zero algorithm filtering)',
      'Establish daily "Soko la Leo" morning agricultural price alerts',
    ],
    milestone: 'Studio operational; 5,000 WhatsApp subscribers in first 60 days',
  },
  {
    id: 'q2',
    quarter: 'Phase 02',
    name: 'BTL Street Activation & Live Feeds',
    timeframe: 'Months 4 – 6',
    targetReach: '50,000 Direct Contacts',
    focus: 'On-ground market-day presences and regular Facebook Live morning segments.',
    deliverables: [
      'Deploy 6-member Nyota Street Team across Kakamega, Bungoma & Busia markets',
      'Distribute 5,000 branded boda boda reflective mudguard stickers',
      'Stream Friday breakfast show live to Facebook and TikTok',
      'Sign first 3 local agribusiness BTL market sponsorship packages',
    ],
    milestone: 'Projected monthly cashflow breakeven reached at Month 4',
  },
  {
    id: 'q3',
    quarter: 'Phase 03',
    name: 'TikTok Virality & Listener Till',
    timeframe: 'Months 7 – 9',
    targetReach: '120,000 Cross-Platform',
    focus: 'Youth acquisition, comedy shorts, and direct community M-Pesa monetization.',
    deliverables: [
      'Launch weekly "Nyota Vernacular Comedy Challenge" on TikTok',
      'Deploy Safaricom M-Pesa Buy Goods Till for voluntary listener support',
      'Introduce sponsored live segment integrations for county healthcare / banking',
      'Broadcast monthly outdoor OB (Outside Broadcast) from Kakamega Bukhungu',
    ],
    milestone: 'KES 80,000+ monthly recurring non-spot revenue achieved',
  },
  {
    id: 'q4',
    quarter: 'Phase 04',
    name: 'Scale & 40% Non-Spot Revenue',
    timeframe: 'Months 10 – 12',
    targetReach: '250,000 Direct Contacts',
    focus: 'Full commercial ecosystem, regional syndication, and national agency contracts.',
    deliverables: [
      'Reach 40% non-spot revenue ratio across station accounts',
      'Host the inaugural Nyota Western Kenya Community Awards & Gala',
      'Package verified listener CRM data for national FMCG brand pitches',
      'Standardize 2028 vision blueprint for long-term regional dominance',
    ],
    milestone: '2.4× baseline revenue run-rate established for 2028 vision',
  },
];

export function RoadmapChapter() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('q1');
  const activePhase = PHASES.find(p => p.id === selectedPhaseId) || PHASES[0];

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        Execution is divided into four disciplined quarterly horizons. Rather than attempting all platforms simultaneously, each quarter builds a compounding audience and cashflow base before expanding into the next tier.
      </p>

      {/* Phase Selector Tabs */}
      <div>
        <div className="text-eyebrow text-sage-dim mb-3">12-Month Rollout • Select Phase</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PHASES.map((phase) => {
            const isSelected = phase.id === selectedPhaseId;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`p-2.5 rounded text-left border transition-all ${
                  isSelected
                    ? 'border-brass bg-ink text-paper'
                    : 'border-hairline bg-ink-2 text-sage hover:border-sage-dim'
                }`}
              >
                <div className="font-mono text-[11px] text-brass">{phase.quarter}</div>
                <div className="font-body text-xs font-medium text-paper truncate">{phase.timeframe}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Ledger Card */}
      <LedgerCard className="p-6 border-brass/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-hairline gap-2">
          <div>
            <div className="text-eyebrow text-brass">{activePhase.quarter} • {activePhase.timeframe}</div>
            <h3 className="font-display text-paper text-xl">{activePhase.name}</h3>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 bg-ink border border-brass/40 rounded text-brass self-start sm:self-auto">
            {activePhase.targetReach}
          </span>
        </div>

        <p className="font-body text-sage text-sm mb-6 leading-relaxed">
          {activePhase.focus}
        </p>

        {/* Deliverables Checklist */}
        <div className="mb-6 space-y-2.5">
          <span className="font-mono text-[11px] text-sage-dim block uppercase tracking-wider">Quarterly Deliverables:</span>
          {activePhase.deliverables.map((d, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-paper bg-ink p-2.5 rounded border border-hairline">
              <CheckCircle size={14} className="text-brass shrink-0 mt-0.5" />
              <span>{d}</span>
            </div>
          ))}
        </div>

        {/* Milestone Callout */}
        <div className="p-3 bg-ink border border-moss/40 rounded flex items-center justify-between">
          <span className="font-mono text-[11px] text-moss uppercase tracking-wider">Key Target:</span>
          <span className="font-body text-xs text-paper font-medium">{activePhase.milestone}</span>
        </div>
      </LedgerCard>

      {/* Street Team Specifications */}
      <LedgerCard className="p-6">
        <div className="flex items-center gap-2 text-eyebrow text-sage-dim mb-1">
          <Megaphone size={14} className="text-brass" />
          <span>BTL Deployment Specification</span>
        </div>
        <h3 className="font-display text-paper text-lg mb-4">The Nyota 6-Person Street Team</h3>

        <div className="space-y-1 mb-4">
          <LedgerRow label="Team Composition" value="6 Field Ambassadors" />
          <LedgerRow label="Language Proficiency" value="Luhya dialects + Kiswahili" />
          <LedgerRow label="Weekly Market Footprint" value="4 Municipal Markets / Week" />
          <LedgerRow label="Core Kit Allocation" value="Branded Vests, Megaphone, QR Boards" />
        </div>

        <p className="font-body text-sage text-xs leading-relaxed">
          The Street Team acts as Nyota FM’s physical footprint in key trading hubs (Kakamega, Mumias, Bungoma, Busia, Luanda). They interview traders for "Soko la Leo", distribute stickers, register WhatsApp subscribers, and anchor advertiser product demonstrations on market days.
        </p>
      </LedgerCard>

      {/* Gamification Loyalty Cycle */}
      <LedgerCard className="p-6">
        <div className="flex items-center gap-2 text-eyebrow text-sage-dim mb-1">
          <Trophy size={14} className="text-brass" />
          <span>Listener Retention Loop</span>
        </div>
        <h3 className="font-display text-paper text-lg mb-4">The Listener Gamification Cycle</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-mono text-[10px] text-brass block mb-1">STEP 01</span>
            <span className="font-body text-paper font-medium block mb-1">Listen & Code</span>
            <span className="font-body text-sage text-[11px]">Presenter announces daily on-air phrase</span>
          </div>
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-mono text-[10px] text-brass block mb-1">STEP 02</span>
            <span className="font-body text-paper font-medium block mb-1">WhatsApp Note</span>
            <span className="font-body text-sage text-[11px]">Listener sends code voice-note to station Till/bot</span>
          </div>
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-mono text-[10px] text-brass block mb-1">STEP 03</span>
            <span className="font-body text-paper font-medium block mb-1">On-Air Shout</span>
            <span className="font-body text-sage text-[11px]">Best notes broadcast live on prime show</span>
          </div>
          <div className="p-3 bg-ink border border-brass/50 rounded">
            <span className="font-mono text-[10px] text-moss block mb-1">STEP 04</span>
            <span className="font-body text-paper font-medium block mb-1">Airtime / VIP</span>
            <span className="font-body text-sage text-[11px]">Weekly KES 500 airtime + BTL festival passes</span>
          </div>
        </div>
      </LedgerCard>
    </div>
  );
}
