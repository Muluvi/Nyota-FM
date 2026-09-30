import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { ShieldAlert, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface RiskItem {
  id: string;
  risk: string;
  severity: 'Medium' | 'High';
  mitigation: string;
}

const RISKS: RiskItem[] = [
  {
    id: 'r1',
    risk: 'Frequent KPLC Grid Outages in Rural Western Kenya',
    severity: 'High',
    mitigation: 'Dual 20,000mAh heavy-duty power banks power phones and LED panels for 14 hours continuously without main grid power.',
  },
  {
    id: 'r2',
    risk: 'Unstable Mobile Internet & Fiber Connection Drops',
    severity: 'Medium',
    mitigation: 'Dual-SIM 4G MiFi router running concurrent Safaricom and Airtel connections with auto-failover during live baraza streams.',
  },
  {
    id: 'r3',
    risk: 'Defamation & Media Council of Kenya (MCK) Fines',
    severity: 'High',
    mitigation: '7-second broadcast delay buffer on call-in voice notes and mandatory editorial review before posting any community grievance clip.',
  },
  {
    id: 'r4',
    risk: 'Staff Poaching After Training in Digital Production',
    severity: 'Medium',
    mitigation: 'Performance-based revenue share: Presenters earn 10% commission on any local SME sponsor they bring to their live social segments.',
  },
];

export function ConclusionChapter() {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const toggleRisk = (id: string) => {
    setExpandedRisk(expandedRisk === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        The investment required to execute Nyota FM’s "Twang’aa" transformation is deliberately modest, self-sustaining, and protected against downside risks. We are not asking the board for speculative millions—we are requesting a targeted capital allocation to unlock immediate commercial cashflow.
      </p>

      {/* The Financial Ask Ledger */}
      <div className="space-y-1">
        <div className="text-eyebrow text-brass pb-2">The Capital Request Summary</div>
        <LedgerRow 
          label="One-Time Capital Expenditure (15-Item Hardware)" 
          value="KES 123,000" 
        />
        <LedgerRow 
          label="Monthly Operational Runway (3 Months @ KES 45,000)" 
          value="KES 135,000" 
        />
        <LedgerRow 
          label="Total Initial Investment Requested" 
          value="KES 258,000" 
          valueColor="brass" 
        />
        <LedgerRow 
          label="Projected Cashflow Breakeven" 
          value="Month 04" 
          valueColor="brass" 
        />
        <LedgerRow 
          label="Estimated 2028 Gross Revenue Multiple" 
          value="2.4× Baseline" 
          valueColor="brass" 
        />
      </div>

      {/* Breakeven Horizon Ledger Card */}
      <LedgerCard className="p-6 border-brass/40">
        <div className="text-eyebrow text-brass mb-1">Cashflow Projection</div>
        <h3 className="font-display text-paper text-lg mb-4">6-Month Breakeven Trajectory</h3>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="text-sage">Month 01 (Setup & Training)</span>
            <span className="text-brick">-KES 45,000 net</span>
            <span className="text-sage-dim">Capex deployed</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="text-sage">Month 02 (WhatsApp Launch)</span>
            <span className="text-brick">-KES 20,000 net</span>
            <span className="text-sage-dim">First SME ads</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="text-sage">Month 03 (Street Team Rollout)</span>
            <span className="text-sage">-KES 5,000 net</span>
            <span className="text-sage-dim">Market sponsorships</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-hairline bg-ink px-2 rounded">
            <span className="text-brass font-semibold">Month 04 (BREAKEVEN)</span>
            <span className="text-moss font-bold">+KES 35,000 net</span>
            <span className="text-brass">Self-sustaining</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="text-sage">Month 05 (TikTok Sprint)</span>
            <span className="text-moss">+KES 75,000 net</span>
            <span className="text-sage-dim">Agribusiness partners</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sage">Month 06 (Full Horizon)</span>
            <span className="text-moss font-semibold">+KES 140,000 net</span>
            <span className="text-moss">Surplus to station</span>
          </div>
        </div>
      </LedgerCard>

      {/* Risk Mitigation Ledger */}
      <LedgerCard className="p-6">
        <div className="flex items-center gap-2 text-eyebrow text-sage-dim mb-1">
          <ShieldAlert size={14} className="text-brick" />
          <span>Operational Risk Management</span>
        </div>
        <h3 className="font-display text-paper text-lg mb-4">Downside Protection & Protocols</h3>

        <div className="space-y-2">
          {RISKS.map((r) => {
            const isExpanded = expandedRisk === r.id;
            return (
              <div key={r.id} className="border border-hairline rounded bg-ink overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleRisk(r.id)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-ink-2 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      r.severity === 'High' ? 'bg-brick/20 text-brick border border-brick/30' : 'bg-sage-dim/20 text-sage'
                    }`}>
                      {r.severity}
                    </span>
                    <span className="font-body text-xs text-paper font-medium">{r.risk}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={14} className="text-sage" /> : <ChevronDown size={14} className="text-sage" />}
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-hairline text-xs font-body text-sage leading-relaxed bg-ink-2">
                    <span className="font-mono text-[10px] text-brass uppercase block mt-2 mb-1">Station Countermeasure:</span>
                    {r.mitigation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </LedgerCard>

      {/* Editorial Policy Code */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Compliance & Integrity</div>
        <h3 className="font-display text-paper text-lg mb-4">The Nyota FM Editorial Code</h3>

        <div className="space-y-3 text-xs font-body">
          <div className="p-2.5 bg-ink rounded border border-hairline">
            <span className="font-mono text-brass font-medium block mb-1">01. Cultural Respect & Dignity</span>
            <span className="text-sage">All content broadcast or published must honor the cultural heritage of Western Kenya’s Luhya, Teso, and Luo communities.</span>
          </div>
          <div className="p-2.5 bg-ink rounded border border-hairline">
            <span className="font-mono text-brass font-medium block mb-1">02. Strict Non-Partisanship</span>
            <span className="text-sage">No political candidates may purchase exclusive editorial control; civic barazas must provide balanced community representation.</span>
          </div>
          <div className="p-2.5 bg-ink rounded border border-hairline">
            <span className="font-mono text-brass font-medium block mb-1">03. Fact Verification on Market Prices</span>
            <span className="text-sage">Every agricultural rate posted under "Soko la Leo" must be corroborated with at least two verified stall owners before broadcast.</span>
          </div>
        </div>
      </LedgerCard>

      {/* Executive Sign-off Block */}
      <LedgerCard className="p-6 border-hairline bg-ink text-center">
        <div className="w-10 h-10 rounded-full border border-brass text-brass flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={20} />
        </div>
        <h4 className="font-display text-base text-paper mb-1">Authorization & Adoption</h4>
        <p className="font-body text-xs text-sage mb-6">
          Presented to the Board of Directors, Nyota FM Broadcasting Services Ltd.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-hairline text-left text-xs">
          <div>
            <span className="font-mono text-[10px] text-sage-dim uppercase block">Managing Director:</span>
            <span className="font-body text-paper font-medium block mt-1">Brian Muluvi</span>
            <span className="font-mono text-[10px] text-sage block">Firefly Management Advisory</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-sage-dim uppercase block">Status:</span>
            <span className="font-mono text-moss font-semibold block mt-1">READY FOR EXECUTION</span>
            <span className="font-mono text-[10px] text-sage block">Financial Year 2026/2027</span>
          </div>
        </div>
      </LedgerCard>
    </div>
  );
}
