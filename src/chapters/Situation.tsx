import React from 'react';
import { SituationCharts } from '../components/v2/SituationCharts';
import { Part2MasterData } from '../components/v2/Part2MasterData';
import { SeeItWorking } from '../appendix/ProductPreview';

export default function Situation() {
  return (
    <>
      <SituationCharts />
      <Part2MasterData />
      <p className="mt-6"><SeeItWorking group="preview-evidence">Explore the county, coverage and royalty tools</SeeItWorking></p>
    </>
  );
}
