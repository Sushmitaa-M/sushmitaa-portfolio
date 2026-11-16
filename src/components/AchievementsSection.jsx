import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AchievementsSection() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="py-20 sm:py-28 px-6 sm:px-10 bg-[#100D0D] border-t border-[#D8BDAA]/15 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-[#D8BDAA]/15 mb-10">
          <div className="flex items-center gap-2">
            <h2 className="font-editorial text-sm sm:text-base tracking-[0.25em] text-[#D8BDAA] uppercase font-medium">
              EDUCATION & CERTIFICATIONS
            </h2>
            <span className="text-[#8C2230] text-sm">✦</span>
          </div>

          <span className="text-xs tracking-[0.2em] text-[#D8BDAA]/60 uppercase font-light hidden sm:inline">
            ACADEMIC FOUNDATION
          </span>
        </div>

        {/* Two-Column Grid: Education (Left) & Certifications / Honors (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
          
          {/* LEFT: Education Journey (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-semibold pb-2">
              <GraduationCap size={16} className="text-[#E05368]" />
              <span>ACADEMIC BACKGROUND</span>
            </div>

            <div className="space-y-5">
              {education.map((item, idx) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="p-6 rounded-lg border border-[#D8BDAA]/15 bg-[#161212] hover:border-[#D8BDAA]/35 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-[#D8BDAA]/10">
                    <h3 className="font-editorial text-lg text-[#F3E8DF] uppercase tracking-wide group-hover:text-white transition-colors">
                      {item.institution}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs tracking-wider text-[#D8BDAA]/60 font-mono">
                        {item.period}
                      </span>
                      <span className="text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-[#8C2230]/40 bg-[#721C24]/20 text-[#F3E8DF] uppercase font-medium">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <p className="text-sm font-medium text-[#D8BDAA] flex items-center justify-between">
                      <span>{item.degree}</span>
                      <span className="text-[#C04252] font-semibold tracking-wide text-xs sm:text-sm">
                        {item.score}
                      </span>
                    </p>
                    <p className="text-xs text-[#D8BDAA]/70 mt-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: NPTEL Certifications & Technical Highlights (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-semibold pb-2">
              <Award size={16} className="text-[#E05368]" />
              <span>CERTIFICATIONS & FOCUS</span>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="p-5 rounded-lg border border-[#D8BDAA]/15 bg-[#171313] hover:border-[#D8BDAA]/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] tracking-[0.2em] px-2 py-0.5 rounded bg-[#100D0D] border border-[#D8BDAA]/10 text-[#8C2230] font-semibold uppercase">
                        {cert.issuer}
                      </span>
                      <h4 className="font-editorial text-base text-[#F3E8DF] uppercase tracking-wide mt-2">
                        {cert.title}
                      </h4>
                    </div>
                    <CheckCircle size={16} className="text-[#8C2230] shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-[#D8BDAA]/70 font-light mt-2 leading-relaxed">
                    {cert.highlight}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#D8BDAA]/5">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-wider px-2 py-0.5 rounded bg-[#120E0E] text-[#D8BDAA]/60 uppercase font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Summary Pill Banner */}
            <div className="p-4 rounded-lg border border-[#8C2230]/30 bg-gradient-to-r from-[#200B0E] to-[#140D0E] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#F3E8DF] font-medium block">
                  Academic Performance
                </span>
                <span className="text-[11px] text-[#D8BDAA]/70 font-light">
                  Current CGPA: 8.20 (2023 – 2027) · B.E. Computer Science Engineering
                </span>
              </div>
              <Sparkles size={18} className="text-[#E05368]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
