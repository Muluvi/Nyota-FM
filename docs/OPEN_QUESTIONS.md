# Open questions and decisions

Last updated 25 November 2026 (data version `81b045278fe1`).

## Decisions applied (D1–D7, pre-approved by the owner)

| # | Decision | Value applied | Where |
|---|---|---|---|
| D1 | Month 0 | January 2027 (board approval); plan runs Q1 2027–Q4 2028 | `src/data/timeline.ts` |
| D2 | Stream URL | `STREAM_URL_LOW` / `STREAM_URL_HIGH` empty (`TODO_OWNER`); player shows "Stream link pending" and disables play | `src/config.ts` |
| D3 | Board asks | Six asks; the Phase 1 ceiling is read from the capex register (≤ KSh 0.84 M) | `src/data/asks.ts` |
| D4 | Contact channel | Sales email, phone and WhatsApp set; forms open pre-filled email/WhatsApp; `INQUIRY_ENDPOINT` empty | `src/config.ts` |
| D5 | County boundaries | `CountyMap` loads `public/geo/western-counties.json` if present; otherwise a schematic labelled "not to scale" | `src/components/charts/CountyMap.tsx` |
| D6 | Logo | Placeholder wordmark at `public/brand/nyota-logo.svg`; drop the official light/dark logo in at the same path | `public/brand/` |
| D7 | Confidentiality | `noindex,nofollow` plus hosting-level password protection (see `docs/DEPLOY.md`); "Confidential" label in the footer only | `index.html`, `docs/DEPLOY.md` |

Earlier editorial questions are settled as follows: revenue multiplier 2.0× base (1.4× worst, 2.8× best) against an *audited* baseline;
presenters, quotes, sponsors and the playbook KPIs are treated as illustrative; 2026 appears only as historical context; typography is
Instrument Serif + DM Sans, with DM Mono dropped.

## Tier 0 items the owner must supply

| Item | Why it matters | How to close it | Owner |
|---|---|---|---|
| Audited baseline revenue, last 24 months (spot / sponsorship / OB / digital) | Validates every growth multiple, the lever ranges and the revenue index | Management accounts; part of Ask 6 | Station GM + finance |
| Western Kenya audience survey (share, daypart reach, language) | Nyota's share, reach-based pricing and objective C targets | GeoPoll/KARF Western oversample, KSh 0.5–1 M (Ask 6) | Firefly + GM |
| Station digital baseline | Objective D starting point | Export Facebook followers (Meta Business Suite) and stream sessions (Zeno dashboard) | Head of Digital |
| Live stream URLs (low and high bitrate) | Makes "Listen live" work | Zeno.FM mount addresses; verify reliability first | Station engineer |
| Regional-station royalty minimum (≤ 5 counties) | Royalty floor in the model and estimator | Read the gazetted Consolidated Music Tariffs 2026–2028 | GM / counsel |
| Phase-gate revenue thresholds (Phase 2 and 3) | Gates the release of later capital | Board decision | Board |
| Lever probabilities of success | Replaces the legacy composite score and the 50% realisation assumption | Agree P(success) per lever with the board | Firefly + board |
| Rate-card validity date and published rates | Quotes and the media-plan preview | Publish one dated rate card | Head of Sales |
| Vendor re-quotes with dates (all capex lines marked `TODO_OWNER`) | Prices are September 2026 listings and USD-exposed | Three quotes per major line | Station engineer |
| OB vehicle and conversion cost | The only unquoted capex line | Three quotes; pilot one activation | Commercial director |
| Coverage contour for 107.3 MHz | Real coverage map instead of the schematic | Propagation study from CA licence parameters (site, height, ERP) | Station engineer |
| County boundary file | Replaces the schematic map | KNBS/IEBC simplified boundaries at `public/geo/western-counties.json` | Firefly |
| Official logo (light and dark) | Replaces the placeholder wordmark | Brand book (Checklist B #36) | Head of Digital |
| Form service endpoint (optional) | Lets the inquiry form submit directly | Choose a provider; set `VITE_INQUIRY_ENDPOINT` | Firefly |
| Legal review | Election-advertising policy, county statutes, editorial handbook references | Counsel review before the political rate card is published | GM / counsel |
| CA licence fee schedule, GAA fees, competitor spot rates, salary benchmarks | Still unverified (audit §8 rows marked U) | Deep-link sources or fresh quotes | Firefly |
