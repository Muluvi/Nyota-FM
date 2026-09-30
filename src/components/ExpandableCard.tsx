import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ExpandableCard({ 
  icon: Icon, 
  title, 
  content, 
  linkId 
}: { 
  icon: any, 
  title: string, 
  content: string, 
  linkId: string 
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard active={expanded} className="p-5 md:p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-signal-amber animate-[float_3s_ease-in-out_infinite]" />
          <span className="font-bold text-maize-cream text-[14px] uppercase tracking-wide">{title}</span>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-static-grey" /> : <ChevronDown className="w-4 h-4 text-static-grey" />}
      </div>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          expanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-static-grey mb-3 font-medium leading-relaxed">{content}</p>
          <a href={`#${linkId}`} onClick={(e) => e.stopPropagation()} className="text-[11px] font-mono font-bold text-signal-amber uppercase tracking-wider hover:text-maize-cream transition-colors">
            Jump to section →
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
