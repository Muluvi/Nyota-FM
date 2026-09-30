import React from 'react';

interface LedgerRowProps {
  label: string;
  value: React.ReactNode;
  valueColor?: 'paper' | 'brass';
}

export function LedgerRow({ label, value, valueColor = 'paper' }: LedgerRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-hairline gap-2 sm:gap-4">
      <span className="font-body text-sage text-base sm:text-[17px] leading-snug">{label}</span>
      <span className={`font-mono text-lg sm:text-[22px] ${valueColor === 'brass' ? 'text-brass' : 'text-paper'}`}>
        {value}
      </span>
    </div>
  );
}
