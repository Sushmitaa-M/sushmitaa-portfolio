import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'PROCESS', href: '#process' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#100D0D]/95 backdrop-blur-md border-b border-[#392A29] py-3.5 shadow-2xl opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 flex items-center justify-between">
        {/* Left Label */}
        <a
          href="#top"
          className="group flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-[#DFC1AC]/85 hover:text-[#DFC1AC] transition-colors uppercase font-medium truncate max-w-[200px] xs:max-w-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E354C] group-hover:scale-125 transition-transform shrink-0" />
          <span className="truncate">{portfolioData.personal.role}</span>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.2em] text-[#DFC1AC]/70 hover:text-[#DFC1AC] transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DFC1AC] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Label */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#DFC1AC]/80 hover:text-[#DFC1AC] transition-colors uppercase font-medium cursor-pointer"
          >
            <span>PERSONAL PORTFOLIO</span>
            <span className="text-[#9E354C]">✦</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#DFC1AC] p-2 rounded-lg hover:bg-[#211316] transition-colors focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#151011] border-b border-[#392A29] px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs tracking-[0.25em] text-[#DFC1AC]/80 hover:text-[#DFC1AC] py-2 border-b border-[#392A29]/50 font-mono active:text-[#9E354C]"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="mt-3 text-left text-xs tracking-[0.25em] text-[#9E354C] font-semibold py-2 uppercase font-mono"
              >
                Send a Message ✦
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}