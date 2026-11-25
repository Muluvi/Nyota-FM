# Content guide

How to change figures, sources and plan content without breaking the proposal's evidence standard.

## The rule

**Every figure lives in `src/data/`.** Components read from there. `pnpm check` runs
`scripts/check-data.mjs`, which fails the build when the rules below are broken. Hard-coded figures
still left in older components are tracked in `scripts/literal-baseline.json`; that count can only go
down, and a new component may not add any.

## Evidence tiers

| Tier | Meaning | Required fields |
|---|---|---|
| 1 | Published source | `sourceId` pointing at `sources.ts` with a URL and access date (prefer a deep link to the exact document) |
| 2 | Modelled from stated inputs | `method` and `inputs` |
| 0 | Declared gap | `value: TODO_OWNER` and a `method` saying how to close it. Shown as "To be confirmed". Never remove a Tier 0 marker to make a page look complete |

## Add a source

Add an entry to `src/data/sources.ts`:

```ts
{ id: 'publisher-short-name', publisher: 'CA Kenya', title: 'Report title', url: 'https://…/exact-document.pdf', deep: true, accessed: '2026-11-25' },
```

Set `deep: false` if the URL is only a home page. The Integrity panel counts deep links.

## Add or change a fact

Edit `src/data/facts.ts`. Keys must be unique; the check fails if one key has two values. Show it in a
component with `factValue('key')` and a badge with `<TierBadge factId="key" />`. Numeric series for charts
go in `src/data/series.ts`, each with a `sourceId`.

## Add a strategy

Edit `src/data/strategies.ts` (the only list). `startMonth` and `endMonth` are plan months from Month 0
(January 2027). Calendar labels come from `monthRangeLabel()` in `timeline.ts`. Part 5, the shortlist, the
Gantt and search all update automatically.

## Add a capex or opex line

Edit `src/data/capex.ts` (phase, vendor, `quoteDate`, `cost: { low, high }` or `null` if unquoted, tier,
`inModel`) or `src/data/opex.ts`. Phase totals, the Decision Summary, the capex chart and the finance model
recompute themselves. `tests/unit/data.test.ts` pins the quoted Phase 1–3 envelopes; update it deliberately
if a quote changes.

## The finance model

`src/model/finance.ts` compares the plan with "do nothing". Change assumptions there or with the sliders in
chapter 06. Payback text in the Decision Summary, briefing and deck comes from `paybackStatement()`. Keep the
"illustrative until the baseline audit" banner until the audited baseline is in `facts.ts`.

## Illustrative content

Any example person, quote, sponsor, price or result renders `<Illustrative />` and never a Tier 1 badge.
Real brand names may appear only as sourced market facts (mark the line `// data-ok` with a reason) or as
partners listed in `src/data/partners.ts` with `contracted: true`.

## Board asks

`src/data/asks.ts` is the single list used by the Asks chapter, the executive briefing, the deck and the
Decision Summary.

## Before you commit

```bash
pnpm check && pnpm test && pnpm e2e
pnpm board-pack   # optional: regenerate dist/Nyota-FM-Board-Pack.pdf
```
