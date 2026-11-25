import React from 'react';
import { Part4Opportunities } from '../components/v2/Part4Opportunities';
import { TouchpointEcosystem } from '../components/v2/TouchpointEcosystem';
import { BubbleMatrix } from '../components/charts/BubbleMatrix';
import { SeeItWorking } from '../appendix/ProductPreview';

export default function Opportunity() {
  return (
    <>
      <div className="mb-6">
        <BubbleMatrix />
      </div>
      <Part4Opportunities />
      <TouchpointEcosystem />
      <p className="mt-6"><SeeItWorking group="preview-advertiser">Try the media plan and quote</SeeItWorking></p>
    </>
  );
}
