import React, { useState } from 'react';
import { 
  Database, Users, Radio, DollarSign, Smartphone, Video, Scale, BarChart3, 
  ExternalLink, Search, Info, HelpCircle, CheckCircle 
} from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';

export function Part2MasterData() {
  const [activeTab, setActiveTab] = useState<'market' | 'competitors' | 'ad_econ' | 'digital' | 'studio' | 'regulatory' | 'audience' | 'levers'>('market');
  const [tableSearch, setTableSearch] = useState('');

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="p-4 bg-ink-2 rounded border border-hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
              PART 2 · MASTER DATA ANNEXURE
            </span>
            <p className="text-xs text-sage mt-0.5">
              Comprehensive empirical evidence base. Every figure is labelled Tier 1 (Hard Data), Tier 2 (Modelled Estimate), or Tier 0 (Data Gap).
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-moss/20 text-emerald-300 border border-moss/50 font-semibold">Tier 1 Hard</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brass/20 text-amber-300 border border-brass/50 font-semibold">Tier 2 Modelled</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brick/20 text-rose-300 border border-brick/50 font-semibold">Tier 0 Gap</span>
          </div>
        </div>
      </Reveal>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-hairline text-xs font-mono">
        {[
          { id: 'market', label: '2.1 Market Sizing', icon: <Users size={12} /> },
          { id: 'competitors', label: '2.2 Competitor Landscape', icon: <Radio size={12} /> },
          { id: 'ad_econ', label: '2.3 Radio Ad Economics', icon: <DollarSign size={12} /> },
          { id: 'digital', label: '2.4 Digital Economics', icon: <Smartphone size={12} /> },
          { id: 'studio', label: '2.5 Studio & Hardware', icon: <Video size={12} /> },
          { id: 'regulatory', label: '2.6 Regulatory & Rights', icon: <Scale size={12} /> },
          { id: 'audience', label: '2.7 Audience & NLS Formula', icon: <BarChart3 size={12} /> },
          { id: 'levers', label: '2.8 All 14 Revenue Levers', icon: <Database size={12} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 rounded-t flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-ink-2 text-brass border-t border-x border-hairline font-semibold'
                : 'text-sage hover:text-paper hover:bg-ink-2/40'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 2.1: MARKET SIZING */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          {/* 2.1.1 Population */}
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.1.1 Five-County Population Sizing</h4>
                <p className="text-xs text-sage">Official 2019 Census counts with 2025 and 2026 demographic projections</p>
              </div>
              <TierBadge tier={1} citation="KNBS 2019 Census & Bungoma County Projections" url="knbs.or.ke" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="py-2 pr-3">County</th>
                    <th className="py-2 px-3">2019 Census (Tier 1)</th>
                    <th className="py-2 px-3">2025 Projection</th>
                    <th className="py-2 px-3">2026 Projection</th>
                    <th className="py-2 pl-3">Primary Vernacular Cluster</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-paper/90">
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Bungoma</td>
                    <td className="py-2.5 px-3">1,670,570</td>
                    <td className="py-2.5 px-3">1,892,427</td>
                    <td className="py-2.5 px-3 text-emerald-400">1,932,168</td>
                    <td className="py-2.5 pl-3 text-sage">Bukusu, Tachoni, Sabaot</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Kakamega</td>
                    <td className="py-2.5 px-3">1,867,579</td>
                    <td className="py-2.5 px-3 text-amber-300">2,070,000 (est.)</td>
                    <td className="py-2.5 px-3 text-amber-300">2,110,000 (est.)</td>
                    <td className="py-2.5 pl-3 text-sage">Maragoli, Isukha, Idakho, Tiriki</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Trans Nzoia</td>
                    <td className="py-2.5 px-3">990,341</td>
                    <td className="py-2.5 px-3 text-amber-300">1,060,000 (est.)</td>
                    <td className="py-2.5 px-3 text-amber-300">1,080,000 (est.)</td>
                    <td className="py-2.5 pl-3 text-sage">Bukusu, Sabaot, mixed</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Busia</td>
                    <td className="py-2.5 px-3">893,681</td>
                    <td className="py-2.5 px-3 text-amber-300">970,000 (est.)</td>
                    <td className="py-2.5 px-3 text-amber-300">990,000 (est.)</td>
                    <td className="py-2.5 pl-3 text-sage">Samia, Khayo, Marachi, Teso</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Vihiga</td>
                    <td className="py-2.5 px-3">590,013</td>
                    <td className="py-2.5 px-3 text-amber-300">640,000 (est.)</td>
                    <td className="py-2.5 px-3 text-amber-300">650,000 (est.)</td>
                    <td className="py-2.5 pl-3 text-sage">Maragoli, Tiriki, Banyore</td>
                  </tr>
                  <tr className="bg-ink font-bold border-t border-brass/40">
                    <td className="py-3 pr-3 text-paper">Total Addressable Market</td>
                    <td className="py-3 px-3 text-emerald-400">6,012,184</td>
                    <td className="py-3 px-3 text-brass">≈ 6,632,427</td>
                    <td className="py-3 px-3 text-brass">≈ 6,762,168</td>
                    <td className="py-3 pl-3 text-sage-dim">Pan-Luhya Core Basin</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-ink rounded border border-hairline text-xs space-y-1.5 font-body">
              <div className="text-amber-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
                Note on v1.0 Discrepancy (Audited Correction)
              </div>
              <p className="text-sage text-xs leading-relaxed">
                v1.0 stated <em className="text-paper italic">"approximately 7.2 million people."</em> The KNBS-based 2025 projection is approximately 6.6 million. v1.0's figure appears to have been inflated by applying growth rates without adjusting for the 2019 census revision. v2.0 strictly uses the KNBS-derived baseline of <strong>6,632,427 (2025)</strong> and <strong>6,762,168 (2026)</strong>.
              </p>
            </div>
          </div>

          {/* 2.1.2 Radio Penetration & 2.1.3 Device Ownership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2.1.2 Radio Penetration */}
            <div className="bg-ink-2 border border-hairline rounded p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <h4 className="font-display text-paper text-sm font-semibold">2.1.2 Radio Penetration & Listening</h4>
                <TierBadge tier={1} citation="CA Kenya & Media Council of Kenya 2025" url="ca.go.ke" />
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-hairline">
                  <span className="text-sage">Western Kenya Listenership Rate (Q2 2025/26)</span>
                  <span className="text-emerald-400 font-bold">81%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-hairline">
                  <span className="text-sage">National Daily Radio Reach (2023 → 2025)</span>
                  <span className="text-rose-400 font-bold">75% → 41%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-hairline">
                  <span className="text-sage">Weekly Radio Reach Nationally</span>
                  <span className="text-paper font-semibold">~33M listeners</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-sage">Western Kenya Regional Reach (2025)</span>
                  <span className="text-brass font-bold">68.4%</span>
                </div>
              </div>
            </div>

            {/* 2.1.3 Device Ownership */}
            <div className="bg-ink-2 border border-hairline rounded p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <h4 className="font-display text-paper text-sm font-semibold">2.1.3 Device Connectivity (Kenya)</h4>
                <TierBadge tier={1} citation="CA Kenya Sector Statistics 2025/2026" url="ca.go.ke" />
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-hairline">
                  <span className="text-sage">Smartphone Penetration (Dec 2025)</span>
                  <span className="text-emerald-400 font-bold">92.9%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-hairline">
                  <span className="text-sage">Smartphone Connections (June 2026)</span>
                  <span className="text-paper font-bold">52.26 Million</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-hairline">
                  <span className="text-sage">Feature Phone Connections (June 2026)</span>
                  <span className="text-amber-300 font-bold">27.42 Million</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-sage">Strategic Implication</span>
                  <span className="text-brass">Requires WhatsApp + USSD dual layer</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2.1.4 Luhya Sub-Group Distribution */}
          <div className="bg-ink-2 border border-hairline rounded p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-hairline pb-2">
              <h4 className="font-display text-paper text-sm font-semibold">2.1.4 Luhya Sub-Group Geographic Distribution</h4>
              <TierBadge tier={1} citation="Univ of Nairobi E-Repository / Luhya Anthropological Survey" url="erepository.uonbi.ac.ke" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-ink rounded border border-hairline">
                <div className="text-brass font-bold text-base">Bukusu (56%)</div>
                <div className="text-sage text-[11px] mt-1">Bungoma, Trans Nzoia</div>
                <div className="text-sage-dim text-[10px] mt-1">Core primary vernacular audience</div>
              </div>
              <div className="p-3 bg-ink rounded border border-hairline">
                <div className="text-paper font-bold text-base">Maragoli (11%)</div>
                <div className="text-sage text-[11px] mt-1">Vihiga, Kakamega</div>
                <div className="text-sage-dim text-[10px] mt-1">Second largest linguistic sub-group</div>
              </div>
              <div className="p-3 bg-ink rounded border border-hairline">
                <div className="text-sage font-bold text-base">Other Sub-Clusters (33%)</div>
                <div className="text-sage text-[11px] mt-1">Isukha, Idakho, Samia, Khayo, Tiriki</div>
                <div className="text-sage-dim text-[10px] mt-1">Unified via Swahili + Pan-Luhya civic bridge</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.2: COMPETITOR LANDSCAPE */}
      {activeTab === 'competitors' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.2.1 Full Western Kenya Competitor Table (10 Stations)</h4>
                <p className="text-xs text-sage">Licensing, frequencies, ownership backing, and observable commercial operations</p>
              </div>
              <TierBadge tier={1} citation="CA Kenya Licensing Database & RMS Official" url="ca.go.ke" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="py-2 pr-2">Station</th>
                    <th className="py-2 px-2">Frequency</th>
                    <th className="py-2 px-2">Coverage</th>
                    <th className="py-2 px-2">Owner</th>
                    <th className="py-2 px-2">Language</th>
                    <th className="py-2 px-2">Digital Reach</th>
                    <th className="py-2 pl-2">Observable Commercial Behaviour</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-paper/90">
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-emerald-400">Mulembe FM</td>
                    <td className="py-2 px-2">99.0 / 99.2 / 95.8 / 97.9 FM</td>
                    <td className="py-2 px-2">National</td>
                    <td className="py-2 px-2 text-brass">Royal Media Services</td>
                    <td className="py-2 px-2">Luhya</td>
                    <td className="py-2 px-2 text-emerald-400">High (RMS network)</td>
                    <td className="py-2 pl-2 text-sage">Legacy leader; network ad sales; strong FMCG advertiser base</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">West FM</td>
                    <td className="py-2 px-2">94.9 FM</td>
                    <td className="py-2 px-2">Western, N. Rift, E. Uganda</td>
                    <td className="py-2 px-2">West Media Ltd (Indep.)</td>
                    <td className="py-2 px-2">Luhya/Swahili</td>
                    <td className="py-2 px-2 text-amber-300">Moderate</td>
                    <td className="py-2 pl-2 text-sage">Independent; regional focus; traditional spot advertising dominant</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-emerald-400">Sulwe FM</td>
                    <td className="py-2 px-2">89.6 FM</td>
                    <td className="py-2 px-2">Western, Nairobi, N. Rift</td>
                    <td className="py-2 px-2 text-brass">Royal Media Services</td>
                    <td className="py-2 px-2">Bukusu</td>
                    <td className="py-2 px-2 text-amber-300">Moderate</td>
                    <td className="py-2 pl-2 text-sage">RMS-backed Bukusu vernacular leader; minimal multi-platform inventory</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">Ingo FM</td>
                    <td className="py-2 px-2">100.5 / 103.5 FM</td>
                    <td className="py-2 px-2">Western Kenya</td>
                    <td className="py-2 px-2">KBC (State Broadcaster)</td>
                    <td className="py-2 px-2">Luhya</td>
                    <td className="py-2 px-2 text-rose-300">Low</td>
                    <td className="py-2 pl-2 text-sage">State broadcaster; loyal older demographic; limited digital engagement</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">Imani Radio</td>
                    <td className="py-2 px-2">88.8 FM (Kitale)</td>
                    <td className="py-2 px-2">North Rift, Western</td>
                    <td className="py-2 px-2">Independent (Christian)</td>
                    <td className="py-2 px-2">Gospel/English</td>
                    <td className="py-2 px-2 text-rose-300">Low</td>
                    <td className="py-2 pl-2 text-sage">Faith-based format; listener donations + limited church sponsorships</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">Radio Mambo</td>
                    <td className="py-2 px-2">91.7 FM (Webuye)</td>
                    <td className="py-2 px-2">Bungoma County</td>
                    <td className="py-2 px-2">Community / Commercial</td>
                    <td className="py-2 px-2">Luhya</td>
                    <td className="py-2 px-2 text-rose-300">Very Low</td>
                    <td className="py-2 pl-2 text-sage">Hyper-local; narrow coverage; spot rates under KSh 3,000</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">Amaica Radio</td>
                    <td className="py-2 px-2">99.3 FM (Kakamega)</td>
                    <td className="py-2 px-2">Kakamega, Vihiga, Bungoma</td>
                    <td className="py-2 px-2">Amaica Media</td>
                    <td className="py-2 px-2">Multi-lingual</td>
                    <td className="py-2 px-2 text-amber-300">Moderate</td>
                    <td className="py-2 pl-2 text-sage">Youth-focused urban programming; licensed 2025; digital-first experiments</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">Khendo FM</td>
                    <td className="py-2 px-2">107.9 / 102.2 FM</td>
                    <td className="py-2 px-2">Western, E. Uganda</td>
                    <td className="py-2 px-2">Sunlight Media Services</td>
                    <td className="py-2 px-2">Luhya</td>
                    <td className="py-2 px-2 text-rose-300">Low</td>
                    <td className="py-2 pl-2 text-sage">Launched 2021; growing grassroots presence; regional spot advertiser focus</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-paper">Tandaza FM</td>
                    <td className="py-2 px-2">Bungoma</td>
                    <td className="py-2 px-2">Bungoma County</td>
                    <td className="py-2 px-2">Landmerc Limited</td>
                    <td className="py-2 px-2">Luhya</td>
                    <td className="py-2 px-2 text-rose-300">Very Low</td>
                    <td className="py-2 pl-2 text-sage">Hyper-local community station; low commercial footprint</td>
                  </tr>
                  <tr className="bg-brass/10 hover:bg-brass/20 border-t border-brass/50">
                    <td className="py-2.5 pr-2 font-bold text-brass">Nyota FM</td>
                    <td className="py-2.5 px-2 font-bold text-brass">107.3 FM</td>
                    <td className="py-2.5 px-2 text-paper">Bungoma, Western Kenya</td>
                    <td className="py-2.5 px-2 text-brass">Nyota FM Ownership</td>
                    <td className="py-2.5 px-2 text-paper">Swahili, Luhya</td>
                    <td className="py-2.5 px-2 text-sage">~5,740 FB (v1.0)</td>
                    <td className="py-2.5 pl-2 text-paper font-semibold">Transformation target station; transitioning to multi-platform civic anchor</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Competitor Data Gap Card */}
            <div className="p-3.5 bg-brick/20 border border-brick/60 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5 font-mono">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">
                  Identified Data Gap — Competitor Financials
                </span>
                <span className="text-paper/90">
                  Audited financial statements for regional competitors are not publicly published in Kenya.
                </span>
                <span className="text-sage block">
                  Recommended Method: Commission a media-buying agency rate audit or Nielsen/Kantar ad-spend tracking report.
                </span>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-brass font-mono font-bold block">KSh 200,000–500,000</span>
                <span className="text-[10px] font-mono text-sage-dim">Timeline: 4–6 weeks</span>
              </div>
            </div>

            {/* 2.2.2 National Swahili Stations & Critical Insight */}
            <div className="pt-2 border-t border-hairline space-y-3">
              <h5 className="font-display text-sm text-paper font-semibold">2.2.2 National Swahili Stations in Western Kenya</h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-ink rounded border border-hairline">
                  <div className="text-paper font-bold">Radio Citizen (RMS)</div>
                  <div className="text-emerald-400 mt-1">7% Western Reach</div>
                </div>
                <div className="p-2.5 bg-ink rounded border border-hairline">
                  <div className="text-paper font-bold">Radio Maisha (Standard)</div>
                  <div className="text-emerald-400 mt-1">7% Western Reach</div>
                </div>
                <div className="p-2.5 bg-ink rounded border border-hairline">
                  <div className="text-paper font-bold">Radio Jambo (RAG)</div>
                  <div className="text-emerald-400 mt-1">7% Western Reach</div>
                </div>
                <div className="p-2.5 bg-ink rounded border border-hairline">
                  <div className="text-paper font-bold">Radio 47 (Cape Media)</div>
                  <div className="text-brass mt-1">101.2 FM (Kisumu)</div>
                </div>
              </div>

              <div className="p-3 bg-ink rounded border border-brass/40 text-xs font-body leading-relaxed">
                <strong className="text-brass font-mono text-[11px] uppercase tracking-wider block mb-1">
                  Critical Strategic Correction to v1.0's Fragmentation Thesis
                </strong>
                <p className="text-paper/90">
                  v1.0 claimed <em className="text-sage italic">"no consolidating vernacular voice."</em> This is factually incorrect. Mulembe FM (RMS) is the consolidating vernacular voice in Western Kenya. The true whitespace is not that no consolidating voice exists, but that <strong>the legacy consolidating voice is network-run from Nairobi, lacks hyper-local civic data, and possesses zero two-way directly-addressable audience infrastructure</strong>. That is the vulnerable flank Nyota FM attacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.3: RADIO ADVERTISING ECONOMICS */}
      {activeTab === 'ad_econ' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.3.1 Spot Rate Card Benchmarks (30-Second Adverts)</h4>
                <p className="text-xs text-sage">Published prevailing commercial radio rates across dayparts in Kenya</p>
              </div>
              <TierBadge tier={1} citation="Radio.co.ke Commercial Buyer's Guide 2025/2026" url="radio.co.ke" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="py-2 pr-3">Station / Tier</th>
                    <th className="py-2 px-3">Daypart</th>
                    <th className="py-2 px-3">Rate (KSh / 30-Sec)</th>
                    <th className="py-2 pl-3">Commercial Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-paper/90">
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Radio Citizen</td>
                    <td className="py-2.5 px-3">Prime Time (Breakfast / Drive)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">35,000 – 55,000</td>
                    <td className="py-2.5 pl-3 text-sage">National market leader morning slot</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Radio Citizen</td>
                    <td className="py-2.5 px-3">Off-Peak (Midday / Late Night)</td>
                    <td className="py-2.5 px-3">~12,000</td>
                    <td className="py-2.5 pl-3 text-sage">Filler & bulk rotation</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Kiss FM</td>
                    <td className="py-2.5 px-3">Prime Time</td>
                    <td className="py-2.5 px-3">30,000 – 50,000</td>
                    <td className="py-2.5 pl-3 text-sage">Urban youth prime</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Radio Jambo</td>
                    <td className="py-2.5 px-3">Prime</td>
                    <td className="py-2.5 px-3">12,000 – 18,000</td>
                    <td className="py-2.5 pl-3 text-sage">Mass market Swahili drive</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Classic 105</td>
                    <td className="py-2.5 px-3">Morning Drive / Midday</td>
                    <td className="py-2.5 px-3">15,000–25,000 / ~8,000</td>
                    <td className="py-2.5 pl-3 text-sage">Affluent commuter audience</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-sage">Small Regional Station</td>
                    <td className="py-2.5 px-3">Off-Peak</td>
                    <td className="py-2.5 px-3 text-sage-dim">~5,000</td>
                    <td className="py-2.5 pl-3 text-sage">Local SMEs & trading centres</td>
                  </tr>
                  <tr className="bg-brass/15 border-t border-brass/50 font-bold">
                    <td className="py-2.5 pr-3 text-brass">Nyota FM v2.0 Model</td>
                    <td className="py-2.5 px-3 text-paper">Prime / Off-Peak Modelled</td>
                    <td className="py-2.5 px-3 text-brass font-bold">8,000–15,000 / 3,000–6,000</td>
                    <td className="py-2.5 pl-3 text-amber-300">Tier 2 Bankable Rate Card Model</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-sage-dim block">Production & Taxes:</span>
                <span className="text-paper">Ad Production Cost: <strong>KSh 20,000–80,000</strong> per advert</span>
                <span className="text-brass block mt-1">VAT: 16% levied on all commercial billings</span>
              </div>
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-amber-400 block font-semibold uppercase text-[10px]">Tier 2 Derivation Method</span>
                <p className="text-sage font-body text-xs mt-1">
                  Positioning Nyota between "small station" off-peak (KSh 5,000) and Radio Jambo prime (KSh 12,000–18,000), discounted for lower initial baseline reach and rising with GeoPoll panel proof.
                </p>
              </div>
            </div>

            {/* 2.3.2 Sector Spend */}
            <div className="pt-3 border-t border-hairline space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-display text-sm text-paper font-semibold">2.3.2 Sector Radio Ad Spend in Kenya</h5>
                <TierBadge tier={1} citation="CA Kenya Competition Study & ReelAnalytics Ad Spend Report" url="khusoko.com" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-3 bg-ink rounded border border-hairline">
                  <div className="text-sage-dim text-[10px]">Financial Services</div>
                  <div className="text-emerald-400 font-bold text-base mt-1">KSh 1,300M</div>
                  <div className="text-sage text-[10px]">21% of radio spend (#1)</div>
                </div>
                <div className="p-3 bg-ink rounded border border-hairline">
                  <div className="text-sage-dim text-[10px]">Transport Sector</div>
                  <div className="text-paper font-bold text-base mt-1">KSh 727M</div>
                  <div className="text-sage text-[10px]">11% of total spend (#2)</div>
                </div>
                <div className="p-3 bg-ink rounded border border-hairline">
                  <div className="text-sage-dim text-[10px]">Telecoms / Comms</div>
                  <div className="text-paper font-bold text-base mt-1">KSh 302M</div>
                  <div className="text-sage text-[10px]">10% of total spend</div>
                </div>
                <div className="p-3 bg-brick/20 rounded border border-brick/60">
                  <div className="text-rose-400 text-[10px] font-bold">Betting Collapse</div>
                  <div className="text-rose-400 font-bold text-base mt-1">KSh 51M</div>
                  <div className="text-rose-300 text-[10px]">Fell 89% from KSh 513M</div>
                </div>
              </div>
            </div>

            {/* 2.3.3 & 2.3.4 & 2.3.5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-brass font-bold block mb-1">RMS National Hegemony</span>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Royal Media Services accounts for <strong>41% of daily listeners</strong> and &gt;<strong>37% of all radio ad spend</strong> in Kenya (CA Kenya Competition Study).
                </p>
              </div>
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-brass font-bold block mb-1">GAA Registration Path</span>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Government Advertising Agency National Register prequalification. Regional radio stations eligible for national ministry campaigns.
                </p>
                <span className="text-[10px] text-amber-300 block mt-1">Tier 0 Gap: Rate transparency</span>
              </div>
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-brass font-bold block mb-1">County Tenders</span>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Bungoma Assembly tender <code className="text-paper">BGM/CNTY/OT/FWC/05/07/2026-2028</code>. Kakamega County IFMIS media frameworks.
                </p>
                <span className="text-[10px] text-amber-300 block mt-1">Tier 0 Gap: Value disclosure</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.4: DIGITAL PLATFORM ECONOMICS */}
      {activeTab === 'digital' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.4 Digital Platform Economics & Realistic Monetisation</h4>
                <p className="text-xs text-sage">Empirical RPMs, developer API pricing, and monetization limits in Kenya</p>
              </div>
              <TierBadge tier={1} citation="Dynamoi Data, Meta, Africa's Talking & CA Kenya" url="dynamoi.com" />
            </div>

            {/* YouTube & TikTok side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* YouTube */}
              <div className="p-4 bg-ink rounded border border-hairline space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                  <span className="text-paper font-bold">2.4.1 YouTube Economics (Kenya)</span>
                  <TierBadge tier={1} citation="Dynamoi Data 2025–2026" url="dynamoi.com" />
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">Kenya Music Channel RPM</span>
                  <span className="text-emerald-400 font-bold">$0.6719 / 1,000 views</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">Playback CPM</span>
                  <span className="text-paper">$1.1314 / 1,000 views</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">General Kenyan Creator RPM Range</span>
                  <span className="text-amber-300">$0.50–$4.00 (KSh 65–520)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sage">Partner Threshold</span>
                  <span className="text-paper">1,000 subs + 4,000 hrs</span>
                </div>
                <div className="p-2 bg-ink-2 rounded border border-brass/30 text-[11px] font-body text-paper/90">
                  <strong className="text-brass font-mono">Nyota FM Maturity Model:</strong> 50,000–200,000 subscribers with 500,000 monthly views generates <span className="text-brass font-semibold">KSh 50,000–200,000/month</span> in AdSense.
                </div>
              </div>

              {/* TikTok Reality Check */}
              <div className="p-4 bg-brick/15 rounded border border-brick/60 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-brick/40 pb-1.5">
                  <span className="text-rose-400 font-bold">2.4.2 TikTok Kenya Reality Check</span>
                  <TierBadge tier={1} citation="LinkedIn / Jason Corder & Monitor Uganda 2025" url="monitor.co.ug" />
                </div>
                <div className="p-2 bg-ink rounded border border-brick/40 text-[11px] font-body text-paper/90">
                  <strong className="text-rose-400 font-mono block mb-1">CRITICAL FACTUAL CORRECTION TO v1.0:</strong>
                  TikTok Creator Rewards Program is <strong>NOT available in Kenya</strong>. TikTok pays ZERO direct view-based payouts to Kenyan accounts.
                </div>
                <div className="space-y-1 text-sage text-[11px]">
                  <div>• TikTok for Business Kenya: 200+ advertisers active</div>
                  <div>• Creator monetisation limited to: LIVE gifts, diamonds, branded sponsorships</div>
                  <div className="text-brass">• Nyota Strategy: Sell physical brand sponsorships & OB integration, not imaginary platform view checks.</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Business API & USSD Shortcode Costs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* WhatsApp API */}
              <div className="p-4 bg-ink rounded border border-hairline space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                  <span className="text-paper font-bold">2.4.3 WhatsApp Business API (Kenya)</span>
                  <TierBadge tier={1} citation="Meta Rate Card via Ominiflow & Africa's Talking" url="ominiflow.com" />
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">Utility Conversation Rate</span>
                  <span className="text-emerald-400 font-bold">$0.0040 (~KSh 0.52)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">Marketing Conversation Rate</span>
                  <span className="text-amber-300 font-bold">$0.0225 (~KSh 2.90)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">BSP Setup Fee (Africa's Talking)</span>
                  <span className="text-paper">$85 (~KSh 11,000)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sage">BSP Monthly Maintenance</span>
                  <span className="text-paper">$50 (~KSh 6,500/mo)</span>
                </div>
              </div>

              {/* USSD Shortcode */}
              <div className="p-4 bg-ink rounded border border-hairline space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                  <span className="text-paper font-bold">2.4.4 USSD Shortcode Economics</span>
                  <TierBadge tier={1} citation="CA Kenya Fee Schedule & Africa's Talking" url="africastalking.com" />
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">CA 4-Digit Shortcode Allocation</span>
                  <span className="text-paper">KSh 2,500 app + 400,000/yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">CA 5-Digit Allocation (Alternative)</span>
                  <span className="text-emerald-400">KSh 65,000–100,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">Africa's Talking USSD Setup</span>
                  <span className="text-paper">KES 145,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span className="text-sage">AT Monthly Shortcode Maintenance</span>
                  <span className="text-paper">KES 70,000 / month</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sage">Per-Session 20s Safaricom Fee</span>
                  <span className="text-brass">KES 1.00 + KES 0.25 AT infra</span>
                </div>
              </div>
            </div>

            {/* Podcasts & Paid Media */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-brass font-bold block mb-1">2.4.5 African Podcast CPMs</span>
                <p className="text-sage text-[11px] font-body leading-snug">
                  African podcast programmatic CPM is <strong>$3–$8</strong>. Flat sponsorship for top African podcasts commands <strong>$500–$5,000 per episode</strong> (AfroTools).
                </p>
              </div>
              <div className="p-3 bg-ink rounded border border-hairline">
                <span className="text-brass font-bold block mb-1">2.4.6 Paid Media CPMs (Kenya)</span>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Meta Kenya CPM benchmark: <strong>KSh 50–150</strong>. Google Ads: <strong>KSh 30–100</strong>.
                </p>
                <span className="text-[10px] text-amber-300 block mt-1">Tier 0 Gap: Run KSh 10,000 test pilot to lock in sub-county CPMs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.5: STUDIO & HARDWARE */}
      {activeTab === 'studio' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.5 Researched Studio & Production Hardware (Kenyan Vendors)</h4>
                <p className="text-xs text-sage">Empirical quotes from Broadcast Solutions International, Cellular Kenya, Rondamo & Soundproofing Kenya</p>
              </div>
              <TierBadge tier={1} citation="Kenyan Vendor Catalogues (BS Int, Cellular Kenya, Rondamo)" url="bsint.net" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 px-3">Item Description</th>
                    <th className="py-2 px-3">Vendor / Supplier</th>
                    <th className="py-2 px-3">Kenyan Price (KSh)</th>
                    <th className="py-2 pl-3">Source URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-paper/90">
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-brass font-bold">PTZ Camera</td>
                    <td className="py-2 px-3">PTZ Camera KTUH86 (NDI/HDMI, VISCA)</td>
                    <td className="py-2 px-3">Broadcast Solutions Intl</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">114,000</td>
                    <td className="py-2 pl-3 text-sage">bsint.net</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-brass font-bold">PTZ Camera</td>
                    <td className="py-2 px-3">PTZ Camera HD91</td>
                    <td className="py-2 px-3">Broadcast Solutions Intl</td>
                    <td className="py-2 px-3">142,000</td>
                    <td className="py-2 pl-3 text-sage">bsint.net</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-brass font-bold">PTZ Camera</td>
                    <td className="py-2 px-3">PTZ Camera UH71K (NDI, 12x zoom)</td>
                    <td className="py-2 px-3">Broadcast Solutions Intl</td>
                    <td className="py-2 px-3">163,000</td>
                    <td className="py-2 pl-3 text-sage">bsint.net</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-brass font-bold">PTZ Camera</td>
                    <td className="py-2 px-3">CineTreak CT-PT25K 4K PTZ (25x)</td>
                    <td className="py-2 px-3">Elite Aperture Mobitech</td>
                    <td className="py-2 px-3">179,000</td>
                    <td className="py-2 pl-3 text-sage">eamobitech.com</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-emerald-400 font-bold">Switcher</td>
                    <td className="py-2 px-3">Blackmagic ATEM Television Studio HD</td>
                    <td className="py-2 px-3">Cellular Kenya / Nextech</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">154,999 – 174,999</td>
                    <td className="py-2 pl-3 text-sage">cameraplacekenya.com</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-emerald-400 font-bold">Switcher</td>
                    <td className="py-2 px-3">Blackmagic ATEM Television Studio HD8</td>
                    <td className="py-2 px-3">Rondamo Technologies</td>
                    <td className="py-2 px-3">455,800</td>
                    <td className="py-2 pl-3 text-sage">rondamo.co.ke</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-amber-300 font-bold">Lighting</td>
                    <td className="py-2 px-3">VISICO LED-50A 3-Lights Kit</td>
                    <td className="py-2 px-3">Rondamo</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">34,300</td>
                    <td className="py-2 pl-3 text-sage">rondamo.co.ke</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-amber-300 font-bold">Lighting</td>
                    <td className="py-2 px-3">GVM 1500D RGB LED 3-Light Kit</td>
                    <td className="py-2 px-3">Jacaranta Digitech</td>
                    <td className="py-2 px-3">84,500 + VAT</td>
                    <td className="py-2 pl-3 text-sage">jacaranta.co.ke</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-paper font-bold">Acoustics</td>
                    <td className="py-2 px-3">EchoBloc Acoustic Panel (600×600mm)</td>
                    <td className="py-2 px-3">Soundproofing Kenya</td>
                    <td className="py-2 px-3">5,500</td>
                    <td className="py-2 pl-3 text-sage">soundproofingcompany.co.ke</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2 pr-3 text-paper font-bold">Acoustics</td>
                    <td className="py-2 px-3">Studio Fit-Out Package (20–35m²)</td>
                    <td className="py-2 px-3">SUIMAS Interiors</td>
                    <td className="py-2 px-3">120,000 – 350,000</td>
                    <td className="py-2 pl-3 text-sage">suimas.co.ke</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-ink rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div>
                <span className="text-brass font-bold block">Phase 1 Visual Radio Studio Capex:</span>
                <span className="text-paper">Researched Hardware Cost: <strong>KSh 627,299 – 837,299</strong></span>
                <span className="text-sage block mt-0.5">Includes 2× KTUH86 PTZ cameras, ATEM switcher, 3-light kit, acoustic panels & encoder</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold text-sm block">Saves &gt; KSh 1.5M</span>
                <span className="text-sage-dim text-[10px]">vs v1.0's inflated KSh 2.2M–3.8M envelope</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.6: REGULATORY & COMPLIANCE */}
      {activeTab === 'regulatory' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.6 Regulatory & Compliance Mandates</h4>
                <p className="text-xs text-sage">Statutory licensing fees for CA Kenya, Copyright Collective Management Organisations, and ODPC</p>
              </div>
              <TierBadge tier={1} citation="CA Kenya, ODPC Kenya & KECOBO" url="odpc.go.ke" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              {/* CA Broadcasting */}
              <div className="p-4 bg-ink rounded border border-hairline space-y-2">
                <div className="text-paper font-bold border-b border-hairline pb-1">
                  2.6.1 CA Commercial Radio Licence
                </div>
                <div className="text-sage">Application Fee: <strong className="text-paper">KSh 5,000</strong></div>
                <div className="text-sage">Annual Fee: <strong className="text-emerald-400">KSh 100,000</strong></div>
                <div className="text-[10px] text-sage-dim">Or 0.4% of annual turnover, whichever is higher (CA Kenya)</div>
              </div>

              {/* Music Sync Rights */}
              <div className="p-4 bg-ink rounded border border-hairline space-y-2">
                <div className="text-paper font-bold border-b border-hairline pb-1">
                  2.6.2 Music Sync & Performance Rights
                </div>
                <div className="text-sage">• MCSK: Provisional 6-month status</div>
                <div className="text-sage">• KAMP / PRISK: Performers rights</div>
                <div className="text-sage">• PAVRISK: Audiovisual synchronization</div>
                <div className="text-[10px] text-rose-300">Tier 0 Gap: Video streaming sync rates require direct negotiation (4 wks)</div>
              </div>

              {/* Data Protection Act 2019 */}
              <div className="p-4 bg-ink rounded border border-hairline space-y-2">
                <div className="text-paper font-bold border-b border-hairline pb-1">
                  2.6.3 Data Protection Act 2019 (ODPC)
                </div>
                <div className="text-sage">Micro & Small Data Controller: <strong className="text-paper">KSh 4,000</strong></div>
                <div className="text-sage">Medium Entity: <strong className="text-paper">KSh 16,000</strong></div>
                <div className="text-sage">Large Entity: <strong className="text-paper">KSh 40,000</strong></div>
                <div className="text-[10px] text-emerald-400 font-semibold">Mandatory for WhatsApp/USSD listener opt-in database</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.7: AUDIENCE MEASUREMENT & NLS */}
      {activeTab === 'audience' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.7 Audience Measurement & The Net Listener Score (NLS) Formula</h4>
                <p className="text-xs text-sage">GeoPoll empirical standing and the newly constructed, transparent NLS loyalty equation</p>
              </div>
              <TierBadge tier={1} citation="GeoPoll Sept 2025–Feb 2026 & Media Council 2025" url="geopoll.com" />
            </div>

            {/* The Net Listener Score Formula Box */}
            <div className="p-4 sm:p-5 bg-ink rounded border border-brass/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-brass font-mono text-xs font-bold uppercase tracking-wider">
                  2.7.2 Net Listener Score (NLS) — Mathematical Methodology
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brass/20 text-amber-300 border border-brass/40">
                  Constructed Equation
                </span>
              </div>

              <div className="p-3 bg-ink-2 rounded border border-hairline text-center">
                <div className="font-mono text-sm sm:text-base text-paper font-bold tracking-wide">
                  {'Net Listener Score (NLS) = (WAL × AWLH) + (RCI × 0.3) + (CPEI × 0.2)'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                  <span className="text-brass font-semibold block">WAL: Weekly Active Listeners</span>
                  <span className="text-sage text-[11px]">Unique listeners in past 7 days measured via GeoPoll / KARF panel oversample.</span>
                </div>
                <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                  <span className="text-brass font-semibold block">AWLH: Average Weekly Listening Hours</span>
                  <span className="text-sage text-[11px]">Time spent listening per diary and daypart recall surveys.</span>
                </div>
                <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                  <span className="text-brass font-semibold block">RCI: Repeat Caller Index</span>
                  <span className="text-sage text-[11px]">Formula: <code className="text-paper">(Unique Callers / Week ÷ Total Callers) × 100</code> recorded via studio call logs.</span>
                </div>
                <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                  <span className="text-brass font-semibold block">CPEI: Cross-Platform Engagement Index</span>
                  <span className="text-sage text-[11px]">Formula: <code className="text-paper">(WhatsApp Opt-In Retention % + USSD Freq + App WAU) ÷ 3</code>.</span>
                </div>
              </div>

              <div className="p-3 bg-brick/20 border border-brick/60 rounded text-xs font-mono space-y-1">
                <div className="text-rose-400 font-bold uppercase tracking-wider">
                  Audience Baseline Research Gap
                </div>
                <p className="text-paper/90 font-body text-xs">
                  Establishing the empirical baseline NLS for Nyota FM requires primary listener survey research.
                </p>
                <div className="text-sage text-[11px]">
                  Recommended method: Commission GeoPoll or KARF for a Western Kenya survey with Nyota FM county oversample. <strong>Budget: KSh 500,000–1,000,000</strong>. Timeline: 6–8 weeks.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.8: MASTER REVENUE LEVERS */}
      {activeTab === 'levers' && (
        <div className="space-y-4">
          <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
              <div>
                <h4 className="font-display text-paper text-base font-semibold">2.8 Master Revenue Lever Data (All 14 Streams)</h4>
                <p className="text-xs text-sage">Maturity revenue estimates, cost to activate, time to first revenue, and operational difficulty</p>
              </div>
              <TierBadge tier={2} citation="Synthesised Tier 2 Derived Model" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="py-2 pr-3">Revenue Lever</th>
                    <th className="py-2 px-3">Realistic Annual Revenue (Maturity)</th>
                    <th className="py-2 px-3">Cost to Activate</th>
                    <th className="py-2 px-3">Time to First Revenue</th>
                    <th className="py-2 pl-3">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-paper/90">
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">Podcast Ad Network</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 500,000 – 2,000,000</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">6–12 months</td>
                    <td className="py-2.5 pl-3 text-amber-300">Medium</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-brass">YouTube Monetisation</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 600,000 – 2,400,000</td>
                    <td className="py-2.5 px-3 text-sage">Low (existing channel)</td>
                    <td className="py-2.5 px-3">3–6 months</td>
                    <td className="py-2.5 pl-3 text-amber-300">Medium</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Google Ad Grants</td>
                    <td className="py-2.5 px-3 text-paper font-semibold">Up to $10,000/mo (in-kind)</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">2–4 months</td>
                    <td className="py-2.5 pl-3 text-emerald-400">Low</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Meta Journalism Project</td>
                    <td className="py-2.5 px-3 text-paper">Variable grant capital</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">4–6 months</td>
                    <td className="py-2.5 pl-3 text-amber-300">Medium</td>
                  </tr>
                  <tr className="hover:bg-ink bg-brass/10">
                    <td className="py-2.5 pr-3 font-bold text-brass">County Government Vendor</td>
                    <td className="py-2.5 px-3 text-brass font-bold">KSh 1,000,000 – 5,000,000</td>
                    <td className="py-2.5 px-3 text-amber-300">Medium</td>
                    <td className="py-2.5 px-3">6–12 months</td>
                    <td className="py-2.5 pl-3 text-rose-300 font-semibold">High</td>
                  </tr>
                  <tr className="hover:bg-ink bg-brass/10">
                    <td className="py-2.5 pr-3 font-bold text-brass">GAA Registration Campaigns</td>
                    <td className="py-2.5 px-3 text-brass font-bold">KSh 500,000 – 3,000,000</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">3–6 months</td>
                    <td className="py-2.5 pl-3 text-amber-300">Medium</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Diaspora Advertising & Greetings</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 500,000 – 2,000,000</td>
                    <td className="py-2.5 px-3 text-amber-300">Medium</td>
                    <td className="py-2.5 px-3">6–12 months</td>
                    <td className="py-2.5 pl-3 text-rose-300">High</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">SMS / CRM Automation</td>
                    <td className="py-2.5 px-3 text-paper font-semibold">KSh 300,000 – 1,000,000</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">3–6 months</td>
                    <td className="py-2.5 pl-3 text-emerald-400">Low</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Syndication & Licensing</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 500,000 – 2,000,000</td>
                    <td className="py-2.5 px-3 text-amber-300">Medium</td>
                    <td className="py-2.5 px-3">12–18 months</td>
                    <td className="py-2.5 pl-3 text-rose-300">High</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Merchandise Catalogue</td>
                    <td className="py-2.5 px-3 text-paper">KSh 200,000 – 500,000 (net)</td>
                    <td className="py-2.5 px-3 text-sage">Low–Medium (print on demand)</td>
                    <td className="py-2.5 px-3">3–6 months</td>
                    <td className="py-2.5 pl-3 text-emerald-400">Low</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Live Events Ticketing</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 500,000 – 3,000,000</td>
                    <td className="py-2.5 px-3 text-rose-300">High</td>
                    <td className="py-2.5 px-3">6–12 months</td>
                    <td className="py-2.5 pl-3 text-rose-300">High</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-paper">Agricultural Value-Chain Ads</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 500,000 – 2,000,000</td>
                    <td className="py-2.5 px-3 text-amber-300">Medium</td>
                    <td className="py-2.5 px-3">6–12 months</td>
                    <td className="py-2.5 pl-3 text-amber-300">Medium</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 font-semibold text-sage-dim">Betting Advertising (Constrained)</td>
                    <td className="py-2.5 px-3 text-sage">KSh 200,000 – 1,000,000</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">3–6 months</td>
                    <td className="py-2.5 pl-3 text-amber-300">Medium</td>
                  </tr>
                  <tr className="hover:bg-ink bg-emerald-950/20">
                    <td className="py-2.5 pr-3 font-bold text-emerald-400">Political Advertising (2027 General Election)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">KSh 2,000,000 – 10,000,000</td>
                    <td className="py-2.5 px-3 text-sage">Low</td>
                    <td className="py-2.5 px-3">Q3 2027 (Episodic)</td>
                    <td className="py-2.5 pl-3 text-emerald-400">Low (Demand-driven)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-ink rounded border border-hairline text-xs font-body text-sage">
              All figures are Tier 2 modelled derivations based on prevailing Western Kenya media buying parameters and Kenyan ad spend distributions detailed in Part 4.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
