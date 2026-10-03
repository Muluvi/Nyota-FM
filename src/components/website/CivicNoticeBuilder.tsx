import React, { useState } from 'react';
import { Building2, FileCheck, Copy, Check, Users, Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function CivicNoticeBuilder() {
  const [selectedCounty, setSelectedCounty] = useState<'Bungoma' | 'Kakamega' | 'Busia' | 'Trans Nzoia'>('Bungoma');
  const [agendaTopic, setAgendaTopic] = useState<'County Budget & Fiscal Strategy Paper (CFSP)' | 'Annual Development Plan (ADP) Townhall' | 'Governor Public Participation Forum' | 'Public Health & Vaccination Drive'>('County Budget & Fiscal Strategy Paper (CFSP)');
  const [noticeDurationDays, setNoticeDurationDays] = useState<number>(7);
  const [spotsPerDay, setSpotsPerDay] = useState<number>(6);
  const [copied, setCopied] = useState<boolean>(false);

  const countyDetails = {
    Bungoma: { hq: 'Bungoma Town', subcounties: 9, mcaCount: 45, legalAct: 'County Governments Act 2012 §115' },
    Kakamega: { hq: 'Kakamega Town', subcounties: 12, mcaCount: 60, legalAct: 'Kakamega County Public Participation Act' },
    Busia: { hq: 'Busia Town', subcounties: 7, mcaCount: 35, legalAct: 'Busia County Civic Engagement Framework' },
    TransNzoia: { hq: 'Kitale', subcounties: 5, mcaCount: 25, legalAct: 'Trans Nzoia County Citizen Engagement Policy' },
  };

  const currentCounty = countyDetails[selectedCounty === 'Trans Nzoia' ? 'TransNzoia' : selectedCounty];
  const totalNotices = noticeDurationDays * spotsPerDay;
  const spotRateGAA = 2400; // GAA prequalified rate per 45s public notice
  const subtotalKsh = totalNotices * spotRateGAA;

  const copyNotice = () => {
    const text = `REPUBLIC OF KENYA · COUNTY GOVERNMENT OF ${selectedCounty.toUpperCase()}
OFFICE OF THE COUNTY SECRETARY & DIRECTORATE OF CIVIC COMMUNICATIONS
PUBLIC NOTICE & INVITATION TO PUBLIC PARTICIPATION
Topic: ${agendaTopic}
Statutory Mandate: In compliance with Article 201(a) of the Constitution and ${currentCounty.legalAct}.
Broadcast Station: Nyota FM 107.3 (Official Radio Broadcaster for Western Kenya)
Notice Schedule: ${totalNotices} Spots across ${noticeDurationDays} Days (${spotsPerDay} daily rotations in Swahili & Bukusu)
Budget Commitment: KSh ${subtotalKsh.toLocaleString()} (GAA Prequalified Order)
All citizens across all ${currentCounty.subcounties} sub-counties are invited to attend or submit written memoranda.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Building2 size={14} />
            <span className="uppercase tracking-widest font-semibold">Public Sector Directorate · GAA Framework</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="County Governments Act §115 & Government Advertising Agency (GAA) Register" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            County Government Public Notice & Civic Engagement Generator
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Model statutory public participation notices, townhall broadcasts, and county executive tenders broadcast in local vernacular under the GAA national framework.
          </p>
        </div>

        <button
          type="button"
          onClick={copyNotice}
          className="px-3.5 py-2 rounded bg-brass text-ink font-mono text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied Public Notice' : 'Copy Notice Order'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input parameters */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3.5">
            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                County Executive Authority
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(['Bungoma', 'Kakamega', 'Busia', 'Trans Nzoia'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCounty(c)}
                    className={`py-2 px-2 rounded text-xs font-mono transition-all border ${
                      selectedCounty === c
                        ? 'border-brass bg-brass text-ink font-bold'
                        : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Statutory Public Participation Agenda
              </label>
              <select
                value={agendaTopic}
                onChange={(e) => setAgendaTopic(e.target.value as any)}
                className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-xs font-mono text-paper focus:outline-none focus:border-brass"
              >
                <option value="County Budget & Fiscal Strategy Paper (CFSP)">County Budget & Fiscal Strategy Paper (CFSP)</option>
                <option value="Annual Development Plan (ADP) Townhall">Annual Development Plan (ADP) Townhall</option>
                <option value="Governor Public Participation Forum">Governor Public Participation Forum</option>
                <option value="Public Health & Vaccination Drive">Public Health & Vaccination Drive</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-sage">Broadcast Flight</span>
                  <span className="text-paper font-bold tabular-nums">{noticeDurationDays} Days</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={14}
                  value={noticeDurationDays}
                  onChange={(e) => setNoticeDurationDays(Number(e.target.value))}
                  className="w-full accent-brass cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-sage">Daily Airings</span>
                  <span className="text-brass font-bold tabular-nums">{spotsPerDay} Spots / Day</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={10}
                  value={spotsPerDay}
                  onChange={(e) => setSpotsPerDay(Number(e.target.value))}
                  className="w-full accent-brass cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Public Notice Requisition Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-5 space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-hairline pb-2.5">
              <span className="text-[10px] text-brass uppercase tracking-wider font-bold">
                GAZETTED BROADCAST REQUISITION
              </span>
              <span className="text-emerald-400 font-bold">GAA APPROVED TIER 1</span>
            </div>

            <div className="space-y-1 text-sage text-xs font-sans">
              <p className="font-bold text-paper text-sm">
                COUNTY GOVERNMENT OF {selectedCounty.toUpperCase()}
              </p>
              <p className="text-[11px] text-sage-dim">
                Statutory Reference: {currentCounty.legalAct}
              </p>
              <p className="text-paper font-medium pt-1">
                Notice Subject: <em>"{agendaTopic}"</em>
              </p>
            </div>

            <div className="rounded-lg bg-ink-2 border border-hairline p-3 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-sage-dim block">Total Airings:</span>
                <strong className="text-paper tabular-nums">{totalNotices} spots</strong>
              </div>
              <div>
                <span className="text-sage-dim block">Languages:</span>
                <strong className="text-paper">Swahili & Bukusu</strong>
              </div>
              <div>
                <span className="text-sage-dim block">Sub-Counties Covered:</span>
                <strong className="text-paper tabular-nums">All {currentCounty.subcounties} Sub-Counties</strong>
              </div>
              <div>
                <span className="text-sage-dim block">GAA Invoice Total:</span>
                <strong className="text-brass tabular-nums">KSh {subtotalKsh.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
