import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-10 bg-[#0C0A0A] border-t border-[#D8BDAA]/15 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6 text-center">
        
        {/* Centered Editorial Footer Callout - Exact match to reference */}
        <div className="flex items-center gap-2">
          <span className="font-editorial text-xs sm:text-sm tracking-[0.3em] text-[#D8BDAA] uppercase font-medium">
            THANK YOU FOR VISITING
          </span>
          <span className="text-[#8C2230] text-sm">✦</span>
        </div>

        {/* Divider line */}
        <div className="w-16 h-[1px] bg-[#D8BDAA]/20" />

        {/* Details & Back to Top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-[0.18em] text-[#D8BDAA]/50 uppercase gap-4 pt-2">
          <span>
            © 2025 {portfolioData.personal.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </span>

          <span className="text-[10px] tracking-[0.2em] text-[#D8BDAA]/50 uppercase font-mono">
            CRAFTED WITH PRECISION AND EDITORIAL EXCELLENCE
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#D8BDAA] transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
