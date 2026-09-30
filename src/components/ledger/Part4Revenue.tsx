import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import RevenueChart from '../RevenueChart';
import TouchpointFilter from '../TouchpointFilter';

export function Part4Revenue() {
  const tentpoleActivations = [
    { tentpole: 'Bukusu Cultural Weekend', county: 'Bungoma', theme: 'Heritage, music and identity' },
    { tentpole: 'Maize Harvest Festival', county: 'Trans Nzoia', theme: 'Agriculture, trade and prosperity' },
    { tentpole: 'Trans Nzoia Trade Expo', county: 'Trans Nzoia', theme: 'Business, SME and commerce' },
    { tentpole: 'Mulembe Music & Youth Fest', county: 'Kakamega', theme: 'Youth, music and creators' },
  ];

  const eightStreams = [
    { num: 'i', name: 'Spot Advertising', def: 'Traditional on-air spots', scale: 'Core base, defended and grown' },
    { num: 'ii', name: 'Outside Broadcasts & Activations', def: 'Roadshows and live events', scale: 'Significant, high-margin' },
    { num: 'iii', name: 'Branded / Sponsored Shows', def: 'The four pre-recorded shows + sponsored live', scale: 'Premium, recurring' },
    { num: 'iv', name: 'WhatsApp & USSD Products', def: 'Engagement and service products', scale: 'Recurring, scalable' },
    { num: 'v', name: 'Digital Advertising', def: 'Web, app and social inventory', scale: 'Growing with audience' },
    { num: 'vi', name: 'Live Events & Ticketing', def: 'Concerts and ticketed gatherings', scale: 'Episodic, high-upside' },
    { num: 'vii', name: 'Merchandise', def: 'The twelve-SKU catalogue', scale: 'Brand-building, modest margin' },
    { num: 'viii', name: 'Syndication & Licensing', def: 'Content licensing and affiliate', scale: 'Emerging, second-year' },
  ];

  return (
    <div className="space-y-12">
      {/* Chapter 15 — Streams 1 & 2 */}
      <div id="chapter-15" className="space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part IV • Chapter 15</div>
          <h3 className="font-display text-paper text-2xl">Streams 1 & 2: Traditional / On-Air, Outside Broadcasts</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Radio that leaves the studio becomes a place people gather. The outside-broadcast circuit turns Hapa Tulipo from a tagline into a recurring physical experience."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">15.1 The Hapa Tulipo Branded Roadshow Circuit:</strong> Takes Nyota FM into the markets, campuses, churches and town centres of the five counties — each stop a live broadcast, a content shoot, a sponsor showcase and a community celebration at once.
          </p>

          <h4 className="font-display text-paper text-base pt-2">15.2 Quarterly Tentpole Activations</h4>
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 15.1 — Four Proposed Quarterly Tentpole Activations</div>
            <div className="divide-y divide-hairline">
              {tentpoleActivations.map((t, idx) => (
                <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="sm:w-1/2">
                    <span className="font-body font-semibold text-paper block">{t.tentpole}</span>
                    <span className="font-mono text-brass text-[11px]">{t.county} County</span>
                  </div>
                  <span className="font-body text-sage sm:w-1/2 sm:text-right">{t.theme}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          <p>
            <strong className="text-paper">15.3 Sponsor Packaging Logic:</strong> Sponsorship is packaged at category level — headline partner, category-exclusive supporting partners, and local activation partners — so that each event monetises multiple non-competing brands while protecting the experience from clutter.
          </p>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">A:</strong> Establishes the outside-broadcast and events revenue streams (streams II and VI).</p>
            <p><strong className="text-paper">C:</strong> Physical presence across all five counties builds reach and share where rivals are absent.</p>
            <p><strong className="text-paper">D:</strong> Every activation is an opt-in acquisition event feeding the addressable community.</p>
            <p><strong className="text-paper">E:</strong> Recurring local gatherings create the strongest possible sense of belonging.</p>
          </div>
        </div>
      </div>

      {/* Chapter 16 & 17 — Mobile Layer & Digital, Govt, Grants */}
      <div id="chapter-16-17" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part IV • Chapters 16 & 17</div>
          <h3 className="font-display text-paper text-2xl">Streams 3, 4, 5 & 6: Mobile, Digital & Government Engines</h3>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <div>
            <h4 className="font-display text-paper text-base mb-1">Chapter 16 — The Mobile Revenue Engines (WhatsApp & USSD)</h4>
            <p>
              WhatsApp is where Western Kenya already lives; USSD reaches every remaining listener with no data required. Together they cover the whole audience and form the single largest contributor to the 250,000-contact target. The strategic commitment is to own the relationship layer rather than rent reach from social platforms.
            </p>
          </div>

          <div>
            <h4 className="font-display text-paper text-base mb-1">Chapter 17 — Native App, Web Flagship & Government/Grants</h4>
            <p>
              An Android-first native app offers livestreaming, replays, push alerts and loyalty club. Simultaneously, Nyota FM registers as an approved vendor with the Government Advertising Agency (GAA) and partners with development organisations to underwrite civic programmes like <em className="text-paper not-italic">Sauti ya Nchi</em>.
            </p>
          </div>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">D:</strong> Opt-in WhatsApp, USSD and owned app installs are durable components of the addressable community.</p>
            <p><strong className="text-paper">A:</strong> Establishes engagement-products (stream IV) and digital advertising (stream V).</p>
          </div>
        </div>
      </div>

      {/* Chapter 18 — Consolidated Revenue Stream Map */}
      <div id="chapter-18" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part IV • Chapter 18</div>
          <h3 className="font-display text-paper text-2xl">The Consolidated Revenue Stream Map (Eight Streams)</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "A station dependent on one revenue stream is one bad quarter from crisis. Eight streams are how Nyota FM becomes resilient as well as profitable."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 18.1 — The Eight-Stream Revenue Portfolio</div>
            <div className="divide-y divide-hairline">
              {eightStreams.map((s, idx) => (
                <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="sm:w-1/2">
                    <span className="font-mono text-brass font-bold mr-2">{s.num}.</span>
                    <span className="font-body font-semibold text-paper">{s.name}</span>
                    <span className="text-[11px] text-sage-dim block sm:inline sm:ml-2 sm:before:content-['—_']">{s.def}</span>
                  </div>
                  <span className="font-mono text-moss text-right sm:w-1/2">{s.scale}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          <h4 className="font-display text-paper text-base pt-2">18.2 24-Month Revenue Trajectory</h4>
          <p>
            Targeting 2.4× growth with a 40% non-spot mix. The trajectory tracks two series — Traditional Spot and New Non-Spot — across Q1–Q8 (indicative index 0–240), with the studio Phase 2 milestone marked mid-track. By Q4 2027, roughly 40% of revenue arrives from streams ii–viii, transforming Nyota FM into a diversified regional media enterprise.
          </p>

          {/* Interactive Revenue Growth Scrubber Chart */}
          <div className="my-6">
            <div className="text-eyebrow text-brass mb-2">Interactive 12-Month Revenue Curve Scrubber</div>
            <RevenueChart />
          </div>

          {/* 39 Commercial Touchpoints Filter */}
          <div className="my-8 pt-6 border-t border-hairline">
            <div className="text-eyebrow text-brass mb-1">Commercial Inventory Directory</div>
            <h4 className="font-display text-paper text-lg mb-2">39 Granular Digital & BTL Sponsoring Touchpoints</h4>
            <p className="text-xs text-sage mb-4 leading-relaxed">
              Explore inventory units across Video, Metadata, Social, Exclusive, and BTL. Every touchpoint is pre-packaged with recommended pricing in KES:
            </p>
            <TouchpointFilter />
          </div>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">A:</strong> Explicit articulation of the eight-stream commercial objective.</p>
            <p><strong className="text-paper">B:</strong> Underpins the 2.4× revenue multiple and 40% non-spot diversification ambition.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
