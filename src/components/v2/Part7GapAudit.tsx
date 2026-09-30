import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, Search, Filter, 
  Layers, Package, FileCheck, ArrowUpRight 
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';

export function Part7GapAudit() {
  const [activeChecklist, setActiveChecklist] = useState<'A' | 'B' | 'C'>('A');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Checklist A: 20 Proposal Completeness Gaps
  const checklistA = [
    { id: 1, v1: 'No audited baseline', why: 'Cannot measure growth without a documented starting point', fix: 'Data gap declared; baseline audit recommended', ref: 'Part 1, Objective B' },
    { id: 2, v1: 'No rate card', why: 'Cannot price spot or sponsorship inventory credibly', fix: 'Rate card benchmarks researched across Kenyan stations', ref: 'Part 2, 2.3' },
    { id: 3, v1: 'No competitor financials', why: 'Cannot size true addressable opportunity vs rivals', fix: 'Data gap declared; media audit method proposed', ref: 'Part 2, 2.2' },
    { id: 4, v1: 'No listener research', why: 'Cannot validate audience targets or daypart retention', fix: 'GeoPoll/KARF panel data cited', ref: 'Part 2, 2.7' },
    { id: 5, v1: 'No platform economics', why: 'Cannot model digital revenue without RPMs and developer costs', fix: 'YouTube, TikTok, WhatsApp, USSD costs researched', ref: 'Part 2, 2.4' },
    { id: 6, v1: 'No regulatory costs', why: 'Cannot budget legal compliance or operating permits', fix: 'CA Kenya, ODPC DPA, music rights costs cited', ref: 'Part 2, 2.6' },
    { id: 7, v1: 'No salary benchmarks', why: 'Cannot budget digital personnel and technical crew', fix: 'Payscale Kenya & industry benchmarks cited', ref: 'Part 6, 6.3' },
    { id: 8, v1: 'No payback model', why: 'Board cannot assess return on invested capital', fix: '8-quarter payback model and trajectory index added', ref: 'Part 3, 3.4' },
    { id: 9, v1: 'No sensitivity analysis', why: 'Cannot stress-test base case against downside headwinds', fix: 'Worst/Base/Best sensitivity table added', ref: 'Part 3, 3.4' },
    { id: 10, v1: 'No named vendors', why: 'Cannot execute physical procurement without real vendors', fix: 'Kenyan vendors named with citable price quotes', ref: 'Part 2, 2.5' },
    { id: 11, v1: 'No GAA registration', why: 'Locks station out of national government advertising', fix: 'GAA National Register prequalification researched', ref: 'Part 5, 5.14' },
    { id: 12, v1: 'No DPA compliance cost', why: 'Exposes station to severe penalties under Data Protection Act', fix: 'ODPC statutory registration fees cited', ref: 'Part 2, 2.6' },
    { id: 13, v1: 'No music sync rights cost', why: 'Cannot stream live video or post clips legally without sync', fix: 'Data gap declared; CMO negotiation recommended', ref: 'Part 2, 2.6' },
    { id: 14, v1: 'No USSD cost', why: 'Cannot budget critical mobile feature phone engagement layer', fix: 'Africa\'s Talking and CA Kenya fee schedules cited', ref: 'Part 2, 2.4' },
    { id: 15, v1: 'No WhatsApp cost', why: 'Cannot budget messaging bills at scale (250K contacts)', fix: 'Meta rate card & BSP per-message pricing cited', ref: 'Part 2, 2.4' },
    { id: 16, v1: 'No podcast economics', why: 'Cannot model podcast revenue or set advertiser pricing', fix: 'African podcast CPM data ($3–$8) cited', ref: 'Part 2, 2.4' },
    { id: 17, v1: 'No TikTok reality check', why: 'Assumed non-existent platform creator payouts in Kenya', fix: 'TikTok monetisation limits researched & corrected', ref: 'Part 2, 2.4' },
    { id: 18, v1: 'No diaspora strategy', why: 'Missed highest-purchasing-power audience segment', fix: 'Dedicated diaspora strategy and partnerships added', ref: 'Part 5, 5.17' },
    { id: 19, v1: 'No political cycle planning', why: 'Missed largest episodic revenue windfall (2027 Election)', fix: 'Political rate card and compliance strategy added', ref: 'Part 5, 5.21' },
    { id: 20, v1: '"Illustrative" figures throughout', why: 'Board cannot approve a plan built on placeholders', fix: 'Every figure strictly labelled Tier 1, Tier 2, or Tier 0', ref: 'Throughout' },
  ];

  // Checklist B: 40 Operational Build Items
  const checklistB = [
    { id: 1, item: '2× PTZ cameras (KTUH86)', cat: 'Equipment', when: 'Q1 2026', cost: '228,000', owner: 'Engineer', v1: 'Named' },
    { id: 2, item: 'ATEM Television Studio HD', cat: 'Equipment', when: 'Q1 2026', cost: '154,999', owner: 'Engineer', v1: 'Named' },
    { id: 3, item: 'LED lighting kit (VISICO 3-light)', cat: 'Equipment', when: 'Q1 2026', cost: '34,300', owner: 'Engineer', v1: 'Named' },
    { id: 4, item: 'Acoustic panels (20 m²)', cat: 'Equipment', when: 'Q1 2026', cost: '110,000–250,000', owner: 'Engineer', v1: 'Implied' },
    { id: 5, item: 'Streaming hardware encoder', cat: 'Equipment', when: 'Q1 2026', cost: '50,000–120,000', owner: 'Engineer', v1: 'Implied' },
    { id: 6, item: '4× PTZ cameras (Phase 2)', cat: 'Equipment', when: 'Q3 2026', cost: '456,000–652,000', owner: 'Engineer', v1: 'Named' },
    { id: 7, item: 'ATEM Television Studio HD8', cat: 'Equipment', when: 'Q3 2026', cost: '455,800', owner: 'Engineer', v1: 'Named' },
    { id: 8, item: 'vMix / OBS Production PC', cat: 'Equipment', when: 'Q3 2026', cost: '150,000–300,000', owner: 'Engineer', v1: 'Implied' },
    { id: 9, item: 'Talk-back intercom system', cat: 'Equipment', when: 'Q3 2026', cost: '80,000–150,000', owner: 'Engineer', v1: 'Implied' },
    { id: 10, item: 'Control room build-out', cat: 'Equipment', when: 'Q3 2026', cost: '500,000–1,000,000', owner: 'Engineer', v1: 'Implied' },
    { id: 11, item: 'Second studio (podcast/pre-records)', cat: 'Equipment', when: 'Q1 2027', cost: '1,500,000–3,000,000', owner: 'Engineer', v1: 'Named' },
    { id: 12, item: 'DAM system (server & indexing)', cat: 'Software', when: 'Q1 2027', cost: '500,000–1,500,000', owner: 'Head of Digital', v1: 'Named' },
    { id: 13, item: 'Auto-clipping AI tooling', cat: 'Software', when: 'Q1 2027', cost: '200,000–500,000', owner: 'Head of Digital', v1: 'Named' },
    { id: 14, item: 'WhatsApp BSP integration', cat: 'Software', when: 'Q1 2026', cost: '$85 + $50/mo', owner: 'Head of Digital', v1: 'Named' },
    { id: 15, item: 'USSD shortcode setup & access', cat: 'Software', when: 'Q1–Q3 2026', cost: '145,000 + 70,000/mo', owner: 'Head of Digital', v1: 'Named' },
    { id: 16, item: 'App development (v1.0 & v1.1)', cat: 'Software', when: 'Q3 2026', cost: '500,000–1,500,000', owner: 'Head of Digital', v1: 'Named' },
    { id: 17, item: 'Advertiser self-serve portal', cat: 'Software', when: 'Q4 2026', cost: '200,000–500,000', owner: 'Head of Digital', v1: 'Absent' },
    { id: 18, item: 'Head of Digital salary', cat: 'Personnel', when: 'Q1 2026', cost: '120,000–200,000/mo', owner: 'GM', v1: 'Named' },
    { id: 19, item: 'Video Producer salary', cat: 'Personnel', when: 'Q1 2026', cost: '60,000–100,000/mo', owner: 'GM', v1: 'Named' },
    { id: 20, item: 'Social Media Manager salary', cat: 'Personnel', when: 'Q1 2026', cost: '60,000–100,000/mo', owner: 'GM', v1: 'Named' },
    { id: 21, item: 'Community Manager salary', cat: 'Personnel', when: 'Q1 2026', cost: '50,000–80,000/mo', owner: 'GM', v1: 'Named' },
    { id: 22, item: 'Data & Insights Lead salary', cat: 'Personnel', when: 'Q2 2026', cost: '80,000–150,000/mo', owner: 'GM', v1: 'Named' },
    { id: 23, item: 'GAA prequalification filing', cat: 'Regulatory', when: 'Q1–Q2 2026', cost: '100,000', owner: 'GM', v1: 'Named' },
    { id: 24, item: 'County prequalification fees', cat: 'Regulatory', when: 'Q2 2026', cost: '50,000', owner: 'GM', v1: 'Absent' },
    { id: 25, item: 'DPA registration (ODPC)', cat: 'Regulatory', when: 'Q1 2026', cost: '4,000–16,000', owner: 'GM', v1: 'Named' },
    { id: 26, item: 'Music sync rights clearance', cat: 'Regulatory', when: 'Q2 2026', cost: 'DATA GAP (direct neg)', owner: 'GM', v1: 'Named' },
    { id: 27, item: 'CA radio operating licence', cat: 'Regulatory', when: 'Ongoing', cost: '100,000/yr', owner: 'GM', v1: 'Named' },
    { id: 28, item: 'Africa’s Talking master contract', cat: 'Partnership', when: 'Q1 2026', cost: 'Commercial tariff', owner: 'Head of Digital', v1: 'Named' },
    { id: 29, item: 'PAVRISK / KAMP / MCSK pacts', cat: 'Partnership', when: 'Q2 2026', cost: 'DATA GAP', owner: 'GM', v1: 'Implied' },
    { id: 30, item: 'Bungoma County partnership', cat: 'Partnership', when: 'Q2 2026', cost: 'Framework agreement', owner: 'GM', v1: 'Absent' },
    { id: 31, item: 'Kakamega County partnership', cat: 'Partnership', when: 'Q2 2026', cost: 'Framework agreement', owner: 'GM', v1: 'Absent' },
    { id: 32, item: 'Development partner agreements', cat: 'Partnership', when: 'Q3 2026', cost: 'Grant co-financing', owner: 'GM', v1: 'Named' },
    { id: 33, item: 'GeoPoll baseline study', cat: 'Data', when: 'Q1 2026', cost: '500,000–1,000,000', owner: 'Data Lead', v1: 'Absent' },
    { id: 34, item: 'KARF subscription', cat: 'Data', when: 'Q2 2026', cost: 'DATA GAP', owner: 'Data Lead', v1: 'Absent' },
    { id: 35, item: 'Station listener survey (field)', cat: 'Data', when: 'Q2 2026', cost: '300,000–500,000', owner: 'Data Lead', v1: 'Absent' },
    { id: 36, item: 'Brand book compilation', cat: 'Brand', when: 'Q2 2026', cost: '300,000–500,000', owner: 'Head of Digital', v1: 'Named' },
    { id: 37, item: 'Visual identity system', cat: 'Brand', when: 'Q1–Q2 2026', cost: '200,000–400,000', owner: 'Head of Digital', v1: 'Named' },
    { id: 38, item: 'Sonic logo & jingle package', cat: 'Brand', when: 'Q2 2026', cost: '100,000–200,000', owner: 'Head of Digital', v1: 'Named' },
    { id: 39, item: 'Merchandise catalogue setup', cat: 'Brand', when: 'Q3 2026', cost: '100,000', owner: 'Community Manager', v1: 'Named' },
    { id: 40, item: '12-week staff training induction', cat: 'Capability', when: 'Q1–Q2 2026', cost: '200,000–400,000', owner: 'Firefly', v1: 'Named' },
  ];

  // Checklist C: 12 Strategy Gaps Firefly v1.0 Omitted
  const checklistC = [
    { id: 1, lever: 'Agricultural value-chain advertising', why: 'Major revenue driver in Trans Nzoia & Bungoma maize belts', value: 'KSh 500K–2M / yr', cost: 'KSh 50,000', diff: 'Medium', ref: '5.20' },
    { id: 2, lever: 'Political cycle planning (2027 General Election)', why: 'Massive episodic cyclical revenue across 5 counties', value: 'KSh 2M–10M', cost: 'KSh 100,000', diff: 'Low', ref: '5.21' },
    { id: 3, lever: 'Diaspora engagement & remittances', why: 'Untapped affluent Luhya diaspora in Nairobi & abroad', value: 'KSh 500K–2M / yr', cost: 'KSh 100,000', diff: 'High', ref: '5.17' },
    { id: 4, lever: 'Advertiser self-serve portal', why: 'Unlocks frictionless M-Pesa bookings for regional SMEs', value: 'KSh 500K–1.5M / yr', cost: 'KSh 200K–500K', diff: 'Medium', ref: '5.13' },
    { id: 5, lever: 'SMS / CRM automated marketing', why: 'Continuous direct audience messaging beyond USSD sessions', value: 'KSh 300K–1M / yr', cost: 'KSh 50,000', diff: 'Low', ref: 'Rec. Future' },
    { id: 6, lever: 'Google Ad Grants for Civic Initiatives', why: 'Provides up to $10,000/mo in free in-kind search marketing', value: 'Up to $10,000/mo (in-kind)', cost: 'KSh 0', diff: 'Low', ref: 'Rec. Future' },
    { id: 7, lever: 'Meta Journalism Project grant funding', why: 'External non-dilutive grant capital for regional newsrooms', value: 'Variable grant capital', cost: 'KSh 0', diff: 'Medium', ref: 'Rec. Future' },
    { id: 8, lever: 'Airtime-for-equity / barter deals', why: 'Enables ownership stakes in high-growth regional startups', value: 'Asset appreciation', cost: 'KSh 0', diff: 'Low', ref: 'Rec. Future' },
    { id: 9, lever: 'Podcast dynamic ad insertion (DAI)', why: 'Automates programmatic podcast monetization at scale', value: 'KSh 300K–1M / yr', cost: 'Low', diff: 'Medium', ref: '5.9' },
    { id: 10, lever: 'GeoPoll / KARF validation credential', why: 'Empirical audience validation justifies premium ad rates', value: 'Indirect (rate premium)', cost: 'KSh 500K–1M', diff: 'Medium', ref: '2.7' },
    { id: 11, lever: 'Merchandise print-on-demand', why: 'Captures fan affinity with zero inventory working capital risk', value: 'KSh 200K–500K net', cost: 'Low', diff: 'Low', ref: '5.15' },
    { id: 12, lever: 'Live events ticketing', why: 'Converts passionate radio listenership into paid concert gates', value: 'KSh 500K–3M / yr', cost: 'High', diff: 'High', ref: 'Rec. Future' },
  ];

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                PART 7 · THE GAP AUDIT (CENTREPIECE)
              </span>
              <h4 className="font-display text-paper text-base font-semibold">
                The Three Board-Mandated Audit Checklists
              </h4>
              <p className="text-xs text-sage mt-0.5">
                The centrepiece Ownership requested: Every proposal omission, operational item, and forgotten strategy systematically verified.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-moss/20 text-emerald-300 border border-moss/60 font-semibold">
                Audit Status: 100% Resolved
              </span>
            </div>
          </div>

          {/* Checklist Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-hairline text-xs font-mono">
            <button
              onClick={() => setActiveChecklist('A')}
              className={`pb-2.5 px-3 border-b-2 font-semibold transition-all ${
                activeChecklist === 'A'
                  ? 'border-brass text-brass'
                  : 'border-transparent text-sage hover:text-paper'
              }`}
            >
              Checklist A — 20 Proposal Gaps
            </button>
            <button
              onClick={() => setActiveChecklist('B')}
              className={`pb-2.5 px-3 border-b-2 font-semibold transition-all ${
                activeChecklist === 'B'
                  ? 'border-brass text-brass'
                  : 'border-transparent text-sage hover:text-paper'
              }`}
            >
              Checklist B — 40 Operational Items
            </button>
            <button
              onClick={() => setActiveChecklist('C')}
              className={`pb-2.5 px-3 border-b-2 font-semibold transition-all ${
                activeChecklist === 'C'
                  ? 'border-brass text-brass'
                  : 'border-transparent text-sage hover:text-paper'
              }`}
            >
              Checklist C — 12 Omitted Strategies
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-dim pointer-events-none" />
            <input
              type="text"
              placeholder="Search across gap audits, items, owners, or fixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ink border border-hairline rounded pl-9 pr-3 py-2 text-paper focus:border-brass focus:outline-none text-xs font-mono"
            />
          </div>

          {/* CHECKLIST A: 20 PROPOSAL COMPLETENESS GAPS */}
          {activeChecklist === 'A' && (
            <div className="space-y-3">
              <div className="text-xs text-sage font-mono flex items-center justify-between">
                <span>Displaying 20 Foundational Proposal Gaps Fixed in v2.0</span>
                <span className="text-emerald-400 font-semibold">20 / 20 Closed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-hairline text-sage-dim">
                      <th className="py-2 pr-2">Gap #</th>
                      <th className="py-2 px-2">v1.0 Status & Defect</th>
                      <th className="py-2 px-2">Why It Matters to Ownership</th>
                      <th className="py-2 px-2">v2.0 Rigorous Fix</th>
                      <th className="py-2 pl-2">Section Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {checklistA
                      .filter((g) =>
                        g.v1.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.fix.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.why.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((g) => (
                        <tr key={g.id} className="hover:bg-ink">
                          <td className="py-2.5 pr-2 font-bold text-brass">Gap {g.id}</td>
                          <td className="py-2.5 px-2 text-rose-300 font-semibold">{g.v1}</td>
                          <td className="py-2.5 px-2 text-sage font-body">{g.why}</td>
                          <td className="py-2.5 px-2 text-paper font-medium">{g.fix}</td>
                          <td className="py-2.5 pl-2 text-emerald-400 font-semibold whitespace-nowrap">{g.ref}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHECKLIST B: 40 OPERATIONAL BUILD ITEMS */}
          {activeChecklist === 'B' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-sage">Complete 40-Item Operational Procurement & Resourcing Register</span>
                <div className="flex items-center gap-1 overflow-x-auto">
                  {['all', 'Equipment', 'Software', 'Personnel', 'Regulatory', 'Partnership', 'Data', 'Brand', 'Capability'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                        categoryFilter === cat ? 'bg-brass text-ink font-bold' : 'bg-ink text-sage hover:text-paper'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-hairline text-sage-dim">
                      <th className="py-2 pr-2">#</th>
                      <th className="py-2 px-2">Operational Item</th>
                      <th className="py-2 px-2">Category</th>
                      <th className="py-2 px-2">Required By</th>
                      <th className="py-2 px-2">Indicative Cost (KSh)</th>
                      <th className="py-2 px-2">Owner</th>
                      <th className="py-2 pl-2">v1.0 Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {checklistB
                      .filter((b) => (categoryFilter === 'all' || b.cat === categoryFilter))
                      .filter((b) =>
                        b.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.cat.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-ink">
                          <td className="py-2.5 pr-2 font-bold text-sage-dim">{b.id}</td>
                          <td className="py-2.5 px-2 font-bold text-paper">{b.item}</td>
                          <td className="py-2.5 px-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-ink border border-hairline text-sage">
                              {b.cat}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-brass font-medium">{b.when}</td>
                          <td className="py-2.5 px-2 text-emerald-400 font-semibold">{b.cost}</td>
                          <td className="py-2.5 px-2 text-paper">{b.owner}</td>
                          <td className="py-2.5 pl-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              b.v1 === 'Absent' ? 'bg-brick/30 text-rose-300' :
                              b.v1 === 'Implied' ? 'bg-amber-950/40 text-amber-300' : 'bg-moss/20 text-emerald-300'
                            }`}>
                              {b.v1}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHECKLIST C: 12 STRATEGY GAPS OMITTED */}
          {activeChecklist === 'C' && (
            <div className="space-y-3">
              <div className="text-xs text-sage font-mono flex items-center justify-between">
                <span>12 Additional Strategic Revenue Levers Omitted in May 2026</span>
                <span className="text-brass font-semibold">12 Reclaimed Levers</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-hairline text-sage-dim">
                      <th className="py-2 pr-2">#</th>
                      <th className="py-2 px-2">Omitted Commercial Lever</th>
                      <th className="py-2 px-2">Strategic Rationale</th>
                      <th className="py-2 px-2">Indicative Value (Tier 2)</th>
                      <th className="py-2 px-2">Cost to Activate</th>
                      <th className="py-2 px-2">Difficulty</th>
                      <th className="py-2 pl-2">Addressed In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {checklistC
                      .filter((c) =>
                        c.lever.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.why.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-ink">
                          <td className="py-2.5 pr-2 font-bold text-brass">{c.id}</td>
                          <td className="py-2.5 px-2 font-bold text-paper">{c.lever}</td>
                          <td className="py-2.5 px-2 text-sage font-body">{c.why}</td>
                          <td className="py-2.5 px-2 text-emerald-400 font-bold whitespace-nowrap">{c.value}</td>
                          <td className="py-2.5 px-2 text-paper whitespace-nowrap">{c.cost}</td>
                          <td className="py-2.5 px-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              c.diff === 'Low' ? 'bg-moss/20 text-emerald-300' :
                              c.diff === 'Medium' ? 'bg-brass/20 text-amber-300' : 'bg-brick/20 text-rose-300'
                            }`}>
                              {c.diff}
                            </span>
                          </td>
                          <td className="py-2.5 pl-2 text-brass font-bold whitespace-nowrap">{c.ref}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
