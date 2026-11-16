import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ExternalLink, Code2, Layers, AlertCircle, Lightbulb, UserCheck, ArrowUpRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onContact }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#141010] border border-[#D8BDAA]/25 rounded-xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8BDAA]/15 bg-[#171313]">
            <div className="flex items-center gap-3">
              <span className="font-serif-display text-sm text-[#8C2230] font-semibold tracking-wider">
                PROJECT {project.number}
              </span>
              <span className="text-xs text-[#D8BDAA]/50">|</span>
              <span className="text-[10px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-medium">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-[#D8BDAA]/20 text-[#D8BDAA]/70 hover:text-white hover:border-[#D8BDAA] transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Title & Subtitle */}
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#F3E8DF] uppercase tracking-wide">
                {project.title}
              </h2>
              <p className="font-cormorant text-base sm:text-lg text-[#D8BDAA]/80 italic mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Complete Project Description */}
            <div className="p-5 rounded-lg border border-[#D8BDAA]/15 bg-gradient-to-r from-[#1B1415] to-[#120E0E] relative overflow-hidden">
              <span className="text-[9px] tracking-[0.25em] text-[#8C2230] uppercase font-semibold block mb-2">
                PROJECT OVERVIEW
              </span>
              <p className="text-xs sm:text-sm text-[#D8BDAA]/90 leading-relaxed font-light">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Problem Statement & Proposed Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problemStatement && (
                <div className="p-4 rounded-lg border border-[#D8BDAA]/10 bg-[#161112]">
                  <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.18em] text-[#E05368] uppercase font-medium">
                    <AlertCircle size={14} />
                    <span>Problem Statement</span>
                  </div>
                  <p className="text-xs text-[#D8BDAA]/75 font-light leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.proposedSolution && (
                <div className="p-4 rounded-lg border border-[#D8BDAA]/10 bg-[#161112]">
                  <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.18em] text-[#D8BDAA] uppercase font-medium">
                    <Lightbulb size={14} className="text-[#E5B869]" />
                    <span>Proposed Solution</span>
                  </div>
                  <p className="text-xs text-[#D8BDAA]/75 font-light leading-relaxed">
                    {project.proposedSolution}
                  </p>
                </div>
              )}
            </div>

            {/* My Contribution */}
            {project.contribution && (
              <div className="p-4 rounded-lg border border-[#D8BDAA]/10 bg-[#171213]">
                <div className="flex items-center gap-2 mb-1.5 text-xs tracking-[0.18em] text-[#8C2230] uppercase font-medium">
                  <UserCheck size={14} />
                  <span>My Contribution</span>
                </div>
                <p className="text-xs text-[#D8BDAA]/80 font-light leading-relaxed">
                  {project.contribution}
                </p>
              </div>
            )}

            {/* Highlights List */}
            <div className="space-y-3">
              <h3 className="text-xs tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-medium flex items-center gap-2">
                <Sparkles size={14} className="text-[#8C2230]" />
                Key Features &amp; Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded border border-[#D8BDAA]/10 bg-[#161212]"
                  >
                    <CheckCircle2 size={15} className="text-[#8C2230] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#D8BDAA]/80 font-light leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-medium flex items-center gap-2">
                <Code2 size={14} className="text-[#8C2230]" />
                Core Technologies &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded text-xs tracking-wider border border-[#D8BDAA]/20 bg-[#171313] text-[#F3E8DF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#D8BDAA]/15 bg-[#171313]">
            <span className="text-[10px] tracking-wider text-[#D8BDAA]/60 font-mono">
              Designed &amp; Developed by Sushmitaa Mahesh
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* External Links only shown if configured */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[#D8BDAA]/30 text-xs tracking-wider uppercase text-[#D8BDAA] hover:text-white hover:border-[#D8BDAA] transition-colors flex items-center gap-1.5"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[#D8BDAA]/30 text-xs tracking-wider uppercase text-[#D8BDAA] hover:text-white hover:border-[#D8BDAA] transition-colors flex items-center gap-1.5"
                >
                  <span>Repository</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <button
                onClick={() => {
                  onClose();
                  onContact();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#D8BDAA]/30 bg-[#721C24]/30 hover:bg-[#721C24]/60 text-xs tracking-[0.18em] text-[#F3E8DF] uppercase font-medium transition-all"
              >
                Inquire About Project ✦
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
