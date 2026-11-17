import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AchievementsSection() {
  const { education, certifications } = portfolioData;

  const bDegree = education[0];
  const schoolings = education.slice(1);

  return (
    <section id="education" className="py-16 sm:py-24 lg:py-28 px-4 xs:px-6 sm:px-10 bg-[#100D0D] border-t border-[#392A29] relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header with Responsive Heading Size */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 sm:pb-12 border-b border-[#392A29] gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#9E354C] uppercase font-semibold">
              04 // CREDENTIALS
            </span>
            <span className="text-[#392A29] text-base">/</span>
            <h2 className="font-editorial text-lg xs:text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.2em] text-[#DFC1AC] uppercase font-medium">
              EDUCATION &amp; CERTIFICATIONS
            </h2>
            <span className="text-[#9E354C] text-sm">✦</span>
          </div>

          <span className="text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-light hidden sm:inline">
            ACADEMIC FOUNDATION &amp; VERIFIED SKILLS
          </span>
        </motion.div>

        {/* Asymmetrical Two-Column Grid (1-col on mobile, 12-col on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ======================================================== */}
          {/* LEFT: EDUCATION JOURNEY (7 Cols)                         */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-semibold pb-1"
            >
              <GraduationCap size={16} className="text-[#9E354C]" />
              <span>ACADEMIC BACKGROUND</span>
            </motion.div>

            {/* 1. Flagship Engineering Degree Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-5 xs:p-6 sm:p-8 rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C] hover:-translate-y-1 shadow-xl relative overflow-hidden transition-all duration-300"
            >
              <div 
                className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-[80px] group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle, #9E354C 0%, #35171F 60%, transparent 80%)'
                }}
              />

              <div className="relative z-10">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 sm:pb-4 border-b border-[#392A29] mb-4 sm:mb-5">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.22em] px-2.5 sm:px-3 py-1 rounded-full border border-[#9E354C]/50 bg-[#35171F]/60 text-[#F3E7DC] font-semibold uppercase w-fit">
                    CURRENT DEGREE · {bDegree.period}
                  </span>
                  
                  {/* Highlight CGPA Pill */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#DFC1AC]/30 bg-[#151011] w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E354C]" />
                    <span className="font-mono text-xs font-bold text-[#DFC1AC]">
                      {bDegree.score}
                    </span>
                  </div>
                </div>

                {/* Institution & Degree */}
                <h3 className="font-editorial text-lg xs:text-xl sm:text-2xl text-[#F3E7DC] uppercase tracking-wide leading-tight mb-1.5 sm:mb-2 group-hover:text-white transition-colors">
                  {bDegree.institution}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#DFC1AC] mb-3 sm:mb-4">
                  {bDegree.degree}
                </p>

                <p className="font-sans text-xs sm:text-[13px] text-[#B49A8C] leading-relaxed font-light mb-4 sm:mb-6">
                  {bDegree.description}
                </p>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-[#392A29]/70">
                  {['Computer Science', 'Machine Learning Foundations', 'Web Engineering', 'Data Structures'].map((t) => (
                    <span
                      key={t}
                      className="text-[9px] sm:text-[9.5px] font-mono tracking-wider px-2 sm:px-2.5 py-1 rounded-md bg-[#151011] border border-[#392A29] text-[#DFC1AC]/80 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 2. Secondary Schooling Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
              {schoolings.map((item, idx) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-4 xs:p-5 rounded-xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C]/60 hover:-translate-y-1 flex flex-col justify-between shadow-md relative transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-[#392A29] mb-3">
                      <span className="text-[9px] sm:text-[9.5px] font-mono tracking-wider text-[#B49A8C]">
                        {item.period}
                      </span>
                      <span className="text-[8.5px] sm:text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-[#392A29] bg-[#151011] text-[#DFC1AC]/80 uppercase">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-editorial text-sm xs:text-base text-[#F3E7DC] uppercase tracking-wide mb-1 group-hover:text-white transition-colors">
                      {item.institution}
                    </h4>
                    <p className="text-xs text-[#DFC1AC] font-medium mb-1.5 sm:mb-2">
                      {item.degree}
                    </p>
                    <p className="text-[11px] text-[#B49A8C] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#392A29]/60 mt-3 sm:mt-4 flex items-center justify-between">
                    <span className="text-[9px] sm:text-[9.5px] font-mono text-[#9E354C] uppercase font-semibold">
                      {item.score}
                    </span>
                    <CheckCircle size={13} className="text-[#9E354C]" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT: CERTIFICATIONS & HONORS (5 Cols)                  */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-4 pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-semibold pb-1"
            >
              <Award size={16} className="text-[#9E354C]" />
              <span>NPTEL &amp; TECHNICAL CERTIFICATIONS</span>
            </motion.div>

            {/* Staggered Certification Bento Cards */}
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-4 xs:p-5 sm:p-6 rounded-2xl border border-[#392A29] bg-[#211316] hover:border-[#9E354C] hover:-translate-y-1 shadow-lg relative overflow-hidden transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.18em] sm:tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#151011] border border-[#392A29] text-[#9E354C] font-semibold uppercase">
                      {cert.issuer}
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] font-mono text-[#B49A8C] uppercase">
                      VERIFIED
                    </span>
                  </div>
                  <CheckCircle size={15} className="text-[#9E354C] shrink-0" />
                </div>

                <h4 className="font-editorial text-sm xs:text-base sm:text-lg text-[#F3E7DC] uppercase tracking-wide mb-1.5 sm:mb-2 leading-snug group-hover:text-white transition-colors">
                  {cert.title}
                </h4>

                <p className="text-xs text-[#DFC1AC]/80 font-light leading-relaxed mb-3 sm:mb-4">
                  {cert.highlight}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2.5 sm:pt-3 border-t border-[#392A29]/60">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8.5px] sm:text-[9px] tracking-wider px-2 py-0.5 rounded bg-[#151011] border border-[#392A29] text-[#B49A8C] uppercase font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Academic Summary Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-5 rounded-2xl border border-[#392A29] bg-gradient-to-r from-[#211316] via-[#261418] to-[#211316] flex items-center justify-between shadow-lg hover:border-[#9E354C]/50 transition-all"
            >
              <div>
                <span className="text-xs text-[#F3E7DC] font-medium block">
                  Academic Performance Metric
                </span>
                <span className="text-[11px] text-[#B49A8C] font-light">
                  CGPA: 8.20 · B.E. Computer Science (2023 – 2027)
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-[#9E354C]/50 bg-[#35171F]/60 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-[#DFC1AC]" />
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}