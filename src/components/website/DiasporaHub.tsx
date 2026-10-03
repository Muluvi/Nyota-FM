import React, { useState } from 'react';
import { Globe2, Clock, Send, DollarSign, MessageCircle, Heart, Check, Sparkles } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function DiasporaHub() {
  const [diasporaLocation, setDiasporaLocation] = useState<'Nairobi / Mombasa' | 'London (UK)' | 'Dallas / Atlanta (USA)' | 'Doha / Dubai (Gulf)'>('London (UK)');
  const [shoutoutName, setShoutoutName] = useState('Dr. Chris Wanyonyi');
  const [shoutoutMsg, setShoutoutMsg] = useState('Mulembe to my parents in Bungoma Kanduyi! Tuning in live online while heading to work.');
  const [sent, setSent] = useState<boolean>(false);

  const timezones = {
    'Nairobi / Mombasa': { timeDiff: 'Local EAT', streamLatency: '1.2s' },
    'London (UK)': { timeDiff: 'EAT -2 hours', streamLatency: '2.4s' },
    'Dallas / Atlanta (USA)': { timeDiff: 'EAT -8 hours', streamLatency: '3.1s' },
    'Doha / Dubai (Gulf)': { timeDiff: 'EAT +1 hour', streamLatency: '1.8s' },
  };

  const handleSendShoutout = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Globe2 size={14} />
            <span className="uppercase tracking-widest font-semibold">Global Community · Strategy 5.17</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Central Bank of Kenya (CBK) Diaspora Remittance Annual Reports" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Global Western Diaspora Hub & Remittance Media Gateway
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Connect the high-purchasing-power Western Kenya diaspora residing in Nairobi, the UK, the US, and the Gulf. Streamlined Sunday evening diaspora shout-outs and real-estate remittance advertising.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded text-xs font-mono text-brass bg-brass/10 border border-brass/30 font-semibold">
            CBK Western Remittances: $420M+ Annual
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timezone & Diaspora Cities */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3">
            <span className="text-xs font-mono text-sage-dim uppercase tracking-wider block font-bold">
              SELECT DIASPORA STREAMING CLUSTER
            </span>
            <div className="space-y-1.5">
              {(['London (UK)', 'Dallas / Atlanta (USA)', 'Doha / Dubai (Gulf)', 'Nairobi / Mombasa'] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setDiasporaLocation(loc)}
                  className={`w-full text-left p-2.5 rounded border text-xs font-mono transition-all flex items-center justify-between ${
                    diasporaLocation === loc
                      ? 'border-brass bg-brass/10 text-paper font-semibold'
                      : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                  }`}
                >
                  <span>{loc}</span>
                  <span className="text-[10px] text-brass">{timezones[loc].timeDiff}</span>
                </button>
              ))}
            </div>

            <div className="rounded bg-ink-2 border border-hairline p-3 text-xs font-mono space-y-1.5 text-sage">
              <div className="flex justify-between">
                <span>CDN Streaming Protocol:</span>
                <strong className="text-paper">HLS / Icecast AAC+</strong>
              </div>
              <div className="flex justify-between">
                <span>Global Edge Latency:</span>
                <strong className="text-emerald-400">{timezones[diasporaLocation].streamLatency}</strong>
              </div>
              <div className="flex justify-between">
                <span>Remittance Target:</span>
                <strong className="text-brass">Land & Home Construction</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Live Diaspora On-Air Shoutout Form */}
        <div className="lg:col-span-7 rounded-xl border border-hairline bg-ink p-5 space-y-4">
          <span className="text-[10px] font-mono text-brass uppercase tracking-wider font-bold block">
            SUNDAY DIASPORA LIVE ON-AIR SHOUTOUT DISPATCH
          </span>

          <form onSubmit={handleSendShoutout} className="space-y-3">
            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Your Name & Current City
              </label>
              <input
                type="text"
                value={shoutoutName}
                onChange={(e) => setShoutoutName(e.target.value)}
                className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-xs font-mono text-paper focus:outline-none focus:border-brass"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Dedication Message to Family in Western Kenya
              </label>
              <textarea
                rows={3}
                value={shoutoutMsg}
                onChange={(e) => setShoutoutMsg(e.target.value)}
                className="w-full rounded bg-ink-2 border border-hairline px-3 py-2 text-xs font-sans text-paper focus:outline-none focus:border-brass resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-sage-dim">
                Read live on *Mwangaza wa Usiku* (19:00–22:00)
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-brass text-ink font-mono text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
              >
                {sent ? <Check size={14} /> : <Send size={14} />}
                <span>{sent ? 'Dispatched to Studio' : 'Send to Studio Mic'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
