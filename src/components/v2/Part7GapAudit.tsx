import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, Search, Filter, 
  Layers, Package, FileCheck, ArrowUpRight 
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';
import { checklistA, checklistB, checklistC } from '../../content/data/gaps';
import { ToolkitInline } from '../toolkit/ToolkitInline';

export function Part7GapAudit() {
  const [activeChecklist, setActiveChecklist] = useState<'A' | 'B' | 'C'>('A');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Checklist A: 20 Proposal Completeness Gaps
    // Checklist B: 40 Operational Build Items
    // Checklist C: 12 Strategy Gaps Firefly v1.0 Omitted
    return (
    <div className="space-y-6">
      <ToolkitInline ids={['workbench']} />

      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-xs font-mono text-brass uppercase tracking-widest font-semibold block">
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

              <div tabIndex={0} role="region" aria-label="Scrollable table" className="overflow-x-auto">
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
                <div tabIndex={0} role="region" aria-label="Scrollable table" className="flex items-center gap-1 overflow-x-auto">
                  {['all', 'Equipment', 'Software', 'Personnel', 'Regulatory', 'Partnership', 'Data', 'Brand', 'Capability'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded text-xs uppercase ${
                        categoryFilter === cat ? 'bg-brass text-ink font-bold' : 'bg-ink text-sage hover:text-paper'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div tabIndex={0} role="region" aria-label="Scrollable table" className="overflow-x-auto">
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
                            <span className="px-1.5 py-0.5 rounded text-xs bg-ink border border-hairline text-sage">
                              {b.cat}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-brass font-medium">{b.when}</td>
                          <td className="py-2.5 px-2 text-emerald-400 font-semibold">{b.cost}</td>
                          <td className="py-2.5 px-2 text-paper">{b.owner}</td>
                          <td className="py-2.5 pl-2">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
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

              <div tabIndex={0} role="region" aria-label="Scrollable table" className="overflow-x-auto">
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
                            <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
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
