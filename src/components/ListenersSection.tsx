import React from 'react';
import PersonaCard from './PersonaCard';
import Reveal from './Reveal';
import WaveformDivider from './WaveformDivider';

const PERSONAS = [
  {
    id: 'p1',
    name: 'Wafula the Young Farmer',
    location: 'Vihiga / Kakamega',
    age: '24–34',
    color: 'border-[#22c55e]',
    colorHex: '#22c55e',
    emoji: '🧑🏾‍🌾',
    primaryPlatforms: ['WhatsApp', 'Facebook', 'TikTok'],
    device: 'Low-cost Android (Tecno/Infinix), intermittent data, buys daily/weekly bundles.',
    content: 'Agricultural advice, weather, market prices, Luhya music. Best time: 6–7am, 8–10pm.',
    hotHours: [[6,7], [20,22]],
    btl: 'Agrovet counter posters, market-day stands, agricultural field days.'
  },
  {
    id: 'p2',
    name: 'Mama Aoko the Mama Mboga',
    location: 'Kakamega town / Mumias',
    age: '30–45',
    color: 'border-[#eab308]',
    colorHex: '#eab308',
    emoji: '🥬',
    primaryPlatforms: ['WhatsApp', 'Facebook'],
    device: 'Entry Android, WhatsApp-first, data-light.',
    content: 'Market-day alerts, price of unga/sukuma, obituaries, church notices. Best time: 10am–12pm, early evening.',
    hotHours: [[10,12], [17,19]],
    btl: 'Market stall banners and stand — she IS the marketplace.'
  },
  {
    id: 'p3',
    name: 'Barasa the Boda Boda Rider',
    location: 'Bungoma / Webuye',
    age: '20–35',
    color: 'border-[#3b82f6]',
    colorHex: '#3b82f6',
    emoji: '🏍️',
    primaryPlatforms: ['TikTok', 'Facebook', 'WhatsApp'],
    device: 'Android, moderate data, always with earphones.',
    content: 'Local football, music, traffic/security alerts, comedy skits, giveaways. Best time: Midday break, 7–10pm.',
    hotHours: [[12,14], [19,22]],
    btl: 'Boda boda sticker campaign and boda-stage banners.'
  },
  {
    id: 'p4',
    name: 'Nafula the College Student',
    location: 'Busia / Kakamega',
    age: '18–24',
    color: 'border-[#ec4899]',
    colorHex: '#ec4899',
    emoji: '🎓',
    primaryPlatforms: ['TikTok', 'Instagram', 'YouTube', 'WhatsApp'],
    device: 'Decent Android, campus Wi-Fi + bundles, heavy video.',
    content: 'Trends, challenges, KCSE/KCPE results, campus events, career tips, entertainment. Best time: 12–2pm, 8pm–12am.',
    hotHours: [[12,14], [20,24]],
    btl: 'Campus roadshows, contest stands, selfie backdrop.'
  },
  {
    id: 'p5',
    name: 'Mzee Simiyu the SME Owner',
    location: 'Kitale / Trans Nzoia',
    age: '35–55',
    color: 'border-[#a855f7]',
    colorHex: '#a855f7',
    emoji: '🏪',
    primaryPlatforms: ['Facebook', 'WhatsApp', 'SMS'],
    device: 'Smartphone + feature phone second line; uses M-Pesa Till daily.',
    content: 'Business visibility, local news, market conditions, agri-inputs pricing. Best time: Early morning, lunch.',
    hotHours: [[6,8], [12,14]],
    btl: 'Barter deals, in-shop posters, Market Activation sponsorship, stall banners.'
  }
];

export default function ListenersSection() {
  return (
    <section id="listeners" className="py-16 md:py-24 min-h-[50vh] relative bg-pattern">
      <div className="bg-noise"></div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-[11px] font-mono text-signal-amber uppercase tracking-[2px] mb-4">03 · The People</div>
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.1] mb-12 uppercase text-maize-cream max-w-4xl">
            Your Listeners: Personas & Platform Habits
          </h2>
        </Reveal>

        <div className="relative w-full overflow-hidden">
          <div className="flex overflow-x-auto scroll-snap-x gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 pb-6 hide-scrollbar -mx-4 md:mx-0 px-4 md:px-0">
            {PERSONAS.map((persona, i) => (
              <Reveal key={persona.id} delay={100 * i} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 scroll-snap-center flex-shrink-0 h-full">
                <PersonaCard persona={persona} isFirst={i === 0} />
              </Reveal>
            ))}
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex justify-center gap-2 md:hidden mt-2">
            {PERSONAS.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-static-grey/30"></div>
            ))}
          </div>
        </div>
        
        <WaveformDivider />
      </div>
    </section>
  );
}
