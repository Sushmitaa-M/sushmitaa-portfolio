import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Copy, Check, Send, Sparkles, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ContactModal({ isOpen, onClose }) {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Collaborator'}`);
    const body = encodeURIComponent(`Sender: ${name} (${senderEmail})\n\n${message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
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
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#211316] border border-[#392A29] rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#392A29] bg-[#1a1012]">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-sm tracking-[0.25em] text-[#DFC1AC] uppercase font-medium">
                SEND A MESSAGE
              </span>
              <span className="text-[#9E354C]">✦</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-[#392A29] text-[#DFC1AC] hover:text-white hover:border-[#9E354C] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Email & GitHub Links */}
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl border border-[#392A29] bg-[#151011] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[#DFC1AC] min-w-0">
                  <Mail size={16} className="text-[#9E354C] shrink-0" />
                  <span className="font-mono text-xs truncate">{personal.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] tracking-wider uppercase border border-[#392A29] bg-[#211316] hover:border-[#9E354C] text-[#DFC1AC] transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={personal.githubUrl || "https://github.com/Sushmitaa-M"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-[#392A29] bg-[#151011] hover:border-[#9E354C] flex items-center justify-between gap-2 text-xs text-[#DFC1AC] hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#9E354C] font-semibold">GITHUB:</span>
                  <span>{personal.github || "github.com/Sushmitaa-M"}</span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-medium text-[#9E354C]">Visit ↗</span>
              </a>
            </div>

            {/* Message Form */}
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#151011] border border-[#392A29] text-[#F3E7DC] placeholder-[#B49A8C]/40 text-xs focus:outline-none focus:border-[#9E354C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. client@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#151011] border border-[#392A29] text-[#F3E7DC] placeholder-[#B49A8C]/40 text-xs focus:outline-none focus:border-[#9E354C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#B49A8C] uppercase font-mono font-medium mb-1">
                  Message / Project Scope
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let's create something together..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#151011] border border-[#392A29] text-[#F3E7DC] placeholder-[#B49A8C]/40 text-xs focus:outline-none focus:border-[#9E354C] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full border border-[#9E354C]/60 bg-[#35171F] hover:bg-[#9E354C] text-[#F3E7DC] text-xs tracking-[0.2em] uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{sentNotice ? 'Opening Email Client...' : 'Dispatch Email'}</span>
                <Send size={13} />
              </button>
            </form>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}