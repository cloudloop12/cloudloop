import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DETAILED_SERVICES } from '../data/extendedData';
import { SEOHead } from '../components/SEOHead';
import { Laptop, CheckCircle2, Clock, Cpu, ArrowRight, ShieldCheck, ChevronRight, HelpCircle, Code2 } from 'lucide-react';

interface ITServiceDetailPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const ITServiceDetailPage: React.FC<ITServiceDetailPageProps> = ({ onOpenConsultation }) => {
  const { slug } = useParams<{ slug: string }>();

  // Find service from dataset
  const service = DETAILED_SERVICES.find((s) => s.slug === slug && s.division === 'it') || DETAILED_SERVICES.find(s => s.division === 'it');

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center text-white">
        <h1 className="text-2xl font-bold">IT Service Not Found</h1>
        <Link to="/information-technology" className="text-blue-400 mt-4 inline-block">Back to IT Division</Link>
      </div>
    );
  }

  const relatedServices = DETAILED_SERVICES.filter(s => s.division === 'it' && s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title={`${service.title} | Cloudloop Information Technology Dubai`}
        description={service.shortDesc}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/information-technology" className="hover:text-white">Information Technology</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-semibold">{service.title}</span>
        </div>
      </div>

      {/* Detail Hero Banner */}
      <section className="py-16 bg-[#0F172A] border-b border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5" />
                  INFORMATION TECHNOLOGY
                </span>
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold rounded-md flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Timeline: {service.timeline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {service.shortDesc}
              </p>
            </div>

            {/* Price & Consultation Sidebar Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Enterprise IT Package</span>
              <div className="text-2xl font-extrabold text-white">
                Starting from <span className="text-blue-400">{service.startingPrice}</span>
              </div>
              <p className="text-xs text-slate-400">Includes dedicated solution architect, source code ownership, and 12-month SLA warranty.</p>

              <button
                onClick={() => onOpenConsultation(service.title)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>REQUEST CUSTOM IT SCOPE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white uppercase border-b border-slate-800 pb-3">
                Technical Overview & Scope
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white uppercase border-b border-slate-800 pb-3">
                Engineering Deliverables & Architecture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Technical Process */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white uppercase border-b border-slate-800 pb-3">
                Development & Deployment Lifecycle
              </h2>
              <div className="space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase">{step.step}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites / Inputs */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white uppercase border-b border-slate-800 pb-3">
                Project Prerequisites & Assets
              </h2>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.requiredDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <Code2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service FAQs */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white uppercase border-b border-slate-800 pb-3">
                Technical FAQs
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                      {faq.q}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed pl-6">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white uppercase border-b border-slate-800 pb-3">
                Related IT Services
              </h3>
              <div className="space-y-3">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/information-technology/${rel.slug}`}
                    className="block p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800/80 transition-all text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{rel.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-blue-950/40 border border-blue-500/30 rounded-3xl p-6 text-center space-y-4">
              <Cpu className="w-10 h-10 text-blue-400 mx-auto" />
              <h3 className="text-base font-bold text-white uppercase">SLA & Source Code Guarantee</h3>
              <p className="text-xs text-slate-300">Full IP transfer, clean GitHub code repository, and continuous DevOps deployment setup.</p>
              <button
                onClick={() => onOpenConsultation(service.title)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                SPEAK WITH LEAD ARCHITECT
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
