import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import heroPortrait from '../assets/hero_portrait.png';
import HeroParticleHeading from './HeroParticleHeading';

export default function HeroSection({ onOpenContact }) {
  const { personal } = portfolioData;

  return (
    <section
      id="top"
      className="relative w-full bg-[#100D0D] text-[#DFC1AC] overflow-hidden border-b border-[#392A29] select-none min-h-[720px] xs:min-h-[760px] md:min-h-[695px] lg:min-h-[715px] xl:min-h-[745px] flex flex-col justify-between"
    >
      {/* 1. BACKGROUND BURGUNDY RADIAL LIGHTING BEHIND PORTRAIT */}
      <div
        className="pointer-events-none absolute top-[40%] md:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] xs:w-[420px] xs:h-[420px] sm:w-[620px] sm:h-[620px] lg:w-[860px] lg:h-[860px] rounded-full blur-[90px] sm:blur-[110px] opacity-60 z-0"
        style={{
          background: 'radial-gradient(circle, #35171F 0%, #200D12 45%, transparent 72%)'
        }}
      />

      {/* 2. SUBTLE BOTANICAL FLORAL ACCENTS IN CORNERS */}
      <div className="pointer-events-none absolute -left-8 -bottom-8 w-36 h-48 sm:w-60 sm:h-72 opacity-25 sm:opacity-35 mix-blend-screen blur-[0.5px] z-10">
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

      <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-48 sm:w-64 sm:h-80 opacity-25 sm:opacity-40 mix-blend-screen blur-[0.5px] z-10">
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

      {/* 3. LAYER 1: OVERSIZED "PORTFOLIO" TYPOGRAPHY WITH PARTICLES */}
      <div className="absolute top-[68px] xs:top-[74px] sm:top-[12%] lg:top-[10%] left-0 right-0 w-full flex justify-center z-10 pointer-events-none px-2 sm:px-4">
        <HeroParticleHeading />
      </div>

      {/* 4. LAYER 2: CENTRAL ANIME PORTRAIT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 -translate-x-1/2 top-[102px] xs:top-[112px] sm:top-[140px] md:top-auto md:bottom-7 sm:md:bottom-8 lg:bottom-10 z-20 pointer-events-none flex justify-center items-end h-[340px] xs:h-[380px] sm:h-[450px] md:h-[550px] lg:h-[575px] max-h-[82%] select-none"
      >
        <img
          src={heroPortrait}
          alt={personal.name}
          className="h-full w-auto max-w-[88vw] sm:max-w-none object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.92)]"
          style={{
            filter: 'contrast(1.03) brightness(0.98)'
          }}
        />
      </motion.div>

      {/* 5. LAYER 3: FOREGROUND UI CONTENT CONTAINER */}
      <div className="relative max-w-[1360px] w-full mx-auto px-5 sm:px-10 lg:px-14 pt-6 sm:pt-9 pb-8 sm:pb-10 lg:pb-12 flex flex-col justify-between h-full min-h-[720px] xs:min-h-[760px] md:min-h-[695px] lg:min-h-[715px] xl:min-h-[745px] z-30">

        {/* TOP LABELS */}
        <div className="w-full flex items-center justify-between text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em] text-[#DFC1AC]/80 uppercase font-medium z-30">
          <span>UI/UX &amp; WEB DEVELOPER</span>
          <span>CREATIVE PORTFOLIO</span>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP FLANKING CONTENT (md: and up) - EXACT PRESERVED   */}
        {/* ======================================================== */}
        <div className="hidden md:grid relative w-full md:grid-cols-2 gap-8 items-end pb-1 sm:pb-2 z-30 pointer-events-auto mt-auto">

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
              <span className="text-[#9E354C] text-[10px] group-hover:rotate-45 transition-transform duration-300">✦</span>
            </button>

            {/* Elegant Handwritten Cursive Signature */}
            <div className="pt-0.5">
              <span className="font-script text-3xl sm:text-[35px] lg:text-[39px] text-[#9E354C] font-normal tracking-wide block leading-none select-none drop-shadow-sm whitespace-nowrap">
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
            {/* Description block */}
            <div className="text-left md:text-right w-full max-w-[210px]">
              <p className="font-sans text-[11px] sm:text-[11.5px] text-[#B49A8C] leading-[1.65] font-light">
                I'm a UI/UX &amp; Web Developer crafting thoughtful, functional and user-centered digital experiences.
              </p>
            </div>

            {/* Location & Minimal Globe Icon */}
            <div className="flex items-center gap-2.5 pt-1">
              <div className="flex flex-col text-[9.5px] tracking-[0.22em] text-[#DFC1AC]/85 uppercase font-medium text-left md:text-right leading-tight">
                <span>BASED IN CHENNAI, INDIA</span>
                <span className="text-[#9E354C] font-semibold">WORKING WORLDWIDE</span>
              </div>
              <div className="w-6 h-6 rounded-full border border-[#DFC1AC]/35 flex items-center justify-center text-[#DFC1AC] shrink-0">
                <Globe size={11} className="hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ======================================================== */}
        {/* MOBILE COMPOSITION (< md) - TAILORED VERTICAL HIERARCHY  */}
        {/* ======================================================== */}
        <div className="md:hidden relative w-full flex flex-col items-center text-center z-30 pointer-events-auto mt-auto pt-8 pb-2 space-y-3.5 bg-gradient-to-t from-[#100D0D] via-[#100D0D]/95 to-transparent">
          
          {/* Availability Pill Button */}
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#9E354C]/50 bg-[#211316]/90 text-[10px] tracking-[0.18em] text-[#DFC1AC] uppercase font-medium active:scale-95 transition-all shadow-md"
          >
            <span>AVAILABLE FOR OPPORTUNITIES</span>
            <span className="text-[#9E354C] text-[11px]">✦</span>
          </button>

          {/* Headline */}
          <div className="space-y-0.5 max-w-[280px]">
            <p className="font-sans text-xs font-semibold tracking-[0.16em] text-[#F3E7DC] uppercase leading-snug">
              I DESIGN DIGITAL EXPERIENCES THAT INSPIRE &amp; CONNECT
            </p>
          </div>

          {/* Signature */}
          <div className="py-0.5">
            <span className="font-script text-3xl xs:text-4xl text-[#9E354C] font-normal tracking-wide block leading-none select-none drop-shadow-sm">
              {personal.scriptName}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-[11px] text-[#B49A8C] leading-relaxed font-light max-w-[290px] px-2">
            Junior UI/UX &amp; Web Developer crafting thoughtful, functional and user-centered digital experiences.
          </p>

          {/* Location & Globe Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#392A29] bg-[#151011]">
            <Globe size={11} className="text-[#9E354C]" />
            <span className="text-[9px] font-mono tracking-widest text-[#DFC1AC] uppercase">
              CHENNAI, INDIA · WORKING WORLDWIDE
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}