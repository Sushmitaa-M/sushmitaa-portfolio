import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#100D0D] z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#721C24] via-[#D8BDAA] to-[#8C2230] transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
