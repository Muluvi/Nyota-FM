import React, { useState } from 'react';
import Reveal from './Reveal';
import MPesaStepper from './MPesaStepper';
import TouchpointFilter from './TouchpointFilter';
import Top10Packages from './Top10Packages';
import RevenueChart from './RevenueChart';
import DashboardMockup from './DashboardMockup';
import { Accordion } from './Accordion';
import { Link2 } from 'lucide-react';

const REVENUE_STREAMS = [
  { platform: 'FB/IG/TikTok', name: 'Sponsored posts', desc: 'Local business pays per post', amount: '10k–30k' },
  { platform: 'FB/TikTok Live', name: 'Live video partners', desc: 'Sponsor a live show/event', amount: '5k–15k' },
  { platform: 'All', name: 'Event promotions', desc: 'Paid promo of advertiser events', amount: '3k–10k' },
  { platform: 'All', name: 'Affiliate marketing', desc: 'Commission on referred sales', amount: '1k–5k' },
  { platform: 'All → Till', name: 'M-Pesa listener support', desc: 'Voluntary "buy the team chai"', amount: '2k–8k' },
  { platform: 'TikTok', name: 'TikTok Live gifts', desc: 'Virtual gifts → cash (upside)', amount: '1k–5k' },
  { platform: 'YouTube', name: 'YouTube ad revenue', desc: 'Per-view ad share (compounds)', amount: '500–3k' },
  { platform: 'Offline', name: 'SMS alert subs', desc: 'Paid market/news alerts', amount: '2k–6k' }
];

const BTL_STREAMS = [
  { name: 'Market Activation Package', desc: 'Sponsor a full Nyota market day', amount: '10k–25k/event' },
  { name: 'Street Team T-shirt', desc: 'Logo on 20 T-shirts for a season', amount: '8k–15k/qtr' },
  { name: 'Outdoor Branding', desc: 'Logo on stall banners + boda stickers', amount: '5k–15k/mo' },
  { name: 'Contest Prize', desc: 'Business supplies + named as sponsor', amount: '3k–10k/event' }
];

const KPIS = [
  { cat: 'Facebook/IG', metrics: 'Follower growth, reach, engagement, link clicks (CTR), video views' },
  { cat: 'WhatsApp', metrics: 'Channel followers, broadcast open signals, group activity, opt-ins' },
  { cat: 'TikTok', metrics: 'Followers, views, shares, Live gift value, challenge participation' },
  { cat: 'YouTube', metrics: 'Subscribers, watch time, ad revenue' },
  { cat: 'M-Pesa', metrics: 'Number & value of transactions, per-event Till totals' },
  { cat: 'Sponsored', metrics: 'Conversions, repeat advertisers, revenue/advertiser' },
  { cat: 'BTL', metrics: 'Event attendance, CRM opt-ins, QR scans, code-word redemptions, Street Team reports' }
];

