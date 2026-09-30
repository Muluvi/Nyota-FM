import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { CheckSquare, Square, RefreshCw, ShieldCheck } from 'lucide-react';

interface HardwareItem {
  id: number;
  item: string;
  purpose: string;
  price: number;
  category: 'Video/Audio' | 'Field & Mobile' | 'Studio Fitout' | 'BTL Kit';
}

const HARDWARE_ITEMS: HardwareItem[] = [
  { id: 1, item: 'Primary Budget Android (Tecno/Infinix)', purpose: 'Primary 1080p field & vertical video capture', price: 12500, category: 'Field & Mobile' },
  { id: 2, item: 'Second Budget Android Smartphone', purpose: 'Parallel capture, Street Team lead device', price: 12500, category: 'Field & Mobile' },
  { id: 3, item: 'BM800 Condenser Mic + V8 Kit', purpose: 'Podcast & voice-over recording station', price: 3000, category: 'Video/Audio' },
  { id: 4, item: 'USB Audio Interface (2-Channel)', purpose: 'Clean master broadcast feed into streaming PC', price: 8500, category: 'Video/Audio' },
  { id: 5, item: 'Ring Light 18" + 2m Tripod', purpose: 'Uniform presenter lighting for live baraza streams', price: 3500, category: 'Studio Fitout' },
  { id: 6, item: 'LED Video Panel (Bi-color)', purpose: 'Studio fill light and on-site field interviews', price: 5800, category: 'Video/Audio' },
  { id: 7, item: 'Lavalier Clip-on Mics (Pair)', purpose: 'Field interviews and two-presenter dialogue', price: 1800, category: 'Video/Audio' },
  { id: 8, item: '1080p USB Studio Webcam', purpose: 'Continuous desk camera for Facebook Live broadcasts', price: 3000, category: 'Video/Audio' },
  { id: 9, item: 'Heavy-Duty Smartphone Tripods (x2)', purpose: 'Hands-free fixed angle capture during shows', price: 2000, category: 'Field & Mobile' },
  { id: 10, item: '3-Axis Smartphone Handheld Gimbal', purpose: 'Smooth walking video for market-day walkabouts', price: 5000, category: 'Field & Mobile' },
  { id: 11, item: 'Dual 20,000mAh Power Banks', purpose: 'Insurance against KPLC blackouts and all-day field trips', price: 7800, category: 'Field & Mobile' },
  { id: 12, item: 'Acoustic Foam Sound Treatment Tiles', purpose: 'Echo reduction in Content Nook corner', price: 3000, category: 'Studio Fitout' },
  { id: 13, item: 'Green Screen Backdrop + Frame', purpose: 'Virtual news background options', price: 7800, category: 'Studio Fitout' },
  { id: 14, item: 'Nyota FM Branded Roll-Up Backdrop', purpose: 'Permanent signature branding for all video recordings', price: 6500, category: 'Studio Fitout' },
  { id: 15, item: 'BTL Street Activation Branding Kit', purpose: '20 branded T-shirts, stall umbrellas & boda boda stickers', price: 40300, category: 'BTL Kit' },
];

