import React, { useState, useRef, useEffect } from 'react';
import Reveal from './Reveal';
import WaveformDivider from './WaveformDivider';
import SectionDivider from './SectionDivider';
import { Accordion } from './Accordion';
import AnimatedCounter from './AnimatedCounter';
import CircularProgress from './CircularProgress';
import { Camera } from 'lucide-react';

const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765889247/AZsnL4dMdfGc81To27QzCg-AZsnL4dMtdFVyuKofEOY6Q_20251216_154319_0000_nq9hvp.png',
    color: '#1877F2',
    reach: 69.9,
    figures: 'The most-used platform in Kenya. Skews slightly older and more rural. Cheap on data and pre-loaded on nearly every Android.',
    impact: 'Where a community radio station lives a second life: Live video, event streams, photo albums, and a comment section that becomes a digital baraza.',
    benefits: 'Audience growth (8k–15k followers realistically in 12 months), community interactivity, advertiser appeal, and direct revenue (sponsored posts, in-stream ads).',
    content: 'Market-day alerts, Facebook Live breakfast segments, obituary & church notices, local football scores.',
    ugcTitle: 'Soko la Leo',
    ugcDesc: 'Listeners at the market send a photo/price via WhatsApp, you repost on Facebook with credit. Sourced directly from BTL market stands.',
    personas: [{id: 'p1', hex: '#22c55e'}, {id: 'p2', hex: '#eab308'}, {id: 'p3', hex: '#3b82f6'}, {id: 'p5', hex: '#a855f7'}]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1780508491/Digital_Inline_Green_RGB_2026_b09uro.png',
    color: '#25D366',
    reach: 56.0,
    figures: 'The #1 communication tool. Works on the cheapest phones, often zero-rated in "free WhatsApp after bundle" plans. Private community conversation.',
    impact: 'The closest digital equivalent to sitting at the baraza. Voice notes especially bridge low literacy — a huge advantage in rural Western Kenya.',
    benefits: 'Interactivity (voice notes, dedications), retention (WhatsApp Channel pushes content without algorithm interference), and revenue (sponsored broadcasts).',
    content: 'Voice notes in Luhya/Kiswahili; bilingual text alerts for news, market prices, show times.',
    ugcTitle: 'Sauti ya Wananchi',
    ugcDesc: 'Voice-note of the day from a listener, played on air AND posted to the Channel. Sourced from BTL events.',
    personas: [{id: 'p1', hex: '#22c55e'}, {id: 'p2', hex: '#eab308'}]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765720754/TikTok-logo-RGB-Horizontal-white_vh4efn.png',
    color: '#ffffff',
    reach: 30.3,
    figures: 'Dominant among the 15–34 youth. 38% of Kenyans consume news via TikTok — outpacing Europe and the US.',
    impact: 'Used to promote the station and grow youth listenership. Algorithm can put a small station\'s clip in front of hundreds of thousands.',
    benefits: 'Explosive organic reach, youth recall, and revenue via TikTok LIVE Gifts (Creator Rewards/Fund is not available in Kenya).',
    content: 'Behind-the-scenes, presenter comedy skits in Lubukusu/sheng, Luhya word of the day, dance/music trends.',
    ugcTitle: 'Nyota Challenge',
    ugcDesc: 'A code-word dance/slogan launched on air; listeners film themselves at your branded market backdrop and tag #NyotaFM.',
    personas: [{id: 'p3', hex: '#3b82f6'}, {id: 'p4', hex: '#ec4899'}]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1768409776/Instagram_Glyph_Gradient_kvn0tu.png',
    color: '#E1306C',
    reach: 22.0,
    figures: 'Overtook YouTube in 2025 web traffic. Skewing urban, youth, aspirational.',
    impact: 'Where a station looks professional to bigger advertisers and partners.',
    benefits: 'Advertiser credibility (helps close deals with banks, saccos, Kitale retailers), Reels reach, and sponsored stories.',
    content: 'Reels (repurposed TikToks), event photo carousels, presenter portraits, story polls.',
    ugcTitle: 'Faces of Western',
    ugcDesc: 'Repost listener photos from activations with a branded frame.',
    personas: [{id: 'p4', hex: '#ec4899'}, {id: 'p5', hex: '#a855f7'}]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765721612/yt_logo_fullcolor_white_digital_d6vxgj.png',
    color: '#FF0000',
    reach: 26.6,
    figures: 'The go-to for long-form video. Slower-growing but the only major platform that pays Kenyan creators reliably per view.',
    impact: 'Turns your radio shows into a permanent, searchable, monetizable archive.',
    benefits: 'Ad revenue (predictable payouts of KES 100–200+ per 1k views), podcast home, and advertiser sponsorship (pre-roll).',
    content: 'Full show recordings, "Nyota Podcast" (video), Luhya music/culture documentaries, agricultural how-to explainers.',
    ugcTitle: 'Community Showcase',
    ugcDesc: 'Record community talent at your events, upload as a series.',
    personas: [{id: 'p1', hex: '#22c55e'}, {id: 'p4', hex: '#ec4899'}]
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1763590344/X_idVRwaKp9b_4_vpw8j2.png',
    color: '#ffffff',
    reach: 15.0,
    figures: 'Declined in Kenya. Usage concentrated among journalists, politicians, and urban elites — a tiny slice of your rural audience.',
    impact: 'Useful for breaking news, tagging county officials, and being seen by other media and government.',
    benefits: 'Authority & speed. Low effort (auto-post headlines). Lowest priority.',
    content: 'News headlines, live event threads, tagging leaders during activations.',
    ugcTitle: 'News Tips',
    ugcDesc: 'Repost listener news tips (verified first via editorial policy).',
    personas: []
  }
];

