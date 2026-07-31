import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen, 
  Tag, 
  Sparkles, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  CheckCircle2,
  Building2,
  Laptop
} from 'lucide-react';

const POSTS_PER_PAGE = 6;

export const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    'All', 
    'Business Setup', 
    'Visa', 
    'UAE Laws', 
    'Technology', 
    'Cyber Security', 
    'Software', 
    'SEO', 
    'Cloud'
  ];

  // Find Featured Post (or default to the first post)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
  }, []);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.snippet.toLowerCase().includes(term) ||
        (post.focusKeyword && post.focusKeyword.toLowerCase().includes(term)) ||
        post.tags.some((t) => t.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Pagination Math
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Popular articles (side section)
  const popularPosts = useMemo(() => {
    return BLOG_POSTS.slice(1, 5);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title="UAE Business Setup & IT Insights Blog 2026 | Cloudloop Group"
        description="Comprehensive guides on DED Mainland vs Free Zone setups, 10-Year Golden Visas, UAE Corporate Tax (9%), AWS Cloud Migration, Cybersecurity VAPT, and SEO."
      />

      {/* Hero Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-900 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>UAE Corporate & Tech Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Cloudloop <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Insights & Guides</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            15+ In-depth, SEO-optimized articles written by our certified UAE Corporate PROs, Chartered Tax Accountants, and Principal AWS Cloud Architects.
          </p>

          {/* Search Input Bar */}
          <div className="pt-4 max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by topic, keyword (e.g., Golden Visa, DED, Tax, AWS, SEO)..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-2xl transition-all"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* Featured Blog Section */}
        {featuredPost && selectedCategory === 'All' && !searchTerm && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Featured Spotlight Article</span>
            </div>

            <div className="shiny-card rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt || featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-400 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight hover:text-cyan-400 transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {featuredPost.snippet}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-medium rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{featuredPost.author.name}</h4>
                      <p className="text-[10px] text-cyan-400 font-medium">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filters Bar */}
        <div className="flex flex-wrap justify-center gap-2 pb-4 border-b border-slate-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 ring-1 ring-cyan-400'
                  : 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Layout (Grid + Popular Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Articles Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="shiny-card bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-slate-950/90 backdrop-blur-md border border-slate-700 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
                          {post.snippet}
                        </p>
                      </div>
                    </div>

                    {/* Author & Read Footer */}
                    <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 pt-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                        />
                        <span className="text-[11px] font-semibold text-slate-300 truncate max-w-[120px]">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="pt-4 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-xl font-bold text-white">No Articles Found</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  No blog posts matched your search parameters. Try adjusting your category selection or clear your search input.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 hover:border-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        currentPage === pageNum
                          ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 hover:border-slate-700"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Section (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Popular Articles Widget */}
            <div className="shiny-card p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Popular UAE Insights
                </h3>
              </div>

              <div className="space-y-4">
                {popularPosts.map((pop, idx) => (
                  <Link
                    key={pop.slug}
                    to={`/blog/${pop.slug}`}
                    className="flex items-start gap-3 group border-b border-slate-800/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-xl font-black text-slate-700 group-hover:text-cyan-400 transition-colors w-6">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                        {pop.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                        {pop.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-medium block">
                        {pop.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Advisory CTA Widget */}
            <div className="shiny-card p-8 rounded-3xl bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-900 border border-blue-500/30 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Need Advisory Assistance?</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Speak directly with our UAE PRO Legal Team or Lead Systems Architects for tailored business advice.
              </p>
              <Link
                to="/contact"
                className="inline-block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 transition-all"
              >
                Book Legal Consultation
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
