import { Home, Activity, Map, Wallet, Handshake } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, sectionId: 'hero' },
  { id: 'gap', label: 'The Gap', icon: Activity, sectionId: 'landscape' },
  { id: 'plan', label: 'The Plan', icon: Map, sectionId: 'roadmap' },
  { id: 'money', label: 'The Money', icon: Wallet, sectionId: 'monetization' },
  { id: 'ask', label: 'The Ask', icon: Handshake, sectionId: 'conclusion' },
];

export default function Navigation({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
          scrolled ? 'bg-broadcast-night/80 backdrop-blur-xl border-b border-maize-cream/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <img 
            src="https://res.cloudinary.com/da5j0zjok/image/upload/v1780508039/Untitled_design_20260603_203332_0000_e2md3o.png" 
            alt="Nyota FM" 
            className="h-10 w-auto aspect-[160/40]" 
            loading="eager"
          />
          <nav className="flex gap-6 text-[11px] font-bold uppercase tracking-[1.5px] text-static-grey" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = 
                activeSection === item.sectionId || 
                (activeSection === 'hero' && item.id === 'home') ||
                (activeSection === 'summary' && item.id === 'gap');
              return (
                <a
                  key={item.id}
                  href={`#${item.sectionId}`}
                  className={`transition-colors min-touch-target flex items-center hover-underline ${
                    isActive
                      ? 'text-signal-amber'
                      : 'hover:text-maize-cream'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-broadcast-night border-t border-maize-cream/10 pb-safe pt-1 px-4" aria-label="Mobile Navigation">
        <div className="w-full h-16 bg-maize-cream/5 rounded-t-[32px] flex items-center justify-around px-2 relative top-1">
        {NAV_ITEMS.map((item) => {
          const isActive = 
            activeSection === item.sectionId || 
            (activeSection === 'hero' && item.id === 'home') ||
            (activeSection === 'summary' && item.id === 'gap');
            
          return (
            <a
              key={item.id}
              href={`#${item.sectionId}`}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all active:scale-[1.04] ${
                isActive ? 'text-signal-amber drop-shadow-[0_0_8px_rgba(245,166,35,0.8)]' : 'text-static-grey hover:text-maize-cream'
              }`}
            >
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </a>
          );
        })}
        </div>
      </nav>
    </>
  );
}
