import type { SourceId } from './sources'

/**
 * Figure registry: the single source of truth for every number in the story.
 *
 * Rules
 * - `display` follows house style (KSh 1.5M, 40%, 2.0×, Month 5).
 * - `exact` is the value exactly as the v2.0 source states it; used in audit views.
 * - `verified` is true only for a single-valued, externally sourced (Tier 1) figure
 *   with no conflicting variant. Modelled, conflicting or unsourced figures render
 *   with a "provisional" marker until the owner confirms a canonical value.
 * - `conflict` groups variants of the same concept. Nothing is resolved here:
 *   every variant is registered with where it appears. See docs/OPEN_QUESTIONS.md.
 */
export type FigureUnit = 'KSh' | 'USD' | '%' | '×' | 'people' | 'month' | 'quarter' | 'count' | 'rank' | 'index' | 'duration'

export interface FigureEntry {
  id: string
  value: number | readonly [number, number] | null
  unit: FigureUnit
  display: string
  exact?: string
  sourceId: SourceId
  verified: boolean
  note: string
  conflict?: string
  /** Where this variant appears in the pre-redesign site. */
  appears?: string
}

const f = <const T extends FigureEntry>(entry: T): T => entry

export const figureList = [
  // ── Market (Chapter 02) ────────────────────────────────────────────
  f({ id: 'radio-adspend', value: 25_900_000_000, unit: 'KSh', display: 'KSh 25.9B', exact: 'KSh 25.9 billion', sourceId: 's22', verified: true, note: 'Kenya radio advertising spend, 2025 (ReelAnalytics via Khusoko).', appears: 'Part 1 objective A; annexure' }),
  f({ id: 'radio-adspend-change', value: -5, unit: '%', display: '5%', exact: 'contracted by 5% in 2025', sourceId: 's22', verified: true, note: 'Year-on-year fall in radio ad spend, 2025.', appears: 'Part 1, 3, 5; annexure' }),
  f({ id: 'betting-radio-spend', value: 51_000_000, unit: 'KSh', display: 'KSh 51M', exact: 'KSh 51 million', sourceId: 's23', verified: true, note: 'Betting and gaming advertising on radio after regulatory tightening.', appears: 'Part 1, 2, 3' }),
  f({ id: 'betting-radio-before', value: 513_000_000, unit: 'KSh', display: 'KSh 513M', exact: 'KSh 513M', sourceId: 's23', verified: true, note: 'Betting radio ad spend before the collapse.', appears: 'Part 2.3, 3.1' }),
  f({ id: 'betting-radio-change', value: -89, unit: '%', display: '89%', exact: 'fell 89%', sourceId: 's23', verified: true, note: 'Fall in betting radio ad spend (KSh 513M to KSh 51M).', appears: 'Part 1, 2, 3, 5' }),
  f({ id: 'fin-services-radio-spend', value: 1_300_000_000, unit: 'KSh', display: 'KSh 1.3B', exact: 'KSh 1,300M (21% of radio spend)', sourceId: 's4', verified: true, note: 'Financial services: the largest radio advertising sector (21%).', appears: 'Part 2.3, 3.1' }),
  f({ id: 'listenership-western', value: 81, unit: '%', display: '81%', exact: '81% (Q2 2025/26)', sourceId: 's3', verified: true, note: 'Western Kenya radio listenership, CA Kenya Q2 2025/26.', appears: 'Part 2.1.2, 5.1, 5.11; annexure' }),
  f({ id: 'radio-reach-2023', value: 75, unit: '%', display: '75%', sourceId: 's5', verified: false, conflict: 'national-reach', note: 'National daily radio reach, 2023 (Media Council of Kenya).', appears: 'Part 1 objective E, 2.1.2, 3.5' }),
  f({ id: 'radio-reach-2025', value: 41, unit: '%', display: '41%', sourceId: 's6', verified: false, conflict: 'national-reach', note: 'National daily radio reach, 2025 (Media Council of Kenya). The annexure labels a 57% → 41% series "top-three audience consolidation" instead.', appears: 'Part 1 objective E, 2.1.2, 3.5' }),
  f({ id: 'radio-reach-consolidation', value: [57, 41], unit: '%', display: '57% → 41%', sourceId: 'unsourced', verified: false, conflict: 'national-reach', note: 'Annexure label: "top-three audience consolidation, declined in 2025". Part 1 gives the same numbers as national reach for 2024 (57%) and 2025 (41%).', appears: 'DataEnrichedAnnexure §02' }),
  f({ id: 'smartphone-penetration', value: 92.9, unit: '%', display: '92.9%', exact: '92.9% (Dec 2025)', sourceId: 's30', verified: true, note: 'Kenya smartphone penetration, December 2025.', appears: 'Part 2.1.3, 5.7; annexure' }),
  f({ id: 'feature-phones', value: 27_420_000, unit: 'count', display: '27.42M', exact: '27.42 Million (June 2026)', sourceId: 's30', verified: true, note: 'Feature phone connections in Kenya, June 2026: the USSD audience.', appears: 'Part 2.1.3, 5.6; briefing' }),

  // Five-county market size
  f({ id: 'tam-2019', value: 6_012_184, unit: 'people', display: '6.0M', exact: '6,012,184', sourceId: 's1', verified: true, conflict: 'tam', note: 'Five-county population, KNBS 2019 Census.', appears: 'Part 2.1.1; annexure' }),
  f({ id: 'tam-2025', value: 6_632_427, unit: 'people', display: '6.6M', exact: '≈ 6,632,427', sourceId: 's2', verified: false, conflict: 'tam', note: 'KNBS-derived 2025 projection used as the v2.0 baseline.', appears: 'Part 2.1.1, 3.2' }),
  f({ id: 'tam-2026', value: 6_762_168, unit: 'people', display: '6.76M', exact: '≈ 6,762,168', sourceId: 's2', verified: false, conflict: 'tam', note: 'KNBS-derived 2026 projection.', appears: 'Part 2.1.1, 3.2' }),
  f({ id: 'tam-hero', value: 6_000_000, unit: 'people', display: '6M+', sourceId: 's1', verified: false, conflict: 'tam', note: 'Rounded figure in the old hero copy ("6M+ citizens").', appears: 'DocumentHero' }),
  f({ id: 'tam-v1', value: 7_200_000, unit: 'people', display: '7.2M', exact: 'approximately 7.2 million', sourceId: 'v1', verified: false, conflict: 'tam', note: 'v1.0 figure, corrected in v2.0 as inflated.', appears: 'Part 2.1.1, 3.2' }),

  // ── Objectives (Chapter 01) ────────────────────────────────────────
  f({ id: 'objectives-count', value: 5, unit: 'count', display: '5', sourceId: 'model', verified: true, note: 'Five ownership objectives (A–E) carried from v1.0.' }),
  f({ id: 'nonspot-target', value: 40, unit: '%', display: '40%', exact: '40% non-spot by Q4 2027', sourceId: 'model', verified: false, note: 'Non-spot share of revenue by Q4 2027: the primary mix target (base case).', appears: 'Part 1 objective B, 3.4' }),
  f({ id: 'nonspot-worst', value: 25, unit: '%', display: '25%', sourceId: 'model', verified: false, note: 'Non-spot share in the worst case (no GAA, USSD delayed).', appears: 'Part 3.4, 3.5' }),
  f({ id: 'nonspot-best', value: 45, unit: '%', display: '45%', sourceId: 'model', verified: false, note: 'Non-spot share in the best case.', appears: 'Part 3.4' }),
  f({ id: 'contacts-base', value: 150_000, unit: 'count', display: '150K', exact: '150,000 contacts by month 24', sourceId: 'model', verified: false, conflict: 'contacts', note: 'Base-case directly addressable contacts by Month 24.', appears: 'Part 1 objective D' }),
  f({ id: 'contacts-stretch', value: 250_000, unit: 'count', display: '250K', exact: '250,000 contacts', sourceId: 'model', verified: false, conflict: 'contacts', note: 'Stretch target, contingent on USSD by Q3 2026 and Tier B/C paid media.', appears: 'Part 1, 3.2, 3.5, 7' }),
  f({ id: 'whatsapp-optins-m24', value: 120_000, unit: 'count', display: '120K', exact: '120,000', sourceId: 'model', verified: false, conflict: 'contacts', note: 'Strategy 5.5 KPI: verified WhatsApp opt-ins at Month 24 (WhatsApp only, not all channels).', appears: 'Part 5.5' }),
  f({ id: 'acquisition-budget', value: [5_000_000, 7_500_000], unit: 'KSh', display: 'KSh 5.0M–7.5M', sourceId: 'model', verified: false, note: 'Contact acquisition budget at KSh 20–30 per contact.', appears: 'Part 1 objective D, 3.2' }),

  f({ id: 'radio-reach-2024', value: 57, unit: '%', display: '57%', sourceId: 's5', verified: false, conflict: 'national-reach', note: 'National daily radio reach, 2024 (Media Council of Kenya).', appears: 'Part 1 objective E' }),
  f({ id: 'bungoma-rank-target', value: 2, unit: 'rank', display: '#2', sourceId: 's7', verified: false, note: '#2 vernacular station in Bungoma (behind Sulwe FM) by GeoPoll Q4 2027; #1 in Trans Nzoia by Q2 2028.', appears: 'Part 1 objective C' }),

  // ── Model (Chapter 03) ─────────────────────────────────────────────
  f({ id: 'rev-multiple-base', value: 2.0, unit: '×', display: '2.0×', exact: 'Revenue index 200 (2.0×), Q4 2027', sourceId: 'model', verified: false, conflict: 'revenue-multiple', note: 'Base-case revenue against the Q1 2026 baseline (index 100). Part 3 reaches it at Q4 2027; Part 1 says "by Q8 2028".', appears: 'Part 1 objective B, 3.2, 3.4' }),
  f({ id: 'rev-multiple-worst', value: 1.4, unit: '×', display: '1.4×', exact: '140 (1.4×)', sourceId: 'model', verified: false, conflict: 'revenue-multiple', note: 'Worst case: no GAA registration, USSD delayed, spot −10%.', appears: 'Part 3.4, 3.5; annexure' }),
  f({ id: 'rev-multiple-best', value: 2.8, unit: '×', display: '2.8×', exact: '280 (2.8×)', sourceId: 'model', verified: false, conflict: 'revenue-multiple', note: 'Best / upside case: GAA plus two county retainers and two syndication deals.', appears: 'Part 1 objective B, 3.4' }),
  f({ id: 'rev-multiple-v1', value: 2.4, unit: '×', display: '2.4×', sourceId: 'v1', verified: false, conflict: 'revenue-multiple', note: 'v1.0 growth target, now treated as a stretch target.', appears: 'Part 1, 3.2; old slide deck' }),
  f({ id: 'commercial-yield', value: 4.6, unit: '×', display: '4.6×', sourceId: 'unsourced', verified: false, conflict: 'revenue-multiple', note: '"Commercial yield / campaign return, modelled" with no method or source.', appears: 'MinimalNarrative, VisualPlaybook' }),
  f({ id: 'rev-date-model', value: null, unit: 'quarter', display: 'Q4 2027', sourceId: 'model', verified: false, conflict: 'revenue-date', note: 'Quarter in which the Part 3 model reaches index 200.', appears: 'Part 3.4' }),
  f({ id: 'rev-date-part1', value: null, unit: 'quarter', display: 'Q8 2028', sourceId: 'model', verified: false, conflict: 'revenue-date', note: 'Part 1 objective B wording ("2.0× baseline revenue by Q8 2028").', appears: 'Part 1 objective B' }),
  f({ id: 'model-quarters', value: 8, unit: 'count', display: '8', sourceId: 'model', verified: true, note: 'Quarters in the payback model (Q1 2026 to Q4 2027).' }),
  f({ id: 'breakeven-base', value: 5, unit: 'month', display: 'Month 5', sourceId: 'model', verified: false, conflict: 'payback', note: 'Base-case month in which cumulative cash recovers Phase 1 capex.', appears: 'Capex waterfall' }),
  f({ id: 'breakeven-conservative', value: 7, unit: 'month', display: 'Month 7', sourceId: 'model', verified: false, conflict: 'payback', note: 'Conservative scenario break-even.', appears: 'Capex waterfall' }),
  f({ id: 'breakeven-accelerated', value: 4, unit: 'month', display: 'Month 4', sourceId: 'model', verified: false, conflict: 'payback', note: 'Accelerated scenario break-even.', appears: 'Capex waterfall' }),
  f({ id: 'breakeven-range', value: [4, 7], unit: 'month', display: 'Month 4–7', sourceId: 'model', verified: false, conflict: 'payback', note: 'Payback window stated in the briefing memo; matches the three waterfall scenarios.', appears: 'ExecutiveBriefingMode' }),
  f({ id: 'payback-simulator', value: 1, unit: 'month', display: '1 month', sourceId: 'model', verified: false, conflict: 'payback', note: 'The payback simulator computes about one month at its defaults (Phase 1, base, three OBs a month). It uses different revenue inputs from the waterfall.', appears: 'InteractivePaybackSimulator' }),

  // ── Capex (Chapters 03, 06) ────────────────────────────────────────
  f({ id: 'capex-p1', value: [627_299, 837_299], unit: 'KSh', display: 'KSh 627K–837K', exact: 'KSh 627,299 – 837,299', sourceId: 's11', verified: false, conflict: 'capex-p1', note: 'Studio Phase 1 (visual radio foundation), researched vendor quotes.', appears: 'Part 2.5, 5.2, 6.2, asks, briefing' }),
  f({ id: 'capex-p1-annex', value: [630_000, 665_000], unit: 'KSh', display: 'KSh 630K–665K', sourceId: 'unsourced', verified: false, conflict: 'capex-p1', note: 'Annexure "Phase 1 sourced total, equipment only": a different kit list (mixers, RODECaster, switchers).', appears: 'DataEnrichedAnnexure §11, §13' }),
  f({ id: 'capex-p1-sim', value: 732_000, unit: 'KSh', display: 'KSh 732K', exact: 'KSh 732,000 (Avg)', sourceId: 'model', verified: false, conflict: 'capex-p1', note: 'Average used by the payback simulator.', appears: 'InteractivePaybackSimulator' }),
  f({ id: 'capex-p1-v1', value: [2_200_000, 3_800_000], unit: 'KSh', display: 'KSh 2.2M–3.8M', sourceId: 'v1', verified: false, conflict: 'capex-p1', note: 'v1.0 Phase 1 envelope.', appears: 'Part 2.5' }),
  f({ id: 'capex-p1-saving', value: 1_500_000, unit: 'KSh', display: 'KSh 1.5M', exact: 'Saves > KSh 1.5M', sourceId: 'model', verified: false, note: 'Saving of the researched Phase 1 quote against v1.0.', appears: 'Part 2.5, 6.2, briefing' }),
  f({ id: 'capex-p2', value: [1_841_800, 2_957_800], unit: 'KSh', display: 'KSh 1.84M–2.96M', exact: 'KSh 1,841,800 – 2,957,800', sourceId: 's14', verified: false, note: 'Studio Phase 2 (multi-cam live production), Months 5–10.', appears: 'Part 5.3, 6.2' }),
  f({ id: 'capex-p3', value: [2_500_000, 5_800_000], unit: 'KSh', display: 'KSh 2.5M–5.8M', exact: 'KSh 2,500,000 – 5,800,000', sourceId: 'model', verified: false, note: 'Studio Phase 3 (multi-platform hub), Months 11–18. Includes Tier 0 gaps.', appears: 'Part 5.4, 6.2' }),
  f({ id: 'capex-total', value: [4_969_099, 9_595_099], unit: 'KSh', display: 'KSh 4.97M–9.60M', exact: 'KSh 4,969,099 – 9,595,099', sourceId: 'model', verified: false, conflict: 'capex-total', note: 'All three studio phases over 18 months.', appears: 'Part 6.2' }),
  f({ id: 'capex-hero-range', value: [627_000, 9_600_000], unit: 'KSh', display: 'KSh 627K–9.60M', sourceId: 'model', verified: false, conflict: 'capex-total', note: 'Old hero and search card: the Phase 1 low end to the all-phase high end.', appears: 'DocumentHero, SearchModal' }),
  f({ id: 'capex-total-sim', value: 4_970_000, unit: 'KSh', display: 'KSh 4.97M', exact: 'KSh 4,970,000', sourceId: 'model', verified: false, conflict: 'capex-total', note: 'Payback simulator "Full Phase 1–3" value.', appears: 'InteractivePaybackSimulator' }),
  f({ id: 'capex-v1-total', value: [12_700_000, 21_300_000], unit: 'KSh', display: 'KSh 12.7M–21.3M', sourceId: 'v1', verified: false, note: "v1.0's unresearched studio envelope.", appears: 'Part 6.2' }),
  f({ id: 'capex-reduction', value: 50, unit: '%', display: 'more than 50%', exact: '> 50% Reduction', sourceId: 'model', verified: false, note: 'Reduction of the researched build against v1.0.', appears: 'Part 6.2' }),
  f({ id: 'ksh-320k-ob', value: 320_000, unit: 'KSh', display: 'KSh 320K', sourceId: 'model', verified: false, conflict: 'ksh-320k', note: 'OB van Phase 2 conversion (one item, not a capex total).', appears: 'OBVanExplorer' }),
  f({ id: 'ksh-320k-ups', value: 320_000, unit: 'KSh', display: 'KSh 320K', sourceId: 'model', verified: false, conflict: 'ksh-320k', note: 'Generator and UPS rig, and separately the OB field rig, in the gap workbench.', appears: 'InteractiveGapAuditWorkbench' }),
  f({ id: 'build-months', value: 18, unit: 'duration', display: '18 months', sourceId: 'model', verified: true, note: 'Studio build period across three phases.' }),
  f({ id: 'roadmap-months', value: 24, unit: 'duration', display: '24 months', sourceId: 'model', verified: true, note: 'Roadmap length, Q1 2026 to Q4 2027.' }),
  f({ id: 'studio-phases', value: 3, unit: 'count', display: '3', sourceId: 'model', verified: true, note: 'Gated studio build phases.' }),

  // ── Opportunities (Chapter 04) ─────────────────────────────────────
  f({ id: 'opp-count', value: 12, unit: 'count', display: '12', sourceId: 'model', verified: false, conflict: 'lever-count', note: 'Ranked revenue streams in the opportunity matrix.', appears: 'Part 4, hero' }),
  f({ id: 'lever-count-part2', value: 14, unit: 'count', display: '14', sourceId: 'model', verified: false, conflict: 'lever-count', note: 'Revenue levers listed in the master data table (Part 2.8).', appears: 'Part 2.8' }),
  f({ id: 'channel-count-part3', value: 11, unit: 'count', display: '11', sourceId: 'model', verified: false, conflict: 'lever-count', note: 'Channels assessed in the whitespace portfolio (Part 3.3).', appears: 'Part 3.3' }),
  f({ id: 'opp-gaa-value', value: [2_000_000, 8_000_000], unit: 'KSh', display: 'KSh 2M–8M', sourceId: 'model', verified: false, conflict: 'gaa-value', note: 'GAA / county government vendor: annual revenue at maturity, rank 1 (score 8.5).', appears: 'Part 4' }),
  f({ id: 'gaa-value-part2', value: [1_000_000, 5_000_000], unit: 'KSh', display: 'KSh 1M–5M', sourceId: 'model', verified: false, conflict: 'gaa-value', note: 'County government vendor line in Part 2.8 (GAA listed separately at KSh 500K–3M).', appears: 'Part 2.8' }),
  f({ id: 'gaa-value-briefing', value: 4_500_000, unit: 'KSh', display: 'KSh 4.5M+', sourceId: 'unsourced', verified: false, conflict: 'gaa-value', note: '"Annual national public sector civic campaign budgets" in the briefing memo.', appears: 'ExecutiveBriefingMode' }),
  f({ id: 'gaa-value-annex', value: 24_500_000, unit: 'KSh', display: 'KSh 24.5M/week', sourceId: 'unsourced', verified: false, conflict: 'gaa-value', note: 'Government advertising, "old contract" (annexure).', appears: 'DataEnrichedAnnexure §07, §08' }),
  f({ id: 'opp-mobile-value', value: [1_000_000, 3_000_000], unit: 'KSh', display: 'KSh 1M–3M', sourceId: 'model', verified: false, note: 'WhatsApp / USSD engagement products, rank 2 (score 8.2).', appears: 'Part 4' }),
  f({ id: 'opp-shows-value', value: [2_000_000, 5_000_000], unit: 'KSh', display: 'KSh 2M–5M', sourceId: 'model', verified: false, note: 'Branded pre-recorded shows, rank 3 (score 7.8).', appears: 'Part 4' }),
  f({ id: 'opp-political-value', value: [2_000_000, 10_000_000], unit: 'KSh', display: 'KSh 2M–10M', sourceId: 'model', verified: false, note: 'Political advertising, 2027 General Election (episodic).', appears: 'Part 2.8, 4, 7' }),

  // ── Strategies (Chapter 05) ────────────────────────────────────────
  f({ id: 'strategy-count', value: 21, unit: 'count', display: '21', sourceId: 'model', verified: true, note: 'Costed action strategies (5.1 to 5.21).' }),
  f({ id: 'workstream-count', value: 5, unit: 'count', display: '5', sourceId: 'model', verified: true, note: 'Workstreams the strategies are grouped into.' }),
  f({ id: 'shows-count', value: 4, unit: 'count', display: '4', sourceId: 'model', verified: true, note: 'Pre-recorded show formats.' }),
  f({ id: 'studio-p1-done', value: 4, unit: 'month', display: 'Month 4', sourceId: 'model', verified: false, conflict: 'p1-date', note: 'Strategy 5.2: Phase 1 installation complete by Month 4.', appears: 'Part 5.2, 6.2' }),
  f({ id: 'studio-p1-done-part3', value: null, unit: 'quarter', display: 'Q2 2026', sourceId: 'model', verified: false, conflict: 'p1-date', note: 'Part 3 "what must be true": Studio Phase 1 completed by Q2 2026.', appears: 'Part 3.4' }),
  f({ id: 'ussd-live', value: null, unit: 'quarter', display: 'Q3 2026', sourceId: 'model', verified: false, note: 'USSD shortcode live on air (5.6, 6.1, 3.4).', appears: 'Part 3.4, 5.6, 6.1' }),
  f({ id: 'shows-live', value: null, unit: 'quarter', display: 'Q3 2026', sourceId: 'model', verified: false, note: 'Shows 3 and 4 launch; all four on air (5.1).', appears: 'Part 5.1, 6.1' }),
  f({ id: 'gaa-date-5-14', value: null, unit: 'quarter', display: 'Q2 2026', sourceId: 'model', verified: false, conflict: 'gaa-date', note: 'Strategy 5.14: GAA registration secured by Q2 2026.', appears: 'Part 5.14' }),
  f({ id: 'gaa-date-part3', value: null, unit: 'quarter', display: 'Q2 2027', sourceId: 'model', verified: false, conflict: 'gaa-date', note: 'Part 3 "what must be true": GAA registration completed by Q2 2027.', appears: 'Part 3.4' }),

  // ── Gap audit (Chapter 07) ─────────────────────────────────────────
  f({ id: 'gaps-count', value: 20, unit: 'count', display: '20', sourceId: 'model', verified: true, note: 'Checklist A: v1.0 proposal gaps, all closed in v2.0.' }),
  f({ id: 'build-items-count', value: 40, unit: 'count', display: '40', sourceId: 'model', verified: true, note: 'Checklist B: operational build items with owners.' }),
  f({ id: 'levers-count', value: 12, unit: 'count', display: '12', sourceId: 'model', verified: true, note: 'Checklist C: revenue levers v1.0 omitted.' }),
  f({ id: 'baseline-survey-cost', value: [500_000, 1_000_000], unit: 'KSh', display: 'KSh 500K–1M', sourceId: 'model', verified: false, note: 'GeoPoll / KARF audience baseline survey (Tier 0 gap), 6–8 weeks.', appears: 'Part 2.7, 7' }),

  // ── Asks and sources ───────────────────────────────────────────────
  f({ id: 'asks-count', value: 6, unit: 'count', display: 'six', sourceId: 'model', verified: false, conflict: 'ask-count', note: 'Six asks of ownership (source list).', appears: 'SourceListAndAsks, MinimalNarrative' }),
  f({ id: 'asks-count-briefing', value: 5, unit: 'count', display: 'five', sourceId: 'model', verified: false, conflict: 'ask-count', note: 'Five resolutions in the earlier briefing memo, with different content.', appears: 'ExecutiveBriefingMode, slide deck' }),
  f({ id: 'sources-count', value: 37, unit: 'count', display: '37', sourceId: 'model', verified: true, note: 'Named external sources in the master list.' }),

  // ── Unsourced figures from the earlier site (appendix only) ────────
  f({ id: 'reach-weekly', value: 1_800_000, unit: 'count', display: '1.8M', sourceId: 'unsourced', verified: false, conflict: 'reach', note: '"Weekly reach" with a "+18.4% vs last quarter" change and no source.', appears: 'MinimalNarrative, VisualPlaybook' }),
  f({ id: 'reach-weekly-plus', value: 1_800_000, unit: 'count', display: '1.8M+', sourceId: 'unsourced', verified: false, conflict: 'reach', note: 'Annexure note links it to 81% listenership, which does not support it.', appears: 'DataEnrichedAnnexure, WebsiteFooter' }),
  f({ id: 'reach-national-weekly', value: 33_000_000, unit: 'count', display: '~33M', sourceId: 's3', verified: false, conflict: 'reach', note: 'Weekly radio reach nationally.', appears: 'Part 2.1.2' }),
  f({ id: 'reach-national-n', value: 23_900_000, unit: 'count', display: 'n=23.9M', sourceId: 's3', verified: false, conflict: 'reach', note: 'National radio listeners, Q2 2025/26.', appears: 'DocumentHero, annexure' }),
  f({ id: 'digital-share', value: 32, unit: '%', display: '32%', sourceId: 'unsourced', verified: false, note: '"Digital share (stream + podcast)" with no source.', appears: 'MinimalNarrative, VisualPlaybook' }),

  // ── Unit-cost variants (detail only) ───────────────────────────────
  f({ id: 'whatsapp-marketing-rate', value: 0.0225, unit: 'USD', display: '$0.0225', sourceId: 's18', verified: false, conflict: 'whatsapp-rate', note: 'Marketing conversation rate (Meta via Ominiflow).', appears: 'Part 1, 2.4' }),
  f({ id: 'whatsapp-marketing-annex', value: 0.038, unit: 'USD', display: '$0.038', sourceId: 'unsourced', verified: false, conflict: 'whatsapp-rate', note: 'Per-message marketing rate in the annexure.', appears: 'DataEnrichedAnnexure' }),
  f({ id: 'whatsapp-usage-5-5', value: 19.8, unit: '%', display: '19.8%', sourceId: 's6', verified: false, conflict: 'whatsapp-usage', note: '"Direct usage in Kenya" (Strategy 5.5).', appears: 'Part 5.5' }),
  f({ id: 'whatsapp-usage-annex', value: 53.9, unit: '%', display: '53.9%', sourceId: 'unsourced', verified: false, conflict: 'whatsapp-usage', note: 'WhatsApp usage in the annexure.', appears: 'DataEnrichedAnnexure' }),
  f({ id: 'ussd-setup-vendor', value: 145_000, unit: 'KSh', display: 'KSh 145K', exact: 'KES 145,000 setup + KES 70,000 / month', sourceId: 's17', verified: false, conflict: 'ussd-setup', note: "Africa's Talking USSD setup fee.", appears: 'Part 1, 2.4, 6.4' }),
  f({ id: 'ussd-setup-budget', value: 250_000, unit: 'KSh', display: 'KSh 250K', exact: 'KSh 250,000 setup + KSh 80,000/month', sourceId: 'model', verified: false, conflict: 'ussd-setup', note: 'Strategy 5.6 budget (includes more than the vendor fee).', appears: 'Part 5.6' }),
  f({ id: 'mobile-setup-briefing', value: 156_000, unit: 'KSh', display: 'KSh 156K', sourceId: 'model', verified: false, conflict: 'ussd-setup', note: 'Briefing memo: WhatsApp BSP + USSD setup.', appears: 'ExecutiveBriefingMode' }),
  f({ id: 'gaa-fee', value: 100_000, unit: 'KSh', display: 'KSh 100K', sourceId: 's26', verified: false, conflict: 'gaa-fee', note: 'GAA accreditation (6.4, checklist B).', appears: 'Part 6.4, 7' }),
  f({ id: 'gaa-fee-5-14', value: 150_000, unit: 'KSh', display: 'KSh 150K', sourceId: 'model', verified: false, conflict: 'gaa-fee', note: 'Strategy 5.14 compliance filing and legal costs.', appears: 'Part 5.14' }),
  f({ id: 'yt-subs-m12-5-1', value: 50_000, unit: 'count', display: '50K', sourceId: 'model', verified: false, conflict: 'yt-subs', note: 'Strategy 5.1 KPI: YouTube subscribers at Month 12.', appears: 'Part 5.1' }),
  f({ id: 'yt-subs-m12-5-8', value: 40_000, unit: 'count', display: '40K', sourceId: 'model', verified: false, conflict: 'yt-subs', note: 'Strategy 5.8 KPI: YouTube subscribers at Month 12.', appears: 'Part 5.8' }),
] as const satisfies readonly FigureEntry[]

export type FigureId = (typeof figureList)[number]['id']

export const figures: Record<FigureId, FigureEntry> = Object.fromEntries(
  figureList.map((entry) => [entry.id, entry]),
) as Record<FigureId, FigureEntry>

export function isFigureId(id: string): id is FigureId {
  return id in figures
}

const allFigures: readonly FigureEntry[] = figureList

export function conflictVariants(entry: FigureEntry): FigureEntry[] {
  if (!entry.conflict) return []
  return allFigures.filter((other) => other.conflict === entry.conflict && other.id !== entry.id)
}

export const conflictGroups: string[] = [...new Set(allFigures.flatMap((e) => (e.conflict ? [e.conflict] : [])))]
