import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  const themeOptions: { id: ThemeMode; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
    {
      id: 'dark',
      label: 'Dark',
      icon: <Moon className="w-4 h-4" />,
      color: 'from-cyan-500 to-blue-600',
      desc: 'Corporate Dark (Default)'
    },
    {
      id: 'light',
      label: 'Light',
      icon: <Sun className="w-4 h-4" />,
      color: 'from-amber-400 to-orange-500',
      desc: 'Clean & Luxurious Light'
    },
    {
      id: 'eyecare',
      label: 'Eye-Care',
      icon: <Leaf className="w-4 h-4" />,
      color: 'from-emerald-500 to-teal-600',
      desc: 'Soothing Warm Cream'
    }
  ];

  return (
    <aside 
      aria-label="Theme Customizer" 
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex items-center select-none"
    >
      {/* Toggle Expand/Collapse Mini Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse theme switcher" : "Expand theme switcher"}
        className="hidden sm:flex items-center justify-center w-6 h-12 -mr-1 rounded-l-xl bg-slate-900/90 [data-theme=light]:bg-white/90 [data-theme=eyecare]:bg-[#eae4db]/90 border-y border-l border-slate-700/60 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#dcd2c4] text-slate-400 hover:text-cyan-400 shadow-lg backdrop-blur-md transition-all duration-300 z-10"
      >
        {isExpanded ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Main Switcher Capsule */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-slate-950/90 [data-theme=light]:bg-white/95 [data-theme=eyecare]:bg-[#f4f0ea]/95 border border-slate-800/80 [data-theme=light]:border-slate-200/90 [data-theme=eyecare]:border-[#ded6cc] shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 [data-theme=light]:text-slate-500 [data-theme=eyecare]:text-[#6e6459] text-center hidden sm:block">
              Theme
            </div>

            {themeOptions.map((opt) => {
              const isActive = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id)}
                  title={opt.desc}
                  className={`relative group flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#1c1815] font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900 [data-theme=eyecare]:text-[#665d53] [data-theme=eyecare]:hover:text-[#2c2724] hover:bg-slate-800/40 [data-theme=light]:hover:bg-slate-100 [data-theme=eyecare]:hover:bg-[#eae4db]/60'
                  }`}
                >
                  {/* Sliding Active Highlight Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="active-theme-capsule"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-teal-500/30 border border-cyan-500/40 [data-theme=light]:bg-slate-100 [data-theme=light]:border-blue-500/40 [data-theme=eyecare]:bg-[#eae4db] [data-theme=eyecare]:border-[#2a7375]/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] pointer-events-none z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Icon with subtle status ring */}
                  <span
                    className={`relative z-10 p-1 rounded-lg transition-colors ${
                      isActive
                        ? opt.id === 'dark'
                          ? 'bg-blue-950 text-cyan-400 border border-cyan-500/40'
                          : opt.id === 'light'
                          ? 'bg-amber-100 text-amber-600 border border-amber-300'
                          : 'bg-emerald-900/30 text-emerald-700 [data-theme=eyecare]:text-[#2a7375] border border-emerald-500/40'
                        : 'text-slate-400 [data-theme=light]:text-slate-500 [data-theme=eyecare]:text-[#70665c]'
                    }`}
                  >
                    {opt.icon}
                  </span>

                  {/* Text Label */}
                  <span className="relative z-10 whitespace-nowrap text-xs font-medium hidden sm:inline">
                    {opt.label}
                  </span>

                  {/* Active status indicator dot */}
                  {isActive && (
                    <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-cyan-400 [data-theme=light]:bg-blue-600 [data-theme=eyecare]:bg-[#2a7375] animate-pulse ml-auto hidden sm:block" />
                  )}

                  {/* Desktop Hover Tooltip (shown on mobile/collapsed) */}
                  <span className="absolute right-full mr-2.5 px-2.5 py-1.5 rounded-lg bg-slate-900 [data-theme=light]:bg-slate-800 [data-theme=eyecare]:bg-[#2c2724] text-white text-[11px] font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 sm:hidden">
                    {opt.label}: {opt.desc}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
