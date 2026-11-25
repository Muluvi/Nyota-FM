import React, { useState } from 'react';
import { 
  CheckCircle2, ExternalLink, Search, Check, ShieldCheck, 
  HelpCircle, ChevronRight, Stamp, ThumbsUp 
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';
import { asks } from '../../data/asks';
import { printSection } from '../../lib/print';

interface SourceItem {
  id: number;
  org: string;
  title: string;
  url: string;
  accessDate: string;
  deep?: boolean;
}

export function SourceListAndAsks() {
  const [sourceSearch, setSourceSearch] = useState('');

  // Sources with a deep link to the exact document carry `deep: true`; the rest are
  // domain-level references that still need a direct link before they can back Tier 1.
  const sources: SourceItem[] = [
    { id: 1, org: 'KNBS', title: 'Kenya Population and Housing Census 2019', url: 'knbs.or.ke', accessDate: '2026-09-30' },
    { id: 2, org: 'Bungoma County Government', title: 'Population Projections', url: 'bungoma.go.ke', accessDate: '2026-09-30' },
    { id: 3, org: 'CA Kenya', title: 'Audience Measurement & Industry Trends Report Q4 FY2025/26 (Apr–Jun 2026)', url: 'www.ca.go.ke/sites/default/files/2026-08/%20Audience%20Measurement%20and%20Industry%20Trends%20Report%20Quarter%204%202025-2026.pdf', accessDate: '2026-11-25', deep: true },
    { id: 4, org: 'CA Kenya', title: 'Competition Study in Broadcasting Sub-Sector', url: 'ca.go.ke', accessDate: '2026-09-30' },
    { id: 5, org: 'Media Council of Kenya', title: 'State of the Media Report 2024', url: 'mediacouncil.or.ke', accessDate: '2026-09-30' },
    { id: 6, org: 'The Star (MCK State of the Media 2025)', title: 'Survey: public trust in Kenyan media grows (4 May 2026)', url: 'www.the-star.co.ke/news/2026-05-04-survey-public-trust-in-kenyan-media-grows', accessDate: '2026-11-25', deep: true },
    { id: 7, org: 'GeoPoll', title: 'Kenya top TV and radio stations, Q1 2026', url: 'www.geopoll.com/blog/kenya-top-tv-radio-q1-2026/', accessDate: '2026-11-25', deep: true },
    { id: 8, org: 'Radio.co.ke', title: 'How to Advertise on Kenyan Radio: A Buyer\'s Guide', url: 'radio.co.ke', accessDate: '2026-09-30' },
    { id: 9, org: 'Citizen Digital', title: 'Mulembe FM frequencies', url: 'citizen.digital/citizen-sounds/853', accessDate: '2026-11-25', deep: true },
    { id: 10, org: 'Citizen Digital', title: 'Sulwe FM frequencies', url: 'citizen.digital/citizen-sounds/855', accessDate: '2026-11-25', deep: true },
    { id: 11, org: 'Broadcast Solutions International', title: 'PTZ Camera Prices (re-quote required)', url: 'bsint.net', accessDate: '2026-09-30' },
    { id: 12, org: 'Elite Aperture Mobitech', title: 'CineTreak PTZ Cameras (re-quote required)', url: 'eamobitech.com', accessDate: '2026-09-30' },
    { id: 13, org: 'Cellular Kenya', title: 'ATEM Television Studio HD (re-quote required)', url: 'cameraplacekenya.com', accessDate: '2026-09-30' },
    { id: 14, org: 'Rondamo', title: 'ATEM Television Studio HD8 (re-quote required)', url: 'rondamo.co.ke', accessDate: '2026-09-30' },
    { id: 15, org: 'Soundproofing Kenya', title: 'Acoustic Panels (re-quote required)', url: 'soundproofingcompany.co.ke', accessDate: '2026-09-30' },
    { id: 16, org: 'SUIMAS Interiors', title: 'Soundproofing Cost Guide', url: 'suimas.co.ke', accessDate: '2026-09-30' },
    { id: 17, org: 'Africa\'s Talking', title: 'How much is a dedicated USSD code?', url: 'help.africastalking.com/en/articles/1163556-how-much-is-a-dedicated-ussd-code', accessDate: '2026-11-25', deep: true },
    { id: 18, org: 'Ominiflow', title: 'WhatsApp API Pricing Kenya 2026', url: 'ominiflow.com', accessDate: '2026-09-30' },
    { id: 19, org: 'Meta', title: 'WhatsApp Business Platform pricing (per-message since 1 Jul 2025)', url: 'developers.facebook.com/docs/whatsapp/pricing', accessDate: '2026-11-25', deep: true },
    { id: 20, org: 'Dynamoi Data', title: 'YouTube AdSense RPM in Kenya (single aggregator, unverified)', url: 'dynamoi.com', accessDate: '2026-09-30' },
    { id: 21, org: 'AfroTools', title: 'Podcast Monetization Calculator — Africa', url: 'afrotools.com', accessDate: '2026-09-30' },
    { id: 22, org: 'Khusoko / ReelAnalytics', title: 'Kenya advertising spend 2025', url: 'khusoko.com/2026/04/10/kenya-advertising-spend-2025-media-landscape-outlook/', accessDate: '2026-11-25', deep: true },
    { id: 23, org: 'AllAfrica / Capital FM', title: 'Betting ad spend falls 89% (one quarter, Jul–Sep 2025)', url: 'allafrica.com/stories/202602020526.html', accessDate: '2026-11-25', deep: true },
    { id: 24, org: 'Office of the Data Protection Commissioner', title: 'FAQs and registration fees', url: 'www.odpc.go.ke/faqs/', accessDate: '2026-11-25', deep: true },
    { id: 25, org: 'Kenya Copyright Board', title: 'Statement on CMO licensing 2025', url: 'copyright.go.ke/sites/default/files/downloads/Statement%20on%20CMOs%20Licensing%202025.pdf', accessDate: '2026-11-25', deep: true },
    { id: 26, org: 'ICT Ministry', title: 'Directorate of Government Advertising Agency', url: 'ict.go.ke/?p=4943', accessDate: '2026-11-25', deep: true },
    { id: 27, org: 'Payscale', title: 'Social Media Manager Salary Kenya', url: 'payscale.com', accessDate: '2026-09-30' },
    { id: 28, org: 'Payscale', title: 'Video Producer Salary Kenya', url: 'payscale.com', accessDate: '2026-09-30' },
    { id: 29, org: 'Mocky.co.ke', title: 'T-Shirt Printing Prices', url: 'mocky.co.ke', accessDate: '2026-09-30' },
    { id: 30, org: 'CA Kenya', title: 'Mobile broadband and smartphone penetration Q1 FY25/26', url: 'www.ca.go.ke/node/908', accessDate: '2026-11-25', deep: true },
    { id: 31, org: 'The Star / CA Kenya', title: 'Radio Listenership Regions', url: 'the-star.co.ke', accessDate: '2026-09-30' },
    { id: 32, org: 'KenyaPolls', title: 'Kenya\'s Top Radio Listening Regions (weak source)', url: 'kenyapolls.com', accessDate: '2026-09-30' },
    { id: 33, org: 'TechTrendsKE', title: '52 million smartphones in Kenya (CA Q4 FY25/26)', url: 'techtrendske.co.ke/2026/09/19/52-million-smartphones-kenya-mobile-data/', accessDate: '2026-11-25', deep: true },
    { id: 34, org: 'DataReportal', title: 'Digital 2027: Kenya', url: 'datareportal.com/reports/digital-2027-kenya', accessDate: '2026-11-25', deep: true },
    { id: 35, org: 'Business Radar', title: 'How to make money on TikTok in Kenya (24 Oct 2026)', url: 'businessradar.co.ke/how-to-make-money-on-tiktok-in-kenya-everything-you-need-to-know/', accessDate: '2026-11-25', deep: true },
    { id: 36, org: 'Khusoko', title: 'KECOBO consolidated music royalty tariffs 2026–2028', url: 'khusoko.com/2026/04/14/kecobo-consolidated-music-royalty-tariffs-2026-2028/', accessDate: '2026-11-25', deep: true },
    { id: 37, org: 'Business Today', title: 'IEBC 2027 election timelines', url: 'businesstoday.co.ke/?p=155076', accessDate: '2026-11-25', deep: true },
    { id: 38, org: 'Khusoko / CBK', title: 'Diaspora remittances 2025 (US$5.04 B)', url: 'khusoko.com/?p=51209', accessDate: '2026-11-25', deep: true },
    { id: 39, org: 'SAIIA', title: 'Policy Insights 173: reporting unsupported (USAID cuts and media)', url: 'saiia.org.za/wp-content/uploads/2026/04/SAIIA_PI_173_ReportingUnsupported.pdf', accessDate: '2026-11-25', deep: true },
    { id: 40, org: 'StatsKenya (KNBS 2019 Vol. IV)', title: 'Population by tribe and ethnicity (Bukusu 1,188,963)', url: 'www.statskenya.co.ke/at-stats-kenya/about/tribe-and-ethnicity-in-kenya-number-of-people-by-tribe/93', accessDate: '2026-11-25', deep: true },
    { id: 41, org: 'Citizen Digital', title: 'Musaga substation fire blacks out Western Kenya (7 Aug 2026)', url: 'citizen.digital/article/fire-at-kakamega-substation-triggers-widespread-blackout-in-western-kenya-n387914', accessDate: '2026-11-25', deep: true },
  ];

  const deepCount = sources.filter((s) => s.deep).length;

  // Honest self-check: each line states the real status as of this revision.
  // 'pass' = met, 'partial' = in progress with a known gap, 'open' = not yet met.
  const selfChecks: { num: number; text: string; status: 'pass' | 'partial' | 'open'; note: string }[] = [
    { num: 1, text: 'Every figure labelled Tier 1, 2, or 0', status: 'partial', note: 'Illustrative tools now carry an "Illustrative" label; a full per-fact data layer is planned (P1).' },
    { num: 2, text: 'Every Tier 1 figure has a deep URL and access date', status: 'open', note: `${deepCount} of ${sources.length} sources link to the exact document; the rest are domain-level only.` },
    { num: 3, text: 'Every Tier 2 figure has visible method and named inputs', status: 'partial', note: 'Methods are shown for objectives and levers; several tool outputs still lack them.' },
    { num: 4, text: 'Every strategy in Part 5 has a Data Receipts callout', status: 'pass', note: 'All 21 strategies carry receipts.' },
    { num: 5, text: 'One consistent value per figure across the site', status: 'open', note: 'Rate card, OB economics and capex still appear with different values in different tools.' },
    { num: 6, text: 'Part 7 contains all three checklists', status: 'pass', note: 'Checklists A, B and C are present.' },
    { num: 7, text: 'Board asks are a single list', status: 'pass', note: 'Six asks, shared by this section, the briefing and the deck.' },
    { num: 8, text: 'Payback model is incremental, costed and stress-tested', status: 'open', note: 'Model under revision; payback to be confirmed after the baseline audit (Ask 6).' },
    { num: 9, text: 'All milestones dated from Month 0', status: 'partial', note: 'Plan dates rebased to Month 0 = Jan 2027; some tool copy still being reconciled.' },
    { num: 10, text: 'Biggest revenue and audience risks stated in Part 3', status: 'pass', note: 'Risk register present in Part 3.5.' },
    { num: 11, text: 'Audited revenue baseline available', status: 'open', note: 'Tier 0: requires management accounts for the last 24 months.' },
    { num: 12, text: 'Western Kenya audience survey available', status: 'open', note: 'Tier 0: survey budget is part of Ask 6.' },
  ];

  const statusStyle = {
    pass: { label: 'Met', cls: 'text-moss border-moss/40' },
    partial: { label: 'Partial', cls: 'text-brass border-brass/40' },
    open: { label: 'Open', cls: 'text-brick border-brick/40' },
  } as const;

  const filteredSources = sources.filter((s) =>
    s.org.toLowerCase().includes(sourceSearch.toLowerCase()) ||
    s.title.toLowerCase().includes(sourceSearch.toLowerCase()) ||
    s.url.toLowerCase().includes(sourceSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 pt-6">
      {/* 37-SOURCE MASTER LIST */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                MASTER SOURCE LIST
              </span>
              <h4 className="font-display text-paper text-base font-semibold">
                {sources.length} Named Citations (Evidence Registry)
              </h4>
              <p className="text-xs text-sage mt-0.5">
                Sources marked “deep link” point to the exact document. Domain-only entries still need a direct link before they can support a Tier 1 figure.
              </p>
            </div>
            <div className="text-xs font-mono px-2 py-0.5 rounded bg-brass/10 text-brass border border-brass/50 font-semibold self-start sm:self-auto">
              {deepCount} / {sources.length} deep-linked
            </div>
          </div>

          {/* Source Search Bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-dim pointer-events-none" />
            <input
              type="text"
              placeholder="Search sources by organization, report title, or domain (e.g. CA Kenya, GeoPoll, KNBS, ReelAnalytics)..."
              value={sourceSearch}
              onChange={(e) => setSourceSearch(e.target.value)}
              className="w-full bg-ink border border-hairline rounded pl-9 pr-3 py-2 text-paper focus:border-brass focus:outline-none text-xs font-mono"
            />
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto scrollbar-thin">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 bg-ink-2 border-b border-hairline text-sage-dim z-10">
                <tr>
                  <th className="py-2 pr-2">#</th>
                  <th className="py-2 px-2">Organisation</th>
                  <th className="py-2 px-2">Title / Document Name</th>
                  <th className="py-2 px-2">Domain / URL</th>
                  <th className="py-2 pl-2">Access Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filteredSources.map((s) => (
                  <tr key={s.id} className="hover:bg-ink">
                    <td className="py-2 pr-2 font-bold text-brass">{s.id}</td>
                    <td className="py-2 px-2 font-semibold text-paper whitespace-nowrap">{s.org}</td>
                    <td className="py-2 px-2 text-sage font-body">{s.title}</td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      <a
                        href={`https://${s.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brass hover:underline inline-flex items-center gap-1"
                      >
                        <span>{s.deep ? 'deep link' : s.url}</span>
                        <ExternalLink size={10} />
                      </a>
                    </td>
                    <td className="py-2 pl-2 text-sage-dim whitespace-nowrap">{s.accessDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* SELF-CHECK AUDIT SCORECARD */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-hairline pb-3">
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
              SELF-CHECK
            </span>
            <h4 className="font-display text-paper text-base font-semibold">
              Self-Check: {selfChecks.filter((c) => c.status === 'pass').length} of {selfChecks.length} criteria met
            </h4>
            <p className="text-xs text-sage mt-0.5">
              Stated honestly for this revision. Open items are tracked in the improvement roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono">
            {selfChecks.map((sc) => (
              <div key={sc.num} className="p-2.5 bg-ink rounded border border-hairline space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-paper/90 text-xs font-body leading-snug">
                    {sc.num}. {sc.text}
                  </span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${statusStyle[sc.status].cls}`}>
                    {statusStyle[sc.status].label}
                  </span>
                </div>
                <p className="text-[11px] text-sage-dim font-body leading-snug">{sc.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* THE SIX ASKS OF OWNERSHIP */}
      <Reveal>
        <div id="board-resolutions" className="bg-ink-2 border border-brass/60 rounded p-5 sm:p-6 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brass/10 rounded-full blur-3xl pointer-events-none print:hidden" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
            <div>
              <span className="text-[11px] font-mono text-brass uppercase tracking-widest font-bold block">
                DECISIONS REQUESTED
              </span>
              <h3 className="font-display text-paper text-xl sm:text-2xl font-semibold">
                The Six Asks of Ownership
              </h3>
              <p className="text-xs text-sage mt-1 max-w-xl font-body">
                Six decisions move the Twang&apos;aa Transformation from proposal to execution. Timing is relative to Month 0, the month of board approval.
              </p>
            </div>
            <button
              type="button"
              onClick={() => printSection('board-resolutions')}
              className="self-start sm:self-auto px-3 py-2 rounded text-xs font-mono font-semibold bg-brass/20 text-brass border border-brass/50 hover:bg-brass hover:text-ink transition-colors flex items-center gap-1.5 print:hidden"
            >
              <Stamp size={12} />
              <span>Print resolution sheet</span>
            </button>
          </div>

          <ol className="space-y-3">
            {asks.map((ask) => (
              <li key={ask.id} className="p-4 rounded border bg-ink border-hairline">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border border-brass/50 text-brass bg-brass/10">
                    {ask.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="font-display text-sm sm:text-base text-paper font-semibold">
                        {ask.title}
                      </h5>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-ink-2 text-sage border border-hairline">
                        {ask.timing}
                      </span>
                      {ask.amount && (
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-brass/10 text-brass border border-brass/40">
                          {ask.amount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-sage font-body mt-1 leading-relaxed">{ask.detail}</p>
                    <p className="text-[11px] text-sage-dim font-mono mt-1">Owner: {ask.owner}</p>
                    <p className="hidden print:block text-xs mt-2">☐ Approved &nbsp;&nbsp; ☐ Not approved &nbsp;&nbsp; ☐ Deferred</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden print:block text-xs pt-6">
            Signed: ______________________ &nbsp;&nbsp; ______________________ &nbsp;&nbsp; Date: ____________
          </div>

          <div className="p-4 bg-ink rounded border border-hairline text-center text-xs font-mono text-sage-dim">
            Submitted by Firefly Management · Board proposal v2.1 · Draft for discussion
          </div>
        </div>
      </Reveal>
    </div>
  );
}
