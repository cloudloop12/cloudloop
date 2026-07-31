import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Cloudloop%20Group,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-30 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      title="Chat with Cloudloop Group on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-slate-950" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 text-xs font-bold text-slate-950">
        WhatsApp Us
      </span>
    </a>
  );
};
