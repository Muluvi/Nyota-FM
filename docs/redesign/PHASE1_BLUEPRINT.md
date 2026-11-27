# Nyota FM v3 redesign — Phase 1 blueprint

Audit date: 27 November 2026. Branch: `ccr-c1b55cc5-bp2vur` (the session's required branch; the brief asked for `redesign/v3`).
The owner approved all recommendations up front and asked for no approval stops, so every "for owner decision" item below is implemented with the recommended default and stays logged in `docs/OPEN_QUESTIONS.md`.

## Baseline (measured, not estimated)

| Measure | Before |
|---|---|
| First-load JS | 806 KB (206 KB gzip), one chunk |
| CSS | 79 KB (13.7 KB gzip) |
| Words on the full proposal, accordions closed | 11,714 (390px) / 11,884 (1440px) |
| Page height, full proposal | 76,867px at 390px; 47,197px at 1440px |
| Text nodes rendered under 12px | 2,598 at 390px; 1,041 at 1440px |
| Lighthouse mobile (narrative view only) | Perf 95 · A11y 94 · BP 96 · SEO 92 · LCP 2.3s · CLS 0 |

Screenshots: `docs/screenshots/before/`.

## 1. Decisions needed from the owner (defaults applied)

1. **Revenue multiplier.** 2.0× (base, Part 3), 2.4× (v1.0 target), 2.8× (upside) and 4.6× ("commercial yield", no source). Default: show **2.0× base**, with 1.4×/2.8× as the range. 4.6× moves to the appendix, marked unsourced.
2. **When 2.0× is reached.** Part 1 says "by Q8 2028"; the Part 3 model reaches index 200 at **Q4 2027**. Default: Q4 2027 (the model), provisional.
3. **Phase 1 capex.** KSh 627,299–837,299 (Parts 2, 5, 6, asks) vs KSh 630K–665K (annexure, different kit list) vs KSh 732,000 (simulator average). Default: **KSh 627K–837K**.
4. **Payback.** Month 4–7 (briefing) matches the waterfall scenarios (accelerated 4 · base 5 · conservative 7); the payback simulator computes 1 month. Default: **Month 5 base, Month 4–7 range**.
5. **Number of asks.** Six asks (source list) vs five resolutions (briefing mode, different content). Default: **six asks**; the five-resolution memo stays in the Toolkit as an earlier draft.
6. **Ask owners and measures.** The asks carry no owner or measure. Default: mapped from the leads and KPIs of the matching Part 5/6 strategy, marked "mapped".
7. **GAA timing.** Strategy 5.14 says registered by Q2 2026; Part 3 says by Q2 2027. Default: show both with context.
8. **Confidentiality.** Source footer says "Strictly Confidential". Default: `noindex, nofollow` added.
9. **Display face.** Default: **Big Shoulders Display** (OFL, one weight, self-hosted) for the wordmark only.
10. **Analytics.** Not installed. Option logged (privacy-light chapter and ask counters).

## 2. c2mtl.koki-kiko.com notes

The sandbox network policy blocks all four reference hosts in Chromium (`ERR_TUNNEL_CONNECTION_FAILED`), so I could not scroll them at 1440/390. For c2mtl I fetched the rendered DOM and design tokens through a scraping service; the notes below come from markup and computed styles, not from watching the motion. The oryzo, animejs and akaru technique lists come from the brief.

- **C1. Per-character split headings.** "Share. Connect. Learn." and stat labels are split into one element per character: stagger or roll reveals.
- **C2. Odometer stats.** "5,000+ Participants", "50+ Countries", "100+ Speakers" and "1,000+ Businesses" are split per digit: digit rolls on entry, each with one explanatory sentence.
- **C3. Giant edition masthead.** h1 at 175px with the edition and dates set as a typographic lock-up.
- **C4. Parenthesised link labels.** "(See all)" as an inline text link beside section titles.
- **C5. Portrait carousel.** Tall 1320×1485 portraits with a name and one role line.
- **C6. Hover image-swap list.** Four "What you'll get" rows with paired images: the list drives the image.
- **C7. Doubled button labels.** "Learn more / Learn more" in one link: a text-roll hover.
- **C8. Zero radius and one acid accent.** All buttons square, one fluorescent accent for the primary action.
- **C9. Skip link** as the first focusable element.
- **C10. Closing state.** "Event finished · See you next year" as a calm end-of-story line.

Used here: C1 (menu items), C2 (count-up on In short and counters), C4 ("Show all (n)"), C7 (pill arrow roll), C9 (skip link), C10 (closing line). Not used: C5 (no real portraits), C6 (no imagery), C8 (the palette already has one accent, and the brief asks for pills).

## 3. Content inventory

The rule for every chapter: the **Skim + Read** layers are new, short and built from the registry. The **Detail** layer renders the original Part component in full and unchanged, closed by default and lazy-loaded. Widgets move to the Toolkit. Nothing is deleted.

| Ch | Label | Action title | Core sentence | Proof (≤3) | Featured | Detail | → Appendix |
|---|---|---|---|---|---|---|---|
| 01 | Objectives | Ownership's five mandates stand; the targets are reset against 2025/26 data. | v1.0's five objectives stay the North Star. v2.0 tests each against verified market data and sets a bankable target. | 40% non-spot by Q4 2027 · 150K base / 250K stretch contacts by Month 24 · #2 vernacular in Bungoma by Q4 2027 | Five stacking mandate cards (A–E) | Part 1 in full (reality checks, derivations, tiers) | Schedule, Lexicon, Presenter roster, Emergency console |
| 02 | Market data | Radio spend is shrinking and betting has collapsed, so growth must come elsewhere. | Radio ad spend fell in 2025 and betting money left radio almost entirely, but listening in Western Kenya stays high. | Radio ad spend KSh 25.9B (−5%) · Betting on radio −89% to KSh 51M · Western Kenya listenership 81% | Five-county population grid with tap readouts | Part 2 in full (8 data tabs) | 7 data widgets |
| 03 | The model | The base case doubles revenue by Q4 2027; Phase 1 pays back by Month 5. | An 8-quarter model shows spot revenue holding while non-spot streams carry growth to 2.0×. | 2.0× base (1.4×–2.8×) · 40% non-spot · Break-even Month 4–7 | Payback explorer: scenario pills, month slider, live readout | Part 3 in full (assumption audit, whitespace, sensitivity, risks) | Payback simulator, Capex waterfall |
| 04 | Opportunities | Government, mobile and branded shows lead twelve ranked revenue streams. | Each stream is scored by expected value, probability and time to revenue; the top five carry the plan. | GAA/county KSh 2M–8M · WhatsApp/USSD uncontested · Political 2027 KSh 2M–10M | (12) index table, 6 rows + Show all | Part 4 in full (rationale, top-five cards, rate card) | Ad calculator, Quote builder, Podcast archive, Touchpoint ecosystem |
| 05 | Strategies | Twenty-one costed actions, each with a lead, a budget and a date. | The plan runs in five workstreams; each action names who leads it, what it costs and when it lands. | Studio Phase 1 by Month 4 · Four shows on air by Q3 2026 · USSD live Q3 2026 | (21) grouped rows by workstream | Part 5 in full (all 21 with receipts and KPIs) | Tracker, Mobile simulator, Civic notice, Political rate card, Diaspora hub, Loyalty club, Editorial handbook |
| 06 | The build | The studio is built in three gated phases over eighteen months. | Each phase is released only when revenue thresholds are met, and the full build costs under half of v1.0's estimate. | Phase 1 KSh 627K–837K · All phases KSh 4.97M–9.60M · v1.0 envelope KSh 12.7M–21.3M | Phase pills + self-drawing 8-quarter roadmap | Part 6 in full (cost tables, people, regulatory, governance) | Studio plan, Switcher, Power, OB van, Equipment log, Brand identity |
| 07 | Gap audit | All twenty v1.0 gaps are closed; forty build items each have an owner. | Three checklists track what v1.0 missed, what must be bought or hired, and which revenue levers were added. | Biggest revenue risk: GAA and county contracts · Biggest audience risk: radio reach 75%→41% · Baseline survey KSh 500K–1M | Counters + filterable hairline checklist (6 rows) | Part 7 in full | Gap workbench |
| — | The asks | Six decisions move the plan from proposal to execution. | — | — | Six asks: owner · measure · date | — | Five-resolution memo |
| — | Sources | Every figure traces to one of 37 named sources. | — | — | Numbered list | — | — |
| — | Appendix | — | — | — | Toolkit (31 widgets), annexures, evidence standard, playbook, self-check | — | — |

**Duplicates removed from the main flow:** two front doors (MinimalNarrative and DocumentHero heroes become one hero), the 7-card section grid (replaced by the menu), four repeated metric blocks (hero counters, VisualPlaybook KPIs, annexure summary, narrative stats → one In short), and the triplicated top-five list (Part 4 cards vs table vs Part 3 whitespace → the table only in the Read layer).

**Reduction target:** baseline 11,714 words in view. The Skim + Read target is ≤ 3,000 words (−74%), well past the −40% floor, with all source content one tap away in Detail.

## 4. Figure conflict register

Full register with every location: `src/content/figures.ts` (`conflict` groups) and `docs/OPEN_QUESTIONS.md`.

| Concept | Variants (where) | Recommended canonical |
|---|---|---|
| Revenue growth | 2.0× base (Part 1, 3) · 2.4× v1.0 (Part 1, 3, slides) · 2.8× upside (Part 1, 3) · 1.4× worst (Part 3) · 4.6× "commercial yield" (MinimalNarrative, VisualPlaybook) | 2.0× base, range 1.4×–2.8× |
| 2.0× date | "Q8 2028" (Part 1) · Q4 2027 (Part 3 chart) | Q4 2027 |
| Phase 1 capex | 627,299–837,299 (Part 2, 5, 6, asks, briefing) · "627K–837K" (hero) · 630K–665K (annexure) · 732,000 avg (payback sim) | KSh 627K–837K |
| Total capex | 4,969,099–9,595,099 (Part 6) · "627K–9.60M" (hero card, search) · 4,970,000 (sim) | KSh 4.97M–9.60M |
| KSh 320,000 | OB van conversion (OBVanExplorer) · generator/UPS and OB rig (gap workbench) | Two different items; not a capex total |
| Payback | Month 4–7 (briefing) · Month 4/5/7 (waterfall) · computed 1 month (payback sim) | Month 5 base, Month 4–7 range |
| Weekly reach | 1.8M (VisualPlaybook, narrative, no source) · 1.8M+ (annexure, footer) · ~33M national weekly (Part 2) · n=23.9M national (annexure) | Not used in the main flow until sourced |
| Digital share 32% | VisualPlaybook, narrative; no source | Appendix only, unsourced |
| Ask count | Six asks (source list, narrative) · five resolutions (briefing) | Six |
| Contacts by Month 24 | 150K base / 250K stretch (Part 1) · 120,000 WhatsApp opt-ins (5.5) | 150K / 250K |
| WhatsApp marketing rate | $0.0225 (Part 1, 2) · $0.038 (annexure) | Both kept with dates; owner to confirm |
| WhatsApp usage | 19.8% (5.5) · 53.9% (annexure) | Both kept; owner to confirm |
| USSD setup | KES 145,000 (AT) · KSh 250,000 budget (5.6) · "KSh 156,000 setup" WhatsApp + USSD (briefing) | Different things: vendor fee vs budget |
| GAA registration | Q2 2026 (5.14) · Q2 2027 (Part 3) · fee KSh 100,000 (6.4) · KSh 150,000 compliance (5.14) | Show both with context |
| GAA/county value | KSh 2M–8M (Part 4) · 1M–5M county + 0.5M–3M GAA (Part 2.8) · KSh 24.5M/week old contract (annexure) · KSh 4.5M+ (briefing) | KSh 2M–8M |
| Revenue lever count | 12 (Part 4) · 14 (Part 2.8) · 11 channels (Part 3.3) | 12 ranked |
| Five-county population | 6,012,184 (2019) · ≈6.6M (2025) · ≈6.76M (2026) · "6M+" (hero) · 7.2M (v1.0) | 6.6M (2025 KNBS-derived) |
| YouTube subscribers M12 | 50,000 (5.1) · 40,000 (5.8) | Both kept |
| Show name | "Asubuhi ya Imani" (Part 6, asks) · "Asuhi ya Imani" (Part 5, briefing) | Asubuhi (correct Kiswahili); spelling fixed only in new copy |
| Currency format | "KSh 500K", "KSh 500,000", "KES", "Ksh." | New copy: `KSh 1.5M`; exact values in Detail only |

## 5. "In short" draft

**The recommendation.** Approve six decisions that make Nyota FM 107.3 the cultural and commercial anchor of Western Kenya by Q4 2027.

**Why now.** Radio ad spend fell 5% to KSh 25.9B in 2025 and betting money on radio fell 89%. But 81% of Western Kenya still listens. The station must keep its spot base and build new income from government, mobile and branded shows.

**Three numbers.**
- **2.0×** revenue by Q4 2027 in the base case (1.4× worst, 2.8× best).
- **KSh 627K–837K** for Studio Phase 1, about KSh 1.5M less than v1.0 budgeted.
- **Month 4–7** to recover Phase 1 capex (Month 5 base).

**The six asks.** 1 Approve the thesis and 24-month roadmap. 2 Commit Studio Phase 1 capital. 3 Authorise brand and mobile partnerships. 4 Endorse the four pre-recorded shows. 5 Authorise GAA and county filings. 6 Constitute the Joint Steering Committee.

(87 words: a 30-second read.)

## 6. Widget triage

| Widget | Verdict | Where |
|---|---|---|
| CapexWaterfallSimulator | **Featured** (data drives the 03 payback explorer) + Toolkit | 03 |
| InteractivePaybackSimulator | Toolkit; flagged: computes a 1-month payback that conflicts with the source | 03 |
| CountyCoverageExplorer, CountyEconomicExplorer, TransmitterElevationTool, CompetitorDialMap, AgriCommodityIndex, CMORoyaltyCalculator | Toolkit | 02 |
| ListenerVoxPop | Toolkit, labelled **illustrative** | 02 |
| InteractiveSchedule, TwangaaLexicon, PresenterRoster (illustrative), EmergencyAlertConsole | Toolkit | 01 |
| AdCampaignCalculator, AdvertiserQuoteBuilder, PodcastArchivePlayer, TouchpointFilter, TouchpointEcosystem | Toolkit | 04 |
| StrategyTracker, TwangaaMobileSimulator, CivicNoticeBuilder, PoliticalRateCardEngine, DiasporaHub, LoyaltyClubEngine, EditorialPolicyHandbook | Toolkit | 05 |
| InteractiveStudioPlan, VisualRadioStudioSimulator, PowerResilienceMatrix, OBVanExplorer, EquipmentLifecycleLog, BrandIdentityViewer | Toolkit | 06 |
| InteractiveGapAuditWorkbench | Toolkit | 07 |
| ExecutiveBriefingMode | Rebuilt as In-short overlay; old memo → Toolkit ("earlier five-resolution draft") | Asks |
| PresentationModeToggle | Replaced by chapter presentation mode; old 8-slide deck → Toolkit | Appendix |
| VisualPlaybook, DataEnrichedAnnexure, DocumentHero | Appendix annexures (evidence standard, data room, playbook) | Appendix |
| WebsiteFooter | Replaced by a slim footer; station profile, inquiry form and privacy note → Toolkit. **Flag:** its inquiry form shows "dispatched" but sends nothing | Appendix |
| Navbar, FloatingNavRail, MobileBottomDock | **Cut** (navigation only; replaced by one header + menu) | — |
| MinimalNarrative | **Cut**; its copy is merged into the hero, In short and chapter openers | — |
| ledger/* (ChapterSection, SignalRule, LedgerStamp) | **Cut**; replaced by the chapter template | — |

No widget is cut for content reasons. 31 widgets stay reachable.

## 7. Technique map and motion spec

| Element | Techniques | Status |
|---|---|---|
| Hero | K1 wordmark, O2 mask rise, A1 frequency dial, O5 glass card, O6 side tab, O7 scroll cue | Build |
| Live radio | O7 PIP card, only pulsing element | Build. The current player is a Web Audio synth, not a stream; it is relabelled "stream preview" with a calm offline state |
| In short | O9 ghost numerals on paper band, C2 count-up, O3 word highlight | Build |
| Chapter openers | A2 bands, A3 accent, K6 slide-in, O3 highlight | Build |
| Chapter layout | A4 sticky left column | Build (desktop ≥1024px) |
| 01 | K4 stacking cards | Build (CSS sticky; stacks normally under 768px) |
| 02 | A5 stagger grid, O8 tap readouts | Build |
| 03 | O8 slider + O10 pill toggle, waterfall SVG | Build |
| 04 | K5 counter + hairline index, A7 dot index | Build |
| 05 | K5 counter + grouped expandable rows | Build (grouped by workstream: the source assigns strategies to workstreams, not objectives) |
| 06 | O10 phase pills, K7 typographic dates, SVG line-draw | Build |
| 07 | K5 counters + filter pills | Build |
| Voices | O11 | Toolkit only (vox pop is illustrative) |
| Asks | numbered list + O9 ghost numerals | Build |
| Menu | K3 coloured ↗ circles, O12 dotted current link, C1 stagger | Build |
| Share | A6 copy-link chip + toast | Build |
| Footer | K1 giant wordmark sign-off, C10 closing line | Build |
| Persistent signal motif | O1 | **Deferred**: the hero dial already carries the motif; a second fixed layer costs main-thread time on mid-range Android |
| K2 split strips, O4 scramble | — | **Skipped**: no imagery for strips; scramble hurts screen-reader output |

**Motion spec** (all transform/opacity; reduced motion = final state, no animation):

| Motion | Trigger | Duration | Easing | Stagger | Reduced-motion fallback |
|---|---|---|---|---|---|
| Wordmark mask rise | Load | 900ms | outExpo | 60ms/letter | Static wordmark |
| Dial needle settle on 107.3 | Load | 1400ms | outElastic(1, .6) | — | Needle at 107.3 |
| Dial idle wave | Hero in view | 4s loop | inOutSine | — | Off; paused off-screen |
| Section reveal | 15% in view, once | 600ms | outCubic | 80ms | Visible |
| Word highlight | Scroll progress 0→1 across the element | scrubbed | linear | per word | Fully highlighted |
| Count-up | 40% in view, once | 1200ms | outExpo | 100ms | Final value |
| Stacking cards | CSS sticky | — | — | — | Normal flow |
| Roadmap line draw | Scroll progress | scrubbed | linear | — | Fully drawn |
| Menu open | Click | 500ms clip-path, items 400ms | outExpo | 40ms | Instant |
| Header hide/show | Scroll direction | 300ms | outCubic | — | Always shown |
| Toast | Copy | 200ms in, 2s hold | outCubic | — | Instant |
| ON AIR dot | Playing | 2s loop | inOutSine | — | Static dot |

## 8. Wireframes

```
HERO · 1440                                        HERO · 390
┌──────────────────────────────────────────────┐  ┌────────────────────┐
│ NYOTA·107.3     01 · Objectives     [Menu ≡] │  │ NYOTA      [Menu ≡]│
│──────────────────────────────────────────────│  │────────────────────│
│                                         T    │  │  ┌──────────────┐  │
│  NYOTA                    ╭──dial──╮    W    │  │  │  dial 107.3  │  │
│  107.3                   ╱ ticks    ╲   A    │  │  └──────────────┘  │
│                          │ ~~wave~~ │   N    │  │ NYOTA              │
│  The plan to make Nyota  ╲  107.3  ╱    G    │  │ 107.3              │
│  FM the anchor of         ╰───────╯     '    │  │ The plan to make   │
│  Western Kenya.     ┌glass card────────┐ A    │  │ Nyota FM the…      │
│  Hapa tulipo.       │Twang'aa · 26–28  │ A    │  │ [Read the 3-min ↓] │
│  [Read the 3-minute version ↓]   (scroll)    │  │ glass card         │
└──────────────────────────────────────────────┘  └────────────────────┘

IN SHORT (paper band)
┌──────────────────────────────────────────────┐  ┌────────────────────┐
│ In short                                     │  │ In short           │
│ Approve six decisions that make … (highlight)│  │ Approve six …      │
│ ┌──── 2.0× ─┐ ┌─ 627K ───┐ ┌─ M4–7 ───┐      │  │ ┌──── 2.0× ──────┐ │
│ │ ghost "2" │ │ ghost "6"│ │ ghost "5"│      │  │ └────────────────┘ │
│ └───────────┘ └──────────┘ └──────────┘      │  │ (stacked x3)       │
│ 1 Approve thesis …   4 Endorse shows …       │  │ 1 … 6 asks         │
│ 2 Commit Phase 1 …   5 GAA filings …         │  │ [Go to the asks →] │
│ 3 Brand + mobile …   6 Steering cttee …      │  └────────────────────┘
│ [Go to the asks →]                           │
└──────────────────────────────────────────────┘

CHAPTER · 1440 (band tint + accent)                CHAPTER · 390
┌────────────────┬─────────────────────────────┐  ┌────────────────────┐
│ 03             │ Core sentence (body-L)      │  │ 03 · The model     │
│ The model      │ ┌proof┐ ┌proof┐ ┌proof┐    │  │ Action title …     │
│ Action title   │ └─────┘ └─────┘ └─────┘    │  │ Core sentence      │
│ (sticky,       │ ┌ featured interactive ───┐ │  │ proof / proof /    │
│  highlights)   │ │ [Base][Cons][Accel]      │ │  │ proof (stacked)    │
│ ⧉ Copy link    │ │ Break-even: Month 5      │ │  │ featured           │
│                │ └──────────────────────────┘ │  │ ▸ Read the detail  │
│                │ ▸ Read the detail (closed)   │  │ Tools for this ch. │
│                │ Tools for this chapter (2) → │  │ So the money works…│
│                │ So the money works. Where…→ │  │ ← 02     04 →      │
│                │ ← 02 Market     04 Opps →   │  └────────────────────┘
└────────────────┴─────────────────────────────┘

MENU OVERLAY (full screen, mask reveal)
┌──────────────────────────────────────────────┐
│ NYOTA·107.3                         [Close ✕]│
│ 00 In short          3-min story        (↗)  │
│ 01 Objectives ·····  Ownership's five…  (↗)  │  ← dotted underline = current
│ …  07 Gap audit                         (↗)  │
│ → The asks          Sources   Appendix       │
│ [Search ⌘K] [Briefing] [Present] [Lite] [Print] [Copy link] │
│ You've read 4 of 9 chapters                   │
└──────────────────────────────────────────────┘

THE ASKS
┌──────────────────────────────────────────────┐
│ (6) The asks                                 │
│ Six decisions move the plan from proposal …  │
│ ¹ ghost  Approve thesis & roadmap            │
│          Owner · Measure · When              │
│ … ×6 hairline rows                           │
│ [Download decision sheet (PDF) →]            │
└──────────────────────────────────────────────┘
```

## 9. Libraries, performance and Lite mode

- `animejs@4` (modular: `animate`, `stagger`, `svg`) for the hero, counters, menu and line draw. `lenis` for desktop smooth scroll only (off on touch, reduced motion and Lite).
- Fonts self-hosted from the `@fontsource` latin subsets, copied into `public/fonts` (no runtime dependency). `font-display: swap`. Google Fonts import removed.
- Code split: everything below the In short section is a lazy chunk; every Part detail, widget, annexure and the Appendix is a separate lazy chunk. Target first-load JS < 80 KB gzip.
- **Lite mode** auto-enables on `saveData` or 2G/3G, toggles from the menu and persists. It uses system fonts, no Lenis, no hero motion, and widgets load only on tap. Target < 300 KB transfer for the story.

## 10. Commit plan

1. `redesign: blueprint` — this report, docs.
2. `redesign: content registry` — figures, sources, glossary, sections, chapter copy, data modules; `<Figure>` and `<Rich>`.
3. `redesign: check-figures` — guard script wired into `pnpm check`.
4. `redesign: chapter template and IA` — new App order, chapters, detail disclosures, appendix and toolkit.
5. `redesign: navigation` — header, menu, deep links, search.
6. `redesign: visual system` — tokens, type scale, radius, fonts, legacy restyle, chrome removal.
7. `redesign: motion` — hero, counters, highlight, stacks, roadmap, PIP radio.
8. `redesign: board features` — presentation, briefing, print, decision sheet, Lite, meta, OG.
9. `redesign: housekeeping` — orphan removal, stale scripts.
10. `redesign: verification` — report and screenshots.
