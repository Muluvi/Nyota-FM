import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motionAllowed } from '../../lib/motion';

/** True once the element has entered the viewport (or every time, with repeat). */
export function useInView<T extends Element>(opts: { repeat?: boolean; margin?: string } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (!opts.repeat) io.disconnect();
        } else if (opts.repeat) setInView(false);
      },
      { rootMargin: opts.margin ?? '0px 0px -10% 0px', threshold: 0.15 }, // data-ok: UI constant
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts.repeat, opts.margin]);
  return { ref, inView };
}

export const useMotion = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(motionAllowed()), []);
  return ok;
};

/** rAF tween from `from` to `to` while `active`; returns the current value. */
export function useTween(to: number, active: boolean, { from = 0, duration = 1600 } = {}) {
  const [v, setV] = useState(to);
  const motion = useMotion();
  useLayoutEffect(() => {
    if (motion && !active) setV(from);
  }, [motion, active, from]);
  useEffect(() => {
    if (!motion || !active) {
      if (!motion) setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const start = from;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(2, -10 * p); // ease-out-expo
      setV(start + (to - start) * (p === 1 ? 1 : eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, active, motion, duration, from]);
  return v;
}

/** Positions a sliding indicator under the active tab / segment (layout animation). */
export function useTabIndicator(dep: unknown) {
  const listRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    const ind = indRef.current;
    if (!list || !ind) return;
    const place = () => {
      const active = list.querySelector<HTMLElement>('[aria-selected="true"],[aria-pressed="true"],[aria-current="true"]');
      ind.style.opacity = active ? '' : '0';
      if (!active) return;
      ind.style.setProperty('--x', `${active.offsetLeft}px`);
      ind.style.setProperty('--y', `${active.offsetTop}px`);
      ind.style.setProperty('--w', `${active.offsetWidth}px`);
      ind.style.setProperty('--h', `${active.offsetHeight}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [dep]);
  return { listRef, indRef };
}

/**
 * FLIP reflow: children with data-flip-key animate from their old position to the new
 * one whenever `dep` changes (filter, sort, insert, remove).
 */
export function useFlip(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  const rects = useRef(new Map<string, DOMRect>());
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const motion = motionAllowed();
    const next = new Map<string, DOMRect>();
    root.querySelectorAll<HTMLElement>('[data-flip-key]').forEach((el) => {
      const key = el.dataset.flipKey!;
      const r = el.getBoundingClientRect();
      next.set(key, r);
      const prev = rects.current.get(key);
      if (!motion) return;
      if (prev) {
        const dx = prev.left - r.left;
        const dy = prev.top - r.top;
        if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
      } else if (rects.current.size) {
        el.animate([{ opacity: 0, transform: 'scale(0.9)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'ease-out' });
      }
    });
    rects.current = next;
  }, [dep]);
  return ref;
}
