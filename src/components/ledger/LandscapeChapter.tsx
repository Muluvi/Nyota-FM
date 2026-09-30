import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { AnimatedNumber } from './AnimatedNumber';

export function LandscapeChapter() {
  const [activeFunnel, setActiveFunnel] = useState<number | null>(null);

  const funnelStages = [
    {
      stage: '01. Awareness',
      reach: '450,000',
      rate: '100%',
      desc: 'On-air broadcast listeners reached across 5 Western Kenya counties via FM frequencies.',
    },
    {
      stage: '02. Digital Engagement',
      reach: '85,000',
      rate: '18.8%',
      desc: 'Active social media interactions, Facebook video views, and TikTok clip shares per month.',
    },
    {
      stage: '03. Direct CRM Community',
      reach: '25,000',
      rate: '5.5%',
      desc: 'Subscribed WhatsApp Channel members and verified phone contacts in listener database.',
    },
    {
      stage: '04. Direct Monetization',
      reach: '4,200',
      rate: '0.9%',
      desc: 'Direct contributors via M-Pesa Till, paid market-alert subscribers, and BTL event ticket buyers.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Chapter Overview Text */}
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        Western Kenya's broadcast market is undergoing a structural shift. While traditional FM airtime remains the primary trust anchor, listener loyalty and commercial budgets have migrated into smartphone feeds, WhatsApp groups, and on-ground market days.
      </p>

      {/* Market Indicators Ledger */}
      <div className="space-y-1">
        <div className="text-eyebrow text-sage-dim pb-2">Macro Market Indicators • Western Kenya</div>
        <LedgerRow 
          label="5-County Total Addressable Market (TAM)" 
          value="7.2M" 
          valueColor="brass" 
        />
        <LedgerRow 
          label="Active Smartphone Penetration in Region" 
          value="48.5%" 
        />
        <LedgerRow 
          label="Daily WhatsApp Voice-Note Preference" 
          value="72.0%" 
        />
        <LedgerRow 
          label="Average Daily Vernacular Radio Consumption" 
          value="3.8 hrs" 
        />
        <LedgerRow 
          label="Listeners Purchasing Daily Mobile Bundles" 
          value="64.2%" 
        />
      </div>

      {/* Audience Funnel Visual */}
      <LedgerCard className="p-6">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline">
          <div>
            <div className="text-eyebrow text-sage-dim">Conversion Architecture</div>
            <h3 className="font-display text-paper text-lg">The Broadcast-to-CRM Funnel</h3>
          </div>
          <span className="font-mono text-xs text-brass">MONTHLY TARGETS</span>
        </div>

        <p className="font-body text-sage text-sm mb-6">
          How Nyota FM transforms passive airwave listeners into directly addressable, monetizable contacts. Tap any stage to inspect the conversion mechanism.
        </p>

        <div className="space-y-3">
          {funnelStages.map((item, idx) => {
            const isSelected = activeFunnel === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveFunnel(isSelected ? null : idx)}
                className={`w-full text-left p-3.5 rounded border transition-all ${
                  isSelected 
                    ? 'border-brass bg-ink' 
                    : 'border-hairline bg-ink-2 hover:border-sage-dim'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm font-medium text-paper">{item.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-sage">{item.rate}</span>
                    <span className="font-mono text-sm text-brass font-medium">{item.reach}</span>
                  </div>
                </div>

                {/* Funnel width visual bar */}
                <div className="w-full h-1.5 bg-ink rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brass transition-all duration-500" 
                    style={{ width: idx === 0 ? '100%' : idx === 1 ? '45%' : idx === 2 ? '22%' : '10%' }}
                  />
                </div>

                {isSelected && (
                  <p className="font-body text-sage text-xs mt-3 pt-2.5 border-t border-hairline leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </LedgerCard>

      {/* Radio vs Digital & BTL Comparative Matrix */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Comparative Analysis</div>
        <h3 className="font-display text-paper text-lg mb-4">Spot Ads vs. The Hybrid Engine</h3>
        
        <div className="space-y-4">
          <div className="p-3.5 bg-ink border border-hairline rounded">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-body text-sm font-medium text-brick">Traditional Spot Airtime Alone</span>
              <span className="font-mono text-xs text-sage-dim">Single Channel</span>
            </div>
            <p className="font-body text-sage text-xs leading-relaxed">
              Passive listening, unverified audience metrics, zero listener phone numbers collected, and vulnerable to national advertising agency budget cuts.
            </p>
          </div>

          <div className="p-3.5 bg-ink border border-brass/40 rounded">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-body text-sm font-medium text-brass">Nyota FM Integrated Ecosystem</span>
              <span className="font-mono text-xs text-moss">Multi-Touchpoint</span>
            </div>
            <p className="font-body text-sage text-xs leading-relaxed">
              Airtime + WhatsApp voice baraza + TikTok viral video + on-ground market activations. Every advertiser gets verifiable engagement, footfall, and lead attribution.
            </p>
          </div>
        </div>
      </LedgerCard>
    </div>
  );
}
