import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { StatsCounter } from '../components/StatsCounter';
import { CERTIFICATIONS_DATA } from '../data/extendedData';
import { ShieldCheck, Award, Users, Clock, CheckCircle2, Lock, Sparkles, Building2, Laptop } from 'lucide-react';

interface WhyChooseUsPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const WhyChooseUsPage: React.FC<WhyChooseUsPageProps> = ({ onOpenConsultation }) => {
  const diffs = [
    { title: 'Dual Enterprise Specialization', desc: 'Eliminating the headache of coordinating with separate PRO agencies and software vendors by keeping both under one corporate umbrella.', icon: Building2 },
    { title: 'Fixed Upfront Quote Policy', desc: 'No surprise government fee add-ons or hidden processing charges. What we quote in our initial proposal is 100% final.', icon: Lock },
    { title: 'VIP Government Express Liaison', desc: 'Direct, prioritized submissions with Dubai DED, MOHRE, GDRFA, and Federal Tax Authority officials.', icon: Clock },
    { title: 'Dedicated Dual-Division Manager', desc: 'Every client is assigned a dedicated senior account manager who handles both business setup paperwork and IT execution.', icon: Users },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Why Choose Cloudloop Group | Dubai Enterprise Advantage"
        description="Discover why top international investors, UAE startups, and corporate conglomerates trust Cloudloop Group for business setup, PRO, and IT engineering."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md inline-block">
            THE CLOUDLOOP ADVANTAGE
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            Why Top Enterprises Choose <span className="text-blue-500">Cloudloop</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Combining deep UAE regulatory mastery with modern software engineering craftsmanship to build seamless, scalable business operations.
          </p>
        </div>
      </section>

      {/* Main Feature Component */}
      <WhyChooseUs onOpenConsultation={onOpenConsultation} />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Differentiators Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white uppercase">Key Differentiators That Set Us Apart</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {diffs.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex gap-6 items-start">
              <div className="p-4 bg-blue-600/20 text-blue-400 rounded-2xl shrink-0">
                <item.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Badge Grid */}
      <section className="py-16 bg-[#0F172A] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-extrabold text-white uppercase mb-8">Official Compliance Accreditations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white">{cert.name}</h4>
                <span className="text-[10px] text-slate-500 block mt-1">{cert.code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold text-white uppercase">Experience the Cloudloop Group Standard</h2>
          <button
            onClick={() => onOpenConsultation()}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            REQUEST FREE ENTERPRISE CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
};
