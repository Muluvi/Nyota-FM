import React, { useState } from 'react';
import { MapPin, Radio, Users, Building2, ShoppingBag, ArrowRight, BarChart3, Signal, CheckCircle2 } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface CountyData {
  id: string;
  name: string;
  census2019: string;
  projected2026: string;
  signalStrength: string;
  coverageStatus: 'Primary 100%' | 'Secondary 90%' | 'Outer Fringe 75%';
  languages: string[];
  keyTowns: string[];
  economicAnchors: string[];
  adOpportunity: string;
  stationStrategy: string;
}

const COUNTIES: CountyData[] = [
  {
    id: 'bungoma',
    name: 'Bungoma County',
    census2019: '1,670,570',
    projected2026: '1,932,168',
    signalStrength: '72–85 dBµV/m (Pristine Line-of-Sight)',
    coverageStatus: 'Primary 100%',
    languages: ['Bukusu (Primary)', 'Tachoni', 'Sabaot', 'Swahili'],
    keyTowns: ['Bungoma Town', 'Webuye', 'Kimilili', 'Chwele (Kenya\'s 2nd largest open market)', 'Sirisia'],
    economicAnchors: ['Sugar belt (Nzoia)', 'Chwele Agri-market', 'Maize milling', 'County Government'],
    adOpportunity: 'KSh 1.2M–2.5M/mo in local retail, agro-vet stores, SACCOs, and county announcements.',
    stationStrategy: 'Home base studio. Establish unassailable vernacular dominance (#2 behind Sulwe FM by Q4 2027, #1 by 2028).',
  },
  {
    id: 'kakamega',
    name: 'Kakamega County',
    census2019: '1,867,579',
    projected2026: '2,110,000',
    signalStrength: '66–74 dBµV/m (Solid Urban & Rural)',
    coverageStatus: 'Primary 100%',
    languages: ['Maragoli', 'Isukha', 'Idakho', 'Tiriki', 'Swahili'],
    keyTowns: ['Kakamega Town', 'Mumias', 'Malava', 'Khwisero', 'Shinyalu'],
    economicAnchors: ['Gold mining basin (Rosterman)', 'Masinde Muliro Univ (MMUST)', 'Healthcare hub', 'Commercial banking'],
    adOpportunity: 'KSh 2.0M–4.0M/mo from national FMCGs (Safaricom, KCB, Equity), regional universities, and healthcare clinics.',
    stationStrategy: 'Secondary remote studio in Phase 2. Target youth and university demographic via TikTok and weekend DJ mixes.',
  },
  {
    id: 'transnzoia',
    name: 'Trans Nzoia County',
    census2019: '990,341',
    projected2026: '1,080,000',
    signalStrength: '62–70 dBµV/m (Strong Agricultural Corridor)',
    coverageStatus: 'Secondary 90%',
    languages: ['Bukusu', 'Sabaot', 'Swahili (Dominant Trade Language)', 'English'],
    keyTowns: ['Kitale', 'Endebess', 'Kiminini', 'Cherangany', 'Sibanga'],
    economicAnchors: ['Kenya\'s Breadbasket (Large-scale seed maize)', 'Kenya Seed Company', 'Dairy co-ops', 'Horticulture'],
    adOpportunity: 'KSh 1.5M–3.0M/mo from agricultural inputs, seed distributors, tractor machinery, and fertiliser campaigns.',
    stationStrategy: '#1 vernacular position target by Q2 2028. Daily dawn agricultural market reports and farmers\' advisory shows.',
  },
  {
    id: 'busia',
    name: 'Busia County',
    census2019: '893,681',
    projected2026: '990,000',
    signalStrength: '58–68 dBµV/m (Border Corridor)',
    coverageStatus: 'Secondary 90%',
    languages: ['Samia', 'Khayo', 'Marachi', 'Teso', 'Swahili'],
    keyTowns: ['Busia Border', 'Malaba One-Stop Border Post', 'Nambale', 'Port Victoria', 'Funyula'],
    economicAnchors: ['Cross-border East Africa trade', 'Trucking & logistics', 'Victoria fishing', 'Micro-finance'],
    adOpportunity: 'KSh 1.0M–2.2M/mo in logistics, border trade finance, money transfer, and Lake Victoria fisheries.',
    stationStrategy: 'Focus on cross-border logistics updates, regional trade news, and Lake Victoria weather alerts.',
  },
  {
    id: 'vihiga',
    name: 'Vihiga County',
    census2019: '590,013',
    projected2026: '650,000',
    signalStrength: '56–66 dBµV/m (High Terrain Relief)',
    coverageStatus: 'Outer Fringe 75%',
    languages: ['Maragoli', 'Tiriki', 'Banyore', 'Swahili'],
    keyTowns: ['Mbale', 'Chavakali', 'Luanda (Major Market)', 'Majengo', 'Hamisi'],
    economicAnchors: ['Luanda trading hub', 'Tea farming', 'Diaspora remittances (Nairobi commute)', 'Education'],
    adOpportunity: 'KSh 800K–1.5M/mo in education institutions, funeral announcements, SACCOs, and consumer electronics.',
    stationStrategy: 'High-density community engagement. Capitalize on Luanda market days for Outside Broadcast activations.',
  },
];

