import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Check, Plus, Trash2, ArrowRight, ShieldCheck, Sparkles, Building2, Laptop } from 'lucide-react';
import { CALCULATOR_OPTIONS } from '../data/companyData';
import { CalculatorOption } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface CostCalculatorProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenConsultation }) => {
  const [selectedItems, setSelectedItems] = useState<{ optionId: string; quantity: number }[]>([
    { optionId: 'calc-freezone', quantity: 1 },
    { optionId: 'calc-residency-visa', quantity: 2 },
    { optionId: 'calc-website', quantity: 1 },
  ]);

  const toggleItem = (optionId: string) => {
    const exists = selectedItems.find((i) => i.optionId === optionId);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.optionId !== optionId));
    } else {
      setSelectedItems([...selectedItems, { optionId, quantity: 1 }]);
    }
  };

  const updateQuantity = (optionId: string, delta: number) => {
    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.optionId === optionId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const totalCalculatedCost = useMemo(() => {
    return selectedItems.reduce((acc, curr) => {
      const opt = CALCULATOR_OPTIONS.find((o) => o.id === curr.optionId);
      return acc + (opt ? opt.baseCostAED * curr.quantity : 0);
    }, 0);
  }, [selectedItems]);

  const handleRequestQuotation = () => {
    const summaryList = selectedItems
      .map((item) => {
        const opt = CALCULATOR_OPTIONS.find((o) => o.id === item.optionId);
        return opt ? `${opt.name} (Qty: ${item.quantity})` : '';
      })
      .filter(Boolean)
      .join(', ');

    const promptText = `Custom Estimator Calculation (${totalCalculatedCost.toLocaleString()} AED): ${summaryList}`;
    onOpenConsultation(promptText);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Investment Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Estimate Your UAE Setup & IT Cost
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Select your required business setup, visa allocations, and IT infrastructure services to calculate an estimated project investment in AED.
          </p>
        </div>

        {/* Main Calculator Workspace */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selectable Services List */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Documents Clearing Options Category */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                <Building2 className="w-4 h-4" />
                <span>Documents Clearing & Business Licensing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALCULATOR_OPTIONS.filter((o) => o.division === 'documents').map((opt) => {
                  const selected = selectedItems.find((i) => i.optionId === opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleItem(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selected
                          ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-900/20'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{opt.category}</span>
                          <h4 className="text-xs font-bold text-white mt-0.5">{opt.name}</h4>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                            selected
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'border-slate-700 bg-slate-950'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
                        <span className="text-emerald-400 font-bold">AED {opt.baseCostAED.toLocaleString()}</span>
                        {selected && (opt.id.includes('visa') || opt.id.includes('lic')) && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800"
                          >
                            <button
                              onClick={() => updateQuantity(opt.id, -1)}
                              className="text-slate-400 hover:text-white px-1 text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-white px-1">{selected.quantity}</span>
                            <button
                              onClick={() => updateQuantity(opt.id, 1)}
                              className="text-slate-400 hover:text-white px-1 text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Information Technology Options Category */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                <Laptop className="w-4 h-4" />
                <span>Information Technology & Cloud Infrastructure</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALCULATOR_OPTIONS.filter((o) => o.division === 'it').map((opt) => {
                  const selected = selectedItems.find((i) => i.optionId === opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleItem(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selected
                          ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-900/20'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{opt.category}</span>
                          <h4 className="text-xs font-bold text-white mt-0.5">{opt.name}</h4>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                            selected
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold'
                              : 'border-slate-700 bg-slate-950'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
                        <span className="text-emerald-400 font-bold">AED {opt.baseCostAED.toLocaleString()}</span>
                        {selected && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800"
                          >
                            <button
                              onClick={() => updateQuantity(opt.id, -1)}
                              className="text-slate-400 hover:text-white px-1 text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-white px-1">{selected.quantity}</span>
                            <button
                              onClick={() => updateQuantity(opt.id, 1)}
                              className="text-slate-400 hover:text-white px-1 text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Summary Receipt Box */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Selected Scope Summary</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[11px] font-semibold">
                  {selectedItems.length} Selected
                </span>
              </div>

              {/* Selected Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <p className="text-slate-500 text-xs py-4 text-center">Click any service on the left to add to your estimate.</p>
                ) : (
                  selectedItems.map((item) => {
                    const opt = CALCULATOR_OPTIONS.find((o) => o.id === item.optionId);
                    if (!opt) return null;
                    const subtotal = opt.baseCostAED * item.quantity;
                    return (
                      <div key={item.optionId} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/50">
                        <div className="space-y-0.5 max-w-[70%]">
                          <span className="text-slate-200 font-medium line-clamp-1">{opt.name}</span>
                          <span className="text-[10px] text-slate-500 block">
                            Qty: {item.quantity} × AED {opt.baseCostAED.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">AED {subtotal.toLocaleString()}</span>
                          <button
                            onClick={() => toggleItem(item.optionId)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Calculation Breakdown */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal Services</span>
                  <span>AED {totalCalculatedCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Government Fees / Licensing (Est.)</span>
                  <span className="text-emerald-400">Included in Scope</span>
                </div>
                <div className="flex justify-between items-center text-lg font-extrabold text-white pt-3 border-t border-slate-800">
                  <span>Total Estimated Project</span>
                  <PriceDisplay price={totalCalculatedCost} variant="stacked" aedClassName="text-cyan-400 text-lg font-extrabold" />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleRequestQuotation}
                disabled={selectedItems.length === 0}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <span>Request Official Itemized Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero obligation • 100% transparent UAE government & IT pricing</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
