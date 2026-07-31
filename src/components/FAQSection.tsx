import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_DATA } from '../data/companyData';
import { HelpCircle, ChevronDown, Search, X, Building2, Laptop } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchCat = categoryFilter === 'all' || faq.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [categoryFilter, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers & UAE Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you need to know about starting a business, visas, corporate tax, and custom IT solutions in the UAE.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Free Zone, Golden Visa, Bank, SIRA CCTV)..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setCategoryFilter('general')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === 'general'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Group & Umbrella
            </button>
            <button
              onClick={() => setCategoryFilter('documents')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                categoryFilter === 'documents'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Documents & Visas
            </button>
            <button
              onClick={() => setCategoryFilter('it')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                categoryFilter === 'it'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              Information Tech
            </button>
          </div>
        </div>

        {/* Accordions List */}
        <div className="mt-10 space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-slate-900 border-cyan-500/60 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-base font-bold text-white leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-xs">No questions matched your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="mt-3 px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
