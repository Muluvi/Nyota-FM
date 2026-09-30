import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export function Part6ExecutionGovernance() {
  const topTenRisks = [
    { num: '1', risk: 'Regulatory change (CA Kenya)', li: 'Low × High', mit: 'Early engagement; named compliance owner; conservative interpretation' },
    { num: '2', risk: 'Competitive response (RMS)', li: 'High × Medium', mit: 'Speed to market; defensible cultural-civic positioning' },
    { num: '3', risk: 'Talent retention', li: 'Medium × High', mit: 'Brand-building, ambassador framework, pipeline depth' },
    { num: '4', risk: 'FX exposure on equipment', li: 'Medium × Medium', mit: 'Phased procurement; quotation locks; local sourcing where viable' },
    { num: '5', risk: 'Cybersecurity', li: 'Medium × High', mit: 'Access controls; backups; incident plan' },
    { num: '6', risk: 'Music licensing', li: 'Medium × Medium', mit: 'Sync-rights protocol; cleared-music library for clips' },
    { num: '7', risk: 'Political volatility', li: 'Medium × Medium', mit: 'Editorial guidelines; balanced civic stance' },
    { num: '8', risk: 'Power / connectivity', li: 'Medium × Medium', mit: 'Backup power; redundant streaming links' },
    { num: '9', risk: 'Equipment supply chain', li: 'Medium × Medium', mit: 'Approved-vendor list; staged ordering; buffer lead times' },
    { num: '10', risk: 'Listener-data privacy', li: 'Low × High', mit: 'DPA 2019 compliance; consent management; retention controls' },
  ];

  const studioPhases = [
    { phase: 'Phase 1', window: 'Months 1–4', unlocked: 'Visual radio foundation, live streaming', capex: 'KSh 2.2M – KSh 3.8M' },
    { phase: 'Phase 2', window: 'Months 5–10', unlocked: 'Multi-cam live production, control room', capex: 'KSh 4.5M – KSh 7.5M' },
    { phase: 'Phase 3', window: 'Months 11–18', unlocked: 'Second studio, DAM, automation', capex: 'KSh 6M – KSh 10M' },
  ];

  const roleEvolution = [
    { today: 'Presenter', becomes: 'On-camera presenter', skill: 'Performing to camera and audience simultaneously' },
    { today: 'Producer', becomes: 'Multi-platform producer', skill: 'Commissioning derivative content per broadcast' },
    { today: 'Engineer', becomes: 'IT / AV engineer', skill: 'Streaming stack, switcher and network operation' },
  ];

  const communitySlas = [
    { channel: 'WhatsApp', target: '30 minutes' },
    { channel: 'X', target: '1 hour' },
    { channel: 'Facebook', target: '2 hours' },
    { channel: 'Instagram', target: '4 hours' },
  ];

  const paidMediaTiers = [
    { tier: 'Tier A', env: 'KSh 150,000 – 250,000', unlocks: 'Steady follower growth, content amplification, retargeting' },
    { tier: 'Tier B', env: 'KSh 250,000 – 500,000', unlocks: 'Campaign bursts, lead generation, event promotion' },
    { tier: 'Tier C', env: 'KSh 500,000+', unlocks: 'Market-share offensives, multi-platform dominance pushes' },
  ];

  const masterTimeline = [
    { q: 'Q1', ms: 'Brand build begins; Studio Phase 1 starts; social channel audit; WhatsApp BSP onboarding' },
    { q: 'Q2', ms: 'Brand book launched; Studio Phase 1 complete; live streaming on air; first pre-recorded shows broadcast' },
    { q: 'Q3', ms: 'Studio Phase 2 begins; USSD shortcode live; app v1.0 beta; OB programme launches' },
    { q: 'Q4', ms: 'Studio Phase 2 complete; app v1.0 public; first tentpole OB activation' },
    { q: 'Q5–Q6', ms: 'Studio Phase 3; app v1.1; first syndication deals' },
    { q: 'Q7–Q8', ms: 'Market-leadership assertion; independent GeoPoll validation; Year-3 plan' },
  ];

  const reportingCadence = [
    { mech: 'Performance dashboard', freq: 'Monthly', purpose: 'KPI tracking against the A–E scorecard' },
    { mech: 'Business review', freq: 'Quarterly', purpose: 'Strategy, budget and phase-gate decisions' },
    { mech: 'Brand health audit', freq: 'Annual', purpose: 'Independent assessment of brand and share' },
  ];

  const sixDecisions = [
    'Approve the transformation thesis and the twenty-four-month roadmap as the agreed basis for the work.',
    'Commit capital to Studio Phase 1 within the indicative envelope of KSh 2.2M–KSh 3.8M.',
    'Authorise Firefly to procure the brand-system production (visual, sonic and application identity, and brand book).',
    'Authorise engagement of the BSP and the CA Kenya for WhatsApp and USSD provisioning.',
    'Endorse the four pre-recorded shows as the original-content spine of the new schedule.',
    'Constitute the Joint Steering Committee to govern delivery against the A–E scorecard.',
  ];

  return (
    <div className="space-y-12">
      {/* Chapter 22 & 23 */}
      <div id="chapter-22-23" className="space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part VI • Chapters 22 & 23</div>
          <h3 className="font-display text-paper text-2xl">Roadmap Sequence & Governance Principles</h3>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">Chapter 22 — Reading the Sequence:</strong> Front-loaded with proof. Brand and visual-radio arrive first because they unlock the content engine and early commercial wins that fund later phases. Capital-heavy milestones follow only once foundations are demonstrably working.
          </p>
          <p>
            <strong className="text-paper">Chapter 23 — Governance Principles:</strong> A single accountable body — a Joint Steering Committee comprising Ownership representatives, Firefly leads and the station General Manager — holds decision authority over phase gates and budget releases.
          </p>
        </div>
      </div>

      {/* Chapter 24 — Risk Register */}
      <div id="chapter-24" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part VI • Chapter 24</div>
          <h3 className="font-display text-paper text-2xl">Risk Register</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "The risks that sink media ventures are rarely surprises. Naming and mitigating them in advance is the difference between resilience and disruption."
          </p>
        </div>

        <LedgerCard className="p-4">
          <div className="text-eyebrow text-sage-dim mb-2">Table 24.1 — Top-Ten Risk Register</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-hairline text-sage-dim">
                  <th className="pb-2 font-normal w-8">#</th>
                  <th className="pb-2 font-normal">Risk</th>
                  <th className="pb-2 font-normal">Likelihood × Impact</th>
                  <th className="pb-2 font-normal">Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {topTenRisks.map((r) => (
                  <tr key={r.num} className="hover:bg-ink">
                    <td className="py-2.5 text-sage-dim">{r.num}</td>
                    <td className="py-2.5 font-body font-medium text-paper">{r.risk}</td>
                    <td className="py-2.5 text-brass">{r.li}</td>
                    <td className="py-2.5 font-body text-sage text-[11px]">{r.mit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LedgerCard>
      </div>

      {/* Chapter 25 — The Consolidated Implementation Plan */}
      <div id="chapter-25" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part VI • Chapter 25</div>
          <h3 className="font-display text-paper text-2xl">The Consolidated Implementation Plan</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Everything the earlier chapters promise has to be built, provisioned, staffed and sequenced. This chapter gathers the entire execution layer in one place."
          </p>
        </div>

        <div className="space-y-6 font-body text-sage text-sm leading-relaxed">
          {/* 25.1 Studio Build Three Phases */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.1 The Studio Build — Three Sequenced Phases</h4>
            <p className="mb-3">
              The studio is built across three sequenced phases over eighteen months, each unlocking a defined capability and each gated on the proven value of the one before.
            </p>

            <LedgerCard className="p-4">
              <div className="text-eyebrow text-sage-dim mb-2">Table 25.1 — Three-Phase Studio Capital Plan (Total KSh 12.7M – KSh 21.3M)</div>
              <div className="divide-y divide-hairline">
                {studioPhases.map((p, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div>
                      <span className="font-body font-semibold text-paper">{p.phase} ({p.window})</span>
                      <span className="font-body text-sage text-[11px] block">{p.unlocked}</span>
                    </div>
                    <span className="font-mono text-brass font-medium">{p.capex}</span>
                  </div>
                ))}
              </div>
            </LedgerCard>
          </div>

          {/* 25.2 Equipment Schedule */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.2 Equipment Schedule</h4>
            <ul className="space-y-2 list-disc list-inside text-xs">
              <li><strong className="text-paper">Phase 1:</strong> 2× PTZ cameras (NDI/HDMI), VISCA control; Blackmagic ATEM Television Studio HD; basic LED panel kit and targeted acoustic treatment; hardware/software encoder.</li>
              <li><strong className="text-paper">Phase 2:</strong> Expand to 4× PTZ + 1× operated camera; ATEM Television Studio HD8 or Pro 4K; vMix/OBS production computer; talk-back system; dedicated control room and full lighting grid.</li>
              <li><strong className="text-paper">Phase 3:</strong> Second studio (podcast / pre-record room); Digital Asset Management (DAM) system; automation AI tooling for clipping and audience data.</li>
            </ul>
          </div>

          {/* 25.3 Staffing & Training */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.3 Workflow, Staffing & Training</h4>
            <LedgerCard className="p-4 mb-4">
              <div className="text-eyebrow text-sage-dim mb-2">Table 25.2 — Evolution of Existing Roles Under Visual-Radio Model</div>
              <div className="divide-y divide-hairline">
                {roleEvolution.map((re, idx) => (
                  <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                    <span className="font-body font-medium text-brass sm:w-1/3">{re.today} → {re.becomes}</span>
                    <span className="font-body text-paper sm:w-2/3">{re.skill}</span>
                  </div>
                ))}
              </div>
            </LedgerCard>

            <p className="text-xs">
              <strong className="text-paper">Five New Roles:</strong> Head of Digital, Video Producer, Social Media Manager, Community Manager, and Data & Insights Lead — phased in alongside studio build rather than hired all at once.
            </p>
            <p className="text-xs mt-1">
              <strong className="text-paper">Training & Handover:</strong> 12-week induction programme led by Firefly, followed by standard operating procedures and quarterly refreshers for complete station autonomy.
            </p>
          </div>

          {/* 25.4 & 25.5 Mobile, Govt */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.4 Mobile Provisioning & 25.5 Government / Grants</h4>
            <p className="text-xs">
              <strong className="text-paper">WhatsApp BSP:</strong> Africa's Talking selected for cost efficiency, local M-Pesa integration, and in-market support.
            </p>
            <p className="text-xs mt-1">
              <strong className="text-paper">USSD Shortcode:</strong> Procured via Communications Authority of Kenya with multi-lingual branching (Swahili, Bukusu, Maragoli, English).
            </p>
            <p className="text-xs mt-1">
              <strong className="text-paper">Government Registration:</strong> Register with Government Advertising Agency (GAA) for public-sector advertising campaigns.
            </p>
          </div>

          {/* 25.6 Service Levels & 25.7 Paid Media */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.6 Community Management SLAs & 25.7 Paid Media Plan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LedgerCard className="p-4">
                <div className="text-eyebrow text-sage-dim mb-2">Table 25.3 — Response-Time SLAs</div>
                <div className="divide-y divide-hairline">
                  {communitySlas.map((s, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs font-mono">
                      <span className="text-paper font-body">{s.channel}</span>
                      <span className="text-brass">{s.target}</span>
                    </div>
                  ))}
                </div>
              </LedgerCard>

              <LedgerCard className="p-4">
                <div className="text-eyebrow text-sage-dim mb-2">Table 25.4 — Monthly Paid Media Tiers</div>
                <div className="divide-y divide-hairline">
                  {paidMediaTiers.map((t, idx) => (
                    <div key={idx} className="py-2 text-xs">
                      <div className="flex items-center justify-between font-mono mb-0.5">
                        <span className="text-paper font-semibold">{t.tier}</span>
                        <span className="text-brass">{t.env}</span>
                      </div>
                      <span className="font-body text-sage text-[11px] block">{t.unlocks}</span>
                    </div>
                  ))}
                </div>
              </LedgerCard>
            </div>
          </div>

          {/* 25.8 Master 24-Month Timeline */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.8 The Master 24-Month Timeline</h4>
            <LedgerCard className="p-4">
              <div className="text-eyebrow text-sage-dim mb-2">Table 25.5 — Twenty-Four-Month Execution Roadmap</div>
              <div className="divide-y divide-hairline">
                {masterTimeline.map((m, idx) => (
                  <div key={idx} className="py-2.5 flex items-start gap-3 text-xs">
                    <span className="font-mono text-brass font-bold shrink-0">{m.q}</span>
                    <span className="font-body text-paper">{m.ms}</span>
                  </div>
                ))}
              </div>
            </LedgerCard>
          </div>

          {/* 25.9 Governance Reporting Cadence */}
          <div>
            <h4 className="font-display text-paper text-base mb-2">25.9 Governance & Reporting Machinery</h4>
            <LedgerCard className="p-4">
              <div className="text-eyebrow text-sage-dim mb-2">Table 25.6 — Governance Reporting Cadence</div>
              <div className="divide-y divide-hairline">
                {reportingCadence.map((rc, idx) => (
                  <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                    <div className="sm:w-1/3">
                      <span className="font-body font-semibold text-paper">{rc.mech}</span>
                      <span className="text-brass text-[11px] block">{rc.freq}</span>
                    </div>
                    <span className="font-body text-sage sm:w-2/3 sm:text-right">{rc.purpose}</span>
                  </div>
                ))}
              </div>
            </LedgerCard>
          </div>
        </div>
      </div>

      {/* Chapter 26 — The Ask of Ownership */}
      <div id="chapter-26" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part VI • Chapter 26</div>
          <h3 className="font-display text-paper text-2xl">The Ask of Ownership</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Every transformation reaches a moment of decision. This is that moment, stated plainly, so Ownership can act with clarity."
          </p>
        </div>

        <p className="font-body text-sage text-sm leading-relaxed">
          We ask Ownership to take six clear decisions to initiate the programme:
        </p>

        <div className="space-y-3">
          {sixDecisions.map((dec, idx) => (
            <div key={idx} className="p-3.5 bg-ink rounded border border-hairline flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-brass/20 text-brass border border-brass/40 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                {idx + 1}
              </div>
              <span className="font-body text-paper text-sm leading-snug">{dec}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-ink border border-brass/50 rounded mt-6">
          <p className="font-display text-paper text-base leading-relaxed">
            With these six decisions, the Twang’aa Transformation moves from proposal to programme — and Nyota FM begins its path to becoming the cultural and civic anchor of Western Kenya.
          </p>
        </div>

        <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
          <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
          <p><strong className="text-paper">A:</strong> The asks authorise brand, content and engagement work that creates new streams.</p>
          <p><strong className="text-paper">B:</strong> Phase 1 capital and the steering committee unlock the revenue trajectory under proper control.</p>
          <p><strong className="text-paper">C:</strong> Approval initiates the programme designed to claim the #1 vernacular position.</p>
          <p><strong className="text-paper">D:</strong> Authorising WhatsApp and USSD provisioning starts the addressable-community build.</p>
          <p><strong className="text-paper">E:</strong> Constituting governance ensures loyalty is measured and grown from day one.</p>
        </div>
      </div>
    </div>
  );
}
