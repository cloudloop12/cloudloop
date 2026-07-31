import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CAREERS_DATA } from '../data/extendedData';
import { CareerOpening } from '../types';
import { Briefcase, MapPin, Clock, Building2, Laptop, CheckCircle2, ArrowRight, Send, Sparkles, X } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<CareerOpening | null>(null);
  const [applied, setApplied] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
    }, 2500);
  };

  const culturePoints = [
    { title: 'Tax-Free UAE Compensation', desc: 'Competitive tax-free salaries with performance bonuses and annual profit sharing.' },
    { title: 'Dual-Discipline Knowledge', desc: 'Work alongside government PRO experts and elite software engineers in Business Bay.' },
    { title: 'Executive Growth Track', desc: 'Accelerated promotion tracks for outstanding contributors across Dubai & Abu Dhabi.' },
    { title: 'Full UAE Medical & Visa', desc: 'Comprehensive VIP private health insurance, residency visa processing, and annual flight allowance.' },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Careers at Cloudloop Group | Join Dubai's Premier Corporate Group"
        description="Explore job openings at Cloudloop Group in Dubai. Hiring Senior PRO Specialists, Full-Stack Engineers, Cyber Security Analysts, and Corporate Tax Managers."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md inline-block">
            BUILD YOUR CAREER IN DUBAI
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            Careers at <span className="text-blue-500">Cloudloop Group</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Join a fast-growing, multi-discipline team of government relations experts, legal PRO typists, software architects, and cybersecurity engineers.
          </p>
        </div>
      </section>

      {/* Culture & Benefits Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white uppercase">Why Work at Cloudloop Group?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePoints.map((pt, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <CheckCircle2 className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white uppercase mb-2">{pt.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{pt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white uppercase">Current Job Openings</h2>
              <p className="text-xs text-slate-400 mt-1">Select a role to view requirements and submit your application.</p>
            </div>
            <span className="px-3.5 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold rounded-full">
              {CAREERS_DATA.length} Active Openings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAREERS_DATA.map((job) => (
              <div
                key={job.id}
                className="bg-slate-950 border border-slate-800/90 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-blue-400 text-[10px] font-bold uppercase rounded-md">
                      {job.division === 'documents' ? 'Documents Clearing' : 'Information Technology'}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{job.type}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                      {job.department}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6 font-medium">
                    {job.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">{job.experience} Required</span>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>APPLY NOW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Drawer / Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">Applying For Position</span>
              <h2 className="text-2xl font-extrabold text-white uppercase">{selectedJob.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{selectedJob.location} • {selectedJob.type} • {selectedJob.experience}</p>
            </div>

            {applied ? (
              <div className="p-8 bg-blue-950/40 border border-blue-500/40 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto" />
                <h3 className="text-lg font-bold text-white uppercase">Application Submitted Successfully!</h3>
                <p className="text-xs text-slate-300">Our HR Talent Acquisition team in Business Bay will review your application and reach out within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Tariq Al-Mansoori"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="tariq@example.com"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Mobile Number (UAE / GCC) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">LinkedIn Profile or Portfolio Link</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Cover Letter / Why Cloudloop Group? *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly describe your experience and why you are interested in joining Cloudloop Group..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT JOB APPLICATION</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
