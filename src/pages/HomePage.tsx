import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Divisions } from '../components/Divisions';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CostCalculator } from '../components/CostCalculator';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { StatsCounter } from '../components/StatsCounter';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/extendedData';
import { ArrowRight, BookOpen, Calendar, Clock, User } from 'lucide-react';
import { DivisionType } from '../types';

interface HomePageProps {
  onOpenConsultation: (preselectedService?: string) => void;
  activeDivisionFilter: DivisionType;
  onSelectDivisionFilter: (division: DivisionType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenConsultation,
  activeDivisionFilter,
  onSelectDivisionFilter,
}) => {
  return (
    <>
      <SEOHead
        title="Leading Multi-Discipline Enterprise Partner in UAE"
        description="Cloudloop Group is a premier UAE umbrella corporate group operating Cloudloop Documents Clearing (Mainland/Freezone setup, Golden Visas, PRO) and Cloudloop Information Technology (Web, Software, Cloud, Cyber Security)."
      />

      {/* Hero Section */}
      <Hero
        onOpenConsultation={onOpenConsultation}
        onSelectDivisionFilter={onSelectDivisionFilter}
      />

      {/* Stats Counter Section */}
      <StatsCounter />

      {/* Umbrella Group Intro & Mission / Vision Summary */}
      <About onOpenConsultation={onOpenConsultation} />

      {/* Dual Divisions & Featured Services Showcase */}
      <Divisions
        onOpenConsultation={onOpenConsultation}
        activeDivisionFilter={activeDivisionFilter}
        onSelectDivisionFilter={onSelectDivisionFilter}
      />

      {/* Interactive Cost Estimator */}
      <CostCalculator onOpenConsultation={onOpenConsultation} />

      {/* Why Choose Cloudloop Group */}
      <WhyChooseUs onOpenConsultation={onOpenConsultation} />

      {/* Process Timeline */}
      <ProcessTimeline onOpenConsultation={onOpenConsultation} />

      {/* Testimonials & Reviews */}
      <Testimonials />

      {/* Latest Blog & Insights Section */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
                INFORMATIVE INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-2">
                Latest UAE Business & Tech News
              </h2>
            </div>
            <Link
              to="/blog"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0"
            >
              <span>VIEW ALL ARTICLES</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-6 font-medium">
                    {post.snippet}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-semibold text-slate-300">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection onOpenConsultation={onOpenConsultation} />

      {/* Primary Contact Preview & Form */}
      <ContactSection />
    </>
  );
};
