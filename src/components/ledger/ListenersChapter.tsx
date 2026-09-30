import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';

interface Persona {
  id: string;
  name: string;
  role: string;
  location: string;
  age: string;
  device: string;
  dataHabit: string;
  hotHours: string;
  btlTouchpoint: string;
  contentResonance: string;
  quote: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'wafula',
    name: 'Wafula',
    role: 'Young Commercial Farmer',
    location: 'Vihiga / Kakamega',
    age: '24–34',
    device: 'Tecno Spark / Infinix Smart',
    dataHabit: 'Buys KES 20 daily Safaricom WhatsApp bundle',
    hotHours: '05:30 – 07:00 (Pre-field) & 20:00 – 22:00 (Post-chores)',
    btlTouchpoint: 'Agrovet counters, seed distributor depots, market-day fairs',
    contentResonance: 'Maize & dairy prices, rain forecasts in Lubukusu, farm extension advice',
    quote: '"If Nyota tells me fertilizer prices at the depot, I head there before 8:00 AM."',
  },
  {
    id: 'mama-aoko',
    name: 'Mama Aoko',
    role: 'Market Trader (Mama Mboga)',
    location: 'Kakamega Municipal Market / Mumias',
    age: '32–45',
    device: 'Itel entry smartphone, WhatsApp-centric',
    dataHabit: 'Weekly data bundle renewed on Sunday evening',
    hotHours: '09:30 – 12:00 (Stall setup) & 17:00 – 19:00 (Evening rush)',
    btlTouchpoint: 'Market stall parasols, Nyota branded price boards, wholesale depot',
    contentResonance: 'Wholesale vegetable rates, community welfare news, church obituaries',
    quote: '"My small radio stays on the stall crate all day. I send voice notes on WhatsApp during lulls."',
  },
  {
    id: 'barasa',
    name: 'Barasa',
    role: 'Boda Boda Operator & Stage Treasurer',
    location: 'Bungoma Town / Webuye',
    age: '20–32',
    device: 'Xiaomi Redmi, continuous earphone usage',
    dataHabit: 'Continuous YouTube Music & TikTok bundles via airtime top-ups',
    hotHours: '12:00 – 14:00 (Midday shade) & 19:00 – 22:00 (Town ferry shift)',
    btlTouchpoint: 'Boda shed reflector jackets, branded stage umbrellas, fuel stations',
    contentResonance: 'Local football banter, crime & road alerts, vernacular rhumba and comedy',
    quote: '"My passengers listen to what is playing in my earphone speaker while riding."',
  },
  {
    id: 'nafula',
    name: 'Nafula',
    role: 'University Student & Content Creator',
    location: 'Masinde Muliro University / Busia',
    age: '19–25',
    device: 'Samsung Galaxy A-series, heavy video recording',
    dataHabit: 'Campus Wi-Fi augmented with late-night TikTok packs',
    hotHours: '13:00 – 15:00 (Lecture break) & 21:00 – 00:00 (Night study)',
    btlTouchpoint: 'Campus gate activations, youth talent concerts, sports tournaments',
    contentResonance: 'Internship notices, vernacular hip-hop remixes, viral TikTok challenges',
    quote: '"I repost Nyota clips when presenters make funny commentary in Luhya street slang."',
  },
  {
    id: 'omukama',
    name: 'Mzee Omukama',
    role: 'Community Elder & School Board Chair',
    location: 'Busia / Butere Sub-County',
    age: '55+',
    device: 'Nokia feature phone + family Android tablet',
    dataHabit: 'Airtime credit funded by children via M-Pesa',
    hotHours: '06:00 – 08:00 (Morning news) & 18:30 – 21:00 (Evening bulletin & baraza)',
    btlTouchpoint: 'Chief’s barazas, parish hall, tea buying center',
    contentResonance: 'Land titling disputes, cultural wisdom, national politics explained in mother tongue',
    quote: '"Nyota FM is the only voice that speaks to our heritage with dignity and truth."',
  },
];

