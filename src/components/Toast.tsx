import React, { useEffect, useState } from 'react';

export const toastEvent = new EventTarget();

export function showToast(message: string) {
  const event = new CustomEvent('show-toast', { detail: message });
  toastEvent.dispatchEvent(event);
}

export default function ToastContainer() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToast({ message: customEvent.detail, id: Date.now() });
    };
    
    toastEvent.addEventListener('show-toast', handleToast);
    return () => toastEvent.removeEventListener('show-toast', handleToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 transition-all duration-300 z-[100] ${toast ? 'bottom-24 md:bottom-12 opacity-100 translate-y-0' : 'bottom-16 md:bottom-8 opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <div className="bg-signal-amber text-broadcast-night px-6 py-3 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(245,166,35,0.4)] whitespace-nowrap">
        {toast?.message}
      </div>
    </div>
  );
}
