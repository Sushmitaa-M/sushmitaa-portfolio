import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

function GithubIcon({ className = '', size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ContactSection({ onOpenContact }) {
  const { personal } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 px-4 xs:px-6 sm:px-10 bg-[#100D0D] border-t border-[#392A29] relative select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Enclosed Feature Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-[#392A29] bg-[#211316] p-6 xs:p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Radial Glow */}
          <div 
            className="absolute right-0 bottom-0 w-[550px] h-[550px] pointer-events-none opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #9E354C 0%, #35171F 50%, transparent 70%)'
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT AREA: Typography & CTA (lg:col-span-7) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-2 text-[9.5px] sm:text-[10.5px] tracking-[0.2em] sm:tracking-[0.25em] text-[#9E354C] uppercase font-mono font-semibold">
                <span>HAVE AN IDEA IN MIND?</span>
                <span className="text-[#392A29]">•</span>
                <span className="text-[#DFC1AC]/80">OPEN FOR WORK</span>
              </div>

              <div>
                <h2 className="font-editorial text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F3E8DF] leading-[1.1] tracking-wide uppercase">
                  Let's Create<br />
                  Something
                </h2>
                <div className="-mt-1 sm:-mt-2">
                  <span className="font-script text-4xl xs:text-5xl sm:text-6xl lg:text-7xl text-[#9E354C] font-normal tracking-wide block select-none drop-shadow-md">
                    Amazing
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#DFC1AC]/85 leading-relaxed font-light max-w-lg">
                Let’s collaborate on bringing impactful, responsive, and thoughtfully engineered digital experiences to life. Available for full-time frontend, software engineering, and UI/UX roles.
              </p>

              <div>
                <button
                  onClick={onOpenContact}
                  className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 px-6 py-3.5 rounded-full border border-[#9E354C]/60 bg-[#35171F] hover:bg-[#9E354C] text-xs tracking-[0.22em] text-[#F3E7DC] uppercase font-semibold transition-all shadow-xl cursor-pointer active:scale-95"
                >
                  <span>SEND ME A MESSAGE</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* RIGHT AREA: 3 Interactive Rows (lg:col-span-5) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-3 sm:space-y-3.5"
            >
              
              {/* Row 1: Email */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#392A29] bg-[#151011] hover:border-[#9E354C]/60 transition-colors flex items-center justify-between gap-3 group">
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.22em] text-[#9E354C] font-mono font-semibold uppercase block">
                    OFFICIAL EMAIL
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-xs sm:text-[13px] text-[#F3E7DC] hover:text-[#9E354C] transition-colors truncate block"
                  >
                    {personal.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#211316] border border-[#392A29] text-[#DFC1AC] hover:text-white hover:border-[#9E354C] transition-all cursor-pointer shrink-0 active:scale-95"
                  title="Copy email"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Row 2: GitHub */}
              <a
                href={personal.githubUrl || "https://github.com/Sushmitaa-M"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl border border-[#392A29] bg-[#151011] hover:border-[#9E354C]/60 transition-colors flex items-center justify-between gap-3 group block"
              >
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.22em] text-[#9E354C] font-mono font-semibold uppercase block">
                    GITHUB PROFILE
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] text-[#F3E7DC] group-hover:text-[#9E354C] transition-colors truncate block">
                    {personal.github}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#211316] border border-[#392A29] text-[#DFC1AC] group-hover:text-white transition-colors shrink-0">
                  <ExternalLink size={14} />
                </div>
              </a>

              {/* Row 3: Current Residence */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#392A29] bg-[#151011] flex items-center justify-between gap-3">
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.22em] text-[#9E354C] font-mono font-semibold uppercase block">
                    CURRENT RESIDENCE
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] text-[#F3E7DC] truncate block">
                    {personal.location}
                  </span>
                </div>
                <span className="text-[8px] sm:text-[8.5px] tracking-wider px-2 py-1 rounded-full border border-[#9E354C]/40 bg-[#35171F]/50 text-[#DFC1AC] uppercase font-mono font-medium shrink-0">
                  OPEN TO RELOCATE
                </span>
              </div>

            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}