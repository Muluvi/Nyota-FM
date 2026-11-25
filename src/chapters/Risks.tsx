import React from 'react';
import { Part3DataAnalysis } from '../components/v2/Part3DataAnalysis';
import { Part7GapAudit } from '../components/v2/Part7GapAudit';

export default function Risks() {
  return (
    <>
      <Part3DataAnalysis view="risks" />
      <Part7GapAudit />
    </>
  );
}
