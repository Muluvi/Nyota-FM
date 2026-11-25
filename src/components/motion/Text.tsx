import React, { useEffect, useState } from 'react';
import { useInView, useMotion } from './hooks';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

/**
 * Text that reveals by word (line mask), by character, or as a typewriter.
 * The full text stays in the DOM and in an aria-label, so readers and print get it.
 */
export function SplitText({ text, as = 'span', mode = 'word', className = '', delay = 0 }: { text: string; as?: Tag; mode?: 'word' | 'char' | 'type'; className?: string; delay?: number }) {
  const Comp = as as React.ElementType;
  const offset = Math.round(delay / (mode === 'word' ? 55 : mode === 'type' ? 38 : 22));
  const attrs = { 'data-split': '', 'data-io': '', ...(mode === 'type' ? { 'data-typewriter': '' } : {}) };
  if (mode === 'word') {
    return (
      <Comp className={className} {...attrs}>
        <span className="sr-only">{text}</span>
        {text.split(' ').map((w, i) => (
          <React.Fragment key={i}>
            <span className="split-word" aria-hidden="true">
              <span className="split-inner" style={{ '--i': i + offset } as React.CSSProperties}>
                {w}
              </span>
            </span>{' '}
          </React.Fragment>
        ))}
      </Comp>
    );
  }
  return (
    <Comp className={className} {...attrs}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((c, i) => (
        <span key={i} className="split-char" aria-hidden="true" style={{ '--i': i + offset } as React.CSSProperties}>
          {c}
        </span>
      ))}
    </Comp>
  );
}

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789·/#';

/** Text scramble / decode: random glyphs settle into the real text on entry. */
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const motion = useMotion();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!motion || !inView) return;
    let frame = 0;
    const total = 22;
    const id = window.setInterval(() => {
      frame++;
      setOut(
        Array.from(text)
          .map((c, i) => (c === ' ' || i < (frame / total) * text.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      );
      if (frame >= total) {
        window.clearInterval(id);
        setOut(text);
      }
    }, 38);
    return () => window.clearInterval(id);
  }, [inView, motion, text]);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Cycling word swap with a vertical roll. Static (first word) under reduced motion. */
export function CycleWords({ words, className = '' }: { words: string[]; className?: string }) {
  const motion = useMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, [motion, words.length]);
  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`} aria-live="off">
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden="true"
          className="col-start-1 row-start-1 transition-all duration-700"
          style={{
            transitionTimingFunction: 'var(--ease-out-expo)',
            opacity: n === i ? 1 : 0,
            transform: n === i ? 'none' : n === (i + words.length - 1) % words.length ? 'translateY(-100%)' : 'translateY(100%)',
            filter: n === i ? 'none' : 'blur(4px)',
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
