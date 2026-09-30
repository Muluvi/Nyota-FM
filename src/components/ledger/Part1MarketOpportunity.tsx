import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import Scoreboard from '../Scoreboard';

export function Part1MarketOpportunity() {
  const tamCounties = [
    { county: 'Bungoma', pop: '≈ 2.07M', cluster: 'Bukusu, Tachoni, Sabaot' },
    { county: 'Kakamega', pop: '≈ 2.07M', cluster: 'Maragoli, Isukha, Idakho, Tiriki' },
    { county: 'Trans Nzoia', pop: '≈ 1.06M', cluster: 'Bukusu, Sabaot, mixed' },
    { county: 'Busia', pop: '≈ 0.97M', cluster: 'Samia, Khayo, Marachi, Teso' },
    { county: 'Vihiga', pop: '≈ 0.64M', cluster: 'Maragoli, Tiriki, Banyore' },
  ];

  const capabilityGaps = [
    { cap: 'Regional reach', mulembe: 'High', west: 'High', sulwe: 'Medium', nyota: 'Medium' },
    { cap: 'Visual / AV production', mulembe: 'Partial', west: 'Partial', sulwe: 'Low', nyota: 'Low' },
    { cap: 'Directly-addressable audience', mulembe: 'Low', west: 'Low', sulwe: 'Low', nyota: 'Very low' },
    { cap: 'Commercial diversification', mulembe: 'Medium', west: 'Medium', sulwe: 'Low', nyota: 'Low' },
    { cap: 'Civic / data positioning', mulembe: 'Low', west: 'Low', sulwe: 'Low', nyota: 'Latent strength' },
  ];

  const objectivesScorecard = [
    { obj: 'A — Increased revenue streams', target: 'From spot-dominant to a diversified 8-stream portfolio' },
    { obj: 'B — Increased revenue', target: '≈ 2.4× current baseline; 40% non-spot by Q4 2027' },
    { obj: 'C — Increased market share', target: '#1 vernacular position in Bungoma & Trans Nzoia by GeoPoll Q4 2027' },
    { obj: 'D — Audience community building', target: '250,000 directly-addressable contacts by month 24' },
    { obj: 'E — Growth of loyalty', target: 'Rising weekly active listener hours, repeat-caller frequency, Net Listener Score' },
  ];

  return (
    <div className="space-y-12">
      {/* Chapter 1: The Western Kenya Media Landscape, 2026 */}
      <div id="chapter-1" className="space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part I • Chapter 1</div>
          <h3 className="font-display text-paper text-2xl">The Western Kenya Media Landscape, 2026</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "You cannot lead a market you have not sized. This chapter establishes the ground on which every later decision stands."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">1.1 Five-County Total Addressable Market</h4>
          <p>
            Nyota FM’s natural addressable market is the contiguous Luhya-speaking belt of five counties. Using the 2019 Kenya Population and Housing Census as the base and applying standard national growth projections to 2025–2026, the combined population is approximately 7.2 million people — a market larger than several entire East African broadcast territories.
          </p>

          {/* Table 1.1 */}
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 1.1 — Five-County TAM (KNBS 2019 base with projections to 2025/26)</div>
            <div className="divide-y divide-hairline">
              {tamCounties.map((c, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-body font-medium text-paper block">{c.county}</span>
                    <span className="text-[11px] text-sage-dim">{c.cluster}</span>
                  </div>
                  <span className="font-mono text-brass font-medium">{c.pop}</span>
                </div>
              ))}
              <div className="py-2.5 flex items-center justify-between text-xs font-semibold bg-ink px-2 rounded mt-1">
                <span className="font-body text-paper">Total Addressable Market (TAM)</span>
                <span className="font-mono text-brass">≈ 7.2 Million</span>
              </div>
            </div>
          </LedgerCard>

          <h4 className="font-display text-paper text-base pt-2">1.2 The Vernacular Fragmentation Thesis</h4>
          <p>
            Western Kenya hosts an unusually dense field of stations: Mulembe FM, West FM, Sulwe FM, Ingo FM, Imani Radio, Radio Mambo, Radio Simba 91.3, Khendo FM, Mumbo FM, Tandaza FM, Sasa Radio and others. This density is routinely read as a barrier. We read it the opposite way. Fragmentation means no incumbent commands consolidated loyalty, consolidated data or consolidated commercial weight. The region is waiting for a consolidator — a station that speaks the whole Luhya story rather than a single sub-county slice of it.
          </p>

          <h4 className="font-display text-paper text-base pt-2">1.3 The Generational Shift</h4>
          <p>
            The decisive change is generational. A digital-native Luhya audience now lives on Facebook, TikTok, WhatsApp and YouTube as naturally as its parents lived on the dial. This audience does not abandon radio; it expects radio to meet it on screen, on demand and in conversation. A station that remains audio-only is not merely old-fashioned — it is invisible to the cohort that will define the next decade of listening and spending.
          </p>

          <h4 className="font-display text-paper text-base pt-2">1.4 Why “Hapa Tulipo, Twang’aa” Is the Right Promise</h4>
          <p>
            The tagline already carries the strategy. <strong className="text-paper">Hapa Tulipo</strong> — right here, where we are — asserts rootedness and pride of place; <strong className="text-paper">Twang’aa</strong> — we shine — asserts ambition and excellence. Together they promise a station that is unapologetically of Western Kenya yet refuses to be provincial. That is precisely the positioning the consolidator role requires, and it is already yours.
          </p>

          {/* Contribution to Ownership Objectives Box */}
          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">C:</strong> Sizing the five-county TAM and the fragmentation whitespace defines the path to the #1 vernacular position.</p>
            <p><strong className="text-paper">A:</strong> Mapping competitor weaknesses identifies the revenue-stream gaps Nyota FM can occupy first.</p>
          </div>
        </div>
      </div>

      {/* Chapter 2: Nyota FM Today: A Diagnostic */}
      <div id="chapter-2" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part I • Chapter 2</div>
          <h3 className="font-display text-paper text-2xl">Nyota FM Today: A Diagnostic</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "An honest baseline is the most valuable asset in any transformation. This is where Nyota FM stands before the work begins."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">2.1 Brand Asset Audit</h4>
          <p>
            Nyota FM enters this transformation with genuine equity: a memorable name, a locked frequency at 107.3 FM, a strategically sharp tagline, and existing brand artefacts including an app icon, a brand pattern, lanyards and merchandise such as branded mugs. What is missing is system — a codified visual, sonic and application identity that holds together across studio, screen, street and shelf. The brand is real; it is simply not yet engineered for scale.
          </p>

          <h4 className="font-display text-paper text-base pt-2">2.2 Programming Inventory</h4>
          <p>
            Current programming is built around live presenter-led dayparts in Swahili and the Luhya cluster. It is warm and locally credible but largely undifferentiated from competitors, lightly packaged for sponsorship, and almost entirely audio-only — meaning none of it currently generates the video, clip and on-demand assets that modern advertisers increasingly expect to buy.
          </p>

          <h4 className="font-display text-paper text-base pt-2">2.3 Digital Footprint Baseline</h4>
          <p>
            The digital baseline is modest and, importantly, measurable. As at the reference period the station shows approximately 5,740 Facebook followers, roughly 2,000 concurrent online listeners via Zeno.fm, and an active but under-leveraged YouTube channel. These are foundations, not achievements — and the gap between them and a directly-addressable audience of a quarter-million is the core growth opportunity quantified later in this plan.
          </p>

          <h4 className="font-display text-paper text-base pt-2">2.4 Revenue Mix</h4>
          <p>
            The current revenue mix is dominated by traditional spot advertising, with limited outside-broadcast income and negligible digital, engagement-product or merchandise revenue. Precise figures await an audited baseline; the mix is therefore characterised here qualitatively and modelled illustratively in Part IV — The Revenue Architecture.
          </p>

          <h4 className="font-display text-paper text-base pt-2">2.5 Capability Gaps Versus the Competitive Set</h4>
          
          {/* Live Competitor Follower Gap Scoreboard */}
          <div className="my-4">
            <Scoreboard />
          </div>

          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 2.1 — Indicative Capability Comparison</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="pb-2 font-normal">Capability</th>
                    <th className="pb-2 font-normal">Mulembe FM</th>
                    <th className="pb-2 font-normal">West FM</th>
                    <th className="pb-2 font-normal">Sulwe FM</th>
                    <th className="pb-2 font-semibold text-brass">Nyota FM Today</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {capabilityGaps.map((g, idx) => (
                    <tr key={idx} className="hover:bg-ink">
                      <td className="py-2.5 font-body text-paper">{g.cap}</td>
                      <td className="py-2.5 text-sage">{g.mulembe}</td>
                      <td className="py-2.5 text-sage">{g.west}</td>
                      <td className="py-2.5 text-sage">{g.sulwe}</td>
                      <td className="py-2.5 text-brass font-medium">{g.nyota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-[10px] text-sage-dim mt-2 pt-2 border-t border-hairline">
              * Competitor ratings are qualitative estimates pending audited data.
            </div>
          </LedgerCard>

          {/* Contribution Box */}
          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">E:</strong> A measurable baseline of listener hours and caller behaviour establishes the starting point for loyalty growth.</p>
            <p><strong className="text-paper">D:</strong> The 5,740-follower and ~2,000-listener baseline frames the 250,000-contact community target.</p>
          </div>
        </div>
      </div>

      {/* Chapter 3: The 2028 Ambition */}
      <div id="chapter-3" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part I • Chapter 3</div>
          <h3 className="font-display text-paper text-2xl">The 2028 Ambition</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Ambition without numbers is a slogan. This chapter fixes both the position to win and the figures by which winning will be judged."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">3.1 Three Positioning Options</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-ink border border-hairline rounded">
              <span className="font-body font-medium text-brick block">The Hits Station</span>
              <p className="text-sage mt-0.5">Compete on music and personality alone. <strong className="text-brick">Rejected:</strong> easily matched, commercially shallow, and culturally thin against entrenched rivals.</p>
            </div>
            <div className="p-3 bg-ink border border-hairline rounded">
              <span className="font-body font-medium text-brick block">The News & Talk Authority</span>
              <p className="text-sage mt-0.5">Compete on information and debate. <strong className="text-brick">Rejected:</strong> strong but narrow, and vulnerable to national networks with deeper newsrooms.</p>
            </div>
            <div className="p-3 bg-ink border border-brass/50 rounded">
              <span className="font-body font-medium text-brass block">The Cultural and Civic Anchor</span>
              <p className="text-paper mt-0.5">Fuse culture, music, civic trust and multi-platform reach into a single consolidating identity. <strong className="text-moss">Recommended.</strong></p>
            </div>
          </div>

          <h4 className="font-display text-paper text-base pt-2">3.2 The Recommended Position</h4>
          <p>
            We recommend Nyota FM commit to becoming <strong className="text-paper">“The Cultural and Civic Anchor of Western Kenya — Pan-Luhya, Pan-Generational, Twang’aa Always.”</strong> This position is defensible because it compounds: cultural authority earns trust, trust earns civic relevance, civic relevance earns a directly-addressable community, and that community is the foundation of diversified, defensible revenue. No competitor currently occupies it, and the tagline already articulates it.
          </p>

          <h4 className="font-display text-paper text-base pt-2">3.3 The Five Objectives, Restated With Targets</h4>
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 3.1 — The Five-Point Ownership Scorecard</div>
            <div className="divide-y divide-hairline">
              {objectivesScorecard.map((item, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
                  <span className="font-body font-medium text-paper sm:w-1/2">{item.obj}</span>
                  <span className="font-mono text-brass sm:w-1/2 sm:text-right">{item.target}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          {/* Contribution Box */}
          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">A:</strong> Defines the eight-stream destination that every commercial chapter builds toward.</p>
            <p><strong className="text-paper">B:</strong> Sets the 2.4× revenue ambition and the 40% non-spot mix as the financial spine of the plan.</p>
            <p><strong className="text-paper">C:</strong> Names the specific GeoPoll-measured share positions to be claimed by Q4 2027.</p>
            <p><strong className="text-paper">D:</strong> Establishes the 250,000-contact community as a board-level target, not an aspiration.</p>
            <p><strong className="text-paper">E:</strong> Introduces the loyalty indices, including the Net Listener Score defined later.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
