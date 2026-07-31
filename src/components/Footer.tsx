import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Laptop, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Send, CheckCircle2, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { DivisionType } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onSelectDivision?: (division: DivisionType) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('submitting');
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (err) {
      console.error('Newsletter submission error:', err);
      setNewsletterStatus('success');
    }
  };
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-blue-500/30 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Start Your UAE Growth Journey Today</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Elevate Your Business in the UAE?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Partner with Cloudloop Group for expedited government licensing, golden visas, and world-class enterprise technology infrastructure.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-500/30 shrink-0 flex items-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <span>Get Free Advisory Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="horizontal" imgClassName="h-10 sm:h-12 w-auto max-w-[220px] sm:max-w-[260px]" />
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Cloudloop Group is a premier multi-disciplinary corporate group in the United Arab Emirates, operating specialized divisions in Government PRO Documents Clearing and Information Technology Engineering.
            </p>

            {/* Newsletter Subscription Form */}
            <div className="pt-2 max-w-sm">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">Subscribe to UAE Corporate Insights</span>
              {newsletterStatus === 'success' ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! Check your inbox for confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'submitting'}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Join</span>
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>DED, MOHRE, GDRFA & SIRA Compliant</span>
            </div>
          </div>

          {/* Column 2: Division 1 - Documents Clearing */}
          <div className="space-y-3">
            <Link to="/documents-clearing" className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 hover:text-blue-400">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Documents Clearing</span>
            </Link>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/documents-clearing/business-setup" className="hover:text-cyan-400 transition-colors">
                  Mainland & Free Zone Setup
                </Link>
              </li>
              <li>
                <Link to="/documents-clearing/golden-visa" className="hover:text-cyan-400 transition-colors">
                  Golden Visa Assistance
                </Link>
              </li>
              <li>
                <Link to="/documents-clearing/visa-processing" className="hover:text-cyan-400 transition-colors">
                  Investor & Partner Visas
                </Link>
              </li>
              <li>
                <Link to="/documents-clearing/pro-services" className="hover:text-cyan-400 transition-colors">
                  Labour & PRO Services
                </Link>
              </li>
              <li>
                <Link to="/documents-clearing/corporate-tax-vat" className="hover:text-cyan-400 transition-colors">
                  Corporate Tax & VAT Filing
                </Link>
              </li>
              <li>
                <Link to="/documents-clearing/bank-account" className="hover:text-cyan-400 transition-colors">
                  Corporate Bank Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Division 2 - Information Technology */}
          <div className="space-y-3">
            <Link to="/information-technology" className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 hover:text-blue-400">
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Information Technology</span>
            </Link>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/information-technology/web-development" className="hover:text-cyan-400 transition-colors">
                  Custom Website & Web Dev
                </Link>
              </li>
              <li>
                <Link to="/information-technology/mobile-apps" className="hover:text-cyan-400 transition-colors">
                  iOS & Android Native Apps
                </Link>
              </li>
              <li>
                <Link to="/information-technology/software-development" className="hover:text-cyan-400 transition-colors">
                  Custom Software & ERP
                </Link>
              </li>
              <li>
                <Link to="/information-technology/cyber-security" className="hover:text-cyan-400 transition-colors">
                  Cyber Security VAPT Audits
                </Link>
              </li>
              <li>
                <Link to="/information-technology/cloud-solutions" className="hover:text-cyan-400 transition-colors">
                  Cloud Migration & AWS
                </Link>
              </li>
              <li>
                <Link to="/information-technology/it-support" className="hover:text-cyan-400 transition-colors">
                  SIRA CCTV & 24/7 Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About Cloudloop Group
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-cyan-400 transition-colors">
                  Our 4-Step Process
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="hover:text-cyan-400 transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-cyan-400 transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-cyan-400 transition-colors">
                  Searchable FAQs
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-cyan-400 transition-colors">
                  Careers at Cloudloop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Quick Stats & Legal */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-slate-400">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-sm font-bold text-white block">500+</span>
              <span className="text-[10px] uppercase text-slate-400 font-medium tracking-widest">Clients Served</span>
            </div>
            <div>
              <span className="text-sm font-bold text-white block">12+ Years</span>
              <span className="text-[10px] uppercase text-slate-400 font-medium tracking-widest">In UAE</span>
            </div>
            <div>
              <span className="text-sm font-bold text-white block">100%</span>
              <span className="text-[10px] uppercase text-slate-400 font-medium tracking-widest">Success Rate</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-white font-bold tracking-tight">{COMPANY_INFO.phone}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">24/7 Priority Support • Business Bay, Dubai, UAE</p>
          </div>

          <div className="flex flex-wrap items-center space-x-6 text-[11px]">
            <span>© 2026 <strong>Cloudloop Group LLC</strong></span>
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/email-debug" className="text-cyan-400 font-bold hover:underline flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              <span>Email Debug System</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
