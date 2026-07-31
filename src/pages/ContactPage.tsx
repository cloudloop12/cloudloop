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
        description="Get in touch with Cloudloop Group headquarters in Business Bay Dubai. Direct phone: +971 4 388 9210, Email: info@cloudloop.ae, P.O. Box 418892."
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
            Visit our Business Bay office in Dubai or schedule a remote consultation with our Documents Clearing and IT Directors.
          </p>
        </div>
      </section>

      {/* Main Contact Info & Form */}
      <ContactSection />

      {/* Map & Office Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white uppercase">Our Location in Dubai</h2>
          <p className="text-xs text-slate-400 mt-2">Opal Tower, Business Bay — Convenient access with underground client parking.</p>
        </div>

        {/* Google Map Simulation / Embed */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-96 relative shadow-2xl">
          <iframe
            title="Cloudloop Group Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786539269224!2d55.27438437609279!3d25.186729931707015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f68307d8123ad%3A0xa599540b7d7f1d4b!2sOpal%20Tower!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
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
