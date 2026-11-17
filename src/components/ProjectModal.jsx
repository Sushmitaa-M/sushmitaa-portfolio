import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ExternalLink, Code2, AlertCircle, Lightbulb, UserCheck, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onContact }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Support keyboard scrolling inside modal
      const el = contentRef.current;
      if (!el) return;
      if (e.key === 'ArrowDown') {
        el.scrollTop += 60;
      } else if (e.key === 'ArrowUp') {
        el.scrollTop -= 60;
      } else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        el.scrollTop += el.clientHeight * 0.8;
        e.preventDefault();
      } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        el.scrollTop -= el.clientHeight * 0.8;
        e.preventDefault();
      }
    };

    if (project) {
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Focus the modal content for immediate keyboard accessibility
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.focus?.();
        }
      });
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Robust wheel and touch handling to guarantee independent scrolling
  // and prevent Lenis or page smooth-scroll from capturing/preventing events
  useEffect(() => {
    if (!project) return;
    const el = contentRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Stop event from bubbling to window / Lenis
      e.stopPropagation();

      const { deltaY } = e;
      const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
      const canScrollUp = el.scrollTop > 0;

      // Scroll container directly and prevent page scroll chaining
      if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
        el.scrollTop += deltaY;
        e.preventDefault();
      } else if (deltaY !== 0) {
        // At edges, still prevent page bounce/chaining
        e.preventDefault();
      }
    };

    const onTouchMove = (e) => {
      e.stopPropagation();
    };

    // Attach active wheel listener on scroll container
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window: Strict flex column container with fixed max-height */}
        <motion.div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#1a1214] border border-[#392A29] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col h-[88vh] sm:h-[84vh] max-h-[820px]"
        >
          {/* 1. Header Bar: Fixed at top */}
          <div className="shrink-0 flex items-center justify-between px-6 py-4 sm:py-5 border-b border-[#392A29] bg-[#211316] z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm text-[#9E354C] font-semibold tracking-wider">
                PROJECT {project.number}
              </span>
              <span className="text-xs text-[#392A29]">|</span>
              <span className="text-[10px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono font-medium">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-[#392A29] text-[#DFC1AC] hover:text-white hover:border-[#9E354C] hover:bg-[#35171F]/40 transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* 2. Middle Content Area: Strictly scrollable with flex: 1, min-height: 0, overflow-y: auto, overflow-x: hidden */}
          <div 
            ref={contentRef}
            tabIndex={-1}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 sm:p-8 space-y-6 select-text focus:outline-none"
            style={{
              flex: '1 1 0%',
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'thin',
              scrollbarColor: '#9E354C #1f1316',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
          >
            {/* Title & Subtitle */}
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#F3E7DC] uppercase tracking-wide">
                {project.title}
              </h2>
              <p className="font-cormorant text-base sm:text-lg text-[#DFC1AC]/80 italic mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Complete Project Description */}
            <div className="p-5 rounded-xl border border-[#392A29] bg-[#211316] relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-30" 
                style={{
                  background: 'radial-gradient(circle at 100% 0%, rgba(158, 53, 76, 0.25) 0%, transparent 60%)'
                }}
              />
              <span className="text-[9.5px] tracking-[0.25em] text-[#9E354C] uppercase font-semibold font-mono block mb-2">
                PROJECT OVERVIEW
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#DFC1AC]/90 leading-relaxed font-light relative z-10">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Problem Statement & Proposed Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problemStatement && (
                <div className="p-4 sm:p-5 rounded-xl border border-[#392A29] bg-[#171012]">
                  <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.18em] text-[#9E354C] uppercase font-mono font-medium">
                    <AlertCircle size={14} />
                    <span>Problem Statement</span>
                  </div>
                  <p className="font-sans text-xs text-[#B49A8C] font-light leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.proposedSolution && (
                <div className="p-4 sm:p-5 rounded-xl border border-[#392A29] bg-[#171012]">
                  <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.18em] text-[#DFC1AC] uppercase font-mono font-medium">
                    <Lightbulb size={14} className="text-[#DFC1AC]" />
                    <span>Proposed Solution</span>
                  </div>
                  <p className="font-sans text-xs text-[#B49A8C] font-light leading-relaxed">
                    {project.proposedSolution}
                  </p>
                </div>
              )}
            </div>

            {/* My Contribution */}
            {project.contribution && (
              <div className="p-4 sm:p-5 rounded-xl border border-[#392A29] bg-[#171012]">
                <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.18em] text-[#9E354C] uppercase font-mono font-medium">
                  <UserCheck size={14} />
                  <span>My Contribution</span>
                </div>
                <p className="font-sans text-xs text-[#DFC1AC]/85 font-light leading-relaxed">
                  {project.contribution}
                </p>
              </div>
            )}

            {/* Highlights List */}
            <div className="space-y-3">
              <h3 className="text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-mono font-medium flex items-center gap-2">
                <Sparkles size={14} className="text-[#9E354C]" />
                Key Features &amp; Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl border border-[#392A29] bg-[#211316]"
                  >
                    <CheckCircle2 size={15} className="text-[#9E354C] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-[#DFC1AC]/85 font-light leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used (Final section) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs tracking-[0.2em] text-[#B49A8C] uppercase font-mono font-medium flex items-center gap-2">
                <Code2 size={14} className="text-[#9E354C]" />
                Core Technologies &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs tracking-wider border border-[#392A29] bg-[#151011] text-[#F3E7DC] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Generous bottom spacer to guarantee full visibility above footer */}
            <div className="h-8 sm:h-12" />
          </div>

          {/* 3. Footer Actions: Fixed at bottom */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#392A29] bg-[#211316] z-20">
            <span className="text-[10px] tracking-wider text-[#B49A8C] font-mono">
              Designed &amp; Developed by Sushmitaa Mahesh
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[#392A29] text-xs tracking-wider uppercase text-[#DFC1AC] hover:text-white hover:border-[#9E354C] transition-colors flex items-center gap-1.5"
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
                  className="px-4 py-2 rounded-full border border-[#392A29] text-xs tracking-wider uppercase text-[#DFC1AC] hover:text-white hover:border-[#9E354C] transition-colors flex items-center gap-1.5"
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#9E354C]/60 bg-[#35171F] hover:bg-[#9E354C] text-xs tracking-[0.18em] text-[#F3E7DC] uppercase font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>INQUIRE ABOUT PROJECT</span>
                <span>✦</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}