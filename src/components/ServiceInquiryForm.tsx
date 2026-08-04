import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, Calendar, Users, Globe, Phone, Mail, FileText, User, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ServiceInquiryFormProps {
  serviceTitle: string;
  category?: string;
  onSuccess?: () => void;
}

export const ServiceInquiryForm: React.FC<ServiceInquiryFormProps> = ({ serviceTitle, category, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    nationality: 'United Arab Emirates',
    countryOfResidence: 'United Arab Emirates',
    preferredContactMethod: 'WhatsApp',
    preferredService: serviceTitle,
    numberOfApplicants: '1 Applicant',
    expectedTravelDate: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.fullName,
          serviceNeeded: formData.preferredService || serviceTitle,
          service: formData.preferredService || serviceTitle,
          subject: `Service Order Inquiry: ${serviceTitle}`,
          type: 'Service Page Inquiry',
          submittedAt: new Date().toISOString(),
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitted(true);
        setInvoiceNumber(resData.invoiceNumber || 'INV-' + Math.floor(100000 + Math.random() * 900000));
        
        // Fire celebration confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (onSuccess) onSuccess();
      } else {
        setError(resData.error || resData.message || 'Failed to dispatch inquiry. Please try again or WhatsApp us directly.');
      }
    } catch (err: any) {
      setError('Network error connecting to Cloudloop desk. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inquiry-form-section" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Accent Mesh */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Inquiry & Service Order Received!
            </h3>
            <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base">
              Thank you, <strong className="text-sky-400">{formData.fullName}</strong>. Your dedicated PRO consultant for <strong className="text-white">{serviceTitle}</strong> has been assigned.
            </p>
          </div>

          {invoiceNumber && (
            <div className="inline-block bg-slate-950 border border-slate-800 rounded-xl px-6 py-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">Reference Order #</span>
              <span className="text-lg font-mono font-bold text-sky-400">{invoiceNumber}</span>
            </div>
          )}

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-300 text-left space-y-2 max-w-lg mx-auto">
            <p className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" /> Confirmation email and PDF invoice generated & dispatched.
            </p>
            <p className="text-slate-400">
              Our Cloudloop clearing desk will contact you via <strong className="text-white">{formData.preferredContactMethod}</strong> at <strong className="text-white">{formData.phone}</strong> shortly.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/971556126050?text=Hello%20Cloudloop,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(serviceTitle)}%20(Ref:%20${invoiceNumber}).%20Please%20fast-track%20my%20application.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20"
            >
              <Phone className="w-4 h-4" /> Direct WhatsApp Fast-Track
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData(prev => ({ ...prev, fullName: '', email: '', phone: '', message: '' }));
              }}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-6 rounded-xl transition-colors border border-slate-700"
            >
              Submit Another Inquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Official Service Application & Inquiry
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Apply or Inquire for <span className="text-sky-400">{serviceTitle}</span>
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Fill out the form below. Our UAE PRO clearing advisors will review your eligibility and respond within 15 minutes.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Locked Service Indicator */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Selected Service</span>
                  <span className="text-sm font-bold text-white">{serviceTitle}</span>
                </div>
              </div>
              <span className="text-xs bg-sky-500/20 text-sky-300 font-semibold px-2.5 py-1 rounded-md border border-sky-500/30">
                Pre-Selected
              </span>
            </div>

            {/* Row 1: Full Name & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-400" /> Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alexander Wright"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-sky-400" /> Company Name <span className="text-slate-500 text-[11px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Apex Global LLC"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone / WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" /> Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alexander@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sky-400" /> Phone / WhatsApp <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +971 50 123 4567"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Nationality & Country of Residence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-400" /> Passport Nationality <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="e.g. Indian, British, Pakistani, Egyptian"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-400" /> Country of Residence <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="countryOfResidence"
                  required
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  placeholder="e.g. United Arab Emirates"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Row 4: Applicants, Contact Method, Travel Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" /> Number of Applicants
                </label>
                <select
                  name="numberOfApplicants"
                  value={formData.numberOfApplicants}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                >
                  <option value="1 Applicant">1 Applicant (Individual)</option>
                  <option value="2 Applicants">2 Applicants (Couple)</option>
                  <option value="3-5 Applicants">3 - 5 Applicants (Family)</option>
                  <option value="6+ Applicants">6+ Applicants (Group/Corporate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sky-400" /> Preferred Contact Method
                </label>
                <select
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                >
                  <option value="WhatsApp">WhatsApp Message</option>
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="Email">Email Quote</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" /> Expected Travel / Start Date
                </label>
                <input
                  type="date"
                  name="expectedTravelDate"
                  value={formData.expectedTravelDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Row 5: Additional Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400" /> Additional Notes or Questions
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention any specific requirements, current visa status, or preferred processing timeframe..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-sky-500/25 flex items-center justify-center gap-2 text-base disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Submission & Generating Quote...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Submit Inquiry & Request Fast Quote
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Confidential & Secure Government PRO
              </span>
              <span>Avg Response: &lt;15 Mins</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
