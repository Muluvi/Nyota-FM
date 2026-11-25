import React from 'react';
import { CountyCoverageExplorer } from '../components/website/CountyCoverageExplorer';
import { CountyEconomicExplorer } from '../components/website/CountyEconomicExplorer';
import { TransmitterElevationTool } from '../components/website/TransmitterElevationTool';
import { AgriCommodityIndex } from '../components/website/AgriCommodityIndex';
import { CMORoyaltyCalculator } from '../components/website/CMORoyaltyCalculator';

export default function EvidenceTools() {
  return (
    <div className="space-y-8">
      <CountyCoverageExplorer />
      <CountyEconomicExplorer />
      <TransmitterElevationTool />
      <AgriCommodityIndex />
      <CMORoyaltyCalculator />
    </div>
  );
}
