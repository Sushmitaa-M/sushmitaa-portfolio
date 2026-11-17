import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function WhatDefinesMyWork() {
  const { whatDefinesMyWork } = portfolioData;

  return (
    <section id="philosophy" className="py-16 sm:py-24 lg:py-28 px-4 xs:px-6 sm:px-10 bg-[#100D0D] border-t border-[#392A29] relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header with Responsive Heading Size */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 sm:pb-12 border-b border-[#392A29] gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#9E354C] uppercase font-semibold">
              05 // ETHOS
            </span>
            <span className="text-[#392A29] text-base">/</span>
            <h2 className="font-editorial text-lg xs:text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.2em] text-[#DFC1AC] uppercase font-medium">
              WHAT DEFINES MY WORK
            </h2>
            <span className="text-[#9E354C] text-sm">⟶</span>
          </div>

          <span className="text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-light">
            3 CORE ENGINEERING &amp; DESIGN PILLARS
          </span>
        </motion.div>

        {/* Balanced 3-Card Editorial Grid (1-col on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 items-stretch pt-2">
          {whatDefinesMyWork.map((item, idx) => {
            const isCenterCard = idx === 1;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col justify-between p-5 xs:p-6 sm:p-8 rounded-2xl border transition-all duration-300 ease-out shadow-xl relative overflow-hidden h-full hover:-translate-y-2 active:scale-[0.99] ${
                  isCenterCard
                    ? 'bg-[#241317] border-[#9E354C]/60 hover:border-[#9E354C] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(158,53,76,0.3)]'
                    : 'bg-[#211316] border-[#392A29] hover:border-[#9E354C] hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(158,53,76,0.22)]'
                }`}
              >
                {/* Decorative Quote Watermark */}
                <div className="absolute top-2 right-4 text-6xl sm:text-7xl font-serif text-[#9E354C]/10 group-hover:text-[#9E354C]/20 transition-colors select-none pointer-events-none leading-none">
                  “
                </div>

                {/* Subtle Inner Glow on Hover */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(158, 53, 76, 0.18) 0%, transparent 70%)'
                  }}
                />

                <div className="relative z-10">
                  {/* Number & Role Badge Header */}
                  <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[#392A29] mb-4 sm:mb-5">
                    <span className="font-mono text-xs tracking-widest text-[#9E354C] group-hover:text-[#F3E7DC] font-bold transition-colors">
                      {item.number}
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono px-2.5 py-0.5 rounded-full border border-[#392A29] bg-[#151011]">
                      {item.role}
                    </span>
                  </div>

                  {/* Pillar Title */}
                  <h3 className="font-editorial text-lg xs:text-xl sm:text-2xl text-[#F3E8DF] uppercase tracking-wide group-hover:text-white transition-colors mb-2.5 sm:mb-3">
                    {item.title}
                  </h3>

                  {/* Primary Quote */}
                  <p className="font-cormorant text-base sm:text-lg text-[#DFC1AC] italic leading-relaxed mb-3 sm:mb-4">
                    "{item.quote}"
                  </p>

                  {/* Context Description */}
                  <p className="font-sans text-xs text-[#B49A8C] group-hover:text-[#DFC1AC]/90 font-light leading-relaxed transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Attribution Footer */}
                <div className="pt-4 sm:pt-5 mt-4 sm:mt-6 border-t border-[#392A29] flex items-center justify-between relative z-10">
                  <span className="text-[9px] sm:text-[9.5px] font-mono tracking-widest text-[#9E354C] uppercase font-semibold">
                    {item.author}
                  </span>
                  <span className="text-[#DFC1AC]/30 text-xs">✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}