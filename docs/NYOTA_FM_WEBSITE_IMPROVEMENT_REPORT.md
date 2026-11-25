# Nyota FM 107.3: Website Improvement Report

**Subject:** `github.com/Muluvi/Nyota-FM` (branch `main`, commit `cbdecf0`, "Merge pull request #9 from Muluvi/refactor/consolidate")
**Site:** *Nyota FM 107.3 — Twang'aa Transformation v2.0*, a board-ready proposal website, Western Kenya 2026–2028
**Audit date:** 25 November 2026 · **Prepared for:** Firefly Management / Nyota FM ownership
**Method:** I read every tracked file (79 files, about 14,700 lines of source). The site was built and type-checked, and every hard-coded figure was extracted and tested against public sources current as of November 2026. All ~60 components were reviewed one by one. All web sources were accessed on 25 Nov 2026 unless another date is stated.

> **How to read this report.** Every finding names the exact file. "P0" means fix before the site is shown to the board. Tier labels (Tier 1 / Tier 2 / Tier 0) follow the site's own evidence standard. **Status words in the Data Register:** *Confirmed*, *Outdated → update*, *Unverified → flag*, *Contradicted*.

---

## 1. Executive Summary

The site is ambitious and well engineered at the build level: strict TypeScript passes, there are no orphan files, and the dark palette and layout system are coherent. Its most valuable assets are the evidence-tier idea (`TierBadge`), the honest "v1.0 reality check" tables, the Editorial Policy Handbook and the USSD/WhatsApp simulator.

The site's main weakness is not its looks. It is that **the site does not keep its own promise of "Zero Speculation: Every Figure Classified by Rigour."** The same numbers appear with different values in different places. Many illustrative people, quotes, sponsors and prices carry *Tier 1 (Hard Data)* badges. Several calculators produce figures no board member would accept: the payback simulator shows payback in **1 month** and a 24-month return of **+4,621 %**. The 2026 timeline is already in the past. A finance-literate board member who finds two of these will discount the whole proposal.

**The 10 changes that matter most**

| # | Change | Why | Impact | Effort | Priority |
|---|---|---|---|---|---|
| 1 | **Create one data layer** (`src/data/*.ts`) for every figure (rate card, capex, levers, KPIs, sources) and make all 60 components read from it | The same quantity appears with up to 6 different values (e.g. OB economics, spot rates, Phase 2 capex, contact targets) | Removes the biggest credibility risk; one edit updates the whole site | M | **P0** |
| 2 | **Rebuild the financial model** (`InteractivePaybackSimulator`, `CapexWaterfallSimulator`, `Part3DataAnalysis`) on *incremental* cash flow with opex, capex, a discount rate and a declared baseline | It currently credits all station revenue, including an unaudited KSh 1.2 M/month spot baseline, to the studio. The result is 1-month payback and +4,621 % ROIC, and the revenue chart bars all hit 100 % | The board can trust and stress-test the money | M | **P0** |
| 3 | **Rebase the timeline** from Q1 2026–Q4 2027 to "Month 0 = board approval", projected as Q1 2027–Q4 2028, and anchor it to the IEBC election calendar (campaign 29 May–7 Aug 2027) | Every 2026 milestone (USSD Q3 2026, studio Q2 2026, GAA Q1 2026…) is now in the past | Plan reads as current, not stale | S | **P0** |
| 4 | **Remove or relabel fabricated "evidence"**: listener vox pops "real verbatim", named presenters, follower counts, real-brand "endorsements" and sponsors, a KRA PIN, county "public notice" letterheads, "ODPC Registered", "licences cleared with MCSK" | Legal and reputational exposure, and contradicts the plan's own to-do list. MCSK is not even licensed for 2025–26 | Avoids embarrassment and possible complaints | S | **P0** |
| 5 | **Make "Listen live" play the real stream** (Zeno.FM / existing simulcast) through `<audio>` + Media Session API | The player currently plays a synthesised sine-wave drone | Instant proof the station is real | S | **P0** |
| 6 | **Correct outdated market facts**: WhatsApp per-message pricing (since 1 Jul 2025); betting ad spend rebound (KES 2.33 B in H1 2026); radio reach 83 % in Western (CA Apr–Jun 2026) alongside MCK *daily* 41 %; CMO licensing (MCSK unlicensed; 2026–28 tariff 4 % / regional minimums); USAID closed, DFID → FCDO; maize KSh 3,800–4,100 | Several "Tier 1" facts are now wrong or mislabelled | Data credibility | S | **P0** |
| 7 | **Code-split and prerender**: lazy-load the 31 tools, self-host fonts, add a static HTML snapshot plus OG image | 801 KB JS / 205 KB gzip in one chunk. Opera holds about 26–29 % of Kenyan mobile browsing, and link previews currently show nothing | First load drops from ~205 KB gz to an estimated ~70–90 KB gz | M | **P1** |
| 8 | **Restructure the story**: Hero → Decision summary (the asks) → Objectives → Evidence → Model → Plan → Build → Risks → Appendix (tools and data room) | The Annexure and rate card currently come before Part 1, and Parts 2, 5 and 6 bury their main content under 6–7 tools each | A board member gets the case in 5 minutes and the depth on demand | M | **P1** |
| 9 | **Replace pseudo-visuals with real data visuals**: county choropleth map, real coverage contour, competitor dial to scale, waterfall/area charts with axes, Gantt roadmap, Sankey of revenue mix | Many "maps" and "charts" are buttons or decorative bars without axes or units | Comprehension and persuasion | L | **P1** |
| 10 | **Adopt one motion system** (tokens, scroll-driven CSS with `@supports`, reduced-motion everywhere) and remove always-on animation (`setInterval` VU meters, `animate-ping`, marquee) | Only 3 of ~10 animation types honour `prefers-reduced-motion`. A VU meter re-renders every 180 ms forever | Smoother on low-end Android, accessible | M | **P1** |

---

## 2. Scorecard

| Dimension | Current | Target (after P0+P1) | Justification |
|---|---|---|---|
| Content & Persuasion | 6/10 | 9/10 | Strong "v1 vs v2" self-critique and a clear asks section. But the order buries the decision, the copy is often superlative, and some labels say "Board Approved" before approval |
| Data Credibility | 3/10 | 8/10 | Tier system is excellent in concept. In practice: contradictory figures, Tier 1 badges on illustrative content, domain-only citations, a self-check that marks all 12 items "PASS" |
| Visual Design | 7/10 | 9/10 | Coherent ink/paper/brass palette and good typography. Drift: 240+ off-palette Tailwind colours (`emerald-400`, `amber-300`, `rose-300`), a second legacy palette, and 274 uses of 10 px text |
| Motion & Interactivity | 6/10 | 9/10 | Many tools exist, but several are fake (player, podcast, share, FAQ) and motion is inconsistent and not reduced-motion safe |
| Mobile UX | 6/10 | 9/10 | Good bottom dock and 44 px targets. Wide tables (5–7 columns), 9–10 px labels, heavy JS |
| Performance | 4/10 | 8/10 | Single 205 KB gz chunk, render-blocking Google Fonts `@import`, hot-linked Unsplash and Cloudinary images, three scroll listeners, perpetual timers |
| Accessibility | 4/10 | 8/10 | Focus ring exists. But accordions are `div onClick`, dialogs have no focus trap, tabs lack ARIA, brick text is 3.99:1, and an auto-playing siren is triggered on click |
| SEO / Sharing | 3/10 | 8/10 | Title and description only. No `og:image`, Twitter card, canonical, structured data, or no-JS content |
| Code Health | 7/10 | 9/10 | Strict TS, no orphans, clean folder split. But data is hard-coded in JSX, there are two `Reveal`s, four nav lists, duplicated calculators, and dead state |

---

## 3. Coverage Ledger

All 79 tracked files were reviewed. "§" points to the section of this report where each file is covered.

| File | Lines | Status | § |
|---|---:|---|---|
| `.env.example` | 9 | Reviewed: references Gemini API; unused → remove | 12 |
| `.gitignore` | 8 | Reviewed (fine) | 12 |
| `assets/.aistudio/.gitignore` | 1 | Reviewed: AI Studio artefact → remove | 12 |
| `data/Touchpoint_Ecosystem-8638d7.docx` | binary | Binary-read (text extracted): arithmetic error found | 5.4, 8 |
| `docs/CHANGELOG.md` | 13 | Reviewed | 4, 12 |
| `docs/OPEN_QUESTIONS.md` | 8 | Reviewed | 14 |
| `index.html` | 53 | Reviewed | 11 |
| `metadata.json` | 6 | Reviewed: claims server-side Gemini capability; unused | 12 |
| `package.json` | 30 | Reviewed | 4, 12 |
| `pnpm-lock.yaml` | 1,770 | Generated (lockfile); install succeeded | 4 |
| `scripts/check-orphans.mjs` | 49 | Reviewed and run: "63 source files reachable" | 4, 12 |
| `src/App.tsx` | 153 | Reviewed | 5.0, 7 |
| `src/main.tsx` | 10 | Reviewed | 12 |
| `src/index.css` | 306 | Reviewed | 10, 11 |
| `src/content/sections.ts` | 19 | Reviewed | 7, 12 |
| `src/lib/scroll.ts` | 9 | Reviewed | 7, 12 |
| `src/components/AnimatedCounter.tsx` | 73 | Reviewed | 5.1, 10 |
| `src/components/Reveal.tsx` | 44 | Reviewed: duplicate of ledger/Reveal; imported by `TouchpointFilter` but **never rendered** | 12 |
| `src/components/TouchpointFilter.tsx` | 116 | Reviewed: broken colour utilities | 6.4d |
| `src/components/ledger/ChapterSection.tsx` | 39 | Reviewed | 10 |
| `src/components/ledger/LedgerStamp.tsx` | 16 | Reviewed: imported by `ChapterSection` but **never rendered** (dead import keeps it "reachable") | 12 |
| `src/components/ledger/Reveal.tsx` | 16 | Reviewed | 10 |
| `src/components/ledger/SignalRule.tsx` | 12 | Reviewed | 10 |
| `src/components/ledger/useInView.ts` | 30 | Reviewed | 10 |
| `src/components/v2/DocumentHero.tsx` | 337 | Reviewed | 5.1 |
| `src/components/v2/VisualPlaybook.tsx` | 508 | Reviewed | 5.2 |
| `src/components/v2/DataEnrichedAnnexure.tsx` | 185 | Reviewed | 5.3 |
| `src/components/v2/TouchpointEcosystem.tsx` | 261 | Reviewed | 5.4 |
| `src/components/v2/Part1Objectives.tsx` | 256 | Reviewed | 5.5 |
| `src/components/v2/Part2MasterData.tsx` | 1,059 | Reviewed | 5.6 |
| `src/components/v2/Part3DataAnalysis.tsx` | 403 | Reviewed | 5.7 |
| `src/components/v2/Part4Opportunities.tsx` | 339 | Reviewed | 5.8 |
| `src/components/v2/Part5Strategies.tsx` | 833 | Reviewed | 5.9 |
| `src/components/v2/Part6TheBuild.tsx` | 492 | Reviewed | 5.10 |
| `src/components/v2/Part7GapAudit.tsx` | 336 | Reviewed | 5.11 |
| `src/components/v2/SourceListAndAsks.tsx` | 306 | Reviewed | 5.12 |
| `src/components/v2/TierBadge.tsx` | 120 | Reviewed | 5.13 |
| `src/components/website/*.tsx` (38 files) | 8,211 | Each reviewed individually | 6, 7 |
| `tsconfig.json` | 25 | Reviewed | 12 |
| `update_glass.sh` | 4 | Reviewed: stale sed script → delete | 12 |
| `update_hero.sh` | 1 | Reviewed: targets a CSS rule that no longer exists → delete | 12 |
| `vite.config.ts` | 25 | Reviewed: mojibake in comment; AI-Studio HMR flags | 12 |

The 38 files in `src/components/website/` each have their own subsection: §6 for the interactive tools and §7 for the site shell (Navbar, SearchModal, FloatingNavRail, MobileBottomDock, ExecutiveBriefingMode, PresentationModeToggle, LiveRadioPlayer, WebsiteFooter).

**Render map (verified from imports):**
`main.tsx → App.tsx →` Navbar (+PresentationModeToggle), SearchModal, ExecutiveBriefingMode, DocumentHero, VisualPlaybook, DataEnrichedAnnexure, TouchpointEcosystem, ChapterSection×7 →
Part1 (InteractiveSchedule, TwangaaLexicon, PresenterRoster, EmergencyAlertConsole) ·
Part2 (CountyCoverageExplorer, CountyEconomicExplorer, TransmitterElevationTool, CompetitorDialMap, AgriCommodityIndex, ListenerVoxPop, CMORoyaltyCalculator) ·
Part3 (InteractivePaybackSimulator, CapexWaterfallSimulator) ·
Part4 (TouchpointFilter, AdCampaignCalculator, AdvertiserQuoteBuilder, PodcastArchivePlayer) ·
Part5 (StrategyTracker, TwangaaMobileSimulator, CivicNoticeBuilder, PoliticalRateCardEngine, DiasporaHub, LoyaltyClubEngine, EditorialPolicyHandbook) ·
Part6 (InteractiveStudioPlan, VisualRadioStudioSimulator, PowerResilienceMatrix, OBVanExplorer, EquipmentLifecycleLog, BrandIdentityViewer) ·
Part7 (InteractiveGapAuditWorkbench) · SourceListAndAsks · WebsiteFooter · LiveRadioPlayer · MobileBottomDock · FloatingNavRail.
No file is unreachable (`check-orphans` reports 63/63 reachable).

---

## 4. Build & Performance Findings

### 4.1 Measured (this audit, `pnpm check`, Vite 6.4.3)

| Metric | Result |
|---|---|
| `tsc --noEmit` (strict) | ✅ pass |
| Orphan check | ✅ 63 / 63 reachable |
| Modules transformed | 1,733 |
| JS | **801.21 KB raw / 205.08 KB gzip, single chunk**. Vite warns ">500 KB, consider dynamic import()" |
| CSS | 78.50 KB / 13.68 KB gzip (down from 106 KB in the changelog baseline) |
| Production React | ✅ (`react-dom-client.production`) |

**Bundle composition** (pre-minification rendered length, top items): react-dom 638 KB · `Part2MasterData.tsx` 94 KB · lucide-react 44 KB · `Part5Strategies` 40 KB · `Part6TheBuild` 35 KB · `VisualPlaybook` 34 KB · `TwangaaMobileSimulator` 30 KB · `Part3DataAnalysis` 29 KB · `Part7GapAudit` 25 KB · `DocumentHero` 23 KB. **Most of the weight is the proposal's own content and data, hard-coded in JSX.** This is why splitting content into lazy chunks gives the biggest win.

### 4.2 Not measured (browser unavailable in this environment)

I could not run Lighthouse here. The figures below are **estimates** from the bundle:
- On a throttled "Slow 4G / mid-tier Android" profile, ~205 KB gz JS plus ~14 KB CSS plus Google Fonts (3 families, about 6 font files) means the **first meaningful paint is gated on JS parse and execute**. Until then the screen shows only the `#initial-loader` pulse. Expect LCP in the ~4–6 s range on 3G-class networks. *Estimate; verify with PageSpeed Insights after deploy.*
- **INP risk:** the Navbar and FloatingNavRail each run a scroll handler that calls `getBoundingClientRect()` on 7–9 sections every scroll event. `VisualRadioStudioSimulator` re-renders every 180 ms forever. `LiveRadioPlayer` uses `Math.random()` in render.
- **CLS risk:** the logo `<img>` (Cloudinary PNG) has no `width`/`height`. `AnimatedCounter` renders "0" then grows, so text width changes. Google Fonts swap.

### 4.3 Issues and fixes

| Issue | File | Fix |
|---|---|---|
| One 801 KB chunk | `App.tsx` | `React.lazy()` every chapter's tools and the Annexure / Touchpoint / Playbook. Render a lightweight skeleton and load when ~1 viewport away (IntersectionObserver plus `import()`). Add `build.rollupOptions.output.manualChunks` for `react`, `lucide`, `data` |
| Render-blocking font chain | `index.css` line 1 `@import url(fonts.googleapis…)` | Self-host 2 subsets with `@fontsource-variable/dm-sans` + Instrument Serif woff2. Use `<link rel="preload">` for the display face and `font-display: swap`. Drop DM Mono 500 if unused |
| External images, no dimensions | `Navbar.tsx`, `WebsiteFooter.tsx` (Cloudinary logo), `VisualRadioStudioSimulator.tsx` (3 Unsplash URLs) | Put an SVG logo in `public/brand/`. Replace stock photos with your own studio photos (AVIF/WebP, `width`/`height`, `loading="lazy"`, `decoding="async"`) |
| Perpetual work | `VisualRadioStudioSimulator` (setInterval 180 ms), `LiveRadioPlayer` (`Math.random` bars), `.animate-marquee`, `.wave-bar`, 23× `animate-ping/pulse` | Run only while the element is in view and the user has pressed play. Use CSS animation with `animation-play-state` toggled by IntersectionObserver. Disable under reduced motion |
| Three scroll listeners | `Navbar`, `FloatingNavRail`, (App progress) | One `useActiveSection()` hook built on IntersectionObserver, shared by Navbar, Rail and Dock |
| New `AudioContext` per click | `InteractiveSchedule`, `TwangaaLexicon`, `ListenerVoxPop`, `EmergencyAlertConsole`, `PodcastArchivePlayer`, `TwangaaMobileSimulator` | One shared lazily-created context in `src/lib/audio.ts`. Better still, replace synth beeps with real short audio files (see §6) |
| No offline / poor network support | — | Add a tiny service worker (Workbox `injectManifest` or `vite-plugin-pwa`) that caches the shell and fonts. A board member on a patchy link can reopen the deck offline |

### 4.4 Is React 19 + Vite + Tailwind v4 the right stack? (added at the user's request)

**Recommendation: keep the stack for the board version. Fix delivery, not the framework.**

| Option | Pros | Cons | Migration cost | Verdict |
|---|---|---|---|---|
| **A. Stay on React 19 + Vite + Tailwind 4, add lazy chunks + build-time prerender** | Zero rewrite. Best animation, chart and map tools (Motion, visx/D3, MapLibre). Tailwind tokens already in place | Still a client-rendered app, so it needs a prerender step for Opera Mini and link previews | **S–M (2–4 days)** | ✅ **Do now** |
| B. Astro + React islands | Ships HTML first; each tool hydrates only when visible. Ideal for a long, content-heavy page | Router, build and deploy change; every tool becomes an island | M–L (1–2 weeks) | Do later, if the site becomes the station's public website |
| C. Next.js (App Router, RSC) | SSR/SSG and image optimisation | Heavier than needed; server runtime; no backend need today | L | ❌ Not justified |
| D. SvelteKit | Small runtime, built-in transitions | Full rewrite of ~60 components | XL | ❌ |

