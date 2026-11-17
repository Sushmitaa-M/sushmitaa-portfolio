import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 px-4 xs:px-6 sm:px-10 bg-[#0C0A0A] border-t border-[#392A29] relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-5 sm:space-y-6 text-center">
        
        {/* Centered Editorial Footer Callout */}
        <div className="flex items-center gap-2">
          <span className="font-editorial text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] text-[#DFC1AC] uppercase font-medium">
            THANK YOU FOR VISITING
          </span>
          <span className="text-[#9E354C] text-sm">✦</span>
        </div>

        {/* Divider line */}
        <div className="w-16 h-[1px] bg-[#392A29]" />

        {/* Details & Back to Top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] text-[#B49A8C] uppercase gap-3 sm:gap-4 pt-1 sm:pt-2">
          <span>
            © 2026 {portfolioData.personal.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </span>

          <span className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] text-[#B49A8C]/70 uppercase font-mono hidden md:inline">
            CRAFTED WITH EDITORIAL EXCELLENCE
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#DFC1AC] hover:text-white transition-colors cursor-pointer group py-1 active:scale-95"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform text-[#9E354C]" />
          </button>
        </div>

      </div>
    </footer>
  );
}