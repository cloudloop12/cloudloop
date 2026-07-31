import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2, Building2, Laptop, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';

interface ContactSectionProps {
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledService = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    division: 'both',
    serviceNeeded: prefilledService || 'Free Zone & Mainland Business Setup',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#06b6d4', '#10b981', '#ffffff'],
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with Cloudloop Group Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Get in Touch with Our Team
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Whether you require express UAE business setup or enterprise IT infrastructure engineering, our directors and senior consultants are ready to assist.
          </p>
        </div>

        {/* Grid: Form Left, Cards & Map Right */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Consultation Request Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-cyan-400">{formData.fullName}</strong>. A dedicated Cloudloop Group consultant will contact you at <strong className="text-white">{formData.phone || formData.email}</strong> within 15 minutes.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Cloudloop%20Team,%20I%20just%20submitted%20a%20contact%20request%20for%20${encodeURIComponent(formData.serviceNeeded)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Follow-Up</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        division: 'both',
                        serviceNeeded: 'Free Zone & Mainland Business Setup',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-xl font-bold text-white">Request Free Consultation & Quote</h3>
                  <span className="text-xs text-cyan-400 font-semibold">Response under 15 mins</span>
                </div>

                {/* Division Selector Tabs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Target Business Division</label>
                  <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, division: 'documents' })}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        formData.division === 'documents'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Documents Clearing
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, division: 'it' })}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        formData.division === 'it'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Information Tech
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, division: 'both' })}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        formData.division === 'both'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Both Divisions
                    </button>
                  </div>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Company / Business Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Acme Gulf Corp"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Primary Service Interest</label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <optgroup label="Documents Clearing Services">
                      <option value="Free Zone & Mainland Business Setup">Free Zone & Mainland Business Setup</option>
                      <option value="Golden Visa Assistance (5 & 10 Years)">Golden Visa Assistance (5 & 10 Years)</option>
                      <option value="Investor & Partner Visas">Investor & Partner Visas</option>
                      <option value="Labour, Immigration & PRO Services">Labour, Immigration & PRO Services</option>
                      <option value="Corporate Tax & VAT Services">Corporate Tax & VAT Services</option>
                      <option value="Corporate Bank Account Opening">Corporate Bank Account Opening</option>
                      <option value="Document Attestation Services">Document Attestation Services</option>
                    </optgroup>
                    <optgroup label="Information Technology Services">
                      <option value="Custom Website & Mobile App Development">Custom Website & Mobile App Development</option>
                      <option value="Custom Enterprise Software & ERP/CRM">Custom Enterprise Software & ERP/CRM</option>
                      <option value="Cyber Security & Penetration Audits">Cyber Security & Penetration Audits</option>
                      <option value="Cloud Migration & AWS Hosting">Cloud Migration & AWS Hosting</option>
                      <option value="IT Infrastructure & Structured Cabling">IT Infrastructure & Structured Cabling</option>
                      <option value="SIRA Compliant CCTV & Access Control">SIRA Compliant CCTV & Access Control</option>
                      <option value="Managed 24/7 IT Support Contract">Managed 24/7 IT Support Contract</option>
                    </optgroup>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Project Requirements / Details</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide additional context regarding your license requirements, team size, timeline, or technical specs..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <span>Submit Consultation Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Your privacy is protected. Non-Disclosure Guaranteed.</span>
                </div>
              </form>
            )}

          </div>

          {/* Contact Details & Google Map Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${COMPANY_INFO.phoneFormatted}`}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start gap-3 group"
              >
                <div className="p-3 rounded-xl bg-blue-600/20 text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Direct Phone</span>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                    {COMPANY_INFO.phone}
                  </p>
                  <span className="text-[11px] text-emerald-400 font-medium">Available 24/7</span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start gap-3 group"
              >
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Official Email</span>
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5 break-all">
                    {COMPANY_INFO.email}
                  </p>
                  <span className="text-[11px] text-slate-400">15-min response</span>
                </div>
              </a>
            </div>

            {/* Office Address Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Headquarters Office</h4>
                  <p className="text-xs text-slate-400">{COMPANY_INFO.poBox}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-1">
                {COMPANY_INFO.address}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl h-64 relative bg-slate-900">
              <iframe
                title="Cloudloop Group Dubai Location Map"
                src={COMPANY_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
                className="filter grayscale contrast-125 brightness-90"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] text-cyan-300 font-semibold backdrop-blur-md">
                📍 Sheikh Zayed Road • Dubai, UAE
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
