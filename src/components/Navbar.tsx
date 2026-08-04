import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Menu, X, Phone, Mail, Clock, MapPin, ArrowUpRight, ChevronDown, 
  Building2, Laptop, ShieldCheck, FileText, Award, FileCheck, 
  Calculator, Landmark, Code2, Cpu, ShieldAlert, Cloud, Server, 
  Camera, TrendingUp, Users, CheckCircle2, HelpCircle, Briefcase, Star, Workflow, Plane,
  Linkedin, Twitter, MessageCircle, ExternalLink, Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { DivisionType } from '../types';
import { Logo } from './Logo';
import { MobileBottomNav } from './MobileBottomNav';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  onOpenConsultation: (preselectedService?: string) => void;
  activeDivisionFilter?: DivisionType;
  onSelectDivisionFilter?: (division: DivisionType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'docs' | 'it' | 'about' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const docServices = [
    { title: 'Mainland & Free Zone Setup', path: '/documents-clearing/business-setup', desc: 'Commercial, Professional & Industrial licenses', icon: Building2 },
    { title: '10-Year Golden Visa', path: '/documents-clearing/golden-visa', desc: 'Investors, Executives & Exceptional Talents', icon: Award },
    { title: 'UAE Tourist Visa 🇦🇪', path: '/services/uae-tourist-visa', desc: '30 & 60-Day Express extensions & entry permits', icon: FileCheck },
    { title: 'UK Tourist Visa 🇬🇧', path: '/services/uk-tourist-visa', desc: 'Standard visitor visa & VFS appointment filing', icon: FileCheck },
    { title: 'USA Tourist Visa 🇺🇸', path: '/services/us-tourist-visa', desc: 'US B1/B2 DS-160 filing & interview coaching', icon: FileCheck },
    { title: 'Canada Tourist Visa 🇨🇦', path: '/services/canada-tourist-visa', desc: 'Canada V-1 visitor visa & biometrics portal', icon: FileCheck },
    { title: 'Australia Tourist Visa 🇦🇺', path: '/services/australia-tourist-visa', desc: 'Subclass 600 ImmiAccount eVisa filing', icon: FileCheck },
    { title: 'Schengen Europe Visa 🇪🇺', path: '/services/schengen-tourist-visa', desc: 'VFS/BLS slot booking & travel insurance', icon: FileCheck },
    { title: 'Europe Work Permits', path: '/services/europe-work-permits', desc: 'Poland, Czech, Hungary & Malta work visas', icon: Briefcase },
    { title: 'Airline Ticket Booking', path: '/services/airline-ticket-booking', desc: 'Confirmed corporate flights & dummy tickets', icon: Plane },
    { title: 'Ejari Services 🏢', path: '/services/ejari-services', desc: 'Express DLD tenancy contract attestation', icon: FileText },
    { title: 'Emirates ID & Medical Typing', path: '/documents-clearing/emirates-id', desc: 'Express VIP medical fitness processing', icon: ShieldCheck },
  ];

  const itServices = [
    { title: 'Custom Web & Portal Dev', path: '/information-technology/web-development', desc: 'High-performance React & enterprise portals', icon: Code2 },
    { title: 'iOS & Android Mobile Apps', path: '/information-technology/mobile-apps', desc: 'Native & cross-platform Flutter/React Native', icon: Code2 },
    { title: 'Enterprise Software & ERP', path: '/information-technology/software-development', desc: 'Custom CRM, ERP & workflow automation', icon: Cpu },
    { title: 'Cyber Security & VAPT Audits', path: '/information-technology/cyber-security', desc: 'Penetration testing & ISO 27001 readiness', icon: ShieldAlert },
    { title: 'AWS Cloud & Server Migration', path: '/information-technology/cloud-solutions', desc: 'Cloud infrastructure, DevOps & security', icon: Cloud },
    { title: 'Digital Marketing & SEO', path: '/information-technology/digital-marketing', desc: 'Performance ads, SEO & social strategy', icon: TrendingUp },
    { title: 'IT Infrastructure & Cabling', path: '/information-technology/it-support', desc: 'Structured cabling, servers & firewalls', icon: Server },
    { title: 'SIRA CCTV & Access Control', path: '/information-technology/it-support', desc: 'Dubai Police SIRA approved security systems', icon: Camera },
  ];

  const companyLinks = [
    { title: 'About Cloudloop Group', path: '/about', desc: 'Our umbrella identity & leadership', icon: Building2 },
    { title: 'Our 6-Step Process', path: '/process', desc: 'Transparent execution roadmap', icon: Workflow },
    { title: 'Why Choose Cloudloop', path: '/why-choose-us', desc: 'Govt relations & technical mastery', icon: Award },
    { title: 'Verified Client Reviews', path: '/reviews', desc: 'Testimonials & case studies', icon: Star },
    { title: 'Career Opportunities', path: '/careers', desc: 'Join our Dubai enterprise team', icon: Briefcase },
    { title: 'Knowledge Base FAQs', path: '/faqs', desc: 'Answers on UAE regulations & tech', icon: HelpCircle },
  ];

  const getActiveNavId = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/about') || path.startsWith('/process') || path.startsWith('/why-choose-us') || path.startsWith('/reviews') || path.startsWith('/careers') || path.startsWith('/faqs')) return 'about';
    if (path.startsWith('/documents-clearing')) return 'docs';
    if (path.startsWith('/information-technology')) return 'it';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/contact')) return 'contact';
    return null;
  };

  const activeNavId = getActiveNavId();
  const currentHighlightedId = hoveredNav ?? activeNavId;

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Cloudloop%20Group,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. TOP BAR - Rebalanced Top Bar with Symmetrical Interrupted Divider */}
      <div 
        id="top-bar"
        className={`bg-slate-950 text-slate-300 text-xs transition-all duration-300 ease-in-out hidden lg:block relative z-10 ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-[36px] py-0 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center relative z-10">
          
          {/* Top Bar Left: Badges & Hotline */}
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-200 font-semibold">UAE Regulated Enterprise Group</span>
            </span>
            <span className="text-slate-700">|</span>
            <a 
              href={`tel:${COMPANY_INFO.phoneFormatted}`} 
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-semibold text-slate-300"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>

          {/* Top Bar Right: Email & Dubai Location */}
          <div className="flex items-center space-x-6 text-slate-400">
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-medium text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Business Bay, Dubai, UAE</span>
            </span>
          </div>

        </div>

        {/* Perfectly Symmetrical Interrupted Bottom Divider Line around Center Logo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute inset-x-0 bottom-0 h-[1px] pointer-events-none flex items-center justify-center z-20">
          <div className="h-[1px] bg-slate-800/80 flex-1" />
          <div className="h-[1px] w-[260px] xl:w-[300px] bg-transparent shrink-0" />
          <div className="h-[1px] bg-slate-800/80 flex-1" />
        </div>
      </div>

      {/* 2. MAIN HEADER - Centered Logo Spanning Top Bar & Main Header */}
      <header
        className={`w-full transition-all duration-300 ease-in-out border-b relative z-20 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-slate-800 shadow-2xl shadow-slate-950/60 h-[56px] py-0'
            : 'bg-slate-950/85 backdrop-blur-md border-slate-800/50 h-[64px] py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          
          {/* Desktop Layout: 3-column Grid for guaranteed 50% optical center alignment & gliding capsule */}
          <div 
            className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-full relative"
            onMouseLeave={() => setHoveredNav(null)}
          >
            
            {/* LEFT SIDE NAVIGATION */}
            <nav className="flex items-center gap-1 xl:gap-2 justify-start shrink-0">
              <Link
                to="/"
                onMouseEnter={() => setHoveredNav('home')}
                className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 flex items-center gap-1 group ${
                  currentHighlightedId === 'home' ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {currentHighlightedId === 'home' && (
                  <motion.div
                    layoutId="sliding-nav-capsule"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-cyan-950/90 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)] pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Home</span>
              </Link>

              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown('about');
                  setHoveredNav('about');
                }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                  className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                    currentHighlightedId === 'about' ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {currentHighlightedId === 'about' && (
                    <motion.div
                      layoutId="sliding-nav-capsule"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-cyan-950/90 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)] pointer-events-none z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">About Us</span>
                  <ChevronDown className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </button>

                {/* About Dropdown Panel */}
                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/98 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 block">Cloudloop Corporate</span>
                      <p className="text-[10px] text-slate-400">Governance, ethos & strategic roadmap</p>
                    </div>
                    {companyLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/90 text-xs text-slate-300 hover:text-white transition-all group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                          <item.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <div className="font-semibold text-slate-200 group-hover:text-cyan-300">{item.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Documents Clearing Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown('docs');
                  setHoveredNav('docs');
                }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/documents-clearing"
                  className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                    currentHighlightedId === 'docs' ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {currentHighlightedId === 'docs' && (
                    <motion.div
                      layoutId="sliding-nav-capsule"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-cyan-950/90 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)] pointer-events-none z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Building2 className="relative z-10 w-4 h-4 text-cyan-400" />
                  <span className="relative z-10">Documents Clearing</span>
                  <ChevronDown className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'docs' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </Link>

                {/* Documents Clearing Mega Menu Panel */}
                {activeDropdown === 'docs' && (
                  <div className="absolute top-full left-0 mt-2 w-[560px] bg-slate-900/98 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Cloudloop Documents Clearing</h4>
                          <span className="text-[10px] text-cyan-400 font-semibold">Government Licensing & Corporate PRO Services</span>
                        </div>
                      </div>
                      <Link 
                        to="/documents-clearing" 
                        className="text-[11px] font-bold text-cyan-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>View All</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {docServices.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-800/90 text-xs text-slate-300 hover:text-white transition-all group"
                        >
                          <item.icon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="truncate">
                            <span className="font-semibold block text-slate-200 group-hover:text-cyan-300">{item.title}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{item.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* CENTER LOGO - Perfectly Centered in Column 2 (auto width) */}
            <div className="flex items-center justify-center shrink-0 px-2 xl:px-4 relative z-30 p-0 m-0 h-full">
              <Logo 
                variant="horizontal" 
                imgClassName={`transition-all duration-300 ease-in-out transform-gpu block p-0 m-0 ${
                  isScrolled 
                    ? 'h-[42px] w-auto max-w-[200px] xl:max-w-[230px] mt-0 filter drop-shadow-md' 
                    : 'h-[100px] w-auto max-w-[280px] xl:max-w-[340px] -mt-[36px] filter drop-shadow-2xl'
                }`}
              />
            </div>

            {/* RIGHT SIDE NAVIGATION */}
            <nav className="flex items-center gap-1 xl:gap-2 justify-end shrink-0">
              
              {/* Information Technology Mega Menu Trigger - STRICTLY NO WRAP */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown('it');
                  setHoveredNav('it');
                }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/information-technology"
                  className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                    currentHighlightedId === 'it' ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {currentHighlightedId === 'it' && (
                    <motion.div
                      layoutId="sliding-nav-capsule"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-cyan-950/90 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)] pointer-events-none z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Laptop className="relative z-10 w-4 h-4 text-cyan-400" />
                  <span className="relative z-10 whitespace-nowrap">Information Technology</span>
                  <ChevronDown className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'it' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </Link>

                {/* IT Division Mega Menu Panel */}
                {activeDropdown === 'it' && (
                  <div className="absolute top-full right-0 mt-2 w-[560px] bg-slate-900/98 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center">
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Cloudloop Information Technology</h4>
                          <span className="text-[10px] text-cyan-400 font-semibold">Software Engineering & Cyber Infrastructure</span>
                        </div>
                      </div>
                      <Link 
                        to="/information-technology" 
                        className="text-[11px] font-bold text-cyan-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>View All</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {itServices.map((item) => (
                        <Link
                          key={item.path + item.title}
                          to={item.path}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-800/90 text-xs text-slate-300 hover:text-white transition-all group"
                        >
                          <item.icon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="truncate">
                            <span className="font-semibold block text-slate-200 group-hover:text-cyan-300">{item.title}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{item.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                onMouseEnter={() => setHoveredNav('blog')}
                className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                  currentHighlightedId === 'blog' ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {currentHighlightedId === 'blog' && (
                  <motion.div
                    layoutId="sliding-nav-capsule"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-cyan-950/90 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)] pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Blog</span>
              </Link>

              <Link
                to="/contact"
                onMouseEnter={() => setHoveredNav('contact')}
                className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                  currentHighlightedId === 'contact' ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {currentHighlightedId === 'contact' && (
                  <motion.div
                    layoutId="sliding-nav-capsule"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-cyan-950/90 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)] pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Contact</span>
              </Link>

              {/* Consultation CTA Button */}
              <Magnetic strength={3}>
                <button
                  onClick={() => onOpenConsultation()}
                  className="ml-1 xl:ml-2 px-4 xl:px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 hover:scale-[1.03] active:scale-[0.98] shrink-0 flex items-center gap-1.5 border border-cyan-400/30 whitespace-nowrap cursor-pointer"
                >
                  <span>Free Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </Magnetic>
            </nav>

          </div>

          {/* Mobile & Tablet Header (below lg breakpoint) */}
          <div className="flex lg:hidden items-center justify-between h-full py-2">
            {/* Mobile Logo */}
            <Logo variant="horizontal" imgClassName="h-8 sm:h-10 w-auto max-w-[180px]" />

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenConsultation()}
                className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider shadow-md shrink-0 flex items-center gap-1"
              >
                <span>Consult</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* 3. MOBILE MENU OVERLAY & SLIDE-IN DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl p-6 overflow-y-auto flex flex-col justify-between lg:hidden animate-in fade-in duration-200">
          
          <div className="space-y-6">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <Logo variant="horizontal" onClick={() => setMobileMenuOpen(false)} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="space-y-5">
              
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block py-2 text-base font-bold text-white hover:text-cyan-400 border-b border-slate-900"
              >
                Home Page
              </Link>

              {/* Documents Clearing Mobile Section */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Documents Clearing Division</span>
                  </span>
                  <Link 
                    to="/documents-clearing" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[10px] text-slate-400 underline hover:text-white"
                  >
                    All Services
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                  <Link to="/documents-clearing/business-setup" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>Business Setup (Mainland/Freezone)</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/documents-clearing/golden-visa" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>10-Year Golden Visa</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/documents-clearing/visa-processing" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>Investor & Employment Visas</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/documents-clearing/corporate-tax-vat" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>Corporate Tax & VAT Registration</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/documents-clearing/bank-account" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>Corporate Bank Account Opening</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                </div>
              </div>

              {/* IT Division Mobile Section */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <div className="flex items-center justify-between text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <Laptop className="w-4 h-4" />
                    <span>Information Technology Division</span>
                  </span>
                  <Link 
                    to="/information-technology" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[10px] text-slate-400 underline hover:text-white"
                  >
                    All Tech Solutions
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                  <Link to="/information-technology/web-development" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>Website & Web Portals</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/information-technology/mobile-apps" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>iOS & Android Apps</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/information-technology/cyber-security" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>Cyber Security & VAPT</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/information-technology/cloud-solutions" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>AWS Cloud & DevOps</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                  <Link to="/information-technology/it-support" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:text-white flex items-center justify-between">
                    <span>IT Support & SIRA CCTV</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </Link>
                </div>
              </div>

              {/* Company & Resources Links */}
              <div className="pt-2 border-t border-slate-900 space-y-2 text-xs font-semibold text-slate-300">
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pt-1">Company & Insights</div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">About Us</Link>
                  <Link to="/process" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">Our 6-Step Process</Link>
                  <Link to="/why-choose-us" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">Why Choose Us</Link>
                  <Link to="/reviews" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">Client Reviews</Link>
                  <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">Blog & Guides</Link>
                  <Link to="/faqs" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">FAQs</Link>
                  <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">Careers</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300 hover:text-white">Contact Us</Link>
                </div>
              </div>

              {/* Direct Contact Details & Social Icons inside Mobile Drawer */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3">
                <div className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider">Direct Hotline & Location</div>
                <div className="space-y-2 text-xs text-slate-300">
                  <a href={`tel:${COMPANY_INFO.phoneFormatted}`} className="flex items-center gap-2 hover:text-white">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{COMPANY_INFO.phone}</span>
                  </a>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 hover:text-white">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Business Bay, Dubai, UAE</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Connect With Us:</span>
                  <div className="flex items-center gap-2">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile Drawer Bottom Action */}
          <div className="pt-6 border-t border-slate-800 mt-6 space-y-3 pb-16">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Get Free Advisory Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[10px] text-slate-400">
              Official Regulated Partner • Business Bay, Dubai UAE
            </div>
          </div>

        </div>
      )}

      {/* 4. FLOATING MOBILE BOTTOM NAVIGATION */}
      <MobileBottomNav
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileMenuOpen={mobileMenuOpen}
        onOpenConsultation={() => onOpenConsultation()}
      />

    </div>
  );
};
