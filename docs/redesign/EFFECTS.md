# Effects layer — what is implemented where

Requested 27 November 2026: "Use these features extensively." The effects are built as one layer on top of the v3 story:

- **CSS:** `src/fx/fx.css`, in Tailwind's `components` layer.
- **Runtime chunk:** `src/fx/runtime.ts`, about 3 KB gzip. It loads lazily when the browser is idle.
- **Particles and shader:** `src/fx/particles.ts` and `src/fx/shader.ts`, which also load lazily.

**Off-switches.** Every effect is switched off by any of these three:
- **Calm motion** (menu → Display and motion). It keeps the reading motion and removes the decoration.
- **Lite mode**, which turns on automatically when the browser asks to save data or the connection is 2G/3G.
- The **system "reduce motion" preference** (`prefers-reduced-motion`).

Print always gets the plain version.

## A. Page-load and hero
| Effect | Where |
|---|---|
| Blur-in | Hero headline and lede (blur only, no fade, so LCP is unaffected) |
| Particle overlay | Hero canvas; particles drift on three depth planes, link up, and are pushed by the cursor; 70 on desktop, 28 on phones; paused off-screen |
| Split-screen hero | Wordmark column slides from the left, dial column from the right |
| Typewriter | Hero glass card title (full text stays in the HTML for screen readers) |
| Fade-in sequence | Slogan and CTA |
| Scale-up | Dial |
| Curtain reveal | Two ink panels with brass edges part on load |
| Liquid / morphing background | WebGL domain-warped gradient on desktop; CSS morphing blobs elsewhere |
| Parallax hero | Wordmark and dial move at different speeds; the hero blurs out as it leaves |
| SVG line drawing | Sparklines draw in; roadmap line draws on scroll; drawn checkmarks |
| Glitch | "107.3" glitches once after load and on hover |
| Spotlight | Radial light follows the cursor over the hero; slow scan when idle |
| Ken Burns, high-resolution imagery, video background | **Skipped**: no approved photos or video exist (the brief rules out stock imagery). The components are straightforward to add once assets are supplied |

## B. Scroll-triggered
- **Slide-up and fade, stagger:** all chapters, lists, toolkit cards, sources, search results.
- **Scroll progress bar:** header line, taking each chapter's accent colour (colour shift on scroll).
- **Navigation dots:** right edge on wide screens, with an active accent dot and sliding labels.
- **Back to top:** after the hero, with a reading-progress ring.
- **Header transparency:** clear over the hero, frosted after.
- **Horizontal scroll and pin/unpin:** the 24-month roadmap pins and scrolls sideways on desktop, then unpins.
- **Parallax layers:** ghost chapter numerals, ask numerals, footer wordmark.
- **Sticky elements:** chapter titles, mandate stack.
- **Scroll-snapping:** In short numbers carousel on phones.
- **Zoom-in on scroll:** proof cards.
- **Rotation on scroll:** dial ring behind In short.
- **Counter reset:** counters, rings and proof figures recount every time they re-enter.
- **Velocity detection:** the sources marquee speeds up with scroll speed (Web Animations playbackRate).
- **Slide-in from sides:** chapter title column from the left, content from the right.
- **Blur-out on scroll:** hero.
- **Clip-path reveal:** each chapter's featured visual opens from a circle.
- **Opacity fade zones:** chapter bridges.
- **Scroll-linked video:** skipped (no video).

## C. Hover, focus, cursor
3D tilt with inner parallax and glare (proof cards, mandate cards, county tiles, stat cards, toolkit cards, hero card) · animated conic border glow · button scale · icon float (mandate letters, scroll cue) · pulse/heartbeat (ON AIR dot when a stream plays) · input glow (search, owner filter) · copy-to-clipboard glow and check (share chips) · custom cursor (dot and lagging ring, grows over targets; desktop only) · cursor trail (fading brass stroke) · magnetic buttons (primary CTAs, Menu) · ripple on click (all buttons) · hover underline (text links) · card lift · colour transitions · border draw (toolkit cards, asks) · background slide (list rows, disclosures, share chips) · icon rotation (disclosure and menu icons) · text reveal on hover ("Open" → "Open tool") · gradient shift (asks, county readout) · shine sweep (primary buttons, toolkit cards) · neon glow (menu tool chips; ON AIR label) · animated focus outline · tooltip micro-animation (figure and glossary popovers) · link arrow animation. Morphing SVG shapes on hover: the dial needle springs instead.

## D. Dynamic UI
- **Animated counters and progress bars:** opportunity scores, workstream shares.
- **Marquee:** source organisations, with masked edges.
- **Waveform:** header radio pill.
- **State button:** idle → loading → success, on "Mark as discussed" for each ask.
- **Feedback:** toasts with a drawn check; loading skeleton with shimmer; branded dial spinner.
- **Circular progress:** gap audit rings and asks discussed.
- **Panels and modals:** modal entry; smooth accordions (details, workstreams, mandates); tab-switch transitions (payback scenarios, checklists, county readout); slide-out side panel (Briefing); dropdown (ON AIR card).
- **Infinite scroll:** sources load in batches with a typing indicator.
- **Presentation mode:** slide transitions.
- **Carousel and cards:** carousel with animated dots (phones); 3D card flip (In short numbers show their source); expandable cards (mandate reality checks); stagger-revealed timeline; animated charts (payback bars, county bars).
- **Celebrations and loading:** confetti when the payback slider crosses break-even and when all six asks are discussed; top loading bar while chapters load.
- **Toggles and controls:** animated toggle switches (menu); sortable list with smooth reordering (opportunities by score, revenue or speed); draggable dial needle that springs back to 107.3; animated search expand (header); live typing indicator (search).
- **Notification bell:** skipped (nothing to notify).

