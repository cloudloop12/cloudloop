import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Laptop, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { DivisionType } from '../types';

interface HeroProps {
  onSelectDivisionFilter?: (division: DivisionType) => void;
  onSelectDivision?: (division: DivisionType) => void;
  onOpenConsultation: (preselectedService?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectDivisionFilter,
  onSelectDivision,
  onOpenConsultation,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDivisionClick = (division: DivisionType) => {
    if (onSelectDivisionFilter) {
      onSelectDivisionFilter(division);
    } else if (onSelectDivision) {
      onSelectDivision(division);
    }

    const el = document.getElementById('services') || document.getElementById('divisions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Image Layer with Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="/src/assets/images/cloudloop_hero_bg_1785305585272.jpg"
          alt="Cloudloop Group Corporate Headquarters UAE"
          className="w-full h-full object-cover object-center filter brightness-90 saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>

      {/* Mouse Follow Radial Light Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.12), transparent 80%)`,
        }}
      />

      {/* Floating Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Mesh Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column: Headings & Dual Division CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md backdrop-blur-md"
            >
              UAE Business Leaders & Enterprise Partner
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                Your Trusted Partner for <br />
                <span className="text-blue-500">Business Solutions</span> in the UAE
              </h1>
              <p className="text-sm sm:text-base font-bold text-slate-400 uppercase tracking-widest">
                CLOUDLOOP GROUP • DED & IT ENTERPRISE
              </p>
            </motion.div>

            {/* Description Explaining the Two Divisions */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Cloudloop Group orchestrates corporate growth through specialized divisions in government document processing and elite information technology services.
            </motion.p>

            {/* Dual Division Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              {/* Division 1 Button */}
              <button
                onClick={() => handleDivisionClick('documents')}
                className="group relative inline-flex items-center justify-between px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Division 01</span>
                    <span className="block text-sm font-extrabold">Documents Clearing</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Division 2 Button */}
              <button
                onClick={() => handleDivisionClick('it')}
                className="group relative inline-flex items-center justify-between px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Division 02</span>
                    <span className="block text-sm font-extrabold text-slate-100">Information Tech</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 ml-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300 pt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>100% Direct UAE Government PRO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>24/7 Enterprise Tech SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Transparent Corporate Pricing</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Column: Interactive Card Stack & Quick Estimator Trigger */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/30 overflow-hidden shiny-card"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cloudloop Synergy</h3>
                    <p className="text-xs text-slate-400">One Partner • Complete UAE Operations</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  UAE Compliant
                </span>
              </div>

              {/* Interactive Divisions Comparison Preview */}
              <div className="py-6 space-y-4">
                
                {/* Division 1 Block */}
                <div
                  onClick={() => handleDivisionClick('documents')}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Documents Clearing
                        </h4>
                        <p className="text-xs text-slate-400">Mainland, Free Zone, Visas, Tax & PRO</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">DED / Free Zones</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Golden Visas</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">FTA Tax</span>
                  </div>
                </div>

                {/* Division 2 Block */}
                <div
                  onClick={() => handleDivisionClick('it')}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Information Technology
                        </h4>
                        <p className="text-xs text-slate-400">Custom Apps, Cybersecurity & Cloud</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Next.js / React</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">SIRA CCTV</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">AWS Cloud</span>
                  </div>
                </div>

              </div>

              {/* Calculator Callout Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('calculator');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Calculate UAE Setup & IT Service Costs</span>
                  </div>
                  <span className="text-cyan-400 font-bold">Try Cost Estimator →</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Hero Footer: Key Statistics Highlights */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">500+</div>
            <div className="text-xs text-slate-400 font-medium">UAE Corporate Clients</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">1,200+</div>
            <div className="text-xs text-slate-400 font-medium">Licenses & Visas Issued</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">10+ Years</div>
            <div className="text-xs text-slate-400 font-medium">UAE Industry Presence</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</div>
            <div className="text-xs text-slate-400 font-medium">Client Satisfaction Rate</div>
          </div>
        </div>

      </div>
    </section>
  );
};
