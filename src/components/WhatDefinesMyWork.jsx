import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function WhatDefinesMyWork() {
  const { whatDefinesMyWork } = portfolioData;

  return (
    <section id="philosophy" className="py-20 sm:py-28 px-6 sm:px-10 bg-[#100D0D] border-t border-[#D8BDAA]/15 relative select-none">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-[#D8BDAA]/15 gap-3 mb-10">
          <div className="flex items-center gap-2">
            <h2 className="font-editorial text-sm sm:text-base tracking-[0.25em] text-[#D8BDAA] uppercase font-medium">
              WHAT DEFINES MY WORK
            </h2>
            <span className="text-[#8C2230] text-sm">⟶</span>
          </div>

          <span className="text-xs tracking-[0.2em] text-[#D8BDAA]/60 uppercase font-light">
            CORE PHILOSOPHY
          </span>
        </div>

        {/* 3-Column Layout Matching Stitch Screen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {whatDefinesMyWork.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-[#D8BDAA]/15 bg-[#141010] hover:bg-[#181213] relative group hover:border-[#D8BDAA]/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Number Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D8BDAA]/10 mb-4">
                  <span className="font-mono text-xs tracking-widest text-[#8C2230] font-bold">
                    {item.number}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-[#D8BDAA]/60 uppercase font-mono">
                    {item.role}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3 className="font-editorial text-lg sm:text-xl text-[#F3E8DF] uppercase tracking-wide group-hover:text-white transition-colors mb-3">
                  {item.title}
                </h3>

                {/* Primary Quote */}
                <p className="font-cormorant text-base sm:text-lg text-[#D8BDAA] italic leading-relaxed mb-4">
                  "{item.quote}"
                </p>

                {/* Context Description */}
                <p className="font-sans text-xs text-[#D8BDAA]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Attribution Footer */}
              <div className="pt-5 mt-6 border-t border-[#D8BDAA]/10 flex items-center justify-between">
                <span className="text-[9.5px] font-mono tracking-widest text-[#8C2230] uppercase font-semibold">
                  {item.author}
                </span>
                <span className="text-[#D8BDAA]/30 text-xs">✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
