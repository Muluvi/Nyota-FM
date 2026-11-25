/**
 * Motion runtime (≈4 KB). One IntersectionObserver, one MutationObserver, one
 * pointer listener and the shared scroll store drive every effect in src/motion.css.
 *
 * Safety model: hidden "before" states exist only under `html.motion` and only in
 * `@media screen and (prefers-reduced-motion: no-preference)`. The class is added here,
 * so without JavaScript, in print, under reduced motion and in Lite mode, every element
 * is simply shown in its final state.
 *
 * Usage in JSX (no component needed):
 *   data-reveal="up|down|left|right|fade|pop|settle|blur|wipe|wipe-down|iris|diagonal|curtain|shutter|flip|rotate|unfold|mask"
 *   data-reveal-repeat          re-fires each time it re-enters (exit animates in reverse)
 *   data-io / data-io="repeat"   observe without a reveal effect (sets data-inview for charts, text, counters)
 *   data-stagger / data-stagger="ripple"   on a parent: children get --i (cascade or ripple from centre)
 *   data-tilt / data-spotlight / data-magnetic / data-ripple   pointer effects
 */

export const motionAllowed = (): boolean =>
  typeof window !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches &&
  document.documentElement.dataset.lite !== 'true';

let io: IntersectionObserver | null = null;
const repeats = (el: Element) => el.hasAttribute('data-reveal-repeat') || el.getAttribute('data-io') === 'repeat';

function indexChildren(parent: Element) {
  const kids = Array.from(parent.children) as HTMLElement[];
  const ripple = parent.getAttribute('data-stagger') === 'ripple';
  const centre = (kids.length - 1) / 2;
  kids.forEach((k, i) => {
    k.style.setProperty('--i', String(ripple ? Math.round(Math.abs(i - centre)) : i));
    k.style.setProperty('--n', String(kids.length));
  });
}

function observe(root: ParentNode) {
  if (!io) return;
  root.querySelectorAll?.<HTMLElement>('[data-reveal]:not([data-observed]), [data-io]:not([data-observed])').forEach((el) => {
    el.setAttribute('data-observed', '');
    io!.observe(el);
  });
  root.querySelectorAll?.('[data-stagger]:not([data-indexed])').forEach((p) => {
    p.setAttribute('data-indexed', '');
    indexChildren(p);
  });
}

/** Ripple from the pointer position on any [data-ripple] element. */
function onPointerDown(e: PointerEvent) {
  const host = (e.target as Element)?.closest?.<HTMLElement>('[data-ripple]');
  if (!host || !document.documentElement.classList.contains('motion')) return;
  const r = host.getBoundingClientRect();
  const dot = document.createElement('span');
  dot.className = 'fx-ripple-dot';
  const size = Math.max(r.width, r.height) * 2;
  dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
  host.appendChild(dot);
  dot.addEventListener('animationend', () => dot.remove(), { once: true });
}

/** Tilt, spotlight and magnetic effects share one rAF-throttled pointer listener. */
let pending: PointerEvent | null = null;
let lastHost: HTMLElement | null = null;
function applyPointer() {
  const e = pending;
  pending = null;
  if (!e) return;
  const host = (e.target as Element)?.closest?.<HTMLElement>('[data-tilt],[data-spotlight],[data-magnetic]') ?? null;
  if (lastHost && lastHost !== host) resetHost(lastHost);
  lastHost = host;
  if (!host) return;
  const r = host.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  host.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
  host.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  if (host.hasAttribute('data-tilt')) {
    host.style.setProperty('--ry', `${((px - 0.5) * 10).toFixed(2)}deg`);
    host.style.setProperty('--rx', `${((0.5 - py) * 8).toFixed(2)}deg`);
  }
  if (host.hasAttribute('data-magnetic')) {
    host.style.setProperty('--tx', `${((px - 0.5) * 10).toFixed(1)}px`);
    host.style.setProperty('--ty', `${((py - 0.5) * 8).toFixed(1)}px`);
  }
}
function resetHost(h: HTMLElement) {
  ['--rx', '--ry', '--tx', '--ty'].forEach((p) => h.style.removeProperty(p));
}

function syncMotionClass() {
  document.documentElement.classList.toggle('motion', motionAllowed());
}

/** Call once at start-up. */
export function initMotion() {
  if (typeof window === 'undefined') return;
  syncMotionClass();
  window.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change', syncMotionClass);
  new MutationObserver(syncMotionClass).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lite'] });

  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const el = en.target as HTMLElement;
          if (en.isIntersecting) {
            el.setAttribute('data-inview', 'true');
            if (!repeats(el)) io!.unobserve(el);
          } else if (repeats(el)) {
            el.removeAttribute('data-inview');
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    observe(document);
    // A fast scroll (or content loading above) can carry an element from below the
    // viewport to above it between frames, so its intersection never registers. After
    // each scroll settles, reveal anything that is at or above the viewport.
    let settle = 0;
    window.addEventListener(
      'scroll',
      () => {
        window.clearTimeout(settle);
        settle = window.setTimeout(() => {
          document.querySelectorAll<HTMLElement>('[data-observed]:not([data-inview])').forEach((el) => {
            if (repeats(el)) return;
            if (el.getBoundingClientRect().top < window.innerHeight) {
              el.setAttribute('data-inview', 'true');
              io!.unobserve(el);
            }
          });
        }, 160);
      },
      { passive: true },
    );
    new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && observe(n.parentElement ?? n));
    }).observe(document.body, { childList: true, subtree: true });
  } else {
    document.querySelectorAll('[data-reveal],[data-io]').forEach((el) => el.setAttribute('data-inview', 'true'));
  }

  if (window.matchMedia?.('(hover: hover)').matches) {
    document.addEventListener(
      'pointermove',
      (e) => {
        if (!document.documentElement.classList.contains('motion')) return;
        if (!pending) requestAnimationFrame(applyPointer);
        pending = e;
      },
      { passive: true },
    );
  }
  document.addEventListener('pointerdown', onPointerDown, { passive: true });
}