Why A: Chrome holds ~63–65 % and **Opera ~26–29 % of Kenyan mobile browser share** (StatCounter, Jun–Jul 2026). Many Opera users run data-saving modes, so the page must render meaningful HTML without waiting for JS. A build-time prerender of the first screen and the decision summary does that, without a rewrite. Use either `react-dom/server` `prerender` in a small Vite post-build script, or a static-site-generation plugin.

---
## 5. Section-by-Section Review (render order)

### 5.0 Information architecture (whole page)

**Current order (`App.tsx`):** Hero → Visual Playbook → Data Annexure → Touchpoint Ecosystem → Part 1 … Part 7 → Sources & Asks.
**Problems:** Three "appendix-type" blocks (Annexure, rate card, a mood-board playbook) come *before* the objectives. A board member scrolls about 6 screens before reaching the case. The asks, which are the decision, sit at the very end, after 31 tools. The Hero promises "seven modules", but `sections.ts` defines 8 and the Navbar shows 7.

**Proposed order (and the matching `sections.ts` entries):**

```
00  Cover + 60-second Decision Summary   (the asks, total capital, payback range, top 3 risks)
01  The Situation        (market evidence: radio reach, ad market, mobile — 6 charts max)
02  The Objectives (A–E) (v1 → v2 targets, each with one chart)
03  The Opportunity      (levers matrix + touchpoint inventory, one rate card)
04  The Plan             (21 strategies, Gantt roadmap rebased to Month 0)
05  The Build            (studio phases, power, OB, people — single capex table)
06  The Money            (incremental P&L, cash curve, sensitivity tornado)
07  Risks & Gap Audit    (risk register + checklists)
08  The Asks & Governance
A   Appendix: Data Room (Annexure + Part 2 tables + source registry)
B   Appendix: Interactive Lab (all simulators, grouped, lazy-loaded)
```

Mockup (desktop, first screen):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ NYOTA 107.3 · TWANG'AA            Situation Plan Build Money Asks  ⌘K ▶Live│
├──────────────────────────────────────────────────────────────────────────┤
│  The voice of Bungoma, built for 2027.            ┌──────────────────────┐ │
│  A 24-month plan to grow revenue 2.0× (base)      │  DECISION SUMMARY     │ │
│  without betting money.                           │  Capital asked  KSh x │ │
│                                                   │  Payback (base) n mo  │ │
│  [ Read the 5-minute case ]  [ Open the model ]   │  Asks           6     │ │
│                                                   │  Biggest risk   GAA   │ │
│  83% radio reach in Western · CA, Apr–Jun 2026    │  [Approve checklist ⤓]│ │
│  ─────────── coverage map (static SVG) ────────── └──────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

Mobile: the Decision Summary becomes a sticky bottom sheet ("Asks · 6 ▸"). The dock keeps Parts, Search, Live and Top.

---

### 5.1 Cover / `DocumentHero.tsx` (337 lines)

**Current state:** A headline, two paragraphs, four CTAs, four animated counters (37 sources, Phase 1 capex "KSh 627K – 837K", 40 items, 21 strategies), a three-tab "Evidence Standard" panel, and 8 module cards.

**Problems**
- "Zero Speculation: Every Figure Classified by Rigour" is contradicted by the rest of the site (see §8). Either earn this claim or soften it now.
- The Tier 1 example "Weekly reach n=23.9M listeners, smartphone penetration 92.9%" mixes two different measures. CA now reports **24.4M** radio listeners (Apr–Jun 2026). "Smartphone penetration" is devices ÷ population, not the share of people who own a smartphone (CA notes multiple devices per user; ca.go.ke/node/908).
- The capex counter animates 0 → 627 and appends a static "K – 837K". Screen readers and printouts read "0". The module card says "KSh 627K–9.60M equipment schedule", which mixes Phase 1 with the all-phase total.
- "THE SEVEN BOARD ARCHITECTURE MODULES" but 8 cards are shown.
- Tier tabs are plain buttons (no `role="tablist"`, `aria-selected`, or arrow-key support).
- "6M+ citizens" is 2019 census; the site's own 2026 projection is ≈6.76 M.

**Changes**
1. Lead with a **Decision Summary card**, generated from the data layer: capital requested per phase, payback range (base/worst/best from the rebuilt model), number of asks, top risk.
2. Replace the counters with **static numbers in the HTML** (prerendered). Animate only the decorative underline, never the value.
3. Rename the evidence panel "How to read our numbers" and add a live count: `Tier 1: n · Tier 2: n · Tier 0: n`, computed from the data layer.
4. Fix "seven" → "eight", and "6M+" → "≈6.8 M people (KNBS 2019, projected 2026)".

**Visual / motion:** A static SVG of the five counties with the station pin (no tiles, ~6 KB), drawn with a 600 ms stroke-dash on first view, with a reduced-motion fallback of an instant draw. Counter values do not tick. Instead, a 1 px brass rule grows under each stat (scroll-driven, `@supports(animation-timeline: view())`).

**Mockup:** see §5.0.

**Data to update:** listeners 23.9 M → 24.4 M (CA Q4 2025/26); add "Western reach 83 %" (CA Table 3); the capex label.

---

### 5.2 `VisualPlaybook.tsx` (508 lines): "The Signal in Motion"

**Current state:** A mood-board section with KPI tiles (1.8 M weekly reach +18.4 %, 32 % digital share, 4.6× yield, 82 % readiness), a fake player, a schedule, three "story" tabs with 8 unlabelled bars, a flywheel, FAQ, a share dialog, and a "Lite mode" toggle.

**Problems**
- **All four KPIs are unsourced and look like current performance.** The "+18.4 %" uses a *down-right* arrow icon for growth. They directly contradict the "zero speculation" promise.
- "Last updated / today, 09:42" and "00:42 / 02:10" are hard-coded. The Play button plays nothing. "Copy share card" copies nothing. "Open action map" does nothing. All three FAQ answers are identical. The photo slot is an `ImageIcon` placeholder.
- The bars have 8 values but 4 labels (Q1–Q4), with no axis or unit.
- Map pins (Nairobi, Kisumu, Bungoma, Vihiga) sit at arbitrary percentages. "Kakamega → everywhere" conflicts with the Bungoma HQ.
- Presenters "Achieng & Otieno" (Luo names) front a Bukusu/Swahili station; see §6.1c.

**Changes:** **Merge this section into the Cover and Appendix B.** Keep only the "flywheel" (Attention → Participation → Proof → Better attention) as a diagram in *The Plan*. Delete the fake KPIs. If you want a "what success looks like" panel, label it **"Illustrative 24-month targets"** and bind it to KPI targets in the data layer. Make the Lite-mode toggle global (see §10.6).

**Visual / motion:** An animated flywheel SVG (4 nodes, arrow dash-offset loop at 8 s). Pause it on hover and when off-screen, and freeze it under reduced motion.

**Mockup:**
```
   ┌──── Attention (broadcast) ────┐
   │                               ▼
 Better attention         Participation (WhatsApp/USSD)
   ▲                               │
   └──── Proof (data, receipts) ◄──┘     caption: "Each loop feeds the next"
```

**Data to update:** remove the 1.8 M / 32 % / 4.6× / 82 % figures, or tag them Tier 2 targets with a method.

---

### 5.3 `DataEnrichedAnnexure.tsx` (185 lines): "The data room"

**Current state:** 13 accordions of `[label, value, note]` tuples (~140 figures). There is no per-item source, URL or date, and the label "strictly confidential" appears on a public URL.

**Problems (data):**
- **Garbled density rows:** "Kakamega density / land area 4.3 / 433,207 km²" (Kakamega is ~3,050 km²). The same applies to Vihiga, Bungoma and Busia. These look like a parsing error and should be deleted or replaced with KNBS density (persons/km²).
- "Top-three audience consolidation 57 % → 41 %" is a mislabel. 75 % → 57 % → 41 % is the **MCK daily radio listenership** series (2023 → 2025).
- WhatsApp "$0.038 per Kenya message" conflicts with Part 2/5 ($0.0225/$0.0040). Both need updating to the per-message model (see §8).
- "Q4 2025 digital spend KSh 6.08 B" and "Q2 2025/26 KSh 9.12 B" sit next to each other without explaining the periods.
- Trans Nzoia is listed twice. "Busia: female and intersex not stated".
- Station identity says "Swahili and English", while the strategy positions Nyota as vernacular (Streema lists Nyota as Swahili).
- "#4 Outside broadcast = KSh 6.4 B" uses the national OOH market as a proxy for OB, which is a category error.
- Phase 1 "sourced total KSh 630K–665K" uses a different bill of materials (Shark S6, RODECaster) from Part 6 (627,299–837,299).

**Changes**
1. Convert to a **searchable, sortable data table** fed by `src/data/facts.ts`. Each row gets: id, label, value, unit, period, geography, tier, sourceId, accessDate, and a "used in" back-link list.
2. Move it to **Appendix A**. Remove the "strictly confidential" label, or put the whole site behind access control (see §11).
3. Add **sparklines** where a series exists (smartphone connections Sep 2025 → Jun 2026; MCK daily listenership 2023 → 2025; ad spend 2022 → H1 2026).

**Visual / motion:** The table row expands to show the source card. Sparklines draw left-to-right on first view (400 ms) and are static under reduced motion.

**Mockup (mobile row):**
```
┌───────────────────────────────────────────┐
│ Radio reach · Western      83 %   T1  ▸   │
│ Apr–Jun 2026 · CA AMR Q4 FY25/26          │
│ ▁▂▃▄▅▆▇ (Q1→Q4)          used in: Hero, P1│
└───────────────────────────────────────────┘
```

**Data to update:** see the §8 register rows D-01 to D-35.

---

### 5.4 `TouchpointEcosystem.tsx` (261 lines) + source `data/Touchpoint_Ecosystem-*.docx`

**Current state:** Four channel groups with stated totals (YouTube 95,000; Instagram 33,500; TikTok 24,000; Multi 75,500 = 228,000) and a claim of "50 commercial touchpoints".

**Problems**
- **Arithmetic:** the YouTube items add up to **KSh 97,000**, not 95,000. The error is in the source `.docx` and was copied over. The true document total is **230,000**.
- The site lists **45** items, not 50. The "Multi" group dropped/merged 5 Facebook/X items but kept the 75,500 total; its displayed rows add up to **66,500**.
- "Premium formats: Exclusive KSh 40,000" isn't selectable.
- **A second, conflicting rate card** exists in `TouchpointFilter.tsx` (Part 4A), with 39 items and different prices: e.g. "Lower-third logo" is 3,000 there vs 12,000 here.
- The "How the inventory works" `ChevronDown` is decorative and doesn't toggle anything.
- Lucide brand icons (`Facebook`, `Instagram`) are deprecated in lucide and may be removed.
- Prices have no audience basis (no reach/CPM), so an advertiser can't judge value.

**Changes:** Keep **one** rate card (`src/data/rateCard.ts`) with all 50 docx items and computed totals (never hard-coded). Delete `TouchpointFilter` or point it at the same data. Add a "per 1,000 reached" column once baseline audience data exists (Tier 0 until then). Move this into **03 The Opportunity**.

**Visual / motion:** Replace the list with a **treemap** (area = price share) plus a selectable list. Picking a channel zooms the treemap with a View Transition (Baseline same-document since Oct 2025), with an instant swap under reduced motion. A "Build a bundle" tray at the bottom sums selected items and hands off to the merged Media Plan & Quote tool (§6.4a).

**Mockup:**
```
┌ YouTube 97K ─────────────┬ Exclusive 40K ─┬ IG 33.5K ┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ▓▓▓▓▓▓▓▓▓▓▓▓   │ ▓▓▓▓▓▓▓  │
├──────────────────────────┼─ TikTok 24K ───┼ X 13.5K ─┤
│                          │                │ FB 12.5K │
└──────────────────────────┴────────────────┴ Dig 9.5K ┘
 Bundle tray: [Mid-roll 15K] [Reel feature 5K] = KSh 20,000  → Get quote
```

**Data to update:** YouTube subtotal 97,000; total 230,000; restore the 5 missing items; one price list.

---

### 5.5 Part 1 · `Part1Objectives.tsx` (256 lines): Objectives A–E

**Current state:** Five expandable objective cards (v1 target, v2 target, reality check, derivation, TierBadge), followed by 4 tools (Schedule, Lexicon, Roster, Emergency console).

**Problems**
- The v2 target badge reads **"Board Approved"** although the plan hasn't been presented to ownership yet. Change it to "Proposed v2 target".
- The expand header is a `div onClick` with a nested `<button>` that has no handler: not keyboard-operable and a nested-interactive violation.
- **Objective A:** "betting radio ad spend −89 % to KSh 51 M" is a **single quarter** (Jul–Sep 2025 vs Apr–Jun 2025, CA). Meanwhile ReelAnalytics shows **Betting & Gambling back as the #3 sector at KES 2.33 B market-wide in H1 2026**. The narrative "betting collapsed, excise it" needs nuance: *the station chooses not to depend on betting*, which is a values and regulatory position, not a market fact.
- **Objective B:** the "2.0× by Q8 2028" wording ("Q8" is not a quarter name) conflicts with Part 3's 2.0× at **Q4 2027**.
- **Objective C:** "#2 behind Sulwe by Q4 2027". But `CountyCoverageExplorer` says "#1 by 2028" and `CompetitorDialMap` says "Target 24.5 % share". Pick one target. Also: CA reports that **only 16 % of radio listening in Western is vernacular** (Swahili dominates). That strongly supports a Swahili-first, Bukusu-flavoured format and should be cited here.
- **Objective D:** WhatsApp pricing is per *message*, not per *conversation*, since 1 Jul 2025. "~2,000 concurrent Zeno.fm listeners" (v1 baseline) is implausibly high for a regional station and is the only digital baseline. Verify it from Zeno analytics exports, or mark it Tier 0.
- **Objective E:** correctly cites MCK 75 % → 57 % → 41 % daily listenership. Also add CA's **83 % reach in Western** (Apr–Jun 2026) so readers see that "fewer people listen *daily*, but most still listen *weekly*".
- The 4 tools placed under Part 1 (schedule, lexicon, roster, emergency) are *programming* content, not objectives. Move them to **04 The Plan / Programming**.

**Changes:** Each objective becomes a **"target card" with one chart**:
A = stacked bar (spot vs non-spot by quarter);
B = line (revenue index, base/worst/best band);
C = bump chart (station rank by quarter, target band);
D = funnel (listeners → opted-in → active);
E = small multiples (daily listenership vs weekly reach).

**Visual / motion:** The card expands with a height-auto transition (`interpolate-size: allow-keywords` in Chromium, instant elsewhere). The chart draws on expand, never on load.

**Mockup (Objective D funnel, mobile):**
```
 Objective D · Addressable base          Proposed v2: 150K base / 250K stretch
 ┌───────────────────────────────┐
 │ Weekly listeners (Tier 0 gap) │ ███████████████████████  ?  (survey needed)
 │ WhatsApp/USSD opt-ins         │ ████████             150K by M24 (base)
 │ Monthly active                │ ████                  60K (40% target)
 └───────────────────────────────┘  cost to acquire: KSh 20–30/contact (Tier 2)
```

**Data to update:** D-03, D-04, D-08, D-09, D-11 in §8.

---

### 5.6 Part 2 · `Part2MasterData.tsx` (1,059 lines, the largest file)

**Current state:** 8 tabs (2.1–2.8). Seven tools are dropped *inside* tab 2.1 between 2.1.1 and 2.1.2. `tableSearch` state is declared but never used.

**Problems**
- **Burying:** Agri prices, vox pops and royalties don't belong under "Market Sizing", and they push 2.1.2–2.1.4 below ~10 screens of tools on mobile.
- **Four different reach figures** appear on one tab: Western 81 % (Q2 FY25/26), national daily 75 % → 41 %, "weekly ~33 M listeners" (vs 23.9 M/24.4 M), and "Western regional reach 68.4 %". Reconcile them as **one chart with clearly labelled measures** (daily listenership vs past-week reach, national vs Western, survey vs panel).
- **Population projections:** Bungoma uses exact figures (1,892,427 / 1,932,168) while the others are rounded "est.", giving false precision in the total (6,632,427). Show ≈6.6 M / ≈6.8 M and cite the KNBS projection method.
- **Luhya sub-groups "Bukusu 56 %, Maragoli 11 %"** is not supported. The 2019 census records **6,823,842 Luhya**, of whom **3,944,257 said only "Luhya"** and **1,188,963 said Bukusu** (≈17 % of all Luhya). Replace with census counts.
- **Competitor table:** frequencies mostly check out (Mulembe 99.0/99.2 Western, 95.8 Eldoret, 97.9 Nairobi; Sulwe 89.6; West FM 94.9; Ingo 100.5/103.5). But `CompetitorDialMap` uses different ones (see §6.2d). **Missing Bungoma competitors:** Mumbo FM 90.2 (Bukusu, sister to West FM), Radio Simba 91.3, Sema FM 98.3, WAI FM 87.6, Pepea Radio 100.0.
- "Radio Citizen / Maisha / Jambo 7 % Western reach" has no source and conflicts with GeoPoll Q1 2026 national reach (Citizen 64.7 %, Jambo 59.6 %).
- **2.3.2 sector shares:** transport KSh 727 M = 11 % but telecoms KSh 302 M = 10 %, which can't both be shares of the same total. Replace with **CA Apr–Jun 2026 radio sectors**: Banking & Finance KES 1,291 M; Servicing 623 M; **Agriculture & gardening equipment 494 M**; Entertainment 444 M; Media 354 M; Foods 332 M. The agriculture line directly supports Strategy 5.20.
- **2.4.2 TikTok:** still correct; the Creator Rewards Program is not available in Kenya (Oct 2026). But "200+ advertisers" should read "200+ Kenyan *creators* earned >US$350K via brand collaborations in TikTok for Business's first year" (Feb 2026).
- **2.4.3 WhatsApp:** must move to per-message pricing.
- **2.6.2 Music rights:** "MCSK: provisional 6-month status" is outdated. **MCSK was refused a 2025–26 CMO licence and is barred from collecting.** KAMP and PAVRISK were licensed from 5 Nov 2025, but **KAMP's licence was suspended for 90 days from 1 Jul 2026** (upheld 24 Aug 2026). **Consolidated tariffs 2026–2028** apply from 1 Jan 2026, and KECOBO invited 2027 CMO licence applications on 4 Sep 2026.
- **2.7 NLS formula** `(WAL × AWLH) + (RCI × 0.3) + (CPEI × 0.2)` is dimensionally broken. WAL×AWLH is in the millions and swamps the other terms. RCI as defined (`unique callers ÷ total callers`) measures *new* callers, not *repeat* callers. See the fix in the Changes list below.
- **2.8 levers:** 14 levers here vs 12 (Hero/Part 4) vs 11 (Part 3.3) vs 8 (Part 1). **Google Ad Grants ($10K/mo) is only for registered charities**, and Nyota Frequency Modulation Ltd is a company, so it is ineligible.
- The 5–7 column tables have no `<caption>`, no `scope`, and no sticky first column on mobile.

