import { useRef, useState, MouseEvent, ReactNode } from 'react';

export default function MagneticButton({ children, className, href }: { children: ReactNode; className?: string; href: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    // Only apply magnetic effect on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </a>
  );
}
