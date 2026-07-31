import React, { useState, useEffect } from 'react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth timing for preloader display
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 700);
      return () => clearTimeout(removeTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center space-y-6 text-center px-4">
        {/* Glow halo */}
        <div className="absolute w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Animated Icon centered using fav.png */}
        <div className="relative z-10 flex items-center justify-center">
          <img
            src="/fav.png"
            alt="Cloudloop Group"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain animate-pulse filter drop-shadow-[0_0_25px_rgba(0,180,255,0.5)] transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Brand Text */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-black text-white tracking-[0.2em] font-sans">
              CLOUDLOOP
            </span>
            <span className="text-xs font-bold text-cyan-400 -mt-2">®</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-cyan-500/50" />
            <span className="text-[11px] font-extrabold text-cyan-400 tracking-[0.3em] uppercase">
              GROUP
            </span>
            <span className="h-[1px] w-8 bg-cyan-500/50" />
          </div>
        </div>

        {/* Progress Bar Loader */}
        <div className="relative z-10 w-48 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 animate-pulse w-full rounded-full" />
        </div>

        <p className="relative z-10 text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
          UAE Corporate PRO & IT Engineering
        </p>
      </div>
    </div>
  );
};
