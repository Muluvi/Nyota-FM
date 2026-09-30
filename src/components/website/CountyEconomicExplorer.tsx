import React, { useState } from 'react';
import { MapPin, DollarSign, TrendingUp, Users, Building2, Truck, Wheat, Sparkles, Check, ChevronRight } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface CountyData {
  name: string;
  pop: string;
  adultPop: string;
  capital: string;
  gdpPerCapita: string;
  majorCrops: string[];
  keyMarkets: string[];
  saccoMembers: string;
  bodaCount: string;
  countyGovCommsBudget: string;
  topCommercialOpportunities: string[];
}

const COUNTIES: Record<string, CountyData> = {
  Bungoma: {
    name: 'Bungoma County',
    pop: '1.67M (2019 KNBS)',
    adultPop: '890,000 Voters / Adults',
    capital: 'Bungoma Town (Station HQ)',
    gdpPerCapita: 'KSh 142,000',
    majorCrops: ['Maize (Granary of Kenya)', 'Sugarcane (Nzoia Sugar)', 'Coffee (Mt Elgon Slopes)', 'Dairy Farming'],
    keyMarkets: ['Chwele Market (2nd largest open-air market in Kenya)', 'Kimilili Market', 'Webuye PanPaper Hub'],
    saccoMembers: '185,000 Active Members',
    bodaCount: '42,000 Registered Operators',
    countyGovCommsBudget: 'KSh 38M – 52M Annual Public Participation',
    topCommercialOpportunities: [
      'Agricultural input sponsors (seed, fertilizer, solar pumps) targeting Chwele Market traders.',
      'Bungoma County Government devolved civic updates and Governor development townhalls.',
      'Nzoia Sugar belt farmer payment alerts and agro-machinery dealership campaigns.',
    ],
  },
  Kakamega: {
    name: 'Kakamega County',
    pop: '1.87M (2019 KNBS)',
    adultPop: '980,000 Adults',
    capital: 'Kakamega Town',
    gdpPerCapita: 'KSh 156,000',
    majorCrops: ['Sugarcane (Mumias & Butali Sugar)', 'Tea (Shinyalu & Ikolomani)', 'Horticulture', 'Gold Artisanal Mining'],
    keyMarkets: ['Kakamega Central Market', 'Mumias Commercial Strip', 'Lubao Cattle Market (Largest in East Africa)'],
    saccoMembers: '230,000 Active Members',
    bodaCount: '58,000 Registered Operators',
    countyGovCommsBudget: 'KSh 45M – 65M Annual Civic Budget',
    topCommercialOpportunities: [
      'Lubao Cattle Market weekly livestock price updates sponsored by veterinary brands.',
      'Masinde Muliro University of Science & Technology student body (40K students) digital campaigns.',
      'Regional hospitals, private health clinics, and NHIF/SHIF registration drives.',
    ],
  },
  Busia: {
    name: 'Busia County',
    pop: '893,000 (2019 KNBS)',
    adultPop: '460,000 Adults',
    capital: 'Busia Town / Malaba Border',
    gdpPerCapita: 'KSh 138,000',
    majorCrops: ['Cassava & Sweet Potatoes', 'Lake Victoria Fisheries (Budalangi/Port Victoria)', 'Cotton', 'Cross-Border Logistics'],
    keyMarkets: ['Busia One-Stop Border Post', 'Malaba International Transit Depot', 'Port Victoria Fish Landing'],
    saccoMembers: '95,000 Active Members',
    bodaCount: '28,000 Registered Operators',
    countyGovCommsBudget: 'KSh 25M – 35M Annual',
    topCommercialOpportunities: [
      'Forex bureaus, international cross-border cargo transporters, and customs clearance logistics.',
      'Lake Victoria fisheries cold-chain and aquaculture supplier promotions.',
      'Cross-border regional mobile money remittance announcements (M-Pesa / MTN Uganda).',
    ],
  },
  TransNzoia: {
    name: 'Trans Nzoia County',
    pop: '990,000 (2019 KNBS)',
    adultPop: '520,000 Adults',
    capital: 'Kitale Town',
    gdpPerCapita: 'KSh 178,000',
    majorCrops: ['Large-Scale Commercial Hybrid Maize', 'Seed Maize Production', 'Seedling Nurseries', 'Pedigree Dairy'],
    keyMarkets: ['Kitale Municipal Market', 'Kiminini Agribusiness Hub', 'Endebess Farm Gate'],
    saccoMembers: '140,000 Active Members',
    bodaCount: '32,000 Registered Operators',
    countyGovCommsBudget: 'KSh 30M – 42M Annual',
    topCommercialOpportunities: [
      'Kenya Seed Company and multinational agrochemical manufacturers seasonal product launches.',
      'Tractor hire, combine harvester leasing, and agricultural equipment credit financing.',
      'Kitale commercial banks and grain storage warehouse receipts campaigns.',
    ],
  },
};

