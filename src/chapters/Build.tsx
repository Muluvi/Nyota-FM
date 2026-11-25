import React from 'react';
import { CapexWaterfall } from '../components/charts/CapexWaterfall';
import { Part6TheBuild } from '../components/v2/Part6TheBuild';
import { SeeItWorking } from '../appendix/ProductPreview';

export default function Build() {
  return (
    <>
      <CapexWaterfall />
      <Part6TheBuild />
      <p className="mt-6"><SeeItWorking group="preview-operations">See the studio, power and OB tools working</SeeItWorking></p>
    </>
  );
}