## E. Text and typography
- **Fonts and fills:** display/body pairing (existing); gradient text (footer 107.3); text shadow (hero headline); text stroke (ghost numerals, footer wordmark).
- **Inputs:** floating input label (search).
- **Animated text:** highlighter mark (figures in each chapter's core sentence); letter-spacing on hover (labels, wordmarks); split-text mask rise (wordmark); text scramble (chapter numbers); kinetic typography (slogan); mask reveal; text bounce (toasts).
- **Decorative type:** drop cap (In short); neon (ON AIR); 3D extrusion (footer wordmark).
- **Sizing and weight:** responsive sizes (existing); variable-weight animation (menu chips, DM Sans variable).

## F. Image and layout
- **Glass and gradients:** glassmorphism (hero card, header, ON AIR card); masked gradient edges (marquee); gradient dividers (every chapter, footer); gradient mesh (footer, comparison slider).
- **Brand logo:** real station logo in the footer, lazy-loaded with a blur-up.
- **Comparison slider:** v1.0 vs v2.0 studio envelope.
- **Layouts:** grid stagger (toolkit); masonry (glossary); bento layout (In short); CSS grid-row animations (accordions); card stack (mandates).
- **Textures:** dot and noise overlays; fixed-attachment dot pattern (appendix); floating elements.
- **Skipped:** duotone, polaroid, image hover overlays and image borders (no photos); neumorphism (fails contrast on the dark palette).

## G. Motion and micro-interactions
| Interaction | Where |
|---|---|
| Rubber band | Header logo click |
| Jello | Menu button press |
| Tada | All six asks discussed |
| Shake | Search with no results |
| Heartbeat | ON AIR dot |
| Wobble | Hover on provisional markers |
| Flash | Copy |
| Bounce-in | Toasts, break-even readout |
| Light-speed | Header chapter label |
| Elastic | Dial needle spring-back |
| Zoom and slide-fade | Throughout |
| Spinners | Asks, loader |
| Success checkmark | Toasts, asks |
| Dot navigation | Carousel, navigation dots |
| Page transitions | Presentation slides |
| Micro-interaction sounds | Optional; menu → Sound, off by default |

Swing, roll and flip-in exist in the library but are not wired to anything. Nothing on the page called for them.

## H. 3D and WebGL
- **Built:**
  - **Three.js hero scene** (`src/fx/scene3d.ts`, `three@0.187.0`): a wireframe terrain, a lattice transmitter mast with a pulsing beacon, and signal rings radiating from the antenna. It adds a 3D particle field, exponential fog, ACES tone mapping, an UnrealBloom post-processing pass and a pointer-driven camera. A gradient mask keeps the text column legible.
    - It runs only on desktops with a fine pointer, WebGL2, a width of at least 1024 px and at least 4 cores. Otherwise the raw-WebGL shader below is used, and phones keep the 2D canvas.
    - Lazy: 136 KB gzip, never in first-load JS.
  - **WebGL fragment shader:** a liquid mesh gradient with vignette and chromatic fringe; the fallback.
  - **Other effects:** 3D card hover; 2.5D particle depth; 3D text extrusion.
- **Skipped:**
  - 3D model viewers: there is no model to show.
  - Ray marching, caustics and fluid simulations: their cost on mid-range phones isn't justified.

## K. Mobile and OLED (second pass)
- **Colour:**
  - True-black ink `#000` and softened paper `#EEF0EA`.
  - Display-P3 accents under `@media (color-gamut: p3)`, at the same lightness as the sRGB tokens.
  - Canvases are rendered at up to 2.5× or 3× the device pixel ratio.
- **Typography:**
  - DM Sans optical sizing (`opsz` axis).
  - Balanced headings and `pretty` paragraphs.
  - Phone metadata text set to 14 px.
- **Spacing on phones:** 20 px gutters and 64 px section padding. Safe-area insets for notched screens. The hero fits the first screen.
- **Touch:** hover-only effects are disabled under `(hover: none)`.
- Full list: `docs/CHANGELOG.md`, "Mobile, OLED and 3D pass".

## I. Accessibility and performance
- **Motion safety:** reduced motion, Calm and Lite all switch the layer off.
- **Browser APIs:** IntersectionObserver throughout; rAF for one shared scroll loop and every canvas; WAAPI for sorting and the marquee.
- **Loading and paint:** progressive enhancement (prerendered HTML); transforms and opacity on the GPU; CSS containment (`content-visibility` on the appendix); everything heavy lazy-loaded.
- **Fonts:** swap and preload. Lite skips them.
- **Checks:** axe reports 0 violations in dark and light, with and without reduced motion.

## J. Brand and theme
- **Themes:** dark/light toggle with a cross-fade and persistence; accent theme selector (brass, moss, brick) with live preview; logo variants follow the theme (silhouette inverts).
- **Brand motion:** brand-colour gradient animation; animated icon set (arrows, menu, disclosures); branded loader (dial spinner).
- **Browser chrome:** the favicon becomes a live reading-progress dial; custom brass scrollbar.
- **Skipped:** seasonal themes.

## Costs
| | Before effects | After |
|---|---|---|
| First-load JS (gzip) | 96 KB | 101 KB |
| CSS (gzip) | 16 KB | 24 KB |
| Lazy effects (runtime + particles + shader) | — | 6 KB, desktop/idle only |
| Lazy Three.js scene | — | 136 KB, capable desktops only |
| Lighthouse mobile perf / a11y / BP | 97 / 100 / 100 | 89–91 / 100 / 100 |
| Measured LCP (unthrottled) | — | 0.24 s |
| Simulated LCP (throttled 4G) | 2.3 s | 3.1 s (larger CSS blocks render for about 0.3 s in the simulation) |
