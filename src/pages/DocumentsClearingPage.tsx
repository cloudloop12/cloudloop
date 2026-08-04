import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { PriceDisplay } from '../components/PriceDisplay';
import { DETAILED_SERVICES } from '../data/extendedData';
import { Building2, FileCheck, Award, FileText, ShieldCheck, Calculator, Landmark, ArrowRight, CheckCircle2, Phone, Search, ExternalLink, Sparkles } from 'lucide-react';

interface DocumentsClearingPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const DocumentsClearingPage: React.FC<DocumentsClearingPageProps> = ({ onOpenConsultation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const docServices = DETAILED_SERVICES.filter(s => s.division === 'documents');

  const filteredServices = docServices.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const keyAuthorities = [
    { name: 'Dubai DED', desc: 'Mainland LLC Licenses' },
    { name: 'GDRFA Dubai', desc: 'Residency & Visa Authority' },
    { name: 'MOHRE', desc: 'Ministry of Human Resources' },
    { name: 'Federal Tax Authority', desc: 'Corporate Tax & VAT' },
    { name: 'DMCC / IFZA / Meydan', desc: 'Free Zone Jurisdictions' },
    { name: 'DHA / EHA', desc: 'Medical Fitness Screening' },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Cloudloop Documents Clearing | Dubai Business Setup & PRO Services"
        description="Official division of Cloudloop Group offering expert Dubai Mainland & Free Zone business setup, 10-Year Golden Visas, Labour & PRO clearing, and corporate bank opening."
      />

      {/* Division Hero Header */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md">
              <Building2 className="w-4 h-4" />
              <span>SPECIALIZED DIVISION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
              Cloudloop <span className="text-blue-500">Documents Clearing</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Your government-approved PRO and business setup partner in Dubai & the UAE. We eliminate bureaucracy, handling 100% of licensing, immigration, visas, tax, and corporate bank accounts.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation('Business Setup Mainland & Free Zone')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>START YOUR BUSINESS NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#all-services"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                BROWSE ALL PRO SERVICES
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Regulated Authorities Bar */}
      <section className="py-8 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
            Direct Government Liaison & Approval Authorities
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {keyAuthorities.map((auth, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-center">
                <span className="text-xs font-extrabold text-white block">{auth.name}</span>
                <span className="text-[10px] text-blue-400 block">{auth.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter / Search Bar */}
      <section id="all-services" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">
              Documents Clearing & PRO Service Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a service to view step-by-step processes, document checklists, and timelines.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. Visa, Tax)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group shiny-card"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-2xl">
                    {service.flag || '📄'}
                  </div>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-blue-400 text-[10px] font-bold rounded-full">
                    Est. {service.timeline}
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
                  <span className="text-[10px] text-slate-500 uppercase block">Starting From</span>
                  <PriceDisplay price={service.startingPrice} variant="inline" aedClassName="text-sm font-extrabold text-white" />
                </div>

                <Link
                  to={`/documents-clearing/${service.slug}`}
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

      {/* Dedicated CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Need Custom Business Setup Guidance in Dubai?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Speak with our senior Dubai Mainland & Free Zone consultants for a free structural assessment, cost breakdown, and legal compliance review.
          </p>
          <button
            onClick={() => onOpenConsultation('Business Setup Mainland & Free Zone')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            GET FREE PRO CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
};
