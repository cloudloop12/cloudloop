import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, Zap, DollarSign, Headphones, Award, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Certified Professional Team',
      description: 'Senior UAE PRO specialists with direct government channels alongside veteran software architects and cybersecurity engineers.',
      icon: Users,
      badge: 'Expert Team',
    },
    {
      title: 'VIP Fast-Track Processing',
      description: 'Express license issuance in 24 hours, expedited medical fitness VIP escort, and rapid cloud deployment sprints.',
      icon: Zap,
      badge: 'Express Speed',
    },
    {
      title: '100% Transparent Pricing',
      description: 'Itemized pricing breakdowns with zero hidden government surcharges, unexpected retainer fees, or licensing markups.',
      icon: DollarSign,
      badge: 'Zero Hidden Fees',
    },
    {
      title: 'Trusted UAE Regulated Partner',
      description: 'Fully compliant with Dubai DED, MOHRE, ICP, GDRFA, SIRA, DESC, and FTA tax regulatory mandates.',
      icon: ShieldCheck,
      badge: '100% Compliant',
    },
    {
      title: '24/7 Dedicated Support & SLA',
      description: 'Direct access to your dedicated account manager and IT support helpdesk with guaranteed response under 30 minutes.',
      icon: Headphones,
      badge: '24/7 Availability',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>The Cloudloop Group Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Why Leading Businesses Choose Cloudloop
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We deliver the trust, speed, and precision required to power corporate success in the United Arab Emirates.
          </p>
        </div>

        {/* 5-Card Grid Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 p-8 space-y-4 hover:shadow-2xl hover:shadow-cyan-950/30 transition-all hover:-translate-y-1.5 overflow-hidden shiny-card"
              >
                {/* Accent Corner Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none"></div>

                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-[10px] font-bold">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {feat.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Corporate Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
