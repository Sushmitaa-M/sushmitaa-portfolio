import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Visual Mockup 01: Concentric Diagnostic Radar (Beauty Recommendation System)
function MockupRadar() {
  return (
    <div className="relative aspect-[16/10] lg:aspect-[16/11] w-full rounded-xl overflow-hidden border border-[#392A29] bg-[#170F11] flex items-center justify-center group-hover:border-[#9E354C]/50 transition-colors duration-500">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(158, 53, 76, 0.22) 0%, rgba(53, 23, 31, 0.4) 50%, transparent 75%)'
        }}
      />
      <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out">
        <circle cx="80" cy="80" r="64" fill="none" stroke="#DFC1AC" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="80" cy="80" r="48" fill="none" stroke="#9E354C" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="80" cy="80" r="32" fill="none" stroke="#DFC1AC" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="80" cy="80" r="18" fill="#35171F" stroke="#9E354C" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="5" fill="#F3E7DC" />
        <line x1="80" y1="10" x2="80" y2="150" stroke="#DFC1AC" strokeOpacity="0.15" />
        <line x1="10" y1="80" x2="150" y2="80" stroke="#DFC1AC" strokeOpacity="0.15" />
      </svg>
      <div className="absolute bottom-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#392A29] bg-[#211316]/90">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9E354C]" />
        <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono">
          CLIMATE ADAPTIVE SCANNER
        </span>
      </div>
    </div>
  );
}

// Visual Mockup 02: Sentiment Analytics Data Chart (Smart Feedback & Poll)
function MockupBarChart() {
  const bars = [40, 75, 55, 90, 65, 80, 45, 95, 70, 85];
  return (
    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#392A29] bg-[#170F11] flex flex-col justify-end p-4 sm:p-5 group-hover:border-[#9E354C]/50 transition-colors duration-500">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(158, 53, 76, 0.25) 0%, rgba(53, 23, 31, 0.3) 50%, transparent 80%)'
        }}
      />
      <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-16 sm:h-20 w-full relative z-10">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm group-hover:brightness-110 transition-all duration-300"
            style={{ 
              height: `${height}%`,
              background: 'linear-gradient(to top, #35171F, #721C24, #9E354C)'
            }}
          />
        ))}
      </div>
      <div className="w-full h-[1px] bg-[#392A29] mt-1 relative z-10" />
      <div className="flex items-center justify-between mt-2 relative z-10">
        <span className="text-[8.5px] sm:text-[9px] tracking-[0.18em] text-[#B49A8C] uppercase font-mono">
          TEXTBLOB NLP PIPELINE
        </span>
        <span className="text-[8.5px] sm:text-[9px] tracking-[0.18em] text-[#DFC1AC] uppercase font-mono">
          +0.82 POLARITY
        </span>
      </div>
    </div>
  );
}

// Visual Mockup 03: Haute Couture Typography (Editorial Portfolio)
function MockupEditorial() {
  return (
    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#392A29] bg-[#170F11] flex flex-col items-center justify-center p-4 group-hover:border-[#9E354C]/50 transition-colors duration-500">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(53, 23, 31, 0.45) 0%, rgba(33, 19, 22, 0.6) 60%, transparent 85%)'
        }}
      />
      <span className="text-[8.5px] sm:text-[9px] tracking-[0.25em] text-[#B49A8C] uppercase font-mono mb-1 relative z-10">
        HAUTE COUTURE
      </span>
      <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#F3E7DC] uppercase tracking-wider relative z-10 group-hover:scale-105 transition-transform duration-500">
        EDITORIAL
      </span>
      <div className="w-12 h-[1px] bg-[#9E354C] my-2 relative z-10" />
      <span className="text-[8px] sm:text-[8.5px] tracking-[0.2em] text-[#DFC1AC]/80 uppercase relative z-10">
        Bespoke Web Architecture
      </span>
    </div>
  );
}

