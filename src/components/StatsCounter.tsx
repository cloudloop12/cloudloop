import React from 'react';
import { motion } from 'motion/react';
import { STATS_DATA } from '../data/companyData';
import { TrendingUp, Award, Building2, Users } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative border-y border-slate-800/80 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-slate-950 to-cyan-950/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all text-center space-y-3 group"
            >
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <h3 className="text-base font-bold text-white">{stat.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