**Changes**
1. Split Part 2 into **01 The Situation** (6 charts: reach, listening by language, ad market, sectors on radio, devices, social/digital) and **Appendix A Data Room** (all tables).
2. Move the 7 tools to Appendix B ("Interactive Lab") and link each from the chart it explains.
3. Fix NLS:
   `NLS = 100 × [0.4·norm(AWLH) + 0.3·RepeatRate + 0.3·CPEI]`, where `RepeatRate = callers with ≥2 calls in 4 weeks ÷ unique callers`, `norm(x) = x ÷ benchmark`, and `CPEI ∈ [0,1]`. Publish the weights as Tier 2 and invite the board to change them.

**Visual / motion:**
- **Reach chart:** a dot plot with two dots per region (MCK daily vs CA reach), Western highlighted.
- **Language chart:** a 100 % stacked bar by region, showing Western's 16 % vernacular.
- **Ad market:** a slope chart 2022 → 2025 → H1 2026.
- **Sectors on radio:** a horizontal bar chart.
- Motion: bars grow from 0 via a scroll-driven `scaleX` with `@supports`; others see static bars.

**Mockup (language by region):**
```
              Swahili ███████████  Vernacular ░░░  English ▒
Western   ████████████████████████████████░░░░░░▒▒   16 % vernacular
Lake      ████████████████░░░░░░░░░░░░░░░░░░░░░░▒▒   58 %
Nairobi   ████████████████████████████████░░░░▒▒▒▒   16 %
Source: CA Audience Measurement Q4 FY2025/26 (Apr–Jun 2026), Table 6
```

**Data to update:** D-01 to D-20, D-24 to D-30.

---

### 5.7 Part 3 · `Part3DataAnalysis.tsx` (403 lines)

**Current state:** 3.1 revenue concentration · 3.2 "v1 assumptions vs evidence" verdict table (**excellent, keep it**) · 3.3 whitespace list (11 channels) · 3.4 "8-Quarter Payback Model" (a revenue index only) · two simulators · 3.5 risks.

**Problems**
- **3.4 is mislabelled.** It is a revenue index with **no costs, cash, payback or break-even**. The Hero and Search call it an "EBITDA simulation".
- **Three spot assumptions:** the TierBadge says "15 % spot compounding", the chart shows spot 100 → 120 over 8 quarters (~9.5 %/yr), and the sensitivity "Base" row says "spot +5 %".
- **Stale timeline:** Q1 2026–Q4 2027, and the "What must be true" list (USSD by Q3 2026, BSP Q2 2026, Studio Q2 2026, shows Q3 2026) is already in the past.
- 3.1 mixes numbers and words in a numeric row ("High Budget", "Core Trans Nzoia"). Banking & SACCOs "11 %" duplicates transport's 11 %.
- The quarter "chart" is 8 buttons without axes. There's no `aria-pressed`.
- 3.5 "radio listenership 75 % → 41 % in two years" is a correct MCK *daily* metric but is presented as audience collapse. Pair it with CA's 83 % Western reach.
- **Missing:** opex. New hires alone total **KSh 370K–630K per month** (Part 6.3 benchmarks), about **KSh 4.4–7.6 M per year**. Add messaging, USSD at KSh 70K/month, shows at KSh 150–250K/show/month, paid social and royalties. None of this enters any model.

**Changes:** Make this **06 The Money**, with an incremental model (§6.3a). Show:
(1) an assumptions panel (editable sliders, each a Tier 2 input with its source);
(2) a monthly cash curve, cumulative and incremental vs "do nothing";
(3) a P&L table by year;
(4) a **tornado chart** (which assumptions move payback most);
(5) scenario bands.
Keep 3.2 as the opener of *Risks*.

**Visual / motion:** The cash curve area fills on first view (600 ms). Slider changes animate the line with a 200 ms tween; under reduced motion the update is instant. The break-even marker gets a short brass pulse once.

**Mockup:**
```
Cumulative incremental cash (KSh M)              Assumptions ▾
  3 ┤                                 ╭── best   Spot growth   [●──── 5%]
  0 ┼──────────────╮          ╭───────╯── base   Non-spot ramp [──●── base]
 -3 ┤               ╰────────╯ ← break-even M14   Opex/month    [───●─ 0.9M]
 -6 ┤ capex P1+P2                        worst   Discount rate [──●── 14%]
     M0   M3   M6   M9   M12  M15  M18  M21  M24
Tornado:  Opex ████████████│██████  · GAA timing ████│████ · OB yield ██│██
```

**Data to update:** D-21 to D-23, D-31.

---

### 5.8 Part 4 · `Part4Opportunities.tsx` (339 lines)

**Current state:** 12-lever table ranked by "Composite = (EV × P) ÷ Time", a difficulty filter, a "Top five" panel, then Part 4A (TouchpointFilter), AdCampaignCalculator, AdvertiserQuoteBuilder and PodcastArchivePlayer.

**Problems**
- **The formula double-counts probability.** Expected value already equals yield × P. The inputs (yield, P, time) aren't shown, so the scores (8.5, 8.2…) can't be reproduced.
- Revenue ranges differ from Part 2.8 (e.g. GAA/County KSh 2–8 M here vs County 1–5 M + GAA 0.5–3 M; OB 2–4 M here is absent from 2.8).
- Political advertising "Difficulty: Low" ignores the IEBC/NCIC/MCK compliance load and reputational risk. In addition, the **IEBC spending limits gazetted 7 Aug 2026 are currently stayed by the High Court**, so campaign budgets may be uncapped and less predictable.
- "Branded shows KSh 80–150K/mo" vs Strategy 5.12 "150–350K/mo" vs the schedule "140–350K/mo".
- Part 4A shows a second, broken rate card (see §6.4d).

**Changes:** Use a **transparent scoring table**: `Score = (Annual mid-revenue × P(success)) ÷ (Months to first revenue + Activation cost factor)`, with every input visible and editable, then rank. Keep one rate card. Merge the two calculators (§6.4a).

**Visual / motion:** A **bubble matrix**: x = time to revenue, y = P(success), bubble size = annual revenue mid-point, colour = difficulty. Hovering or tapping highlights the row. Changing weights re-sorts with FLIP animation (Motion `layout`), or instantly under reduced motion.

**Mockup:**
```
P(success)
 0.8 ┤   ◯ WhatsApp/USSD      ⬤ GAA/County
 0.6 ┤        ◯ Shows   ◯ OB
 0.4 ┤  ◦ Merch         ◯ YouTube      ◯ Political (Q2–Q3 2027)
 0.2 ┤            ◦ Events        ◦ Syndication
     └────┬────────┬────────┬────────┬──── months to first revenue
          3        6        9        12
```

---

### 5.9 Part 5 · `Part5Strategies.tsx` (833 lines): 21 strategies

**Current state:** 7 tools (Tracker, Mobile sim, Civic notice, Political rate card, Diaspora, Loyalty, Editorial handbook), *then* the searchable list of 21 strategies with receipts, budget, timeline and KPIs.

**Problems**
- The main content sits **below 7 tools**.
- **Two different "21 strategies" lists** exist (§6.5a, StrategyTracker). Titles diverge for 5.8, 5.9, 5.10, 5.12, 5.13, 5.17, 5.19, 5.20 and 5.21.
- **Funding partners "USAID, DFID":** DFID merged into the FCDO in 2020, and **USAID was closed in 2025**. A April 2026 SAIIA policy brief documents the knock-on effects on African media funding. Replace these with currently active funders (e.g. FCDO-funded programmes, EU, BBC Media Action, Internews, IMS, foundations) and mark each as *to verify*.
- **Internal contradictions:** YouTube subscribers 50K at M12 (5.1) vs 40K at M12 (5.8); contacts 120K at M24 (5.5) vs 150K/250K (Part 1); USSD budget 250K + 80K/mo (5.6) vs 145K + 70K (AT); merch unit cost 450–700 vs 250–500 (Annexure); merch profit 500K at M12 vs 200–500K per year; "WhatsApp 19.8 % direct usage" vs 53.9 % (Annexure) vs **72.5 % of internet users 16+ using WhatsApp monthly** (GWI via DataReportal, Oct 2026).
- **Unsourced claims:** "Bungoma & Trans Nzoia produce >40 % of Western Kenya commercial maize" (Trans Nzoia is in the former Rift Valley province); "2022 election media spend in Western > KSh 150 M"; "CBK remittances > $4 B" (the actual figure is **US$5.04 B in 2025**, though 2026 is trending to the first annual decline in 17 years).
- Every timeline is in 2026 and needs rebasing.
- The accordion header is `div onClick`.

**Changes:** Put the strategy list first and present it as a **Gantt-style roadmap** (rows = 21 strategies grouped by category, bars = Month 0–24) with an expandable detail drawer. Generate from `src/data/strategies.ts` so the Tracker, Gap Audit, Search and Briefing all read the same list. Each strategy shows: owner, budget (capex/opex split), dependency arrows, and a KPI sparkline (target path).

**Visual / motion:** Gantt bars slide in on first view (stagger 30 ms, capped at 12 rows). Dependency arrows draw as SVG paths. The drawer opens with a View Transition (bar → drawer header morph).

**Mockup:**
```
              M0  M3  M6  M9  M12 M15 M18 M21 M24
5.2 Studio P1 ███▌                                   Engineer · KSh 0.63–0.84M
5.5 WhatsApp   ██████████████████████████████████   Head of Digital · opex
5.6 USSD          ████████████████████████████████   ↳ depends on 5.5, ODPC
5.14 GAA/County    ████████████▌                     GM
5.21 Election          ██████████▌ (campaign 29 May–7 Aug 2027)
```

---

### 5.10 Part 6 · `Part6TheBuild.tsx` (492 lines)

**Current state:** 6.1 roadmap (Q1 2026–Q4 2027), 6 tools, 6.2 three-phase capex table, 6.3 people, 6.4 statutory schedule, 6.5 governance.

**Problems**
- **Capex arithmetic checks out:** P1 627,299–837,299; P2 1,841,800–2,957,800; P3 2.5–5.8 M; total 4,969,099–9,595,099. **But the schedule is incomplete.** Items shown elsewhere are not in any phase: the hybrid solar + battery + generator + ATS (`PowerResilienceMatrix`, `EquipmentLifecycleLog`: ~KSh 1.1 M+); the OB rig (X32, wireless mics, PA, Comrex, generator: well above the "320K conversion" claimed); the podcast-room gear (RODECaster, SM7B, ZV-E10 ≈ 313K); the editing workstation (145K, "Phase 1"); and a transmitter (KSh 1.85 M, listed as "Operational").
- The Phase 1 badge says "Tier 1", but the table includes Tier 2 rows (encoder, installation).
- "Gate-controlled by revenue thresholds", yet no thresholds are defined.
- Part 5.3 says "expand to four PTZ", while Part 6 says "4× additional" (6 total).
- Acoustic treatment is 110–250K here vs "5,500–12,500" in the 5.2 receipt (that is a per-panel price).

**Changes:** Build **one capex register** (`src/data/capex.ts`) with: item, phase, vendor, quote date, unit price, qty, tier, and an "in model" flag. Render a **stacked phase bar** plus a table. Define the phase gates, e.g. "Release P2 when trailing 3-month non-spot revenue ≥ KSh X and P1 utilisation ≥ 2 streams/week." Add opex per phase.

**Visual / motion:** A **capex waterfall** (P1 → P2 → P3 → power → OB → total) and a **phase-gate diagram** (three gates with conditions). Gates light up as conditions are toggled in a "what-if" panel.

**Mockup:**
```
Capex (KSh M)  P1 0.63–0.84 ▇▇
               P2 1.84–2.96 ▇▇▇▇▇▇
               P3 2.50–5.80 ▇▇▇▇▇▇▇▇▇▇▇
               Power 1.1+  ▇▇▇     ← add
               OB rig  ?   ▇▇▇     ← add (Tier 0, get 3 quotes)
               Total ≥ 6.1–10.7 (vs site 4.97–9.60)
Gate 1 ◉──── Gate 2 ○──── Gate 3 ○   (conditions on hover)
```

---

### 5.11 Part 7 · `Part7GapAudit.tsx` (336 lines)

**Current state:** The Workbench tool, then Checklists A (20 gaps), B (40 items) and C (12 levers), with search and a category filter.

**Problems:** "Audit Status: 100 % Resolved" and "20 / 20 Closed", although many fixes are "data gap declared", which is honest but not *resolved*. Checklist B dates are all 2026. Checklist C includes **Google Ad Grants (nonprofits only)** and a Meta Journalism Project grant whose current availability is unverified. Item 27 "CA licence 100,000/yr" (the Part 2 text says "or 0.4 % of turnover, whichever is higher"). There is no owner workload view.

**Changes:** Use three statuses (**Fixed**, **Declared gap with plan**, **Open**) and show a donut per checklist. Rebase dates to Month 0. Replace Ad Grants with eligible options. Add a "Who owns what" swim-lane view.

**Visual / motion:** Donut segments animate from 0 (500 ms). A swim-lane board (GM / Head of Digital / Engineer / Firefly) supports filtering with a FLIP re-layout.

**Mockup:**
```
Checklist A  ◔ 12 fixed · 6 declared · 2 open     Checklist B  ◑ …
GM          │ GAA filing │ County frameworks │ CMO licence │
Digital     │ BSP        │ USSD              │ ODPC        │
Engineer    │ Studio P1  │ Power             │ Streaming   │
```

---

### 5.12 `SourceListAndAsks.tsx` (306 lines): sources, self-check, Six Asks

**Problems**
- **Duplicate `id="part-asks"`**: both `App.tsx`'s wrapper div and the component root use it. That makes the HTML invalid and anchor targets ambiguous.
- All 37 sources are **domain-only** (`ca.go.ke`, `knbs.or.ke`…), with **the same access date (2026-09-30)**. Several are weak sources for Tier 1 (a LinkedIn post, AllAfrica, kenyapolls).
- **Self-check shows 12 × "PASS", hard-coded.** At least #2 ("every Tier 1 has URL") and #11 ("payback model present") are demonstrably false. This is the item most likely to undermine trust.
- The "Endorse" buttons are local state; anyone can click "Endorsed by Board", and it resets on reload.
- The footer says "Strictly Confidential · September 2026".
- **Asks count:** this component has **6 asks**. `ExecutiveBriefingMode` has **5 resolutions** with different content, and the Presentation deck slide 8 is titled "Six Asks" but lists **5**.

**Changes:**
1. Use a source registry with **deep links**, publisher, publication date, access date, and "supports facts: D-xx".
2. Replace the hard-coded self-check with a **computed** one: count Tier 1 facts without a deep link, contradictions detected (same `factId` with different values), and so on. Show the real numbers.
3. Settle on **one** asks list (proposal in §14) and turn "Endorse" into a **printable resolution sheet** (PDF/print CSS) with signature lines. Optionally, capture sign-off through a simple form.

**Visual / motion:** Each ask card shows its amount, owner and deadline. A "Total capital requested" bar fills as each ask is reviewed (this tracks reading progress, not approval).

**Mockup (print):**
```
RESOLUTIONS OF THE BOARD — NYOTA FREQUENCY MODULATION LTD      Date: ______
1. Approve Phase 1 visual-radio capex, not exceeding KSh 0.84M   ☐ Yes ☐ No
2. …
Signed: ____________  ____________   (Generated from proposal v2.1, data hash 7f3a…)
```

---

### 5.13 `TierBadge.tsx` (120 lines)

**Problems:** Every badge defaults to `accessDate = '2026-09-30'`. The popover can't be dismissed with Esc or an outside click. It uses off-palette `emerald/amber/rose`. Most callers pass a domain, not a URL.

**Changes:** Change the signature to `TierBadge({ factId })`, which looks up tier, source, URL, date and method from the data layer. Make the badge a `<button aria-expanded>` with a popover using the native **Popover API** (`popover` attribute; light-dismiss and Esc for free). Colours: moss (T1), brass (T2), brick (T0) from the theme. **This one change propagates evidence integrity to ~45 places.**

---
## 6. Interactive Tools Review (31 tools)

Each tool gets a verdict: **Keep** (minor fixes), **Rebuild** (concept good, implementation misleading), **Merge**, or **Cut**. Every tool should be lazy-loaded and placed in *Appendix B — Interactive Lab*, unless stated otherwise.

**Cross-cutting rule for all tools:** any person, sponsor, quote, price or result that is not verified must carry a visible **"Illustrative"** chip (not a Tier 1 badge). Real brand names may only appear as sponsors or endorsers if a contract exists.

### 6.1 Programming tools (currently in Part 1)

#### 6.1a `InteractiveSchedule.tsx` · **Rebuild**
- **Current:** a weekday and weekend grid with show titles, hosts, demographics, "title sponsor" rates (KSh 140–350K/mo) and a synthesised "stinger" beep.
- **Problems:** Show cards are `div onClick` (no keyboard access). A new `AudioContext` is created per click and never closed. It claims "Includes live video feed" although Phase 1 isn't built. Spelling: "Asuhi ya Imani" here and in Part 5 vs "Asubuhi ya Imani" in Part 6 and the Asks. The DJ mix is on Saturday here but "Friday night" in Part 5. These rates are a third sponsorship price set.
- **Changes:** Show the *proposed* schedule as a **24-hour radial clock or daypart ribbon**. Pull rates from the data layer. Replace beeps with 3-second real jingles (MP3/Opus, ~20 KB each, preload="none"). Mark hosts "TBC" unless contracted.
- **Visual/motion:** The current-time needle moves in real EAT (`Intl.DateTimeFormat('en-KE',{timeZone:'Africa/Nairobi'})`). Selecting a show rotates the ribbon (200 ms ease-out); it is static under reduced motion.
- **Mockup:**
```
06 ── Kumekucha ─── 10 ── Soko Nyota ── 14 ─ Desk ─ 16 ─ Drive ─ 19 ─ Night ─ 22
       ▲ now 07:42 EAT                       (tap a block → details drawer)
```
- **Data:** settle show names, days and rates in `programmes.ts`.

