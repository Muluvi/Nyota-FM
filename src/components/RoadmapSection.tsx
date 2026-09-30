import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import ContentAtomization from './ContentAtomization';
import AudienceFunnel from './AudienceFunnel';
import GamificationCycle from './GamificationCycle';
import StreetTeamIcons from './StreetTeamIcons';
import RiskAccordion from './RiskAccordion';
import EditorialPolicyPoster from './EditorialPolicyPoster';
import { Mic, CheckCircle2 } from 'lucide-react';

export default function RoadmapSection() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          const scrollProgress = Math.max(0, windowHeight / 2 - rect.top);
          setLineHeight(scrollProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 relative" id="journey">
      <div className="max-w-7xl mx-auto px-6 relative" ref={containerRef}>
        
        <div className="mb-24 text-center md:text-left">
          <Reveal>
            <h2 className="text-signal-amber font-mono text-sm md:text-base tracking-widest uppercase mb-4">06 · The Journey</h2>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-maize-cream mb-6">
              Implementation Roadmap
            </h3>
          </Reveal>
        </div>

        {/* Master Spine Timeline (desktop) */}
        <div className="hidden md:block absolute top-64 bottom-0 left-6 w-px bg-static-grey/20">
          <div 
            className="absolute top-0 left-0 w-full bg-signal-amber transition-all duration-75"
            style={{ height: `${lineHeight}px`, maxHeight: '100%' }}
          ></div>
        </div>

        <div className="md:pl-16 space-y-32">
          
          {/* Phase 1 */}
          <TimelinePhase id="p1" title="Phase 1 — Days 1–30: Setup">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <PhaseCard title="Studio Transformation">
                  Build the content nook. Set up all platforms — Facebook page optimization, WhatsApp Business App + Channel, TikTok, YouTube, Instagram, X. Register M-Pesa Till/Paybill and ODPC.
                </PhaseCard>
                <PhaseCard title="Content Bank Creation">
                  Film 15–20 evergreen clips (Luhya word of the day, presenter intros, station story, agricultural tips) so you never launch empty.
                </PhaseCard>
                
                <Reveal>
                  <h4 className="text-sm font-mono text-signal-amber uppercase tracking-widest mb-4">On-Air Drivers</h4>
                  <div className="space-y-3">
                    <OnAirDriver time="Breakfast" script="Tupo Facebook Live sasa hivi — jiunge, andika habari za soko lako!" />
                    <OnAirDriver time="Mid-morning" script="Tuma voice note yako kwa WhatsApp namba 07XX — sauti yako iwe hewani!" />
                    <OnAirDriver time="Drive-time" script="Follow Nyota FM TikTok, angalia challenge ya wiki hii kwenye stand yetu sokoni." />
                  </div>
                </Reveal>
              </div>
              
              <div>
                <Reveal>
                  <h4 className="text-sm font-mono text-signal-amber uppercase tracking-widest mb-4">Team Skills Audit & Micro-Training</h4>
                  <div className="glass-panel overflow-hidden">
                    <div className="p-4 border-b border-static-grey/20 flex justify-between items-center bg-broadcast-night/50">
                      <span className="text-maize-cream font-medium">Training Schedule</span>
                      <span className="font-mono text-xs px-2 py-1 rounded-full bg-mulembe-green/20 text-mulembe-green border border-mulembe-green/40 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-mulembe-green animate-pulse"></span>
                        KES 0 COST
                      </span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm border-b border-static-grey/10 pb-4">
                        <span className="text-maize-cream">Digital Lead</span>
                        <span className="text-static-grey">FB/StreamYard live, Meta Business Suite (Week 1)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm border-b border-static-grey/10 pb-4">
                        <span className="text-maize-cream">Presenter 2</span>
                        <span className="text-static-grey">CapCut editing, TikTok trends (Week 1)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm border-b border-static-grey/10 pb-4">
                        <span className="text-maize-cream">Producer</span>
                        <span className="text-static-grey">Audacity, BM800 setup (Week 1)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm pb-2">
                        <span className="text-maize-cream">BTL Coordinator</span>
                        <span className="text-static-grey">CRM sheet, QR codes, activation kit (Week 2)</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </TimelinePhase>

          {/* Phase 2 */}
          <TimelinePhase id="p2" title="Phase 2 — Days 31–60: Consistent Execution">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <Reveal>
                  <p className="text-static-grey leading-relaxed">
                    Daily/weekly posting begins. First sponsored trial — offer one friendly local advertiser (an agrovet or sacco) a free/discounted sponsored post to build a case study.
                  </p>
                </Reveal>
                <Reveal>
                  <div className="glass-panel p-6 border-l-4 border-l-signal-amber">
                    <h4 className="text-maize-cream font-medium mb-2">Content Atomization Workflow</h4>
                    <p className="text-sm text-static-grey mb-4">A single 5-minute radio interview or a market-activation recording becomes six different touchpoints.</p>
                  </div>
                </Reveal>
              </div>
              <div className="bg-broadcast-night rounded-xl border border-static-grey/10 overflow-hidden flex items-center justify-center">
                <ContentAtomization />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Reveal>
                  <h4 className="text-sm font-mono text-signal-amber uppercase tracking-widest mb-6">Digital Audience Funnel</h4>
                  <AudienceFunnel />
                </Reveal>
              </div>
              <div>
                <Reveal>
                  <h4 className="text-sm font-mono text-signal-amber uppercase tracking-widest mb-6">1-Week Content Calendar</h4>
                  <div className="flex overflow-x-auto scroll-snap-x hide-scrollbar gap-4 pb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="flex-none w-64 scroll-snap-center glass-panel p-4 flex flex-col h-64">
                        <div className="font-display text-xl text-signal-amber mb-4 border-b border-static-grey/20 pb-2">{day}</div>
                        <div className="space-y-3 text-sm flex-1">
                          <div className="text-maize-cream"><span className="text-static-grey text-xs block mb-1">Morning</span>Market alert & prices</div>
                          <div className="text-maize-cream"><span className="text-static-grey text-xs block mb-1">Midday</span>FB Live: farming tip</div>
                          <div className="text-maize-cream"><span className="text-static-grey text-xs block mb-1">Evening</span>Luhya music clip</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </TimelinePhase>

          {/* The BTL System (Embedded) */}
          <div className="relative -mx-6 px-6 py-24 bg-[#141A12] border-y border-mulembe-green/20" id="btl" style={{ backgroundImage: 'radial-gradient(rgba(23, 163, 74, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <h3 className="text-2xl md:text-4xl font-display uppercase tracking-tight text-maize-cream mb-4 text-center">
                  The BTL Activation System
                </h3>
                <p className="text-static-grey text-center max-w-2xl mx-auto mb-16">
                  Where the biggest, most defensible money is — built on relationships no Nairobi competitor can copy.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <GamificationCycle />
                </div>
                <div className="space-y-6">
                  <PhaseCard title="Nyota FM Market Activation Package">
                    A standardized, repeatable process for every on-ground event (market day, church function, football match). It is both a content factory and a sellable sponsorship product.
                  </PhaseCard>
                  <PhaseCard title="Listener Database Building (CRM)">
                    Capture contacts at every touchpoint: QR codes on banners, SMS shortcodes, M-Pesa prompts. Everything flows into a centralized Google Sheet.
                  </PhaseCard>
                  <PhaseCard title="Hyperlocal Outdoor Branding">
                    Market stall banners (KES 1,200), boda boda stickers (KES 20), church noticeboard posters (KES 100). Every asset carries the WhatsApp number and QR code.
                  </PhaseCard>
                  <PhaseCard title="Offline Digital Touchpoints (SMS & USSD)">
                    For the 52% of feature-phone users: SMS news/alerts (paid subscriber product later), USSD voting/polls for competitions, and M-Pesa prompts for contest entries.
                  </PhaseCard>
                  <PhaseCard title="Barter & Co-Promotion Menu">
                    Non-cash deals for small businesses. Give: sponsored post, on-air shout-out. Get: In-shop poster, prize donations, venue for activation.
                  </PhaseCard>
                </div>
              </div>

              <StreetTeamIcons />
            </div>
          </div>

          {/* Phase 3, 4, 5, 6 */}
          <TimelinePhase id="p4-6" title="Phases 4 to 6 — Scale & Sustain">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PhaseCard title="Phase 4: Build (Months 4-6)">
                Formalize a small digital team. Deepen the podcast. Launch a regular video show in the content nook. Scale Street Team to 20.
              </PhaseCard>
              <PhaseCard title="Phase 5: Monetize (Months 7-9)">
                Run own-events. Sell BTL Activation Packages. Test hyper-local paid boosts (KES 500-1,000/post) ONLY with proven organic content and advertiser funding.
              </PhaseCard>
              <PhaseCard title="Phase 6: Scale (Months 10-12)">
                Explore simple mobile app if demand justifies. Wider podcast distribution. Studio, social media and BTL become three permanent, self-funding pillars.
              </PhaseCard>
            </div>
          </TimelinePhase>

          {/* Unfair Advantage */}
          <TimelinePhase id="moat" title="Nyota FM's Unfair Advantage (First-Mover Moat)">
            <Reveal>
              <div className="glass-panel p-8 border-mulembe-green/30 bg-mulembe-green/5 mb-6">
                <p className="text-maize-cream leading-relaxed mb-6">
                  No competitor can quickly replicate:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-mulembe-green font-mono mt-1">01</span>
                    <span className="text-static-grey"><strong>Trust</strong> built over years on your frequency.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mulembe-green font-mono mt-1">02</span>
                    <span className="text-static-grey"><strong>Authentic language</strong> — real Lubukusu, Lwisukha, the right idioms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mulembe-green font-mono mt-1">03</span>
                    <span className="text-static-grey"><strong>Relationships</strong> with specific markets, churches, boda stages, schools.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mulembe-green font-mono mt-1">04</span>
                    <span className="text-static-grey"><strong>First-mover status</strong> in your specific towns' digital + BTL space.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mulembe-green font-mono mt-1">05</span>
                    <span className="text-static-grey">An <strong>integrated BTL network</strong> (Street Team + branded touchpoints + CRM) that takes years to build.</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </TimelinePhase>

          {/* Risk Management & Policy */}
          <TimelinePhase id="risk" title="Risk Management & Trust">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <h4 className="text-sm font-mono text-signal-amber uppercase tracking-widest mb-6">Risk Table</h4>
                </Reveal>
                <RiskAccordion />
              </div>
              <div className="lg:col-span-7">
                <EditorialPolicyPoster />
              </div>
            </div>
          </TimelinePhase>

          {/* Budget Summary */}
          <TimelinePhase id="budget" title="Budget Summary (Year 1)">
            <Reveal>
              <div className="glass-panel p-8 md:p-12 border-signal-amber/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h5 className="text-static-grey font-mono text-xs uppercase tracking-widest mb-2">One-Time Hub Build</h5>
                    <p className="text-2xl font-display text-maize-cream">KES 127,000</p>
                  </div>
                  <div>
                    <h5 className="text-static-grey font-mono text-xs uppercase tracking-widest mb-2">Monthly Ops (avg)</h5>
                    <p className="text-2xl font-display text-maize-cream">KES 15,000<span className="text-sm text-static-grey normal-case font-body">/mo</span></p>
                  </div>
                  <div>
                    <h5 className="text-static-grey font-mono text-xs uppercase tracking-widest mb-2">Year 1 Ops Total</h5>
                    <p className="text-2xl font-display text-maize-cream">KES 180,000</p>
                  </div>
                </div>
                
                <div className="border-t border-static-grey/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-4">
                  <div>
                    <h4 className="text-maize-cream font-display text-xl uppercase tracking-wider">Grand Total Year 1</h4>
                    <p className="text-static-grey text-sm max-w-sm mt-2">Front-load the KES 127K. The monthly spend spreads across the year and is partly self-funding from Month 4.</p>
                  </div>
                  <div className="relative group">
                    <span className="text-4xl md:text-5xl font-mono text-signal-amber">≈ KES 307,000</span>
                    <div className="absolute -bottom-2 left-0 h-1 bg-signal-amber w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </TimelinePhase>

        </div>
      </div>
    </section>
  );
}

function TimelinePhase({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Node Dot (desktop) */}
      <div className={`hidden md:flex absolute -left-[75px] top-1 w-6 h-6 rounded-full border-2 bg-broadcast-night z-10 transition-colors duration-500 items-center justify-center ${isActive ? 'border-signal-amber' : 'border-static-grey/40'}`}>
        <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isActive ? 'bg-signal-amber' : 'bg-transparent'}`}></div>
      </div>
      
      <Reveal>
        <h3 className={`text-2xl font-display uppercase tracking-tight mb-8 transition-colors duration-500 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-signal-amber to-maize-cream' : 'text-static-grey'}`}>
          {title}
        </h3>
      </Reveal>
      
      {children}
    </div>
  );
}

function PhaseCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="glass-panel p-6 hover:border-signal-amber/30 transition-colors duration-300">
        <h4 className="text-maize-cream font-medium mb-3">{title}</h4>
        <p className="text-static-grey text-sm leading-relaxed">{children}</p>
      </div>
    </Reveal>
  );
}

function OnAirDriver({ time, script }: { time: string; script: string }) {
  return (
    <div className="glass-panel p-4 flex gap-4 items-start">
      <div className="mt-1 relative">
        <Mic size={16} className="text-static-grey" />
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-alert-clay animate-blink-dot"></div>
      </div>
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-static-grey block mb-1">{time}</span>
        <p className="text-maize-cream italic text-sm">"{script}"</p>
      </div>
    </div>
  );
}
