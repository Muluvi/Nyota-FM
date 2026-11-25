import React, { useEffect, useState } from 'react';
import { Globe2, Send } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';
import { Illustrative } from '../Illustrative';
import { station } from '../../data/station';

/**
 * Diaspora shout-out preview. Times are computed live with Intl for each city;
 * shout-outs open a pre-filled WhatsApp message to the station (nothing is stored here).
 * Remittance context comes from facts.ts (key: remittances).
 */
const CITIES = [
  { id: 'us', label: 'United States (Dallas)', zone: 'America/Chicago' },
  { id: 'gulf', label: 'Gulf (Doha)', zone: 'Asia/Qatar' },
  { id: 'de', label: 'Germany (Berlin)', zone: 'Europe/Berlin' },
  { id: 'uk', label: 'United Kingdom (London)', zone: 'Europe/London' },
  { id: 'nbo', label: 'Nairobi', zone: 'Africa/Nairobi' },
] as const;

const timeIn = (zone: string, now: Date) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', weekday: 'short' }).format(now);

/** Hours ahead (+) or behind (−) Bungoma (EAT) right now, accounting for daylight saving. */
function offsetFromEat(zone: string, now: Date): number {
  const minutes = (z: string) => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: z, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(now);
    const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
    return Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute')) / 60000;
  };
  return Math.round((minutes(zone) - minutes('Africa/Nairobi')) / 60);
}

export function DiasporaHub() {
  const [cityId, setCityId] = useState<(typeof CITIES)[number]['id']>('us');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const city = CITIES.find((c) => c.id === cityId)!;
  const diff = offsetFromEat(city.zone, now);
  const waText = `Diaspora shout-out for Nyota FM\nFrom: ${name} (${city.label})\nMessage: ${message}`;
  const canSend = Boolean(station.salesWhatsApp && name.trim() && message.trim());

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="border-b border-hairline pb-4 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-brass">
          <Globe2 size={14} />
          <span className="uppercase tracking-widest font-semibold">Diaspora · Strategy 5.17</span>
          <TierBadge factId="remittances" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">Diaspora shout-outs (preview)</h3>
        <p className="text-xs sm:text-sm text-sage max-w-2xl">
          Kenya received US$5.04 billion in remittances in 2025. The US sends the largest share; the UK sends little. No regional
          split exists, so the Western Kenya diaspora market is not sized here. Lead with the US, the Gulf and Germany.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-2" role="radiogroup" aria-label="Your city">
          {CITIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={c.id === cityId}
              onClick={() => setCityId(c.id)}
              className={`w-full text-left p-2.5 rounded border text-xs font-mono flex items-center justify-between ${
                c.id === cityId ? 'border-brass bg-brass/10 text-paper font-semibold' : 'border-hairline bg-ink text-sage hover:text-paper'
              }`}
            >
              <span>{c.label}</span>
              <span className="text-brass">{timeIn(c.zone, now)}</span>
            </button>
          ))}
          <p className="text-xs text-sage pt-1">
            Bungoma now: <strong className="text-paper">{timeIn('Africa/Nairobi', now)}</strong> ·{' '}
            {diff === 0 ? 'same time as Bungoma' : `${Math.abs(diff)} h ${diff > 0 ? 'ahead of' : 'behind'} Bungoma`}
          </p>
        </div>

        <form
          className="lg:col-span-7 rounded-xl border border-hairline bg-ink p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSend) window.open(`https://wa.me/${station.salesWhatsApp}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener');
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-brass uppercase tracking-wider font-bold">Send a shout-out</span>
            <Illustrative note="Preview of a planned service; the diaspora show time is to be confirmed" />
          </div>
          <div>
            <label htmlFor="dh-name" className="text-xs font-mono text-sage-dim block mb-1">Your name</label>
            <input
              id="dh-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-sm text-paper focus:outline-none focus:border-brass"
            />
          </div>
          <div>
            <label htmlFor="dh-msg" className="text-xs font-mono text-sage-dim block mb-1">Message to family in Western Kenya</label>
            <textarea
              id="dh-msg"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-sm text-paper focus:outline-none focus:border-brass resize-none"
            />
          </div>
          <p className="text-[11px] text-sage-dim">
            Opens WhatsApp with your message to the station. Nothing is stored on this site. Read-outs happen in the planned
            Sunday diaspora block (time to be confirmed).
          </p>
          <button
            type="submit"
            disabled={!canSend}
            className="px-4 py-2 rounded bg-brass text-ink font-mono text-xs font-bold hover:brightness-110 disabled:opacity-40 flex items-center gap-1.5"
          >
            <Send size={14} /> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
