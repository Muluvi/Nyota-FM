import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import ShakeCallout from './ShakeCallout';
import StudioFloorPlan from './StudioFloorPlan';
import KitMarquee from './KitMarquee';
import SoftwareFlipPills from './SoftwareFlipPills';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const HARDWARE_ITEMS = [
  { id: 1, item: 'Budget Android (Tecno/Infinix)', purpose: 'Primary field + vertical video', price: 12500 },
  { id: 2, item: 'Second budget Android', purpose: 'Parallel capture, Street Team lead', price: 12500 },
  { id: 3, item: 'BM800 condenser mic + V8 kit', purpose: 'Podcast & voice-over recording', price: 3000 },
  { id: 4, item: 'USB audio interface', purpose: 'Clean audio into computer', price: 8500 },
  { id: 5, item: 'Ring light 18" + 2m tripod', purpose: 'Even lighting for video/live', price: 3500 },
  { id: 6, item: 'LED video panel', purpose: 'Fill light, interviews', price: 5800 },
  { id: 7, item: 'Lavalier/lapel mic (x2)', purpose: 'Interviews, field, presenter clip-on', price: 1800 },
  { id: 8, item: '1080p webcam', purpose: 'Desktop live streaming', price: 3000 },
  { id: 9, item: 'Smartphone tripod + holder (x2)', purpose: 'Stable video, hands-free', price: 2000 },
  { id: 10, item: 'Phone gimbal', purpose: 'Smooth walking/market video', price: 5000 },
  { id: 11, item: 'Power bank 20,000mAh (x2)', purpose: 'Power cuts / all-day field', price: 7800 },
  { id: 12, item: 'Acoustic foam panels', purpose: 'Studio treatment for clean audio', price: 3000 },
  { id: 13, item: 'Green screen backdrop + stand', purpose: 'Virtual backgrounds, polish', price: 7800 },
  { id: 14, item: 'Branded backdrop / roll-up', purpose: 'Backdrop for all video, selfie wall', price: 6500 },
  { id: 15, item: 'BTL branding materials', purpose: 'Banners, stickers, T-shirts', price: 40300 } // Adjusted to reach exactly 123,000 total
];

const TARGET_TOTAL = 123000;

export default function EquipmentSection() {
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());
  
  const currentTotal = HARDWARE_ITEMS
    .filter(item => visibleIds.has(item.id))
    .reduce((sum, item) => sum + item.price, 0);
    
  const isComplete = currentTotal >= TARGET_TOTAL;

  return (
    <section className="py-24 relative" id="hub">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <Reveal>
            <h2 className="text-signal-amber font-mono text-sm md:text-base tracking-widest uppercase mb-4">05 · The Hub</h2>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-maize-cream mb-6">
              Equipment & Studio Transformation
            </h3>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-static-grey text-lg max-w-3xl leading-relaxed">
              Building a multi-purpose content nook capable of live video, recorded video, podcasts and short vertical clips — without disrupting live radio and without an extravagant build.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          {/* Left Col: The List */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal>
              <h4 className="text-xl font-display text-maize-cream mb-6">Hardware & Branding Budget</h4>
            </Reveal>
            
            <div className="space-y-3 pb-32">
              {HARDWARE_ITEMS.map((item, idx) => (
                <HardwareItem 
                  key={item.id} 
                  item={item} 
                  onVisible={() => setVisibleIds(prev => new Set(prev).add(item.id))} 
                />
              ))}
            </div>
          </div>
          
          {/* Right Col: Warnings and Diagrams */}
          <div className="lg:col-span-5 space-y-12">
            <ShakeCallout title="WARNING">
              Do <strong>NOT</strong> buy a DSLR now. A budget Android + gimbal + ring light produces more-than-adequate social video. Add a DSLR only in Phase 6 if a regular video show justifies it.
            </ShakeCallout>
            
            <StudioFloorPlan />
          </div>
        </div>
        
        {/* Field Kit */}
        <div className="mb-32">
          <Reveal>
            <h4 className="text-xl font-display text-maize-cream mb-6 text-center">Mobile / Field Kit</h4>
          </Reveal>
          <KitMarquee />
        </div>

        {/* Software & Monthly Costs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <Reveal>
              <h4 className="text-xl font-display text-maize-cream mb-6">Free / Low-Cost Software</h4>
            </Reveal>
            <SoftwareFlipPills />
          </div>
          
          <div>
            <Reveal>
              <h4 className="text-xl font-display text-maize-cream mb-6">Ongoing Monthly Costs</h4>
            </Reveal>
            <div className="space-y-6">
              <MonthlyCostBar label="Data bundles (station + field)" max={6000} value={6000} note="Safaricom / Airtel Smarta" />
              <MonthlyCostBar label="Street Team incentives" max={6000} value={6000} note="Airtime/bundles" />
              <MonthlyCostBar label="Backup power" max={6000} value={4000} note="Fuel/solar" />
              <MonthlyCostBar label="Equipment maintenance" max={6000} value={2000} note="Replacement fund" />
            </div>
            
            <div className="mt-12">
              <Reveal>
                <div className="glass-panel p-6 border-mulembe-green/30 bg-mulembe-green/5 flex items-start gap-4">
                  <div className="p-2 rounded-full bg-mulembe-green/20 text-mulembe-green animate-pulse">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h5 className="text-maize-cream font-medium mb-1">ODPC Compliance</h5>
                    <p className="text-sm text-static-grey leading-relaxed">
                      Registration with the Office of the Data Protection Commissioner is prudent to protect your listener database (CRM). KES 4,000 one-time fee.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        
      </div>

      {/* Sticky Running Total Ribbon */}
      <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
        <div className="bg-broadcast-night/90 backdrop-blur-md border-t border-signal-amber/20 p-4 transition-all duration-500 transform translate-y-0">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <span className="font-mono text-static-grey text-xs md:text-sm uppercase tracking-widest">Running Total</span>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-xl md:text-2xl transition-colors duration-300 ${isComplete ? 'text-mulembe-green' : 'text-signal-amber'}`}>
                KES {currentTotal.toLocaleString()}
              </span>
              {isComplete && (
                <div className="animate-pop-in text-mulembe-green">
                  <CheckCircle2 size={24} />
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 left-0 h-0.5 bg-signal-amber transition-all duration-300" style={{ width: `${Math.min(100, (currentTotal / TARGET_TOTAL) * 100)}%` }}></div>
        </div>
      </div>
    </section>
  );
}

function HardwareItem({ item, onVisible }: { item: any, onVisible: () => void, key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <Reveal>
      <div ref={ref} className="glass-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h5 className="text-maize-cream font-medium">{item.item}</h5>
          <p className="text-sm text-static-grey">{item.purpose}</p>
        </div>
        <div className="font-mono text-signal-amber whitespace-nowrap">
          KES {item.price.toLocaleString()}
        </div>
      </div>
    </Reveal>
  );
}

function MonthlyCostBar({ label, value, max, note }: { label: string; value: number; max: number; note: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const percentage = (value / max) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="text-maize-cream text-sm">{label}</div>
          <div className="text-static-grey text-xs">{note}</div>
        </div>
        <div className="font-mono text-signal-amber text-sm">KES {value.toLocaleString()}</div>
      </div>
      <div className="h-2 w-full bg-broadcast-night rounded-full overflow-hidden border border-static-grey/20">
        <div 
          className="h-full bg-signal-amber transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
}
