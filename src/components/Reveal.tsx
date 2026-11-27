import React, { ReactNode } from 'react';

type RevealProps = { children: ReactNode; className?: string; delay?: number };

/** Legacy wrapper kept for TouchpointFilter: renders immediately so content is never hidden (print, deep links). */
const Reveal: React.FC<RevealProps> = ({ children, className = '' }) => <div className={className}>{children}</div>;

export default Reveal;
