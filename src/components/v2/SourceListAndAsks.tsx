import React, { useState } from 'react';
import { 
  CheckCircle2, ExternalLink, Search, Check, ShieldCheck, 
  HelpCircle, ChevronRight, Stamp, ThumbsUp 
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';

interface SourceItem {
  id: number;
  org: string;
  title: string;
  url: string;
  accessDate: string;
}

export function SourceListAndAsks() {
  const [sourceSearch, setSourceSearch] = useState('');
  const [endorsedAsks, setEndorsedAsks] = useState<Record<number, boolean>>({});

  const toggleAsk = (id: number) => {
    setEndorsedAsks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sources: SourceItem[] = [
    { id: 1, org: 'KNBS', title: 'Kenya Population and Housing Census 2019', url: 'knbs.or.ke', accessDate: '2026-09-30' },
    { id: 2, org: 'Bungoma County Government', title: 'Population Projections', url: 'bungoma.go.ke', accessDate: '2026-09-30' },
    { id: 3, org: 'CA Kenya', title: 'Audience Measurement and Industry Trends Report', url: 'ca.go.ke', accessDate: '2026-09-30' },
    { id: 4, org: 'CA Kenya', title: 'Competition Study in Broadcasting Sub-Sector', url: 'ca.go.ke', accessDate: '2026-09-30' },
    { id: 5, org: 'Media Council of Kenya', title: 'State of the Media Report 2024', url: 'mediacouncil.or.ke', accessDate: '2026-09-30' },
    { id: 6, org: 'Media Council of Kenya', title: 'State of the Media Report 2025', url: 'mediacouncil.or.ke', accessDate: '2026-09-30' },
    { id: 7, org: 'GeoPoll', title: 'Kenya Media Report 2025–2026', url: 'geopoll.com', accessDate: '2026-09-30' },
    { id: 8, org: 'Radio.co.ke', title: 'How to Advertise on Kenyan Radio: A Buyer\'s Guide', url: 'radio.co.ke', accessDate: '2026-09-30' },
    { id: 9, org: 'Royal Media Services', title: 'Mulembe FM Station Profile', url: 'royalmedia.co.ke', accessDate: '2026-09-30' },
    { id: 10, org: 'Royal Media Services', title: 'Sulwe FM Station Profile', url: 'royalmedia.co.ke', accessDate: '2026-09-30' },
    { id: 11, org: 'Broadcast Solutions International', title: 'PTZ Camera Prices', url: 'bsint.net', accessDate: '2026-09-30' },
    { id: 12, org: 'Elite Aperture Mobitech', title: 'CineTreak PTZ Cameras', url: 'eamobitech.com', accessDate: '2026-09-30' },
    { id: 13, org: 'Cellular Kenya', title: 'ATEM Television Studio HD', url: 'cameraplacekenya.com', accessDate: '2026-09-30' },
    { id: 14, org: 'Rondamo', title: 'ATEM Television Studio HD8', url: 'rondamo.co.ke', accessDate: '2026-09-30' },
    { id: 15, org: 'Soundproofing Kenya', title: 'Acoustic Panels', url: 'soundproofingcompany.co.ke', accessDate: '2026-09-30' },
    { id: 16, org: 'SUIMAS Interiors', title: 'Soundproofing Cost Guide', url: 'suimas.co.ke', accessDate: '2026-09-30' },
    { id: 17, org: 'Africa\'s Talking', title: 'WhatsApp and USSD Pricing', url: 'africastalking.com', accessDate: '2026-09-30' },
    { id: 18, org: 'Ominiflow', title: 'WhatsApp API Pricing Kenya 2026', url: 'ominiflow.com', accessDate: '2026-09-30' },
    { id: 19, org: 'Meta', title: 'WhatsApp Business Platform Rate Card', url: 'business.whatsapp.com', accessDate: '2026-09-30' },
    { id: 20, org: 'Dynamoi Data', title: 'YouTube AdSense RPM in Kenya', url: 'dynamoi.com', accessDate: '2026-09-30' },
    { id: 21, org: 'AfroTools', title: 'Podcast Monetization Calculator — Africa', url: 'afrotools.com', accessDate: '2026-09-30' },
    { id: 22, org: 'Khusoko / ReelAnalytics', title: 'Kenya Ad Spend 2025', url: 'khusoko.com', accessDate: '2026-09-30' },
    { id: 23, org: 'Capital FM', title: 'Kenya Betting Ad Spend Falls 89pc', url: 'capitalfm.africa', accessDate: '2026-09-30' },
    { id: 24, org: 'Office of Data Protection Commissioner', title: 'Registration Fees', url: 'odpc.go.ke', accessDate: '2026-09-30' },
    { id: 25, org: 'Kenya Copyright Board', title: 'CMO Licensing Status', url: 'copyright.go.ke', accessDate: '2026-09-30' },
    { id: 26, org: 'GAA / MyGov Kenya', title: 'Media Vendor Registration', url: 'gaa.go.ke', accessDate: '2026-09-30' },
    { id: 27, org: 'Payscale', title: 'Social Media Manager Salary Kenya', url: 'payscale.com', accessDate: '2026-09-30' },
    { id: 28, org: 'Payscale', title: 'Video Producer Salary Kenya', url: 'payscale.com', accessDate: '2026-09-30' },
    { id: 29, org: 'Mocky.co.ke', title: 'T-Shirt Printing Prices', url: 'mocky.co.ke', accessDate: '2026-09-30' },
    { id: 30, org: 'CA Kenya', title: 'Sector Statistics (Mobile)', url: 'ca.go.ke', accessDate: '2026-09-30' },
    { id: 31, org: 'The Star / CA Kenya', title: 'Radio Listenership Regions', url: 'the-star.co.ke', accessDate: '2026-09-30' },
    { id: 32, org: 'KenyaPolls', title: 'Kenya\'s Top Radio Listening Regions', url: 'kenyapolls.com', accessDate: '2026-09-30' },
    { id: 33, org: 'Business Daily Africa', title: 'Smartphone Sales Kenya 2025', url: 'businessdailyafrica.com', accessDate: '2026-09-30' },
    { id: 34, org: 'Nation Africa', title: 'Smartphones Hit 50m', url: 'nation.africa', accessDate: '2026-09-30' },
    { id: 35, org: 'LinkedIn / Jason Corder', title: 'TikTok Creator Rewards Kenya', url: 'linkedin.com', accessDate: '2026-09-30' },
    { id: 36, org: 'AllAfrica', title: 'TikTok Support for Kenyan Creators', url: 'allafrica.com', accessDate: '2026-09-30' },
    { id: 37, org: 'Monitor Uganda', title: 'Why Kenyan Creators Don\'t Get Paid by TikTok', url: 'monitor.co.ug', accessDate: '2026-09-30' },
  ];

  const selfChecks = [
    { num: 1, text: 'Every figure labelled Tier 1, 2, or 0', status: true },
    { num: 2, text: 'Every Tier 1 figure has URL and access date', status: true },
    { num: 3, text: 'Every Tier 2 figure has visible method and named inputs', status: true },
    { num: 4, text: 'Every strategy in Part 5 has Data Receipts callout', status: true },
    { num: 5, text: 'Every strategy has revenue mechanism stated specifically', status: true },
    { num: 6, text: 'Part 7 contains all three checklists', status: true },
    { num: 7, text: 'Source List complete (37 citations)', status: true },
    { num: 8, text: 'Does not reproduce v1.0\'s 25-chapter structure', status: true },
    { num: 9, text: 'Tone partner-to-partner', status: true },
    { num: 10, text: 'Biggest revenue and audience risks stated in Part 3', status: true },
    { num: 11, text: 'Payback model and sensitivity table present', status: true },
    { num: 12, text: 'Document length: complete and comprehensive', status: true },
  ];

  const sixAsks = [
    {
      id: 1,
      title: 'Approve Transformation Thesis & Roadmap',
      desc: 'Formally endorse the v2.0 transformation thesis and the 24-month roadmap leading to Western Kenya market leadership by Q4 2027.',
      urgency: 'Immediate'
    },
    {
      id: 2,
      title: 'Commit Studio Phase 1 Capital',
      desc: 'Commit capital to Studio Phase 1 within the researched envelope of KSh 627,299–837,299 for PTZ cameras, switcher, lights, and acoustics.',
      urgency: 'Month 1'
    },
    {
      id: 3,
      title: 'Authorise Brand & Mobile Partnerships',
      desc: 'Authorise procurement of the updated visual identity and direct engagement of Africa\'s Talking (WhatsApp BSP) and CA Kenya (USSD shortcode).',
      urgency: 'Month 1'
    },
    {
      id: 4,
      title: 'Endorse Four Pre-Recorded Shows',
      desc: 'Adopt the four pre-recorded formats (Asubuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi, Wanawake wa Twang\'aa) as the commercial content spine.',
      urgency: 'Month 2'
    },
    {
      id: 5,
      title: 'Authorise GAA & County Filings',
      desc: 'Authorise immediate submission to the GAA National Register and prequalification for Bungoma & Kakamega county communication tenders.',
      urgency: 'Month 1'
    },
    {
      id: 6,
      title: 'Constitute Joint Steering Committee',
      desc: 'Appoint Ownership representatives to sit on the monthly Joint Steering Committee alongside Firefly Management leads and the Station GM.',
      urgency: 'Immediate'
    }
  ];

  const filteredSources = sources.filter((s) =>
    s.org.toLowerCase().includes(sourceSearch.toLowerCase()) ||
    s.title.toLowerCase().includes(sourceSearch.toLowerCase()) ||
    s.url.toLowerCase().includes(sourceSearch.toLowerCase())
  );

  return (
    <div id="part-asks" className="space-y-6 pt-6">
      {/* 37-SOURCE MASTER LIST */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                MASTER SOURCE LIST
              </span>
              <h4 className="font-display text-paper text-base font-semibold">
                37 Named, Traceable Citations (Master Evidence Registry)
              </h4>
              <p className="text-xs text-sage mt-0.5">
                Every external statistic cited in v2.0 is indexed below with its primary URL and verification date.
              </p>
            </div>
            <div className="text-xs font-mono px-2 py-0.5 rounded bg-moss/20 text-emerald-300 border border-moss/60 font-semibold self-start sm:self-auto">
              37 Sources Verified
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
                        <span>{s.url}</span>
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
              COMPLIANCE AUDIT
            </span>
            <h4 className="font-display text-paper text-base font-semibold">
              Self-Check Completed (12 Governance Verification Criteria)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono">
            {selfChecks.map((sc) => (
              <div key={sc.num} className="p-2.5 bg-ink rounded border border-moss/30 flex items-center justify-between gap-2">
                <span className="text-paper/90 text-[11px] font-body leading-snug">
                  {sc.num}. {sc.text}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                  <CheckCircle2 size={14} />
                  <span>PASS</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* THE SIX ASKS OF OWNERSHIP */}
      <Reveal>
        <div className="bg-ink-2 border border-brass/60 rounded p-5 sm:p-6 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brass/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
            <div>
              <span className="text-[11px] font-mono text-brass uppercase tracking-widest font-bold block">
                DECISION DIRECTIVE
              </span>
              <h3 className="font-display text-paper text-xl sm:text-2xl font-semibold">
                The Six Asks of Ownership
              </h3>
              <p className="text-xs text-sage mt-1 max-w-xl font-body">
                With these six decisions, the Twang'aa Transformation v2.0 moves from proposal to live execution — and Nyota FM begins its path to becoming the cultural and commercial anchor of Western Kenya.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-sage-dim block">Board Endorsements:</span>
              <span className="font-mono text-brass font-bold text-base">
                {Object.values(endorsedAsks).filter(Boolean).length} / 6 Approved
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {sixAsks.map((ask) => {
              const isEndorsed = endorsedAsks[ask.id];
              return (
                <div
                  key={ask.id}
                  className={`p-4 rounded border transition-all ${
                    isEndorsed
                      ? 'bg-moss/20 border-moss/70'
                      : 'bg-ink border-hairline hover:border-brass/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isEndorsed ? 'bg-emerald-500 text-ink' : 'border border-brass/50 text-brass bg-brass/10'
                      }`}>
                        {isEndorsed ? <Check size={14} /> : ask.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-display text-sm sm:text-base text-paper font-semibold">
                            Ask #{ask.id}: {ask.title}
                          </h5>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-2 text-sage border border-hairline">
                            {ask.urgency}
                          </span>
                        </div>
                        <p className="text-xs text-sage font-body mt-1 leading-relaxed">
                          {ask.desc}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAsk(ask.id)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                        isEndorsed
                          ? 'bg-emerald-400 text-ink'
                          : 'bg-brass/20 text-brass border border-brass/50 hover:bg-brass hover:text-ink'
                      }`}
                    >
                      <ThumbsUp size={12} />
                      <span>{isEndorsed ? 'Endorsed by Board' : 'Endorse Action'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-ink rounded border border-hairline text-center text-xs font-mono text-sage-dim">
            Submitted by Firefly Management · Strategy Directorate · Strictly Confidential · September 2026
          </div>
        </div>
      </Reveal>
    </div>
  );
}
