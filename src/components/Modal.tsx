import React, { useEffect, useRef } from 'react';

/**
 * Native <dialog> opened with showModal(): focus is trapped, Esc closes, the rest of
 * the page is inert, and focus returns to the trigger on close. Clicking the backdrop
 * closes it too.
 */
export function Modal({
  open,
  onClose,
  label,
  labelledBy,
  className = '',
  children,
}: {
  open: boolean;
  onClose: () => void;
  label?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={`bg-transparent p-0 text-paper backdrop:bg-ink/80 backdrop:backdrop-blur-sm ${className}`}
    >
      {open && children}
    </dialog>
  );
}