#### 6.1b `TwangaaLexicon.tsx` · **Keep (fix)**
- **Problems:** The Tier 1 badge cites a "Luhya Linguistic Dialect Atlas" with no URL. "Mulembe" is tagged "Regional Swahili", but it is a Luhya greeting. "68 % peak morning share" and "Hapa Tulipo generates KSh 150–350K per market day" are unsourced. Web Speech is set to `sw-KE`, which mispronounces Bukusu words.
- **Changes:** Use **recorded native-speaker clips** (a presenter reads each word; ~8 KB Opus each). Have each translation reviewed by a Bukusu/Luhya speaker and credit the reviewer. Drop the commercial-value claims or label them illustrative. Change the badge to "Cultural note".
- **Visual/motion:** A waveform of the actual clip (precomputed peaks JSON) animates its playhead. The word card flips 3D (existing `.flip-card`) only when motion is allowed.
- **Mockup:** no new layout needed; reuse the existing card grid with the waveform added.

#### 6.1c `PresenterRoster.tsx` · **Rebuild or hide until real**
- **Problems:** Invented presenters carry a Tier 1 badge. **Real brands are named as "Trusted Advertiser Endorsements"** (Equity Bank, Kenya Seed, Safaricom M-Pesa, Unga, Kenchic, SHIF, TotalEnergies, Co-op Bank). Follower counts of 76K–145K contradict the station's audited **~5,740 Facebook followers**. The "68 % peak morning share" has no source.
- **Changes:** Show **real Nyota presenters** with consented photos, real social handles and live follower counts (fetched at build time). Or show "Talent model: roles we will cast" with silhouettes and no names. Remove all brand names.
- **Visual/motion:** Portrait cards with a duotone (ink/brass) treatment. Hover or focus reveals the catchphrase with a 150 ms fade.
- **Mockup:**
```
┌────────┐ ┌────────┐ ┌────────┐
│ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │  ? TBC │   Breakfast host · Bukusu/Swahili
│ Name   │ │ Name   │ │ Casting│   Followers: 5.7K (FB, live)
└────────┘ └────────┘ └────────┘
```

#### 6.1d `EmergencyAlertConsole.tsx` · **Keep (reframe)**
- **Problems:** A Tier 1 badge (NDOC/KMD) sits on fictional alerts. A **sawtooth siren auto-plays on every card click**, with no mute and no warning, which is startling and inaccessible. The Bukusu text needs native review. The Busia alert lists "Bungoma County Police". The concept is excellent and timely: the **Musaga substation fire on 7 Aug 2026 blacked out five Western counties**.
- **Changes:** Play sound only on an explicit "Play test tone" button, with a volume cap and a reduced-motion/no-autoplay preference. Show the **workflow** (KMD/County alert → duty editor → bilingual script → on air within N minutes → WhatsApp/USSD push), plus a "last real emergency" timeline once it exists.
- **Visual/motion:** A process stepper with timed progress (an 8-second demo run) and a pulsing red dot only during the run.
- **Mockup:**
```
KMD/County ─▶ Duty editor ─▶ Script (SW/Bukusu) ─▶ ON AIR ─▶ WhatsApp/USSD push
   00:00          02:00            05:00             08:00        10:00
```

### 6.2 Evidence tools (currently in Part 2)

#### 6.2a `CountyCoverageExplorer.tsx` · **Rebuild as a real map**
- **Problems:** The dBµV/m values and "Primary 100 % / Secondary 90 % / Outer Fringe 75 %" coverage figures are invented, but badged "CA Transmitter Signal Register". The strategy text says "#1 by 2028", contradicting Part 1. **The per-county "ad opportunity" adds up to KSh 6.5–13.2 M per *month* (~78–158 M/yr), an order of magnitude above every revenue model in the site.** "Chwele: Kenya's 2nd largest open market" is unverified.
- **Changes:** Build an **SVG choropleth of the 5 counties** (KNBS/IEBC boundaries, simplified TopoJSON, ~15–25 KB). Layer it with the **real predicted 54 dBµV/m contour** for 107.3 MHz, computed once from licensed parameters (site, height, ERP from the CA licence) with an ITU-R P.1546-type tool or a coverage service, and exported as a static GeoJSON. Per-county ad opportunity becomes a Tier 0 gap until baseline sales data exists.
- **Visual/motion:** Counties fill by population (sequential brass ramp). The contour draws with a stroke-dash on first view. Tapping a county opens a side panel, and a View Transition morphs the county into the panel header.
- **Mockup:**
```
┌───────── map ─────────┐  Bungoma
│  ▓Trans Nzoia         │  Pop 2019: 1,670,570 · 2026p ≈1.93M
│ ▓▓Bungoma  ◉107.3     │  Inside 54 dBµV/m contour: ~xx % (modelled)
│ ▒Busia ▓Kakamega      │  Radio reach (Western): 83 %  CA Q4 FY25/26
│      ░Vihiga          │  Vernacular share (Western): 16 %
└── contour - - - - - ──┘
```

#### 6.2b `CountyEconomicExplorer.tsx` · **Rebuild**
- **Problems:** Only 4 counties (Vihiga is missing). GDP per capita, SACCO members, boda-boda counts and county comms budgets all carry Tier 1 badges with no source. It says "NHIF/SHIF" although NHIF was replaced by SHA/SHIF in October 2024. "Lubao: largest cattle market in East Africa" and "MMUST 40K students" are unverified.
- **Changes:** Use **KNBS Gross County Product 2025** (2024 data: Kakamega ≈ US$2.45 B, Bungoma ≈ US$2.37 B GCP, ranked 10th and 11th nationally), plus county budget data from the Controller of Budget and county CIDPs (via a deep link per county). Keep SACCO and boda figures only with a source.
- **Visual/motion:** **Small multiples**, one mini-panel per county (GCP, population, top 3 crops), plus a ranked bar of GCP. Bars grow on view.
- **Mockup:** 5 panels in a row on desktop; a horizontal swipe carousel on mobile with snap points (`scroll-snap-type: x mandatory`).

#### 6.2c `TransmitterElevationTool.tsx` · **Cut, or rebuild as a static, honest explainer**
- **Problems:** The physics is wrong. The horizon formula uses `(altitude ASL − 1200)` (an arbitrary offset; it should be height above average terrain). Transmitter power has **no effect** on the radius. "Population reached" equals radius × 0.078. The mast sites (Chetambe, Kapsokwony, rooftop) are hypothetical, yet badged Tier 1 "CA Technical Standards". An engineer on the board would spot this immediately.
- **Changes:** Replace with "**Where our signal reaches today**" (the real contour from 6.2a) and "**What a power or antenna upgrade would add**", shown as before/after contours computed offline. If you keep the slider, label it "Simplified illustration".
- **Visual/motion:** A before/after slider (CSS `clip-path` driven by `<input type=range>`).
- **Mockup:** `[ today ◀──●──▶ upgrade ]` over the map from 6.2a.

#### 6.2d `CompetitorDialMap.tsx` · **Rebuild (strong concept)**
- **Problems:** Frequencies contradict Part 2: Sulwe 89.5 vs 89.6, Mulembe 99.7 vs 99.0/99.2. (West FM 104.1 is a real secondary frequency; 94.9 is its main one.) The Western shares (Mulembe 22.1 %, Citizen 19.5 %, Sulwe 18.4 %, West 14.2 %) have no source and contradict "Citizen 7 % Western reach". Nyota's "Target 24.5 %" contradicts Part 1's "#2 behind Sulwe". Nyota's spot rate "KSh 2,800" contradicts Part 2's model (8–15K prime). The USSD code `*483*107#` and "Solar ATS" are presented as existing. Bungoma's local competitors are missing (Mumbo FM 90.2, Radio Simba 91.3, Sema FM 98.3, WAI FM 87.6, Pepea 100.0, Khendo 107.9).
- **Changes:** Draw a **true-to-scale FM dial** (88–108 MHz) with every station receivable in Bungoma town. The marker position equals the frequency, and markers are coloured by owner (RMS, KBC, independent). The detail card shows *sourced* facts only. Shares stay Tier 0 until a GeoPoll/KARF Western oversample is bought (§8, "Data the site is missing").
- **Visual/motion:** The tuning needle snaps between stations, with a soft "static" crackle (a 1 s, ~6 KB audio clip, opt-in). Under reduced motion it jumps.
- **Mockup:**
```
88 ─┬────┬────┬────┬────┬────┬────┬────┬────┬────┬── 108 MHz
   87.6 89.6 90.2 91.3 94.9  98.3 99.0 100.0 100.5 107.3 107.9
   WAI  Sulwe Mumbo Simba West Sema Mulembe Pepea Ingo ★NYOTA Khendo
                                                   ▲ needle
```

#### 6.2e `AgriCommodityIndex.tsx` · **Rebuild with real data**
- **Problems:** It is called "Live", but the prices are static. Maize at KSh 3,400 per 90 kg is stale: the **NCPB set a floor of KSh 4,000 in January 2026**, and producing areas traded around **KSh 3,800–4,100 in August 2026**. "On-air sponsors" name real organisations (Kenya Seed, One Acre Fund, Kenchic, New KCC, Co-op Bank) with no contract.
- **Changes:** Source the prices from the **Ministry of Agriculture's KAMIS market price system** (or NCPB notices) with a date stamp, refreshed at build time or weekly. Replace sponsor names with "Sponsor slot available".
- **Visual/motion:** Price tiles with a 12-week sparkline and the up/down delta animated (a 300 ms colour flash, none under reduced motion).
- **Mockup:**
```
Maize 90kg · Kitale     KSh 4,000  ▲ +100   ▁▂▃▅▆▇▆▅  (KAMIS, 21 Nov 2026)
Beans Rosecoco 90kg     KSh x,xxx  ▼ −…     ▇▆▅▄▃▂▂▁
[ Sponsor this board → ]
```

#### 6.2f `ListenerVoxPop.tsx` · **Cut, or replace with consented real recordings**
- **Problems:** It is labelled "**Real verbatim testimonials**" with a Tier 1 badge ("In-field qualitative audits 2025/2026"), but `OPEN_QUESTIONS.md` admits these quotes are unverified. The "voice stinger" plays a beep, not a voice. This is the single most damaging trust issue if a board member asks "who is Mama Mary Nasimiyu?"
- **Changes:** Record 4–6 real vox pops at Chwele and Kimilili markets (written consent, Data Protection Act-compliant). Show audio, a photo (if consented), date and location. Until then, remove the component.
- **Visual/motion:** Audio cards with real waveforms and transcript highlighting synced to playback (`timeupdate`).
- **Mockup:** `[▶ 0:23]  ▂▅▇▅▂▁▃▆…  "…lazima nisikilize bei za Soko…"  — Trader, Chwele (recorded 12 Jan 2027, consent ✓)`

#### 6.2g `CMORoyaltyCalculator.tsx` · **Rebuild**
- **Problems:** The "Commercial Commercial" typo. The tariffs (75K/180K/350K) and the 40/35/25 split are invented, yet badged "KECOBO Joint CMO Tariff 2025/2026". "68 % Nyota actual local content" has no source. "Automatically submits monthly log sheets" is a false claim. Most importantly, it ignores the 2025–26 reality: **MCSK is unlicensed and barred from collecting; KAMP and PAVRISK were licensed from 5 Nov 2025; KAMP's licence was suspended for 90 days from 1 Jul 2026**. The **Consolidated Music Tariffs 2026–2028** (from 1 Jan 2026) charge national radio **4 % of net revenue, minimum KSh 500,000**, with lower minimums for regional stations, which are defined as broadcasting **within five counties**, as Nyota does.
- **Changes:** Build a calculator around **4 % × net revenue vs the regional minimum** (fill in the regional minimum from the gazetted tariff), plus the 5 % monthly compounded late penalty. Show "Who to pay this year" as a status card that is updated after the KECOBO 2027 licensing round (applications invited 4 Sep 2026).
- **Visual/motion:** A stepped line chart (royalty vs revenue) that shows the minimum floor. A slider moves a marker along it.
- **Mockup:**
```
Royalty (KSh)        ┌───────── 4 % of net revenue
                ─────┘ ← regional minimum floor
Net revenue →  [ KSh 18M ●──────── ]  → royalty KSh 720,000 / yr
Licensed CMOs (Nov 2026): PAVRISK ✓ · KAMP (suspension lifted?) ⟳ · MCSK ✗
```

### 6.3 Financial tools (currently in Part 3)

#### 6.3a `InteractivePaybackSimulator.tsx` · **Rebuild (P0)**
- **Problems (recomputed in this audit):** It attributes **whole-station cash** to studio capex. Base case: gross KSh 2.59 M/month (spot 1.2 M + OB 0.66 M + digital 0.28 M + sponsorships 0.45 M), minus opex 1.15 M, gives net **1.44 M/month**, so payback on the KSh 732K Phase 1 is **1 month** and 24-month ROIC is **+4,621 %**. Even the −20 % stress case gives 1 month and +2,923 %. The spot baseline (1.2 M/month) is an **unaudited Tier 0 value** that Part 1 says doesn't exist. It claims "discounted cash flow", but nothing is discounted. Capex "Phase 1+2 = 2,450,000" doesn't match P1+P2 (2.47–3.80 M), and "Phase 1–3 = 4,970,000" is the minimum, not an average. **Chart bug:** `maxVal = 5,000,000`, but base Q1 revenue is 6.99 M, so **every revenue bar is clamped at 100 %** in all scenarios, and the chart shows nothing.
- **Changes:** Use an **incremental model**: `Δcash_t = (new revenue_t − cannibalised spot_t) − (new opex_t) − capex_t`, discounted at a board-set rate (e.g. bank lending rate). The baseline revenue is an *input* with a "Tier 0, needs audit" warning. Outputs: payback month (or "not within 24 months"), NPV, IRR, peak funding need. Phases are switchable, so capex comes from `capex.ts`.
- **Visual/motion:** The cumulative cash curve (see §5.7 mockup) plus a tornado chart. The curve morphs on input change (200 ms), instantly under reduced motion. Never show more than 3 significant figures.
- **Data:** §8 rows D-21, D-22, D-31, D-32.

#### 6.3b `CapexWaterfallSimulator.tsx` · **Merge into 6.3a**
- **Problems:** Hard-coded monthly profits. The 12-month ROI is printed as +164 % in the conservative case, but recomputes to 161 %. It uses the minimum capex (627,299) only. Its "breakeven Month 5" contradicts 6.3a ("1 month") and the Presentation deck ("Month 5", "KSh 1.8 M surplus", where the waterfall gives 2.08 M). Bars have a 15 % minimum height, which distorts small values, and colour is the only cue (red/green).
- **Changes:** Fold it into 6.3a as the "Phase 1 only" view of the same model. Use a true waterfall with a zero line, labels, and pattern plus colour encoding.

### 6.4 Commercial tools (currently in Part 4)

#### 6.4a `AdCampaignCalculator.tsx` and 6.4b `AdvertiserQuoteBuilder.tsx` · **Merge into one "Media Plan & Quote"**
- **Problems:** These are near-duplicates (same rates, OB at 180K, WhatsApp at 35K) with different discount ladders (0/8/15/20 % vs 5/15/20 %). Spot rates (breakfast 2,800 … night 1,200) are a **third rate card**, contradicting Part 2's modelled 8–15K prime / 3–6K off-peak, yet badged Tier 1 "ReelAnalytics rate cards". Impressions are calculated as spots × 45,000 with no basis. The calculator has no VAT; the quote builder does. The discount also applies to OB and WhatsApp. The Quote shows a **fabricated KRA PIN "P051284920K"** on an "OFFICIAL… authentic pro-forma invoice": **remove it immediately**. It promises a "WhatsApp push to 50,000+ opt-in contacts" when the base is ~0. The date "October 2026" is hard-coded. `window.print()` prints the whole website. There is no `try/catch` on the clipboard call.
- **Changes:** One tool. Rates come from `rateCard.ts`, with tiers (prime/off-peak/ROS) and a published validity date. Reach shows "Tier 0: survey pending" until GeoPoll/KARF data exists. VAT is optional per client type. Add a print stylesheet that prints only the quote (`@media print { body > *:not(#quote) { display:none } }`), and a "Send via WhatsApp" button (`https://wa.me/<sales number>?text=` with an encoded summary).
- **Visual/motion:** A stacked bar of the budget split (airtime / OB / digital) and a reach curve (frequency vs reach, marked illustrative). Totals use a number-roll animation only when motion is allowed.
- **Mockup:**
```
┌ Media plan ───────────────────────┐ ┌ Quote (printable) ──────────┐
│ Daypart [Breakfast ▾] 4 spots/day │ │ Client: ____  Valid to: __  │
│ Weeks ●──────── 4                 │ │ Airtime ......... KSh  x    │
│ + OB day  + WhatsApp push         │ │ OB .............. KSh  x    │
│ Budget split ███████▒▒▒░░         │ │ VAT 16 % ........ KSh  x    │
└───────────────────────────────────┘ │ [Print] [WhatsApp] [Email]  │
                                      └─────────────────────────────┘
```

#### 6.4c `PodcastArchivePlayer.tsx` · **Rebuild or cut**
- **Problems:** There is no audio. The "04:12" timestamp and 35 % progress bar are fake, and the speed buttons do nothing. Episodes are dated Aug–Oct 2026, implying they exist. Real organisations are named as sponsors, and there's a factual claim ("KSh 1.2 B bailout"). The subtitle says "Strategy 5.4"; podcasts are 5.9.
- **Changes:** If pilot episodes exist, embed them (an `<audio>` element and RSS). If not, show a "Season 1 plan" card. Also note the market reality: **Nairobi accounts for >93 % of Kenya's podcast streams** (Spotify, 2025), and vernacular podcasting is close to non-existent. Position the podcast as a **diaspora and Nairobi-Luhya** product, video-first on YouTube.
- **Mockup:** `Season 1 (planned): 8 episodes · video on YouTube · audio on Spotify/Apple · launch Month 4`.

#### 6.4d `src/components/TouchpointFilter.tsx` · **Cut (merge into 5.4)**
- **Problems:** It uses `bg-mulembe-green`, `text-static-grey`, `text-maize-cream` and `bg-broadcast-night`. These are defined in `:root`, **not** in Tailwind v4's `@theme`, so **the utilities are never generated** (confirmed: none exist in the built CSS). Active filter chips and price pills render unstyled. `animate-pop-in` is undefined. It imports `Reveal` but never uses it. Its prices conflict with `TouchpointEcosystem`.
- **Changes:** Delete it. Its filtering is covered by the rebuilt Touchpoint treemap.

### 6.5 Plan tools (currently in Part 5)

#### 6.5a `StrategyTracker.tsx` · **Merge into the Part 5 Gantt**
- **Problems:** It holds a **second, different list of 21 strategies**: titles, costs and KPIs diverge from `Part5Strategies` (e.g. 5.8 "Website" vs "YouTube"; Phase 2 capex 1.6–2.4 M vs 1.84–2.96 M; WhatsApp 50K contacts by M6 vs 20K; OB cost 45K vs 250–400K per activation). It **pre-seeds 6 strategies as "Endorsed"** in `localStorage`, so a first-time visitor sees "6 Board Endorsements".
- **Changes:** One source (`strategies.ts`). Rename "Endorse" to "Shortlist (your browser only)" and start empty.

