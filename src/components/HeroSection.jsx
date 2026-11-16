import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import heroPortrait from '../assets/hero_portrait.png';

export default function HeroSection({ onOpenContact }) {
  const { personal } = portfolioData;

  return (
    <section
      id="top"
      className="relative w-full bg-[#100D0D] text-[#DFC1AC] overflow-hidden border-b border-[#DFC1AC]/15 select-none"
      style={{ minHeight: '695px' }}
    >
      {/* 1. BACKGROUND BURGUNDY RADIAL LIGHTING BEHIND PORTRAIT */}
      <div
        className="pointer-events-none absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[720px] sm:h-[720px] lg:w-[860px] lg:h-[860px] rounded-full blur-[110px] opacity-60 z-0"
        style={{
          background: 'radial-gradient(circle, #35171F 0%, #200D12 45%, transparent 72%)'
        }}
      />

      {/* 2. SUBTLE BOTANICAL FLORAL ACCENTS IN CORNERS */}
      <div className="pointer-events-none absolute -left-8 -bottom-8 w-44 h-56 sm:w-60 sm:h-72 opacity-35 mix-blend-screen blur-[0.5px] z-10">
        <svg viewBox="0 0 200 240" className="w-full h-full fill-none">
          <defs>
            <radialGradient id="roseLeft" cx="25%" cy="80%" r="75%">
              <stop offset="0%" stopColor="#9E354C" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#35171F" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#100D0D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M 10,220 C 40,140 110,90 170,110 C 190,150 160,210 120,230 C 80,240 30,235 10,220 Z"
            fill="url(#roseLeft)"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute -right-8 -bottom-8 w-48 h-60 sm:w-64 sm:h-80 opacity-40 mix-blend-screen blur-[0.5px] z-10">
        <svg viewBox="0 0 220 260" className="w-full h-full fill-none">
          <defs>
            <radialGradient id="roseRight" cx="80%" cy="80%" r="75%">
              <stop offset="0%" stopColor="#9E354C" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#35171F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#100D0D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M 210,240 C 170,150 100,100 40,120 C 20,160 50,220 90,240 C 130,250 190,245 210,240 Z"
            fill="url(#roseRight)"
          />
        </svg>
      </div>

      {/* 3. LAYER 1: OVERSIZED "PORTFOLIO" TYPOGRAPHY (Behind Portrait) */}
      <div className="absolute top-[13%] sm:top-[12%] lg:top-[10%] left-0 right-0 w-full flex justify-center z-10 pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-[93%] max-w-[1420px] flex justify-center"
        >
          <svg
            viewBox="0 0 1440 240"
            className="w-full h-auto overflow-visible select-none"
            style={{ filter: 'drop-shadow(0 4px 35px rgba(0,0,0,0.65))' }}
          >
            <text
              x="50%"
              y="76%"
              textAnchor="middle"
              fill="#DFC1AC"
              fontFamily="'Bodoni Moda', 'Didot', 'Bodoni 72', serif"
              fontWeight="400"
              fontSize="235"
              textLength="1360"
              lengthAdjust="spacingAndGlyphs"
              letterSpacing="0.05em"
              style={{
                fontVariationSettings: "'opsz' 96, 'wght' 400"
              }}
            >
              PORTFOLIO
            </text>
          </svg>
        </motion.div>
      </div>

      {/* 4. LAYER 2: CENTRAL PORTRAIT (Naturally overlaps lower half of letters, sits neatly above bottom divider) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 -translate-x-1/2 bottom-7 sm:bottom-8 lg:bottom-10 z-20 pointer-events-none flex justify-center items-end h-[490px] sm:h-[520px] md:h-[550px] lg:h-[575px] max-h-[82%] select-none"
      >
        <img
          src={heroPortrait}
          alt={personal.name}
          className="h-full w-auto max-w-[85vw] sm:max-w-none object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.92)]"
          style={{
            filter: 'contrast(1.03) brightness(0.98)'
          }}
        />
      </motion.div>

      {/* 5. LAYER 3: FOREGROUND UI CONTENT (Top Labels + Bottom-Left & Bottom-Right Flanking Blocks) */}
      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-7 sm:pt-9 pb-9 sm:pb-10 lg:pb-12 flex flex-col justify-between h-full min-h-[695px] lg:min-h-[715px] xl:min-h-[745px] z-30">

        {/* TOP LABELS (Exact match to reference) */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.25em] text-[#DFC1AC]/80 uppercase font-medium z-30">
          <span>UI/UX &amp; WEB DEVELOPER</span>
          <span>CREATIVE PORTFOLIO</span>
        </div>

        {/* BOTTOM FLANKING CONTENT */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end pb-1 sm:pb-2 z-30 pointer-events-auto mt-auto">

          {/* BOTTOM-LEFT INTRODUCTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-start space-y-3.5 max-w-xs"
          >
            {/* 3-line headline */}
            <div className="space-y-0.5 text-left max-w-[210px]">
              <p className="font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.16em] text-[#F3E7DC] uppercase leading-[1.45]">
                I DESIGN DIGITAL
              </p>
              <p className="font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.16em] text-[#F3E7DC] uppercase leading-[1.45]">
                EXPERIENCES THAT
              </p>
              <p className="font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.16em] text-[#F3E7DC] uppercase leading-[1.45]">
                INSPIRE &amp; CONNECT
              </p>
            </div>

            {/* Outlined Pill Button */}
            <button
              onClick={onOpenContact}
              className="group inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#DFC1AC]/30 bg-[#151011]/60 hover:border-[#DFC1AC] hover:bg-[#35171F]/40 transition-all text-[9.5px] tracking-[0.18em] text-[#DFC1AC] uppercase font-medium cursor-pointer shadow-sm"
            >
              <span>AVAILABLE FOR OPPORTUNITIES</span>
              <span className="text-[#B8435C] text-[10px] group-hover:rotate-45 transition-transform duration-300">✦</span>
            </button>

            {/* Elegant Handwritten Cursive Signature (Single-line, muted rose/burgundy) */}
            <div className="pt-0.5">
              <span className="font-script text-3xl sm:text-[35px] lg:text-[39px] text-[#B8435C] font-normal tracking-wide block leading-none select-none drop-shadow-sm whitespace-nowrap">
                {personal.scriptName}
              </span>
            </div>
          </motion.div>

          {/* BOTTOM-RIGHT PROFESSIONAL DESCRIPTION & LOCATION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-start md:items-end space-y-3.5 max-w-xs md:ml-auto"
          >
            {/* Description block matching reference text */}
            <div className="text-left md:text-right w-full max-w-[210px]">
              <p className="font-sans text-[11px] sm:text-[11.5px] text-[#B49A8C] leading-[1.65] font-light">
                I'm a UI/UX &amp; Web Developer crafting thoughtful, functional and user-centered digital experiences.
              </p>
            </div>

            {/* Location & Minimal Globe Icon */}
            <div className="flex items-center gap-2.5 pt-1">
              <div className="flex flex-col text-[9.5px] tracking-[0.22em] text-[#DFC1AC]/85 uppercase font-medium text-left md:text-right leading-tight">
                <span>BASED IN CHENNAI, INDIA</span>
                <span className="text-[#B8435C] font-semibold">WORKING WORLDWIDE</span>
              </div>
              <div className="w-6 h-6 rounded-full border border-[#DFC1AC]/35 flex items-center justify-center text-[#DFC1AC] shrink-0">
                <Globe size={11} className="hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
