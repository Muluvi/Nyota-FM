import React, { useState } from 'react';
import { 
  Calendar, Wrench, Users, Shield, Clock, CheckCircle2, 
  DollarSign, FileText, ChevronRight, Layers, ArrowRight 
} from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { InteractiveStudioPlan } from '../website/InteractiveStudioPlan';
import { VisualRadioStudioSimulator } from '../website/VisualRadioStudioSimulator';
import { PowerResilienceMatrix } from '../website/PowerResilienceMatrix';
import { OBVanExplorer } from '../website/OBVanExplorer';
import { EquipmentLifecycleLog } from '../website/EquipmentLifecycleLog';
import { BrandIdentityViewer } from '../website/BrandIdentityViewer';

export function Part6TheBuild() {
  const [activePhase, setActivePhase] = useState<'p1' | 'p2' | 'p3'>('p1');

  const roadmapQuarters = [
    {
      q: 'Q1 2026',
      title: 'Foundation & Procurement',
      milestones: [
        'Brand build begins & visual identity refresh',
        'Studio Phase 1 procurement & acoustic installation begins',
        'Social media channel audit & handle rationalization',
        'WhatsApp BSP onboarding with Africa’s Talking',
        'GAA National Register prequalification submission',
        'CA Kenya USSD shortcode application filed'
      ]
    },
    {
      q: 'Q2 2026',
      title: 'Live Visual Launch & Shows 1–2',
      milestones: [
        'Brand book officially launched across station',
        'Studio Phase 1 complete & signed off',
        'Live video streaming on air (2×/week YouTube/FB)',
        'First two pre-recorded shows broadcast (Asubuhi ya Imani, Hapa Tulipo Mix)',
        'YouTube channel relaunch & initial SEO push',
        'Podcast distribution live on Spotify & Apple'
      ]
    },
    {
      q: 'Q3 2026',
      title: 'Mobile Scale & Field Roadshow',
      milestones: [
        'Studio Phase 2 multi-cam build begins',
        'Dedicated USSD shortcode live with Safaricom & AT',
        'Nyota FM mobile application v1.0 internal beta',
        'Hapa Tulipo Outside Broadcast circuit launches',
        'Shows 3 & 4 broadcast (Sauti ya Nchi, Wanawake wa Twang’aa)',
        '12-SKU merchandise catalogue launched'
      ]
    },
    {
      q: 'Q4 2026',
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
      q: 'Q1 2027',
      title: 'Hub Expansion & Civic Prequalification',
      milestones: [
        'Studio Phase 3 secondary studio construction begins',
        'Bungoma & Kakamega county IFMIS media prequalification',
        '2027 General Election political rate card release & advance bookings'
      ]
    },
    {
      q: 'Q2 2027',
      title: 'Syndication & Diaspora Bridge',
      milestones: [
        'Nyota App v1.1 update with livestream chat',
        'First cross-border regional syndication contract signed',
        'Diaspora Sunday programme block & remittance partnerships live'
      ]
    },
    {
      q: 'Q3 2027',
      title: 'Asset Completion & Election Cycle',
      milestones: [
        'Studio Phase 3 complete (DAM & AI auto-clipping running)',
        'Second regional syndication affiliate onboarded',
        'High-volume 2027 political advertising execution'
      ]
    },
    {
      q: 'Q4 2027',
      title: 'Leadership Assertion & Year 3 Scale',
      milestones: [
        'Market-leadership assertion across Western Kenya',
        'Independent GeoPoll audience measurement validation audit',
        'Presentation of Year-3 2028 strategic horizon to Ownership'
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* 6.1 Master Timeline */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-hairline pb-3">
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
              SECTION 6.1
            </span>
            <h4 className="font-display text-paper text-base font-semibold">Master 24-Month Roadmap (Q1 2026 – Q4 2027)</h4>
            <p className="text-xs text-sage mt-0.5">Quarter-by-quarter operational delivery schedule from day 1 to market leadership</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {roadmapQuarters.map((rq, idx) => (
              <div key={idx} className="p-3.5 bg-ink rounded border border-hairline hover:border-brass/50 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-brass font-bold text-xs">{rq.q}</span>
                    <span className="text-[10px] text-sage-dim">M{idx * 3 + 1}–M{idx * 3 + 3}</span>
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

      {/* Interactive Studio Floor Plan & Equipment Inspector */}
      <Reveal>
        <InteractiveStudioPlan />
      </Reveal>

      {/* Interactive Visual Radio Multi-Cam Studio Switcher */}
      <Reveal>
        <VisualRadioStudioSimulator />
      </Reveal>

      {/* Studio Power Resilience & Zero-Downtime Grid Failover */}
      <Reveal>
        <PowerResilienceMatrix />
      </Reveal>

      {/* "Hapa Tulipo" Outside Broadcast (OB) Van & Roadshow Unit */}
      <Reveal>
        <OBVanExplorer />
      </Reveal>

      {/* Station Equipment Registry & Maintenance Lifecycle Log */}
      <Reveal>
        <EquipmentLifecycleLog />
      </Reveal>

      {/* Official Brand Identity & Design System Specifications */}
      <Reveal>
        <BrandIdentityViewer />
      </Reveal>

      {/* 6.2 Consolidated Studio Capex Schedule */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                SECTION 6.2
              </span>
              <h4 className="font-display text-paper text-base font-semibold">Studio Build — Consolidated Cost Schedule</h4>
              <p className="text-xs text-sage mt-0.5">Empirically researched local quotes vs v1.0 speculative budgets</p>
            </div>
            <div className="flex items-center gap-1">
              {(['p1', 'p2', 'p3'] as const).map((ph) => (
                <button
                  key={ph}
                  onClick={() => setActivePhase(ph)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold uppercase ${
                    activePhase === ph ? 'bg-brass text-ink' : 'bg-ink text-sage hover:text-paper'
                  }`}
                >
                  {ph === 'p1' ? 'Phase 1' : ph === 'p2' ? 'Phase 2' : 'Phase 3'}
                </button>
              ))}
            </div>
          </div>

          {/* Phase 1 Table */}
          {activePhase === 'p1' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-sage">
                <span>Phase 1 (Months 1–4): Visual Radio Foundation</span>
                <TierBadge tier={1} citation="BS International, Cellular Kenya, Rondamo" url="bsint.net" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-hairline text-sage-dim">
                      <th className="py-2 pr-3">Equipment Item</th>
                      <th className="py-2 px-3">Kenyan Vendor</th>
                      <th className="py-2 px-3">Price (KSh)</th>
                      <th className="py-2 pl-3">Source Citation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline text-paper/90">
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">2× PTZ Camera KTUH86 (NDI/HDMI)</td>
                      <td className="py-2 px-3 text-sage">Broadcast Solutions International</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">228,000</td>
                      <td className="py-2 pl-3 text-sage">bsint.net</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">ATEM Television Studio HD</td>
                      <td className="py-2 px-3 text-sage">Cellular Kenya</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">154,999</td>
                      <td className="py-2 pl-3 text-sage">cameraplacekenya.com</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">VISICO LED-50A 3-Lights Kit</td>
                      <td className="py-2 px-3 text-sage">Rondamo</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">34,300</td>
                      <td className="py-2 pl-3 text-sage">rondamo.co.ke</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Acoustic Treatment (20 m² panels)</td>
                      <td className="py-2 px-3 text-sage">Soundproofing Kenya</td>
                      <td className="py-2 px-3 text-amber-300">110,000 – 250,000</td>
                      <td className="py-2 pl-3 text-sage">soundproofingcompany.co.ke</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Hardware Streaming Encoder</td>
                      <td className="py-2 px-3 text-sage">Industry estimate</td>
                      <td className="py-2 px-3 text-amber-300">50,000 – 120,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Cables, wall mounts & installation</td>
                      <td className="py-2 px-3 text-sage">Local technician / engineering</td>
                      <td className="py-2 px-3 text-amber-300">50,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="bg-moss/20 font-bold border-t border-moss">
                      <td className="py-3 pr-3 text-paper">Total Phase 1 Commitment</td>
                      <td className="py-3 px-3 text-emerald-300">Bankable Researched Quote</td>
                      <td className="py-3 px-3 text-emerald-400 text-sm">KSh 627,299 – 837,299</td>
                      <td className="py-3 pl-3 text-emerald-300">Saves KSh 1.5M vs v1.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Phase 2 Table */}
          {activePhase === 'p2' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-sage">
                <span>Phase 2 (Months 5–10): Multi-Cam Live Production</span>
                <TierBadge tier={1} citation="BS International & Rondamo" url="rondamo.co.ke" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-hairline text-sage-dim">
                      <th className="py-2 pr-3">Equipment Item</th>
                      <th className="py-2 px-3">Vendor / Derivation</th>
                      <th className="py-2 px-3">Price (KSh)</th>
                      <th className="py-2 pl-3">Source Citation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline text-paper/90">
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">4× Additional PTZ Cameras</td>
                      <td className="py-2 px-3 text-sage">Broadcast Solutions International</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">456,000 – 652,000</td>
                      <td className="py-2 pl-3 text-sage">bsint.net</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">ATEM Television Studio HD8</td>
                      <td className="py-2 px-3 text-sage">Rondamo Technologies</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">455,800</td>
                      <td className="py-2 pl-3 text-sage">rondamo.co.ke</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">vMix / OBS Production Workstation PC</td>
                      <td className="py-2 px-3 text-sage">Custom workstation build</td>
                      <td className="py-2 px-3 text-amber-300">150,000 – 300,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Studio Talk-Back Intercom System</td>
                      <td className="py-2 px-3 text-sage">Industry estimate</td>
                      <td className="py-2 px-3 text-amber-300">80,000 – 150,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Dedicated Control Room Build-Out</td>
                      <td className="py-2 px-3 text-sage">Partitioning & acoustic glass</td>
                      <td className="py-2 px-3 text-rose-300 font-bold">500,000 – 1,000,000</td>
                      <td className="py-2 pl-3 text-rose-300 font-semibold">Tier 0 Data Gap</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Overhead Lighting Truss & Grid</td>
                      <td className="py-2 px-3 text-sage">Rondamo / local riggers</td>
                      <td className="py-2 px-3 text-amber-300">200,000 – 400,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="bg-brass/20 font-bold border-t border-brass">
                      <td className="py-3 pr-3 text-paper">Total Phase 2 Envelope</td>
                      <td className="py-3 px-3 text-brass">Months 5–10 Investment</td>
                      <td className="py-3 px-3 text-brass text-sm">KSh 1,841,800 – 2,957,800</td>
                      <td className="py-3 pl-3 text-amber-300">Multi-Cam Rig</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Phase 3 Table */}
          {activePhase === 'p3' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-sage">
                <span>Phase 3 (Months 11–18): Full Multi-Platform Hub</span>
                <TierBadge tier={2} citation="Enterprise Facility Model" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-hairline text-sage-dim">
                      <th className="py-2 pr-3">Expansion Category</th>
                      <th className="py-2 px-3">Component Description</th>
                      <th className="py-2 px-3">Budget Envelope (KSh)</th>
                      <th className="py-2 pl-3">Audit Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline text-paper/90">
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Secondary Studio</td>
                      <td className="py-2 px-3 text-sage">Podcast, voicework & pre-records facility</td>
                      <td className="py-2 px-3 text-rose-300 font-bold">1,500,000 – 3,000,000</td>
                      <td className="py-2 pl-3 text-rose-300">Tier 0 Data Gap (quotes needed)</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">DAM System</td>
                      <td className="py-2 px-3 text-sage">Digital Asset Management server & indexing</td>
                      <td className="py-2 px-3 text-rose-300 font-bold">500,000 – 1,500,000</td>
                      <td className="py-2 pl-3 text-rose-300">Tier 0 Data Gap</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Archive Infrastructure</td>
                      <td className="py-2 px-3 text-sage">NAS storage array + offsite cloud backup</td>
                      <td className="py-2 px-3 text-amber-300">300,000 – 800,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="hover:bg-ink">
                      <td className="py-2 pr-3 font-semibold text-paper">Automation & AI Tooling</td>
                      <td className="py-2 px-3 text-sage">Auto-clipping, transcription & captioning suite</td>
                      <td className="py-2 px-3 text-amber-300">200,000 – 500,000</td>
                      <td className="py-2 pl-3 text-sage-dim">Tier 2 estimate</td>
                    </tr>
                    <tr className="bg-brass/20 font-bold border-t border-brass">
                      <td className="py-3 pr-3 text-paper">Total Phase 3 Envelope</td>
                      <td className="py-3 px-3 text-brass">Months 11–18 Enterprise Scale</td>
                      <td className="py-3 px-3 text-brass text-sm">KSh 2,500,000 – 5,800,000</td>
                      <td className="py-3 pl-3 text-amber-300">Maturity Scale</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Master Studio Comparison Callout */}
          <div className="p-4 bg-ink rounded border border-brass/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-3">
            <div>
              <span className="text-brass font-bold text-sm block">Total Studio Capex (All 3 Phases):</span>
              <span className="text-paper text-base font-bold">KSh 4,969,099 – 9,595,099</span>
              <span className="text-sage block text-[11px] mt-0.5">Phased across 18 months, gate-controlled by revenue thresholds</span>
            </div>
            <div className="sm:text-right">
              <span className="text-emerald-400 font-bold block text-sm">&gt; 50% Reduction</span>
              <span className="text-sage-dim text-[11px]">vs v1.0's unresearched KSh 12.7M–21.3M envelope</span>
            </div>
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
              <span className="text-brass font-bold">$85 + $50/mo (Q1 2026)</span>
            </div>

            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">USSD Shortcode Allocation</strong>
                <span className="text-sage">CA Kenya & Africa’s Talking</span>
              </div>
              <span className="text-brass font-bold">KES 145K + 70K/mo (Q1–Q3)</span>
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
              <span className="text-brass font-bold">KSh 50,000 (Q2 2026)</span>
            </div>

            <div className="p-2 bg-ink rounded border border-hairline flex justify-between">
              <div>
                <strong className="text-paper block">ODPC Data Controller</strong>
                <span className="text-sage">Data Protection Act 2019</span>
              </div>
              <span className="text-emerald-400 font-bold">KSh 4,000–16,000 (Q1)</span>
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
