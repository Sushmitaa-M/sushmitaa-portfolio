import React, { useState } from 'react';
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

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#100D0D] text-[#D8BDAA] selection:bg-[#721C24] selection:text-[#F3E8DF] relative">
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
