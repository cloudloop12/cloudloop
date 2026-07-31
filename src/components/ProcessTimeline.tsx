import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  FileCheck, 
  Cpu, 
  Rocket, 
  ChevronRight, 
  ShieldCheck, 
  Zap,
  Building2,
  Laptop
} from 'lucide-react';

interface ProcessTimelineProps {
  onOpenConsultation?: (preselectedService?: string) => void;
}

const STEP_ICONS = [
  { icon: MessageSquare, name: 'Consultation', label: 'Phase 01', color: 'from-blue-600 to-cyan-500' },
  { icon: FileCheck, name: 'Documentation', label: 'Phase 02', color: 'from-cyan-500 to-teal-400' },
  { icon: Cpu, name: 'Processing', label: 'Phase 03', color: 'from-indigo-600 to-blue-500' },
  { icon: Rocket, name: 'Delivery', label: 'Phase 04', color: 'from-sky-500 to-indigo-500' }
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const currentStepData = PROCESS_STEPS.find((s) => s.step === activeStep) || PROCESS_STEPS[0];

  return (
    <section id="process" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold shadow-lg shadow-blue-950/50">
            <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Structured UAE Execution Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our Interactive <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">4-Step Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            From initial consultation to commercial trade license issuance and live cloud software launch—engineered for complete clarity at every stage.
          </p>
        </motion.div>

        {/* ==================== DESKTOP HORIZONTAL TIMELINE ==================== */}
        <div className="mt-20 relative hidden lg:block">
          
          {/* Connecting Line Container */}
          <div className="absolute top-10 left-[8%] right-[8%] h-1 bg-slate-800 rounded-full z-0 overflow-hidden">
            {/* Animated Gradient Progress Line */}
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.7)]"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStep - 1) / (PROCESS_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Steps Circle Badges (Desktop Top Bar) */}
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {PROCESS_STEPS.map((stepItem, index) => {
              const meta = STEP_ICONS[index] || STEP_ICONS[0];
              const StepIcon = meta.icon;
              const isActive = activeStep === stepItem.step;
              const isPast = activeStep > stepItem.step;
              const isHovered = hoveredStep === stepItem.step;

              return (
                <div 
                  key={stepItem.step}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => setActiveStep(stepItem.step)}
                  onMouseEnter={() => setHoveredStep(stepItem.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Circular Node Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-tr ${meta.color} text-white shadow-2xl shadow-cyan-500/40 ring-4 ring-cyan-400/30 animate-pulse-glow`
                        : isPast
                        ? 'bg-slate-900 border-2 border-blue-500/60 text-cyan-300 shadow-md'
                        : 'bg-slate-900/90 border-2 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <StepIcon className={`w-8 h-8 transition-transform duration-300 ${isActive || isHovered ? 'scale-110 rotate-3' : ''}`} />
                    
                    {/* Step Number Badge Overlay */}
                    <span className={`absolute -top-1 -right-1 w-7 h-7 rounded-full text-[11px] font-extrabold flex items-center justify-center shadow-lg border ${
                      isActive
                        ? 'bg-white text-slate-950 border-cyan-400'
                        : isPast
                        ? 'bg-blue-900 text-cyan-300 border-blue-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      0{stepItem.step}
                    </span>
                  </motion.div>

                  {/* Step Title Label */}
                  <div className="mt-4 text-center space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                      {stepItem.timeframe}
                    </span>
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-white text-base' : 'text-slate-300 group-hover:text-white'}`}>
                      {stepItem.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cards Grid with Shiny Hover Effect */}
          <div className="mt-12 grid grid-cols-4 gap-6">
            {PROCESS_STEPS.map((stepItem, index) => {
              const meta = STEP_ICONS[index] || STEP_ICONS[0];
              const StepIcon = meta.icon;
              const isActive = activeStep === stepItem.step;
              const isPast = activeStep > stepItem.step;

              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveStep(stepItem.step)}
                  className={`shiny-card p-6 rounded-3xl border cursor-pointer flex flex-col justify-between transition-all duration-300 relative ${
                    isActive
                      ? 'bg-slate-900/95 border-cyan-500 shadow-2xl shadow-cyan-950/60 scale-[1.03] ring-1 ring-cyan-500/30'
                      : isPast
                      ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Status Header */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isActive
                          ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}>
                        {meta.label}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {stepItem.timeframe}
                      </span>
                    </div>

                    {/* Step Name & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>{stepItem.title}</span>
                      </h3>
                      <p className="text-xs text-cyan-400 font-medium mt-0.5">{stepItem.subtitle}</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>

                  {/* Key Output Deliverables List Preview */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Key Milestones</span>
                    {stepItem.deliverables.slice(0, 2).map((deliv, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-200 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Step Indicator Pill */}
                  {isActive && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ==================== MOBILE & TABLET VERTICAL TIMELINE ==================== */}
        <div className="mt-12 lg:hidden space-y-6 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute top-6 bottom-6 left-6 w-1 bg-gradient-to-b from-blue-600 via-cyan-400 to-indigo-600 rounded-full -translate-x-1/2 z-0" />

          {PROCESS_STEPS.map((stepItem, index) => {
            const meta = STEP_ICONS[index] || STEP_ICONS[0];
            const StepIcon = meta.icon;
            const isActive = activeStep === stepItem.step;

            return (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveStep(stepItem.step)}
                className="relative z-10 pl-14"
              >
                {/* Node Icon on Left Bar */}
                <div 
                  className={`absolute left-0 top-3 -translate-x-1/2 w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xs shadow-xl transition-all ${
                    isActive 
                      ? `bg-gradient-to-tr ${meta.color} text-white ring-4 ring-cyan-500/30 scale-110` 
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <StepIcon className="w-6 h-6" />
                </div>

                {/* Card Body */}
                <div className={`shiny-card p-6 rounded-3xl border transition-all ${
                  isActive 
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/50' 
                    : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      {meta.label} • {stepItem.timeframe}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                      Step 0{stepItem.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{stepItem.title}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{stepItem.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{stepItem.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                    {stepItem.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==================== ACTIVE STEP DEEP-DIVE EXPANDED SHOWCASE ==================== */}
        <motion.div
          key={currentStepData.step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-14 p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden shiny-card"
        >
          {/* Subtle Glow Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-7 space-y-5 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Phase 0{currentStepData.step} Deep-Dive Blueprint</span>
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {currentStepData.timeframe}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {currentStepData.title}: <span className="text-cyan-400 font-semibold">{currentStepData.subtitle}</span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {currentStepData.description}
            </p>

            {onOpenConsultation && (
              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation(`Phase 0${currentStepData.step}: ${currentStepData.title}`)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/25 group"
                >
                  <span>Start Phase 0{currentStepData.step} Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4 bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 relative z-10">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified Phase Deliverables</span>
            </h4>
            <div className="space-y-3">
              {currentStepData.deliverables.map((deliv, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200 font-medium leading-snug">{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
