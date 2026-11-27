// Moved verbatim from src/components/v2/Part4Opportunities.tsx. Single source for the chapter read layer and the detail layer.

export interface Opportunity {
  rank: number;
  name: string;
  revenue: string;
  cost: string;
  time: string;
  difficulty: 'Low' | 'Medium' | 'High';
  score: number;
  highlight?: boolean;
  rationale: string;
}

export const opportunities: Opportunity[] = [
  {
    rank: 1,
    name: 'GAA / County Government Vendor',
    revenue: 'KSh 2M – 8M',
    cost: 'Low – Medium',
    time: '6–12 months',
    difficulty: 'Medium',
    score: 8.5,
    highlight: true,
    rationale: 'Highest expected value, relationship-driven institutional spend, and the vital operational gateway to political advertising in 2027.'
  },
  {
    rank: 2,
    name: 'WhatsApp / USSD Engagement Products',
    revenue: 'KSh 1M – 3M',
    cost: 'Medium',
    time: '3–6 months',
    difficulty: 'Medium',
    score: 8.2,
    highlight: true,
    rationale: 'Uncontested commercial space in Western Kenya; directly builds the addressable audience and delivers recurring transactional income.'
  },
  {
    rank: 3,
    name: 'Branded / Sponsored Pre-Recorded Shows',
    revenue: 'KSh 2M – 5M',
    cost: 'Medium',
    time: '3–6 months',
    difficulty: 'Low',
    score: 7.8,
    highlight: true,
    rationale: 'Four disciplined show packages with title sponsorship potential, low execution risk, and zero live airtime volatility.'
  },
  {
    rank: 4,
    name: 'Outside Broadcast (OB) Circuit',
    revenue: 'KSh 2M – 4M',
    cost: 'High',
    time: '3–6 months',
    difficulty: 'Medium',
    score: 7.2,
    highlight: true,
    rationale: 'The "Hapa Tulipo" roadshow transforms the tagline into physical community activations and high-value advertiser sponsorships.'
  },
  {
    rank: 5,
    name: 'YouTube + Social Media Monetisation',
    revenue: 'KSh 600K – 2.4M',
    cost: 'Low',
    time: '3–6 months',
    difficulty: 'Medium',
    score: 6.9,
    highlight: true,
    rationale: 'Low marginal production cost, infinitely scalable archive, and foundational asset builder for digital sponsorships.'
  },
  {
    rank: 6,
    name: 'Podcast Advertising & Distribution',
    revenue: 'KSh 500K – 2M',
    cost: 'Low',
    time: '6–12 months',
    difficulty: 'Medium',
    score: 6.5,
    rationale: 'Extracts evergreen on-demand value from studio recordings and reaches urban diaspora listeners on Spotify/Apple.'
  },
  {
    rank: 7,
    name: 'Political Advertising (2027 General Election)',
    revenue: 'KSh 2M – 10M (episodic)',
    cost: 'Low',
    time: 'Q3 2027',
    difficulty: 'Low',
    score: 6.2,
    rationale: 'Massive cyclical cash injection across Western Kenya gubernatorial, senatorial, and parliamentary contests.'
  },
  {
    rank: 8,
    name: 'Agriculture Value-Chain Advertising',
    revenue: 'KSh 500K – 2M',
    cost: 'Medium',
    time: '6–12 months',
    difficulty: 'Medium',
    score: 5.8,
    rationale: 'Key economic engine of Bungoma and Trans Nzoia; commands loyal sponsor budgets from seed companies, fertilizer, and agro-vets.'
  },
  {
    rank: 9,
    name: 'Syndication & Content Licensing',
    revenue: 'KSh 500K – 2M',
    cost: 'Medium',
    time: '12–18 months',
    difficulty: 'High',
    score: 5.2,
    rationale: 'Sub-regional distribution of high-production shows to community stations across the East Africa border belt.'
  },
  {
    rank: 10,
    name: 'Diaspora Engagement & Greetings',
    revenue: 'KSh 500K – 2M',
    cost: 'Medium',
    time: '6–12 months',
    difficulty: 'High',
    score: 5.0,
    rationale: 'High purchasing power diaspora in Nairobi, the Gulf, the UK, and North America seeking direct home connection.'
  },
  {
    rank: 11,
    name: 'Merchandise Catalogue (12 SKUs)',
    revenue: 'KSh 200K – 500K (net)',
    cost: 'Low – Medium',
    time: '3–6 months',
    difficulty: 'Low',
    score: 4.8,
    rationale: 'Physical brand affinity and pride; deployed via print-on-demand to eradicate inventory capital risk.'
  },
  {
    rank: 12,
    name: 'Live Events Ticketing',
    revenue: 'KSh 500K – 3M',
    cost: 'High',
    time: '6–12 months',
    difficulty: 'High',
    score: 4.5,
    rationale: 'High crowd energy but volatile logistics and security exposure; recommended only as marquee annual tentpoles.'
  },
];