export function CountyEconomicExplorer() {
  const [selectedCounty, setSelectedCounty] = useState<string>('Bungoma');
  const data = COUNTIES[selectedCounty];

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/10 border border-brass/30 px-2.5 py-0.5 text-[10px] font-mono text-brass font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Verified Regional Addressable Market · Part 2
            </span>
            <TierBadge tier={1} citation="KNBS 2019 Census, KNBS County Economic Review & County CIDP" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Western Kenya County Economic & Commercial Engine
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Explore the purchasing power, agricultural commodities, SACCO networks, and county government budgets across Nyota FM's broadcast transmission footprint.
          </p>
        </div>

        {/* County Pill Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-ink p-1 rounded-lg border border-hairline">
          {Object.keys(COUNTIES).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCounty(c)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                selectedCounty === c
                  ? 'bg-brass text-ink font-bold shadow'
                  : 'text-sage hover:text-paper hover:bg-ink-2'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-hairline bg-ink p-3.5 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            TOTAL POPULATION
          </span>
          <span className="font-display text-xl font-bold text-paper">{data.pop}</span>
          <span className="text-[10px] text-moss font-mono block">KNBS Verified</span>
        </div>

        <div className="rounded-lg border border-hairline bg-ink p-3.5 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            ADULT LISTENERS (18+)
          </span>
          <span className="font-display text-xl font-bold text-brass">{data.adultPop}</span>
          <span className="text-[10px] text-sage-dim font-mono block">Purchasing demographic</span>
        </div>

        <div className="rounded-lg border border-hairline bg-ink p-3.5 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            SACCO LIQUIDITY
          </span>
          <span className="font-display text-xl font-bold text-paper">{data.saccoMembers}</span>
          <span className="text-[10px] text-brass font-mono block">Table-banking capital</span>
        </div>

        <div className="rounded-lg border border-hairline bg-ink p-3.5 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            PUBLIC COMMS BUDGET
          </span>
          <span className="font-display text-xl font-bold text-emerald-400">{data.countyGovCommsBudget}</span>
          <span className="text-[10px] text-sage-dim font-mono block">County CIDP Allocation</span>
        </div>
      </div>

      {/* Detailed County Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Agriculture & Grassroots Hubs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 sm:p-5 space-y-3">
            <span className="text-xs font-mono text-brass font-bold uppercase tracking-wider flex items-center gap-2">
              <Wheat size={14} />
              Agricultural Engine & Major Cash Crops
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {data.majorCrops.map((crop, idx) => (
                <div key={idx} className="rounded bg-ink-2 border border-hairline p-2 text-paper flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                  <span>{crop}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-hairline">
              <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block font-bold mb-1.5">
                PRIMARY COMMERCIAL TRADING MARKETS
              </span>
              <ul className="space-y-1 text-xs text-sage">
                {data.keyMarkets.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <MapPin size={12} className="text-brass shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Opportunities for Nyota FM */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 sm:p-5 space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <DollarSign size={14} />
              High-Yield Commercial Opportunities
            </span>
            <div className="space-y-2.5">
              {data.topCommercialOpportunities.map((opp, idx) => (
                <div key={idx} className="rounded-lg bg-ink-2 border border-hairline p-3 text-xs text-sage flex items-start gap-2.5">
                  <span className="rounded bg-brass/10 text-brass text-[10px] font-mono font-bold px-1.5 py-0.5 mt-0.5 shrink-0">
                    0{idx + 1}
                  </span>
                  <p className="leading-relaxed text-paper/90">{opp}</p>
                </div>
              ))}
            </div>

            {/* Transport & Grassroots Mobility */}
            <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono text-sage">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-brass" />
                <span>Boda-Boda Fleet: <strong>{data.bodaCount}</strong></span>
              </div>
              <span className="text-brass text-[11px]">Primary radio listener base on the road</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