export function CountyCoverageExplorer() {
  const [selectedCountyId, setSelectedCountyId] = useState<string>('bungoma');
  const selectedCounty = COUNTIES.find((c) => c.id === selectedCountyId) || COUNTIES[0];

  const totalMarket = '6,762,168'; // 2026 projected total

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Interactive Signal Map
            </span>
            <span className="font-mono text-xs text-sage-dim">· 5-County Western Coverage Matrix</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Western Kenya Transmitter & Audience Reach Explorer
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Click on any county below to inspect official 2019 Census counts, 2026 projections, broadcast signal dBµV/m strength, and hyper-local commercial opportunities.
          </p>
        </div>
        <TierBadge tier={1} citation="KNBS 2019 Census & CA Kenya Transmitter Signal Register" url="knbs.or.ke" />
      </div>

      {/* County Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
        {COUNTIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCountyId(c.id)}
            className={`p-3 rounded-lg border text-left transition-all relative ${
              selectedCountyId === c.id
                ? 'bg-brass text-ink border-brass font-bold shadow-md'
                : 'bg-ink text-sage hover:text-paper border-hairline hover:border-brass/50'
            }`}
          >
            <div className="text-[10px] opacity-80 uppercase tracking-wider">{c.coverageStatus.split(' ')[0]}</div>
            <div className="text-sm font-semibold truncate mt-0.5">{c.name.replace(' County', '')}</div>
            <div className="text-[11px] opacity-90 mt-1">{c.projected2026} pop</div>
          </button>
        ))}
      </div>

      {/* Selected County Detail Card */}
      <div className="rounded-xl bg-ink p-5 sm:p-6 border border-hairline space-y-5 animate-section-entrance">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-brass" />
              <h4 className="font-display text-2xl text-paper font-bold">{selectedCounty.name}</h4>
              <span className="rounded-full bg-moss/20 text-moss px-2.5 py-0.5 font-mono text-[10px] font-semibold border border-moss/40">
                {selectedCounty.coverageStatus}
              </span>
            </div>
            <div className="text-xs font-mono text-sage flex flex-wrap items-center gap-3">
              <span>2019 Census: <strong className="text-paper">{selectedCounty.census2019}</strong></span>
              <span>•</span>
              <span>2026 Projection: <strong className="text-emerald-400">{selectedCounty.projected2026}</strong></span>
              <span>•</span>
              <span>Signal: <strong className="text-brass">{selectedCounty.signalStrength}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded bg-ink-2 px-3 py-1.5 border border-hairline font-mono text-xs text-sage-dim">
            <Radio size={14} className="text-brass animate-pulse" />
            <span>Frequency: 107.3 MHz</span>
          </div>
        </div>

        {/* 3-Column Info Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vernacular & Key Towns */}
          <div className="rounded-lg bg-ink-2 p-4 border border-hairline space-y-2">
            <div className="text-[11px] font-mono uppercase text-brass font-semibold tracking-wider">
              Language Clusters & Key Towns
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedCounty.languages.map((l) => (
                <span key={l} className="rounded bg-ink px-2 py-0.5 text-[11px] font-mono text-paper border border-hairline">
                  {l}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs font-body text-sage leading-relaxed">
              <span className="text-sage-dim font-mono text-[10px] block uppercase">Urban & Trade Centers:</span>
              {selectedCounty.keyTowns.join(' · ')}
            </div>
          </div>

          {/* Economic Anchors */}
          <div className="rounded-lg bg-ink-2 p-4 border border-hairline space-y-2">
            <div className="text-[11px] font-mono uppercase text-brass font-semibold tracking-wider">
              Key Economic Drivers
            </div>
            <ul className="space-y-1 text-xs font-body text-sage pt-1">
              {selectedCounty.economicAnchors.map((e) => (
                <li key={e} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-brass/80" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial & OB Strategy */}
          <div className="rounded-lg bg-ink-2 p-4 border border-brass/40 space-y-2">
            <div className="text-[11px] font-mono uppercase text-brass font-semibold tracking-wider">
              Commercial Value Potential
            </div>
            <div className="font-mono text-sm text-paper font-semibold">
              {selectedCounty.adOpportunity}
            </div>
            <p className="text-xs font-body text-sage leading-relaxed pt-1">
              <strong className="text-paper">Nyota Strategy: </strong>
              {selectedCounty.stationStrategy}
            </p>
          </div>
        </div>

        {/* Overall Basin Summary */}
        <div className="pt-3 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-sage-dim">
          <span>5-County Total Addressable Population: <strong className="text-paper">≈ {totalMarket} citizens</strong></span>
          <span className="text-brass">Over 81% regional radio listenership rate (CA Kenya Q2 2025/26)</span>
        </div>
      </div>
    </div>
  );
}
