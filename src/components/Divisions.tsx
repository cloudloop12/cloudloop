import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Laptop, Search, Filter, Layers, CheckCircle2, ArrowRight, Sparkles, X, Phone } from 'lucide-react';
import { SERVICES_DATA, DIVISIONS_INFO, COMPANY_INFO } from '../data/companyData';
import { ServiceItem, DivisionType } from '../types';
import { ServiceIcon } from './ServiceIcon';

interface DivisionsProps {
  activeDivisionFilter: DivisionType;
  onSelectDivisionFilter: (division: DivisionType) => void;
  onOpenConsultation: (preselectedService?: string) => void;
}

export const Divisions: React.FC<DivisionsProps> = ({
  activeDivisionFilter,
  onSelectDivisionFilter,
  onOpenConsultation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailModalService, setDetailModalService] = useState<ServiceItem | null>(null);

  // Filter logic
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((svc) => {
      // Division match
      const matchDivision = activeDivisionFilter === 'all' || svc.division === activeDivisionFilter;
      // Category match
      const matchCategory = selectedCategory === 'all' || svc.category === selectedCategory;
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        svc.title.toLowerCase().includes(q) ||
        svc.description.toLowerCase().includes(q) ||
        svc.category.toLowerCase().includes(q) ||
        svc.features.some((f) => f.toLowerCase().includes(q));

      return matchDivision && matchCategory && matchSearch;
    });
  }, [activeDivisionFilter, selectedCategory, searchQuery]);

  // Extract unique categories for current division filter
  const availableCategories = useMemo(() => {
    const list = SERVICES_DATA.filter(
      (s) => activeDivisionFilter === 'all' || s.division === activeDivisionFilter
    ).map((s) => s.category);
    return Array.from(new Set(list));
  }, [activeDivisionFilter]);

  return (
    <section id="services" className="py-24 bg-slate-950 text-white relative">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
            Dual Specialized Divisions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            Our Companies & Services
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Select a division or explore our comprehensive catalog of UAE government PRO, visa, business setup, and enterprise IT services.
          </p>
        </div>

        {/* Dual Division Feature Cards (Matched to Professional Polish Design HTML) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Documents Clearing Division Card (Light High Contrast Card) */}
          <div className="group bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden text-slate-900 shiny-card-light">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-900 pointer-events-none">
              <Building2 className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] uppercase tracking-tight leading-tight">Documents Clearing</h3>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Business Setup & PRO Services</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
              Direct UAE government liaison for mainland LLC licenses, free zone entities, golden visas, corporate tax registration, and official document attestation.
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Mainland LLC Setup
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Golden Visa Processing
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Corporate PRO Clearing
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Bank Account Opening
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Corporate Tax & VAT
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>MOHRE & Immigration
              </div>
            </div>
            <button
              onClick={() => {
                onSelectDivisionFilter('documents');
                setSelectedCategory('all');
              }}
              className="mt-auto w-full py-3 bg-slate-100 border border-slate-200 text-[#0F172A] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              EXPLORE PRO SERVICES ({SERVICES_DATA.filter(s => s.division === 'documents').length})
            </button>
          </div>

          {/* IT Division Card (Dark High Tech Card) */}
          <div className="group bg-slate-900 rounded-3xl shadow-sm border border-slate-800 p-8 flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden text-white shiny-card">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white uppercase tracking-tight leading-tight">Information Technology</h3>
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Digital Transformation</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
              Enterprise engineering providing web and mobile app development, cybersecurity VAPT audits, SIRA surveillance systems, AWS cloud migration, and managed IT.
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Custom Software & Apps
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Cyber Security Audits
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>AWS Cloud & Serverless
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>SIRA CCTV Infrastructure
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Enterprise ERP Systems
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>24/7 Managed IT Support
              </div>
            </div>
            <button
              onClick={() => {
                onSelectDivisionFilter('it');
                setSelectedCategory('all');
              }}
              className="mt-auto w-full py-3 bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-sm"
            >
              VIEW TECH STACK ({SERVICES_DATA.filter(s => s.division === 'it').length})
            </button>
          </div>

        </div>

        {/* Division Switcher Header Tabs */}
        <div id="divisions" className="mt-16 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl max-w-full overflow-x-auto">
            <button
              onClick={() => {
                onSelectDivisionFilter('all');
                setSelectedCategory('all');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                activeDivisionFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Services ({SERVICES_DATA.length})</span>
            </button>

            <button
              onClick={() => {
                onSelectDivisionFilter('documents');
                setSelectedCategory('all');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                activeDivisionFilter === 'documents'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Documents Clearing</span>
            </button>

            <button
              onClick={() => {
                onSelectDivisionFilter('it');
                setSelectedCategory('all');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                activeDivisionFilter === 'it'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4 text-blue-400" />
              <span>Information Technology</span>
            </button>
          </div>
        </div>

        {/* Division Overview Highlight Cards */}
        {activeDivisionFilter !== 'all' && (
          <div className="mt-8">
            {activeDivisionFilter === 'documents' && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{DIVISIONS_INFO.documents.title}</h3>
                    <p className="text-xs text-slate-300 max-w-2xl mt-1">
                      {DIVISIONS_INFO.documents.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation('Free Zone & Mainland Business Setup')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 flex items-center gap-2 shadow-lg"
                >
                  <span>Consult PRO Specialist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeDivisionFilter === 'it' && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Laptop className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{DIVISIONS_INFO.it.title}</h3>
                    <p className="text-xs text-slate-300 max-w-2xl mt-1">
                      {DIVISIONS_INFO.it.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation('Custom Software & Web Development')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shrink-0 flex items-center gap-2 shadow-lg"
                >
                  <span>Consult IT Architect</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Search & Category Filter Control Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Visas, Next.js, CCTV, Tax)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 font-medium">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              Filter:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Categories
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Services Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-950/40 transition-all hover:-translate-y-1 overflow-hidden shiny-card"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Popular</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Division Tag & Category */}
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase tracking-wider ${
                        service.division === 'documents'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}
                    >
                      {service.division === 'documents' ? 'Documents Clearing' : 'Information Tech'}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-medium">{service.category}</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <ServiceIcon name={service.iconName} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {service.title}
                      </h3>
                      {service.estimatedPrice && (
                        <span className="text-xs font-semibold text-emerald-400 block mt-1">
                          {service.estimatedPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Key Feature Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setDetailModalService(service)}
                    className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold text-center transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenConsultation(service.title)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 mt-8 space-y-4">
            <p className="text-slate-400 text-sm">No services matched your search filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                onSelectDivisionFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {detailModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl"
            >
              <button
                onClick={() => setDetailModalService(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400">
                  <ServiceIcon name={detailModalService.iconName} className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    {detailModalService.division === 'documents' ? 'Cloudloop Documents Clearing' : 'Cloudloop Information Technology'}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{detailModalService.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {detailModalService.description}
              </p>

              {detailModalService.estimatedPrice && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span>Estimated Investment / Fee:</span>
                  <span className="text-sm font-bold">{detailModalService.estimatedPrice}</span>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Included Deliverables & Scope</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {detailModalService.features.map((feat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const title = detailModalService.title;
                    setDetailModalService(null);
                    onOpenConsultation(title);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Request Official Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phoneFormatted}`}
                  className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Call Adviser</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
