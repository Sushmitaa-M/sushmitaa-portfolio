import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Isolated Hero Particle Formation Animation
 * 
 * Animation Concept:
 *  - 0–1s: Hundreds of tiny champagne-beige particles appear scattered across the dark hero background.
 *  - 1–3.5s: Particles smoothly converge from all directions into the exact Didone serif letterforms of "PORTFOLIO".
 *  - 3.5–4.5s: Crisp SVG typography fades in as particles settle into their final positions.
 *  - >4.5s: Animation loop stops (zero CPU/GPU overhead), heading remains permanently stable and clear.
 * 
 * Fully isolated: Does not affect portrait, text blocks, navigation, or any other hero elements.
 * Respects prefers-reduced-motion with an instant static fallback.
 */
export default function HeroParticleHeading() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [svgOpacity, setSvgOpacity] = useState(0);

  useEffect(() => {
    // 1. Accessibility Check: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSvgOpacity(1);
      setIsCompleted(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId = null;
    let isCancelled = false;

    // Reference canvas resolution matching SVG viewBox (1440 x 240)
    const REF_WIDTH = 1440;
    const REF_HEIGHT = 240;

    // Canvas padding to allow particles to scatter wide across the hero background
    const PAD_X = 60;
    const PAD_Y = 90;

    // Helper: Sample target points from offscreen rasterized "PORTFOLIO"
    const sampleHeadingTargets = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch (e) {
        // Fallback gracefully
      }

      if (isCancelled) return [];

      const offCanvas = document.createElement('canvas');
      offCanvas.width = REF_WIDTH;
      offCanvas.height = REF_HEIGHT;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return [];

      // Render exact typography matching SVG
      offCtx.fillStyle = '#DFC1AC';
      offCtx.font = '400 235px "Bodoni Moda", "Didot", "Bodoni 72", serif';
      if ('letterSpacing' in offCtx) {
        offCtx.letterSpacing = '0.05em';
      }

      // Exact horizontal scaling to match lengthAdjust="spacingAndGlyphs" textLength="1360"
      const measured = offCtx.measureText('PORTFOLIO').width;
      const scaleX = measured > 0 ? 1360 / measured : 0.85;

      offCtx.save();
      offCtx.scale(scaleX, 1);
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillText('PORTFOLIO', (REF_WIDTH / 2) / scaleX, 180);
      offCtx.restore();

      const imgData = offCtx.getImageData(0, 0, REF_WIDTH, REF_HEIGHT);
      const data = imgData.data;
      const points = [];

      // Sampling step (step = 4 gives ~1400 - 1800 crisp target points)
      const step = 4;
      for (let y = 0; y < REF_HEIGHT; y += step) {
        for (let x = 0; x < REF_WIDTH; x += step) {
          const alpha = data[(y * REF_WIDTH + x) * 4 + 3];
          if (alpha > 70) {
            points.push({
              normX: x / REF_WIDTH,
              normY: y / REF_HEIGHT
            });
          }
        }
      }

      // Robust fallback if font loading is delayed
      if (points.length < 250) {
        const letters = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];
        const letterW = REF_WIDTH / letters.length;
        for (let i = 0; i < letters.length; i++) {
          for (let p = 0; p < 130; p++) {
            points.push({
              normX: (i * letterW + Math.random() * letterW * 0.82) / REF_WIDTH,
              normY: 0.18 + Math.random() * 0.64
            });
          }
        }
      }

      return points;
    };

    // Initialize particle states
    const createParticles = (targets, headingW, headingH, totalW, totalH) => {
      const colors = [
        '#DFC1AC', // Champagne beige
        '#F3E8DF', // Soft highlight
        '#CFA48D', // Warm muted rose-gold
        '#EBD6C7'  // Pale pearl
      ];

      return targets.map((target, idx) => {
        // Scattered starting positions across the full expanded canvas area
        const startX = Math.random() * totalW;
        const startY = Math.random() * totalH;

        // Final target position centered inside the canvas with padding
        const targetX = PAD_X + target.normX * headingW;
        const targetY = PAD_Y + target.normY * headingH;

        // Subtle individual stagger delay (0s to 0.45s) for organic flow
        const stagger = (idx % 40) * 0.011 + Math.random() * 0.08;

        // Particle size: refined 0.95px to 2.1px
        const radius = Math.random() < 0.2 ? 1.85 : Math.random() < 0.6 ? 1.25 : 0.95;

        return {
          startX,
          startY,
          targetX,
          targetY,
          color: colors[idx % colors.length],
          radius,
          stagger,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.3 + Math.random() * 0.4
        };
      });
    };

    // Smooth cubic-bezier ease out (fast takeoff, silky deceleration)
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3.4);
    };

    const runAnimation = async () => {
      const targets = await sampleHeadingTargets();
      if (isCancelled) return;

      const rect = containerRef.current?.getBoundingClientRect() || { width: 1200, height: 200 };
      const headingW = rect.width || 1200;
      const headingH = rect.height || 200;

      const totalW = headingW + PAD_X * 2;
      const totalH = headingH + PAD_Y * 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = totalW * dpr;
      canvas.height = totalH * dpr;
      ctx.scale(dpr, dpr);

      const particles = createParticles(targets, headingW, headingH, totalW, totalH);
      let startTime = null;

      const loop = (timestamp) => {
        if (isCancelled) return;
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000; // in seconds

        ctx.clearRect(0, 0, totalW, totalH);

        // Timeline:
        //  0.0 - 1.0s: Scattered dots appear across dark background with subtle ambient drift
        //  1.0 - 3.5s: Smooth convergence into "PORTFOLIO" letterforms
        //  3.5 - 4.5s: Settle into place + solid SVG typography smoothly reveals
        //  > 4.5s: Complete & idle

        // Fade in underlying crisp SVG typography between 3.2s and 4.2s
        if (elapsed >= 3.2) {
          const svgProgress = Math.min(1, (elapsed - 3.2) / 1.0);
          setSvgOpacity(svgProgress);
        }

        // Particle fade-out as solid typography locks in (3.8s to 4.5s)
        let particleOpacity = 1;
        if (elapsed >= 3.8) {
          particleOpacity = Math.max(0, 1 - (elapsed - 3.8) / 0.7);
        }

        particles.forEach((p) => {
          let currX = p.startX;
          let currY = p.startY;
          let alpha = 0;

          if (elapsed < 1.0) {
            // Phase 1 (0 - 1s): Scattered reveal with gentle ambient drift
            const fadeIn = Math.min(1, elapsed / 0.85);
            alpha = fadeIn * 0.75;
            currX = p.startX + Math.sin(p.driftAngle + elapsed * p.driftSpeed) * 3.5;
            currY = p.startY + Math.cos(p.driftAngle + elapsed * p.driftSpeed) * 3.5;
          } else if (elapsed < 3.5) {
            // Phase 2 (1.0 - 3.5s): Smooth convergence with organic stagger
            const localElapsed = elapsed - 1.0 - p.stagger;
            const progress = Math.max(0, Math.min(1, localElapsed / (2.5 - p.stagger)));
            const ease = easeOutCubic(progress);

            currX = p.startX + (p.targetX - p.startX) * ease;
            currY = p.startY + (p.targetY - p.startY) * ease;
            alpha = 0.8 + 0.2 * progress;
          } else {
            // Phase 3 (3.5 - 4.5s): Settled at target with subtle lock-in
            currX = p.targetX;
            currY = p.targetY;
            alpha = 0.95;
          }

          const finalAlpha = alpha * particleOpacity;
          if (finalAlpha <= 0.01) return;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = finalAlpha;
          ctx.beginPath();
          ctx.arc(currX, currY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Loop condition (stop at 4.5 seconds)
        if (elapsed < 4.55) {
          animationFrameId = requestAnimationFrame(loop);
        } else {
          // Completed: clean canvas, cancel RAF loop, ensure SVG is 100% visible
          ctx.clearRect(0, 0, totalW, totalH);
          setSvgOpacity(1);
          setIsCompleted(true);
        }
      };

      animationFrameId = requestAnimationFrame(loop);
    };

    runAnimation();

    return () => {
      isCancelled = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[93%] max-w-[1420px] flex justify-center select-none"
    >
      {/* 1. Underlying Crisp SVG Typography (Exact Didone serif typography & size) */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          opacity: svgOpacity,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <svg
          viewBox="0 0 1440 240"
          className="w-full h-auto overflow-visible select-none"
          style={{ filter: 'drop-shadow(0 4px 35px rgba(0,0,0,0.65))' }}
        >
          <text
            x="50%"
            y="76%"
            textAnchor="middle"
            fill="#DFC1AC"
            fontFamily="'Bodoni Moda', 'Didot', 'Bodoni 72', serif"
            fontWeight="400"
            fontSize="235"
            textLength="1360"
            lengthAdjust="spacingAndGlyphs"
            letterSpacing="0.05em"
            style={{
              fontVariationSettings: "'opsz' 96, 'wght' 400"
            }}
          >
            PORTFOLIO
          </text>
        </svg>
      </motion.div>

      {/* 2. Isolated Canvas Particle Formation Overlay */}
      {!isCompleted && (
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none z-10"
          style={{
            top: '-90px',
            bottom: '-90px',
            left: '-60px',
            right: '-60px',
            width: 'calc(100% + 120px)',
            height: 'calc(100% + 180px)'
          }}
        />
      )}
    </div>
  );
}
