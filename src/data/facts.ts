import type { Fact } from './types.ts'
import { TODO_OWNER } from './types.ts'

/**
 * Market, regulatory and station facts. Every repeated figure on the site should
 * come from here. All Tier 1 entries were checked on 2026-11-25 (see sources.ts).
 * To add a fact: give it a unique key, a tier, and (for Tier 1) a sourceId.
 */
export const facts: readonly Fact[] = [
  // Radio audience
  { id: 'radio.reach.western', key: 'radio.reach.western', label: 'Radio reach, Western Kenya', value: '83%', period: 'Apr–Jun 2026', geo: 'Western', tier: 1, sourceId: 'ca-amr-q4-fy2526', note: 'Table 3; past-period reach, not daily listening' },
  { id: 'radio.reach.national', key: 'radio.reach.national', label: 'Radio reach, national', value: '75%', period: 'Apr–Jun 2026', geo: 'Kenya', tier: 1, sourceId: 'ca-amr-q4-fy2526', note: 'Table 3' },
  { id: 'radio.listeners.national', key: 'radio.listeners.national', label: 'Radio listeners, national', value: '24.4M', period: 'Apr–Jun 2026', geo: 'Kenya', tier: 1, sourceId: 'ca-amr-q4-fy2526', note: 'Table 5' },
  { id: 'radio.vernacularShare.western', key: 'radio.vernacularShare.western', label: 'Vernacular share of radio listening, Western', value: '16%', period: 'Apr–Jun 2026', geo: 'Western', tier: 1, sourceId: 'ca-amr-q4-fy2526', note: 'Table 6; Swahili dominates' },
  { id: 'radio.content.news', key: 'radio.content.news', label: 'News share of radio content consumed', value: '49.12%', period: 'Apr–Jun 2026', geo: 'Kenya', tier: 1, sourceId: 'ca-amr-q4-fy2526', note: 'Fig. 9' },
  { id: 'radio.adspend.q4fy2526', key: 'radio.adspend.q4fy2526', label: 'Radio ad spend by sector', value: 'KES 5,073M total; Banking & Finance 1,291M; Agriculture & gardening equipment 494M', period: 'Apr–Jun 2026', geo: 'Kenya', tier: 1, sourceId: 'ca-amr-q4-fy2526', note: 'Tables 8 & 11' },
  { id: 'radio.dailyListenership', key: 'radio.dailyListenership', label: 'Daily radio listenership', value: '75% → 57% → 41%', period: '2023 → 2024 → 2025', geo: 'Kenya', tier: 1, sourceId: 'mck-som-2025-star', note: 'MCK State of the Media; daily, not weekly' },

  // Advertising market
  { id: 'adspend.2025', key: 'adspend.2025', label: 'Mainstream ad spend 2025', value: 'KSh 66.3B (−22%); radio 25.9B (−5%); TV 39.1B; print 1.4B; OOH 6.4B', period: '2025', geo: 'Kenya', tier: 1, sourceId: 'khusoko-adspend-2025' },
  { id: 'adspend.h1.2026', key: 'adspend.h1.2026', label: 'Ad spend H1 2026', value: 'KES 29.53B total; radio KES 11.90B (−23% vs H2 2025); Betting & Gambling KES 2.33B (#3 sector)', period: 'Jan–Jun 2026', geo: 'Kenya', tier: 1, sourceId: 'khusoko-adspend-h1-2026' },
  { id: 'betting.radio.q1fy2526', key: 'betting.radio.q1fy2526', label: 'Betting radio ad spend, one quarter', value: 'KSh 51M (from KSh 513M the previous quarter)', period: 'Jul–Sep 2025', geo: 'Kenya', tier: 1, sourceId: 'allafrica-betting' },

  // Devices and digital
  { id: 'devices.smartphones.jun2026', key: 'devices.smartphones.jun2026', label: 'Mobile connections', value: '52.26M smartphones; 27.42M feature phones', period: 'Jun 2026', geo: 'Kenya', tier: 1, sourceId: 'techtrendske-smartphones', note: 'Connections, not people' },
  { id: 'digital.oct2026', key: 'digital.oct2026', label: 'Digital audience', value: 'Internet users 23.9M (40.6%); Facebook ad reach 19.0M; YouTube 13.8M; TikTok 23.9M (18+); WhatsApp used by 72.5% of internet users 16+', period: 'Oct 2026', geo: 'Kenya', tier: 1, sourceId: 'datareportal-2027' },
  { id: 'whatsapp.pricing', key: 'whatsapp.pricing', label: 'WhatsApp Business Platform pricing', value: 'Per message since 1 Jul 2025; Rest of Africa marketing US$0.0225, utility US$0.004 (before BSP mark-up)', period: '2026', geo: 'Rest of Africa', tier: 1, sourceId: 'meta-whatsapp-pricing' },
  { id: 'ussd.at.dedicated', key: 'ussd.at.dedicated', label: 'Dedicated USSD code (Africa’s Talking)', value: 'Safaricom KSh 70,000/month; Airtel KSh 116,000 + 46,400/month; Telkom KSh 58,000 + 116,000/month (VAT incl.)', period: '2026', geo: 'Kenya', tier: 1, sourceId: 'at-ussd-dedicated' },
  { id: 'tiktok.crp', key: 'tiktok.crp', label: 'TikTok monetisation in Kenya', value: 'Creator Rewards not available in Kenya; 200+ Kenyan creators earned >US$350K via brand collaborations', period: 'Oct 2026', geo: 'Kenya', tier: 1, sourceId: 'businessradar-tiktok' },
  { id: 'zeno.adserver', key: 'zeno.adserver', label: 'Zeno Media self-serve ad server', value: 'Launched in Zeno Tools, Nov 2025 (location, device, station, time-of-day targeting)', period: 'Nov 2025', tier: 1, sourceId: 'zeno-ad-server' },
  { id: 'browser.opera.share', key: 'browser.opera.share', label: 'Opera share of Kenyan mobile browsing', value: '≈26–29%', period: 'Jun–Jul 2026', geo: 'Kenya', tier: 1, sourceId: 'statcounter-kenya-mobile' },

  // Regulation and costs
  { id: 'odpc.fees', key: 'odpc.fees', label: 'ODPC registration fees', value: 'KSh 4,000 / 16,000 / 40,000; renewals 2,000 / 9,000 / 25,000; valid 24 months', tier: 1, sourceId: 'odpc-faqs' },
  { id: 'royalties.tariff2026', key: 'royalties.tariff2026', label: 'Music royalty tariff 2026–2028', value: 'National radio 4% of net revenue, minimum KSh 500,000/year; 5% monthly compounded late penalty', period: '2026–2028', tier: 1, sourceId: 'khusoko-tariffs-2026' },
  { id: 'royalties.regionalMinimum', key: 'royalties.regionalMinimum', label: 'Regional-station royalty minimum (≤5 counties)', value: TODO_OWNER, tier: 0, method: 'Read from the gazetted Consolidated Music Tariffs 2026–2028' },
  { id: 'cmo.status', key: 'cmo.status', label: 'Music CMO licensing status', value: 'MCSK unlicensed for 2025–26; KAMP & PAVRISK licensed 5 Nov 2025; KAMP suspended 90 days from 1 Jul 2026; 2027 round opened 4 Sep 2026', period: 'Nov 2026', tier: 1, sourceId: 'dpa-kamp-suspension' },

  // Population
  { id: 'population.2019', key: 'population.2019', label: 'Five-county population (2019 Census)', value: 'Bungoma 1,670,570; Kakamega 1,867,579; Trans Nzoia 990,341; Busia 893,681; Vihiga 590,013; total 6,012,184', period: '2019', geo: 'Five counties', tier: 1, sourceId: 'knbs-census-2019' },
  { id: 'luhya.2019', key: 'luhya.2019', label: 'Luhya population (2019 Census)', value: 'Luhya 6,823,842; “Luhya” (so stated) 3,944,257; Bukusu 1,188,963', period: '2019', geo: 'Kenya', tier: 1, sourceId: 'statskenya-ethnicity' },

  // Economy and context
  { id: 'remittances', key: 'remittances', label: 'Diaspora remittances', value: 'US$5.04B (2025); Jan–Oct 2026 US$4.19B; US 43.5% of inflows, UK 2.4% of cash', period: '2025–2026', geo: 'Kenya', tier: 1, sourceId: 'khusoko-remittances-2025', note: 'No regional split is published' },
  { id: 'maize.price', key: 'maize.price', label: 'Maize price (90 kg)', value: 'NCPB floor KSh 4,000 (Jan 2026); KSh 3,800–4,100 in producing areas (Aug 2026)', period: '2026', geo: 'Kenya', tier: 1, sourceId: 'kna-maize-aug-2026' },
  { id: 'power.event', key: 'power.event', label: 'Grid outage', value: 'Musaga substation fire (7 Aug 2026) blacked out five Western counties', period: 'Aug 2026', geo: 'Western', tier: 1, sourceId: 'citizen-musaga-fire' },
  { id: 'election.limits', key: 'election.limits', label: 'Campaign spending limits', value: 'Gazetted 7 Aug 2026; stayed by the High Court', period: 'Nov 2026', tier: 1, sourceId: 'nation-campaign-limits' },

  // Station data the owner must supply
  { id: 'station.baselineRevenue', key: 'station.baselineRevenue', label: 'Audited baseline revenue (last 24 months)', value: TODO_OWNER, tier: 0, method: 'Management accounts, split spot / sponsorship / OB / digital' },
  { id: 'station.digitalBaseline', key: 'station.digitalBaseline', label: 'Station digital baseline', value: TODO_OWNER, tier: 0, method: 'Export Facebook followers from Meta Business Suite and stream sessions from the Zeno dashboard' },
  { id: 'station.audienceShare', key: 'station.audienceShare', label: 'Nyota audience share, Western Kenya', value: TODO_OWNER, tier: 0, method: 'Western Kenya audience survey (GeoPoll / KARF oversample), funded by Ask 6' },
]

export const factById = (id: string) => facts.find((f) => f.id === id)

/** Value of a fact, or throws in development if the id is wrong (catches typos early). */
export function factValue(id: string): string {
  const f = factById(id)
  if (!f) throw new Error(`Unknown fact id: ${id}`)
  return f.value
}
