import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Eye, Compass, Award, Building2, Laptop, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  const coreValues = [
    {
      title: 'Integrity & Compliance',
      description: 'Strict adherence to UAE Federal Laws, DED guidelines, and international IT security frameworks.',
      icon: Shield,
    },
    {
      title: 'Precision Execution',
      description: 'Zero-error document processing and high-performance, fault-tolerant software engineering.',
      icon: Target,
    },
    {
      title: 'Digital Innovation',
      description: 'Pioneering modern cloud architectures, automation, and AI-driven workflow transformation.',
      icon: Laptop,
    },
    {
      title: 'Client-Centric Excellence',
      description: 'Dedicated account managers providing 24/7 proactive advisory and rapid response times.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Excellence in the UAE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About Cloudloop Group
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            One umbrella company bridging government business formation with enterprise digital engineering to accelerate your UAE market success.
          </p>
        </div>

        {/* Corporate Story & Dual Division Synergy Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-950/30">
              <img
                src="/src/assets/images/documents_clearing_thumb_1785305602365.jpg"
                alt="Cloudloop Group Dubai Executive Boardroom"
                className="w-full h-[420px] object-cover filter brightness-95 contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              {/* Floating Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 font-extrabold text-xl">
                    C
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Cloudloop Umbrella Synergy</h4>
                    <p className="text-xs text-slate-300">
                      Eliminating vendor fragmentation by integrating corporate PRO services with end-to-end technology solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Mission / Vision Tabs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Empowering UAE Enterprises Through Integrated Solutions
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Founded in Dubai, United Arab Emirates, Cloudloop Group was built to solve a crucial challenge faced by modern companies: navigating complex government regulatory frameworks while simultaneously deploying reliable digital infrastructure.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                By housing two specialized divisions—<strong>Cloudloop Documents Clearing</strong> and <strong>Cloudloop Information Technology</strong>—under one unified leadership, we provide our clients with a single, accountable corporate partner for trade licensing, visas, tax, custom software, cybersecurity, and cloud engineering.
              </p>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To deliver seamless, transparent government PRO clearing and enterprise technology solutions that enable businesses to start, scale, and thrive in the UAE.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To be the Middle East’s most trusted multi-disciplinary corporate group, renowned for speed, legal compliance, and technical innovation.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Core Values 4-Grid */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-white">Our Core Principles</h3>
            <p className="text-xs text-slate-400">The standards that define every engagement across both divisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">{val.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
