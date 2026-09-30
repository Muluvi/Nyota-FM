import React, { ReactNode } from 'react';
import GlassCard from './GlassCard';
import AnimatedCounter from './AnimatedCounter';
import Reveal from './Reveal';

interface StatCardProps {
  value?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  source?: string;
  delay?: number;
  decimals?: number;
  children?: ReactNode;
}

export default function StatCard({ value, suffix = '', prefix = '', label, source, delay = 0, decimals = 1, children }: StatCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <GlassCard className="h-full flex flex-col justify-between p-6">
        <div>
          <div className="text-[11px] text-static-grey mt-1 font-mono uppercase mb-4">{label}</div>
          <div className="flex items-baseline gap-1">
            {children ? (
              <div className="font-mono text-3xl font-bold text-signal-amber">{children}</div>
            ) : (
              <>
                {prefix && <span className="text-xl text-maize-cream font-bold">{prefix}</span>}
                <div className="font-mono text-3xl font-bold text-signal-amber">
                  <AnimatedCounter value={value || 0} duration={2000} delay={delay + 200} decimals={decimals} />
                </div>
                {suffix && <span className="text-xl text-signal-amber font-bold">{suffix}</span>}
              </>
            )}
          </div>
        </div>
        {source && <div className="text-[9px] text-static-grey font-mono mt-6 uppercase tracking-wider">{source}</div>}
      </GlassCard>
    </Reveal>
  );
}
