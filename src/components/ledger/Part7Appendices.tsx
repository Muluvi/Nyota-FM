import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';

export function Part7Appendices() {
  const competitors = [
    { name: 'Mulembe FM', owner: 'Royal Media Services', profile: 'Tier-1 vernacular leader. Strong legacy reach; network backing; established advertiser relationships. Vulnerable to limited directly-addressable audience and modest civic-data positioning.' },
    { name: 'West FM', owner: 'Independent', profile: 'Broadcasts from Nairobi to Western Kenya. Wide footprint but diffuse cultural focus; vulnerable to a concentrated Pan-Luhya consolidator.' },
    { name: 'Sulwe FM', owner: 'Royal Media Services', profile: 'Bukusu-Luhya focused with strong cultural authenticity. Narrow language focus; limited multi-platform development.' },
    { name: 'Ingo FM', owner: 'Luhya-language', profile: 'Loyal core listenership, but limited digital and commercial diversification.' },
    { name: 'Imani Radio', owner: 'Kitale (88.8)', profile: 'Local Trans Nzoia relevance, but sub-regional reach and limited scale.' },
    { name: 'Radio Mambo', owner: 'Webuye (97.1)', profile: 'Hyper-local presence, narrow footprint.' },
  ];

  const countiesBrief = [
    { county: 'Bungoma', pop: '≈ 2.07M (29%)', note: 'Nyota FM home county; Bukusu heartland.' },
    { county: 'Kakamega', pop: '≈ 2.07M (29%)', note: 'Largest Luhya sub-group diversity.' },
    { county: 'Trans Nzoia', pop: '≈ 1.06M (15%)', note: 'Agricultural hub; mixed communities.' },
    { county: 'Busia', pop: '≈ 0.97M (13%)', note: 'Border trade; Samia/Teso communities.' },
    { county: 'Vihiga', pop: '≈ 0.64M (9%)', note: 'Densely populated; Maragoli core.' },
  ];

  const styleGuide = [
    { item: 'Language', rule: 'Swahili-first; natural Bukusu/Maragoli inflection; English sparingly.' },
    { item: 'Tone', rule: 'Proud, warm, sharp, civic, modern, generous.' },
    { item: 'Tagline', rule: 'Hapa Tulipo, Twang’aa — preserve the exact apostrophe.' },
    { item: 'Frequency', rule: '‘107.3 FM’ in body copy; ‘NYOTA 107.3 FM’ in logo lockups.' },
    { item: 'Currency', rule: 'Always ‘KSh’ — e.g. KSh 2.4M.' },
    { item: 'Spelling', rule: 'British English throughout: organise, recognise, behaviour, colour, programme, centre.' },
  ];

  const kpis = [
    { letter: 'A', name: 'Revenue Streams', metric: 'Number of active streams; revenue by stream (monthly).' },
    { letter: 'B', name: 'Revenue', metric: 'Total revenue vs baseline; non-spot % (monthly).' },
    { letter: 'C', name: 'Market Share', metric: 'GeoPoll position by county (per GeoPoll release).' },
    { letter: 'D', name: 'Community', metric: 'WhatsApp, USSD, app, social contacts (monthly).' },
    { letter: 'E', name: 'Loyalty', metric: 'Weekly active listener hours; repeat-caller frequency; Net Listener Score (monthly).' },
  ];

  const glossary = [
    { term: 'AV', full: 'Audio-visual' },
    { term: 'BSP', full: 'Business Solution Provider (WhatsApp Business API partner)' },
    { term: 'CPM', full: 'Cost per mille (cost per thousand impressions)' },
    { term: 'DAM', full: 'Digital Asset Management' },
    { term: 'GAA', full: 'Government Advertising Agency' },
    { term: 'KARF', full: 'Kenya Audience Research Foundation' },
    { term: 'NDI', full: 'Network Device Interface (IP video transport standard)' },
    { term: 'PTZ', full: 'Pan-Tilt-Zoom broadcast camera' },
    { term: 'RTMP / SRT', full: 'Live streaming transport protocols' },
    { term: 'STK Push', full: 'SIM Toolkit payment prompt (M-Pesa payment request)' },
    { term: 'USSD', full: 'Unstructured Supplementary Service Data' },
    { term: 'VISCA', full: 'Camera control protocol for PTZ cameras' },
  ];

  return (
    <div className="space-y-12">
      <div className="border-b border-hairline pb-3">
        <div className="text-eyebrow text-brass">Reference Section</div>
        <h3 className="font-display text-paper text-2xl">Appendices & Supporting Material</h3>
      </div>

      {/* Appendix A — Competitive Profiles */}
      <div id="appendix-a" className="space-y-4">
        <div className="text-eyebrow text-sage-dim">Appendix A</div>
        <h4 className="font-display text-paper text-lg">Competitive Profiles</h4>
        <div className="space-y-3">
          {competitors.map((c, idx) => (
            <div key={idx} className="p-3 bg-ink rounded border border-hairline text-xs font-body">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-paper text-sm">{c.name}</span>
                <span className="font-mono text-brass text-[11px]">{c.owner}</span>
              </div>
              <p className="text-sage leading-relaxed">{c.profile}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Appendix B — Five-County Demographic Brief */}
      <div id="appendix-b" className="space-y-4 pt-6 border-t border-hairline">
        <div className="text-eyebrow text-sage-dim">Appendix B</div>
        <h4 className="font-display text-paper text-lg">Five-County Demographic Brief</h4>
        <LedgerCard className="p-4">
          <div className="divide-y divide-hairline">
            {countiesBrief.map((cb, idx) => (
              <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div>
                  <span className="font-body font-semibold text-paper">{cb.county}</span>
                  <span className="font-mono text-brass sm:ml-2">({cb.pop})</span>
                </div>
                <span className="font-body text-sage sm:text-right">{cb.note}</span>
              </div>
            ))}
          </div>
        </LedgerCard>
      </div>

      {/* Appendix C — Indicative Equipment Schedule */}
      <div id="appendix-c" className="space-y-4 pt-6 border-t border-hairline">
        <div className="text-eyebrow text-sage-dim">Appendix C</div>
        <h4 className="font-display text-paper text-lg">Indicative Equipment Schedule</h4>
        <div className="space-y-2 text-xs font-body text-sage">
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-mono text-brass font-semibold block mb-1">Phase 1: Visual Radio Foundation</span>
            2× PTZ cameras (NDI/HDMI), VISCA control. Blackmagic ATEM Television Studio HD. Basic LED panel kit and targeted acoustic treatment. Hardware/software encoder.
          </div>
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-mono text-brass font-semibold block mb-1">Phase 2: Multi-Cam Live Production</span>
            Expand to 4× PTZ + 1× operated camera. ATEM Television Studio HD8 or Pro 4K. vMix/OBS production computer; talk-back system. Dedicated control room and full lighting grid.
          </div>
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-mono text-brass font-semibold block mb-1">Phase 3: Second Studio & Automation Hub</span>
            Second studio (podcast / pre-record room). Digital Asset Management (DAM) system. Automation AI tooling for clipping and audience data.
          </div>
        </div>
      </div>

      {/* Appendix D — Pre-Recorded Show Format Bibles */}
      <div id="appendix-d" className="space-y-4 pt-6 border-t border-hairline">
        <div className="text-eyebrow text-sage-dim">Appendix D</div>
        <h4 className="font-display text-paper text-lg">Pre-Recorded Show Format Bibles</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-semibold text-paper block">Asubuhi ya Imani</span>
            <span className="font-mono text-[10px] text-brass block mb-1">Host: NABII • Sunday Morning</span>
            <p className="text-sage">Gospel, worship, listener testimony, Scripture, new music, dedications.</p>
          </div>
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-semibold text-paper block">Hapa Tulipo Mix</span>
            <span className="font-mono text-[10px] text-brass block mb-1">Host: Rotating DJs • Friday Night</span>
            <p className="text-sage">Amapiano, Afro House, Gqom, Deep House, Bongo, and Genge club sets.</p>
          </div>
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-semibold text-paper block">Sauti ya Nchi</span>
            <span className="font-mono text-[10px] text-brass block mb-1">Host: Civic Desk Lead • Sunday Evening</span>
            <p className="text-sage">Civic education, county-budget deep dive, citizen voices, accountability panel.</p>
          </div>
          <div className="p-3 bg-ink rounded border border-hairline">
            <span className="font-semibold text-paper block">Wanawake wa Twang’aa</span>
            <span className="font-mono text-[10px] text-brass block mb-1">Host: Eva Nyangasi • Saturday Mid-Morning</span>
            <p className="text-sage">Lifestyle, women's health, female entrepreneur hustle, beauty & listener Q&A.</p>
          </div>
        </div>
      </div>

      {/* Appendix E — Brand Voice & Style Guide */}
      <div id="appendix-e" className="space-y-4 pt-6 border-t border-hairline">
        <div className="text-eyebrow text-sage-dim">Appendix E</div>
        <h4 className="font-display text-paper text-lg">Brand Voice & Style Guide</h4>
        <LedgerCard className="p-4">
          <div className="divide-y divide-hairline">
            {styleGuide.map((sg, idx) => (
              <div key={idx} className="py-2 flex items-baseline justify-between text-xs gap-3">
                <span className="font-mono text-brass font-medium w-1/4 shrink-0">{sg.item}</span>
                <span className="font-body text-paper w-3/4 text-right">{sg.rule}</span>
              </div>
            ))}
          </div>
        </LedgerCard>
      </div>

      {/* Appendix F — KPI Dashboard Specification */}
      <div id="appendix-f" className="space-y-4 pt-6 border-t border-hairline">
        <div className="text-eyebrow text-sage-dim">Appendix F</div>
        <h4 className="font-display text-paper text-lg">KPI Dashboard Specification</h4>
        <LedgerCard className="p-4">
          <div className="divide-y divide-hairline">
            {kpis.map((k, idx) => (
              <div key={idx} className="py-2.5 flex items-start gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-brass/20 text-brass border border-brass/40 flex items-center justify-center font-mono font-bold shrink-0">
                  {k.letter}
                </span>
                <div>
                  <span className="font-body font-medium text-paper block">{k.name}</span>
                  <span className="font-body text-sage text-[11px]">{k.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </LedgerCard>
      </div>

      {/* Appendix G — Glossary of Terms */}
      <div id="appendix-g" className="space-y-4 pt-6 border-t border-hairline">
        <div className="text-eyebrow text-sage-dim">Appendix G</div>
        <h4 className="font-display text-paper text-lg">Glossary of Terms</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {glossary.map((g, idx) => (
            <div key={idx} className="p-2.5 bg-ink rounded border border-hairline flex items-baseline justify-between gap-2">
              <span className="text-brass font-bold">{g.term}</span>
              <span className="font-body text-sage text-[11px] text-right truncate">{g.full}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
