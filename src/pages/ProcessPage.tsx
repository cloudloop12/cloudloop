import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { CheckCircle2, FileText, ArrowRight, Clock, ShieldCheck, Building2, Laptop } from 'lucide-react';

interface ProcessPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenConsultation }) => {
  const deepPhases = [
    {
      step: '01',
      title: 'Discovery & Regulatory Alignment',
      duration: 'Within 24 Hours',
      desc: 'We analyze your legal ownership structure, activity codes (DED / Free Zone), and technology requirements to design a tailored execution blueprint.',
      docDeliverables: ['Initial Name Approval Request', 'Shareholding Structure Draft', 'Activity Licensing Feasibility Report'],
      itDeliverables: ['Technical Architecture Specification', 'UX / UI Wireframe Overview', 'Cloud Infrastructure Cost Estimate'],
    },
    {
      step: '02',
      title: 'Documentation & Pre-Clearance',
      duration: 'Days 1 - 3',
      desc: 'Our legal typing specialists prepare Articles of Association (MOA), lease agreements (Ejari), medical screening appointments, and code repositories.',
      docDeliverables: ['Notarized MOA / LSA Agreement', 'Security Pre-Clearance Approvals', 'Initial Approval Certificate'],
      itDeliverables: ['Figma UI Design Systems', 'Database Schema Blueprint', 'Staging DevOps Pipeline'],
    },
    {
      step: '03',
      title: 'Government Submission & Sprint Builds',
      duration: 'Days 3 - 7',
      desc: 'VIP fast-track submissions via Dubai GDRFA, MOHRE, and DED portals while our software team executes rapid development sprints.',
      docDeliverables: ['Trade License Issuance', 'Establishment Card Registration', 'Entry Permit & Visa Stamping'],
      itDeliverables: ['Frontend & Backend Sprint Code', 'API Webhook Testing', 'VAPT Security Scanning'],
    },
    {
      step: '04',
      title: 'Licensing Handover & Production Go-Live',
      duration: 'Final Milestone',
      desc: 'Final delivery of stamped licenses, Golden Visas, corporate bank account IBANs, and production software deployment with 24/7 SLA monitoring.',
      docDeliverables: ['Original Commercial License', 'Emirates ID Physical Delivery', 'Corporate Bank IBAN Activation'],
      itDeliverables: ['Production AWS / Azure Deployment', 'Full Source Code & Admin Keys', '12-Month SLA Warranty Certificate'],
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Our Execution Process | Cloudloop Group Dubai"
        description="Learn about Cloudloop Group's structured 4-step process for fast-track UAE business setup, PRO document clearing, and enterprise software engineering."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md inline-block">
            TRANSPARENT METHODOLOGY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            Our Proven <span className="text-blue-500">4-Step Execution Process</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            From initial consultation to commercial trade license issuance and cloud deployment — structured, transparent, and hassle-free.
          </p>
        </div>
      </section>

      {/* Interactive Process Component */}
      <ProcessTimeline onOpenConsultation={onOpenConsultation} />

      {/* Deep Phase Breakdown Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white uppercase">Detailed Phase Deliverables & Timeline</h2>
          <p className="text-xs text-slate-400 mt-2">What you receive at every single milestone of our project lifecycle.</p>
        </div>

        <div className="space-y-8">
          {deepPhases.map((phase, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start shiny-card">
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold text-base flex items-center justify-center">
                    {phase.step}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">{phase.duration}</span>
                    <h3 className="text-xl font-bold text-white uppercase">{phase.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{phase.desc}</p>
              </div>

              {/* Documents Clearing Deliverables */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase">
                  <Building2 className="w-4 h-4" />
                  <span>Documents Clearing Output</span>
                </div>
                <ul className="space-y-2">
                  {phase.docDeliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* IT Deliverables */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase">
                  <Laptop className="w-4 h-4" />
                  <span>IT Engineering Output</span>
                </div>
                <ul className="space-y-2">
                  {phase.itDeliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold text-white uppercase">Ready to Kickstart Phase 1?</h2>
          <button
            onClick={() => onOpenConsultation()}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            SCHEDULE YOUR DISCOVERY CALL
          </button>
        </div>
      </section>
    </div>
  );
};
