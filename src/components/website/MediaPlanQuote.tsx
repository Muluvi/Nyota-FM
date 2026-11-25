import React, { useState } from 'react';
import { Printer, MessageCircle, Copy, Check } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';
import { Illustrative } from '../Illustrative';
import { spotDayparts, quote, quoteAddOns, RATE_CARD_VALID_UNTIL, VAT_RATE } from '../../data/rateCard';
import { displayValue, formatKsh } from '../../data/format';
import { station } from '../../data/station';
import { printSection } from '../../lib/print';

/**
 * One media-plan and quote preview (replaces the old campaign calculator and quote
 * builder, which used different rates and discount ladders). Rates come from rateCard.ts.
 */
export function MediaPlanQuote() {
  const [client, setClient] = useState('');
  const [daypartId, setDaypartId] = useState<string>(spotDayparts[0].id);
  const [spotsPerDay, setSpotsPerDay] = useState(4);
  const [weeks, setWeeks] = useState(4);
  const [obDays, setObDays] = useState(0);
  const [whatsappPush, setWhatsappPush] = useState(false);
  const [vat, setVat] = useState(true);
  const [copied, setCopied] = useState<'idle' | 'ok' | 'failed'>('idle');

  const q = quote({ daypartId, spotsPerDay, weeks, obDays, whatsappPush, vat });
  const today = new Intl.DateTimeFormat('en-KE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi' }).format(new Date());

  const lines: [string, number][] = [
    [`${q.daypart.label} 30-second spots: ${q.spots} × ${formatKsh(q.daypart.rate)}`, q.airtime],
    ...(q.discount ? ([[`Volume discount on airtime (${Math.round(q.discountRate * 100)}%)`, -q.discount]] as [string, number][]) : []), // data-ok: UI format
    ...(q.ob ? ([[`${quoteAddOns.obDay.label} × ${obDays}`, q.ob]] as [string, number][]) : []),
    ...(q.whatsapp ? ([[quoteAddOns.whatsappPush.label, q.whatsapp]] as [string, number][]) : []),
    ...(q.vat ? ([[`VAT (${Math.round(VAT_RATE * 100)}%)`, q.vat]] as [string, number][]) : []), // data-ok: UI format
  ];
  const text = [
    `NYOTA FM 107.3 · SAMPLE QUOTATION (illustrative, not an invoice)`,
    `Client: ${client || '—'} · Date: ${today} · Valid until: ${displayValue(RATE_CARD_VALID_UNTIL)}`,
    ...lines.map(([l, v]) => `${l}: ${formatKsh(v)}`),
    `Total: ${formatKsh(q.total)}`,
    `Reach: Tier 0, audience survey pending.`,
  ].join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied('ok');
    } catch {
      setCopied('failed');
    }
    setTimeout(() => setCopied('idle'), 2500);
  };

  const field = 'w-full rounded border border-hairline bg-ink-2 px-3 py-2 text-sm text-paper focus:border-brass focus:outline-none';

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">Media plan &amp; quote (preview)</h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Build a sample campaign from the single rate card. Rates are illustrative until the station publishes a dated rate card;
            reach figures wait for the audience survey.
          </p>
        </div>
        <div className="flex gap-2">
          <Illustrative note="Sample quotation; not an invoice" />
          <TierBadge tier={2} method="Rates from src/data/rateCard.ts; volume discount applies to airtime only" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-hairline bg-ink p-4">
          <label className="block text-xs text-sage">
            Client
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Company or county department" className={`mt-1 ${field}`} />
          </label>
          <label className="block text-xs text-sage">
            Daypart
            <select value={daypartId} onChange={(e) => setDaypartId(e.target.value)} className={`mt-1 ${field}`}>
              {spotDayparts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} ({d.hours}) · {formatKsh(d.rate)} per spot
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-sage">
              Spots per day: <span className="font-mono text-brass">{spotsPerDay}</span>
              <input type="range" min={1} max={12} value={spotsPerDay} onChange={(e) => setSpotsPerDay(Number(e.target.value))} className="w-full accent-brass" />
            </label>
            <label className="block text-xs text-sage">
              Weeks: <span className="font-mono text-brass">{weeks}</span>
              <input type="range" min={1} max={12} value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className="w-full accent-brass" />
            </label>
          </div>
          <label className="block text-xs text-sage">
            Outside-broadcast days: <span className="font-mono text-brass">{obDays}</span>
            <input type="range" min={0} max={4} value={obDays} onChange={(e) => setObDays(Number(e.target.value))} className="w-full accent-brass" />
          </label>
          <label className="flex items-center gap-2 text-xs text-sage">
            <input type="checkbox" checked={whatsappPush} onChange={(e) => setWhatsappPush(e.target.checked)} className="accent-brass" />
            {quoteAddOns.whatsappPush.label}
          </label>
          <label className="flex items-center gap-2 text-xs text-sage">
            <input type="checkbox" checked={vat} onChange={(e) => setVat(e.target.checked)} className="accent-brass" />
            Add VAT
          </label>
        </div>

        <div id="media-quote" className="space-y-3 rounded-xl border border-hairline bg-ink p-5 text-xs font-mono">
          <div className="flex justify-between border-b border-hairline pb-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brass">Sample quotation · illustrative, not an invoice</p>
              <p className="text-paper">{station.name} · Bungoma</p>
              <p className="text-sage-dim">Client: {client || '—'}</p>
            </div>
            <div className="text-right text-sage-dim">
              <p>{today}</p>
              <p>Valid until: {displayValue(RATE_CARD_VALID_UNTIL)}</p>
            </div>
          </div>
          <table className="w-full">
            <caption className="sr-only">Quote lines</caption>
            <tbody>
              {lines.map(([l, v]) => (
                <tr key={l} className="border-b border-hairline/60">
                  <th scope="row" className="py-1.5 text-left font-normal text-sage">{l}</th>
                  <td className="py-1.5 text-right text-paper tabular-nums">{formatKsh(v)}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="pt-2 text-left text-paper">Total</th>
                <td className="pt-2 text-right text-base font-bold text-brass tabular-nums" aria-live="polite">{formatKsh(q.total)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sage-dim font-body">Reach: Tier 0, audience survey pending. Prices subject to the published rate card.</p>
          <div className="flex flex-wrap gap-2 pt-1 print:hidden">
            <button type="button" onClick={() => printSection('media-quote')} className="flex items-center gap-1.5 rounded border border-hairline px-3 py-2 text-sage hover:border-brass hover:text-paper">
              <Printer size={13} /> Print
            </button>
            {station.salesWhatsApp && (
              <a href={`https://wa.me/${station.salesWhatsApp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded border border-moss/60 px-3 py-2 text-paper hover:bg-moss/15">
                <MessageCircle size={13} /> Send via WhatsApp
              </a>
            )}
            <button type="button" onClick={copy} className="flex items-center gap-1.5 rounded border border-hairline px-3 py-2 text-sage hover:border-brass hover:text-paper">
              {copied === 'ok' ? <Check size={13} /> : <Copy size={13} />} {copied === 'ok' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
