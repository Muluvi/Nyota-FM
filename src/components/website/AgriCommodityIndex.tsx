import React, { useState } from 'react';
import { Wheat, TrendingUp, TrendingDown, MapPin, DollarSign, Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface CommodityItem {
  id: string;
  crop: string;
  unit: string;
  market: 'Chwele (Bungoma)' | 'Lubao (Kakamega)' | 'Kitale Municipal' | 'Busia Border';
  currentPriceKsh: number;
  previousPriceKsh: number;
  trend: 'up' | 'down' | 'stable';
  seasonalNote: string;
  advertiserSponsor: string;
}

const COMMODITIES: CommodityItem[] = [
  {
    id: 'c1',
    crop: 'Dry Maize (Grain)',
    unit: '90kg Bag',
    market: 'Chwele (Bungoma)',
    currentPriceKsh: 3400,
    previousPriceKsh: 3200,
    trend: 'up',
    seasonalNote: 'Post-harvest tightening; millers active.',
    advertiserSponsor: 'Kenya Seed Company',
  },
  {
    id: 'c2',
    crop: 'Rosecoco Beans',
    unit: '90kg Bag',
    market: 'Chwele (Bungoma)',
    currentPriceKsh: 7800,
    previousPriceKsh: 8200,
    trend: 'down',
    seasonalNote: 'Supply influx from Uganda cross-border.',
    advertiserSponsor: 'One Acre Fund',
  },
  {
    id: 'c3',
    crop: 'Indigenous Chicken (Kienyeji)',
    unit: 'Per Bird (Mature Cock)',
    market: 'Lubao (Kakamega)',
    currentPriceKsh: 850,
    previousPriceKsh: 850,
    trend: 'stable',
    seasonalNote: 'Steady weekend family demand.',
    advertiserSponsor: 'Kenchic Feeds Western',
  },
  {
    id: 'c4',
    crop: 'Fresh Raw Milk',
    unit: 'Per Liter (Farm Gate)',
    market: 'Kitale Municipal',
    currentPriceKsh: 52,
    previousPriceKsh: 48,
    trend: 'up',
    seasonalNote: 'Dry spell reduction in pasture.',
    advertiserSponsor: 'New KCC Dairy Co-op',
  },
  {
    id: 'c5',
    crop: 'Red Bulb Onions',
    unit: 'Per Kg',
    market: 'Busia Border',
    currentPriceKsh: 110,
    previousPriceKsh: 125,
    trend: 'down',
    seasonalNote: 'High transit volume through Malaba.',
    advertiserSponsor: 'Co-op Bank Kilimo',
  },
];

export function AgriCommodityIndex() {
  const [selectedMarket, setSelectedMarket] = useState<string>('All');

  const filtered = selectedMarket === 'All'
    ? COMMODITIES
    : COMMODITIES.filter((c) => c.market.includes(selectedMarket));

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Wheat size={14} />
            <span className="uppercase tracking-widest font-semibold">Agribusiness Intelligence · Soko Nyota</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Ministry of Agriculture Wholesale Price Bulletins & Field Audits" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Western Kenya Agri-Commodity Wholesale Index
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Live commodity benchmarks broadcast daily on *Soko Nyota* (10:00–14:00). Direct high-value monetization gateway for agrochemical, seed, and fertilizer sponsors.
          </p>
        </div>

        {/* Market Filter */}
        <div className="flex flex-wrap gap-1 bg-ink p-1 rounded-lg border border-hairline">
          {['All', 'Chwele', 'Lubao', 'Kitale', 'Busia'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMarket(m)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                selectedMarket === m ? 'bg-brass text-ink font-bold' : 'text-sage hover:text-paper'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Commodities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => {
          const priceDiff = item.currentPriceKsh - item.previousPriceKsh;
          return (
            <div key={item.id} className="rounded-xl border border-hairline bg-ink p-4 space-y-2.5 hover:border-brass/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-paper text-sm block">{item.crop}</span>
                  <span className="text-[10px] text-sage-dim font-mono">{item.unit} · {item.market}</span>
                </div>
                <div className="text-right">
                  <span className="font-display text-lg font-bold text-paper tabular-nums block">
                    KSh {item.currentPriceKsh.toLocaleString()}
                  </span>
                  <span className={`text-[10px] font-mono flex items-center justify-end gap-1 ${
                    item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-sage'
                  }`}>
                    {item.trend === 'up' && <TrendingUp size={10} />}
                    {item.trend === 'down' && <TrendingDown size={10} />}
                    <span>{priceDiff > 0 ? `+${priceDiff}` : priceDiff < 0 ? `${priceDiff}` : 'Stable'}</span>
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-sage leading-relaxed font-sans">{item.seasonalNote}</p>

              <div className="pt-2 border-t border-hairline flex items-center justify-between text-[10px] font-mono">
                <span className="text-sage-dim">On-Air Sponsor:</span>
                <span className="text-brass font-bold">{item.advertiserSponsor}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
