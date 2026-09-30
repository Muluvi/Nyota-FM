import React, { useState } from 'react';
import Reveal from './Reveal';

const SOFTWARE = [
  { name: 'StreamYard', use: 'Multi-platform live streaming to FB/YouTube' },
  { name: 'CapCut', use: 'Video editing, captions, trends' },
  { name: 'Canva', use: 'Posters, price boards, banners design' },
  { name: 'Audacity', use: 'Podcast audio editing' },
  { name: 'Google Sheets', use: 'CRM / listener database / dashboard' },
  { name: 'Meta Biz Suite', use: 'Schedule FB/IG posts, view analytics' }
];

export default function SoftwareFlipPills() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {SOFTWARE.map((sw, idx) => (
        <Reveal key={sw.name} delay={idx * 100}>
          <FlipPill name={sw.name} use={sw.use} />
        </Reveal>
      ))}
    </div>
  );
}

function FlipPill({ name, use }: { name: string; use: string; key?: React.Key }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`flip-card h-24 cursor-pointer ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front glass-panel flex items-center justify-center p-4">
          <span className="font-mono text-sm text-maize-cream text-center">{name}</span>
        </div>
        <div className="flip-card-back glass-panel-active flex items-center justify-center p-4">
          <span className="text-xs text-maize-cream/90 text-center leading-tight">{use}</span>
        </div>
      </div>
    </div>
  );
}
