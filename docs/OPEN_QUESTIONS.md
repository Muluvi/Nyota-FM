# Open questions

This file records unresolved editorial or data decisions rather than silently changing client-facing claims.
Every figure on the site renders through `src/content/figures.ts`. Values awaiting a decision show a small ring (provisional) and list their competing values in the citation popover. The full register is in the Appendix → Figure register.

## Carried from v2.0

- Confirm the canonical revenue multiplier, capex range, payback window, and board ask count before replacing duplicated figures.
- Confirm which presenters, endorsers, listener quotes, and performance KPIs are illustrative examples versus verified evidence. (The site labels the presenter roster, vox pop and on-air hosts "illustrative".)
- Confirm the current milestone quarter and whether historical 2026 references should remain visible. (The roadmap still starts in Q1 2026 although the proposal is dated September 2026.)
- Confirm whether the final board document should use the current Instrument Serif / DM Sans / DM Mono pairing or Fraunces / IBM Plex Mono.

## Figure conflicts (redesign v3, 27 November 2026)

Defaults used on the site are in **bold**. Nothing was resolved silently; every variant stays registered with where it appeared.

- **revenue-multiple**: **2.0× base** (Part 1 B, 3.2, 3.4) · 1.4× worst · 2.8× best · 2.4× v1.0 target · 4.6× "commercial yield" (MinimalNarrative, VisualPlaybook; no source or method).
- **revenue-date**: **Q4 2027** (Part 3 model reaches index 200) · "Q8 2028" (Part 1 objective B wording).
- **payback**: **Month 5 base, Month 4–7 range** (capex waterfall scenarios; briefing memo) · ~1 month computed by the payback simulator at its defaults (different revenue inputs).
- **capex-p1**: **KSh 627,299–837,299** (Parts 2, 5, 6, asks) · KSh 630K–665K (annexure, different kit list) · KSh 732,000 (simulator average) · KSh 2.2M–3.8M (v1.0).
- **capex-total**: **KSh 4,969,099–9,595,099** (Part 6.2) · "KSh 627K–9.60M" (old hero and search) · KSh 4,970,000 (simulator).
- **ksh-320k**: two different items (OB van conversion; generator/UPS and OB rig in the gap workbench). Not a capex total.
- **ask-count**: **six asks** (source list) · five resolutions with different content (briefing memo, slide deck). The five-resolution memo is kept in the Toolkit as an earlier draft.
- **reach**: 1.8M / 1.8M+ weekly reach (playbook, narrative, annexure, footer; no source) · ~33M national weekly · n=23.9M national listeners. **Not used in the main story** until sourced.
- **digital share 32%**: no source. Appendix only.
- **national-reach**: 75% (2023) → 57% (2024) → 41% (2025) national daily reach (Media Council) · the annexure labels 57% → 41% "top-three audience consolidation".
- **tam**: 6,012,184 (2019 census) · **≈6.6M (2025 projection)** · ≈6.76M (2026) · "6M+" (old hero) · 7.2M (v1.0, corrected).
- **contacts**: **150K base / 250K stretch** by Month 24 (Part 1 D) · 120,000 WhatsApp opt-ins at Month 24 (Strategy 5.5).
- **lever-count**: **12 ranked streams** (Part 4) · 14 levers (Part 2.8) · 11 channels (Part 3.3).
- **gaa-value**: **KSh 2M–8M** (Part 4) · KSh 1M–5M county + KSh 0.5M–3M GAA (Part 2.8) · "KSh 4.5M+" (briefing) · "KSh 24.5M/week, old contract" (annexure).
- **gaa-date**: Q2 2026 (Strategy 5.14) · Q2 2027 (Part 3 "what must be true"). Both shown on ask 5.
- **gaa-fee**: KSh 100,000 (6.4, checklist B) · KSh 150,000 compliance and legal (5.14).
- **p1-date**: Month 4 (5.2, 6.2) · Q2 2026 (Part 3).
- **ussd-setup**: KES 145,000 vendor fee · KSh 250,000 strategy budget · "KSh 156,000" WhatsApp + USSD setup (briefing).
- **whatsapp-rate**: $0.0225 marketing conversation (Part 1, 2.4) · $0.038 per message (annexure).
- **whatsapp-usage**: 19.8% (5.5) · 53.9% (annexure).
- **yt-subs**: 50,000 (5.1) · 40,000 (5.8) at Month 12.

## New questions from the redesign

- **Ask owners and measures.** The source gives each ask a title, description and timing only. Owners and measures on the site are mapped from the matching strategy lead and KPI (5.1, 5.2, 5.5/5.6, 5.14, 6.1, 6.5) and labelled "mapped (provisional)". Please confirm or replace.
- **Live stream.** No stream URL exists in the repository. The old floating player synthesised a tone. The new ON AIR card shows the schedule and a calm "stream not connected" message. Set `STREAM_URL` in `src/content/data/schedule.ts` to enable listening.
- **Inquiry form.** The old footer form showed "Inquiry dispatched" but sent nothing. It is kept in the Toolkit with that caveat in its description; it should be wired to a real inbox or removed.
- **Show name spelling.** "Asubuhi ya Imani" (Parts 6, asks) vs "Asuhi ya Imani" (Part 5, briefing). Kiswahili for morning is *asubuhi*; source text is unchanged.
- **Indexing.** `noindex, nofollow` and a disallow-all robots.txt were added because the proposal is marked strictly confidential. Remove both if the site should be public.
- **Analytics (optional).** Not installed. If wanted: a cookieless counter (e.g. Plausible or a self-hosted endpoint) recording chapter views and clicks on "Download decision sheet", with no personal data.
- **Persistent signal motif (O1).** Deferred; the hero dial carries the motif. A fixed 2D layer is possible later; WebGL not proposed.
