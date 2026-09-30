import React from 'react';
import { Smartphone, Camera, Mic, BatteryCharging } from 'lucide-react';

const KIT_ITEMS = [
  { icon: Smartphone, label: 'Budget Android' },
  { icon: Camera, label: 'Phone Gimbal' },
  { icon: Mic, label: 'Lavalier Mic' },
  { icon: BatteryCharging, label: 'Power Bank' }
];

export default function KitMarquee() {
  return (
    <div className="relative w-full overflow-hidden mask-gradient py-8">
      <div className="flex w-[200%] animate-marquee">
        {[...KIT_ITEMS, ...KIT_ITEMS, ...KIT_ITEMS, ...KIT_ITEMS].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center w-32 md:w-48 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-signal-amber mb-4">
              <item.icon size={28} strokeWidth={1.5} />
            </div>
            <span className="font-mono text-xs text-static-grey text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
