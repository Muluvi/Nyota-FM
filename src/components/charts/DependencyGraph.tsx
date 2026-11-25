import React, { useEffect, useMemo, useState } from 'react';
import { strategies } from '../../data/strategies';
import { ChartCard, useTooltip } from './kit';
import { useInView, useMotion } from '../motion/hooks';

const CAT_COLOR: Record<string, string> = {
  'Studio Build': 'var(--color-sage)',
  'Content & Programming': 'var(--color-brass)',
  'Digital & Mobile': 'var(--color-moss)',
  'Commercial & Revenue': 'var(--color-brick-text)',
  'Community & Governance': 'var(--color-sage-dim)',
};

type Node = { id: string; x: number; y: number; vx: number; vy: number };
const W = 560;
const H = 360;

/** One step of a tiny force simulation (repulsion, spring edges, centring). */
function step(nodes: Node[], edges: [number, number][]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = b.x - a.x || 0.01;
      const dy = b.y - a.y || 0.01;
      const d2 = dx * dx + dy * dy;
      const f = 1800 / d2;
      a.vx -= (dx * f) / Math.sqrt(d2);
      a.vy -= (dy * f) / Math.sqrt(d2);
      b.vx += (dx * f) / Math.sqrt(d2);
      b.vy += (dy * f) / Math.sqrt(d2);
    }
  }
  for (const [s, t] of edges) {
    const a = nodes[s];
    const b = nodes[t];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const f = (d - 70) * 0.02;
    a.vx += (dx / d) * f;
    a.vy += (dy / d) * f;
    b.vx -= (dx / d) * f;
    b.vy -= (dy / d) * f;
  }
  for (const n of nodes) {
    n.vx += (W / 2 - n.x) * 0.004;
    n.vy += (H / 2 - n.y) * 0.006;
    n.vx *= 0.82;
    n.vy *= 0.82;
    n.x = Math.max(20, Math.min(W - 20, n.x + n.vx));
    n.y = Math.max(20, Math.min(H - 20, n.y + n.vy));
  }
}

/** Strategy dependencies as a node graph that settles physically on entry. */
export function DependencyGraph() {
  const tip = useTooltip();
  const { ref, inView } = useInView<HTMLDivElement>();
  const motion = useMotion();
  const edges = useMemo(() => {
    const idx = new Map(strategies.map((s, i) => [s.id, i]));
    return strategies.flatMap((s, i) => s.deps.filter((d) => idx.has(d)).map((d) => [idx.get(d)!, i] as [number, number]));
  }, []);
  const seed = () => strategies.map((s, i) => ({ id: s.id, x: W / 2 + Math.cos(i * 2.4) * 160, y: H / 2 + Math.sin(i * 2.4) * 120, vx: 0, vy: 0 }));
  const settled = useMemo(() => {
    const n = seed();
    for (let k = 0; k < 400; k++) step(n, edges);
    return n;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges]);
  const [nodes, setNodes] = useState<Node[]>(settled);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    if (!motion || !inView) return;
    const n = seed();
    let frame = 0;
    let raf = 0;
    const tick = () => {
      for (let k = 0; k < 3; k++) step(n, edges);
      setNodes(n.map((x) => ({ ...x })));
      if (++frame < 130) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion, inView, edges]);

  const linked = (i: number) => (hover == null ? true : strategies[i].id === hover || edges.some(([s, t]) => (strategies[s].id === hover && t === i) || (strategies[t].id === hover && s === i)));

  return (
    <ChartCard
      kicker="Dependencies"
      title="What has to happen first"
      note="Arrows run from a prerequisite to the strategy that depends on it. Hover a node to trace its chain."
      rows={edges.map(([s, t]) => ({ label: `${strategies[t].num} ${strategies[t].title}`, value: `depends on ${strategies[s].num} ${strategies[s].title}` }))}
      legend={Object.entries(CAT_COLOR).map(([label, color]) => ({ label, color }))}
      hostRef={tip.host}
    >
      <div ref={ref}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onPointerLeave={() => { setHover(null); tip.hide(); }}>
          <defs>
            <marker id="dep-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-sage-dim)" />
            </marker>
          </defs>
          {edges.map(([s, t], i) => {
            const on = hover != null && (strategies[s].id === hover || strategies[t].id === hover);
            return (
              <line
                key={i}
                x1={nodes[s].x}
                y1={nodes[s].y}
                x2={nodes[t].x}
                y2={nodes[t].y}
                stroke={on ? 'var(--color-brass)' : 'var(--color-sage-dim)'}
                strokeOpacity={hover == null || on ? 0.8 : 0.15}
                strokeWidth={on ? 2 : 1.2}
                strokeDasharray={on ? '6 6' : undefined}
                className={on ? 'c-dash-flow' : undefined}
                markerEnd="url(#dep-arrow)"
              />
            );
          })}
          {strategies.map((s, i) => (
            <g
              key={s.id}
              style={{ opacity: linked(i) ? 1 : 0.25, transition: 'opacity 200ms' }}
              onPointerMove={(e) => {
                setHover(s.id);
                tip.show(e, <><strong className="block text-brass">{s.num}</strong>{s.title}</>);
              }}
            >
              <circle cx={nodes[i].x} cy={nodes[i].y} r={hover === s.id ? 15 : 12} fill="var(--color-ink)" stroke={CAT_COLOR[s.category]} strokeWidth="3" style={{ transition: 'r 200ms' }} />
              <text x={nodes[i].x} y={nodes[i].y + 3.5} textAnchor="middle" fontSize="9" fill="var(--color-paper)">
                {s.num.replace('5.', '')}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {tip.node}
    </ChartCard>
  );
}
