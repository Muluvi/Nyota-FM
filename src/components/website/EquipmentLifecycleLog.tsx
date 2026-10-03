import React, { useState } from 'react';
import { Wrench, Shield, Search, FileText, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface AssetRecord {
  id: string;
  name: string;
  category: 'Studio Audio' | 'Visual Video' | 'Transmission' | 'Power & Backup';
  costKsh: number;
  warrantyYears: number;
  maintenanceSchedule: string;
  localServiceAgent: string;
  kraDepreciationRate: string;
  status: 'Operational' | 'Scheduled Maintenance' | 'Procurement Pending';
}

const ASSET_REGISTRY: AssetRecord[] = [
  {
    id: 'EQ-01',
    name: '2× Robotic PTZ Cameras (NDI/HDMI 1080p)',
    category: 'Visual Video',
    costKsh: 228000,
    warrantyYears: 2,
    maintenanceSchedule: 'Quarterly lens calibration & firmware check',
    localServiceAgent: 'Nairobi Camera Center / Jiji Pro Kenya',
    kraDepreciationRate: '25% Annual Wear & Tear',
    status: 'Operational',
  },
  {
    id: 'EQ-02',
    name: 'Blackmagic ATEM Television Studio HD Switcher',
    category: 'Visual Video',
    costKsh: 204999,
    warrantyYears: 2,
    maintenanceSchedule: 'Semi-annual thermal cleaning & macro backup',
    localServiceAgent: 'Sound Wave Audio Nairobi',
    kraDepreciationRate: '25% Annual',
    status: 'Operational',
  },
  {
    id: 'EQ-03',
    name: '3× Shure SM7B Cardioid Dynamic Vocal Mics',
    category: 'Studio Audio',
    costKsh: 135000,
    warrantyYears: 3,
    maintenanceSchedule: 'Monthly windscreen sanitation & shockmount check',
    localServiceAgent: 'Yamaha Music Point Eldoret',
    kraDepreciationRate: '12.5% Annual',
    status: 'Operational',
  },
  {
    id: 'EQ-04',
    name: '3kW Solid-State FM Broadcast Transmitter',
    category: 'Transmission',
    costKsh: 1850000,
    warrantyYears: 3,
    maintenanceSchedule: 'Monthly SWR & RF filter check at Chetambe Mast',
    localServiceAgent: 'Broadcast Engineering Systems Kenya',
    kraDepreciationRate: '25% Annual',
    status: 'Operational',
  },
  {
    id: 'EQ-05',
    name: '15kVA Perkins Diesel Silent Generator Rig',
    category: 'Power & Backup',
    costKsh: 650000,
    warrantyYears: 2,
    maintenanceSchedule: 'Every 250 running hours (Oil, filters & ATS test)',
    localServiceAgent: 'Car & General Kisumu / Bungoma Service',
    kraDepreciationRate: '25% Annual',
    status: 'Operational',
  },
  {
    id: 'EQ-06',
    name: '10kVA Hybrid Solar Inverter + 15kWh LFP Batteries',
    category: 'Power & Backup',
    costKsh: 480000,
    warrantyYears: 5,
    maintenanceSchedule: 'Quarterly terminal torque & dust filter clean',
    localServiceAgent: 'Davis & Shirtliff Bungoma Branch',
    kraDepreciationRate: '12.5% Annual',
    status: 'Operational',
  },
  {
    id: 'EQ-07',
    name: 'Barix Audio-over-IP STL Digital Link',
    category: 'Transmission',
    costKsh: 120000,
    warrantyYears: 2,
    maintenanceSchedule: 'Quarterly packet loss & buffer audit',
    localServiceAgent: 'Telecommunication Solutions Nairobi',
    kraDepreciationRate: '25% Annual',
    status: 'Operational',
  },
];

export function EquipmentLifecycleLog() {
  const [filterCat, setFilterCat] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = ASSET_REGISTRY.filter((a) => {
    const matchCat = filterCat === 'All' || a.category === filterCat;
    const matchSearch =
      search === '' ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.localServiceAgent.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalCost = ASSET_REGISTRY.reduce((acc, curr) => acc + curr.costKsh, 0);

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Wrench size={14} />
            <span className="uppercase tracking-widest font-semibold">Governance & Asset Management</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Equipment Manufacturer Warranties & KRA Income Tax Act" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Station Equipment Registry & Maintenance Lifecycle Log
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Audit capital equipment assets, verified Kenyan service agents, preventive maintenance intervals, and statutory KRA depreciation allowances.
          </p>
        </div>

        <div className="text-left sm:text-right font-mono text-xs">
          <span className="text-sage-dim block">Audited Asset Value</span>
          <span className="text-lg font-bold text-brass tabular-nums">
            KSh {totalCost.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1 bg-ink p-1 rounded-lg border border-hairline w-full sm:w-auto">
          {['All', 'Studio Audio', 'Visual Video', 'Transmission', 'Power & Backup'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                filterCat === cat ? 'bg-brass text-ink font-bold shadow' : 'text-sage hover:text-paper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-sage-dim" />
          <input
            type="text"
            placeholder="Search equipment or vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded bg-ink border border-hairline text-xs font-mono text-paper placeholder:text-sage-dim focus:outline-none focus:border-brass"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-hairline">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-ink text-sage-dim uppercase tracking-wider border-b border-hairline">
            <tr>
              <th className="p-3">Asset & ID</th>
              <th className="p-3">Category</th>
              <th className="p-3">Cost (KSh)</th>
              <th className="p-3">Warranty</th>
              <th className="p-3">Maintenance Cadence</th>
              <th className="p-3">Kenyan Service Partner</th>
              <th className="p-3">KRA Write-Off</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline bg-ink-2">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-ink/50 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-paper block">{item.name}</span>
                  <span className="text-[10px] text-brass">{item.id}</span>
                </td>
                <td className="p-3 text-sage">{item.category}</td>
                <td className="p-3 text-paper font-bold tabular-nums">
                  KSh {item.costKsh.toLocaleString()}
                </td>
                <td className="p-3 text-emerald-400 font-semibold">{item.warrantyYears} Years</td>
                <td className="p-3 text-sage text-[11px] font-sans">{item.maintenanceSchedule}</td>
                <td className="p-3 text-paper text-[11px] font-sans">{item.localServiceAgent}</td>
                <td className="p-3 text-sage-dim">{item.kraDepreciationRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
