import React, { MouseEventHandler, CSSProperties } from 'react';

export default function GlassCard({ children, className = '', active = false, onClick, style }: { children: React.ReactNode; className?: string; active?: boolean; onClick?: MouseEventHandler<HTMLDivElement>; style?: CSSProperties }) {
  return (
    <div onClick={onClick} className={`p-6 md:p-8 transition-all duration-300 ${active ? 'glass-panel-active' : 'glass-panel'} ${className}`} style={style}>
      {children}
    </div>
  );
}