export function ListenersChapter() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('wafula');
  const activePersona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];

  return (
    <div className="space-y-8">
      <p className="font-body text-sage text-base sm:text-[17px] leading-relaxed">
        Commercial success in Western Kenya is won by understanding the real economic rhythm of the rural and peri-urban household. Nyota FM’s audience is not an abstract demographic—they are distinct community archetypes with specific handset limits, daily budgets, and listening rituals.
      </p>

      {/* Persona Selection Bar */}
      <div>
        <div className="text-eyebrow text-sage-dim mb-3">Audience Archetypes • Select Profile</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PERSONAS.map(p => {
            const isSelected = p.id === selectedPersonaId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPersonaId(p.id)}
                className={`px-3 py-2.5 rounded text-left border transition-all ${
                  isSelected
                    ? 'border-brass bg-ink text-paper'
                    : 'border-hairline bg-ink-2 text-sage hover:border-sage-dim'
                }`}
              >
                <div className="font-body text-xs font-medium text-paper truncate">{p.name}</div>
                <div className="font-mono text-[10px] text-sage-dim truncate">{p.role}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Persona Deep Dive Card */}
      <LedgerCard className="p-6 border-brass/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-hairline gap-2">
          <div>
            <div className="text-eyebrow text-brass">Profile Deep Dive</div>
            <h3 className="font-display text-paper text-xl">{activePersona.name}</h3>
            <span className="font-body text-sage text-xs">{activePersona.role} • {activePersona.location}</span>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 bg-ink border border-hairline rounded text-sage self-start sm:self-auto">
            Age {activePersona.age}
          </span>
        </div>

        {/* Pull Quote */}
        <blockquote className="font-display italic text-paper text-sm bg-ink p-3.5 rounded border-l-2 border-brass mb-6">
          {activePersona.quote}
        </blockquote>

        {/* Ledger Details */}
        <div className="space-y-1">
          <LedgerRow 
            label="Handset Class" 
            value={activePersona.device} 
          />
          <LedgerRow 
            label="Mobile Data Habit" 
            value={activePersona.dataHabit} 
          />
          <LedgerRow 
            label="Peak Broadcast Hours" 
            value={activePersona.hotHours} 
            valueColor="brass" 
          />
          <LedgerRow 
            label="BTL On-Ground Touchpoint" 
            value={activePersona.btlTouchpoint} 
          />
          <LedgerRow 
            label="Core Content Resonance" 
            value={activePersona.contentResonance} 
          />
        </div>
      </LedgerCard>

      {/* Hot-Hours Listening Schedule Ledger */}
      <LedgerCard className="p-6">
        <div className="text-eyebrow text-sage-dim mb-1">Broadcast Scheduling</div>
        <h3 className="font-display text-paper text-lg mb-4">Western Kenya Primetime Synchrony</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="font-mono text-xs text-brass">05:30 – 08:30</span>
            <span className="font-body text-xs text-paper">Kumanywelo Breakfast Show (Farming, Market alerts, Luhya hymns)</span>
            <span className="font-mono text-xs text-sage">Wafula / Omukama</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="font-mono text-xs text-brass">10:00 – 13:00</span>
            <span className="font-body text-xs text-paper">Soko Baraza (Trader price checks, health tips, WhatsApp call-ins)</span>
            <span className="font-mono text-xs text-sage">Mama Aoko</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <span className="font-mono text-xs text-brass">14:00 – 17:00</span>
            <span className="font-body text-xs text-paper">Mulembe Drive & Sports (Boda stage banter, football, comedy)</span>
            <span className="font-mono text-xs text-sage">Barasa / Nafula</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-mono text-xs text-brass">20:00 – 23:00</span>
            <span className="font-body text-xs text-paper">Luhya Cultural Baraza (Heritage storytelling, legal guidance, obituaries)</span>
            <span className="font-mono text-xs text-sage">Community-wide</span>
          </div>
        </div>
      </LedgerCard>
    </div>
  );
}
