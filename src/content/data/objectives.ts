// Moved verbatim from src/components/v2/Part1Objectives.tsx (icons stay in the component).

export interface ObjectiveData {
  id: string;
  letter: string;
  title: string;
  v1Target: string;
  realityCheck: string;
  v2Target: string;
  derivation: string;
  tier: 1 | 2;
  tierCitation: string;
  tierUrl?: string;
  tierMethod?: string;
  tierInputs?: string;
  keyStat: { label: string; value: string; badgeText: string };
}

export const objectiveData: ObjectiveData[] = [
  {
    id: 'A',
    letter: 'A',
    title: 'Increase Revenue Streams',
    v1Target: 'From spot-dominant to a diversified 8-stream portfolio.',
    realityCheck:
      'The eight-stream framework is structurally sound. However, v1.0 did not cost any of the streams or size the addressable revenue within each. The Kenya radio advertising market contracted by 5% in 2025, with radio ad spend falling to KSh 25.9 billion. Betting and gaming advertising on radio fell 89% to KSh 51 million following regulatory tightening. Financial services and transport were the largest radio advertisers. This means the diversification thesis is correct in direction but must account for a shrinking traditional base.',
    v2Target:
      'Retain the eight-stream framework, but sequence activation so that WhatsApp/USSD engagement products and branded pre-recorded shows launch before betting-dependent revenue. Prioritise financial services, agriculture, and county government as anchor sectors.',
    derivation: 'Sector spend data from CA Kenya (Tier 1). Radio ad spend decline from ReelAnalytics via Khusoko (Tier 1).',
    tier: 1,
    tierCitation: 'ReelAnalytics / Khusoko & CA Kenya Competition Study in Broadcasting',
    tierUrl: 'khusoko.com',
    keyStat: { label: 'Betting Radio Ad Spend', value: '-89% (KSh 51M)', badgeText: 'Market Collapse' }
  },
  {
    id: 'B',
    letter: 'B',
    title: 'Increase Revenue Multiplier & Mix',
    v1Target: '≈ 2.4× current baseline; 40% non-spot by Q4 2027.',
    realityCheck:
      'The 2.4× growth target is aggressive but not impossible if the baseline is properly audited. v1.0 never established the baseline. The 40% non-spot target is the more defensible ambition: with WhatsApp/USSD products, branded shows, and outside broadcasts all activating in Year 1, a 35–45% non-spot mix by Q4 2027 is achievable. The 2.4× revenue multiplier should be treated as a stretch target contingent on securing GAA registration and at least one county government retainer in Year 1.',
    v2Target:
      '2.0× baseline revenue by Q8 2028 (base case); 2.8× (upside case). 40% non-spot by Q4 2027 retained as the primary mix target.',
    derivation:
      'Modelled estimate. Method: Base case assumes 15% annual growth in spot (conservative, given 5% market decline offset by share gains) + new streams contributing 35% of total by Year 2. Upside assumes 20% spot growth + 45% non-spot. Inputs: radio market decline of 5% (ReelAnalytics/Khusoko, Tier 1); non-spot stream ramp assumptions from Part 4.',
    tier: 2,
    tierCitation: 'Base & Upside Modelled Derivation',
    tierMethod: '15% spot growth + 35% non-spot portfolio contribution (Base)',
    tierInputs: 'ReelAnalytics 2025 radio decline (-5%), GAA prequalification, Part 4 opportunity model',
    keyStat: { label: 'Target Revenue Mix', value: '40% Non-Spot', badgeText: 'Q4 2027 Base Case' }
  },
  {
    id: 'C',
    letter: 'C',
    title: 'Increase Market Share in Key Counties',
    v1Target: '#1 vernacular position in Bungoma & Trans Nzoia by GeoPoll Q4 2027.',
    realityCheck:
      "GeoPoll data covering September 2025–February 2026 confirms Mulembe FM (Royal Media Services) is the top vernacular station in Western Kenya. Mulembe broadcasts on 99.0 FM in Western Kenya, 97.9 FM in Nairobi, and 95.8 FM in Eldoret. It has national network backing. Sulwe FM (also RMS) is the #1 Bukusu-language station. Overtaking Mulembe in Bungoma — Nyota's home county — within 24 months is possible because Mulembe's audience is diffuse across the Luhya belt, whereas Nyota can concentrate on Bungoma and Trans Nzoia. Overtaking Sulwe in Bungoma is harder because Sulwe is explicitly Bukusu-focused. A realistic target is #2 vernacular in Bungoma by Q4 2027, #1 in Trans Nzoia by Q2 2028.",
    v2Target:
      '#2 vernacular position in Bungoma (behind Sulwe) by GeoPoll Q4 2027; #1 vernacular in Trans Nzoia by Q2 2028. #1 Pan-Luhya position by Q4 2028.',
    derivation: 'GeoPoll September 2025–February 2026 report (Tier 1); competitor frequency data from CA Kenya (Tier 1).',
    tier: 1,
    tierCitation: 'GeoPoll Media Report 2025–2026 & CA Kenya Frequency Register',
    tierUrl: 'geopoll.com',
    keyStat: { label: 'Bungoma Target', value: '#2 by Q4 2027', badgeText: '#1 Trans Nzoia Q2 2028' }
  },
  {
    id: 'D',
    letter: 'D',
    title: 'Audience Community Building (Addressable Base)',
    v1Target: '250,000 directly-addressable contacts by month 24.',
    realityCheck:
      'v1.0 stated Nyota FM has ~5,740 Facebook followers and ~2,000 concurrent Zeno.fm listeners. The 250,000 contact target represents a 43× increase from the Facebook baseline. WhatsApp and USSD together are the only realistic route to this scale. WhatsApp Business API conversation pricing for Kenya is $0.0040 (utility) and $0.0225 (marketing) per conversation as of 2026. USSD shortcode setup through Africa\'s Talking costs KES 145,000 setup + KES 70,000 monthly maintenance. Building to 250,000 contacts requires an opt-in acquisition cost that v1.0 never modelled. At an assumed blended acquisition cost of KSh 20–30 per contact (modelled from USSD session costs and paid-media CPMs), the total acquisition budget is KSh 5.0M–7.5M. This is achievable within the paid-media budget tiers (Tier B/C) but must be explicitly budgeted.',
    v2Target:
      '250,000 contacts retained as the stretch target; 150,000 contacts as the base-case target by month 24, with 250,000 contingent on securing USSD shortcode by Q3 2026 and maintaining Tier B/C paid-media spend.',
    derivation: "WhatsApp pricing from Meta rate card via Ominiflow (Tier 1); USSD costs from Africa's Talking Help Center (Tier 1); acquisition cost modelled estimate.",
    tier: 2,
    tierCitation: "Meta WhatsApp Rate Card / Ominiflow & Africa's Talking Fee Schedule",
    tierMethod: 'Blended acquisition model: KSh 20–30 per contact over USSD + WhatsApp + paid Meta ads',
    tierInputs: 'Meta API $0.0040/$0.0225, AT setup KES 145K, AT monthly KES 70K',
    keyStat: { label: 'Base vs Stretch Base', value: '150K / 250K', badgeText: 'Month 24 Contacts' }
  },
  {
    id: 'E',
    letter: 'E',
    title: 'Growth of Listener Loyalty & Cross-Platform Engagement',
    v1Target: 'Rising weekly active listener hours, repeat-caller frequency, Net Listener Score.',
    realityCheck:
      'No published methodology for a "Net Listener Score" exists in African radio. v1.0 invented the term without construction. Radio listenership in Kenya fell from 75% (2023) to 57% (2024) to 41% (2025) according to Media Council of Kenya surveys. This decline is most pronounced among younger and urban audiences. Loyalty growth must therefore be measured not just in listening hours but in cross-platform engagement: WhatsApp opt-in retention, USSD session frequency, app weekly active users, and repeat callers.',
    v2Target:
      'Retain Net Listener Score but define it with a transparent methodology (see Part 2, Section 2.7). Track weekly active listener hours via GeoPoll/KARF panel data, repeat-caller frequency via station call logs, and cross-platform loyalty via WhatsApp/USSD retention rates.',
    derivation: 'Media Council of Kenya State of the Media Reports 2024 and 2025 (Tier 1).',
    tier: 1,
    tierCitation: 'Media Council of Kenya State of the Media Report 2024 & 2025',
    tierUrl: 'mediacouncil.or.ke',
    keyStat: { label: 'National Daily Radio Reach', value: '41% in 2025', badgeText: 'Down from 75% in 2023' }
  }
];