export function EquipmentChapter() {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(
    new Set(HARDWARE_ITEMS.map(i => i.id))
  );

  const toggleItem = (id: number) => {
    const next = new Set(selectedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedItems(next);
  };

  const selectAll = () => {
    setSelectedItems(new Set(HARDWARE_ITEMS.map(i => i.id)));
  };

  const currentTotal = HARDWARE_ITEMS
    .filter(i => selectedItems.has(i.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const targetTotal = 123000;

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        Radio station owners are frequently pitched exorbitant multi-million shilling TV studio overhauls that gather dust. Nyota FM’s approach is frugal and disciplined: build an agile "Content Nook" inside the existing studio perimeter for exactly <span className="font-mono text-paper font-semibold">KES 123,000</span> total capital expenditure.
      </p>

      {/* Content Nook Floor Plan Schematic */}
      <LedgerCard className="p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
          <div>
            <div className="text-eyebrow text-sage-dim">Acoustic & Spatial Blueprint</div>
            <h3 className="font-display text-paper text-lg">Studio Content Nook Layout</h3>
          </div>
          <span className="font-mono text-xs text-brass">10 SQ METERS</span>
        </div>

        <p className="font-body text-sage text-xs mb-4">
          Integrated directly into the live on-air control room without interfering with the main broadcast console.
        </p>

        {/* Vector Schematic */}
        <div className="p-4 bg-ink border border-hairline rounded relative overflow-hidden mb-4">
          <svg viewBox="0 0 400 240" className="w-full h-auto text-sage">
            {/* Outer Wall Boundary */}
            <rect x="20" y="20" width="360" height="200" fill="none" stroke="#2E3632" strokeWidth="2" strokeDasharray="4 2" />
            
            {/* Acoustic Foam Edge Treatment */}
            <line x1="20" y1="20" x2="160" y2="20" stroke="#B8925A" strokeWidth="4" />
            <line x1="20" y1="20" x2="20" y2="120" stroke="#B8925A" strokeWidth="4" />
            
            {/* Branded Backdrop */}
            <line x1="50" y1="60" x2="150" y2="60" stroke="#5C7A66" strokeWidth="3" />
            <text x="70" y="52" fill="#5C7A66" fontSize="9" fontFamily="IBM Plex Mono">BRANDED BACKDROP</text>

            {/* Presenter Chairs */}
            <circle cx="75" cy="110" r="14" fill="#161B19" stroke="#8FA096" strokeWidth="1.5" />
            <text x="65" y="113" fill="#F3F1EA" fontSize="8" fontFamily="Inter">MIC 1</text>

            <circle cx="125" cy="110" r="14" fill="#161B19" stroke="#8FA096" strokeWidth="1.5" />
            <text x="115" y="113" fill="#F3F1EA" fontSize="8" fontFamily="Inter">MIC 2</text>

            {/* Central Desk */}
            <rect x="55" y="90" width="90" height="15" rx="3" fill="#1B211E" stroke="#2E3632" strokeWidth="1.5" />

            {/* Ring Light & Smartphone Rig */}
            <circle cx="100" cy="165" r="12" fill="none" stroke="#B8925A" strokeWidth="1.5" />
            <circle cx="100" cy="165" r="3" fill="#B8925A" />
            <line x1="100" y1="165" x2="100" y2="125" stroke="#B8925A" strokeWidth="1" strokeDasharray="2 2" />
            <text x="118" y="169" fill="#B8925A" fontSize="9" fontFamily="IBM Plex Mono">18" RING LIGHT + PHONE</text>

            {/* Live On-Air Console Area */}
            <rect x="230" y="60" width="130" height="120" rx="4" fill="#161B19" stroke="#2E3632" strokeWidth="1.5" />
            <text x="245" y="115" fill="#8FA096" fontSize="10" fontFamily="Inter">EXISTING MAIN FM CONSOLE</text>
            <text x="245" y="130" fill="#5C6B63" fontSize="8" fontFamily="IBM Plex Mono">UNINTERRUPTED BROADCAST</text>
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-hairline text-[11px] font-mono text-sage-dim">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-brass inline-block rounded-full" /> Acoustic Foam</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-moss inline-block rounded-full" /> Branded Backdrop</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 border border-sage inline-block rounded-full" /> Dual Presenters</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-paper inline-block rounded-full" /> Camera Line</span>
          </div>
        </div>
      </LedgerCard>

      {/* Capex Budget Ledger & Interactive Checklist */}
      <LedgerCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-hairline gap-3">
          <div>
            <div className="text-eyebrow text-brass">Capital Expenditure Ledger</div>
            <h3 className="font-display text-paper text-xl">The 15-Item Hardware Bill</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs font-mono text-brass hover:underline flex items-center gap-1"
            >
              <RefreshCw size={12} /> Select All
            </button>
            <div className="px-3 py-1 bg-ink border border-brass/40 rounded text-right">
              <span className="text-[10px] font-mono text-sage-dim block uppercase">AUDIT TOTAL</span>
              <span className="font-mono text-base font-semibold text-brass">
                KES {currentTotal.toLocaleString('en-KE')}
              </span>
            </div>
          </div>
        </div>

        <p className="font-body text-sage text-xs mb-4">
          Tap any row to include/exclude item from the budget calculation. All items sourced from certified dealers in Nairobi/Kisumu with warranty.
        </p>

        <div className="divide-y divide-hairline">
          {HARDWARE_ITEMS.map((item) => {
            const isChecked = selectedItems.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`py-3 flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                  isChecked ? 'hover:bg-ink' : 'opacity-40 hover:opacity-75'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 text-brass shrink-0">
                    {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                  </div>
                  <div className="min-w-0">
                    <span className="font-body text-sm font-medium text-paper block truncate">
                      {item.item}
                    </span>
                    <span className="font-mono text-[11px] text-sage-dim block truncate">
                      {item.purpose}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-sm text-paper shrink-0">
                  KES {item.price.toLocaleString('en-KE')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Ledger Bottom Summary Bar */}
        <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2 text-moss text-xs font-mono">
            <ShieldCheck size={16} />
            <span>Target Capex: KES {targetTotal.toLocaleString('en-KE')}</span>
          </div>
          <span className="font-mono text-xs text-sage">
            {selectedItems.size} of 15 Items Included
          </span>
        </div>
      </LedgerCard>

      {/* Zero-License Software Stack */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Software Operations</div>
        <h3 className="font-display text-paper text-lg mb-4">Zero Recurring License Overhead</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-body font-medium text-paper block mb-1">CapCut Mobile & Desktop</span>
            <span className="font-body text-sage text-[11px] leading-relaxed">
              Auto-captioning, fast vertical video trimming, and instant watermark-free exports. Zero monthly cost.
            </span>
          </div>

          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-body font-medium text-paper block mb-1">Canva Non-Profit / Pro</span>
            <span className="font-body text-sage text-[11px] leading-relaxed">
              Standardized broadcast template kit for daily market rates, quotes, and breaking news banners.
            </span>
          </div>

          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-body font-medium text-paper block mb-1">OBS Studio Open Source</span>
            <span className="font-body text-sage text-[11px] leading-relaxed">
              Desktop live streaming switchboard encoding master feeds to Facebook and YouTube concurrently.
            </span>
          </div>

          <div className="p-3 bg-ink border border-hairline rounded">
            <span className="font-body font-medium text-paper block mb-1">Meta Business Suite & WhatsApp</span>
            <span className="font-body text-sage text-[11px] leading-relaxed">
              Direct scheduled posting, listener inbox consolidation, and analytics review on mobile.
            </span>
          </div>
        </div>
      </LedgerCard>
    </div>
  );
}
