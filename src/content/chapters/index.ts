import type { ChapterCopy } from './types'

/**
 * Skim + Read layer copy for each chapter. Every sentence rephrases or connects
 * content already in the v2.0 proposal; the full original text sits in the
 * chapter's detail layer.
 */
export const chapters: Record<string, ChapterCopy> = {
  objectives: {
    id: 'objectives',
    core: "v1.0's five objectives stay the North Star. v2.0 tests each one against verified 2025/26 data and sets a target the board can bank.",
    proof: [
      { figure: 'nonspot-target', label: 'of revenue from {g:non-spot|non-spot} streams by Q4 2027, the primary mix target' },
      { figure: 'contacts-base', label: 'directly addressable contacts by Month 24 in the base case; {f:contacts-stretch} is the stretch' },
      { figure: 'bungoma-rank-target', label: 'vernacular station in Bungoma by Q4 2027, then #1 in Trans Nzoia by Q2 2028' },
    ],
    featured: 'mandates',
    featuredTitle: 'Five mandates, each with a revised, evidenced target',
    featuredSummary: 'Objectives A to E: revenue streams, revenue multiplier and mix, county market share, addressable audience, and listener loyalty.',
    detailSummary: 'Each objective with its v1.0 target, reality check, v2.0 target, derivation and evidence tier.',
    bridge: 'Those are the targets. What does the market allow?',
  },
  market: {
    id: 'market',
    core: 'Radio advertising shrank in 2025 and betting money left radio almost entirely. Yet {f:listenership-western} of Western Kenya still listens, so the audience is there; the income has to come from new places.',
    proof: [
      { figure: 'radio-adspend', label: 'spent on radio advertising in Kenya in 2025, down {f:radio-adspend-change}' },
      { figure: 'betting-radio-change', label: 'fall in betting adverts on radio, from {f:betting-radio-before} to {f:betting-radio-spend}' },
      { figure: 'radio-reach-2025', label: 'national daily radio reach in 2025, down from {f:radio-reach-2023} in 2023', trend: [75, 57, 41], trendLabel: '2023 · 2024 · 2025' },
    ],
    featured: 'counties',
    featuredTitle: 'Five counties: a pan-Luhya core market of {f:tam-2025} people',
    featuredSummary: 'Population by county from the KNBS 2019 Census, with 2026 projections. Bungoma and Kakamega are the largest.',
    detailSummary: 'Eight data rooms: market sizing, ten competitors, ad economics, digital platform costs, studio hardware, regulation, audience measurement and all fourteen revenue levers.',
    bridge: 'The base is shrinking. Does the money still work?',
  },
  model: {
    id: 'model',
    core: 'An {f:model-quarters}-quarter model lets spot revenue grow modestly while new {g:non-spot|non-spot} streams carry total revenue to {f:rev-multiple-base} by Q4 2027.',
    proof: [
      { figure: 'rev-multiple-base', label: 'revenue by Q4 2027 in the base case; {f:rev-multiple-worst} worst, {f:rev-multiple-best} best', trend: [100, 105, 117, 135, 153, 167, 180, 200], trendLabel: 'Revenue index, Q1 2026 to Q4 2027' },
      { figure: 'nonspot-target', label: 'non-spot share of revenue at Q4 2027 in the base case' },
      { figure: 'breakeven-range', label: 'to recover Phase 1 {g:capex|capex}; {f:breakeven-base} in the base case' },
    ],
    featured: 'payback',
    featuredTitle: 'Phase 1 capex is recovered within the first seven months in every scenario',
    featuredSummary: 'Cumulative cash after the Phase 1 outlay turns positive in Month 4 (accelerated), Month 5 (base) or Month 7 (conservative).',
    detailSummary: 'Where revenue concentrates, which v1.0 assumptions survive, the whitespace map, the sensitivity table, what must be true, and the two biggest risks.',
    bridge: 'So the money works. Where does it come from?',
  },
  opportunities: {
    id: 'opportunities',
    core: 'Every stream is scored by expected value, probability of success and time to revenue in an {g:ev-matrix|expected-value matrix}. Government, mobile and branded shows score highest.',
    proof: [
      { figure: 'opp-gaa-value', label: 'a year from {g:gaa} and county government work, the top-ranked stream' },
      { figure: 'opp-mobile-value', label: 'a year from WhatsApp and {g:ussd} products, uncontested in Western Kenya' },
      { figure: 'opp-political-value', label: 'in episodic political advertising around the 2027 General Election' },
    ],
    featured: 'opportunities',
    featuredTitle: 'Institutional and mobile streams outrank everything else',
    featuredSummary: 'Twelve revenue streams ranked by composite score, from GAA and county government (8.5) to live events ticketing (4.5).',
    detailSummary: 'All twelve streams with rationale, the top-five priority cards, and the social and streaming rate card.',
    bridge: 'Those are the streams. Who does what, and when?',
  },
  strategies: {
    id: 'strategies',
    core: 'Five workstreams turn the plan into {f:strategy-count} actions. Each one names a lead, a budget, a timeline and how it makes money.',
    proof: [
      { figure: 'studio-p1-done', label: 'Studio Phase 1 installed: cameras, switcher, lights and acoustics' },
      { figure: 'shows-live', label: 'all {f:shows-count} pre-recorded shows on air, each packaged for title sponsorship' },
      { figure: 'ussd-live', label: '{g:ussd} shortcode live, reaching listeners without mobile data' },
    ],
    featured: 'strategies',
    featuredTitle: 'Commercial work carries the most actions; every action has an owner',
    featuredSummary: 'Twenty-one strategies grouped into five workstreams: content, studio build, digital and mobile, commercial, and community and governance.',
    detailSummary: 'All twenty-one strategies with the action, why it works, data receipts, lead, budget, timeline, revenue mechanism and milestone KPIs.',
    bridge: 'The actions need a studio. What does it cost to build?',
  },
  build: {
    id: 'build',
    core: 'The studio is built in {f:studio-phases} phases over {f:build-months}, each released only when revenue thresholds are met. The full build costs {f:capex-reduction} less than v1.0 budgeted.',
    proof: [
      { figure: 'capex-p1', label: 'for Phase 1, Months 1–4: cameras, switcher, lights and acoustics' },
      { figure: 'capex-total', label: 'for all three phases over {f:build-months}' },
      { figure: 'capex-v1-total', label: "v1.0's unresearched envelope for the same studio" },
    ],
    featured: 'build',
    featuredTitle: 'Twenty-four months from procurement to market leadership',
    featuredSummary: 'Eight quarters from Q1 2026 (foundation and procurement) to Q4 2027 (leadership assertion and independent audience audit).',
    detailSummary: 'The quarter-by-quarter roadmap, phase cost tables with vendors, salary benchmarks, the regulatory schedule and governance.',
    bridge: 'The plan is costed. What could still go wrong?',
  },
  'gap-audit': {
    id: 'gap-audit',
    core: 'Three checklists show what v1.0 missed, what must be bought or hired, and which revenue levers were added. The two biggest risks are named with their mitigations.',
    proof: [
      { figure: 'rev-multiple-worst', label: 'revenue if GAA and county contracts fail: the biggest revenue risk' },
      { figure: 'radio-reach-2025', label: 'national radio reach in 2025: the audience risk if listeners leave before they are captured on WhatsApp or USSD' },
      { figure: 'baseline-survey-cost', label: 'to close the largest data gap: an independent audience baseline survey' },
    ],
    featured: 'gaps',
    featuredTitle: 'Every gap has a fix, and every build item has an owner',
    featuredSummary: 'Checklist A lists twenty v1.0 gaps and their fixes; checklist B forty build items with owners and dates; checklist C twelve added revenue levers.',
    detailSummary: 'All three checklists with search and filters, plus the operational readiness workbench.',
    bridge: 'The gaps have owners. What must the board decide?',
  },
}
