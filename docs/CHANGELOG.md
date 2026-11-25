# Changelog

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
