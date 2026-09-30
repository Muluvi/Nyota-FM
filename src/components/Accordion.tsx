import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 mb-3">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber"
      >
        <span className="font-bold text-[13px] md:text-[15px] uppercase tracking-wider text-maize-cream">
          {title}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-static-grey transition-transform duration-300 ${isOpen ? 'rotate-180 text-signal-amber' : ''}`}
        />
      </button>
      <div 
        role="region"
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-4 md:p-5 pt-0 text-static-grey text-sm md:text-base leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
