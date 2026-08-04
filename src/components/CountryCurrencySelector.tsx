import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Search, Check, RefreshCw, X, ChevronDown, Sparkles } from 'lucide-react';
import { COUNTRIES_DATA, CountryCurrency } from '../data/countriesData';
import { useCurrency, ENABLE_COUNTRY_CURRENCY_LOCALIZATION } from '../context/CurrencyContext';

const GCC_CODES = ['AE', 'SA', 'QA', 'OM', 'KW', 'BH'];
const EUROPE_CODES = ['GB', 'DE', 'FR', 'IT', 'ES', 'CH', 'RU', 'TR'];
const AMERICAS_CODES = ['US', 'CA', 'BR', 'MX'];
const ASIA_PACIFIC_CODES = ['PK', 'IN', 'AU', 'SG', 'CN', 'JP', 'PH', 'BD', 'MY', 'ID', 'NZ'];

export const CountryCurrencySelector: React.FC = () => {
  if (!ENABLE_COUNTRY_CURRENCY_LOCALIZATION) {
    return null; // Feature temporarily disabled
  }

  const { selectedCountry, changeCountry, isAutoDetected, resetToAutoDetect, isLoadingLocation } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'gcc' | 'asia' | 'europe' | 'americas'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries based on search and region tab
  const filteredCountries = COUNTRIES_DATA.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'gcc') return GCC_CODES.includes(country.code);
    if (activeTab === 'europe') return EUROPE_CODES.includes(country.code);
    if (activeTab === 'americas') return AMERICAS_CODES.includes(country.code);
    if (activeTab === 'asia') return ASIA_PACIFIC_CODES.includes(country.code);

    return true;
  });

  const handleSelectCountry = (country: CountryCurrency) => {
    changeCountry(country.code, true);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-sky-500/50 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer group"
        title="Change Country & Local Currency"
      >
        <span className="text-base leading-none group-hover:scale-110 transition-transform">{selectedCountry.flag}</span>
        <span className="font-bold text-sky-400">{selectedCountry.currency}</span>
        <span className="hidden sm:inline-block text-slate-400 text-[11px] max-w-[80px] truncate">{selectedCountry.code}</span>
        {isLoadingLocation ? (
          <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
        ) : (
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-400' : ''}`} />
        )}
      </button>

      {/* Dropdown Modal / Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Select Country & Currency</h3>
                  <p className="text-[10px] text-slate-400">Prices auto-convert based on live central bank rates</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Auto-Detection Status Indicator */}
            <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isAutoDetected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-slate-300 font-medium">
                  {isAutoDetected ? 'IP Auto-Detected Location' : 'Manual Country Override'}
                </span>
              </div>

              {!isAutoDetected && (
                <button
                  onClick={resetToAutoDetect}
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Auto-Detect
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search country name or currency (e.g. UK, PKR, USD)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 text-white pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-800 focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Region Filter Chips */}
              <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'gcc', label: 'GCC' },
                  { id: 'asia', label: 'Asia' },
                  { id: 'europe', label: 'Europe' },
                  { id: 'americas', label: 'Americas' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Countries List */}
            <div className="max-h-64 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
              {filteredCountries.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No matching countries found for "{searchQuery}"
                </div>
              ) : (
                filteredCountries.map((country) => {
                  const isSelected = selectedCountry.code === country.code;
                  return (
                    <button
                      key={country.code}
                      onClick={() => handleSelectCountry(country)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500/15 text-white border border-sky-500/30'
                          : 'hover:bg-slate-800/70 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg leading-none">{country.flag}</span>
                        <div className="text-left">
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{country.name}</span>
                            {country.code === 'AE' && (
                              <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-bold uppercase">
                                Base
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {country.currency} ({country.symbol})
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/90 text-center text-[10px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1 text-sky-400/90">
                <Sparkles className="w-3 h-3" /> Master Base: AED (Dirhams)
              </span>
              <span>Updated Live Hourly</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
