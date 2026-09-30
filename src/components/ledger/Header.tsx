import React, { useEffect, useState } from 'react';
import { ContentsOverlay } from './ContentsOverlay';

export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOverlayOpen]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 h-[2px] bg-brass z-[60] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-ink-2 border-b border-hairline z-50 px-4 md:px-6">
        <div className="max-w-[640px] mx-auto h-full flex items-center justify-between">
          <img 
            src="https://res.cloudinary.com/da5j0zjok/image/upload/v1780508039/Untitled_design_20260603_203332_0000_e2md3o.png" 
            alt="Nyota FM" 
            className="h-6 w-auto object-contain brightness-0 invert" 
          />
          <button 
            onClick={() => setIsOverlayOpen(true)}
            className="text-brass font-body text-[15px] hover:opacity-80 transition-opacity"
          >
            Contents
          </button>
        </div>
      </header>
      
      <ContentsOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </>
  );
}
