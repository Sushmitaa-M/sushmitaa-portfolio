import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SelectedProjects from './components/SelectedProjects';
import ProcessAndSkills from './components/ProcessAndSkills';
import AchievementsSection from './components/AchievementsSection';
import WhatDefinesMyWork from './components/WhatDefinesMyWork';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ContactModal from './components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Pause scroll while loader is displaying
    if (isLoading) {
      lenis.stop();
    }

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation handler
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      if (targetId === '#top') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
        return;
      }
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        lenis.scrollTo(targetElem, { offset: -40, duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock background smooth scroll when loading screen or modal dialogs are open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLoading || selectedProject || isContactOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLoading, selectedProject, isContactOpen]);

  return (
    <div className="min-h-screen bg-[#100D0D] text-[#D8BDAA] selection:bg-[#721C24] selection:text-[#F3E8DF] relative">
      {/* Animated Kinetic Text Loading Screen */}
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Editorial Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="relative">
        {/* Section 1: Hero / Landing Section */}
        <HeroSection onOpenContact={() => setIsContactOpen(true)} />

        {/* Section 2: Selected Projects */}
        <SelectedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 3: My Process & Technical Skills */}
        <ProcessAndSkills />

        {/* Section 4: Achievements / Experience / Highlights */}
        <AchievementsSection />

        {/* Section 5: What Defines My Work (Quality Pillars) */}
        <WhatDefinesMyWork />

        {/* Section 6: Contact / Let's Connect */}
        <ContactSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Section 7: Footer */}
      <Footer />

      {/* Interactive Project Case Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContact={() => setIsContactOpen(true)}
      />

      {/* Interactive Contact & Message Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