export default function SelectedProjects({ onSelectProject }) {
  const { projects } = portfolioData;

  const project01 = projects.find((p) => p.id === '01') || projects[0];
  const project02 = projects.find((p) => p.id === '02') || projects[1];
  const project03 = projects.find((p) => p.id === '03') || projects[2];

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-28 px-4 xs:px-6 sm:px-10 bg-[#100D0D] border-t border-[#392A29] relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header with Responsive Title Size */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 sm:pb-12 border-b border-[#392A29] gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#9E354C] uppercase font-semibold">
              01 // SHOWCASE
            </span>
            <span className="text-[#392A29] text-base">/</span>
            <h2 className="font-editorial text-lg xs:text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.2em] text-[#DFC1AC] uppercase font-medium">
              SELECTED PROJECTS
            </h2>
            <span className="text-[#9E354C] text-sm">✦</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-light hidden sm:inline">
              CURATED REPERTOIRE (3 WORKS)
            </span>
            <a
              href="#projects"
              className="flex items-center gap-2 text-xs tracking-[0.18em] sm:tracking-[0.2em] text-[#DFC1AC] hover:text-white uppercase transition-colors"
            >
              <span>EXPLORE ALL</span>
              <span>⟶</span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid: Responsive 1-col on mobile, 12-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          
          {/* ======================================================== */}
          {/* FEATURED HERO PROJECT: 01 DESI BEAUTY ADVISOR (12 Cols) */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectProject(project01)}
            className="group lg:col-span-12 rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C] cursor-pointer p-5 xs:p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(158,53,76,0.25)] hover:-translate-y-1.5 active:scale-[0.99]"
          >
            {/* Subtle background glow */}
            <div 
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 blur-[90px] group-hover:opacity-70 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(circle, #9E354C 0%, #35171F 50%, transparent 70%)'
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
              
              {/* Context & Metadata */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-[#9E354C]/50 bg-[#35171F]/60 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] text-[#F3E7DC] font-mono uppercase font-semibold">
                      FEATURED ARCHITECTURE · {project01.number}
                    </span>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-[#B49A8C] uppercase font-mono">
                      {project01.category}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-[#F3E7DC] uppercase tracking-wide leading-tight mb-2 group-hover:text-white transition-colors">
                    {project01.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] tracking-wider text-[#9E354C] uppercase font-medium mb-3 sm:mb-4">
                    {project01.subtitle}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#DFC1AC]/90 leading-relaxed font-light mb-4 sm:mb-6 max-w-2xl">
                    {project01.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 sm:pt-4 border-t border-[#392A29]/70 mb-4 sm:mb-6">
                    {project01.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#B49A8C] font-light">
                        <span className="text-[#9E354C]">✦</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Tags & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 sm:pt-4 border-t border-[#392A29]">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project01.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[9.5px] tracking-wider px-2.5 py-1 rounded-md bg-[#151011] border border-[#392A29] text-[#DFC1AC]/80 uppercase font-mono font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2.5 text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] text-[#F3E7DC] uppercase font-semibold group-hover:text-white pt-2 sm:pt-0">
                    <span>EXPLORE PROJECT</span>
                    <div className="w-6 h-6 rounded-full border border-[#DFC1AC]/40 bg-[#35171F]/50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={12} className="text-[#F3E7DC]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Mockup */}
              <div className="lg:col-span-5 flex flex-col justify-center order-first lg:order-last">
                <MockupRadar />
              </div>

            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* SECONDARY PROJECT 02: SMART FEEDBACK & POLL (7 Cols)     */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectProject(project02)}
            className="group lg:col-span-7 rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C] cursor-pointer p-5 xs:p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(158,53,76,0.22)] hover:-translate-y-1.5 active:scale-[0.99] h-full"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#392A29] mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-[#9E354C] font-semibold">
                    {project02.number}
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono">
                    {project02.category}
                  </span>
                </div>
                <span className="text-[8.5px] sm:text-[9px] tracking-wider px-2 py-0.5 rounded-full border border-[#392A29] bg-[#151011] text-[#DFC1AC]/70 uppercase font-mono">
                  FULL STACK NLP
                </span>
              </div>

              {/* Visual Mockup */}
              <MockupBarChart />

              {/* Title & Description */}
              <h3 className="font-editorial text-lg xs:text-xl sm:text-2xl text-[#F3E8DF] uppercase tracking-wide leading-snug mt-4 mb-1 group-hover:text-white transition-colors">
                {project02.title}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] tracking-wider text-[#9E354C] uppercase font-medium mb-3">
                {project02.subtitle}
              </p>
              <p className="font-sans text-xs text-[#DFC1AC]/80 leading-relaxed font-light mb-5">
                {project02.description}
              </p>
            </div>

            {/* Bottom: Tags & Action */}
            <div className="pt-4 border-t border-[#392A29] mt-auto">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project02.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-wider px-2 py-0.5 rounded bg-[#151011] border border-[#392A29] text-[#DFC1AC]/70 uppercase font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] text-[#F3E7DC] uppercase font-medium group-hover:text-white">
                <span>View Analytics Architecture</span>
                <div className="w-5 h-5 rounded-full border border-[#392A29] group-hover:border-[#9E354C] flex items-center justify-center group-hover:translate-x-1 transition-all">
                  <ArrowRight size={10} className="text-[#9E354C]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* SECONDARY PROJECT 03: EDITORIAL PORTFOLIO (5 Cols)       */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectProject(project03)}
            className="group lg:col-span-5 rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C] cursor-pointer p-5 xs:p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(158,53,76,0.22)] hover:-translate-y-1.5 active:scale-[0.99] h-full"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#392A29] mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-[#9E354C] font-semibold">
                    {project03.number}
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono">
                    {project03.category}
                  </span>
                </div>
                <span className="text-[8.5px] sm:text-[9px] tracking-wider px-2 py-0.5 rounded-full border border-[#392A29] bg-[#151011] text-[#DFC1AC]/70 uppercase font-mono">
                  FRONTEND
                </span>
              </div>

              {/* Visual Mockup */}
              <MockupEditorial />

              {/* Title & Description */}
              <h3 className="font-editorial text-lg xs:text-xl sm:text-2xl text-[#F3E8DF] uppercase tracking-wide leading-snug mt-4 mb-1 group-hover:text-white transition-colors">
                {project03.title}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] tracking-wider text-[#9E354C] uppercase font-medium mb-3">
                {project03.subtitle}
              </p>
              <p className="font-sans text-xs text-[#DFC1AC]/80 leading-relaxed font-light mb-5">
                {project03.description}
              </p>
            </div>

            {/* Bottom: Tags & Action */}
            <div className="pt-4 border-t border-[#392A29] mt-auto">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project03.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-wider px-2 py-0.5 rounded bg-[#151011] border border-[#392A29] text-[#DFC1AC]/70 uppercase font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] text-[#F3E7DC] uppercase font-medium group-hover:text-white">
                <span>View Design System</span>
                <div className="w-5 h-5 rounded-full border border-[#392A29] group-hover:border-[#9E354C] flex items-center justify-center group-hover:translate-x-1 transition-all">
                  <ArrowRight size={10} className="text-[#9E354C]" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}