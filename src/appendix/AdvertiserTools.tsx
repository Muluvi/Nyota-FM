import React from 'react';
import { MediaPlanQuote } from '../components/website/MediaPlanQuote';
import { CivicNoticeBuilder } from '../components/website/CivicNoticeBuilder';
import { PoliticalRateCardEngine } from '../components/website/PoliticalRateCardEngine';

export default function AdvertiserTools() {
  return (
    <div className="space-y-8">
      <MediaPlanQuote />
      <CivicNoticeBuilder />
      <PoliticalRateCardEngine />
    </div>
  );
}
