import { useEffect, useState, useRef } from 'react';

interface UseInViewOptions {
  triggerOnce?: boolean;
  threshold?: number;
}

export function useInView(options: UseInViewOptions = {}) {
  const { triggerOnce = true, threshold = 0.1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!triggerOnce) {
        setInView(false);
      }
    }, { threshold });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnce, threshold]);

  return { ref, inView };
}
