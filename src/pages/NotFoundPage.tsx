import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, Home, ArrowLeft, Search, MessageSquare, PhoneCall } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { COMPANY_INFO } from '../data/companyData';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <SEOHead
        title="404 Page Not Found"
        description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        canonicalUrl="https://cloudloopgroup.com/404"
      />

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-3xl bg-slate-900/90 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-2xl flex items-center justify-center">
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400">
              404
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 text-white shadow-lg">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#1c1815]">
            Destination Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53] max-w-md mx-auto leading-relaxed">
            The page you requested could not be located in our portal. It might have been moved or updated.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
          <Link
            to="/documents-clearing"
            className="p-4 rounded-2xl bg-slate-900/70 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800/80 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] hover:border-cyan-500/50 transition-all group"
          >
            <div className="text-xs font-bold text-cyan-400 [data-theme=light]:text-blue-600 [data-theme=eyecare]:text-[#2a7375] mb-1">
              Documents Clearing
            </div>
            <div className="text-xs text-slate-300 [data-theme=light]:text-slate-700 [data-theme=eyecare]:text-[#3d3630]">
              Dubai Business Setup & Visas →
            </div>
          </Link>

          <Link
            to="/information-technology"
            className="p-4 rounded-2xl bg-slate-900/70 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800/80 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] hover:border-cyan-500/50 transition-all group"
          >
            <div className="text-xs font-bold text-cyan-400 [data-theme=light]:text-blue-600 [data-theme=eyecare]:text-[#2a7375] mb-1">
              Information Tech
            </div>
            <div className="text-xs text-slate-300 [data-theme=light]:text-slate-700 [data-theme=eyecare]:text-[#3d3630]">
              Software & Cyber Security →
            </div>
          </Link>

          <Link
            to="/contact"
            className="p-4 rounded-2xl bg-slate-900/70 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800/80 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] hover:border-cyan-500/50 transition-all group"
          >
            <div className="text-xs font-bold text-cyan-400 [data-theme=light]:text-blue-600 [data-theme=eyecare]:text-[#2a7375] mb-1">
              Direct Advisory
            </div>
            <div className="text-xs text-slate-300 [data-theme=light]:text-slate-700 [data-theme=eyecare]:text-[#3d3630]">
              Connect with Consultants →
            </div>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-slate-900 [data-theme=light]:bg-slate-200 [data-theme=eyecare]:bg-[#eae4db] border border-slate-700 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#ded6cc] text-slate-200 [data-theme=light]:text-slate-800 [data-theme=eyecare]:text-[#2c2724] font-bold text-xs flex items-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Client Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
};
