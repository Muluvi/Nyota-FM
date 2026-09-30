import { useEffect, useRef, useState, ReactNode } from 'react';

export default function HighlightText({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block z-0 whitespace-nowrap md:whitespace-normal">
      <span className="relative z-10">{children}</span>
      <span 
        className={`absolute bottom-0 left-0 h-[40%] bg-signal-amber/40 z-0 transition-all duration-1000 ease-out origin-left rounded-sm ${
          isVisible ? 'w-full' : 'w-0'
        }`}
      />
    </span>
  );
}