#### 6.5b `TwangaaMobileSimulator.tsx` · **Keep (best tool on the site, with fixes)**
- **Problems:** It shows a specific code, `*483*107#`, as if allocated. (Africa's Talking shared codes take the form `*384*…#`. Dedicated codes cost KSh 70,000/month on Safaricom plus setup, KSh 116,000 + 46,400/month on Airtel, and KSh 58,000 + 116,000/month on Telkom, all VAT inclusive.) "USSD ni bila gharama" is true for the *listener* only if the station pays per session, and that cost isn't modelled. The **"Twang'aa Cash Club" daily KSh 5,000 draw** is a prize promotion that would need BCLB approval, and conflicts with the "exit betting" stance. The **"First-party *voter* database of 150,000+"** means political-opinion data is sensitive personal data under the Data Protection Act 2019: **remove it**. "Rural smartphone internet <48 %; 94 % own feature phones" is unsourced. The poll result "68 % agree" is fabricated. It is labelled a "WhatsApp **Channel**", but it behaves like a Business-API chatbot (Channels are one-way broadcast). The header says "Strategy 5.7" (USSD is 5.6, WhatsApp 5.5). It calls `Math.random()` in render and creates a new `AudioContext` per key press.
- **Changes:** Show `*XXX#` (code TBC). Add a consent screen (ODPC wording). Replace the cash draw with airtime rewards for poll participation (cost modelled). Separate "WhatsApp Channel (broadcast)" from "WhatsApp Business chat". Add a per-session cost meter ("this session cost the station KSh x").
- **Visual/motion:** The phone frame persists, and the screen transitions slide (150 ms) like a real USSD menu. A typing indicator appears in the WhatsApp view. Both are static under reduced motion.
- **Mockup:** keep the current two-phone layout; add a consent step and a cost meter strip below the phone.

#### 6.5c `CivicNoticeBuilder.tsx` · **Rebuild (legal risk)**
- **Problems:** The copied text is headed "**REPUBLIC OF KENYA · COUNTY GOVERNMENT OF … OFFICE OF THE COUNTY SECRETARY**" and stamped "**GAA APPROVED TIER 1**" and "Official Radio Broadcaster for Western Kenya". That imitates official documents and claims accreditation Nyota doesn't hold. The cited instruments "Kakamega County Public Participation Act", "Busia County Civic Engagement Framework" and "Trans Nzoia Citizen Engagement Policy" are unverified. (County Governments Act 2012 s.115 on public participation in planning does exist.) The GAA rate of KSh 2,400/45 s is invented. Vihiga is missing. Note that the **GAA authorises national-government advertising** (ministries, state corporations, universities); counties procure separately, and GAA's legality has been challenged in court.
- **Changes:** Reframe as "**Sample media plan for a county public-participation campaign**", produced on Nyota letterhead and addressed *to* the county. Use verified statutes only. Sub-county and ward counts are correct (Bungoma 9/45, Kakamega 12/60, Busia 7/35, Trans Nzoia 5/25); add Vihiga.

#### 6.5d `PoliticalRateCardEngine.tsx` · **Rebuild (legal accuracy)**
- **Problems:** It cites invented law: "CA Section 46 Mandate", a "statutory defamation escrow bond", "CA strict rule: no credit", and an "Equitable Access Registry: CA Verified", and it shows "CA COMPLIANCE CLEARED".
- **Changes:** Anchor it to real instruments, *to be confirmed by counsel*: the Election Campaign Financing Act 2013 (limits gazetted 7 Aug 2026 but **stayed by the High Court**); the NCIC Act 2008 s.13 (hate speech); the Media Council Act 2013 Code of Conduct; the CA programming code on fair coverage; and IEBC timelines (primaries by **8 May 2027**, campaign **29 May–7 Aug 2027**, election **10 Aug 2027**). Present "cash in advance" and "equal rate card for all candidates" as **station policy**, not law.
- **Visual/motion:** An election calendar timeline with the station's inventory windows (pre-primary, primary, campaign, silence period) and price multipliers per window.
- **Mockup:**
```
2027  Jan ── Feb ── Mar ── Apr ── May|8 primaries ── May 29 ▶ campaign ▶ Aug 7 ■ Aug 10 vote
rate ×     1.0           1.2              1.5                 2.0         (station policy)
```

#### 6.5e `DiasporaHub.tsx` · **Rebuild**
- **Problems:** "CBK Western remittances $420M+" is unsupported; the CBK doesn't publish a regional split. The pre-filled real-looking name "Dr. Chris Wanyonyi". The submit button does nothing, but says "Dispatched to Studio". Time zones are wrong (Doha is UTC+3, the same as EAT, not +1; London and US offsets change with daylight saving). The latencies are invented. Read-outs are said to happen on "Mwangaza wa Usiku 19–22h", but the strategy says a Sunday afternoon block. The audience mix is also off: the **UK sends only 2.4 % of cash remittances and the US 43.5 %** (KNBS/CBK Remittances Household Survey 2025). Lead with the US, Gulf and Germany.
- **Changes:** Send shout-outs via a real form endpoint or WhatsApp deep link. Compute live local time with `Intl`. Use national remittance figures (US$5.04 B in 2025) with a clear note that there's no regional split.
- **Visual/motion:** A world-clock strip showing "your time vs Bungoma time" and the next show start.

#### 6.5f `LoyaltyClubEngine.tsx` · **Keep (fix)**
- **Problems:** The header says "Strategy 5.8" (loyalty is 5.18). "Safaricom B2C" and "D.Light Solar Western" are named as sponsors. It shows a fake "Dispatched to registered Safaricom mobile line". Reward liability isn't modelled (100 pts = KSh 50; earning 10 pts per day equals KSh 5 per listener per day). There is no consent step.
- **Changes:** Add an economics panel: cost per active member per month × members = monthly liability (feeds the model). Use generic reward names.
- **Visual/motion:** A points bar with milestone ticks. Earning animates a +10 pt "chip" into the bar (Motion `layoutId`); the change is instant under reduced motion.

#### 6.5g `EditorialPolicyHandbook.tsx` · **Keep (best credibility asset)**
- **Problems:** "CA Programming Code Section 34", "Elections Act Section 108 & CA Section 46", and the sanction "CA statutory fine + mandatory equal free airtime" need legal verification and correction. The 7-second delay is good practice, not statute.
- **Changes:** Add: right of reply, corrections policy, AI-generated content disclosure (Nation Media Group adopted an AI policy in 2026), caller data protection, sponsor-content labelling, and a downloadable PDF.
- **Visual/motion:** Accordion (fine as is). Add "last reviewed" dates and a version number.

### 6.6 Build tools (currently in Part 6)

#### 6.6a `InteractiveStudioPlan.tsx` · **Rebuild as a real floor plan**
- **Problems:** It isn't a floor plan; it's cards. Rooms 02–04 list ~KSh 1.03 M of gear (RODECaster 95K, 2×SM7B + Cloudlifter 120K, ZV-E10 98K, workstation 145K, LiveU/Teradek 320K, PA 185K, gazebos 65K) **that appears in no capex phase**. Room 03 is labelled "Phase 1", but its items are not in the 627K. Tier 1 badges sit on "Industry benchmark" vendors. "Zero foreign currency exposure" is false (the equipment is imported and priced against USD).
- **Changes:** Draw an **isometric or 2D SVG floor plan** of the actual Bungoma premises (measured), with clickable rooms. Gear lists come from `capex.ts`, so totals reconcile.
- **Visual/motion:** Rooms highlight on hover or focus. Camera icons show their field of view as translucent cones. A phase toggle fades rooms in by phase (300 ms).
- **Mockup:**
```
┌───────────────┬─────────┐
│ ROOM 01 On-air│ ROOM 02 │   ◤ PTZ-1 FOV   ◥ PTZ-2 FOV
│  🎙  🎙   ◤ ◥  │ Podcast │   Phase: [P1] P2 P3
├───────────────┼─────────┤
│ ROOM 03 Digital desk     │  Total for selection: KSh x (from capex.ts)
└─────────────────────────┘
```

#### 6.6b `VisualRadioStudioSimulator.tsx` · **Keep (strong concept, fix)**
- **Problems:** It hot-links **3 Unsplash stock photos** (external requests, not Nyota's studio, attribution and privacy issues). The console says "Model: HD8 Studio" with 3 cameras, while Phase 1 is an ATEM Television Studio HD with 2 PTZs. "1080p 60fps" is claimed. A "SAFARICOM M-PESA" sponsor bug appears. **`setInterval` every 180 ms re-renders forever**, even off-screen and under reduced motion. There are no keyboard shortcuts.
- **Changes:** Use your own studio photos or short looping clips (WebM/AV1, muted, ~150 KB, `preload="none"`). Match Phase 1: 2 cameras. Use a generic sponsor bug. Run animation only while visible. Add keyboard shortcuts 1/2/3 for preview and Space for cut. Benchmark against peers: **RMS's Ramogi FM runs automated visual radio with 3 PTZ cameras** switched from the audio console, and **Radio Maisha went audio-visual in 2024**. That is the competitive bar.
- **Visual/motion:** A program/preview "tally" (red/green borders). The cut uses a 1-frame flash and dissolve uses a 300 ms crossfade, mirroring real switcher behaviour.

#### 6.6c `PowerResilienceMatrix.tsx` · **Keep (make honest; very relevant)**
- **Problems:** The solar and load setters are never exposed, so the generator never runs. "Battery 12.0+ hrs" shows at night when solar exceeds load. "99.98 % uptime" and "KSh 38K/month savings" are unsourced. The equipment (~KSh 1.1 M+) is not in capex. The transmitter's load is lumped with the studio's (the transmitter usually sits at the mast site).
- **Changes:** Use real loads (a measured kW list), real outage evidence (the **7 Aug 2026 Musaga substation fire that blacked out five Western counties**, and the **29 Jul 2026 national blackout**), a day/night solar curve, and battery state of charge over 24 h. Add the system to capex.
- **Visual/motion:** A 24-hour timeline. Scrubbing shows grid status, solar output, battery % and generator status, as an animated area chart.

#### 6.6d `OBVanExplorer.tsx` · **Rebuild**
- **Problems:** "Phase 2 capex: KSh 320,000 conversion", but the listed gear plus a vehicle cost far more, and none of it is in the capex tables. Crowd sizes (Chwele 35,000+, Lubao 18,000, Busia 22,000) and market days need sources. Real sponsors are named. **Six different OB economics** appear across the site: per-day yield 160–380K here; naming rights 300–600K with a cost of 250–400K per activation (5.11); 150–350K (Lexicon); 180K (calculator); 350K (political); and a 45K cost (Tracker).
- **Changes:** Build one OB unit-economics card (revenue per activation, cost per activation, margin, activations per month), fed into the model. Get three vehicle and conversion quotes (Tier 0 until then).
- **Visual/motion:** A route map of a 4-stop monthly circuit (SVG) with animated travel dots, and a stop card with economics.

#### 6.6e `EquipmentLifecycleLog.tsx` · **Rebuild as a "Planned asset register"**
- **Problems:** It lists items as "Operational" with an "Audited Asset Value" of KSh 3,667,999, although the PTZ cameras and ATEM are still to be procured. Prices differ from elsewhere (ATEM 204,999 vs 154,999; mics 135K vs 120K; generator 650K vs 320K). It names "Chetambe Mast" as fact. The KRA wear-and-tear rates need checking against the current Income Tax Act Second Schedule.
- **Changes:** Use statuses Planned, Ordered and Installed, sourced from `capex.ts`. Add a depreciation schedule (straight-line and KRA reducing balance) for the P&L.

#### 6.6f `BrandIdentityViewer.tsx` · **Rebuild (contradicts the live site)**
- **Problems:** It documents a **different design system from the one the site uses**. Its fonts are Cormorant/Playfair + Plus Jakarta/Satoshi + JetBrains/IBM Plex, while the site uses Instrument Serif/DM Sans/DM Mono (and `OPEN_QUESTIONS` lists a third option, Fraunces/IBM Plex). Its palette has Moss #34D399 vs the site's #76A486, Ink-2 #141816 vs #111513, and Paper #F5F3EF vs #F7F8F4. Its badge reads "Official Brand Guidelines 2026", but the brand book is still to be compiled (Checklist B #36). **No logo is shown and there's no jingle audio.**
- **Changes:** Generate the viewer from the actual `@theme` tokens (a single source of truth). Show the real logo (light and dark), the type scale, the sonic logo, and mic-flag and van mock-ups as SVG.
- **Visual/motion:** Colour swatches with contrast ratios auto-computed (WCAG badge). Type specimens animate a variable-font weight axis (if a variable font is adopted).

### 6.7 Audit tool (Part 7)

#### 6.7a `InteractiveGapAuditWorkbench.tsx` · **Merge into Part 7**
- **Problems:** The copy says "40 essential deliverables", but there are 15 items. It **pre-seeds 5 as checked**, showing "33 % Readiness / Verified in Audit" when nothing has been verified. The category filter omits "Programming", so item 13 can't be filtered to. A card `div onClick` wraps a `<button>`. Costs differ from elsewhere (CA licence 120K vs 100K; generator + UPS 320K).
- **Changes:** One checklist dataset with three statuses (see §5.11). Start empty. Persist via a shareable URL hash (`#audit=…`) instead of a single browser's `localStorage`.

---
## 7. Site Shell & Navigation

| Component | Findings | Changes | Motion |
|---|---|---|---|
| **`Navbar.tsx`** (290) | The logo is an external Cloudinary PNG ("Untitled_design_2026…") with no width/height or srcset. "ON AIR NOW" shows permanently. The desktop nav omits Part 7 and the Asks (the mobile menu has them). The scroll-spy calls `getBoundingClientRect` on 7 sections every scroll event. It has its own offset (70) that duplicates `lib/scroll` (74). The `onOpenRadio` prop is unused. The mobile menu is `role="dialog"` with no focus trap or Esc handling | Use an SVG logo in `/public/brand`. Show "On air" only when the stream responds (HEAD check). Derive nav items from `sections.ts`. Use a shared `useActiveSection` (IntersectionObserver). Build the mobile menu with `<dialog>` + `showModal()` (native focus trap and Esc) | Scroll-progress bar via `animation-timeline: scroll(root)` inside `@supports`, with a JS fallback. The active-link underline slides with a View Transition |
| **`SearchModal.tsx`** (220) | The index is hand-written (25 entries), so searches for "Sulwe", "NLS" or "ODPC" fail. There is no `role="dialog"` or `aria-modal`. Results are mouse-only `div`s. The snippet "sensitivity −20 % to +35 %" is wrong (it is +25 %). Filter chips just type the category word into the box | Build the index at build time from the data layer and the headings (MiniSearch or a Fuse-style fuzzy search, lazy-loaded on first ⌘K). Use `<dialog>`, `role="listbox"` and `aria-activedescendant` | The dialog scales 0.98 → 1 and fades over 150 ms. Results stagger 20 ms (max 8) |
| **`ExecutiveBriefingMode.tsx`** (179) | It shows **5 resolutions**, vs 6 asks elsewhere (with different content). The amounts conflict ("KSh 80K/mo talent pool", "GAA unlocks KSh 4.5 M+", "capex recovery Month 4–7", "100 % sourced receipts"). It's dated "September 2026". `window.print()` prints the whole page. It has no dialog semantics | Generate it from the same `asks.ts` as §5.12. Add print CSS for a 2-page memo | A slide-over panel from the right (View Transition from the "Board" button) |
| **`PresentationModeToggle.tsx`** (315) | The 8-slide deck contains false or contradictory claims: slide 1's "2.4×" (v1; v2 says 2.0×); "every figure verified against audited reports"; slide 7's "ODPC registration **completed**", "CMO tariffs **formalized**", "100 % resolved", "zero uncosted assumptions"; slide 8 is titled "Six Asks" but lists **five**. The Space key check `e.key === 'Space'` never fires (the key value is `' '`). No focus trap | Generate slides from the same data. Speaker notes come from the data too. Add an **export to PDF/PPTX** (print CSS at 16:9 is enough), because boards still circulate decks | Slide transitions: crossfade + 8 px translate (250 ms); instant under reduced motion. A progress pip bar |
| **`LiveRadioPlayer.tsx`** (364) | **It plays a synthesised Am7 sine drone, not the station.** The bitrate and EQ buttons do nothing (including "Lossless 256k"). Now-playing uses the device's local hour, not EAT, and differs from the schedule ("Drive 18–22", "Kakamega Studio 1"). Each play stacks new gain/filter nodes. `Math.random` in render | `<audio preload="none" src=STREAM_URL>` with the real Zeno.FM stream, a 32 kbps "data saver" default, and Media Session API metadata (lock-screen controls). Now-playing comes from `programmes.ts` using `Africa/Nairobi` time. Handle errors with "Stream offline: try WhatsApp". Note that Streema lists the Nyota stream as "temporarily unavailable", so verify stream reliability first | Equaliser bars driven by a real `AnalyserNode`, only while playing and visible |
| **`MobileBottomDock.tsx`** (139) | The hand-coded section list (8 entries, no Asks). The sheet lacks dialog semantics and Esc handling | Derive from `sections.ts`. Use `<dialog>`. Add a **"Live"** tab (the player) and an **"Asks"** tab | The bottom sheet slides up 200 ms with spring easing; drag-to-dismiss (pointer events) |
| **`FloatingNavRail.tsx`** (119) | A third scroll listener; the 4th copy of the nav list; desktop-only (`xl:flex`) | Use the shared hook and list | A reading-progress ring around the active dot (scroll-driven) |
| **`WebsiteFooter.tsx`** (327) | **The inquiry form submits nowhere** but tells advertisers "our sales desk will share our 2026 media kit within 24 hours", so leads are lost. The `select` isn't bound. It claims "ODPC Registered", "complies fully with DPA 2019", "licences cleared with MCSK, PRISK, KAMP" (MCSK is unlicensed), "Western Kenya's leading voice", "1.8M+ weekly listeners", and "Bungoma & Kakamega Studios" (Kakamega is Phase 2). Several items are dead `<span>`s | Wire the form to a real endpoint (a form service, or a WhatsApp deep link to the sales number, or the Firefly contact address). Replace the compliance claims with "Planned compliance actions" and link to Part 7. Make the dead items real links or remove them | None needed beyond a hover underline |
| **Keyboard shortcuts** (`App.tsx`) | "/" and "b" fire on any key press outside inputs. "b" conflicts with screen-reader quick-nav keys (NVDA/JAWS use "b" for buttons in browse mode). There is no help overlay | Require a modifier (`Shift+B`), or only bind while focus is on `body` and no AT is detected. Add a "?" overlay listing the shortcuts | — |

---

## 8. Data Verification Register

Key: **C** = Confirmed · **O** = Outdated → update · **U** = Unverified → flag · **X** = Contradicted. "Tier" is what the site claims. All sources were accessed on 25 Nov 2026.

| ID | Claim | Where on site | Value on site | Latest verified value | Source (title, URL, date) | Status |
|---|---|---|---|---|---|---|
| D-01 | Five-county population 2019 | Annexure, Part 2.1.1, Search | 6,012,184 (Bungoma 1,670,570; Kakamega 1,867,579; Trans Nzoia 990,341; Busia 893,681; Vihiga 590,013) | Same | KNBS 2019 Census (Vol. I); county figure cross-checked e.g. Bungoma total 1,670,570 — https://en.wikipedia.org/wiki/Bungoma_County (citing KNBS) | **C** |
| D-02 | 2025/2026 projections | Part 2.1.1, County explorer | 6,632,427 / 6,762,168 (Bungoma exact, others rounded) | No KNBS county projection cited; method missing | — | **U** (state method; round) |
| D-03 | Radio reach, Western | Annexure, Part 1, Part 5, Deck | 81 % (Q2 FY25/26) | **83 %** (Apr–Jun 2026); national 75 %, Lake 81 %, Rift 80 %, Nairobi 63 % | CA *Audience Measurement & Industry Trends Report Q4 FY2025/26*, Table 3 (Aug 2026) — https://www.ca.go.ke/sites/default/files/2026-08/%20Audience%20Measurement%20and%20Industry%20Trends%20Report%20Quarter%204%202025-2026.pdf | **O** |
| D-04 | Daily radio listenership trend | Part 1-E, Part 3.5, Annexure ("top-three consolidation") | 75 %→57 %→41 % | Same, **but it is *daily* listenership**, not consolidation | MCK *State of the Media 2025* (released 4 May 2026) — https://www.the-star.co.ke/news/2026-05-04-survey-public-trust-in-kenyan-media-grows | **C** (relabel in Annexure) |
| D-05 | National radio listeners | Hero, Annexure, Part 2 | n=23.9 M; "~33 M weekly" | **24.4 M** | CA AMR Q4 FY25/26, Table 5 header | **O / X** |
| D-06 | Smartphone penetration | Hero, Annexure, Part 2, Part 5.7 | 92.9 % (Dec 2025) | Sep 2025: 85.2 % (smartphones 59.5 % of devices). Mar 2026: 78.7 M devices, smartphones **63.7 %**. "Penetration" = devices ÷ population | CA — https://www.ca.go.ke/node/908 ; Citizen Digital 2 Oct 2026 — https://citizen.digital/article/smartphone-usage-surges-in-kenya-as-connected-devices-reach-523-million-n391282 | **U** (Dec figure not seen; relabel the metric) |
| D-07 | Smartphone / feature-phone connections | Annexure, Part 2, Part 5.6 | 52.26 M / 27.42 M (Jun 2026) | Same | TechTrendsKE 19 Sep 2026 (CA Q4 FY25/26) — https://techtrendske.co.ke/2026/09/19/52-million-smartphones-kenya-mobile-data/ | **C** |
| D-08 | WhatsApp Business pricing | Annexure ($0.038/msg), Part 1-D & 2.4.3 ($0.0040 utility / $0.0225 marketing *per conversation*), Tracker | Mixed | **Per-message pricing since 1 Jul 2025.** "Rest of Africa": marketing **$0.0225**, utility **$0.004**. BSP-marked-up rates seen at $0.02588 / $0.0046 (Oct 2026). Utility templates inside the service window are billable again from 1 Oct 2026 | Meta developer docs — https://developers.facebook.com/docs/whatsapp/pricing ; Alibaba Cloud rate table — https://www.alibabacloud.com/help/en/chatapp/notice-on-the-change-of-whatsapp-billing-rules-and-the-latest-catalog-price ; Sleekflow — https://help.sleekflow.io/en_US/pricing ; Wati — https://support.wati.io/articles/introducing-message-based-pricing-0MqqSan4Cx | **O / X** |
| D-09 | Station digital baseline | Part 1-D, Part 2.2, Part 5.7/5.10 | ~5,740 FB followers; ~2,000 concurrent Zeno listeners | Not publicly verifiable. Streema shows the Nyota stream as "temporarily unavailable" | https://streema.com/radios/Nyota_FM | **U** (export from Meta Business Suite / Zeno dashboard) |
| D-10 | Ad market 2025 | Annexure, Part 1-A, Part 3, payback copy | Total 66.3 B (−22 %); radio 25.9 B (−5 %); TV 39.1 B; print 1.4 B; OOH 6.4 B; Safaricom 8 % | Same. **New:** H1 2026 total KES 29.53 B (−24 % vs H2 2025, +7 % vs H1 2025); **radio KES 11.90 B (−23 % vs H2 2025)**; H2 2026 forecast +11 % | ReelAnalytics via Khusoko — https://khusoko.com/2026/04/10/kenya-advertising-spend-2025-media-landscape-outlook/ ; H1 2026 — https://khusoko.com/?p=53702 | **C** (+ add 2026) |
| D-11 | Betting collapse | Part 1-A, Part 3.1, Deck | −89 % to KSh 51 M "radio" | The 51 M is **one quarter** (Jul–Sep 2025 vs 513 M in Apr–Jun 2025). **Betting & Gambling was the #3 ad sector in H1 2026 at KES 2.33 B market-wide** | AllAfrica/Capital FM 2 Feb 2026 — https://allafrica.com/stories/202602020526.html ; Khusoko H1 2026 | **X** (reframe) |
| D-12 | Radio spend by sector | Part 2.3.2, Part 3.1, Part 5 | Fin. 1.3 B (21 %), Transport 727 M (11 %), Telecom 302 M (10 %) | **Apr–Jun 2026 radio:** Banking & Finance KES 1,291 M; Servicing 623 M; **Agriculture & gardening equipment 494 M**; Entertainment 444 M; Media 354 M; Foods 332 M; total radio KES 5,073 M | CA AMR Q4 FY25/26, Tables 8 & 11 | **X** (inconsistent shares) → replace |
| D-13 | RMS share | Part 2.3 | 41 % of daily listeners; >37 % of radio ad spend | Not found in reviewed sources | CA Competition Study (no deep link) | **U** |
| D-14 | Competitor frequencies | Part 2.2.1 vs CompetitorDialMap | Mulembe 99.0/99.2/95.8/97.9 vs 99.7; Sulwe 89.6 vs 89.5; West FM 94.9 vs 104.1 | Mulembe 99.0 & 99.2 (Western), 95.8 Eldoret, 97.9 Nairobi; Sulwe 89.6; West FM 94.9 & 104.1; Ingo 100.5 & 103.5 | Citizen Digital — https://citizen.digital/citizen-sounds/853 ; https://citizen.digital/citizen-sounds/855 ; radio.co.ke — https://radio.co.ke/articles/western-kenya-on-air-a-guide-to-radio-in-the-lake-region-and-kakamega-belt/ ; Music In Africa (West FM) — https://www.musicinafrica.net/node/1216 | **C** (table) / **X** (dial) |
| D-15 | Western station shares | CompetitorDialMap, Part 2.2.2 | Mulembe 22.1 %, Citizen 19.5 %, Sulwe 18.4 %, West 14.2 %; "Citizen 7 % Western" | No public Western-only shares found. National Q1 2026 reach: Citizen 64.7 %, Jambo 59.6 %, Classic 58.4 %, Maisha 56.6 % | GeoPoll Q1 2026 — https://www.geopoll.com/blog/kenya-top-tv-radio-q1-2026/ | **U / X** |
| D-16 | Luhya sub-group shares | Part 2.1.4 | Bukusu 56 %, Maragoli 11 % | 2019 census: Luhya 6,823,842; "Luhya (so stated)" 3,944,257; **Bukusu 1,188,963** (≈17 %) | KNBS 2019 Vol. IV via StatsKenya — https://www.statskenya.co.ke/at-stats-kenya/about/tribe-and-ethnicity-in-kenya-number-of-people-by-tribe/93 | **X** |
| D-17 | Social media identities | Annexure | 15.1 M → 18.4 M (Jan→Oct 2025) | **23.9 M (Oct 2026), 40.6 %**; internet users 23.9 M; FB ad reach 19.0 M; YouTube 13.8 M; TikTok 23.9 M (18+); Instagram 5.1 M; WhatsApp used by 72.5 % of internet users 16+ | DataReportal *Digital 2027: Kenya* (5 Nov 2026) — https://datareportal.com/reports/digital-2027-kenya | **O** |
| D-18 | TikTok monetisation | Part 2.4.2, 3.2, Checklist A-17 | CRP not in Kenya; "200+ advertisers" | CRP still not available in Kenya (Oct 2026). **200+ Kenyan creators** earned >US$350K via brand collabs in year one of TikTok for Business | Business Radar 24 Oct 2026 — https://businessradar.co.ke/how-to-make-money-on-tiktok-in-kenya-everything-you-need-to-know/ ; Citizen Digital — https://citizen.digital/article/kenyan-tiktokers-face-earning-deductions-as-pltaform-requests-tax-information-n390354 | **C** / wording **X** |
| D-19 | YouTube RPM/CPM Kenya | Annexure, Part 2.4.1, 3.2, 5.8 | $0.6719 RPM; $1.1314 CPM | Single secondary aggregator (Dynamoi); not verified | — | **U** (use a range; replace with own AdSense data after the channel is monetised) |
| D-20 | USSD dedicated code (Africa's Talking) | Annexure, Part 2.4.4, 5.6, simulator | Safaricom 145K + 70K/mo; Airtel 116K + 46.4K; Telkom 58K + 116K | Safaricom **70,000/mo**; Airtel **116,000 + 46,400/mo**; Telkom **58,000 + 116,000/mo** (VAT incl.); dedicated code 3–4 weeks to provision | AT Help Center — https://help.africastalking.com/en/articles/1163556-how-much-is-a-dedicated-ussd-code | **C** |
| D-21 | Station spot revenue baseline | Payback simulator | KSh 1.2 M / month | No audited baseline exists (the site says so in Part 1-B) | — | **U** (Tier 0) |
| D-22 | Payback / ROI outputs | Payback sim, Capex waterfall, Deck, Briefing | 1 month / +4,621 % (sim), Month 5 / +332 % (waterfall), "Month 4–7" (briefing) | Recomputed in this audit from the site's own code | — | **X** |
| D-23 | Milestone dates | Parts 3, 5, 6, 7, Tracker, Deck | Q1–Q4 2026 | All in the past as of 25 Nov 2026 | — | **O** |
| D-24 | Music CMO status | Part 2.6.2, Footer, Deck | "MCSK provisional"; "licences cleared with MCSK, PRISK, KAMP" | **MCSK not licensed for 2025–26** and barred from collecting; **KAMP & PAVRISK licensed from 5 Nov 2025 (one year)**; **KAMP suspended 90 days from 1 Jul 2026** (upheld 24 Aug 2026); 2027 CMO applications invited 4 Sep 2026 | KECOBO statement — https://copyright.go.ke/sites/default/files/downloads/Statement%20on%20CMOs%20Licensing%202025.pdf ; Music In Africa — https://www.musicinafrica.net/node/383478 ; Digital Policy Alert — https://digitalpolicyalert.org/event/43355-kenya-copyright-board-upheld-suspension-of-kamp-copyright-and-related-rights-limited-and-ordered-governance-and-financial-remedial-measures | **O / X** |
| D-25 | Royalty tariff | CMORoyaltyCalculator | 75K/180K/350K; split 40/35/25 | **Consolidated Music Tariffs 2026–2028** (from 1 Jan 2026): national radio **4 % of net revenue, min KSh 500,000**; regional/community lower minimums; "regional" = within five counties; 5 % monthly compounded late penalty | Khusoko 14 Apr 2026 — https://khusoko.com/2026/04/14/kecobo-consolidated-music-royalty-tariffs-2026-2028/ ; Kenya Times — https://thekenyatimes.com/national/govt-gazettes-new-2026-tariffs-for-music-and-audio-visual-enterprises/ | **X** |
| D-26 | ODPC registration fees | Annexure, Part 2.6.3, Part 6.4 | 4K / 16K / 40K; renewals 2K / 9K / 25K | Same; certificates valid 24 months; ODPC 14-day renewal enforcement notice (28 Aug 2026) | ODPC FAQ — https://www.odpc.go.ke/faqs/ ; Capital FM 29 Aug 2026 — https://capitalfm.africa/odpc-gives-data-handlers-14-days-to-renew-expired-certificates/ | **C** |
| D-27 | CA commercial radio licence fee | Part 2.6.1, Checklist B-27, Workbench | KSh 5,000 application + 100,000/yr or 0.4 % turnover (120,000 in Workbench) | Not verified this audit | CA tariff schedule (no deep link) | **U** |
| D-28 | GAA "registration" fee, county prequal | Annexure, Part 5.14, 6.4, Briefing | KSh 100,000; county 50,000 | No public GAA registration fee found. **GAA is a directorate authorising *national-government* advertising**; counties procure separately; a 2024 KBC-only directive was quashed by the High Court and GAA's legality has been challenged | ICT Ministry — https://ict.go.ke/?p=4943 ; Nation — https://nation.africa/kenya/news/-non-existent-powers-court-quashes-ps-kisiang-ani-order-restricting-state-advertising-to-kbc--4972384 | **U** (reframe) |
| D-29 | Political ad "limit" | Annexure #7 | "KSh 2.51 B IEBC advertising/media limit 2027" | No such figure found. IEBC gazetted (7 Aug 2026) a presidential cap of KSh 6.11 B and parties KSh 24.45 B, **but the limits are stayed by the High Court** | Nation explainer — https://www.nation.africa/kenya/news/politics/explainer-how-kenya-campaign-financing-works-5616620 ; Nation — https://nation.africa/kenya/news/politics/iebc-mps-lock-horns-over-campaign-financing-rules-5665884 | **X** |
| D-30 | 2027 election calendar | Missing | — | Election **Tue 10 Aug 2027**; party primaries by **8 May 2027**; campaign **29 May–7 Aug 2027** | Business Today — https://businesstoday.co.ke/?p=155076 ; Citizen Digital — https://citizen.digital/article/iebc-gazettes-2027-election-period-unveils-key-timelines-for-aspirants-and-campaigns-n388705 | **Add** |
| D-31 | Operating costs in model | Payback sim | Opex 1.15 M/mo (unexplained) | New-hire benchmarks alone: **KSh 370–630K/mo** (site's own Part 6.3); plus USSD 70K/mo, shows, paid social, royalties | Site internal | **X** (incomplete) |
| D-32 | Capex totals | Part 6.2 | 4,969,099–9,595,099 | Arithmetic ✓, but excludes power (~1.1 M+), OB rig, podcast room (~313K), workstation (145K) shown elsewhere | Site internal | **X** (incomplete) |
| D-33 | Diaspora remittances | Part 5.17, DiasporaHub | ">$4 B"; "CBK Western $420M+" | **US$5.04 B in 2025** (+1.9 %); Jan–Oct 2026 US$4.19 B, likely the first annual fall in 17 years; RHS 2025: KSh 931.8 B incl. informal; **US 43.5 %**, UK 2.4 % of cash; no regional split | Khusoko — https://khusoko.com/?p=51209 ; Nation — https://nation.africa/kenya/business/annual-diaspora-remittances-to-drop-for-first-time-in-17-years-5674530 ; Business Daily — https://www.businessdailyafrica.com/bd/markets/currencies/uk-loses-grip-as-top-source-of-kenya-s-diaspora-inflows-5515144 | **O / X** |
| D-34 | Maize price (90 kg) | AgriCommodityIndex, Mobile sim, Studio sim ticker | KSh 3,400 | NCPB floor **4,000** (Jan 2026); **3,800–4,100** in producing areas (Aug 2026) | The Star 15 Jan 2026 — https://www.the-star.co.ke/counties/rift-valley/2026-01-15-cereals-board-raises-maize-price-to-sh4000 ; KNA 1 Aug 2026 — https://www.kenyanews.go.ke/dry-maize-stocks-steady-as-prices-fluctuate/ | **O** |
| D-35 | Development funders | Part 5.14 | "USAID, DFID" | DFID merged into FCDO (2020); **USAID closed in 2025** | SAIIA Policy Insights 173 (Apr 2026) — https://saiia.org.za/wp-content/uploads/2026/04/SAIIA_PI_173_ReportingUnsupported.pdf | **O** |
| D-36 | Touchpoint totals | TouchpointEcosystem, docx | YouTube 95,000; total 228,000; "50 touchpoints" | YouTube items sum to **97,000**; total **230,000**; site shows 45 items; Multi rows sum 66,500 vs 75,500 stated | Source `.docx` recomputed | **X** |
| D-37 | County density / land area | Annexure §03 | "4.3 / 433,207 km²" etc. | Garbled (Kakamega ≈ 3,050 km²) | KNBS county abstracts | **X** (delete) |
| D-38 | Google Ad Grants | Part 2.8, Checklist C-6 | Up to $10K/mo | Google for Nonprofits programme; Nyota (a Ltd company) is not eligible | Google Ad Grants eligibility (Google for Nonprofits) | **X** |
| D-39 | County GDP per capita | CountyEconomicExplorer | Bungoma 142K, Kakamega 156K, Busia 138K, Trans Nzoia 178K | GCP 2025 (2024 data): Kakamega ≈ US$2.45 B (#10), Bungoma ≈ US$2.37 B (#11); Bungoma growth 3.6 %; per-capita figures to take from KNBS table | Nation — https://nation.africa/kenya/counties/muranga/report-murang-a-is-kenya-s-fastest-growing-county-by-gdp-5513618 ; KNBS GCP page — https://www.knbs.or.ke/gross-county-product/ | **U** |
| D-40 | OOH 2025 | Annexure | 6.4 B | KSh 6.37 B (+15 %) | NewsTrends (ReelAnalytics) — https://newstrends.co.ke/kenyas-ad-spend-plunges-22-in-2025-reelanalytics-data-shows/?amp=1 | **C** |
| D-41 | Digital ad spend | Annexure | Q4 2025 6.08 B (−48 %); "Q2 2025/26 9.12 B" | Apr–Jun 2026: social platforms took KSh 9.1 B of a 14.3 B quarter (CA data) | Nation — https://nation.africa/kenya/business/banks-financiers-drive-sh14-3bn-advert-spend-rebound-5573760 | **U** (periods mislabelled) |
| D-42 | Equipment quotes | Part 2.5, 6.2, Annexure §11 | Vendor prices (no quote dates) | Not re-quoted | — | **U** (re-quote; add date and validity) |
| D-43 | Salary benchmarks | Part 6.3, Annexure §10 | Payscale ranges | Not verified | — | **U** |
| D-44 | Competitor spot rates | Part 2.3.1 | Citizen 35–55K prime, etc. | Not verified (radio.co.ke buyer's guide) | — | **U** |
| D-45 | Power reliability | PowerResilienceMatrix | "Frequent blackouts", no evidence | **7 Aug 2026 Musaga substation fire blacked out five Western counties**; 29 Jul 2026 national blackout | Citizen Digital — https://citizen.digital/article/fire-at-kakamega-substation-triggers-widespread-blackout-in-western-kenya-n387914 ; K24 — https://k24.digital/news/fire-at-musaga-substation-triggers-blackout-across-5-western-counties-kenya-power/amp | **Add** |

### 8.1 Data the site is missing (would strengthen the board case)

1. **Audited baseline revenue** (last 24 months, split by spot / sponsorship / OB / digital) from management accounts. Without it, Objective B and every payback figure are Tier 0.
2. **Western Kenya audience oversample** (GeoPoll/KARF) for Nyota's share, daypart reach and language preference. The site already budgets KSh 500K–1 M; make it **Ask #1b**.
3. **CA vernacular vs Swahili split for Western (16 % vernacular)** as a positioning chart. It is public and free.
4. **Real coverage contour** from the CA licence parameters.
5. **Station digital analytics**: Facebook, YouTube and TikTok followers and views (last 90 days), Zeno.FM stream sessions and listening hours. Export these, don't estimate them.
6. **Advertiser pipeline**: names of current and lapsed advertisers and their spend (anonymised for the website).
7. **Competitor visual-radio benchmark**: who in Western Kenya already streams video (RMS stations use automated visual radio, e.g. Ramogi FM).
8. **Cost of royalties** under the 2026–2028 tariff, at Nyota's actual net revenue.
9. **Opex budget by month** for 24 months.
10. **Sensitivity of revenue to the 2027 election calendar** (Q2–Q3 2027 window).

---

## 9. Trends That Apply (with implementation for Nyota FM)

| # | Trend | Evidence | What Nyota and the site should do |
|---|---|---|---|
| T1 | **Daily radio habit is shrinking, but weekly reach in Western remains very high** | MCK: daily listenership 75 % (2023) → 57 % (2024) → 41 % (2025), with 55 % preferring 6–10 am (KBC report on MCK 2025, https://www.kbc.co.ke/?p=136252). CA: radio reach 83 % in Western, Apr–Jun 2026 | Make the breakfast show the commercial spine. On the site, show "daily vs weekly" side by side (§5.6) to pre-empt the "radio is dying" objection |
| T2 | **Western listening is mostly Swahili** | CA Q4 FY25/26: vernacular is only 16 % of radio listening in Western vs 58 % in Lake | Position Nyota as a "Swahili-first, Bukusu-proud" station. Revisit the "#1 vernacular" targets (Objective C) and frame them as "#1 *local* voice in Bungoma" |
| T3 | **Visual radio is now standard** | Radio Maisha moved to audio-visual (Aug 2024, Standard); RMS's Ramogi FM runs automated visual radio with 3 PTZ cameras (Radio World); Radio Africa Group passed 10 M digital followers (The Star, Jun 2026) | Phase 1 studio is table stakes. On the site, replace stock photos with a **10-second loop of the real studio**. Use "auto-switching from the audio console" as the operating model, so no camera operator is needed |
| T4 | **Social media is now the top news source; WhatsApp is ubiquitous** | MCK 2025: social media 39 %, TV 31 %, radio 21 % as news source. DataReportal Oct 2026: 72.5 % of internet users 16+ use WhatsApp monthly; TikTok ad reach 23.9 M adults | WhatsApp Channel (broadcast) plus a Business API (two-way) plus TikTok clips. On the site, add a **"Follow on WhatsApp" CTA** and show live channel follower counts |
| T5 | **Banking leads radio advertising; agriculture is big on radio** | CA Apr–Jun 2026: Banking & Finance KES 1,291 M; Agriculture & gardening equipment KES 494 M on radio | Lead sales decks with banks/SACCOs and agri-inputs. On the site, add a **"Who buys radio" bar chart** with these categories |
| T6 | **Betting is back in ad spend, under tighter rules** | ReelAnalytics H1 2026: Betting & Gambling KES 2.33 B (#3 sector); 2025 BCLB/KFCB rules (AllAfrica) | Keep "no betting dependency" as a **board choice** with its revenue cost shown (a scenario toggle) |
| T7 | **Ad market contracting in 2025–26, partial H2 recovery** | 2025 −22 %; H1 2026 KES 29.53 B; H2 2026 forecast +11 % (ReelAnalytics) | The model's base case should assume flat or negative spot. Growth should come from new formats |
| T8 | **2027 election cycle** | Election 10 Aug 2027; campaign 29 May–7 Aug 2027; spending limits stayed by the court | An election window module (§6.5d). Compliance first; cash in advance as station policy |
| T9 | **WhatsApp per-message pricing** | Since 1 Jul 2025; Rest of Africa marketing $0.0225 | Model messaging cost per contact per month. Prefer utility and service messages, and use Channels for broadcast |
| T10 | **Podcasts are urban and English, and video-first** | Nairobi >93 % of streams (Spotify via KBC); video podcasts dominate engagement (African Business, 2025) | A YouTube-first video podcast aimed at Nairobi and diaspora Luhya. Don't overstate podcast revenue |
| T11 | **Diaspora money is softening** | 2025 US$5.04 B; 2026 on course for the first annual decline in 17 years | Make diaspora Year 2, lean, US/Gulf-focused |
| T12 | **CMO turbulence** | MCSK unlicensed; KAMP suspension; new 2026–28 tariffs | Budget royalties at the new tariff; pay only licensed CMOs; keep receipts. Show this as a **compliance card** |
| T13 | **Grid instability in Western** | Musaga substation fire, 7 Aug 2026 | Put the power plan into capex. "On air during the 7 Aug blackout" becomes a marketing story if the system works |
| T14 | **Donor media funding contraction** | USAID closed in 2025; SAIIA (Apr 2026) and Carnegie (Apr 2026) document the impact | Treat grants as upside only; never in the base case |
| T15 | **Web: scroll-driven CSS animations are now Baseline** | Firefox 159 enabled them by default (Oct 2026), making them Baseline Newly available (web.dev, https://web.dev/blog/web-platform-10-2026) | Replace JS IntersectionObserver reveals with `animation-timeline: view()` inside `@supports`. Less JS, smoother on low-end phones |
| T16 | **Web: same-document View Transitions are Baseline** | Firefox 144 (Oct 2025) (web.dev) | Use them for tab/detail morphs (rate card, county panel, strategy drawer) instead of a JS animation library |
| T17 | **Web: data-saver browsers matter in Kenya** | Opera has ~26–29 % of mobile browser share (StatCounter, Jun–Jul 2026) | Prerender HTML; JS budget ≤ 100 KB gz for the first view; images ≤ 60 KB; no autoplay video |
| T18 | **Web: editorial data-journalism layouts** | Common practice in newsroom explainers: annotated charts, scrollytelling, "sticky graphic + scrolling text" | Use a sticky chart with scroll-stepped annotations for 01 The Situation and 06 The Money (§10.3) |
| T19 | **AI policy disclosure in newsrooms** | NMG adopted an AI policy framework in 2026 (Reuters Institute DNR 2026, https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/kenya) | Add an AI-use clause to the Editorial Handbook (§6.5g) |

---
## 10. Site-wide Visual & Motion System

### 10.1 Motion tokens (add to `src/index.css` `@theme`)

```css
@theme {
  --dur-instant: 80ms;   /* hover, press feedback            */
  --dur-quick:  160ms;   /* chips, toggles, tooltips          */
  --dur-base:   240ms;   /* panels, drawers, tab content      */
  --dur-slow:   480ms;   /* chart draws, section reveals      */
  --dur-story:  800ms;   /* hero map draw (once)              */
  --ease-out:   cubic-bezier(.16, 1, .3, 1);   /* default enter */
  --ease-in:    cubic-bezier(.7, 0, .84, 0);   /* exit           */
  --ease-std:   cubic-bezier(.2, 0, 0, 1);     /* state change   */
  --stagger:    40ms;    /* cap at 8 items → max 320 ms      */
}
@media (prefers-reduced-motion: reduce) {
  :root { --dur-quick: 0ms; --dur-base: 0ms; --dur-slow: 0ms; --dur-story: 0ms; --stagger: 0ms; }
  *, *::before, *::after { animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
}
```

**Rules**
1. **Motion explains change.** Animate a number or chart only when its *value* changes or when it first enters view. Never loop decoratively, except the "On air" dot, which stops after 3 pulses.
2. **One reveal style site-wide:** opacity 0 → 1 plus translateY(12px → 0) over `--dur-slow`. Use the CSS scroll-driven version first; delete `src/components/Reveal.tsx` and keep one `ledger/Reveal`:
```css
@supports (animation-timeline: view()) {
  .reveal { animation: reveal var(--dur-slow) var(--ease-out) both;
            animation-timeline: view(); animation-range: entry 0% cover 25%; }
}
@keyframes reveal { from { opacity:0; transform: translateY(12px) } to { opacity:1; transform:none } }
```
   Browsers without support show content immediately; no JS is needed. (Scroll-driven animations became Baseline Newly available in Oct 2026.)
3. **Detail morphs** (rate card → detail, county → panel, strategy bar → drawer) use **same-document View Transitions** (`document.startViewTransition`) with `view-transition-name`, and fall back to an instant swap.
4. **Charts draw once.** Bars grow with `transform: scaleX/scaleY` (GPU-friendly), lines draw with `stroke-dashoffset`. Max 600 ms.
5. **Numbers never tick from zero.** Show the final value in the HTML. Animate only the *delta* when a user changes an input (≤ 240 ms).
6. **Low-end device fallback:** if `navigator.hardwareConcurrency <= 4` or `navigator.connection?.saveData`, set `data-lite="true"` on `<html>`. This disables video loops, waveforms and the map contour animation. The VisualPlaybook "Lite mode" toggle becomes this global switch (shown in the footer and the dock).
7. **Audio is opt-in only.** No sound on card clicks. A single "Sound on/off" preference is stored in `localStorage` and defaults to off.

### 10.2 Chart standards

| Data type | Chart | Notes |
|---|---|---|
| Change over time (revenue index, listenership) | Line / area with scenario band | Label the line ends directly (no legend). Annotate key events (election, studio launch) |
| Composition (revenue mix, capex by phase) | Stacked bar or waterfall | Never pie charts with >4 slices |
| Ranking (levers, sectors, stations) | Horizontal bar, sorted | Value labels inside bars |
| Two measures, many regions (daily vs reach) | Dot plot | Highlight Western |
| Two variables plus size (levers) | Bubble matrix | Show axis meaning in words |
| Plan (strategies) | Gantt with dependencies | Month 0 = approval |
| Sensitivity | Tornado | Base value line in the middle |
| Geography | SVG choropleth + contour | Static, ≤ 30 KB |

**Palette for charts** (derived from the brand). Sequential: `#2A2418 → #D6A75C` (brass ramp). Categorical: brass `#D6A75C`, moss `#76A486`, sage `#B4C2B9`, brick-text `#C47F66`, paper-60 `#9A9C98`. **Retire Tailwind defaults** (`emerald-400` ×106, `amber-300` ×55, `rose-300/400` ×47 uses). Always pair colour with a label, pattern or icon.

**Tooling (gzip weights are approximate; verify on bundlephobia before adopting)**

| Need | Recommended | Approx. weight | Lighter alternative |
|---|---|---|---|
| Layout/FLIP animation, gestures | `motion` (motion/react) with `LazyMotion` + `m` | ~5 KB initial, +15–30 KB features (lazy) | CSS + View Transitions (0 KB) |
| Charts | Hand-rolled SVG + `d3-scale` / `d3-shape` | ~10–15 KB | Pure SVG for bars (0 KB) |
| Maps | Pre-projected SVG paths (build-time from TopoJSON) | ~15–30 KB data | — (avoid MapLibre/Leaflet: 40–200 KB + tiles) |
| Search | MiniSearch (lazy on ⌘K) | ~7 KB | Simple `includes` on a generated index |
| Icons | lucide-react (already in use) via per-icon imports | Already 44 KB rendered | Inline SVG sprite for the 20 most-used icons |
| Lottie / Rive | **Avoid** | Lottie ~60 KB+, Rive runtime larger | CSS/SVG animations |

**Budget:** first-view JS ≤ 100 KB gz; each lazy chapter ≤ 40 KB gz; total images ≤ 300 KB on mobile first load.

### 10.3 Scrollytelling pattern (for 01 The Situation and 06 The Money)

```
┌─────────────── sticky chart (left 60%) ───────────────┐┌ steps (right) ┐
│   Western reach 83 %  ●                               ││ ① Radio still │
│   Daily listenership 41 % ●                           ││   reaches…    │
│                                                       ││ ② …but fewer  │
│   (annotations change per step via data-step)        ││   listen daily│
└───────────────────────────────────────────────────────┘└───────────────┘
Mobile: chart sticky at top (40vh), steps scroll beneath.
```
Implementation: one `IntersectionObserver` sets `data-step` on the chart wrapper, and CSS transitions handle the annotations. Reduced motion means no transitions, just the final annotated chart.

### 10.4 Iconography and imagery
- Stay on Lucide, but **remove deprecated brand glyphs** (`Facebook`, `Instagram`). Use the platform's official SVG marks per their brand guidelines, in monochrome.
- **Photography direction:** documentary, natural light, real Bungoma and Kimilili markets, real presenters, with consent forms. Warm grade toward brass, deep shadows toward ink. No stock images. Use AVIF + WebP with `srcset` (480/768/1200 px).

### 10.5 Theming
- Keep the dark theme (ink) as the default. Add a **light "print/paper" theme** via `prefers-color-scheme` *and* print CSS. Boards print, and projectors wash out dark backgrounds.
- Merge the legacy `:root` palette (`--color-broadcast-night`, `--color-signal-amber`, `--color-maize-cream`, `--color-static-grey`, `--color-mulembe-green`, `--color-accent`) into `@theme`, or delete it. **Brick fails AA for small text** (3.99:1 on ink); add `--color-brick-text: #C47F66` (6.18:1 on ink, 5.76:1 on ink-2).

### 10.6 Typography recommendation (answers `OPEN_QUESTIONS.md` item 4)
**Keep Instrument Serif (display) + DM Sans (body). Drop DM Mono** except for one use: tabular figures in tables, where `font-variant-numeric: tabular-nums` on DM Sans is enough. This removes one font family, about 20–40 KB of fonts, and stops the overuse of 9–10 px monospace labels (274 × `text-[10px]`, 22 × `text-[9px]`, 2 × `text-[8px]`). Set a **12 px minimum** for any text and 14 px for body on mobile. Change `html { font-size: 15px }` on mobile to 16 px. Update `BrandIdentityViewer` to document *this* system. Fraunces/IBM Plex would be a third reskin for no measurable gain.

---

## 11. Accessibility, SEO & Print

### 11.1 Accessibility (WCAG 2.2 AA)

| Issue | Where | Fix |
|---|---|---|
| Clickable `div`s (no keyboard) | Part 1 objectives, Part 5 strategies, InteractiveSchedule cards, Workbench cards, Search results | Use `<button>` or a `<details>/<summary>` accordion |
| Dialogs without focus trap / Esc / `aria-modal` | Search, Briefing, mobile menu, dock sheet, Footer modals, Share dialog, Deck | Native `<dialog>` + `showModal()` |
| Tabs without ARIA | Hero tiers, Part 2 tabs, Part 6 phases, Part 7 checklists, Touchpoint channels | `role="tablist"`, `aria-selected`, arrow-key roving tabindex |
| Toggle buttons without state | Quarter selector, difficulty filter, endorse buttons | `aria-pressed` |
| Contrast | Brick text 3.99:1; `text-[9–10px]` with `/70` opacity | Brick-text token; 12 px minimum; avoid opacity below 80 % for text |
| Motion | Marquee, wave bars, `animate-ping/pulse` (23 uses), the VU interval, Lexicon flip are not reduced-motion safe | §10.1 global rule |
| Unexpected sound | Siren on card click; stingers | Opt-in sound only (WCAG 1.4.2) |
| Live values | `AnimatedCounter` starts at 0 | Render the final value; `aria-live="polite"` only on user-driven recalculation |
| Tables | No `<caption>` or `scope`; 5–7 columns on 360 px screens | Caption, `scope="col"`, sticky first column, or card layout below 640 px |
| Duplicate IDs | `part-asks` ×2 | Remove one |
| Shortcuts | "/" and "b" single-key | Add a modifier or a help overlay (WCAG 2.1.4) |
| Target size | Many 9–10 px chips | Minimum 24×24 px (WCAG 2.2 SC 2.5.8); 44 px on mobile is already set for buttons |

### 11.2 SEO and sharing (`index.html`)

Current: a title, a description, `og:title`, `og:description`, `og:type`. Missing: `og:image`, `og:url`, `twitter:card`, canonical, `lang="en-KE"`, structured data, robots policy, and any content without JS.

```html
<html lang="en-KE">
<link rel="canonical" href="https://<final-domain>/">
<meta property="og:image" content="https://<final-domain>/og/cover-1200x630.jpg">
<meta property="og:image:alt" content="Nyota FM 107.3 — Twang'aa Transformation, board proposal">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="noindex, nofollow">   <!-- while confidential -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"RadioStation","name":"Nyota FM 107.3",
 "broadcastFrequency":"107.3 FM","areaServed":["Bungoma","Kakamega","Trans Nzoia","Busia","Vihiga"],
 "address":{"@type":"PostalAddress","addressLocality":"Bungoma","addressCountry":"KE"}}
</script>
```

**Confidentiality:** the site says "Strictly Confidential" but is publicly reachable. Choose one: (a) **password-protect** the deployment (e.g. hosting-level protection) and keep `noindex`; or (b) remove the confidential labels and publish a cleaned public version. WhatsApp link previews (how most Kenyan boards share links) need the `og:image` either way.

### 11.3 Print / PDF
Add `src/print.css`: light theme; hide the nav, dock, player and tools; expand all accordions (`details[open]`); show the URL after links; break before each chapter (`break-before: page`); use a 2-column decision summary on page 1; and a footer with the page number and data-version hash. **Provide "Download board pack (PDF)"** generated at build time (Playwright `page.pdf()` in CI), so board members get a stable, signed copy.

---

## 12. Code & Architecture

### 12.1 Single data layer (the most important refactor)

```
src/data/
  sources.ts      // id, publisher, title, url (deep), published, accessed
  facts.ts        // id, label, value, unit, period, geo, tier, sourceId, method?, usedIn[]
  rateCard.ts     // spot dayparts, sponsorships, touchpoints (50), validity date
  capex.ts        // item, phase, vendor, quoteDate, unitPrice, qty, tier, inModel
  opex.ts         // role/salary, services, royalties, messaging — monthly by phase
  levers.ts       // revenue levers with yield range, P(success), time, difficulty
  strategies.ts   // 21 strategies (single list), owner, start/end month, deps, KPIs
  asks.ts         // the board asks (single list)
  programmes.ts   // schedule, hosts (TBC), sponsorship
  kpis.ts         // targets by month (tier 2)
```
- `TierBadge({factId})` reads from `facts.ts`/`sources.ts`.
- **Build-time integrity test** (`scripts/check-data.mjs`): fail the build if (1) a Tier 1 fact lacks a deep URL or date; (2) two facts share a `key` with different values; (3) any component contains a hard-coded `KSh`/`%` literal outside `src/data` (simple regex lint); (4) any date is earlier than Month 0. Add it to `pnpm check`.
- Generate the self-check panel (§5.12) from this test's output, not from hard-coded "PASS" values.

### 12.2 Duplication and dead code
| Item | Action |
|---|---|
| `src/components/Reveal.tsx` vs `ledger/Reveal.tsx` | Keep one (the CSS scroll-driven version) |
| `LedgerStamp` imported but never rendered (`ChapterSection`); `Reveal` imported but unused (`TouchpointFilter`) | Remove the imports; delete the files if unused |
| Four section lists (Navbar, Dock, Rail, `sections.ts`) | Derive from `sections.ts` (add `overview` and `asks`) |
| Two scroll helpers (`lib/scroll.ts` 74 px vs Navbar 70 px vs Search 74 px) | One helper using CSS `scroll-margin-top` + `scrollIntoView` |
| AdCampaignCalculator ≈ AdvertiserQuoteBuilder | Merge |
| StrategyTracker list vs Part5 list | One `strategies.ts` |
| TouchpointFilter vs TouchpointEcosystem | Delete TouchpointFilter |
| Payback simulator vs Capex waterfall vs Part 3 index | One model module `src/model/finance.ts` with unit tests (Vitest) |
| `tableSearch` unused state (Part 2); unused `onOpenRadio` prop | Remove |
| `update_glass.sh`, `update_hero.sh` | Delete (they target CSS that no longer exists) |
| `.env.example` (`GEMINI_API_KEY`, `APP_URL`), `metadata.json` (`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`), `assets/.aistudio/` | Remove AI Studio scaffolding; it implies a server-side AI dependency that doesn't exist |
| `vite.config.ts` comment mojibake ("modifyâfile") and `@` alias to repo root | Fix the encoding; point `@` at `src/` |
| Legacy colour vars in `:root` | Remove (§10.5) |

### 12.3 Component size and state
- `Part2MasterData.tsx` (1,059 lines) and `Part5Strategies.tsx` (833) mix data and layout. After moving data out, split by tab and chapter (`market/`, `competitors/` …), targeting under 250 lines per component.
- Replace per-component `AudioContext` with `src/lib/audio.ts` (a singleton, resumed on first user gesture).
- Use `useSyncExternalStore` for a shared `prefersReducedMotion` and `lite` state.
- **Tests:** add Vitest unit tests for `finance.ts`, a data-integrity test, and Playwright smoke tests (page loads, the player plays the real stream, print layout, axe-core accessibility scan).
- **CI:** a GitHub Action running `pnpm check`, Vitest, Playwright and Lighthouse CI with budgets (LCP < 2.5 s on Moto G Power emulation, JS ≤ 100 KB gz first view).

### 12.4 Code-splitting sketch
```tsx
// App.tsx
const Part2 = lazy(() => import('./chapters/Part2Situation'));
const Lab   = lazy(() => import('./appendix/InteractiveLab'));
<Section id="part-2"><Deferred><Suspense fallback={<SectionSkeleton/>}><Part2/></Suspense></Deferred></Section>
// Deferred = renders children only when within 1 viewport (IntersectionObserver rootMargin: '100% 0px')
```

---

## 13. Prioritised Roadmap

**Month 0 = date the board receives the proposal.** Effort: S ≤ 1 day, M ≤ 1 week, L > 1 week.

### P0: before the board presentation
| # | Task | Files | Effort | Depends on |
|---|---|---|---|---|
| P0-1 | Remove fabricated items: KRA PIN; "official" county notices; GAA "approved"; real-brand endorsements and sponsors; vox pops labelled "real"; "ODPC Registered", "MCSK cleared", "Board Approved" | QuoteBuilder, CivicNotice, PresenterRoster, Agri, Podcast, VoxPop, Footer, Part1, Deck | S | — |
| P0-2 | Replace the synth drone with the real stream | LiveRadioPlayer | S | Stream URL |
| P0-3 | Disable or relabel the payback simulator output until rebuilt ("Model under revision"), and remove "1 month / +4,621 %" | InteractivePaybackSimulator, CapexWaterfall, Deck, Briefing | S | — |
| P0-4 | Rebase all dates to Month 0 (Q1 2027–Q4 2028); add the election calendar | Parts 3/5/6/7, Tracker, Deck, Workbench | S–M | Decide Month 0 |
| P0-5 | Fix the factual errors in §8 rows marked **O/X** (WhatsApp, betting, CMOs, USAID/DFID, maize, reach, Bukusu %, density rows, touchpoint totals, Google Ad Grants, political limit) | Annexure, Part 1/2/5/7, tools | M | — |
| P0-6 | One asks list (5 vs 6) across Asks, Briefing and Deck | SourceListAndAsks, ExecutiveBriefingMode, PresentationModeToggle | S | §14 decision |
| P0-7 | Replace the hard-coded self-check "PASS" with honest status | SourceListAndAsks | S | — |
| P0-8 | Fix the duplicate `id`, the broken Tailwind colours (TouchpointFilter → delete), and add `og:image` + `noindex` | App, TouchpointFilter, index.html | S | — |
| P0-9 | Wire the inquiry form to a real channel | WebsiteFooter | S | Contact decision |

### P1: next 30 days
| # | Task | Effort | Depends on |
|---|---|---|---|
| P1-1 | Data layer + integrity check + `TierBadge({factId})` | M | P0-5 |
| P1-2 | Incremental finance model (`finance.ts`) + new Money chapter (cash curve, tornado) | M | Baseline accounts (Tier 0) |
| P1-3 | Re-order the IA (§5.0); move tools to the Interactive Lab | M | P1-1 |
| P1-4 | Code-split, prerender, self-host fonts, image pipeline, print CSS, PDF board pack | M | — |
| P1-5 | Motion system tokens; delete always-on animations; reduced-motion everywhere | S–M | — |
| P1-6 | Accessibility pass (dialogs, tabs, accordions, contrast, target sizes) + axe CI | M | — |
| P1-7 | County choropleth + real coverage contour; FM dial to scale | M | Licence parameters |
| P1-8 | Merge the calculators into Media Plan & Quote; one rate card | S–M | P1-1 |

### P2: later (Months 2–6)
| # | Task | Effort | Depends on |
|---|---|---|---|
| P2-1 | Real studio photos and video loops; consented vox pops; real presenter roster | M | Shoot day |
| P2-2 | Live data feeds at build time (KAMIS prices, social follower counts, stream status) | M | API access |
| P2-3 | Brand system page generated from tokens; logo, sonic logo, mic flag | S | Brand book |
| P2-4 | Decide: keep as a board microsite (Vite) vs evolve into the public station website (Astro islands) | — | Board decision |
| P2-5 | PWA offline shell; WhatsApp share cards per chapter (dynamic OG images) | S–M | P1-4 |

---

## 14. Proposed answers to `OPEN_QUESTIONS.md`

| Open question | Recommendation | Evidence / reasoning |
|---|---|---|
| **Canonical revenue multiplier** | **2.0× base (by Month 24), 1.4× worst, 2.8× best**, expressed against an *audited* baseline, which must be supplied. Delete 2.4× everywhere except the "v1 said" column | 2.0× is the v2 base used in Parts 1 and 3. 2.4× survives only in the Deck slide 1 |
| **Capex range** | Phase 1: **KSh 0.63–0.84 M** (as is). All phases: **recompute** after adding power, the OB rig, the podcast room and the workstation; likely **≥ KSh 6.1–10.7 M** (§5.10) | Part 6 arithmetic is correct but incomplete |
| **Payback window** | Show "**to be confirmed after baseline audit**". Present the method and an *illustrative* range only once the incremental model is built. Do **not** show "1 month", "Month 4–7" or "Month 5" | §6.3a recomputation |
| **Board ask count** | **Six asks**: (1) approve the thesis and roadmap from Month 0; (2) Phase 1 capex ≤ KSh 0.84 M; (3) WhatsApp BSP + USSD + ODPC registration; (4) the four pre-recorded formats; (5) the government/county commercial desk (filings and frameworks); (6) the Joint Steering Committee **plus a baseline audit and audience survey budget (KSh 0.5–1 M)**. Drop "adopt the payback model" as an ask | Asks are decisions; a model isn't one. The survey and baseline remove the biggest Tier 0 gaps |
| **Illustrative vs verified people, quotes, KPIs** | Treat **all presenters, endorsers, listener quotes, follower counts, sponsors and the VisualPlaybook KPIs as illustrative** until evidence exists. Label them, or remove them from the board version | No public evidence found; OPEN_QUESTIONS already doubts them |
| **Current milestone quarter / 2026 references** | Use **Month 0 = board approval** (proposed Q1 2027) and relative months throughout. Keep 2026 only as historical context ("May 2026 v1.0; Sept 2026 v2.0") | All 2026 milestones are past |
| **Typography** | **Instrument Serif + DM Sans; drop DM Mono** (§10.6) | Fewer fonts, better small-text legibility, no visual reset |

---

## 15. Sources

All accessed 25 Nov 2026.

**Regulators and official bodies**
- Communications Authority of Kenya: *Audience Measurement & Industry Trends Report Q4 FY2025/26* (Aug 2026): https://www.ca.go.ke/sites/default/files/2026-08/%20Audience%20Measurement%20and%20Industry%20Trends%20Report%20Quarter%204%202025-2026.pdf
- CA: Mobile broadband / smartphone penetration Q1 FY25/26: https://www.ca.go.ke/node/908
- CA: *Sector Statistics Report Q3 FY2025/26*: https://www.ca.go.ke/sites/default/files/2026-06/Sector%20Statistics%20Report%20Quarter%203%20%20FY%202025-2026.pdf
- KECOBO: Statement on CMO licensing 2025: https://copyright.go.ke/sites/default/files/downloads/Statement%20on%20CMOs%20Licensing%202025.pdf
- KECOBO 2027 CMO licensing notice (4 Sep 2026): https://www.gaa.go.ke/sites/default/files/2026-09/Kenya%20Copyright%20Board%20Public%20Notice%20on%20%20the%20Invitation%20For%20Applications%20For%20Licensing%20Of%20Collective%20Management%20Organizations%20%28CMOs%29%20For%202027.pdf
- ODPC: FAQs and fees: https://www.odpc.go.ke/faqs/
- ICT Ministry: Directorate of Government Advertising Agency: https://ict.go.ke/?p=4943
- Africa's Talking: Dedicated USSD code pricing: https://help.africastalking.com/en/articles/1163556-how-much-is-a-dedicated-ussd-code
- Meta: WhatsApp Business Platform pricing: https://developers.facebook.com/docs/whatsapp/pricing
- KNBS: Gross County Product: https://www.knbs.or.ke/gross-county-product/

**Research and data publishers**
- Media Council of Kenya *State of the Media 2025* coverage: The Star (4 May 2026) https://www.the-star.co.ke/news/2026-05-04-survey-public-trust-in-kenyan-media-grows ; KBC https://www.kbc.co.ke/?p=136252 ; Citizen Digital https://www.citizen.digital/article/social-media-emerges-top-source-of-news-for-kenyans-as-radio-drops-mck-n382030
- ReelAnalytics via Khusoko: 2025 report https://khusoko.com/2026/04/10/kenya-advertising-spend-2025-media-landscape-outlook/ ; H1 2026 https://khusoko.com/?p=53702
- GeoPoll: Kenya top TV and radio Q1 2026: https://www.geopoll.com/blog/kenya-top-tv-radio-q1-2026/
- DataReportal: *Digital 2027: Kenya*: https://datareportal.com/reports/digital-2027-kenya
- StatCounter: Kenya mobile browser share: https://gs.statcounter.com/browser-market-share/mobile/kenya
- Reuters Institute *Digital News Report 2026 — Kenya*: https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/kenya
- SAIIA Policy Insights 173 (Apr 2026) on USAID cuts and media: https://saiia.org.za/wp-content/uploads/2026/04/SAIIA_PI_173_ReportingUnsupported.pdf
- web.dev: New to the web platform in October 2026 (scroll-driven animations Baseline): https://web.dev/blog/web-platform-10-2026
- web.dev: Same-document view transitions Baseline (Oct 2025): https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available

**News (for dated facts)**
- Citizen Digital: smartphones 52.3 M (2 Oct 2026): https://citizen.digital/article/smartphone-usage-surges-in-kenya-as-connected-devices-reach-523-million-n391282
- TechTrendsKE: 52.26 M smartphones, 27.42 M feature phones: https://techtrendske.co.ke/2026/09/19/52-million-smartphones-kenya-mobile-data/
- AllAfrica/Capital FM: betting ad spend −89 % (2 Feb 2026): https://allafrica.com/stories/202602020526.html
- Business Radar: TikTok monetisation in Kenya (24 Oct 2026): https://businessradar.co.ke/how-to-make-money-on-tiktok-in-kenya-everything-you-need-to-know/
- Citizen Digital: TikTok creators and tax: https://citizen.digital/article/kenyan-tiktokers-face-earning-deductions-as-pltaform-requests-tax-information-n390354
- Music In Africa: High Court bars MCSK: https://www.musicinafrica.net/node/383478
- Digital Policy Alert: KAMP suspension upheld: https://digitalpolicyalert.org/event/43355-kenya-copyright-board-upheld-suspension-of-kamp-copyright-and-related-rights-limited-and-ordered-governance-and-financial-remedial-measures
- Khusoko: Consolidated music tariffs 2026–2028: https://khusoko.com/2026/04/14/kecobo-consolidated-music-royalty-tariffs-2026-2028/
- Capital FM: ODPC renewal notice: https://capitalfm.africa/odpc-gives-data-handlers-14-days-to-renew-expired-certificates/
- Nation: IEBC/Parliament clash; spending limits stayed: https://nation.africa/kenya/news/politics/iebc-mps-lock-horns-over-campaign-financing-rules-5665884
- Business Today: IEBC 2027 timelines: https://businesstoday.co.ke/?p=155076
- Nation: High Court quashes KBC-only state-advertising order: https://nation.africa/kenya/news/-non-existent-powers-court-quashes-ps-kisiang-ani-order-restricting-state-advertising-to-kbc--4972384
- Khusoko: CBK remittances 2025: https://khusoko.com/?p=51209 ; Nation: 2026 decline: https://nation.africa/kenya/business/annual-diaspora-remittances-to-drop-for-first-time-in-17-years-5674530 ; Business Daily: remittance sources: https://www.businessdailyafrica.com/bd/markets/currencies/uk-loses-grip-as-top-source-of-kenya-s-diaspora-inflows-5515144
- The Star: NCPB maize price KSh 4,000: https://www.the-star.co.ke/counties/rift-valley/2026-01-15-cereals-board-raises-maize-price-to-sh4000 ; KNA: maize prices Aug 2026: https://www.kenyanews.go.ke/dry-maize-stocks-steady-as-prices-fluctuate/
- Citizen Digital / K24: Musaga substation fire (7 Aug 2026): https://citizen.digital/article/fire-at-kakamega-substation-triggers-widespread-blackout-in-western-kenya-n387914 ; https://k24.digital/news/fire-at-musaga-substation-triggers-blackout-across-5-western-counties-kenya-power/amp
- Standard: Radio Maisha goes audio-visual: https://www.standardmedia.co.ke/national/article/2001501077/radio-maisha-shifts-to-audio-visual-as-it-turns-14 ; Radio World: Ramogi FM visual radio: https://www.radioworld.com/?p=94691 ; The Star: Radio Africa Group 10 M followers: https://www.the-star.co.ke/news/2026-06-10-radio-africa-group-surpasses-10-million-digital-followers-report
- Frequencies: Citizen Digital (Mulembe) https://citizen.digital/citizen-sounds/853 , (Sulwe) https://citizen.digital/citizen-sounds/855 ; radio.co.ke Western Kenya guide https://radio.co.ke/articles/western-kenya-on-air-a-guide-to-radio-in-the-lake-region-and-kakamega-belt/ ; Streema Bungoma stations https://streema.com/radios/Bumgoma
- StatsKenya: 2019 census ethnic breakdown (Bukusu 1,188,963): https://www.statskenya.co.ke/at-stats-kenya/about/tribe-and-ethnicity-in-kenya-number-of-people-by-tribe/93

---

## Appendix: Self-check, assumptions and limits

**Self-check**
1. **Coverage:** all 79 tracked files appear in §3. The 38 `website/` components are covered in §6 (30 tools) and §7 (8 shell components). `TouchpointFilter` (in `components/`) is in §6.4d. ✅
2. **Every chapter and tool has its own subsection** with a mockup, or a stated reason for none: merged tools (6.3b, 6.4d, 6.5a, 6.7a) and fix-only tools (6.1b, 6.5g, 6.6e) reuse existing layouts. ✅
3. **Statistics:** every external figure in this report carries a source and URL in §8/§15. Figures I could not verify are marked **U**. Library weights are explicitly approximate. ✅
4. **Consistency of recommended figures:** one multiplier (2.0× base), one asks list (6), one Month-0 convention, one capex method. ✅
5. **Motion:** every motion recommendation has a reduced-motion and low-end fallback through §10.1 (global tokens collapse to 0 ms; `data-lite`). Weight is noted in §10.2. ✅

**Assumptions**
- Month 0 is assumed to be Q1 2027; change it if the board meets earlier.
- The station's stream is on Zeno.FM (per the site). I could not confirm a working stream URL, and Streema reports it "temporarily unavailable".
- The site is a confidential board proposal, not the public station website.

**What I could not verify or run**
- Lighthouse/PageSpeed metrics (no browser in this environment); §4.2 values are estimates.
- Smartphone penetration "92.9 % (Dec 2025)": I saw the Sep 2025 (85.2 %) and Mar 2026 (63.7 % of devices) figures, not the December release.
- CA licence fee schedule, GAA fees, RMS audience share, competitor spot rates, Payscale salaries, vendor equipment prices, YouTube RPM, county GDP per capita figures. These are marked **U** and need deep-link sources or fresh quotes.
- The regional-station minimum under the 2026–2028 music tariff (the source states only that it is lower than national).
- Whether KAMP's suspension has been lifted and which CMOs hold 2027 licences.
