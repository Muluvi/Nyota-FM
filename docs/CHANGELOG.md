# Changelog

## Baseline — 7 October 2026

- TypeScript: `tsc --noEmit` passed before strict mode was enabled.
- Build: Vite build passed; audit baseline measured approximately 800 KB JavaScript (205 KB gzipped), 106 KB CSS (18 KB gzipped), and 1,731 modules.
- Source inventory: 129 TypeScript files were present; the audit identified 68 unreachable files.
- Consolidation branch: `refactor/consolidate`.

## Decisions

- Existing Instrument Serif, DM Sans, and DM Mono families remain in use until a typography review is recorded.
- The current visual language remains ink, paper, sage, brass, brick, and moss.

## Redesign v3 — 27 November 2026

Brief: "The content is okay but jumbled up. It's not flowing well. The website should be minimalistic." Owner pre-approved all recommendations. Blueprint: `docs/redesign/PHASE1_BLUEPRINT.md`. Verification: `docs/redesign/VERIFICATION.md`.

### Structure and content
- One story in SCQA order: Hero → In short → 01 Objectives → 02 Market data → 03 The model → 04 Opportunities → 05 Strategies → 06 The build → 07 Gap audit → The asks → Sources → Appendix. The narrative/full toggle and the second hero are gone.
- Every chapter has three layers: skim (number, label, action title, core sentence), read (≤3 proof points, one featured visual), detail (the original Part, unchanged, closed by default, deep-linkable as `#<chapter>-detail`).
- `src/content/`: `sections.ts` (spine for all navigation), `figures.ts` (99 registered figures, 20 conflict groups, provisional flags), `sources.ts`, `glossary.ts` (23 terms incl. Kiswahili glosses), `chapters/` (copy), `data/` (arrays moved verbatim out of the Parts by script).
- `<Figure>` renders every story number with a citation popover; `{f:id}` and `{g:term}` tokens in copy.
- `scripts/check-figures.mjs` (in `pnpm check`) blocks raw currency/percent/multiple literals in the story layer and ratchets the legacy layer. `scripts/verify-figures.mjs` proves every registered value exists in the pre-redesign source.
- Slogan "Hapa tulipo. Twang'aa." used twice (hero and sign-off), with English glosses from the lexicon. Its decorative uses in the old hero/footer were removed with those components.
- Inline widgets (30) removed from the reading flow; each Part's detail now shows a one-line "open in a focused view" row. All 35 tools live in the Appendix Toolkit, grouped by chapter, lazy-loaded.

### Navigation and visual system
- One header (wordmark, chapter indicator, ON AIR pill, Menu) with reading progress; hides on scroll down, stays on jumps. Full-screen menu with action titles, reading time, read count, Search, Briefing, Present, Lite, Print, Copy link.
- Removed: Navbar, FloatingNavRail, MobileBottomDock, SearchModal, MinimalNarrative, SourceListAndAsks (content redistributed), ledger chapter chrome, `update_hero.sh`, `update_glass.sh`, `src/lib/scroll.ts`.
- Tokens: six-step type scale (12px floor; 0 text nodes under 12px, was 2,598), one radius token, one pill button, chapter colour bands, stray Tailwind colours mapped to the palette. Fonts self-hosted (latin subsets). Big Shoulders Display (OFL) for the wordmark only.

### Motion
- CSS and IntersectionObserver for everything; rAF for count-up and scroll scrubbing. Lenis on desktop pointer devices only. anime.js was trialled and removed (CSS sufficed; −15 KB gzip). Looping motion: ON AIR dot (only while a stream plays) and the dial wave (paused off-screen). Reduced motion and Lite show final states.

### Board features
- Presentation mode (16:9, arrows, timer), Briefing overlay (In short), print stylesheet with all chapter details expanded, one-page decision sheet (`?view=decision-sheet`), Lite mode (auto on Save-Data/2G/3G), OG image for WhatsApp, favicon, `noindex`.
- Build-time prerender + hydration of the hero and In short.

### Numbers (before → after)
- First-load JS 206 KB → 96 KB gzip. Lighthouse mobile (old narrative view → new full story): Performance 92–96 → 97, Accessibility 94 → 100, Best Practices 96 → 100, LCP 2.3s. SEO 92 → 63 only because of the intentional `noindex`. axe-core: 0 violations with every detail open.
- Words in view: 11,884 → 3,271 (−72%), with no content removed. Text under 12px: 2,598 nodes → 0.

## Effects layer — 27 November 2026

The owner asked for extensive visual effects ("Use these features extensively"). This reverses the original "minimalistic" and "no decorative loops" direction for the default experience. To keep both, a **Calm motion** switch in the menu restores the restrained v3 behaviour, and Lite mode plus reduced motion turn every effect off. The full map of effects, with where each lives and what was skipped and why, is in `docs/redesign/EFFECTS.md`.

- New: `src/fx/` (stylesheet in the components layer, lazy runtime, particles, WebGL shader, confetti), dark/light theme, accent themes, sound preference, navigation dots, back-to-top, pinned horizontal roadmap, comparison slider, sortable opportunities, progress rings, "Mark as discussed" on the asks (this device only), sources marquee and progressive loading, station logo in the footer.
- Kept: one story, the figure registry, all checks. check-figures, verify-figures and orphans pass; axe shows 0 violations in both themes.
- Costs: first-load JS 96 → 101 KB gzip, CSS 16 → 24 KB gzip. Lighthouse Performance 97 → 89–91. Simulated LCP 2.3 → 3.1s (measured 0.24s).
