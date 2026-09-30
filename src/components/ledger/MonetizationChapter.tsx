import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { Smartphone, Check, ArrowRight, DollarSign, Activity } from 'lucide-react';

interface CommercialPackage {
  id: string;
  name: string;
  clientTarget: string;
  deliverables: string;
  rate: number;
  period: string;
}

const PACKAGES: CommercialPackage[] = [
  { id: 'p1', name: 'Market Day Takeover', clientTarget: 'Agro-dealers & FMCG brands', deliverables: 'BTL on-ground booth + 12 spot ads + WhatsApp market broadcast', rate: 35000, period: 'per activation' },
  { id: 'p2', name: 'Breakfast Show Live Sponsor', clientTarget: 'Banks, Saccos & Telecoms', deliverables: 'Facebook Live banner + 2 live presenter mentions daily + logo in video', rate: 45000, period: 'per month' },
  { id: 'p3', name: 'Boda Stage Visibility Blitz', clientTarget: 'Motorbike dealers & lubricants', deliverables: '100 branded reflector jackets + 2 stage metal umbrellas + on-air promos', rate: 25000, period: 'per campaign' },
  { id: 'p4', name: 'Daily WhatsApp Market Alert', clientTarget: 'Seed companies & wholesalers', deliverables: 'Branded header on 7:00 AM agricultural price broadcast to 25k subscribers', rate: 20000, period: 'per month' },
  { id: 'p5', name: 'TikTok Youth Viral Sprint', clientTarget: 'Beverages, fashion & colleges', deliverables: '3 presenter comedy challenge skits in vernacular + branded music tag', rate: 30000, period: 'per campaign' },
  { id: 'p6', name: 'Agrovet Planting Season Bundle', clientTarget: 'Fertilizer & tractor firms', deliverables: 'Dedicated 30-min weekly farmers talk show + field visit coverage', rate: 50000, period: 'per season' },
  { id: 'p7', name: 'County Governance Baraza', clientTarget: 'County ministries & NGOs', deliverables: 'Outside Broadcast (OB) truck + live streaming civic town hall', rate: 60000, period: 'per broadcast' },
  { id: 'p8', name: 'Obituary & Memorial Package', clientTarget: 'Families & welfare groups', deliverables: '3 on-air announcements + branded Facebook photo tribute page', rate: 5000, period: 'per notice' },
  { id: 'p9', name: 'Sunday Gospel Partner', clientTarget: 'Local churches & choirs', deliverables: 'Sponsorship of Sunday morning worship + choir audio podcast link', rate: 15000, period: 'per month' },
  { id: 'p10', name: 'SME Market Stall Spot', clientTarget: 'Town traders & hardware shops', deliverables: '10 short spot ads + 1 WhatsApp directory listing', rate: 8000, period: 'per month' },
];

