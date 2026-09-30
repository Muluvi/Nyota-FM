import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SplitText from './SplitText';
import Typewriter from './Typewriter';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] pt-20 pb-16 flex flex-col justify-center overflow-hidden bg-liquid">
      
      {/* Background Waveforms - Parallax */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center gap-[2px] md:gap-1 opacity-15 pointer-events-none overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        aria-hidden="true"
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <div 
            key={i} 
            className="w-1.5 md:w-3 bg-signal-amber wave-bar rounded-full"
            style={{ 
              height: `${Math.max(10, Math.random() * 100)}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Logo */}
        <div className="mb-10 md:mb-12">
          <img 
            src="https://res.cloudinary.com/da5j0zjok/image/upload/v1780508039/Untitled_design_20260603_203332_0000_e2md3o.png" 
            alt="Nyota FM" 
            className="w-40 md:w-48 lg:w-56 animate-blur-in animate-[blur-in-scale_1s_cubic-bezier(0.25,1,0.5,1)_forwards,pulse-glow_4s_ease-in-out_1s_infinite] mx-auto md:mx-0 opacity-0 filter blur-[20px] scale-125 aspect-[160/40] object-contain"
            loading="eager"
            style={{ animationDelay: '200ms, 1200ms' }}
          />
        </div>

        {/* Headline */}
        <h1 className="font-display text-[42px] leading-[1.05] md:text-[64px] lg:text-[76px] md:leading-[0.95] font-black uppercase tracking-tight text-maize-cream mb-6 text-center md:text-left max-w-4xl">
          <SplitText text="The Heartbeat of Western Kenya, Now in Every Pocket." delayOffset={600} />
        </h1>

        {/* Sub-headline */}
        <div className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] text-static-grey mb-12 max-w-3xl text-center md:text-left min-h-[4.8em] md:min-h-[2em] font-medium">
          <Typewriter text="A Social Media & BTL Investment Blueprint · Kakamega · Bungoma · Vihiga · Busia · Trans Nzoia" delay={1600} speed={25} />
        </div>

        {/* Stat Chips */}
        <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 mb-14 justify-center md:justify-start">
          <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-3 transform transition-all duration-700 opacity-0 animate-[fade-in-up_0.8s_ease-out_2.5s_forwards]">
            <div className="w-2.5 h-2.5 rounded-full bg-signal-amber animate-pulse"></div>
            <span className="text-maize-cream text-sm md:text-base font-medium whitespace-nowrap">
              <AnimatedCounter value={27.4} decimals={1} delay={2600} />
              <span className="font-mono">M</span> Kenyans online
            </span>
          </div>

          <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-3 transform transition-all duration-700 opacity-0 animate-[fade-in-up_0.8s_ease-out_2.7s_forwards]">
            <div className="w-2.5 h-2.5 rounded-full bg-mulembe-green animate-pulse"></div>
            <span className="text-maize-cream text-sm md:text-base font-medium whitespace-nowrap">
              <span className="font-mono"><AnimatedCounter value={4} delay={2800} />h <AnimatedCounter value={19} delay={2800} />m</span> <span className="font-body">daily on social media</span>
            </span>
          </div>

          <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-3 transform transition-all duration-700 opacity-0 animate-[fade-in-up_0.8s_ease-out_2.9s_forwards] border-alert-clay/30 animate-[fade-in-up_0.8s_ease-out_2.9s_forwards,pulse-clay_2s_cubic-bezier(0.4,0,0.6,1)_3.5s_3]">
            <div className="w-2.5 h-2.5 rounded-full bg-alert-clay"></div>
            <span className="text-maize-cream text-sm md:text-base font-medium whitespace-nowrap">
              <span className="font-mono">KES 0</span> — Nyota FM's current digital revenue
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center md:justify-start transform transition-all duration-700 opacity-0 animate-[fade-in-up_0.8s_ease-out_3.2s_forwards]">
           <MagneticButton 
            href="#summary" 
            className="btn-shine relative px-10 py-[18px] bg-mulembe-green text-white font-bold uppercase tracking-[1.5px] text-[15px] rounded-[4px] cursor-pointer text-center inline-block shadow-[0_0_20px_rgba(23,163,74,0.3)] hover:shadow-[0_0_30px_rgba(23,163,74,0.5)] transition-all ease-out duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            See the Blueprint
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fade-in-up_0.8s_ease-out_4s_forwards] z-20">
        <span className="text-[9px] md:text-[10px] text-static-grey uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown className="text-signal-amber w-4 h-4 md:w-5 md:h-5 animate-[float_3s_ease-in-out_infinite]" />
      </div>

    </section>
  );
}
