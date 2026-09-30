import React from 'react';
import Reveal from './Reveal';

const TOP_10 = [
  { rank: 1, name: 'Market Activation Package', why: 'Tangible, in-person, drives foot traffic', price: '10k–25k/event', glow: true },
  { rank: 2, name: 'Facebook sponsored post', why: 'Cheap, visible, measurable', price: '3,000/post' },
  { rank: 3, name: 'Boda Boda Sticker Campaign', why: 'Unmissable moving ads', price: '8,000/mo' },
  { rank: 4, name: '"Business of the Week" feature', why: 'Prestige + reach', price: '5,000/week' },
  { rank: 5, name: 'Stall/Stage banner branding', why: 'Physical, durable', price: '5,000/mo' },
  { rank: 6, name: 'Cross-platform social package', why: 'One price, all platforms', price: '10,000/mo' },
  { rank: 7, name: 'WhatsApp Channel broadcast', why: 'Direct to phones', price: '2,000/broadcast' },
  { rank: 8, name: 'Church noticeboard poster', why: 'Trusted community space', price: '2,000/mo' },
  { rank: 9, name: 'Sponsored agri-tips series', why: 'Targets farmers (P1)', price: '6,000/mo' },
  { rank: 10, name: 'Live-show title sponsor', why: 'Premium recurring', price: '8,000/mo' }
];

const PACKAGES = [
  { name: 'Mulembe Starter', desc: '4 FB posts + 1 WhatsApp broadcast/mo', price: '5,000', per: '/mo', premium: false },
  { name: 'Soko Package', desc: '1 Market Activation + social promo + banner', price: '15,000', per: '/event', premium: false },
  { name: 'Mkulima Package', desc: 'Agri-tips series + market prices board', price: '10,000', per: '/mo', premium: false },
  { name: 'Boss Package', desc: 'Cross-platform + Biz of Week + boda stickers + activation', price: '25,000', per: '/mo', premium: true }
];

export default function Top10Packages() {
  return (
    <div className="py-12 space-y-24">
      {/* Top 10 List */}
      <div>
        <Reveal>
          <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-8">Top 10 Priority Touchpoints</h4>
        </Reveal>
        <div className="space-y-3">
          {TOP_10.map((item, idx) => (
            <Reveal key={item.rank} delay={idx * 50}>
              <div className={`glass-panel p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 ${item.glow ? 'glow-gold' : 'border-white/5'}`}>
                <div className="flex items-center gap-4 flex-1">
                  <div className={`font-display text-2xl w-8 text-center ${item.glow ? 'text-signal-amber' : 'text-static-grey'}`}>{item.rank}</div>
                  <div>
                    <h5 className="text-maize-cream font-medium text-sm md:text-base">{item.name}</h5>
                    <p className="text-xs text-static-grey">{item.why}</p>
                  </div>
                </div>
                <div className={`font-mono text-sm whitespace-nowrap ${item.glow ? 'text-signal-amber' : 'text-mulembe-green'}`}>
                  KES {item.price}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div>
        <Reveal>
          <h4 className="font-display text-2xl uppercase tracking-wider text-maize-cream mb-8">Named Packages for Rate Card</h4>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.name} delay={idx * 100} className="h-full">
              <div className={`relative h-full glass-panel p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 active:scale-95 ${pkg.premium ? 'border-mulembe-green/50 shadow-[0_0_20px_rgba(46,204,113,0.15)] bg-mulembe-green/5' : ''}`}>
                {pkg.premium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-mulembe-green to-signal-amber text-broadcast-night font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Premium
                  </div>
                )}
                <div>
                  <h5 className="font-display text-xl uppercase tracking-wider text-maize-cream mb-2">{pkg.name}</h5>
                  <p className="text-sm text-static-grey mb-6">{pkg.desc}</p>
                </div>
                <div className="border-t border-static-grey/20 pt-4 flex items-baseline gap-1">
                  <span className="text-[10px] font-mono text-static-grey">KES</span>
                  <span className={`font-mono text-2xl font-bold ${pkg.premium ? 'text-mulembe-green' : 'text-maize-cream'}`}>{pkg.price}</span>
                  <span className="text-[10px] font-mono text-static-grey">{pkg.per}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
