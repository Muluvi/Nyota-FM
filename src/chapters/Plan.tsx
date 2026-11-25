import React from 'react';
import { Flywheel } from '../components/v2/Flywheel';
import { Gantt } from '../components/charts/Gantt';
import { Part5Strategies } from '../components/v2/Part5Strategies';

export default function Plan() {
  return (
    <>
      <Flywheel />
      <Gantt />
      <Part5Strategies />
    </>
  );
}
