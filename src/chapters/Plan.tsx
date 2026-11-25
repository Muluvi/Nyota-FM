import React from 'react';
import { Flywheel } from '../components/v2/Flywheel';
import { Gantt } from '../components/charts/Gantt';
import { Heatmap } from '../components/charts/Heatmap';
import { DependencyGraph } from '../components/charts/DependencyGraph';
import { Part5Strategies } from '../components/v2/Part5Strategies';

export default function Plan() {
  return (
    <>
      <div className="mb-6">
        <Gantt />
      </div>
      {/* Supporting visuals: on screen only; the Gantt and Part 5 carry the plan in print. */}
      <div data-print-skip className="my-6 grid gap-6 xl:grid-cols-[1fr_1.6fr]">
        <Flywheel />
        <DependencyGraph />
      </div>
      <div data-print-skip className="my-6">
        <Heatmap />
      </div>
      <Part5Strategies />
    </>
  );
}
