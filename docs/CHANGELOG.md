# Changelog

## Purpose alignment: result — 25 November 2026

Work packages WP0–WP12 from the purpose-alignment brief, one commit each on `claude/new-session-ga2w4r`.

| Measure | Before | After |
|---|---|---|
| First-view JS (gzip) | 205 KB, one chunk | 103 KB (app 35.5 + React 67.3); chapters, tools, search, deck lazy |
| Meaningful HTML without JS | Spinner only | Prerendered cover + decision summary (5.7 KB) |
| Lighthouse mobile (local run, `vite preview`) | not measured | Performance 90 · Accessibility 95 · Best practices 100 · SEO 58 (intentional `noindex`) · LCP 2.5 s · CLS 0.035 · TBT 280 ms |
| axe (board chapters, desktop + mobile) | not run | 0 serious / critical |
| Unit tests | none | 29 (finance model 100% lines; data totals; charts; brand tokens) |
| End-to-end tests | none | 23 passing (smoke, ids, fabricated-claim scan, fact consistency, order, reduced motion, no-JS, axe, prototypes) |
| Board pack | none | `pnpm board-pack` → 30-page A4 PDF with data hash footer |
| Data integrity | hard-coded "12 × PASS" | `check-data`: 30 facts (26 Tier 1, 4 Tier 0), 31/50 deep-linked sources, 0 contradictions |
| Hard-coded figures in components | ~560 | 383 (ratchet; can only go down) |
| Fabricated-claim grep (KRA PIN, county letterhead, "Board Approved", …) | many hits | 0 |
| Off-palette colours / 8–10 px text | 240+ / 210 | 0 / 0 |


## Purpose alignment: baseline — 25 November 2026

Measured with `pnpm check` (Vite 6.4) before the purpose-alignment work packages:

| Metric | Value |
|---|---|
| JS | 801.21 KB raw / 205.08 KB gzip, one chunk |
| CSS | 78.50 KB / 13.68 KB gzip |
| Modules | 1,733 |
| Orphan check | 63 / 63 reachable |

After WP1 (trust fixes): JS 789.85 KB / 204.58 KB gzip, CSS 77.96 KB / 13.79 KB gzip.

After WP11 (delivery): first-view JS 102.8 KB gzip (app 35.5 + React vendor 67.3), down from 205 KB.
Chapters 01–07, Appendix A, each Appendix B tool group, search, briefing and the deck load as
separate chunks on demand. A 5.7 KB static decision summary is prerendered into `index.html`.

WP0 adds Vitest (`pnpm test`), Playwright (`pnpm e2e`, desktop + Pixel 7) and `@axe-core/playwright`.
The smoke test checks that the page loads without script errors, every `sections.ts` id exists exactly
once with no duplicate ids anywhere, and that none of the removed fabricated claims render.

## Baseline — 7 October 2026

- TypeScript: `tsc --noEmit` passed before strict mode was enabled.
- Build: Vite build passed; audit baseline measured approximately 800 KB JavaScript (205 KB gzipped), 106 KB CSS (18 KB gzipped), and 1,731 modules.
- Source inventory: 129 TypeScript files were present; the audit identified 68 unreachable files.
- Consolidation branch: `refactor/consolidate`.

## Decisions

- Existing Instrument Serif, DM Sans, and DM Mono families remain in use until a typography review is recorded.
- The current visual language remains ink, paper, sage, brass, brick, and moss.
