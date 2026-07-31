import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { FAQS_DATA } from '../data/companyData';
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageSquare, Building2, Laptop } from 'lucide-react';

interface FAQsPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const FAQsPage: React.FC<FAQsPageProps> = ({ onOpenConsultation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'documents' | 'it'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const extendedFaqs = [
    ...FAQS_DATA.map(f => ({ q: f.question, a: f.answer, category: f.category === 'it' ? ('it' as const) : ('documents' as const) })),
    {
      q: 'What is the turnaround time for Dubai DED Mainland company license setup?',
      a: 'With Cloudloop Documents Clearing express PRO processing, initial trade license approvals can be issued within 24 to 48 hours, provided all passport copies and activity selections are verified.',
      category: 'documents' as const,
    },
    {
      q: 'Who qualifies for the 10-Year UAE Golden Visa?',
      a: 'Investors with real estate valued at AED 2 Million+, entrepreneurs with company capital of AED 2M+, skilled executives earning AED 30,000+/month, doctors, scientists, and outstanding graduates.',
      category: 'documents' as const,
    },
    {
      q: 'What technologies does Cloudloop Information Technology specialize in?',
      a: 'We build enterprise solutions using React, Next.js, TypeScript, Node.js, Python, iOS Native Swift, Android Kotlin, AWS Cloud Architecture, Docker/Kubernetes, and SIRA-certified CCTV networks.',
      category: 'it' as const,
    },
    {
      q: 'Do I get full source code ownership for custom software build projects?',
      a: 'Yes. Upon final milestone completion, 100% of intellectual property, source code repositories (GitHub/GitLab), database credentials, and admin master keys are transferred to your company.',
      category: 'it' as const,
    },
    {
      q: 'What is included in Cloudloop Group SLA maintenance agreements?',
      a: 'Our IT SLA contracts include 24/7 server monitoring, guaranteed sub-15-minute response times for critical incidents, automated database backups, vulnerability patching, and continuous feature updates.',
      category: 'it' as const,
    },
    {
      q: 'Can Cloudloop Group assist with Corporate Tax & VAT Registration?',
      a: 'Yes. Our specialized corporate tax consultants handle FTA registration, 9% Corporate Tax filing compliance, VAT return submissions, and accounting book setup under UAE Federal Law.',
      category: 'documents' as const,
    },
  ];

  const filteredFaqs = extendedFaqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="Searchable FAQs | Cloudloop Group Dubai"
        description="Search frequently asked questions about Dubai business setup, Free Zones, Mainland LLC, 10-Year Golden Visas, corporate PRO, web development, and IT SLAs."
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0F172A] border-b border-slate-900 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="px-3.5 py-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-md inline-block">
            KNOWLEDGE BASE & SUPPORT
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Clear, transparent answers regarding UAE government regulations, business setup procedures, Golden Visas, and custom IT engineering.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. Golden Visa, Tax, Software, SLA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Tabs & Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold w-fit mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'all' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Questions ({extendedFaqs.length})
          </button>
          <button
            onClick={() => setActiveCategory('documents')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeCategory === 'documents' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Documents Clearing
          </button>
          <button
            onClick={() => setActiveCategory('it')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeCategory === 'it' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            Information Technology
          </button>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl">
              <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold">No questions matched your search criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                className="mt-4 text-xs font-bold text-blue-400 underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-slate-900 border rounded-2xl transition-all overflow-hidden ${
                    isOpen ? 'border-blue-500/50 shadow-xl' : 'border-slate-800'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 font-medium pl-13">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Didn't Find Answer CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <MessageSquare className="w-10 h-10 text-blue-400 mx-auto" />
          <h2 className="text-2xl font-extrabold text-white uppercase">Have a Specific Question for Our Experts?</h2>
          <p className="text-xs text-slate-300">Our consultants are available 24/7 to answer custom inquiries regarding your business structure or IT setup.</p>
          <button
            onClick={() => onOpenConsultation()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            ASK AN EXPERT NOW
          </button>
        </div>
      </section>
    </div>
  );
};
