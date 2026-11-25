import React from 'react';
import { CapexWaterfall } from '../components/charts/CapexWaterfall';
import { CapitalSankey } from '../components/charts/CapitalSankey';
import { Part6TheBuild } from '../components/v2/Part6TheBuild';
import { SeeItWorking } from '../appendix/ProductPreview';

export default function Build() {
  return (
    <>
      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <CapexWaterfall />
        <CapitalSankey />
      </div>
      <Part6TheBuild />
      <p className="mt-6"><SeeItWorking group="preview-operations">See the studio, power and OB tools working</SeeItWorking></p>
    </>
  );
}
