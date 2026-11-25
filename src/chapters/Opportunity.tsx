import React from 'react';
import { Part4Opportunities } from '../components/v2/Part4Opportunities';
import { TouchpointEcosystem } from '../components/v2/TouchpointEcosystem';
import { SeeItWorking } from '../appendix/ProductPreview';

export default function Opportunity() {
  return (
    <>
      <Part4Opportunities />
      <TouchpointEcosystem />
      <p className="mt-6"><SeeItWorking group="preview-advertiser">Try the media plan and quote</SeeItWorking></p>
    </>
  );
}
