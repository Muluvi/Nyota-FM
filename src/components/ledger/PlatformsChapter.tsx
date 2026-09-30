import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { Radio, MessageSquare, Video, Camera, Mic, Share2 } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  reach: string;
  role: string;
  demographic: string;
  ugcMechanism: string;
  revenueModel: string;
}

const PLATFORMS: Platform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    reach: '69.9%',
    role: 'The Digital Baraza & Town Square',
    demographic: 'Ages 25–55+, dominant in rural sub-counties, pre-installed on Androids',
    ugcMechanism: 'Soko la Leo: Traders send WhatsApp stall photos; Nyota publishes with vendor M-Pesa Till tags',
    revenueModel: 'Sponsored posts (KES 10k–30k/post), branded show live streams, pinned sponsor banners',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Channels & Groups',
    reach: '56.0%',
    role: 'The Direct Community Telephone Line',
    demographic: 'Universal across all age brackets; voice notes eliminate reading barriers',
    ugcMechanism: 'Sauti ya Wananchi: Daily voice notes submitted by listeners, played on-air and clipped into channel',
    revenueModel: 'Sponsored broadcast alerts, exclusive dealer discount codes, weekly market bulletin sponsorships',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    reach: '30.3%',
    role: 'The Youth Culture & Virality Catalyst',
    demographic: 'Ages 16–32, explosive video engagement, fast algorithm dissemination',
    ugcMechanism: 'Nyota Challenge: Presenter comedy skits and street dance challenges in Luhya vernacular and Sheng',
    revenueModel: 'TikTok LIVE virtual gifts converted to cash, youth brand influencer ambassadorships',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    reach: '22.0%',
    role: 'The Premium Brand Showcase',
    demographic: 'Ages 18–35, urban professionals, university students, corporate decision-makers',
    ugcMechanism: 'Behind-the-Mic visual stories, event photo galleries, presenter style spotlights',
    revenueModel: 'High-margin corporate brand campaigns, banking and telco agency placement packages',
  },
];

export function PlatformsChapter() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('facebook');
  const [activeAtomStep, setActiveAtomStep] = useState<number | null>(null);

  const atomNodes = [
    { label: 'TikTok Clip', format: '30s Vertical Hook', reach: 'High Virality', icon: Video },
    { label: 'Facebook Live', format: '15m Studio Baraza', reach: 'Local Community', icon: Share2 },
    { label: 'WhatsApp Audio', format: '60s Voice Note', reach: 'Direct CRM', icon: MessageSquare },
    { label: 'YouTube Archive', format: 'Full Audio-Visual', reach: 'Long-Tail Search', icon: Camera },
    { label: 'X (Twitter) Flash', format: 'Quote Card & Poll', reach: 'Influencer & Policy', icon: Radio },
  ];

  const currentPlatform = PLATFORMS.find(p => p.id === selectedPlatform) || PLATFORMS[0];

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        A regional radio station cannot treat social media as an afterthought. Each digital channel must perform an exact job: Facebook acts as the municipal town hall, WhatsApp is the private baraza, TikTok captures the youth, and Instagram establishes commercial credibility with national advertisers.
      </p>

      {/* Platform Penetration Ledger */}
      <div className="space-y-1">
        <div className="text-eyebrow text-sage-dim pb-2">National & Regional Audience Reach</div>
        <LedgerRow label="Facebook Regional Penetration" value="69.9%" valueColor="brass" />
        <LedgerRow label="WhatsApp Daily Active Users" value="56.0%" valueColor="brass" />
        <LedgerRow label="TikTok Regional Growth Rate" value="30.3%" />
        <LedgerRow label="Instagram Urban Reach" value="22.0%" />
      </div>

      {/* Interactive Platform Deep Dive */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-3">Platform Strategy • Select Network</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {PLATFORMS.map(p => {
            const isSelected = p.id === selectedPlatform;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlatform(p.id)}
                className={`py-2 px-3 rounded text-center border transition-all ${
                  isSelected
                    ? 'border-brass bg-ink text-paper'
                    : 'border-hairline bg-ink-2 text-sage hover:border-sage-dim'
                }`}
              >
                <div className="font-body text-xs font-medium">{p.name}</div>
                <div className="font-mono text-[10px] text-brass">{p.reach}</div>
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-ink border border-hairline rounded space-y-3">
          <div className="flex items-center justify-between border-b border-hairline pb-2">
            <span className="font-display text-paper text-base">{currentPlatform.role}</span>
            <span className="font-mono text-xs text-brass">Target {currentPlatform.reach}</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="font-body text-sage-dim block uppercase tracking-wider text-[10px]">Audience Core:</span>
              <span className="font-body text-paper">{currentPlatform.demographic}</span>
            </div>
            <div>
              <span className="font-body text-sage-dim block uppercase tracking-wider text-[10px]">UGC Campaign Mechanism:</span>
              <span className="font-body text-paper">{currentPlatform.ugcMechanism}</span>
            </div>
            <div>
              <span className="font-body text-sage-dim block uppercase tracking-wider text-[10px]">Commercial Model:</span>
              <span className="font-mono text-moss">{currentPlatform.revenueModel}</span>
            </div>
          </div>
        </div>
      </LedgerCard>

      {/* Content Atomization Framework */}
      <LedgerCard className="p-6 border-brass/40">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
          <div>
            <div className="text-eyebrow text-brass">Production Efficiency</div>
            <h3 className="font-display text-paper text-lg">The 1-to-5 Content Atomization Engine</h3>
          </div>
          <span className="font-mono text-xs text-sage">NO EXTRA AIRTIME</span>
        </div>

        <p className="font-body text-sage text-xs mb-6 leading-relaxed">
          Broadcasting staff are not asked to produce separate content for every app. A single 1-hour in-studio radio show is automatically atomized into 5 distinct digital assets. Tap any output node to inspect its deployment.
        </p>

        {/* Studio Core */}
        <div className="p-3 bg-ink border border-brass rounded text-center mb-4">
          <div className="flex items-center justify-center gap-2 text-brass mb-1">
            <Mic size={16} />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">1 Live Radio Broadcast Hour</span>
          </div>
          <span className="font-body text-sage text-[11px]">Primary Master Audio Capture in Studio Nook</span>
        </div>

        {/* Atomized Nodes */}
        <div className="space-y-2">
          {atomNodes.map((node, idx) => {
            const isSelected = activeAtomStep === idx;
            const Icon = node.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveAtomStep(isSelected ? null : idx)}
                className={`w-full text-left p-3 rounded border transition-all flex items-center justify-between ${
                  isSelected ? 'border-brass bg-ink' : 'border-hairline bg-ink-2 hover:border-sage-dim'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-ink border border-hairline text-brass">
                    <Icon size={14} />
                  </div>
                  <div>
                    <span className="font-body text-xs font-medium text-paper block">{node.label}</span>
                    <span className="font-mono text-[10px] text-sage-dim">{node.format}</span>
                  </div>
                </div>
                <span className="font-mono text-xs text-brass">{node.reach}</span>
              </button>
            );
          })}
        </div>
      </LedgerCard>
    </div>
  );
}
