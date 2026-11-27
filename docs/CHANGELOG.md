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

## Mobile, OLED and 3D pass — 27 November 2026

Request: "Optimize spacing for mobile phone users. Optimize Typography for mobile phone users. Optimize color palette for mobile phone users for entire website to appear 4k quality on oled screens. Install all you need to be able to utilise all possible visual features." No figures, sources, quotes or asks changed.

### Spacing (phones)
- Page gutters 16 → 20 px; section padding 80 → 64 px below 640 px (desktop unchanged). Safe-area insets on the body for notched phones.
- Hero: smaller dial and tighter top padding, so the headline, lede, slogan and CTA all fit in the first screen at 390 × 844.
- Ghost chapter and ask numerals hidden below 640 px (they overlapped titles).
- Proof figures: 36 px numbers, 15 px labels, hairline-separated rows instead of loose padded cards.
- Opportunity rows: annual revenue gets its own line under the difficulty and timing.
- Payback chart: the "Capex recovered" label moves out of the chart into a legend on phones (it overlapped the bars).
- Comparison slider: v1.0 label sits top-left on phones so the two figures no longer meet at the handle.
- Hover-only effects (lift, scale, glow, shine, tilt, neon…) are disabled on touch screens so they don't stick after a tap.

### Typography
- DM Sans now ships with its optical-size axis (`opsz` 9–40, same file also carries weight); `font-optical-sizing: auto` sharpens small text and tightens large text. +26 KB woff2.
- Action titles: 34 → 32 px minimum with a 1.06 line height; headings 23 px minimum.
- Metadata text 13 → 14 px on phones.
- `text-wrap: balance` on headings and `pretty` on paragraphs (no single-word last lines); kerning and ligatures on; hanging punctuation.

### Colour (OLED)
- Dark theme ink is true black `#000` (pixels off, infinite contrast); raised surfaces `#0A0D0B`; chapter bands re-tinted on black; hairlines `#222B26`.
- Paper text softened `#F7F8F4` → `#EEF0EA` to reduce halation on black.
- Display-P3 accents on wide-gamut screens (most OLED phones): brass, moss and brick use the extra saturation at the same lightness, so contrast is unchanged. Light theme keeps its sRGB values.
- Browser chrome (`theme-color`) and the pre-paint background are black.
- Canvases render at device resolution: particles up to 2.5×, confetti up to 3×. WebGL colours are resolved through a canvas probe so P3 tokens map correctly.

### 3D (Three.js)
- Installed `three@0.187.0` (and `@types/three`). New `src/fx/scene3d.ts`: wireframe terrain, a lattice transmitter mast with a pulsing beacon, signal rings radiating from the antenna, a 3D particle field, depth fog, ACES tone mapping and an UnrealBloom pass; the camera follows the pointer.
- Loads only on desktops with a fine pointer, WebGL2, ≥ 1024 px and ≥ 4 cores; 136 KB gzip, lazy, never on phones. Paused off-screen and in background tabs, capped at ~45 fps, follows theme changes, fully disposed. Falls back to the existing shader. Off under Calm, Lite and reduced motion.
- First-load JS unchanged (~101 KB gzip).

### Verification
- `pnpm check` (tsc, orphans, check-figures, build) and `verify:figures` pass.
- axe: 0 violations at 1280 px and 390 px, dark and light, with and without reduced motion.
- Lighthouse mobile (simulated): performance 85–88, accessibility 100, best practices 96 (the only failure is the sandbox blocking the Cloudinary logo, not a site issue), LCP 3.1–3.4 s, CLS 0.
- Screenshots: `docs/screenshots/after/hero-3d-1440.png`, `mobile-oled-a.png`, `mobile-oled-b.png`.

## Brand kit applied — 27 November 2026

Source: the Nyota FM brand kit and the official logo, both supplied in chat. Details are in `docs/BRAND.md`; open items are in `docs/OPEN_QUESTIONS.md`. No figures, sources or asks changed.

- **Logo:** the official logo is self-hosted as a transparent cut-out in WebP (128–1024 px). It appears in the hero (replacing the text wordmark; on phones it also replaces the dial, so the fold stays intact), the header, the menu and the footer, always in full colour. The Cloudinary-hosted earlier logo is no longer used.
- **Icons:**
  - App icon: the master logo.
  - Favicon: a gold star on Deep Nyota Green.
  - Live favicon: progress ring around the star.
  - New share image: `og.jpg`, replacing `og.png`.
- **Palette:** colours sampled from the logo.
  - Gold `#E7B44A`; Deep Nyota Green `#042311`; mid green `#11432B`; cream `#F8F2E2` (provisional).
  - Dark theme stays on true black, with Deep Nyota Green chapter bands.
  - Light theme is cream with deep-green text and dark-gold accents.
  - P3 gold on wide-gamut screens.
- **Type:**
  - Bold serif display (DM Serif Display) for titles and wordmarks; it replaces Instrument Serif and Big Shoulders, whose font files were removed.
  - Chapter titles resized for the wider face: 30–60 px.
  - The tagline is set in the sans, bold italic.
- **Pattern:** the dot texture is now the brand's repeated small gold stars.
- **Tagline:** "Hapa tulipo. Twang'aa." → **"Hapo Tulipo, Twang'aa"**, as on the official logo. The glossary key was renamed to match. Show names in the data are unchanged (see open questions).
- **Environment:** a personal `nyota-fm` cloud environment was created that allows `res.cloudinary.com`, which was used only to read the earlier logo.
