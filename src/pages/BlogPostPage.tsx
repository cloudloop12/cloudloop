import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { SEOHead } from '../components/SEOHead';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Tag, 
  Building2, 
  Laptop, 
  CheckCircle2, 
  HelpCircle,
  Copy,
  Linkedin,
  Twitter,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface BlogPostPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenConsultation }) => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  // Related Articles Strategy: Prioritize matching relatedSlugs or category
  const relatedPosts = BLOG_POSTS.filter((p) => {
    if (p.slug === post.slug) return false;
    if (post.relatedSlugs && post.relatedSlugs.includes(p.slug)) return true;
    return p.category === post.category;
  }).slice(0, 3);

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareSocial = (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    let url = '';
    const text = encodeURIComponent(`Check out this guide: "${post.title}" via Cloudloop Group`);
    const pageUrl = encodeURIComponent(currentUrl);

    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
    } else if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${text}%20${pageUrl}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper function to render markdown-like content blocks safely and cleanly
  const renderContentBlocks = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // Heading 2
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white pt-6 pb-2 border-b border-slate-800 tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-400 rounded-full inline-block"></span>
            <span>{trimmed.replace('## ', '')}</span>
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-cyan-300 pt-4 pb-1">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Unordered List items
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((line) => line.replace(/^[\*\-]\s+/, ''));
        return (
          <ul key={idx} className="space-y-2.5 my-4 pl-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      }

      // Markdown Tables
      if (trimmed.includes('|')) {
        const lines = trimmed.split('\n').filter((l) => !l.includes(':---'));
        if (lines.length > 1) {
          const headers = lines[0].split('|').filter(Boolean).map((s) => s.trim());
          const rows = lines.slice(1).map((line) => line.split('|').filter(Boolean).map((s) => s.trim()));
          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-950 text-cyan-400 font-extrabold uppercase border-b border-slate-800">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-850/50">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 font-medium text-slate-200">
                          <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Default Paragraph
      return (
        <p 
          key={idx} 
          className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
          dangerouslySetInnerHTML={{ 
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') 
          }}
        />
      );
    });
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <SEOHead
        title={post.seoTitle || `${post.title} | Cloudloop Group`}
        description={post.metaDescription || post.snippet}
      />

      {/* Breadcrumbs Navigation */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-3.5 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog & Insights</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate">{post.title}</span>
          </div>

          <Link to="/blog" className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header & Body Wrapper */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold uppercase tracking-widest rounded-lg">
              {post.category}
            </span>
            {post.focusKeyword && (
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-medium rounded-lg">
                Focus: {post.focusKeyword}
              </span>
            )}
            <span className="text-slate-400 text-xs flex items-center gap-1 ml-auto">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {post.date}
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author Card & Social Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800/90">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
              />
              <div>
                <h4 className="text-sm font-extrabold text-white">{post.author.name}</h4>
                <p className="text-xs text-cyan-400 font-medium">{post.author.role}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold mr-1 hidden sm:inline">Share:</span>
              <button
                onClick={() => handleShareSocial('linkedin')}
                title="Share on LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShareSocial('twitter')}
                title="Share on X (Twitter)"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShareSocial('whatsapp')}
                title="Share on WhatsApp"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                title="Copy Article Link"
                className="px-3 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="shiny-card rounded-3xl overflow-hidden h-80 sm:h-[450px] border border-slate-800 shadow-2xl relative">
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Snippet Highlight */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border-l-4 border-cyan-400 border-y border-r border-slate-800 text-slate-200 text-base sm:text-lg font-medium leading-relaxed italic shadow-lg">
          "{post.snippet}"
        </div>

        {/* Article Body Content */}
        <div className="pt-4 space-y-6">
          {renderContentBlocks(post.content)}
        </div>

        {/* Article Tags */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5 mr-2">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            Article Tags:
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-lg">
              #{tag}
            </span>
          ))}
        </div>

        {/* FAQ Accordion Section (If Available) */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="my-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shiny-card">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-extrabold text-white">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-slate-900">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Need Professional Assistance? CTA */}
        <div className="my-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-cyan-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden shiny-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <span className="px-3.5 py-1 bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-[10px] font-extrabold uppercase tracking-widest rounded-full inline-block">
              Cloudloop Strategic Advisory
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">
              Need Professional Assistance?
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you require DED Mainland license clearance, 10-Year Golden Visa application processing, Corporate Tax auditing, or AWS Cloud architecture—our Dubai experts are ready to assist.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-4 relative z-10">
            <button
              onClick={() => onOpenConsultation(`Inquiry from blog article: ${post.title}`)}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Us Direct
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-slate-800 space-y-6">
            <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
              Related UAE Insights & Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="shiny-card p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">{rel.category}</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">{rel.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{rel.snippet}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
};
