import React, { useEffect, useRef, useState } from 'react';

interface Platform {
  name: string;
  reach: number;
  color: string;
  logo: string;
  label: string;
}

const PLATFORMS: Platform[] = [
  { name: 'Facebook', reach: 69.9, color: 'bg-[#1877F2]', logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765889247/AZsnL4dMdfGc81To27QzCg-AZsnL4dMtdFVyuKofE0Y6Q_20251216_154319_0000_nq9hvp.png', label: '69.9%' },
  { name: 'WhatsApp', reach: 56.0, color: 'bg-[#25D366]', logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1780508490/Digital_Glyph_Green_RGB_2026_fokvoc.png', label: '56.0%' },
  { name: 'TikTok', reach: 30.3, color: 'bg-white', logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765720754/TikTok-logo-RGB-Horizontal-white_vh4efn.png', label: '30.3%' },
  { name: 'YouTube', reach: 26.6, color: 'bg-[#FF0000]', logo: 'https://res.cloudinary.com/da5j0zjok/image/upload/v1765721612/yt_logo_fullcolor_white_digital_d6vxgj.png', label: '26.6%' },
];

export default function PlatformBars({ delay = 0 }: { delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="space-y-6">
      {PLATFORMS.map((platform, index) => {
        const width = isVisible ? `${platform.reach}%` : '0%';
        return (
          <div key={platform.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[13px]">
              <div className="flex items-center gap-2">
                <img src={platform.logo} alt={platform.name} className="h-[20px] object-contain object-left" loading="lazy" />
              </div>
              <span className="font-bold text-maize-cream">{platform.label}</span>
            </div>
            <div className="h-3 bg-broadcast-night rounded-full overflow-hidden border border-maize-cream/10 relative">
              <div 
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-[1500ms] ease-out ${platform.color}`} 
                style={{ width: width, transitionDelay: `${index * 150}ms` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
