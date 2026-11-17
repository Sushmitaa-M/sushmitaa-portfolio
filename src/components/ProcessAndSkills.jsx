import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Sparkles, 
  Code2, 
  Search,
  Database,
  Palette,
  Binary,
  Rocket
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// Technology Icon Mapper for Featured Cards
function SkillFeatureIcon({ type }) {
  switch (type) {
    case 'python':
      return <Terminal className="text-[#9E354C]" size={22} />;
    case 'react':
      return <Cpu className="text-[#DFC1AC]" size={22} />;
    case 'flask':
      return <Workflow className="text-[#B49A8C]" size={22} />;
    case 'design':
      return <Sparkles className="text-[#9E354C]" size={22} />;
    default:
      return <Code2 className="text-[#DFC1AC]" size={22} />;
  }
}

// Process Step Icon Mapper
function ProcessIcon({ step }) {
  switch (step) {
    case '01':
      return <Search size={16} className="text-[#9E354C] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />;
    case '02':
      return <Database size={16} className="text-[#B49A8C] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />;
    case '03':
      return <Palette size={16} className="text-[#DFC1AC] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />;
    case '04':
      return <Binary size={16} className="text-[#9E354C] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />;
    case '05':
      return <Rocket size={16} className="text-[#F3E7DC] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />;
    default:
      return <Sparkles size={16} className="text-[#9E354C] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />;
  }
}

