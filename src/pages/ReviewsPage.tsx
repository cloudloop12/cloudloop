import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Testimonials } from '../components/Testimonials';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Star, ShieldCheck, Building2, Laptop, Quote, CheckCircle2, Award } from 'lucide-react';

interface ReviewsPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onOpenConsultation }) => {
  const caseStudies = [
    {
      title: 'Global Logistics Firm - Mainland Setup & Custom Fleet Portal',
      client: 'Apex Cargo Middle East FZ-LLC',
      division: 'Dual Division Execution',
      results: 'Completed 100% Mainland DED company setup, 45 employee visas, and custom real-time GPS fleet tracking mobile application in under 21 business days.',
      metrics: ['45 Employee Visas Issued', '21-Day Turnaround', '100% On-Time SLA'],
    },
    {
      title: 'FinTech Platform - Golden Visa & VAPT Security Audit',
      client: 'Vanguard Capital Dubai',
      division: 'Information Technology & PRO',
      results: 'Secured 10-year Golden Visas for founding partners while delivering ISO 27001-compliant penetration testing and AWS security setup for DIFC license.',
      metrics: ['5 Golden Visas Stamped', 'Zero Security Vulnerabilities', 'DIFC License Approved'],
    },
    {
      title: 'Healthcare Enterprise - Branch Licensing & Infrastructure',
      client: 'Royal Emirates Medical Group',
      division: 'Documents Clearing & IT Support',
      results: 'Processed DHA medical licenses, MOHRE labor permits, and installed SIRA-approved CCTV camera security across 3 clinic locations in Business Bay.',
      metrics: ['3 Clinic Locations Licensed', 'SIRA Certificate Issued', '24/7 Managed IT Support'],
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Client Reviews & Case Studies | Cloudloop Group Dubai"
        description="Read client reviews and enterprise case studies from international investors and UAE companies who partnered with Cloudloop Group."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="text-sm font-extrabold text-white ml-2">4.9 / 5.0 (500+ Verified UAE Clients)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            Client Reviews & <span className="text-blue-500">Case Studies</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Discover how Cloudloop Group empowers multinational corporations, tech startups, and high-net-worth investors across the United Arab Emirates.
          </p>
        </div>
      </section>

      {/* Main Testimonial Cards */}
      <Testimonials />

      {/* Enterprise Case Studies */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
            PROVEN RESULTS
          </span>
          <h2 className="text-3xl font-extrabold text-white uppercase mt-2">Enterprise Case Studies</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all">
              <div>
                <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-blue-400 text-[10px] font-bold uppercase rounded-md block w-fit mb-3">
                  {study.division}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{study.title}</h3>
                <span className="text-xs text-slate-400 font-semibold block mb-4">Client: {study.client}</span>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">{study.results}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                {study.metrics.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold text-white uppercase">Become Our Next Success Story</h2>
          <button
            onClick={() => onOpenConsultation()}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            START YOUR CONSULTATION TODAY
          </button>
        </div>
      </section>
    </div>
  );
};
