import React, { useEffect, useRef } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = React.useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('office@wetworksai.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[3px] transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] bg-white/95 backdrop-blur-md border border-neutral-300/80 rounded-2xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-neutral-900 transition-all transform animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Minimal Close Control */}
        <button
          onClick={onClose}
          aria-label="Close terminal"
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100/80 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Header Title */}
          <h2
            id="contact-title"
            className="text-lg sm:text-xl font-black tracking-tight text-black mb-4 select-none"
          >
            WETWORKSAI
          </h2>

          {/* Clickable Mailto Link with Copy Action */}
          <div className="w-full flex items-center justify-center gap-2 mb-6">
            <a
              href="mailto:office@wetworksai.com"
              className="font-mono text-sm sm:text-[15px] font-semibold text-neutral-900 hover:text-black hover:underline tracking-tight transition-colors py-2 px-3.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200"
            >
              office@wetworksai.com
            </a>
            <button
              onClick={handleCopyEmail}
              title="Copy email address"
              aria-label="Copy email address"
              className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Cryptic Terminal Message */}
          <p className="text-sm sm:text-base uppercase font-bold tracking-wider text-neutral-800 leading-relaxed whitespace-pre-line border-t border-neutral-200/70 pt-5 w-full select-none">
            {`Make your deal.

Email WETWORKSAI.
THE AI WORLD IS ABOUT TO CHANGE.`}
          </p>
        </div>
      </div>
    </div>
  );
}
