import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { VisionInfographic } from './VisionInfographic';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function ExecutiveSummaryPillars() {
  const pillars = [
    {
      title: 'Brand System',
      desc: 'Extend inherited Nyota equity into a complete visual, sonic and application identity worthy of regional leadership.',
    },
    {
      title: 'Studio Transformation',
      desc: 'Convert audio-only broadcast into an audio-visual production hub, turning every hour on air into multi-platform inventory.',
    },
    {
      title: 'Programming Reinvention',
      desc: 'A disciplined daypart strategy plus four Firefly-produced pre-recorded shows engineered for sponsorship and derivative content.',
    },
    {
      title: 'Digital Channel Architecture',
      desc: 'A platform-by-platform engine spanning social, WhatsApp Business API, USSD, app and web, all feeding a directly-addressable audience.',
    },
    {
      title: 'Commercial & Events Architecture',
      desc: 'Diversification from spot-ad dependence to an eight-stream revenue portfolio anchored by a branded outside-broadcast circuit.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Lead Text */}
      <div className="p-4 bg-ink-2 border-l-2 border-brass rounded">
        <p className="font-display italic text-paper text-base sm:text-lg leading-snug">
          "Five fragmented counties, seven million people, and no consolidating vernacular voice. The station that becomes that voice will own Western Kenya’s media decade. This is the plan for Nyota FM to be that station."
        </p>
      </div>

      {/* The Opportunity */}
      <div>
        <div className="text-eyebrow text-brass mb-2">The Market Opening</div>
        <h3 className="font-display text-paper text-xl mb-3">The Whitespace in Western Kenya</h3>
        <p className="font-body text-sage text-base leading-relaxed">
          Western Kenya — Bungoma, Kakamega, Busia, Vihiga and Trans Nzoia — is home to an estimated 7.2 million people and is the most fragmented vernacular radio region in the country. More than a dozen stations compete for the Luhya ear, yet none has fused cultural authority, civic trust, multi-platform reach and commercial discipline into a single dominant brand. Mulembe FM leads on legacy reach; nobody yet leads on the future. That whitespace is the prize.
        </p>
      </div>

      {/* Infographic Component */}
      <VisionInfographic />

      {/* The Five-Pillar Plan */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Strategic Architecture</div>
        <h3 className="font-display text-paper text-lg mb-4">The Five-Pillar Transformation Plan</h3>

        <div className="space-y-3">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-3 bg-ink rounded border border-hairline flex items-start gap-3">
              <span className="font-mono text-xs text-brass font-semibold shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <div>
                <h4 className="font-body font-medium text-paper text-sm mb-1">{p.title}</h4>
                <p className="font-body text-sage text-xs leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </LedgerCard>

      {/* The Numbers & Financial Spine */}
      <div className="space-y-1">
        <div className="text-eyebrow text-sage-dim pb-2">The Indicative Financial Spine</div>
        <LedgerRow 
          label="24-Month Revenue Trajectory Multiple" 
          value="≈ 2.4× Baseline" 
          valueColor="brass" 
        />
        <LedgerRow 
          label="Target Non-Spot Revenue Contribution" 
          value="40% by Q4 2027" 
          valueColor="brass" 
        />
        <LedgerRow 
          label="Studio Transformation Indicative Capex Envelope" 
          value="KSh 12.7M – 21.3M" 
        />
        <LedgerRow 
          label="Studio Build Capital Phasing Window" 
          value="18 Months (3 Phases)" 
        />
        <LedgerRow 
          label="Directly-Addressable Contacts Community Target" 
          value="250,000 by Month 24" 
          valueColor="brass" 
        />
      </div>

      {/* The 24-Month Path Summary */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Execution Sequence</div>
        <h3 className="font-display text-paper text-lg mb-3">The 24-Month Staged Path</h3>
        <p className="font-body text-sage text-xs leading-relaxed mb-4">
          Execution unfolds quarter by quarter: brand and Studio Phase 1 in the opening half-year; live visual streaming and the first pre-recorded shows by the end of Quarter 2; USSD, the mobile app beta and the outside-broadcast programme through Quarters 3 and 4; and full multi-platform capability, syndication and independent GeoPoll validation across the second year. A joint steering committee governs the work throughout.
        </p>
      </LedgerCard>

      {/* The Ask of Ownership (Summary) */}
      <LedgerCard className="p-6 border-brass/50 bg-ink">
        <div className="text-eyebrow text-brass mb-1">Mandate & Action</div>
        <h3 className="font-display text-paper text-lg mb-3">The Ask of Ownership</h3>
        <p className="font-body text-sage text-xs leading-relaxed mb-4">
          We ask Ownership to approve the transformation thesis and the twenty-four-month roadmap; to commit capital to Studio Phase 1; to authorise procurement of the brand system and the engagement of a messaging partner and the Communications Authority for WhatsApp and USSD provisioning; to endorse the four pre-recorded shows; and to constitute the joint steering committee.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-brass">
          <span>Detailed in Chapter 26 with all six governance resolutions</span>
          <ArrowRight size={14} />
        </div>
      </LedgerCard>
    </div>
  );
}
