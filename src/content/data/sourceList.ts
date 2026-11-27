// Moved verbatim from src/components/v2/SourceListAndAsks.tsx. Single source for the chapter read layer and the detail layer.

export interface SourceItem {
  id: number;
  org: string;
  title: string;
  url: string;
  accessDate: string;
}

export const sourceList: SourceItem[] = [
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

export const selfChecks = [
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

export const sixAsks = [
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
