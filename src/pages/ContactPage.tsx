import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ContactSection } from '../components/ContactSection';
import { COMPANY_INFO } from '../data/companyData';
import { MapPin, Phone, Mail, Clock, MessageSquare, Building2, Laptop, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Contact Us | Cloudloop Group Headquarters Dubai"
        description="Get in touch with Cloudloop Group headquarters at Office No: 1001-04, Rigga Business Centre, Ibis Hotel, Dubai, UAE. Direct phone: +971 55 612 6050, Email: info@cloudloopgroup.com."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md inline-block">
            CORPORATE HEADQUARTERS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            Contact <span className="text-blue-500">Cloudloop Group</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Visit our office at Rigga Business Centre, Ibis Hotel in Dubai or schedule a remote consultation with our Documents Clearing and IT Directors.
          </p>
        </div>
      </section>

      {/* Main Contact Info & Form */}
      <ContactSection />

      {/* Map & Office Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white uppercase">Our Location in Dubai</h2>
          <p className="text-xs text-slate-400 mt-2">Office No: 1001-04, Rigga Business Centre, Ibis Hotel, Dubai, UAE — Convenient access with client parking.</p>
        </div>

        {/* Google Map Simulation / Embed */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-96 relative shadow-2xl">
          <iframe
            title="Cloudloop Group Location Map"
            src={COMPANY_INFO.googleMapsEmbed}
            className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};
