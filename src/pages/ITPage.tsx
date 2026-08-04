import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { DETAILED_SERVICES } from '../data/extendedData';
import { PriceDisplay } from '../components/PriceDisplay';
import { Laptop, Code2, Cpu, ShieldAlert, Cloud, Server, Camera, TrendingUp, ArrowRight, CheckCircle2, Search, Sparkles, Terminal } from 'lucide-react';

interface ITPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const ITPage: React.FC<ITPageProps> = ({ onOpenConsultation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const itServices = DETAILED_SERVICES.filter(s => s.division === 'it');

  const filteredServices = itServices.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const techStack = [
    { name: 'AWS & Azure Cloud', desc: 'Certified Cloud Architects' },
    { name: 'React / Next.js / TypeScript', desc: 'Modern Web Engineering' },
    { name: 'iOS & Android Native', desc: 'High-Performance Apps' },
    { name: 'Cyber Security VAPT', desc: 'Penetration Testing' },
    { name: 'SIRA Certified CCTV', desc: 'Dubai Police Security Compliance' },
    { name: 'Enterprise ERP', desc: 'SAP / Odoo Integration' },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Cloudloop Information Technology | Web, Mobile, Cyber Security & AWS Cloud Dubai"
        description="Official IT division of Cloudloop Group offering custom web development, iOS/Android mobile apps, cyber security VAPT audits, AWS cloud migration, and SIRA CCTV systems in Dubai."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md">
              <Laptop className="w-4 h-4" />
              <span>SPECIALIZED DIVISION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
              Cloudloop <span className="text-blue-500">Information Technology</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Enterprise digital engineering, custom software development, mobile application design, AWS cloud architecture, and government-standard cybersecurity for ambitious companies.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation('Custom Website & Web Development')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>GET FREE IT CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#it-services"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                EXPLORE IT SOLUTIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-8 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
            Supported Enterprise Technologies & Certification Standards
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center">
                <span className="text-xs font-extrabold text-white block">{tech.name}</span>
                <span className="text-[10px] text-blue-400 block">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & IT Services Grid */}
      <section id="it-services" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">
              Information Technology Service Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select an IT service to view tech stacks, SLAs, execution timelines, and deliverables.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search IT (e.g. Cyber, Web, AWS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* IT Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group shiny-card"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xl">
                    💻
                  </div>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-blue-400 text-[10px] font-bold rounded-full">
                    SLA: 99.9%
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                  {service.shortDesc}
                </p>

                <div className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
                  <span className="text-[11px] font-bold text-slate-300 uppercase block mb-1">Key Deliverables:</span>
                  {service.benefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Starting Price</span>
                  <PriceDisplay price={service.startingPrice} variant="inline" aedClassName="text-sm font-extrabold text-white" />
                </div>

                <Link
                  to={`/information-technology/${service.slug}`}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLA & IT Support Guarantee */}
      <section className="py-16 bg-[#0F172A] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-3xl font-extrabold text-blue-400">99.99%</h3>
            <p className="text-sm font-bold text-white uppercase mt-2">Cloud Infrastructure Uptime</p>
            <p className="text-xs text-slate-400 mt-1">Multi-region redundant AWS & Azure enterprise setup.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-3xl font-extrabold text-blue-400">&lt; 15 Mins</h3>
            <p className="text-sm font-bold text-white uppercase mt-2">Emergency Response SLA</p>
            <p className="text-xs text-slate-400 mt-1">Dedicated 24/7 Dubai-based network operations center.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-3xl font-extrabold text-blue-400">SIRA & ISO</h3>
            <p className="text-sm font-bold text-white uppercase mt-2">Compliance Certified</p>
            <p className="text-xs text-slate-400 mt-1">Certified for Dubai Police SIRA CCTV & ISO 27001 Security.</p>
          </div>
        </div>
      </section>

      {/* Dedicated CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Ready to Build Next-Generation Software or Secure Your Infrastructure?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Schedule an architectural review with our Lead Software Architect and Cyber Security Director in Dubai.
          </p>
          <button
            onClick={() => onOpenConsultation('Custom Website & Web Development')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            DISCUSS YOUR IT PROJECT
          </button>
        </div>
      </section>
    </div>
  );
};
