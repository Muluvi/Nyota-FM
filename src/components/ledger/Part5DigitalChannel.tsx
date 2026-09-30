import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import PlatformBars from '../PlatformBars';
import DashboardMockup from '../DashboardMockup';

export function Part5DigitalChannel() {
  const channelTable = [
    { platform: 'Facebook', role: 'Community + livestream', format: 'Live, video, posts', cadence: '14 / week', kpi: 'Reach, engagement', monetisation: 'Branded content, livestream sponsors' },
    { platform: 'WhatsApp', role: 'Direct relationship', format: 'Channels, lists, status', cadence: 'Daily', kpi: 'Opt-in contacts', monetisation: 'Engagement products, retainers' },
    { platform: 'TikTok', role: 'Discovery + culture', format: 'Short vertical video', cadence: '12 / week', kpi: 'Views, follows', monetisation: 'Branded clips, creator deals' },
    { platform: 'YouTube', role: 'Long-form + live', format: 'Episodes, live, Shorts', cadence: '4 / week + live', kpi: 'Watch time', monetisation: 'AdSense, sponsorship' },
    { platform: 'Instagram', role: 'Reels + community', format: 'Reels, Stories, Lives', cadence: '10 / week', kpi: 'Saves, shares', monetisation: 'Branded Reels' },
    { platform: 'X', role: 'Live news + Spaces', format: 'Posts, threads, Spaces', cadence: '21 / week', kpi: 'Real-time reach', monetisation: 'Sponsored coverage' },
    { platform: 'LinkedIn', role: 'B2B credibility', format: 'Articles, updates', cadence: '3 / week', kpi: 'Advertiser trust', monetisation: 'Lead generation' },
    { platform: 'Spotify / Apple', role: 'Podcast distribution', format: 'Podcast episodes', cadence: 'Weekly drops', kpi: 'Listens', monetisation: 'Podcast sponsorship' },
    { platform: 'Zeno.fm / TuneIn', role: 'Live audio simulcast', format: 'Live stream', cadence: 'Continuous', kpi: 'Concurrent listeners', monetisation: 'Pre-roll, simulcast ads' },
  ];

  const derivativeMap = [
    { asset: 'Full replay (long-form)', dest: 'YouTube' },
    { asset: '3–5 short vertical clips', dest: 'TikTok, Instagram Reels, YouTube Shorts' },
    { asset: 'Audio episode', dest: 'Spotify, Apple Podcasts' },
    { asset: '2–3 quote / moment cards', dest: 'Facebook, Instagram, X' },
    { asset: 'Livestream VOD', dest: 'Facebook' },
    { asset: 'Teaser + link', dest: 'WhatsApp Channel' },
  ];

  return (
    <div className="space-y-12">
      {/* Chapter 19 — The Channel Mix */}
      <div id="chapter-19" className="space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part V • Chapter 19</div>
          <h3 className="font-display text-paper text-2xl">The Channel Mix: Platform-by-Platform</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "A radio station that lives only on the dial reaches yesterday’s audience. The channel mix is how Nyota FM meets Western Kenya wherever it already is."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">19.1 The Master Channel Table</h4>

          {/* Visual Platform Reach Bars */}
          <div className="my-4 p-4 bg-ink rounded border border-hairline">
            <div className="text-eyebrow text-brass mb-3">Key Platform Reach Benchmark in Kenya</div>
            <PlatformBars />
          </div>

          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 19.1 — The Master Channel Table Across the Ten-Platform Presence</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="pb-2 font-normal">Platform</th>
                    <th className="pb-2 font-normal">Primary Role</th>
                    <th className="pb-2 font-normal">Cadence</th>
                    <th className="pb-2 font-normal">Monetisation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {channelTable.map((c, idx) => (
                    <tr key={idx} className="hover:bg-ink">
                      <td className="py-2.5 font-body font-medium text-brass">{c.platform}</td>
                      <td className="py-2.5 text-paper">{c.role}</td>
                      <td className="py-2.5 text-sage">{c.cadence}</td>
                      <td className="py-2.5 text-moss">{c.monetisation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LedgerCard>

          <h4 className="font-display text-paper text-base pt-2">19.2 The Ten Platforms Explained</h4>
          <ul className="space-y-2 list-disc list-inside text-xs">
            <li><strong className="text-paper">Facebook:</strong> Remains the centre of community gravity, hosting daily livestreams and major community engagement.</li>
            <li><strong className="text-paper">WhatsApp:</strong> The most valuable relationship layer for 1-to-1 opt-in loyalty and commerce.</li>
            <li><strong className="text-paper">TikTok:</strong> The primary discovery engine for Luhya humour, music and presentation talent.</li>
            <li><strong className="text-paper">YouTube:</strong> The long-form home and living archive. Livestreams, full episodes, and music sessions.</li>
            <li><strong className="text-paper">Instagram:</strong> Focuses on visually led community moments via Reels and Stories.</li>
            <li><strong className="text-paper">X:</strong> The real-time, civic discussion layer. Best suited for breaking news and election reporting.</li>
            <li><strong className="text-paper">LinkedIn:</strong> Advertiser- and B2B-facing credibility.</li>
            <li><strong className="text-paper">Spotify & Apple Podcasts:</strong> Serve as the enduring podcast archive for the flagship pre-recorded shows.</li>
            <li><strong className="text-paper">Zeno.fm / TuneIn:</strong> Preserves existing concurrent online listeners globally.</li>
          </ul>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">D:</strong> A disciplined ten-platform presence is the primary engine for growing addressable contacts to 250,000.</p>
          </div>
        </div>
      </div>

      {/* Chapter 20 — Content Engine Logic */}
      <div id="chapter-20" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part V • Chapter 20</div>
          <h3 className="font-display text-paper text-2xl">Content Engine Logic</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "The cheapest content is content you have already made. The anchor-and-derivative model turns one broadcast hour into a day’s worth of cross-platform assets."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">20.1 The Model:</strong> Every filmed live broadcast hour is the anchor. From it, the production team derives eight to twelve assets through a fixed clip-to-platform mapping, so derivation is a routine, not a creative scramble.
          </p>

          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 20.1 — Standard Anchor-to-Derivative Map</div>
            <div className="divide-y divide-hairline">
              {derivativeMap.map((d, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-body font-medium text-paper">{d.asset}</span>
                  <span className="font-mono text-brass">{d.dest}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">A:</strong> Multiplies sellable inventory per broadcast hour.</p>
            <p><strong className="text-paper">B:</strong> Lowers content cost per asset, improving the margin.</p>
          </div>
        </div>
      </div>

      {/* Chapter 21 — Community Management & Paid Media */}
      <div id="chapter-21" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part V • Chapter 21</div>
          <h3 className="font-display text-paper text-2xl">Community Management & Paid Media: Strategic Rationale</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "A community is built in the replies. Paid media just accelerates it."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            Two disciplines turn an audience into a community. The first is <strong className="text-paper">responsiveness</strong>: a community is built in the replies, which means the station must answer its audience promptly and warmly across every channel, to defined service levels. The second is <strong className="text-paper">paid amplification</strong>: a modest, well-structured paid-media programme accelerates follower growth, lead generation and market-share pushes far faster than organic reach alone.
          </p>
          <p>
            Operating detail — channel response-time SLAs and tiered monthly paid-media budgets — is consolidated in Chapter 25.
          </p>

          {/* Interactive Mobile Weekly Operational Report Mockup */}
          <div className="my-6">
            <div className="text-eyebrow text-brass mb-3 text-center">Interactive Mobile Weekly Report Console (Tap Tabs)</div>
            <DashboardMockup />
          </div>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">E:</strong> Fast, warm, consistent response drives loyalty.</p>
            <p><strong className="text-paper">D:</strong> Paid amplification accelerates the 250,000-contact goal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
