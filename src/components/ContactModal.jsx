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
      document.body.style.overflow = 'unset';
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#141010] border border-[#D8BDAA]/25 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8BDAA]/15 bg-[#171313]">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-sm tracking-[0.25em] text-[#D8BDAA] uppercase font-medium">
                SEND A MESSAGE
              </span>
              <span className="text-[#8C2230]">✦</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-[#D8BDAA]/20 text-[#D8BDAA]/70 hover:text-white hover:border-[#D8BDAA] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Email & GitHub Links */}
            <div className="space-y-2">
              <div className="p-3.5 rounded-lg border border-[#D8BDAA]/15 bg-[#171313] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[#D8BDAA] min-w-0">
                  <Mail size={16} className="text-[#8C2230] shrink-0" />
                  <span className="font-mono text-xs truncate">{personal.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] tracking-wider uppercase border border-[#D8BDAA]/25 bg-[#120E0E] hover:border-[#D8BDAA] text-[#D8BDAA] transition-colors shrink-0"
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
                className="p-3 rounded-lg border border-[#D8BDAA]/12 bg-[#171313] hover:border-[#D8BDAA]/30 flex items-center justify-between gap-2 text-xs text-[#D8BDAA]/80 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#8C2230] font-semibold">GITHUB:</span>
                  <span>{personal.github || "github.com/Sushmitaa-M"}</span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-medium text-[#C04252]">Visit ↗</span>
              </a>
            </div>

            {/* Message Form */}
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3.5 py-2.5 rounded bg-[#1A1414] border border-[#D8BDAA]/20 text-[#F3E8DF] placeholder-[#D8BDAA]/30 text-xs focus:outline-none focus:border-[#D8BDAA] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. client@organization.com"
                  className="w-full px-3.5 py-2.5 rounded bg-[#1A1414] border border-[#D8BDAA]/20 text-[#F3E8DF] placeholder-[#D8BDAA]/30 text-xs focus:outline-none focus:border-[#D8BDAA] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#D8BDAA]/70 uppercase font-medium mb-1">
                  Message / Project Scope
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let's create something together..."
                  className="w-full px-3.5 py-2.5 rounded bg-[#1A1414] border border-[#D8BDAA]/20 text-[#F3E8DF] placeholder-[#D8BDAA]/30 text-xs focus:outline-none focus:border-[#D8BDAA] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full border border-[#D8BDAA]/30 bg-[#721C24] hover:bg-[#8C2230] text-[#F3E8DF] text-xs tracking-[0.2em] uppercase font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
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
