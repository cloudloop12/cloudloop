import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { TEAM_DATA, CERTIFICATIONS_DATA } from '../data/extendedData';
import { STATS_DATA, COMPANY_INFO } from '../data/companyData';
import { Building2, Laptop, ShieldCheck, Award, Target, Eye, Users, CheckCircle2, ArrowRight, Phone, Sparkles, MapPin, Milestone } from 'lucide-react';

interface AboutPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const timelineEvents = [
    { year: '2014', title: 'Founding of Cloudloop Advisory', desc: 'Established initial business consultancy offices in Dubai Mainland serving local SMEs.' },
    { year: '2017', title: 'Expansion of Corporate PRO Division', desc: 'Launched Cloudloop Documents Clearing to provide direct government liaison for foreign investors.' },
    { year: '2020', title: 'Launch of IT & Software Division', desc: 'Formed Cloudloop Information Technology to deliver enterprise software, cloud, and security solutions.' },
    { year: '2023', title: 'Unification into Cloudloop Group', desc: 'Consolidated operations under one premier parent brand offering dual turnkey services.' },
    { year: '2026', title: 'Leading Enterprise Growth Partner', desc: 'Over 500 corporate clients served, 1,200+ projects completed across the UAE and GCC region.' },
  ];

  const coreValues = [
    {
      title: 'Regulatory Precision',
      desc: '100% compliance with UAE government laws, Ministry regulations, and FTA taxation frameworks.',
      icon: ShieldCheck,
    },
    {
      title: 'Engineering Craftsmanship',
      desc: 'Building robust, modern software, AWS cloud infrastructure, and SIRA-compliant security.',
      icon: Laptop,
    },
    {
      title: 'Client-Centric Transparency',
      desc: 'Fixed upfront pricing, dedicated SLA account management, and zero hidden government costs.',
      icon: Users,
    },
    {
      title: 'End-to-End Speed',
      desc: 'Express VIP processing for business setup, visas, and rapid modern app deployments.',
      icon: Award,
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="About Cloudloop Group | Leading UAE Corporate Umbrella Brand"
        description="Learn about Cloudloop Group, Dubai's premier umbrella corporation unifying Cloudloop Documents Clearing and Cloudloop Information Technology."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
              CORPORATE OVERVIEW & STORY
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
              About <span className="text-blue-500">Cloudloop Group</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              One umbrella company driving corporate growth across the United Arab Emirates through specialized business setup, PRO clearing, and enterprise IT engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Dual Divisions Intro */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 bg-blue-950 border border-blue-800 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Pioneering Enterprise Solutions in Dubai & the UAE
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Cloudloop Group LLC operates as a premier parent corporation in the United Arab Emirates. Recognizing that modern enterprises require both rapid government authorization and cutting-edge digital technology to thrive, Cloudloop Group operates two specialized, dedicated divisions:
            </p>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
                <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">1. Cloudloop Documents Clearing</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Direct government PRO liaison for Mainland LLC and Free Zone company incorporation, 10-year Golden Visas, corporate tax filing, and bank account approval.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
                <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl shrink-0">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">2. Cloudloop Information Technology</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    End-to-end digital engineering delivering bespoke software, mobile apps, AWS cloud migration, SIRA CCTV security, and managed 24/7 IT support.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              >
                REQUEST CONSULTATION
              </button>
              <Link
                to="/why-choose-us"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                WHY CLIENTS TRUST US
              </Link>
            </div>
          </div>

          {/* Right Feature Card */}
          <div className="relative">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="text-xl font-extrabold text-white uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Leadership Message
              </h3>
              <blockquote className="text-sm text-slate-300 italic leading-relaxed border-l-2 border-blue-500 pl-4 mb-6">
                "At Cloudloop Group, our mission has always been clear: to eradicate the friction international business owners face when establishing in Dubai. By combining government PRO clearing with elite software and IT infrastructure under one umbrella, we give our clients a true 360-degree growth engine."
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
                  alt="Faisal Al-Hammadi"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-white">Faisal Al-Hammadi</h4>
                  <p className="text-xs text-blue-400 font-semibold uppercase">Group Managing Director & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-[#0F172A] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white uppercase mb-4">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To serve as the United Arab Emirates’ most dependable single-source enterprise partner, empowering founders, SMEs, and corporate conglomerates with rapid regulatory approvals, seamless visa processing, and secure, high-performance technology.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white uppercase mb-4">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To continuously set the benchmark for corporate excellence in Dubai, pioneering integrated solutions that bridge government PRO compliance with digital transformation, cloud architecture, and cybersecurity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars / Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
            OUR PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-2">
            Core Values Driving Our Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
              <val.icon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white uppercase mb-2">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Journey / Timeline */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
              MILESTONES & HISTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-2">
              Our 12-Year UAE Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl relative">
                <span className="text-2xl font-extrabold text-blue-500 block mb-2">{evt.year}</span>
                <h3 className="text-sm font-bold text-white mb-2">{evt.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{evt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Executive Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
            EXECUTIVE LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-2">
            Meet Our Leadership Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_DATA.map((member) => (
            <div key={member.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Regulatory Registrations */}
      <section className="py-16 bg-[#0F172A] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-xl font-extrabold text-white uppercase">Accredited UAE Government & Technical Certifications</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <ShieldCheck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white leading-tight">{cert.name}</h4>
                <span className="text-[10px] text-slate-500 block mt-1">{cert.code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
