import React from 'react';

export function BotanicalPetalLeft({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute -left-12 top-1/3 -translate-y-1/2 w-48 h-80 sm:w-64 sm:h-96 opacity-35 mix-blend-screen blur-[1px] select-none ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 300" className="w-full h-full fill-none">
        <defs>
          <radialGradient id="burgundyPetal1" cx="30%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#A82E40" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#5A151E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#100D0D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M 10,20 C 80,40 180,120 160,220 C 140,290 60,280 20,250 C -10,220 5,80 10,20 Z"
          fill="url(#burgundyPetal1)"
        />
        <path
          d="M 30,60 C 110,90 140,180 110,240 C 90,270 40,240 20,200 Z"
          fill="#4A1017"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export function BotanicalPetalRight({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute -right-12 bottom-12 w-52 h-80 sm:w-72 sm:h-96 opacity-40 mix-blend-screen blur-[1px] select-none ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 320" className="w-full h-full fill-none">
        <defs>
          <radialGradient id="burgundyPetal2" cx="70%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#C0384C" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#641622" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#100D0D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M 190,30 C 120,60 30,140 40,240 C 50,300 130,290 180,260 C 210,220 200,90 190,30 Z"
          fill="url(#burgundyPetal2)"
        />
      </svg>
    </div>
  );
}

export function BotanicalFlowerCenter({ className = '' }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Decorative Arch */}
      <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-t-full border border-[#D8BDAA]/20 bg-gradient-to-b from-[#1C1617] to-[#120F0F] p-4 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
        {/* Ambient burgundy glow */}
        <div className="absolute inset-0 bg-radial from-[#721C24]/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Artistic Dark Crimson Botanical Illustration */}
        <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 mb-3 relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <defs>
            <radialGradient id="roseCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E05368" />
              <stop offset="40%" stopColor="#8A1E2B" />
              <stop offset="80%" stopColor="#3D0B12" />
              <stop offset="100%" stopColor="#100D0D" />
            </radialGradient>
            <linearGradient id="rosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9C2434" />
              <stop offset="100%" stopColor="#2E080D" />
            </linearGradient>
          </defs>
          
          {/* Layered floral petals */}
          <circle cx="80" cy="80" r="60" fill="url(#rosePetalGrad)" opacity="0.6" />
          <path d="M 80,25 C 105,25 125,45 125,70 C 125,95 105,115 80,115 C 55,115 35,95 35,70 C 35,45 55,25 80,25 Z" fill="#5E141D" opacity="0.8" />
          <path d="M 70,40 C 95,35 120,55 115,85 C 110,115 85,125 65,110 C 45,95 45,65 70,40 Z" fill="url(#roseCore)" opacity="0.9" />
          <path d="M 85,55 C 95,50 108,60 105,75 C 102,90 88,95 78,88 C 68,80 72,62 85,55 Z" fill="#BF2D41" />
          <circle cx="82" cy="74" r="7" fill="#200508" />
          <circle cx="83" cy="73" r="2.5" fill="#F3E8DF" opacity="0.8" />
        </svg>

        <p className="font-editorial text-xs sm:text-sm tracking-wide text-center text-[#D8BDAA]/90 max-w-[150px] leading-tight z-10 italic">
          A thoughtful process for meaningful results.
        </p>
      </div>
    </div>
  );
}
