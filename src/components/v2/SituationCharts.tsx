import React from 'react';
import { HBar } from '../charts/HBar';
import { LineChart } from '../charts/LineChart';
import { CountyMap } from '../charts/CountyMap';
import { radioReach, dailyListenership, radioSectors, adMarket, mobileConnections } from '../../data/series';

const pct = (v: number) => `${v}%`; // data-ok: UI format

/** Chapter 01 opener: six charts that carry the market evidence, all from src/data/series.ts. */
export function SituationCharts() {
  return (
    <div className="mb-8 space-y-4">
      <p className="max-w-3xl text-sm text-sage">
        Two different measures are often confused. <strong className="text-paper">Reach</strong> (CA) counts people who listened in the
        survey period and is still high in Western Kenya. <strong className="text-paper">Daily listening</strong> (MCK) is falling fast.
        Both are true; the plan has to act on both.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <HBar series={radioReach} highlight="Western" valueFormat={pct} />
        <LineChart series={dailyListenership} valueFormat={pct} />
        <HBar series={radioSectors} highlight="Agriculture & gardening equipment" />
        <HBar series={adMarket} highlight="Radio" valueFormat={(v) => `${v}B`} />
        <HBar series={mobileConnections} valueFormat={(v) => `${v}M`} />
        <CountyMap />
      </div>
    </div>
  );
}
