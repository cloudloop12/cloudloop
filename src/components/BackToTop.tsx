import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-cyan-400 hover:text-white hover:bg-slate-800 shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
      title="Back to Top"
      aria-label="Back to Top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};
