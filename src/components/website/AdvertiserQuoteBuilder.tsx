import React, { useState } from 'react';
import { FileText, Printer, Copy, Check, DollarSign, Calendar, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function AdvertiserQuoteBuilder() {
  const [clientName, setClientName] = useState('Nzoia Sugar Farmers Co-operative');
  const [sector, setSector] = useState<'Agribusiness' | 'Banking & SACCO' | 'Healthcare' | 'FMCG' | 'Public Sector'>('Agribusiness');
  const [campaignWeeks, setCampaignWeeks] = useState<number>(4);
  const [spotsPerDay, setSpotsPerDay] = useState<number>(4);
  const [daypart, setDaypart] = useState<'Prime Breakfast' | 'Drive Time' | 'Midday Market' | 'Run of Station'>('Prime Breakfast');
  const [includeOB, setIncludeOB] = useState<boolean>(true);
  const [includeWhatsAppPush, setIncludeWhatsAppPush] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Spot pricing matrix in KSh (derived from benchmark data)
  const rateCard = {
    'Prime Breakfast': 2800,
    'Drive Time': 2500,
    'Midday Market': 1800,
    'Run of Station': 2100,
  };

  const spotRate = rateCard[daypart];
  const totalSpots = spotsPerDay * 7 * campaignWeeks;
  const spotSubtotal = totalSpots * spotRate;
  const obCost = includeOB ? 180000 : 0;
  const waCost = includeWhatsAppPush ? 35000 * Math.ceil(campaignWeeks / 2) : 0;
  const grossTotal = spotSubtotal + obCost + waCost;

  // Volume discount
  const discountRate = campaignWeeks >= 8 ? 0.20 : campaignWeeks >= 4 ? 0.15 : 0.05;
  const discountAmount = Math.round(grossTotal * discountRate);
  const vatAmount = Math.round((grossTotal - discountAmount) * 0.16); // 16% Kenyan VAT
  const netTotal = (grossTotal - discountAmount) + vatAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const quoteText = `NYOTA FM 107.3 · OFFICIAL COMMERCIAL MEDIA QUOTATION
Client: ${clientName} (${sector})
Campaign Flight: ${campaignWeeks} Weeks (${totalSpots} Total Spots)
Selected Daypart: ${daypart} @ KSh ${spotRate.toLocaleString()} / spot
Airtime Subtotal: KSh ${spotSubtotal.toLocaleString()}
Add-on OB Activation: ${includeOB ? 'KSh 180,000 (1x Live Market Broadcast)' : 'None'}
Add-on WhatsApp Push: ${includeWhatsAppPush ? `KSh ${waCost.toLocaleString()}` : 'None'}
Volume Discount (${(discountRate * 100).toFixed(0)}%): -KSh ${discountAmount.toLocaleString()}
16% VAT: KSh ${vatAmount.toLocaleString()}
TOTAL NET INVESTMENT: KSh ${netTotal.toLocaleString()}
Contact: Commercial Directorate, Nyota FM 107.3, Bungoma Town`;

    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <DollarSign size={14} />
            <span className="uppercase tracking-widest font-semibold">Commercial Directorate · Rate Card Engine</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Standard Commercial Rate Cards & KRA 16% VAT Guidelines" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Advertiser Self-Serve Rate Card & Pro-Forma Invoice Builder
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Configure tailored advertising flight packages, apply volume incentives, and generate an authentic pro-forma media quotation for corporate and SME partners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded border border-hairline bg-ink text-xs font-mono text-sage hover:text-paper hover:border-brass transition-all flex items-center gap-1.5"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied Quote' : 'Copy Quote'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded bg-brass text-ink text-xs font-mono font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
          >
            <Printer size={14} />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Configuration Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3.5">
            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Client / Brand Organization
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-xs font-mono text-paper focus:outline-none focus:border-brass"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                  Industry Sector
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as any)}
                  className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-xs font-mono text-paper focus:outline-none focus:border-brass"
                >
                  <option value="Agribusiness">Agribusiness</option>
                  <option value="Banking & SACCO">Banking & SACCO</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="FMCG">FMCG Retail</option>
                  <option value="Public Sector">County Government</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                  Daypart Schedule
                </label>
                <select
                  value={daypart}
                  onChange={(e) => setDaypart(e.target.value as any)}
                  className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-xs font-mono text-paper focus:outline-none focus:border-brass"
                >
                  <option value="Prime Breakfast">Prime Breakfast (06:00-10:00)</option>
                  <option value="Drive Time">Drive Time (16:00-19:00)</option>
                  <option value="Midday Market">Midday Market (10:00-14:00)</option>
                  <option value="Run of Station">Run of Station (Blended)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-sage">Campaign Duration</span>
                  <span className="text-paper font-bold tabular-nums">{campaignWeeks} Weeks</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={campaignWeeks}
                  onChange={(e) => setCampaignWeeks(Number(e.target.value))}
                  className="w-full accent-brass cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-sage">Spots / Day</span>
                  <span className="text-brass font-bold tabular-nums">{spotsPerDay} Spots</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={10}
                  value={spotsPerDay}
                  onChange={(e) => setSpotsPerDay(Number(e.target.value))}
                  className="w-full accent-brass cursor-pointer"
                />
              </div>
            </div>

            {/* Add-ons Toggles */}
            <div className="pt-2 border-t border-hairline space-y-2 text-xs font-mono">
              <label className="flex items-center gap-2 cursor-pointer text-sage hover:text-paper">
                <input
                  type="checkbox"
                  checked={includeOB}
                  onChange={(e) => setIncludeOB(e.target.checked)}
                  className="accent-brass"
                />
                <span>Include 1× Outside Broadcast (OB) Market Activation (+KSh 180,000)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sage hover:text-paper">
                <input
                  type="checkbox"
                  checked={includeWhatsAppPush}
                  onChange={(e) => setIncludeWhatsAppPush(e.target.checked)}
                  className="accent-brass"
                />
                <span>Include WhatsApp Listener Push to 50,000+ Opt-In Contacts (+KSh 35,000/mo)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Pro-Forma Invoice Summary */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-5 space-y-4 shadow-lg text-xs font-mono">
            <div className="flex items-start justify-between border-b border-hairline pb-3">
              <div>
                <span className="text-[10px] text-brass uppercase tracking-widest font-bold block">
                  PRO-FORMA INVOICE
                </span>
                <span className="text-sm font-bold text-paper mt-0.5 block">NYOTA FM 107.3</span>
                <span className="text-[10px] text-sage-dim">PIN: P051284920K · Bungoma Studios</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-sage-dim block">Date</span>
                <span className="text-paper font-bold">October 2026</span>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-2 divide-y divide-hairline/60">
              <div className="flex justify-between pt-1">
                <div>
                  <span className="text-paper font-semibold block">{daypart} 30-sec Spots</span>
                  <span className="text-[10px] text-sage-dim">{totalSpots} spots @ KSh {spotRate.toLocaleString()}</span>
                </div>
                <span className="text-paper font-bold tabular-nums">KSh {spotSubtotal.toLocaleString()}</span>
              </div>

              {includeOB && (
                <div className="flex justify-between pt-2">
                  <div>
                    <span className="text-paper font-semibold block">Hapa Tulipo Market OB Roadshow</span>
                    <span className="text-[10px] text-sage-dim">Live 4-hour broadcast + PA activations</span>
                  </div>
                  <span className="text-paper font-bold tabular-nums">KSh 180,000</span>
                </div>
              )}

              {includeWhatsAppPush && (
                <div className="flex justify-between pt-2">
                  <div>
                    <span className="text-paper font-semibold block">WhatsApp Business API Push</span>
                    <span className="text-[10px] text-sage-dim">Dedicated opt-in broadcast message</span>
                  </div>
                  <span className="text-paper font-bold tabular-nums">KSh {waCost.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 text-emerald-400">
                <span>Volume Partner Incentive ({(discountRate * 100).toFixed(0)}%)</span>
                <span className="font-bold tabular-nums">-KSh {discountAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-2 text-sage">
                <span>16% VAT (Statutory)</span>
                <span className="font-bold tabular-nums">KSh {vatAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Net Total Box */}
            <div className="rounded-lg bg-ink-2 border border-brass/50 p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-brass uppercase tracking-wider block font-bold">
                  TOTAL NET INVESTMENT
                </span>
                <span className="text-[10px] text-sage-dim">Includes broadcast airtime & digital reach</span>
              </div>
              <span className="font-display text-xl sm:text-2xl font-bold text-brass tabular-nums">
                KSh {netTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
