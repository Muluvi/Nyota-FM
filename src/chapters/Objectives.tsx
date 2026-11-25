import React from 'react';
import { Part1Objectives } from '../components/v2/Part1Objectives';
import { SeeItWorking } from '../appendix/ProductPreview';

export default function Objectives() {
  return (
    <>
      <Part1Objectives />
      <p className="mt-6"><SeeItWorking group="preview-listener">See the programming and listener tools working</SeeItWorking></p>
    </>
  );
}