export function MonetizationChapter() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('p1');
  const [packageQty, setPackageQty] = useState<number>(1);

  // M-Pesa Stepper State
  const [mpesaAmount, setMpesaAmount] = useState<number>(250);
  const [mpesaStep, setMpesaStep] = useState<number>(1); // 1: Select, 2: Prompting, 3: Success

  const activePackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const calculatedPackageTotal = activePackage.rate * packageQty;

  const handleSimulateMpesa = () => {
    setMpesaStep(2);
    setTimeout(() => {
      setMpesaStep(3);
    }, 1800);
  };

  const resetMpesa = () => {
    setMpesaStep(1);
  };

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        Diversification is the bedrock of Nyota FM’s financial health. By unlocking digital channels and BTL on-ground experiences alongside traditional radio airtime, the station decouples its cashflow from volatile national agency ad-spend.
      </p>

      {/* Revenue Streams Overview Ledger */}
      <div className="space-y-1">
        <div className="text-eyebrow text-sage-dim pb-2">Target Monthly Revenue Breakdown • Q4 2027</div>
        <LedgerRow label="Traditional Spot Ads & Jingles (60%)" value="KES 420,000" />
        <LedgerRow label="BTL Market-Day Activations & OBs" value="KES 140,000" valueColor="brass" />
        <LedgerRow label="Digital & Social Media Sponsorships" value="KES 85,000" valueColor="brass" />
        <LedgerRow label="WhatsApp Channel Paid Bulletins" value="KES 35,000" valueColor="brass" />
        <LedgerRow label="Direct M-Pesa Community Contributions" value="KES 20,000" valueColor="brass" />
        <LedgerRow label="Total Monthly Gross Run-Rate" value="KES 700,000" valueColor="brass" />
      </div>

      {/* Commercial Packages & Live Rate Calculator */}
      <LedgerCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-hairline gap-2">
          <div>
            <div className="text-eyebrow text-brass">Commercial Rate Card</div>
            <h3 className="font-display text-paper text-lg">Top 10 Commercial Advertising Packages</h3>
          </div>
          <span className="font-mono text-xs text-sage">STANDARDIZED RATES</span>
        </div>

        <p className="font-body text-sage text-xs mb-4">
          Select an advertising package to test unit pricing and multi-booking volume discounts:
        </p>

        {/* Package Dropdown / Selector */}
        <div className="space-y-3 mb-6">
          <div className="space-y-1.5">
            <label className="text-eyebrow text-sage-dim block">Select Package:</label>
            <select
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
              className="w-full bg-ink border border-hairline rounded p-2.5 text-xs text-paper font-body focus:border-brass focus:outline-none"
            >
              {PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — KES {pkg.rate.toLocaleString('en-KE')} ({pkg.period})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-ink border border-hairline rounded">
            <div className="flex items-center gap-3">
              <span className="text-xs text-sage font-body">Booking Quantity:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 4, 8].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setPackageQty(q)}
                    className={`w-7 h-7 rounded text-xs font-mono transition-colors ${
                      packageQty === q
                        ? 'bg-brass text-ink font-semibold'
                        : 'bg-ink-2 text-sage border border-hairline hover:text-paper'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-sage-dim block uppercase">CALCULATED VALUE</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-brass">
                KES {calculatedPackageTotal.toLocaleString('en-KE')}
              </span>
            </div>
          </div>
        </div>

        {/* Active Package Specification */}
        <div className="p-3.5 bg-ink border border-brass/30 rounded text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-hairline pb-2">
            <span className="font-body font-medium text-paper">{activePackage.name}</span>
            <span className="font-mono text-moss">Target: {activePackage.clientTarget}</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-sage-dim uppercase tracking-wider block">Deliverables Package:</span>
            <span className="font-body text-sage leading-relaxed">{activePackage.deliverables}</span>
          </div>
        </div>
      </LedgerCard>

      {/* Interactive M-Pesa Listener Till Stepper */}
      <LedgerCard className="p-6 border-brass/40">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
          <div>
            <div className="text-eyebrow text-brass">Direct Listener Support</div>
            <h3 className="font-display text-paper text-lg">M-Pesa Buy Goods Till Simulator</h3>
          </div>
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-moss/20 text-moss border border-moss/30">
            TILL: 882910
          </span>
        </div>

        <p className="font-body text-sage text-xs mb-4 leading-relaxed">
          In Western Kenya, listeners voluntarily support vernacular stations through "Kununua Chai ya Presenter" (Buying Tea for the Presenter) via M-Pesa. Test the real-time contribution flow below:
        </p>

        {mpesaStep === 1 && (
          <div className="space-y-4">
            <div className="text-eyebrow text-sage-dim">Select Contribution Amount (KES):</div>
            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMpesaAmount(amt)}
                  className={`py-2 text-center rounded border font-mono text-xs transition-all ${
                    mpesaAmount === amt
                      ? 'border-brass bg-ink text-brass font-semibold'
                      : 'border-hairline bg-ink text-sage hover:border-sage-dim'
                  }`}
                >
                  KES {amt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSimulateMpesa}
              className="w-full py-3 bg-brass text-ink font-body text-sm font-semibold rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Simulate STK Push on Listener Android</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {mpesaStep === 2 && (
          <div className="py-6 text-center space-y-3 bg-ink border border-hairline rounded">
            <div className="inline-block w-6 h-6 border-2 border-brass border-t-transparent rounded-full animate-spin" />
            <p className="font-body text-xs text-paper">
              Prompting Safaricom SIM Menu on Tecno Handset...
            </p>
            <span className="font-mono text-[11px] text-sage-dim">
              "Pay KES {mpesaAmount} to NYOTA FM BROADCASTING TILL 882910? Enter PIN:"
            </span>
          </div>
        )}

        {mpesaStep === 3 && (
          <div className="space-y-3">
            <div className="p-4 bg-ink border border-moss/60 rounded space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-moss/20 text-moss border border-moss flex items-center justify-center mx-auto">
                <Check size={16} />
              </div>
              <h4 className="font-display text-sm text-paper">Contribution Confirmed</h4>
              <p className="font-mono text-xs text-brass">
                CONFIRMATION: QKD829H12 • KES {mpesaAmount}.00 RECEIVED
              </p>
              <div className="mt-3 pt-3 border-t border-hairline text-left text-xs text-sage space-y-1">
                <span className="text-[10px] font-mono text-sage-dim block uppercase">On-Air Automation Action:</span>
                <span className="font-body text-paper block">
                  Presenter studio tablet flashes: "Asante sana Wafula from Vihiga for KES {mpesaAmount} chai!"
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetMpesa}
              className="w-full py-2 bg-ink border border-hairline text-sage text-xs font-mono rounded hover:text-paper"
            >
              Test Another Contribution
            </button>
          </div>
        )}
      </LedgerCard>

      {/* Live Operational Cockpit Mockup */}
      <LedgerCard className="p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-moss" />
            <h3 className="font-display text-paper text-lg">Station Cockpit & KPIs</h3>
          </div>
          <span className="font-mono text-[10px] text-moss uppercase tracking-wider">MONTH 6 PROJECTION</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="text-[10px] font-mono text-sage-dim block uppercase">Monthly Non-Spot Revenue</span>
            <span className="font-mono text-lg font-semibold text-brass">KES 185,000</span>
          </div>
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="text-[10px] font-mono text-sage-dim block uppercase">WhatsApp CRM Community</span>
            <span className="font-mono text-lg font-semibold text-paper">28,400</span>
          </div>
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="text-[10px] font-mono text-sage-dim block uppercase">Monthly Video Views</span>
            <span className="font-mono text-lg font-semibold text-paper">340,000</span>
          </div>
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="text-[10px] font-mono text-sage-dim block uppercase">Advertiser Retention Rate</span>
            <span className="font-mono text-lg font-semibold text-moss">84.2%</span>
          </div>
        </div>

        <div className="text-[11px] font-body text-sage leading-relaxed">
          Every KPI is logged directly in an open Google Sheets ledger audited weekly by the station manager and board treasurer.
        </div>
      </LedgerCard>
    </div>
  );
}
