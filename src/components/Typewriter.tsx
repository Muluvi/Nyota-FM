import { useState, useEffect } from 'react';

export default function Typewriter({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    
    return () => clearInterval(typingInterval);
  }, [text, started, speed]);

  return (
    <span className="relative">
      {displayedText}
      <span className="animate-[blink-caret_0.75s_step-end_infinite] border-r-2 border-signal-amber ml-[2px]"></span>
    </span>
  );
}
