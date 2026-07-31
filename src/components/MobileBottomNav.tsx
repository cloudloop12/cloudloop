import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Phone, MessageSquare, Menu, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface MobileBottomNavProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onOpenConsultation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onToggleMobileMenu,
  isMobileMenuOpen,
  onOpenConsultation,
}) => {
  const location = useLocation();

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Cloudloop%20Group,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="fixed bottom-3 inset-x-3 z-40 lg:hidden pointer-events-auto"
      aria-label="Mobile Navigation Bar"
    >
      <div className="max-w-md mx-auto bg-slate-950/90 backdrop-blur-2xl border border-slate-800/90 rounded-full p-1.5 shadow-2xl shadow-cyan-950/50 flex items-center justify-between ring-1 ring-cyan-500/20">
        
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-200 ${
            isActive('/') && location.pathname === '/'
              ? 'text-cyan-400 bg-cyan-950/60 font-bold shadow-inner'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight leading-none">Home</span>
        </Link>

        {/* 2. Services */}
        <Link
          to="/documents-clearing"
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-200 ${
            isActive('/documents-clearing') || isActive('/information-technology')
              ? 'text-cyan-400 bg-cyan-950/60 font-bold shadow-inner'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight leading-none">Services</span>
        </Link>

        {/* 3. Center Highlight: Free Consultation CTA */}
        <button
          onClick={onOpenConsultation}
          className="flex-shrink-0 mx-1 w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all border border-cyan-300/40"
          aria-label="Book Consultation"
          title="Free Consultation"
        >
          <ArrowUpRight className="w-5 h-5 font-bold" />
        </button>

        {/* 4. Contact */}
        <Link
          to="/contact"
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-200 ${
            isActive('/contact')
              ? 'text-cyan-400 bg-cyan-950/60 font-bold shadow-inner'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight leading-none">Contact</span>
        </Link>

        {/* 5. WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full text-emerald-400 hover:text-emerald-300 transition-all duration-200"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 mb-0.5 fill-emerald-500/20" />
          <span className="text-[10px] tracking-tight leading-none">WhatsApp</span>
        </a>

        {/* 6. Menu Drawer Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-200 ${
            isMobileMenuOpen
              ? 'text-cyan-400 bg-cyan-950/60 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Open Mobile Menu Drawer"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight leading-none">Menu</span>
        </button>

      </div>
    </nav>
  );
};
