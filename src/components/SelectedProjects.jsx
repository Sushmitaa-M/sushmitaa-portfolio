import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Visual Mockup 01: Concentric Diagnostic Radar (Beauty Recommendation System)
function MockupRadar() {
  return (
    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#D8BDAA]/15 bg-[#140E0F] flex items-center justify-center mb-5 group-hover:border-[#D8BDAA]/35 transition-colors">
      <div className="absolute inset-0 bg-radial from-[#721C24]/30 via-transparent to-transparent pointer-events-none" />
      <svg viewBox="0 0 160 160" className="w-28 h-28 opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out">
        <circle cx="80" cy="80" r="62" fill="none" stroke="#D8BDAA" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="80" cy="80" r="46" fill="none" stroke="#8C2230" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="80" cy="80" r="32" fill="none" stroke="#D8BDAA" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="80" cy="80" r="18" fill="#431016" stroke="#C04252" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="5" fill="#F3E8DF" />
        <line x1="80" y1="12" x2="80" y2="148" stroke="#D8BDAA" strokeOpacity="0.1" />
        <line x1="12" y1="80" x2="148" y2="80" stroke="#D8BDAA" strokeOpacity="0.1" />
      </svg>
      <span className="absolute bottom-2 text-[9px] tracking-[0.25em] text-[#D8BDAA]/40 uppercase font-mono">
        CLIMATE ADAPTIVE SCANNER
      </span>
    </div>
  );
}

// Visual Mockup 02: Sentiment Analytics Data Chart (Smart Feedback & Poll)
function MockupBarChart() {
  const bars = [40, 75, 55, 90, 65, 80, 45, 95, 70, 85];
  return (
    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#D8BDAA]/15 bg-[#140E0F] flex flex-col justify-end p-5 mb-5 group-hover:border-[#D8BDAA]/35 transition-colors">
      <div className="absolute inset-0 bg-radial from-[#8C2230]/25 via-transparent to-transparent pointer-events-none" />
      <div className="flex items-end justify-between gap-2 h-20 w-full relative z-10">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-[#431016] via-[#8C2230] to-[#E05368] opacity-80 group-hover:opacity-100 transition-all duration-500"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="w-full h-[1px] bg-[#D8BDAA]/20 mt-1 relative z-10" />
      <span className="text-[9px] tracking-[0.22em] text-[#D8BDAA]/40 uppercase font-mono mt-2 text-center">
        SENTIMENT POLARITY PULSE
      </span>
    </div>
  );
}

// Visual Mockup 03: Haute Couture Typography (Editorial Portfolio)
function MockupEditorial() {
  return (
    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#D8BDAA]/15 bg-[#140E0F] flex flex-col items-center justify-center p-4 mb-5 group-hover:border-[#D8BDAA]/35 transition-colors">
      <div className="absolute inset-0 bg-radial from-[#5C1520]/30 via-transparent to-transparent pointer-events-none" />
      <span className="text-[9px] tracking-[0.3em] text-[#D8BDAA]/50 uppercase font-mono mb-1">
        HAUTE COUTURE
      </span>
      <span className="font-editorial text-2xl sm:text-3xl text-[#F3E8DF] uppercase tracking-wider group-hover:scale-105 transition-transform duration-500">
        EDITORIAL
      </span>
      <div className="w-12 h-[1px] bg-[#C04252] my-2" />
      <span className="text-[8.5px] tracking-[0.2em] text-[#D8BDAA]/60 uppercase">
        ONLINE ARCHIVE 2026
      </span>
    </div>
  );
}

export default function SelectedProjects({ onSelectProject }) {
  const { projects } = portfolioData;

  const renderMockup = (id) => {
    switch (id) {
      case "01":
        return <MockupRadar />;
      case "02":
        return <MockupBarChart />;
      case "03":
      default:
        return <MockupEditorial />;
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 px-6 sm:px-10 bg-[#100D0D] border-t border-[#D8BDAA]/15 relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-[#D8BDAA]/15 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-editorial text-sm sm:text-base tracking-[0.25em] text-[#D8BDAA] uppercase font-medium">
              SELECTED PROJECTS
            </h2>
            <span className="text-[#8C2230] text-sm">✦</span>
          </div>

          <a
            href="#projects"
            className="group flex items-center gap-2 text-xs tracking-[0.2em] text-[#D8BDAA]/80 hover:text-[#D8BDAA] uppercase transition-colors"
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="group-hover:translate-x-1 transition-transform">⟶</span>
          </a>
        </div>

        {/* 3-Column Editorial Grid matching Stitch Screen */}
        <div className="pt-10 sm:pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-xl overflow-hidden border border-[#D8BDAA]/15 hover:border-[#D8BDAA]/60 bg-[#141010] cursor-pointer flex flex-col justify-between p-6 sm:p-7 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(140,34,48,0.25)] hover:z-30 transition-all duration-300"
            >
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-radial from-[#721C24]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Area: Number & Category Badge */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D8BDAA]/10 mb-4">
                  <span className="font-mono text-sm tracking-widest text-[#8C2230] font-semibold">
                    {project.number}
                  </span>
                  <span className="text-[9.5px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase px-2.5 py-0.5 rounded-full border border-[#D8BDAA]/15 bg-[#171213] font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Graphic Visual Mockup Frame */}
                {renderMockup(project.id)}

                {/* Title & Subtitle */}
                <h3 className="font-editorial text-xl sm:text-2xl text-[#F3E8DF] uppercase tracking-wide leading-tight group-hover:text-white transition-colors mb-1.5">
                  {project.title}
                </h3>
                <p className="text-[10.5px] tracking-wider text-[#A45B68] uppercase font-medium mb-3">
                  {project.subtitle}
                </p>

                {/* Complete Project Description */}
                <p className="font-sans text-xs text-[#D8BDAA]/80 leading-relaxed font-light mb-5">
                  {project.description}
                </p>
              </div>

              {/* Bottom Area: Tags & Action */}
              <div className="pt-4 border-t border-[#D8BDAA]/10 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-wider px-2 py-0.5 rounded bg-[#181213] border border-[#D8BDAA]/12 text-[#D8BDAA]/70 uppercase font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Explore Project Link */}
                <div className="flex items-center gap-2 pt-1 text-xs tracking-[0.2em] text-[#F3E8DF] uppercase font-medium group-hover:text-white transition-colors">
                  <span>Explore Project</span>
                  <div className="w-5 h-5 rounded-full border border-[#D8BDAA]/30 flex items-center justify-center group-hover:translate-x-1 group-hover:border-[#D8BDAA] transition-all">
                    <ArrowRight size={10} className="text-[#A45B68]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
