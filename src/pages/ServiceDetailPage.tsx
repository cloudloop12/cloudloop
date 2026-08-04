import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, Clock, FileText, 
  HelpCircle, Sparkles, Building2, UserCheck, Plane, Award, PhoneCall, 
  ChevronDown, MessageSquare, CreditCard, Sparkle, AlertCircle, ArrowRight
} from 'lucide-react';
import { DETAILED_SERVICES_MAP } from '../data/extendedData';
import { SEOHead } from '../components/SEOHead';
import { ServiceInquiryForm } from '../components/ServiceInquiryForm';
import { PriceDisplay } from '../components/PriceDisplay';

interface ServiceDetailPageProps {
  onOpenConsultation?: (preselectedService?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenConsultation }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Lookup service from DETAILED_SERVICES_MAP using slug or normalized slug
  const normalizedSlug = (slug || 'uae-tourist-visa').toLowerCase();
  const service = DETAILED_SERVICES_MAP[normalizedSlug] || DETAILED_SERVICES_MAP['uae-tourist-visa'];

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-sky-400">Service Page Not Found</h1>
          <p className="text-slate-400">The requested service page does not exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-sky-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenConsultation) {
      onOpenConsultation(service.title);
    }
  };

  // Extract related services
  const relatedServices = Object.values(DETAILED_SERVICES_MAP)
    .filter(s => s.slug !== service.slug && s.division === service.division)
    .slice(0, 3);

  // Construct JSON-LD Schema
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.overview,
    provider: {
      '@type': 'GovernmentService',
      name: 'Cloudloop Group UAE Documents Clearing',
      url: 'https://cloudloop.ae',
    },
    areaServed: 'United Arab Emirates',
    offers: {
      '@type': 'Offer',
      price: service.pricingStarting.replace(/[^0-9]/g, '') || '350',
      priceCurrency: 'AED',
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
      <SEOHead
        title={`${service.title} | Cloudloop Group UAE`}
        description={service.overview.substring(0, 160)}
        canonicalUrl={`https://cloudloop.ae/services/${service.slug}`}
        jsonLd={jsonLdData}
      />

      {/* 1. HERO BANNER */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800/80">
        {/* Background Image with Dark Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80'}
            alt={service.title}
            className="w-full h-full object-cover opacity-15 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
            <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/documents-clearing" className="hover:text-sky-400 transition-colors">Documents Clearing</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-400 font-medium">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wide uppercase">
                  {service.category || 'Visa & Residency Services'}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Timeline: {service.timeline}
                </span>
              </div>

              {/* Service Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.title} {service.flag && <span className="inline-block ml-2">{service.flag}</span>}
              </h1>

              {/* Headline */}
              <p className="text-lg sm:text-xl font-medium text-sky-200/90 leading-relaxed">
                {service.heroHeadline}
              </p>

              {/* Overview snippet */}
              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                {service.overview}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={scrollToInquiry}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <Sparkles className="w-5 h-5" /> Apply Now & Request Quote
                </button>

                <a
                  href={`https://wa.me/971556126050?text=Hello%20Cloudloop,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900/90 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-semibold py-3.5 px-6 rounded-xl border border-emerald-500/30 transition-all flex items-center justify-center gap-2.5 text-base"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400" /> WhatsApp Direct Advisor
                </a>
              </div>
            </div>

            {/* Hero Quick Stat Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Official Fee Starting From</span>
                    <PriceDisplay price={service.pricingStarting} variant="large" />
                  </div>
                  <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/30 rounded-xl flex items-center justify-center text-sky-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-sm">
                  {service.benefits.slice(0, 4).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToInquiry}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold py-3 px-4 rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-2 text-sm"
                >
                  Check Your Eligibility <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW & BENEFITS */}
      <section className="py-16 md:py-20 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">Service Breakdown</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Choose Cloudloop for {service.title}?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Our UAE government clearing experts eliminate bureaucracy and ensure full compliance with official immigration portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/30 rounded-2xl p-6 transition-all hover:bg-slate-900 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{benefit}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Verified against official UAE GDRFA / ICP guidelines for guaranteed clearance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR PROCESS TIMELINE */}
      <section className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">Clear Step-by-Step Guidance</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              How the {service.title} Process Works
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              From document collection to final issuance, here is your step-by-step roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.processSteps.map((step) => (
              <div key={step.step} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    0{step.step}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Step {step.step} of 06</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REQUIREMENTS SECTION */}
      <section className="py-16 md:py-20 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">Checklist & Guidelines</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Required Documents for {service.title}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Ensure you have the following clear color documents ready prior to application submission.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" /> Standard Document Checklist
              </h3>
              <ul className="space-y-4">
                {service.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categorized Requirements if available */}
            <div className="space-y-6">
              {service.requirements?.passport && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    📌 Passport Specifications
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {service.requirements.passport.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.requirements?.photo && service.requirements.photo.length > 0 && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    📸 Photograph Guidelines
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {service.requirements.photo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.requirements?.supportingDocs && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    📄 Financial & Supporting Evidence
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {service.requirements.supportingDocs.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESSING TIMES & PRICING */}
      <section className="py-16 md:py-20 border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">Transparent Pricing & Speed</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Processing Timelines & Fee Packages
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              No hidden fees. Government portal fees, service charges, and document clearing are fully itemized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Package */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="inline-block px-3 py-1 bg-slate-800 text-slate-300 font-semibold text-xs rounded-full mb-4">
                  Standard Government Queue
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Standard Processing</h3>
                <div className="mb-4">
                  <PriceDisplay price={service.pricingStarting} variant="large" />
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Turnaround: <strong className="text-white">{service.processingTimes?.standard.time || service.timeline}</strong>
                </p>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                  {(service.pricingPackage?.whatsIncluded || [
                    'Official Government Portal Fees',
                    'Document Audit & Verification',
                    'Dedicated PRO Application Typing',
                    'PDF Delivery via WhatsApp & Email'
                  ]).map((inc, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={scrollToInquiry}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm border border-slate-700 cursor-pointer"
              >
                Select Standard Package
              </button>
            </div>

            {/* Express VIP Package */}
            <div className="bg-slate-900 border-2 border-sky-500/50 rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-sky-500/10">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Recommended VIP
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-sky-500/20 text-sky-300 font-semibold text-xs rounded-full mb-4">
                  Fast-Track Express Clearance
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Express VIP Priority</h3>
                <div className="text-3xl font-extrabold text-sky-400 mb-4">
                  {service.pricingStarting} <span className="text-xs text-slate-400 font-normal">+ VIP Add-On</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Turnaround: <strong className="text-emerald-400">{service.processingTimes?.express?.time || '12 - 24 Hours'}</strong>
                </p>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                  <li className="flex items-center gap-2.5 text-slate-200 font-semibold">
                    <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0" /> Priority Express Government Queue
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 1-on-1 Senior PRO Advisor
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Free Flight & Hotel Itinerary Vouchers
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Instant WhatsApp Real-time Updates
                  </li>
                </ul>
              </div>

              <button
                onClick={scrollToInquiry}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-sky-500/20 text-sm cursor-pointer"
              >
                Apply for Express VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions for {service.title}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Everything you need to know about eligibility, timelines, fees, and government rules.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => {
              const questionText = faq.question || faq.q || '';
              const answerText = faq.answer || faq.a || '';
              const isOpen = openFaq === index;

              return (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-sky-400 transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    <span>{questionText}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-sky-400' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                          {answerText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. INQUIRY FORM SECTION */}
      <section className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceInquiryForm serviceTitle={service.title} category={service.category} />
        </div>
      </section>

      {/* 8. RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">Explore More Services</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Related Documents Clearing Services</h3>
              </div>
              <Link to="/documents-clearing" className="text-xs font-semibold text-sky-400 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-2xl p-6 transition-all hover:-translate-y-1 block group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{rel.flag || '📄'}</span>
                    <PriceDisplay price={rel.pricingStarting} variant="inline" aedClassName="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {rel.overview}
                  </p>
                  <span className="text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
