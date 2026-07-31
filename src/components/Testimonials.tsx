import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Star, ChevronLeft, ChevronRight, Quote, Building2, Laptop, CheckCircle2 } from 'lucide-react';
import { DivisionType } from '../types';

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<DivisionType>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = TESTIMONIALS_DATA.filter(
    (t) => filter === 'all' || t.division === filter
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [filteredTestimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentTestimonial = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <section id="testimonials" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
            <Quote className="w-3.5 h-3.5" />
            <span>Client Trust & Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            What Corporate Leaders Say
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Read authentic feedback from founders, executives, and directors who rely on Cloudloop Group.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => {
              setFilter('all');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Reviews ({TESTIMONIALS_DATA.length})
          </button>
          <button
            onClick={() => {
              setFilter('documents');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filter === 'documents'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Documents Clearing</span>
          </button>
          <button
            onClick={() => {
              setFilter('it');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filter === 'it'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span>Information Technology</span>
          </button>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="mt-12 max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-8 shiny-card"
            >
              <Quote className="w-16 h-16 text-blue-500/10 absolute top-6 right-6 pointer-events-none" />

              {/* Star Rating & Division Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-300 ml-2">5.0 Verified</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-300 text-xs font-semibold">
                  {currentTestimonial.division === 'documents' ? 'Documents & Visas' : 'IT & Digital Transformation'}
                </span>
              </div>

              {/* Testimonial Content */}
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal italic">
                "{currentTestimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{currentTestimonial.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </h4>
                  <p className="text-xs text-cyan-400 font-medium">{currentTestimonial.role}</p>
                  <p className="text-xs text-slate-400">{currentTestimonial.company}</p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
