import React from 'react';
import { AdCampaignCalculator } from '../components/website/AdCampaignCalculator';
import { AdvertiserQuoteBuilder } from '../components/website/AdvertiserQuoteBuilder';
import { CivicNoticeBuilder } from '../components/website/CivicNoticeBuilder';
import { PoliticalRateCardEngine } from '../components/website/PoliticalRateCardEngine';

export default function AdvertiserTools() {
  return (
    <div className="space-y-8">
      <AdCampaignCalculator />
      <AdvertiserQuoteBuilder />
      <CivicNoticeBuilder />
      <PoliticalRateCardEngine />
    </div>
  );
}
