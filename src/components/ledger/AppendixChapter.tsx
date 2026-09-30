import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';

export function AppendixChapter() {
  const counties = [
    { name: 'Kakamega County', pop: '1,867,579', radio: '86.4%', phone: '49.2%', seat: 'Kakamega Town' },
    { name: 'Bungoma County', pop: '1,670,570', radio: '84.1%', phone: '47.0%', seat: 'Bungoma / Webuye' },
    { name: 'Busia County', pop: '893,681', radio: '82.5%', phone: '46.5%', seat: 'Busia Border' },
    { name: 'Vihiga County', pop: '590,013', radio: '88.2%', phone: '52.1%', seat: 'Mbale / Chavakali' },
    { name: 'Siaya County (Border)', pop: '993,183', radio: '81.0%', phone: '45.8%', seat: 'Siaya / Ugunja' },
  ];

  const glossary = [
    { term: 'BTL (Below-The-Line)', desc: 'Direct, on-ground marketing activities like market-day roadshows, boda boda sticker distributions, and school fairs, as opposed to passive mass media advertising.' },
    { term: 'CRM (Customer Relationship Management)', desc: 'The database of verified listener mobile numbers, enabling direct 1-to-1 communication and broadcasts via WhatsApp Channels.' },
    { term: 'OB (Outside Broadcast)', desc: 'Live mobile radio broadcasting conducted remotely on-site from market centers, stadiums, or agricultural exhibitions.' },
    { term: 'Spot Ad', desc: 'A traditional pre-recorded 30-to-45 second commercial jingle played during scheduled radio ad breaks.' },
    { term: 'TAM (Total Addressable Market)', desc: 'The total population living within Nyota FM’s core 5-county broadcast coverage footprint.' },
  ];

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        Reference materials, regional census benchmarks, technical frequency listings, and broadcasting terminology supporting the investment proposal.
      </p>

      {/* 5-County Demographic Breakdown Table */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Geographic Footprint</div>
        <h3 className="font-display text-paper text-lg mb-4">Western Kenya 5-County Market Data</h3>

        <div className="divide-y divide-hairline">
          {counties.map((c, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-xs font-mono">
              <div>
                <span className="font-body text-sm font-medium text-paper block">{c.name}</span>
                <span className="text-sage-dim text-[11px]">{c.seat}</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-sage-dim text-[10px] block uppercase">POPULATION</span>
                  <span className="text-paper">{c.pop}</span>
                </div>
                <div>
                  <span className="text-sage-dim text-[10px] block uppercase">RADIO REACH</span>
                  <span className="text-brass">{c.radio}</span>
                </div>
                <div>
                  <span className="text-sage-dim text-[10px] block uppercase">SMARTPHONE</span>
                  <span className="text-moss">{c.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LedgerCard>

      {/* Western Kenya Frequency Coverage Ledger */}
      <div className="space-y-1">
        <div className="text-eyebrow text-sage-dim pb-2">Transmission Assets & Frequencies</div>
        <LedgerRow label="Primary Transmitter Mast Location" value="Kakamega Hill Site" />
        <LedgerRow label="Effective Radiated Power (ERP)" value="2.0 kW" />
        <LedgerRow label="Backup Relay Link" value="Bungoma Webuye Repeater" />
        <LedgerRow label="Licensed Primary Frequency" value="Nyota FM Dial" valueColor="brass" />
      </div>

      {/* Glossary of Terms */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Lexicon & Standards</div>
        <h3 className="font-display text-paper text-lg mb-4">Glossary of Commercial Terms</h3>

        <div className="space-y-3">
          {glossary.map((item, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-mono text-brass font-medium block mb-0.5">{item.term}</span>
              <p className="font-body text-sage leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </LedgerCard>
    </div>
  );
}
