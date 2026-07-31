import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Moon, Sun, Leaf, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions: { id: ThemeMode; label: string; icon: React.ReactNode; color: string; desc: string; previewBg: string }[] = [
    {
      id: 'dark',
      label: 'Dark',
      icon: <Moon className="w-4 h-4 text-cyan-400" />,
      color: 'from-slate-900 to-slate-950',
      desc: 'Modern Corporate Dark (Default)',
      previewBg: 'bg-slate-900 border-cyan-500/40 text-cyan-400'
    },
    {
      id: 'light',
      label: 'Light',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      color: 'from-slate-100 to-white',
      desc: 'Clean & Luxurious Off-White',
      previewBg: 'bg-white border-amber-400/60 text-amber-600'
    },
    {
      id: 'eyecare',
      label: 'Eye Care',
      icon: <Leaf className="w-4 h-4 text-emerald-600" />,
      color: 'from-[#eae4db] to-[#f4f0ea]',
      desc: 'Warm Soft Cream for Extended Reading',
      previewBg: 'bg-[#fbf8f3] border-emerald-600/50 text-emerald-700'
    }
  ];

  const currentThemeObj = themeOptions.find(t => t.id === theme) || themeOptions[0];

  return (
    <div 
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex items-center select-none"
      aria-label="Theme System Selector"
    >
      <div className="relative">
        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Change website theme appearance"
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-slate-900/90 [data-theme=light]:bg-white/95 [data-theme=eyecare]:bg-[#fbf8f3]/95 border border-slate-700/80 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#ded6cc] text-slate-100 [data-theme=light]:text-slate-800 [data-theme=eyecare]:text-[#2c2724] shadow-2xl hover:scale-105 backdrop-blur-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        >
          <div className="p-1.5 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 [data-theme=light]:from-blue-50 [data-theme=light]:to-cyan-100 [data-theme=eyecare]:from-[#eae4db] [data-theme=eyecare]:to-[#ded6cc] flex items-center justify-center">
            <Palette className="w-4 h-4 text-cyan-400 [data-theme=light]:text-blue-600 [data-theme=eyecare]:text-[#2a7375] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden md:inline">
            Theme: <span className="capitalize font-extrabold text-cyan-400 [data-theme=light]:text-blue-600 [data-theme=eyecare]:text-[#2a7375]">{currentThemeObj.label}</span>
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 [data-theme=light]:bg-blue-600 [data-theme=eyecare]:bg-[#2a7375]"></span>
          </span>
        </button>

        {/* Floating Vertical Selector Menu with Smooth Animations */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop listener to close when clicking outside */}
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setIsOpen(false)} 
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: -10, x: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10, x: 10 }}
                transition={{ type: 'spring', damping: 24, stiffness: 350 }}
                className="absolute right-0 mt-3 z-50 w-64 p-3 rounded-2xl bg-slate-950/95 [data-theme=light]:bg-white/98 [data-theme=eyecare]:bg-[#fbf8f3]/98 border border-slate-800/90 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 [data-theme=light]:border-slate-100 [data-theme=eyecare]:border-[#eae4db] px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 [data-theme=light]:text-slate-500 [data-theme=eyecare]:text-[#70665c]">
                    Select Experience
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 [data-theme=light]:bg-blue-50 [data-theme=eyecare]:bg-[#eae4db] text-cyan-400 [data-theme=light]:text-blue-700 [data-theme=eyecare]:text-[#2a7375] font-semibold">
                    3 Modes
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {themeOptions.map((opt) => {
                    const isActive = theme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setTheme(opt.id);
                          setIsOpen(false);
                        }}
                        className={`group relative flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/20 [data-theme=light]:from-blue-50 [data-theme=light]:to-sky-50 [data-theme=eyecare]:from-[#eae4db] [data-theme=eyecare]:to-[#ded6cc] border-cyan-500/50 [data-theme=light]:border-blue-400 [data-theme=eyecare]:border-[#2a7375] shadow-md'
                            : 'bg-slate-900/50 [data-theme=light]:bg-slate-50 [data-theme=eyecare]:bg-[#eae4db]/40 border-slate-800/60 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#e2d9cd] hover:border-slate-700 [data-theme=light]:hover:border-slate-300 [data-theme=eyecare]:hover:border-[#cdbead]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg border shadow-xs ${opt.previewBg}`}>
                            {opt.icon}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#1c1815] flex items-center gap-1.5">
                              {opt.label}
                              {opt.id === 'dark' && <span className="text-[9px] text-cyan-400 font-normal">(Default)</span>}
                            </div>
                            <div className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=eyecare]:text-[#70665c]">
                              {opt.desc}
                            </div>
                          </div>
                        </div>

                        {isActive && (
                          <div className="w-5 h-5 rounded-full bg-cyan-500 [data-theme=light]:bg-blue-600 [data-theme=eyecare]:bg-[#2a7375] text-slate-950 [data-theme=light]:text-white [data-theme=eyecare]:text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