export default function PlatformsSection() {
  const [activeTab, setActiveTab] = useState(PLATFORMS[0].id);
  const [openAccordion, setOpenAccordion] = useState<string | null>('a');
  
  const platform = PLATFORMS.find(p => p.id === activeTab) || PLATFORMS[0];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setOpenAccordion('a');
  };

  return (
    <section id="platforms" className="py-16 md:py-24 min-h-[50vh] px-4 md:px-0" style={{ '--platform-color': platform.color } as React.CSSProperties}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[11px] font-mono text-[var(--platform-color)] uppercase tracking-[2px] mb-4 transition-colors duration-500">04 · The Channels</div>
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.1] mb-12 uppercase text-maize-cream max-w-4xl">
            Platform-by-Platform Deep Dive
          </h2>
        </Reveal>

        {/* Marquee */}
        <div className="mb-12 overflow-hidden mask-gradient py-4">
          <div className="flex w-max animate-marquee items-center gap-16">
            {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
              <img key={i} src={p.logo} alt={p.name} className="h-6 w-auto object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all" loading="lazy" />
            ))}
          </div>
        </div>

        {/* Sticky Tabs */}
        <div 
          className="sticky top-[72px] md:top-[80px] z-30 bg-broadcast-night/90 backdrop-blur-md py-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 border-b border-white/5 overflow-x-auto hide-scrollbar"
        >
          <div className="flex gap-2 min-w-max" role="tablist" aria-label="Platforms">
            {PLATFORMS.map((p) => {
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  id={`tab-${p.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${p.id}`}
                  onClick={() => handleTabClick(p.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-2 focus-visible:ring-offset-broadcast-night ${
                    isActive 
                      ? `bg-white/10 border-[${p.color}]/50 shadow-[0_0_15px_rgba(255,255,255,0.1)]` 
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}
                  style={isActive ? { borderColor: p.color, boxShadow: `0 0 15px ${p.color}40` } : {}}
                >
                  <img src={p.logo} alt={p.name} className={`h-4 ${isActive ? '' : 'opacity-80 hover:opacity-100'}`} />
                  <span className={`text-[12px] font-bold tracking-wide ${isActive ? 'text-maize-cream' : 'text-static-grey'}`}>
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[400px]" id={`panel-${platform.id}`} role="tabpanel" aria-labelledby={`tab-${platform.id}`}>
          <div className="lg:col-span-2 space-y-2 relative">
            <Accordion title="A. The Figures" isOpen={openAccordion === 'a'} onClick={() => setOpenAccordion(openAccordion === 'a' ? null : 'a')}>
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="24" className="stroke-white/10" strokeWidth="4" fill="none" />
                    <circle 
                      cx="32" cy="32" r="24" 
                      className="transition-all duration-1000 ease-out" 
                      strokeWidth="4" fill="none" 
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 * (1 - platform.reach / 100)}
                      strokeLinecap="round"
                      stroke={platform.color}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-maize-cream">
                    {platform.reach}%
                  </div>
                </div>
                <p>{platform.figures}</p>
              </div>
            </Accordion>
            
            <Accordion title="B. Impact on Radio" isOpen={openAccordion === 'b'} onClick={() => setOpenAccordion(openAccordion === 'b' ? null : 'b')}>
              <p>{platform.impact}</p>
            </Accordion>
            
            <Accordion title="C. Benefits for Nyota FM" isOpen={openAccordion === 'c'} onClick={() => setOpenAccordion(openAccordion === 'c' ? null : 'c')}>
              <p className="mb-4">{platform.benefits}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {platform.personas.map(p => (
                  <a key={p.id} href="#listeners" className="px-2 py-1 rounded border bg-white/5 text-[10px] font-mono uppercase tracking-wider text-maize-cream hover:bg-white/10 transition-colors" style={{ borderColor: p.hex }}>
                    {p.id.toUpperCase()}
                  </a>
                ))}
              </div>
            </Accordion>

            <Accordion title="D. Content Formats & Language" isOpen={openAccordion === 'd'} onClick={() => setOpenAccordion(openAccordion === 'd' ? null : 'd')}>
              <p>{platform.content}</p>
            </Accordion>
          </div>

          <div className="lg:col-span-1">
            <Reveal delay={200}>
              <div className="glass-panel p-6 btn-shine overflow-hidden relative border-t-2" style={{ borderTopColor: platform.color }}>
                <div className="flex items-center gap-2 mb-4 text-[var(--platform-color)]">
                  <Camera className="w-5 h-5" />
                  <span className="font-mono text-[11px] uppercase tracking-widest font-bold">UGC Format</span>
                </div>
                <h4 className="font-display text-xl uppercase text-maize-cream mb-3">{platform.ugcTitle}</h4>
                <p className="text-sm text-static-grey leading-relaxed">{platform.ugcDesc}</p>
              </div>
            </Reveal>

            {platform.id === 'whatsapp' && (
              <Reveal delay={400} className="mt-6">
                <div className="glass-panel p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest font-bold text-static-grey mb-6">Progression Path</div>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {/* Simplified timeline for space */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-broadcast-night bg-[#25D366] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-white/5 border border-white/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[12px] text-maize-cream">1. Groups</span>
                          <span className="text-[9px] font-mono text-mulembe-green bg-mulembe-green/10 px-1.5 py-0.5 rounded">FREE</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-broadcast-night bg-[#25D366] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-white/5 border border-white/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[12px] text-maize-cream">2. Channel</span>
                          <span className="text-[9px] font-mono text-mulembe-green bg-mulembe-green/10 px-1.5 py-0.5 rounded">FREE</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-broadcast-night bg-white/20 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-white/5 border border-white/10 opacity-70">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[12px] text-maize-cream">3. API</span>
                          <span className="text-[9px] font-mono text-signal-amber bg-signal-amber/10 px-1.5 py-0.5 rounded">PAID</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
        
        {/* Priority Verdict */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <Reveal>
            <div className="text-[11px] font-mono text-static-grey uppercase tracking-[2px] mb-6">Priority Verdict</div>
            <div className="flex flex-wrap gap-4 font-mono text-sm">
              <span className="flex items-center gap-2"><span className="text-signal-amber">1.</span> FB + WA (Core)</span>
              <span className="text-white/20">/</span>
              <span className="flex items-center gap-2"><span className="text-signal-amber">2.</span> TikTok (Growth)</span>
              <span className="text-white/20">/</span>
              <span className="flex items-center gap-2"><span className="text-signal-amber">3.</span> YouTube (Earn)</span>
              <span className="text-white/20">/</span>
              <span className="flex items-center gap-2"><span className="text-static-grey">4.</span> IG (Polish)</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
