import { useState } from 'react';
import { factValue } from '../../data/facts';
import { ChevronDown, Database, ExternalLink } from 'lucide-react';

const sections = [
  { title: 'Executive summary', eyebrow: '01 / sourced reality', items: [
    ['Radio reach, Western Kenya', factValue('radio.reach.western'), 'CA Audience Measurement, Apr–Jun 2026; Nyota’s own reach is a Tier 0 gap'],
    ['Radio advertising market', 'KSh 25.9B', 'Down 5% in 2025'],
    ['Smartphone connections', '52.26M', 'June 2026 (CA); connections, not people'],
    ['YouTube RPM Kenya', '$0.6719', 'Per 1,000 views'],
    ['USSD dedicated code', 'KSh 70,000/month', 'Safaricom via Africa’s Talking, VAT incl.'], // data-ok: market fact, not a sponsor
    ['WhatsApp marketing', '$0.0225', 'Per message, Rest of Africa (Meta, since 1 Jul 2025)'],
    ['ODPC registration', 'KSh 4,000', 'Micro/small entities'],
  ]},
  { title: 'Objectives / market reality', eyebrow: '02 / commercial context', items: [
    ['Mainstream advertising market', 'KSh 66.3B', 'Contracted 22% in 2025'],
    ['Radio advertising', 'KSh 25.9B', 'Down 5%'],
    ['TV advertising', 'KSh 39.1B', 'Down 22%'],
    ['Print advertising', 'KSh 1.4B', 'Down 25%'],
    ['2026 forecast', 'KSh 52.7B', 'Further 20% decline projected by Reelanalytics'],
    ['Safaricom share', '8%', 'Of total mainstream ad expenditure; leading individual advertiser'], // data-ok: market fact, not a sponsor
    ['Western radio reach', factValue('radio.reach.western'), 'Q4 2025/26 (Apr–Jun 2026); 81% in Q2'],
    ['Lower Eastern', '83%', 'Q2 2025/26'],
    ['Lake Region', '82%', 'Q2 2025/26'],
    ['South Nyanza', '80%', 'Q2 2025/26'],
    ['News and current affairs', '43.12%', 'Share of total listenership'],
    ['Entertainment and talk shows', '25.11%', 'Share of total listenership'],
    ['Daily radio listenership (MCK)', '75% → 57% → 41%', '2023 → 2024 → 2025, national'],
    ['Radio Citizen', '24.06M → 22.32M', 'Peak October 2025; February 2026 close'],
    ['Radio Jambo', '17.74M', 'Second-ranked station'],
    ['Radio 47', '10.63M', 'Third-ranked station'],
  ]},
  { title: 'Five-county population sizing', eyebrow: '03 / KNBS 2019 census', items: [
    ['Bungoma', '1,670,570', 'Male 812,146 · Female 858,389 · Intersex 35'],
    ['Kakamega', '1,867,579', 'Male 897,133 · Female 970,406 · Intersex 40'],
    ['Trans Nzoia', '990,341', 'Male 489,107 · Female 501,206 · Intersex 28'],
    ['Busia', '893,681', 'KNBS 2019 Census'],
    ['Vihiga', '590,013', 'Male 283,678 · Female 306,323 · Intersex 12'],
    ['Five-county total', '6,012,184', 'KNBS 2019 Census'],
    ['Kenya national population', '47,564,296', 'KNBS 2019 Census'],
    ['County density', 'To be replaced', 'Earlier density rows were garbled; KNBS persons/km² to be added'],
  ]},
  { title: 'Radio penetration & listening', eyebrow: '04 / CA Kenya Q2–Q4 2025/26', items: [
    ['National radio listeners', '24.4M', 'Q4 2025/26, Apr–Jun 2026 (23.9M in Q2)'],
    ['Male listeners', '50–51%', 'Across all quarters'],
    ['Female listeners', '49–50%', 'Across all quarters'],
    ['Lower Eastern / Lake / Rift / Western / South Nyanza', '83% / 82% / 81% / 81% / 80%', 'Regional penetration Q2'],
    ['Nairobi', '63%', 'Q4 2025/26; lowest in Kenya'],
    ['Western / Rift', '83% / 83%', 'Q4 2025/26'],
    ['Lake', '81%', 'Q4 2025/26'],
    ['Audience context', 'Rural + LSM 1–4', 'Rural and lower LSM audiences dominate radio consumption'],
  ]},
  { title: 'Device connectivity', eyebrow: '05 / mobile ecosystem', items: [
    ['Smartphone penetration (devices ÷ population)', '85.2%', 'September 2025; a device ratio, not the share of people who own a smartphone'],
    ['Active smartphones', '48.7M+', 'December 2025'],
    ['Smartphone connections', '50.2M', 'March 2026, up from 48.7M'],
    ['Smartphone connections', '52.26M', 'June 2026, up 4.2% in quarter'],
    ['Feature phones', '29.62M → 28.54M → 27.42M', 'December 2025 → March → June 2026'],
    ['Total mobile phones', '78.3M / 149.4%', 'December 2025; connections / penetration'],
    ['Mobile broadband', '61.9M', 'Up 10.5% from 56.1M'],
    ['Data consumption', '755 TB', 'Up 32.86%'],
    ['4G subscriptions', '44.2M', 'Up 10.4% between Q1 and Q2 FY24/25'],
    ['5G subscriptions', '1.7M', 'Up 15.9%'],
    ['5G monthly data', '46.4 GB', 'Per subscriber in Q2; 4G 14.1 GB · 3G 8.8 GB'],
    ['Mobile broadband share', 'Safaricom 64.3% / Airtel 32.0%', 'Market share'], // data-ok: market fact, not a sponsor
  ]},
  { title: 'Social media & digital', eyebrow: '06 / platform economics', items: [
    ['Social media identities', '23.9M', 'October 2026, 40.6% of population (DataReportal, Digital 2027: Kenya)'],
    ['Platform reach', 'Facebook 69.9% · Instagram 12.9% · X 12.0%', 'Q2 2025/26'],
    ['WhatsApp usage', '53.9%', 'Down from 54.4% in 2024/25'],
    ['TikTok user share', '29.2%', 'Youth 15–34'],
    ['Social media as news source', '38.8%', 'Of Kenyans; smartphones account for 91% of access'],
    ['Digital ad spend', 'KSh 6.08B', 'Q4 2025; down 48.3% from KSh 11.76B'],
    ['Q3 platform earnings', 'Facebook KSh 6.1B / Instagram KSh 3.2B', '52% / 27% of total'],
    ['Social platforms ad spend', 'KSh 9.1B', 'Apr–Jun 2026, of a KSh 14.3B quarter (CA data via Nation)'],
    ['Digital share', 'Facebook 29% · Instagram 28% · YouTube 3% · TikTok 0.2%', 'Digital ad spend'],
    ['Digital market', 'USD 56M → USD 250M', '2020 → 2025; CAGR 34.88%'],
  ]},
  { title: 'Revenue concentration & payback', eyebrow: '07 / analysis model', items: [
    ['OOH advertising', 'KSh 6.37B', '2025; up 15%'],
    ['Leading station by ad spend', 'Kass FM KSh 2.44B', 'Rate-card value'],
    ['Highest ad volumes', 'Kameme FM 48,390', 'Insertions'],
    ['Radio Jambo ad revenue', 'KSh 2,050M', 'Reported revenue'],
    ['Worst case Q4 2027', 'Index 140 / 25% non-spot', 'No GAA registration; USSD delayed; spot -10%'],
    ['Base case Q4 2027', 'Index 200 / 40% non-spot', 'GAA registered; USSD live Q3; spot +5%'],
    ['Best case Q4 2027', 'Index 280 / 45% non-spot', 'GAA + two county retainers; two syndication deals; spot +15%'],
    ['Government advertising', 'KSh 24.5M/week', 'Old contract'],
    ['Government agency net expenditure', 'KSh 7,041,800', 'Approved estimates'],
  ]},
  { title: '12 opportunity levers', eyebrow: '08 / commercial design', items: [
    ['#1 GAA / county government', 'KSh 24.5M/week', 'Government advertising spend, old contract'],
    ['#2 WhatsApp / USSD', '$0.0225/marketing message · KSh 70K/month', 'Meta per-message pricing / Safaricom dedicated code'], // data-ok: market fact, not a sponsor
    ['#3 Branded pre-recorded shows', 'KSh 150,000/episode', 'Radio production'],
    ['#4 Outside broadcast', 'Tier 0', 'Revenue per activation to be validated (OOH is not a proxy)'],
    ['#5 YouTube + social', '$0.6719 RPM · $1.1314 CPM', 'Kenya YouTube economics'],
    ['#6 Podcast advertising', 'KSh 3,500/hour · KSh 1,500/hour live', 'Recording / live recording'],
    ['#7 Political advertising', 'Window: 29 May–7 Aug 2027', 'IEBC campaign period; spending limits gazetted 7 Aug 2026 are stayed by the High Court'],
    ['#8 Agriculture value-chain', 'Tier 0', 'Opportunity to validate'],
    ['#9 Syndication & licensing', 'Tier 0', 'Opportunity to validate'],
    ['#10 Diaspora engagement', 'Tier 0', 'Opportunity to validate'],
    ['#11 Merchandise', 'KSh 250–500/unit', 'T-shirt printing'],
    ['#12 Live events ticketing', 'Tier 0', 'Opportunity to validate'],
  ]},
  { title: 'Operating costs & compliance', eyebrow: '09 / sourced costs', items: [
    ['Show production', 'KSh 150K–250K/show/month', 'Allocated budget'],
    ['Podcast recording / live', 'KSh 3,500/hour · KSh 1,500/hour', 'Production costs'],
    ['Full song production', 'KSh 10,000/song', 'Sourced cost'],
    ['WhatsApp rates', '$0.0225 marketing · $0.004 utility', 'Per message, Rest of Africa (Meta, since 1 Jul 2025); BSP mark-ups extra'],
    ['WhatsApp session', 'KSh 0.60–2.50', 'Kenya per 24-hour conversation'],
    ['USSD Safaricom / Airtel / Telkom', 'KSh 70K/mo · KSh 116K + 46.4K/mo · KSh 58K + 116K/mo', 'Setup + monthly, VAT incl. (Africa’s Talking)'], // data-ok: market fact, not a sponsor
    ['Shared USSD 384X#', 'Free setup + KSh 40K/month', 'Africa’s Talking'],
    ['USSD extras', 'KSh 28,500 deposit · KSh 17,400 testbed · KSh 75,000 connection · KSh 10,000 testbed/month', 'One-off / Safaricom fees'], // data-ok: market fact, not a sponsor
    ['ODPC micro/small', 'KSh 4,000 / KSh 2,000 renewal', 'Two-year registration / renewal'],
    ['ODPC medium', 'KSh 16,000 / KSh 9,000 renewal', 'Two-year registration / renewal'],
    ['ODPC large', 'KSh 40,000 / KSh 25,000 renewal', 'Two-year registration / renewal'],
    ['ODPC public / charity', 'KSh 4,000 / KSh 2,000 renewal', 'Two-year registration / renewal'],
    ['GAA accreditation', 'KSh 100,000', 'Tier 2'],
    ['County prequalification', 'KSh 50,000', 'Tier 2'],
  ]},
  { title: 'People & salary benchmarks', eyebrow: '10 / team economics', items: [
    ['Head of Digital', 'KSh 120K–200K/month', 'Payscale Kenya Tier 2'],
    ['Video Producer', 'KSh 60K–100K/month', 'Payscale Kenya Tier 2'],
    ['Social Media Manager', 'KSh 60K–100K/month', 'Payscale Kenya Tier 2'],
    ['Community Manager', 'KSh 50K–80K/month', 'Tier 2 benchmark'],
    ['Data & Insights Lead', 'KSh 80K–150K/month', 'Tier 2 benchmark'],
    ['Radio producer freelance', '$20–50/hour', 'Kenya industry benchmark'],
    ['Multimedia radio producer', '$20/hour', 'Industry benchmark'],
    ['Broadcast consulting / training', 'KSh 3,500/hour', 'Industry benchmark'],
  ]},
  { title: 'Studio build / Phase 1', eyebrow: '11 / sourced equipment', items: [
    ['AVMATRIX Shark S6 switcher', 'KSh 112,860', 'Cameras Africa, excl. VAT'],
    ['RODE RODECaster Video', 'KSh 125,400', 'Cameras Africa, excl. VAT'],
    ['RODE RODECaster Pro II', 'KSh 100,000 / KSh 86,999', 'Prime Audio / Nextech alternative vendors'],
    ['OSEE GoStream Duet', 'KSh 55,000 + VAT', 'Jacaranta Digitech'],
    ['PEV PRO YX12.2D mixer', 'KSh 25,000', 'DWB Entertainment'],
    ['RODE PSA1 boom arm', 'KSh 17,500', 'Everlasting Tech, excl. VAT'],
    ['Pro Mic Studio microphone', 'KSh 11,500', 'Global Oak Media'],
    ['Tolaye TUH20HH wireless mic', 'KSh 20,000', 'DWB Entertainment'],
    ['Behringer X-Air XR12', 'KSh 60,000', 'DWB Entertainment'],
    ['Pev Pro VX 160 mixer', 'KSh 40,000', 'DWB Entertainment'],
    ['6-channel powered mixer', 'KSh 16,000', 'Sourced vendor quote'],
    ['Phase 1 total (Part 6 schedule)', 'KSh 627,299–837,299', 'Items above are alternative quotes, not the Phase 1 bill of materials'],
  ]},
  { title: 'Gap audit / v1 → v2', eyebrow: '12 / rigorous fixes', items: [
    ['Baseline / rate card / competitor financials', 'Tier 0', 'Audit declared; rate card researched; competitor data gap declared'],
    ['Listener research', 'Tier 0', 'Western Kenya audience survey funded via Ask 6'],
    ['Platform economics', 'YouTube RPM (unverified) · WhatsApp $0.0225 · USSD KSh 70K/month', 'Costs researched'],
    ['Regulatory / DPA', 'KSh 4,000', 'CA Kenya, ODPC, music rights cited'],
    ['Payback / sensitivity', 'Under revision', 'Incremental model pending the audited baseline'],
    ['GAA / political cycle', 'GAA filing · IEBC calendar', 'GAA covers national-government ads; political rate card is station policy'],
    ['Podcast / music / diaspora / syndication', 'KSh 3,500/hr · KSh 10K/song · Tier 0', 'Costs or data gaps declared'],
  ]},
  { title: 'Station context & next steps', eyebrow: '13 / board action', items: [
    ['Station identity', 'Nyota FM 107.3', 'Commercial FM station based in Bungoma; Swahili with Bukusu'],
    ['Licensing', '10-year license', 'Nyota Frequency Modulation (FM) Limited, CA Kenya'],
    ['Community impact', 'Health programming', 'Past maternal and child health programming reported; partner and dates to verify'],
    ['Digital presence', 'Zeno.FM · MyTuner · Radio Kenya', 'Live stream availability'],
    ['Months 1–3 activation', '$85 + $50/mo · KSh 100K · KSh 630K–665K', 'WhatsApp BSP · GAA prequalification · Phase 1 studio procurement'],
    ['Governance cadence', 'Monthly / quarterly / annual', 'Steering committee · commercial reviews · independent brand audits'],
  ]},
];

