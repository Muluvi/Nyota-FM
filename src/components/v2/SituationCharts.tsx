import React, { useEffect, useRef, useState } from 'react';
import { HBar } from '../charts/HBar';
import { LineChart } from '../charts/LineChart';
import { Gauge } from '../charts/Gauge';
import { Donut } from '../charts/Donut';
import { Rings } from '../charts/Rings';
import { CountyMap } from '../charts/CountyMap';
import { Marquee } from '../motion/Marquee';
import { radioReach, dailyListenership, radioSectors, adMarket, mobileConnections } from '../../data/series';
import { facts } from '../../data/facts';

const pct = (v: number) => `${v}%`; // data-ok: UI format

/** The story beats: a sticky panel on the left advances as each chart scrolls past. */
const v = (series: { points: { label: string; value: number }[] }, label: string) => series.points.find((p) => p.label === label)!.value;
const daily = dailyListenership.points;
const conn = mobileConnections.points;
const featureShare = Math.round((v(mobileConnections, 'Feature phones') / conn.reduce((s, p) => s + p.value, 0)) * 100);

const BEATS = [
  { id: 'reach', kicker: 'Reach', head: 'Most of Western Kenya still listens to radio', body: `CA counts ${pct(v(radioReach, 'Western'))} radio reach in Western Kenya, the highest of any region.` },
  { id: 'daily', kicker: 'But daily habits', head: 'Daily listening is falling fast', body: `MCK reports daily listenership down from ${pct(daily[0].value)} to ${pct(daily[daily.length - 1].value)} in two years. Reach is not the same as daily use.` },
  { id: 'sectors', kicker: 'Who pays', head: 'Banks and agriculture lead radio spend', body: `Agriculture & gardening equipment is a KES ${v(radioSectors, 'Agriculture & gardening equipment')}M radio sector, which fits a farming audience.` },
  { id: 'market', kicker: 'The market', head: 'Radio holds about a third of the spend shown', body: 'TV still leads, but radio remains the second-largest medium in 2025.' },
  { id: 'mobile', kicker: 'Phones', head: `About ${pct(featureShare)} of connections are feature phones`, body: 'USSD reaches listeners without data; WhatsApp reaches the smartphone majority.' },
  { id: 'map', kicker: 'Footprint', head: 'Six million people across five counties', body: 'Bungoma is home; Kakamega is the largest county by population.' },
] as const;

/**
 * Chapter 01 opener: a scrollytelling layout. On wide screens the left panel is pinned and
 * crossfades between story beats as each chart passes; on phones each beat sits above its
 * chart. A ticker of sourced facts runs above (pauses on hover and off-screen).
 */
export function SituationCharts() {
  const [beat, setBeat] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setBeat(Number((e.target as HTMLElement).dataset.beat));
      },
      { rootMargin: '-45% 0px -45% 0px' }, // data-ok: UI constant
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const charts = [
    <Gauge key="g" series={radioReach} focus="Western" kicker="Reach" />,
    <LineChart key="l" series={dailyListenership} valueFormat={pct} kicker="Daily listening" />,
    <HBar key="h" series={radioSectors} highlight="Agriculture & gardening equipment" kicker="Who pays" />,
    <Donut key="d" series={adMarket} focus="Radio" valueFormat={(v) => `KES ${v}B`} kicker="The market" />,
    <Rings key="r" series={mobileConnections} kicker="Phones" />,
    <CountyMap key="m" />,
  ];

  const ticker = facts.filter((f) => f.tier === 1).slice(0, 12);

  return (
    <div className="mb-10 space-y-6">
      <div data-print-skip>
      <Marquee label="Key sourced facts">
        {ticker.map((f) => (
          <span key={f.id} className="flex items-center gap-2 whitespace-nowrap text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brass fx-blink" />
            <span className="text-sage">{f.label}:</span>
            <span className="text-paper">{f.value.length > 60 ? `${f.value.slice(0, 58)}…` : f.value}</span>
          </span>
        ))}
      </Marquee>
      </div>

      <p className="max-w-3xl text-base text-sage">
        <span className="fx-scroll-highlight">
          Two measures are often confused. Reach (CA) counts people who listened in the survey period and is still high in Western
          Kenya. Daily listening (MCK) is falling fast. Both are true, and the plan has to act on both.
        </span>
      </p>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] print:block">
        {/* Pinned narrative panel (desktop). */}
        <div className="hidden lg:block print:hidden">
          <div className="sticky top-28 rounded-2xl border border-hairline bg-ink-2/70 p-6 backdrop-blur fx-aurora">
            <ol className="mb-5 flex gap-1.5" aria-hidden="true">
              {BEATS.map((b, i) => (
                <li key={b.id} className="h-1 flex-1 overflow-hidden rounded bg-hairline">
                  <span className="block h-full bg-brass transition-transform duration-700" style={{ transform: `scaleX(${i <= beat ? 1 : 0})`, transformOrigin: 'left', transitionTimingFunction: 'var(--ease-out-expo)' }} />
                </li>
              ))}
            </ol>
            <div className="relative min-h-[11rem]" aria-live="polite">
              {BEATS.map((b, i) => (
                <div
                  key={b.id}
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    opacity: i === beat ? 1 : 0,
                    transform: i === beat ? 'none' : i < beat ? 'translateY(-16px)' : 'translateY(16px)',
                    filter: i === beat ? 'none' : 'blur(6px)',
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                  aria-hidden={i !== beat}
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-brass">
                    {String(i + 1).padStart(2, '0')} · {b.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-paper">{b.head}</h3>
                  <p className="mt-3 text-sm text-sage">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Print: two charts per row so the evidence fits the board pack. */}
        <div className="space-y-6 print:grid print:grid-cols-2 print:gap-4 print:space-y-0">
          {charts.map((c, i) => (
            <div key={BEATS[i].id} data-beat={i} ref={(el) => {
                refs.current[i] = el;
              }}>
              <div className="mb-2 lg:hidden">
                <p className="font-mono text-xs uppercase tracking-widest text-brass">{BEATS[i].kicker}</p>
                <h3 className="font-display text-xl text-paper">{BEATS[i].head}</h3>
              </div>
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
