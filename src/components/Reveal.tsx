import React, { useEffect, useRef, useState, ReactNode } from 'react';

type RevealProps = { children: ReactNode; className?: string; delay?: number };

const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Limit delay to prevent huge staggers (max 6 items equivalent = 6 * 75 = 450ms)
  const cappedDelay = Math.min(delay, 450);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out motion-reduce:transition-opacity motion-reduce:translate-y-0 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${cappedDelay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;