export default function ProcessAndSkills() {
  const { processSteps, featuredSkills, skillGroups, personal } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const horizontalPinRef = useRef(null);
  const trackRef = useRef(null);
  const mobileSliderRef = useRef(null);

  const filterTabs = ['ALL', 'PROGRAMMING', 'FRONTEND', 'BACKEND & ML', 'UI/UX & DATA'];

  const filteredFeaturedSkills = activeFilter === 'ALL'
    ? featuredSkills
    : featuredSkills.filter(s => s.category.toUpperCase().includes(activeFilter.replace(' & ML', '').replace(' & DATA', '')));

  // GSAP Horizontal Scroll Pinning for Tools & Technologies on Desktop (>= 1024px only)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const pinContainer = horizontalPinRef.current;
      const track = trackRef.current;

      if (!pinContainer || !track) return;

      const getScrollLength = () => {
        if (!track || !track.parentElement) return 0;
        const parentW = track.parentElement.clientWidth;
        const totalW = track.scrollWidth;
        return Math.max(0, totalW - parentW + 48);
      };

      const scrollLength = getScrollLength();

      if (scrollLength > 30) {
        const tween = gsap.to(track, {
          x: () => -getScrollLength(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinContainer,
            pin: true,
            scrub: 0.85,
            start: 'top 12%',
            end: () => `+=${getScrollLength() + 260}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.min(
                filteredFeaturedSkills.length - 1,
                Math.floor(progress * filteredFeaturedSkills.length)
              );
              setActiveCardIndex(idx);
            }
          }
        });

        return () => {
          if (tween.scrollTrigger) tween.scrollTrigger.kill();
          tween.kill();
        };
      } else {
        gsap.set(track, { x: 0 });
      }
    });

    return () => mm.revert();
  }, [filteredFeaturedSkills]);

  // Handle dot click navigation
  const handleDotClick = (idx) => {
    setActiveCardIndex(idx);
    if (mobileSliderRef.current) {
      const cards = mobileSliderRef.current.querySelectorAll('.mobile-skill-card');
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-28 px-4 xs:px-6 sm:px-10 bg-[#100D0D] border-t border-[#392A29] relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* ======================================================== */}
        {/* SECTION 1: MY PROCESS (Aligned Baseline + Hover Effects) */}
        {/* ======================================================== */}
        <div id="process" className="mb-20 sm:mb-28 lg:mb-32">
          
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
                02 // METHODOLOGY
              </span>
              <span className="text-[#392A29] text-base">/</span>
              <h2 className="font-editorial text-lg xs:text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.2em] text-[#DFC1AC] uppercase font-medium">
                MY PROCESS
              </h2>
              <span className="text-[#9E354C] text-sm">⟶</span>
            </div>

            <span className="text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-light">
              5 INTERCONNECTED PHASES
            </span>
          </motion.div>

          {/* Continuous Progression Rail on Desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden lg:block relative mb-8 px-4"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-[#35171F] via-[#9E354C]/60 to-[#35171F] absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0" />
            <div className="relative z-10 flex justify-between items-center max-w-[1240px] mx-auto">
              {processSteps.map((step) => (
                <div key={step.number} className="flex items-center gap-2 bg-[#100D0D] px-3.5 py-1 rounded-full border border-[#392A29]">
                  <span className="w-2 h-2 rounded-full bg-[#9E354C]" />
                  <span className="text-[10px] font-mono tracking-widest text-[#DFC1AC] uppercase font-semibold">
                    PHASE {step.number}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5 Process Cards: Clean Vertical Stack on Mobile, Aligned 5-Col on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8 sm:mb-10 items-stretch">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C] hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,0,0,0.9),0_0_28px_rgba(158,53,76,0.28)] active:scale-[0.99] active:border-[#9E354C] transition-all duration-300 ease-out cursor-default flex flex-col justify-between p-5 sm:p-6 h-full min-h-[220px] sm:min-h-[250px] overflow-hidden"
              >
                {/* Background burgundy hover glow */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(158, 53, 76, 0.22) 0%, rgba(53, 23, 31, 0.35) 60%, transparent 80%)'
                  }}
                />

                {/* Top subtle highlight line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9E354C]/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Step Number & Icon Box */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#392A29] group-hover:border-[#392A29]/80 mb-3.5 sm:mb-4 transition-colors">
                    <span className="font-mono text-xs tracking-widest text-[#9E354C] group-hover:text-[#F3E7DC] font-bold transition-colors">
                      PHASE {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#151011] border border-[#392A29] group-hover:border-[#9E354C]/60 group-hover:bg-[#35171F]/40 flex items-center justify-center transition-all duration-300">
                      <ProcessIcon step={step.number} />
                    </div>
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg text-[#F3E7DC] uppercase tracking-wide group-hover:text-white transition-colors mb-1">
                    {step.title}
                  </h3>
                  
                  <span className="text-[9px] sm:text-[9.5px] tracking-wider text-[#9E354C] uppercase font-semibold block mb-2.5 sm:mb-3 font-mono">
                    {step.tagline}
                  </span>
                </div>

                <p className="font-sans text-xs text-[#B49A8C] group-hover:text-[#DFC1AC]/90 font-light leading-relaxed mt-2 pt-2.5 sm:pt-3 border-t border-[#392A29]/60 relative z-10 transition-colors">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Career Objective Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 xs:p-6 sm:p-8 rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C]/40 max-w-5xl mx-auto text-center shadow-xl relative overflow-hidden transition-all duration-300"
          >
            <div 
              className="absolute inset-0 pointer-events-none opacity-40" 
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(158, 53, 76, 0.2) 0%, rgba(53, 23, 31, 0.3) 60%, transparent 80%)'
              }}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9E354C]/40 bg-[#35171F]/60 mb-2.5 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E354C]" />
                <span className="text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#DFC1AC] uppercase font-semibold font-mono">
                  CORE CAREER OBJECTIVE
                </span>
              </div>
              <p className="font-cormorant text-base xs:text-lg sm:text-xl md:text-2xl text-[#DFC1AC] italic leading-relaxed max-w-4xl mx-auto">
                "{personal.objective}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: TOOLS & TECHNOLOGIES                          */}
        {/* ======================================================== */}
        <div id="skills" className="relative pt-4 sm:pt-6">
          
          {/* Desktop Pinned Horizontal Container Wrapper */}
          <div ref={horizontalPinRef} className="w-full">
            
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
                  03 // STACK
                </span>
                <span className="text-[#392A29] text-base">/</span>
                <h2 className="font-editorial text-lg xs:text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.2em] text-[#DFC1AC] uppercase font-medium">
                  TOOLS &amp; TECHNOLOGIES
                </h2>
                <span className="text-[#9E354C] text-sm">⟶</span>
              </div>

              {/* Category Filter Pills (Touch friendly on mobile) */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.18em] px-2.5 sm:px-3.5 py-1.5 rounded-full uppercase font-medium transition-all cursor-pointer font-mono active:scale-95 ${
                      activeFilter === tab
                        ? 'border border-[#DFC1AC] bg-[#35171F] text-[#F3E7DC]'
                        : 'border border-[#392A29] bg-[#151011] text-[#B49A8C] hover:text-[#DFC1AC] hover:border-[#DFC1AC]/40'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Desktop Horizontal Scroll Track (lg and up) - STRICTLY UNTOUCHED */}
            <div className="hidden lg:block overflow-hidden w-full relative pt-6 pb-10 -mt-2 -mb-2 px-2">
              <div
                ref={trackRef}
                className="flex gap-6 items-stretch w-max will-change-transform py-4 px-6"
              >
                {filteredFeaturedSkills.map((skill, idx) => (
                  <div
                    key={skill.number}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`w-[390px] p-7 rounded-2xl border bg-[#211316] cursor-pointer flex flex-col justify-between min-h-[310px] shrink-0 transition-all duration-300 relative shadow-xl z-10 hover:z-20 hover:-translate-y-2 ${
                      activeCardIndex === idx
                        ? 'border-[#DFC1AC]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_28px_rgba(158,53,76,0.35)]'
                        : 'border-[#392A29] hover:border-[#9E354C] hover:shadow-[0_18px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(158,53,76,0.25)]'
                    }`}
                  >
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-2xl opacity-35"
                      style={{
                        background: 'radial-gradient(circle at 100% 0%, rgba(158, 53, 76, 0.25) 0%, transparent 60%)'
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between pb-3 border-b border-[#392A29] mb-5">
                        <span className="font-mono text-xs tracking-widest text-[#9E354C] font-bold">
                          {skill.number}
                        </span>
                        <span className="text-[9px] tracking-[0.2em] text-[#B49A8C] uppercase px-2.5 py-0.5 rounded-full border border-[#392A29] bg-[#151011] font-mono">
                          {skill.category}
                        </span>
                      </div>

                      <div className="w-11 h-11 rounded-xl bg-[#151011] border border-[#392A29] flex items-center justify-center mb-4">
                        <SkillFeatureIcon type={skill.icon} />
                      </div>

                      <h3 className="font-editorial text-lg sm:text-xl text-[#F3E7DC] uppercase tracking-wide mb-2">
                        {skill.name}
                      </h3>

                      <p className="font-sans text-xs text-[#DFC1AC]/80 leading-relaxed font-light">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#392A29] mt-4 relative z-10 flex items-center justify-between">
                      <span className="text-[9.5px] tracking-[0.2em] text-[#9E354C] uppercase font-mono font-semibold">
                        {skill.badge}
                      </span>
                      <span className="text-[9px] text-[#B49A8C] uppercase font-mono">
                        EXPERTISE
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile / Tablet Touch-Friendly Horizontal Slider (< lg) */}
            <div
              ref={mobileSliderRef}
              className="lg:hidden flex gap-4 overflow-x-auto pt-3 pb-6 px-2 xs:px-4 sm:px-6 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredFeaturedSkills.map((skill, idx) => (
                <div
                  key={skill.number}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`mobile-skill-card snap-center shrink-0 w-[82vw] xs:w-[78vw] sm:w-[340px] p-5 xs:p-6 sm:p-7 rounded-2xl border bg-[#211316] flex flex-col justify-between min-h-[285px] sm:min-h-[300px] transition-all duration-300 relative shadow-xl z-10 active:scale-[0.99] ${
                    activeCardIndex === idx
                      ? 'border-[#DFC1AC]/80 shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(158,53,76,0.3)]'
                      : 'border-[#392A29]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#392A29] mb-3.5">
                      <span className="font-mono text-xs tracking-widest text-[#9E354C] font-bold">
                        {skill.number}
                      </span>
                      <span className="text-[9px] tracking-[0.18em] text-[#B49A8C] uppercase px-2 py-0.5 rounded-full border border-[#392A29] bg-[#151011] font-mono">
                        {skill.category}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-lg bg-[#151011] border border-[#392A29] flex items-center justify-center mb-3">
                      <SkillFeatureIcon type={skill.icon} />
                    </div>

                    <h3 className="font-editorial text-base xs:text-lg text-[#F3E7DC] uppercase tracking-wide mb-1.5">
                      {skill.name}
                    </h3>

                    <p className="font-sans text-xs text-[#DFC1AC]/80 leading-relaxed font-light">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#392A29] mt-3.5 flex items-center justify-between">
                    <span className="text-[9px] sm:text-[9.5px] tracking-[0.2em] text-[#9E354C] uppercase font-mono font-semibold">
                      {skill.badge}
                    </span>
                    <span className="text-[8.5px] text-[#B49A8C] uppercase font-mono">
                      SWIPE ⟶
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center gap-2 pt-1 pb-5">
              {filteredFeaturedSkills.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeCardIndex
                      ? 'w-6 bg-[#9E354C]'
                      : 'w-2 bg-[#392A29] hover:bg-[#DFC1AC]/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Categorized Skill Bento Pill Groups */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#392A29] flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto"
          >
            {skillGroups.map((group) => (
              <div
                key={group.group}
                className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border border-[#392A29] bg-[#211316] max-w-full"
              >
                <span className="text-[8.5px] sm:text-[9px] font-mono text-[#9E354C] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#151011] border border-[#392A29] shrink-0">
                  {group.group}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[9px] sm:text-[10px] tracking-wider text-[#DFC1AC]/90 font-medium px-2 py-0.5 rounded bg-[#151011] border border-[#392A29]/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Footer Callout */}
          <div className="pt-6 sm:pt-8 text-center mt-4 sm:mt-6">
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#B49A8C] uppercase font-mono">
              ✦ CONTINUOUS LEARNING · ADAPTIVE PROBLEM SOLVER ✦
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}