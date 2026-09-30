import React from 'react';

export function LedgerCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-ink-2 border border-hairline rounded max-w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
