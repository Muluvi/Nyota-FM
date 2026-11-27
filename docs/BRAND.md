# Brand implementation: Nyota FM 107.3

Source: the Nyota FM brand kit and the official logo supplied on 27 November 2026 (`public/brand/nyota-logo-official.jpg`). Items the kit leaves open are tracked in `docs/OPEN_QUESTIONS.md` under "Brand kit".

## Logo (§2)
| File | Use |
|---|---|
| `public/brand/nyota-logo-official.jpg` | The master as supplied (1024 px square, gold ground) |
| `public/brand/nyota-logo-official-512.jpg` | Reduced copy of the master |
| `public/brand/nyota-star-{128,256,512,1024}.webp` | Transparent cut-out of the master. The background is removed with GrabCut; the star silhouette, proportions and internal elements are untouched. Used in the hero, header, menu and footer |
| `public/apple-touch-icon.png` | 180 px copy of the master, used as the app icon (its square gold ground matches the board's app-icon mock-up) |
| `public/brand/icon-{32,48,192}.png` | Raster favicons |
| `public/favicon.svg` | Vector favicon: gold star on Deep Nyota Green |
| `public/og.jpg` | Share image: logo, title and tagline on Deep Nyota Green with the star pattern |

**Placement on the site:**
- **Hero:** large logo, 10 rem on phones and 19 rem on desktop. Preloaded with `srcset`, so it stays sharp at 3× pixel density.
- **Header and menu:** a 40 px mark beside the "Nyota 107.3" wordmark.
- **Footer:** the full-colour logo.
- **Browser tab:** the live favicon is a gold star on green with a gold reading-progress ring.

The logo is always shown in full colour: no silhouette, tint or recolour. It has a soft shadow or halo for contrast (§8).

## Colour (§3)
Gold and green were sampled from the official logo (median of the flat fills).

| Brand name | Token | Value | Notes |
|---|---|---|---|
| Nyota Gold | `--color-nyota-gold`, dark `--color-brass` | `#E7B44A` | Display-P3 `color(display-p3 0.93 0.71 0.26)` on wide-gamut screens |
| Gold highlight | `--color-gold-hi` | `#FEE991` | |
| Gold shadow | `--color-gold-deep` | `#A46B1C` | |
| Deep Nyota Green | `--color-nyota-green`, `--color-band-moss` (dark) | `#042311` | Chapter bands, favicon and share-image ground |
| Nyota Green (mid) | `--color-nyota-green-2` | `#11432B` | |
| Nyota Green, text on black | `--color-moss` (dark) | `#74B08A` | Lifted for 4.5:1 contrast |
| Cream White | `--color-cream`, `--color-paper` (dark), `--color-ink` (light) | `#F8F2E2` | Provisional: not in the logo |
| Secondary text (dark) | `--color-paper` (light) | `#042311` | |

**Themes:**
- **Dark (default, OLED):**
  - Background: true black.
  - Text: cream.
  - Accents: gold.
  - Chapter bands: Deep Nyota Green.
- **Light (the brand board's look):**
  - Background: cream.
  - Text: Deep Nyota Green.
  - Accents: dark gold `#5E3E09`, darkened from Nyota Gold so small text passes contrast.
  - Feature bands: green, with cream text.

## Typography (§4)
| Role in the kit | On the site | Status |
|---|---|---|
| Bold serif display: branding and titles | DM Serif Display (normal and italic, OFL), via `--font-display` and `--font-wordmark` | Stand-in until the production face is confirmed |
| "Nyota Sans": frequency, body and tagline | DM Sans with optical sizing; the tagline is set bold italic | Stand-in: no font file has been supplied |
| (Data) | DM Mono | Unchanged |

## Pattern (§5)
The repeated small gold stars are drawn as an SVG pattern in `.fx-dots`:
- Gold at 28% on dark; deep gold at 30% on cream.
- Used behind the hero and on the share image.

It is a secondary graphic. It never stands in for the logo.

## Tagline (§6)
"Hapo Tulipo, Twang'aa": the wording is taken from the official logo and the kit (§8: keep the wording consistent). It appears in the hero and the footer, each with its glossary popovers. The tagline is set in the supporting sans, bold italic:
- Cream on dark.
- Deep green on light.