export function DataEnrichedAnnexure() {
  const [open, setOpen] = useState(0);
  return <section id="data-annexure" className="mx-auto mt-12 w-full max-w-6xl px-4 sm:mt-20 sm:px-6">
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-hairline pb-4">
      <div><div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-brass"><Database size={13} /> sourced figures / v2.0</div><h2 className="font-display text-4xl text-paper sm:text-6xl">The data room.</h2></div>
      <div className="hidden text-right font-mono text-[10px] uppercase tracking-widest text-sage-dim sm:block">Draft for board discussion</div>
    </div>
    <p className="mb-7 max-w-2xl text-sm leading-7 text-sage">Every supplied figure is placed in the decision context where it earns attention: audience, market, connectivity, commercial design, operating cost, studio investment, and board action.</p>
    <div className="divide-y divide-hairline border-y border-hairline">
      {sections.map((section, index) => <div key={section.title}>
        <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brass"><span><span className="mr-3 font-mono text-[10px] text-brass">{section.eyebrow}</span><span className="font-display text-2xl sm:text-3xl">{section.title}</span></span><ChevronDown className={`shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`} size={18} /></button>
        {open === index && <div className="grid grid-cols-1 gap-px bg-hairline pb-5 sm:grid-cols-2 lg:grid-cols-3">{section.items.map(([label, value, note]) => <article key={label} className="bg-ink px-4 py-4 sm:px-5"><div className="mb-2 text-[10px] font-mono uppercase tracking-wider text-sage-dim">{label}</div><div className="font-display text-2xl leading-tight text-brass">{value}</div><p className="mt-2 text-xs leading-5 text-sage">{note}</p></article>)}</div>}
      </div>)}
    </div>
    <div className="flex items-center gap-2 py-5 text-xs text-sage-dim"><ExternalLink size={13} className="text-brass" /> Source list: KNBS · CA Kenya · GeoPoll · ReelAnalytics · Khusoko · ODPC · GAA · Payscale · Meta · Africa’s Talking · DataReportal · named vendor quotes.</div>
  </section>;
}

export default DataEnrichedAnnexure;