export default function MoneySection() {
  const [openKpi, setOpenKpi] = useState<string | null>('Facebook/IG');

  return (
    <section className="py-24 relative color-shift-money" id="money">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <Reveal>
            <h2 className="text-[var(--color-accent)] font-mono text-sm md:text-base tracking-widest uppercase mb-4 transition-colors duration-500">07 · The Money</h2>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-maize-cream mb-6">
              Monetization & Measuring Success
            </h3>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Revenue Streams Table */}
          <div className="space-y-4">
            <Reveal>
              <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-6">Digital Revenue Streams</h4>
            </Reveal>
            {REVENUE_STREAMS.map((stream, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="glass-panel p-4 flex justify-between items-center gap-4">
                  <div>
                    <h6 className="text-maize-cream text-sm font-medium">{stream.name}</h6>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-[9px] font-mono uppercase bg-white/10 px-1.5 py-0.5 rounded text-static-grey">{stream.platform}</span>
                      <span className="text-xs text-static-grey">{stream.desc}</span>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-[var(--color-accent-text)] whitespace-nowrap">
                    {stream.amount}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-6 mt-12">BTL Revenue Streams</h4>
            </Reveal>
            {BTL_STREAMS.map((stream, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="glass-panel p-4 flex justify-between items-center gap-4 border-l-2 border-l-[var(--color-accent-text)]">
                  <div>
                    <h6 className="text-maize-cream text-sm font-medium">{stream.name}</h6>
                    <span className="text-xs text-static-grey">{stream.desc}</span>
                  </div>
                  <div className="font-mono text-sm text-[var(--color-accent-text)] whitespace-nowrap">
                    {stream.amount}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* M-Pesa Setup */}
          <div>
            <Reveal>
              <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-6">M-Pesa Setup</h4>
              <p className="text-static-grey mb-8">The most critical infrastructure for capturing micro-payments and advertiser fees.</p>
            </Reveal>
            <MPesaStepper />
          </div>
        </div>

        {/* 39 Touchpoints & Top 10 */}
        <div className="border-t border-static-grey/20 pt-16">
          <Reveal>
            <h3 className="text-2xl md:text-4xl font-display uppercase tracking-tight text-maize-cream mb-4 text-center">
              39 Monetizable Touchpoints
            </h3>
            <p className="text-static-grey text-center max-w-2xl mx-auto mb-8">
              A menu of everything you can sell. Pricing reflects what Western Kenya SMEs can actually afford (KES 1k–10k).
            </p>
          </Reveal>
          
          <TouchpointFilter />
          <Top10Packages />
        </div>

        {/* Revenue Projection & Dash */}
        <div className="border-t border-static-grey/20 pt-16 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
             <RevenueChart />
          </div>
          <div>
             <DashboardMockup />
          </div>
        </div>

        {/* KPIs & Attribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24">
          <div>
            <Reveal>
              <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-6">KPI Matrix</h4>
            </Reveal>
            {KPIS.map((kpi, idx) => (
              <Accordion 
                key={idx} 
                title={kpi.cat} 
                isOpen={openKpi === kpi.cat} 
                onClick={() => setOpenKpi(openKpi === kpi.cat ? null : kpi.cat)}
              >
                {kpi.metrics}
              </Accordion>
            ))}
          </div>
          
          <div>
            <Reveal>
              <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-6">BTL-to-Digital Attribution</h4>
              <p className="text-static-grey text-sm mb-6">Closing the loop between the shamba and the smartphone.</p>
            </Reveal>
            
            <div className="space-y-4">
              <Reveal delay={100}>
                <div className="glass-panel p-4 flex gap-4">
                  <Link2 className="text-[var(--color-accent-text)] shrink-0" />
                  <div>
                    <h6 className="text-maize-cream text-sm font-medium mb-1">Unique M-Pesa Till/Paybill per event</h6>
                    <p className="text-xs text-static-grey italic">"Your Webuye activation earned KES 6,000 directly on-site."</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="glass-panel p-4 flex gap-4">
                  <Link2 className="text-[var(--color-accent-text)] shrink-0" />
                  <div>
                    <h6 className="text-maize-cream text-sm font-medium mb-1">Dedicated SMS shortcodes</h6>
                    <p className="text-xs text-static-grey italic">"140 people texted the shortcode we printed on your banners."</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="glass-panel p-4 flex gap-4">
                  <Link2 className="text-[var(--color-accent-text)] shrink-0" />
                  <div>
                    <h6 className="text-maize-cream text-sm font-medium mb-1">Secret code word</h6>
                    <p className="text-xs text-static-grey italic">"55 listeners came to the shop today using the radio code word."</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="glass-panel p-4 flex gap-4">
                  <Link2 className="text-[var(--color-accent-text)] shrink-0" />
                  <div>
                    <h6 className="text-maize-cream text-sm font-medium mb-1">QR code tracking (Bitly)</h6>
                    <p className="text-xs text-static-grey italic">"The poster at the church noticeboard got 82 scans this week."</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
