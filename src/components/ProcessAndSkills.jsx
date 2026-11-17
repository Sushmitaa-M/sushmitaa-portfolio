import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Sparkles, 
  BarChart3, 
  Code2, 
  Layers, 
  Database,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// Technology Icon Mapper for Featured Cards
function SkillFeatureIcon({ type }) {
  switch (type) {
    case 'python':
      return <Terminal className="text-[#E05368]" size={22} />;
    case 'react':
      return <Cpu className="text-[#61DAFB]" size={22} />;
    case 'flask':
      return <Workflow className="text-[#D8BDAA]" size={22} />;
    case 'design':
      return <Sparkles className="text-[#F39C12]" size={22} />;
    default:
      return <Code2 className="text-[#D8BDAA]" size={22} />;
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

  // GSAP Horizontal Scroll Pinning for Tools & Technologies on Desktop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const pinContainer = horizontalPinRef.current;
      const track = trackRef.current;

      if (!pinContainer || !track) return;

      const getScrollLength = () => {
        return Math.max(0, track.scrollWidth - track.parentElement.clientWidth + 48);
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
    <section className="py-20 sm:py-28 px-6 sm:px-10 bg-[#100D0D] border-t border-[#D8BDAA]/15 relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* ======================================================== */}
        {/* SECTION 1: MY PROCESS                                    */}
        {/* ======================================================== */}
        <div id="process" className="mb-24 sm:mb-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-[#D8BDAA]/15 gap-3 mb-10"
          >
            <div className="flex items-center gap-2">
              <h2 className="font-editorial text-sm sm:text-base tracking-[0.25em] text-[#D8BDAA] uppercase font-medium">
                MY PROCESS
              </h2>
              <span className="text-[#8C2230] text-sm">⟶</span>
            </div>

            <span className="text-xs tracking-[0.2em] text-[#D8BDAA]/60 uppercase font-light">
              5 PHASES FROM CONCEPT TO DEPLOYMENT
            </span>
          </motion.div>

          {/* 5 Process Steps Horizontal Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between p-5 rounded-lg bg-[#141010] hover:bg-[#181213] border border-[#D8BDAA]/15 hover:border-[#D8BDAA]/40 transition-all duration-300 min-h-[220px]"
              >
                <div>
                  <span className="font-mono text-xs tracking-widest text-[#8C2230] font-bold block mb-3">
                    {step.number}
                  </span>
                  <h3 className="font-editorial text-base text-[#F3E8DF] uppercase tracking-wide group-hover:text-white transition-colors mb-1">
                    {step.title}
                  </h3>
                  <span className="text-[9.5px] tracking-wider text-[#A45B68] uppercase font-medium block mb-3 font-mono">
                    {step.tagline}
                  </span>
                </div>
                <p className="text-xs text-[#D8BDAA]/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Full-width Career Objective Quote Box */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-xl border border-[#D8BDAA]/18 bg-gradient-to-r from-[#170F11] via-[#140E10] to-[#170F11] max-w-5xl mx-auto text-center shadow-xl relative overflow-hidden group hover:border-[#D8BDAA]/35 transition-all"
          >
            <div className="absolute inset-0 bg-radial from-[#721C24]/15 via-transparent to-transparent pointer-events-none" />
            <span className="text-[10px] tracking-[0.25em] text-[#8C2230] uppercase font-semibold block mb-2 font-mono">
              CAREER OBJECTIVE
            </span>
            <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-[#D8BDAA] italic leading-relaxed max-w-4xl mx-auto">
              "{personal.objective}"
            </p>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: TOOLS & TECHNOLOGIES                          */}
        {/* ======================================================== */}
        <div id="skills" className="relative pt-6">
          
          {/* Desktop Pinned Horizontal Container Wrapper */}
          <div ref={horizontalPinRef} className="w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-[#D8BDAA]/15 gap-4 mb-10"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-sm sm:text-base tracking-[0.25em] text-[#D8BDAA] uppercase font-medium">
                  TOOLS &amp; TECHNOLOGIES
                </h2>
                <span className="text-[#8C2230] text-sm">⟶</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`text-[9.5px] sm:text-[10px] tracking-[0.18em] px-3.5 py-1.5 rounded-full uppercase font-medium transition-all cursor-pointer ${
                      activeFilter === tab
                        ? 'border border-[#D8BDAA] bg-[#721C24]/30 text-[#F3E8DF]'
                        : 'border border-[#D8BDAA]/15 bg-[#141010] text-[#D8BDAA]/60 hover:text-[#D8BDAA] hover:border-[#D8BDAA]/30'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Desktop Horizontal Scroll Track (lg and up) */}
            <div className="hidden lg:block overflow-hidden w-full relative pb-4">
              <div
                ref={trackRef}
                className="flex gap-6 items-stretch w-max will-change-transform"
              >
                {filteredFeaturedSkills.map((skill, idx) => (
                  <div
                    key={skill.number}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`w-[410px] p-6 rounded-xl border bg-[#141010] hover:bg-[#181213] cursor-pointer flex flex-col justify-between min-h-[295px] shrink-0 transition-all duration-300 relative group shadow-xl ${
                      activeCardIndex === idx
                        ? 'border-[#D8BDAA]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(140,34,48,0.2)]'
                        : 'border-[#D8BDAA]/15 hover:border-[#D8BDAA]/35'
                    }`}
                  >
                    {/* Background ambient subtle glow on hover */}
                    <div className="absolute inset-0 bg-radial from-[#721C24]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />

                    {/* Top Row: Number & Category Badge */}
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#D8BDAA]/10 mb-4">
                        <span className="font-mono text-xs tracking-widest text-[#8C2230] font-bold">
                          {skill.number}
                        </span>
                        <span className="text-[9px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase px-2 py-0.5 rounded-full border border-[#D8BDAA]/15 bg-[#171213] font-mono">
                          {skill.category}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="w-10 h-10 rounded-lg bg-[#191214] border border-[#D8BDAA]/15 flex items-center justify-center mb-4 group-hover:border-[#D8BDAA]/40 transition-colors">
                        <SkillFeatureIcon type={skill.icon} />
                      </div>

                      <h3 className="font-editorial text-lg sm:text-xl text-[#F3E8DF] uppercase tracking-wide group-hover:text-white transition-colors mb-2">
                        {skill.name}
                      </h3>

                      <p className="font-sans text-xs text-[#D8BDAA]/75 leading-relaxed font-light">
                        {skill.description}
                      </p>
                    </div>

                    {/* Bottom Badge */}
                    <div className="pt-4 border-t border-[#D8BDAA]/10 mt-4">
                      <span className="text-[9.5px] tracking-[0.2em] text-[#8C2230] uppercase font-mono font-semibold">
                        {skill.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile / Tablet Touch-Friendly Horizontal Slider (< lg) */}
            <div
              ref={mobileSliderRef}
              className="lg:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredFeaturedSkills.map((skill, idx) => (
                <div
                  key={skill.number}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`mobile-skill-card snap-start shrink-0 w-[84vw] sm:w-[340px] p-6 rounded-xl border bg-[#141010] flex flex-col justify-between min-h-[280px] transition-all duration-300 relative group shadow-xl ${
                    activeCardIndex === idx
                      ? 'border-[#D8BDAA]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(140,34,48,0.2)]'
                      : 'border-[#D8BDAA]/15'
                  }`}
                >
                  <div className="absolute inset-0 bg-radial from-[#721C24]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />

                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8BDAA]/10 mb-4">
                      <span className="font-mono text-xs tracking-widest text-[#8C2230] font-bold">
                        {skill.number}
                      </span>
                      <span className="text-[9px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase px-2 py-0.5 rounded-full border border-[#D8BDAA]/15 bg-[#171213] font-mono">
                        {skill.category}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-lg bg-[#191214] border border-[#D8BDAA]/15 flex items-center justify-center mb-4">
                      <SkillFeatureIcon type={skill.icon} />
                    </div>

                    <h3 className="font-editorial text-lg text-[#F3E8DF] uppercase tracking-wide mb-2">
                      {skill.name}
                    </h3>

                    <p className="font-sans text-xs text-[#D8BDAA]/75 leading-relaxed font-light">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D8BDAA]/10 mt-4">
                    <span className="text-[9.5px] tracking-[0.2em] text-[#8C2230] uppercase font-mono font-semibold">
                      {skill.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center gap-2 py-4">
              {filteredFeaturedSkills.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeCardIndex
                      ? 'w-6 bg-[#C04252]'
                      : 'w-2 bg-[#D8BDAA]/25 hover:bg-[#D8BDAA]/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Categorized Skill Pill Badges Matching Stitch Screen */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 pt-8 border-t border-[#D8BDAA]/10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {skillGroups.map((group) => (
              <div
                key={group.group}
                className="flex items-center gap-2 p-2 rounded-lg border border-[#D8BDAA]/12 bg-[#140F10] hover:border-[#D8BDAA]/30 transition-colors"
              >
                <span className="text-[9px] font-mono text-[#8C2230] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A1214]">
                  {group.group}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] tracking-wider text-[#D8BDAA]/80 font-medium px-2 py-0.5 rounded bg-[#100D0D] border border-[#D8BDAA]/8"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Footer Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="pt-8 text-center mt-6"
          >
            <span className="text-[10px] tracking-[0.25em] text-[#D8BDAA]/50 uppercase font-mono">
              ✦ CONTINUOUS LEARNING · ADAPTIVE PROBLEM SOLVER ✦
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
