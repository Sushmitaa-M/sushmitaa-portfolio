import React, { useEffect, useRef, useState } from 'react';

/**
 * Animated Loading Screen — Exact 1:1 Recreation of Dribbble Reference:
 * "Loading text animation" by Aaron Iker (inspired by Marc Edwards / Bjango)
 * Reference: https://dribbble.com/shots/6616259-Loading-text-animation
 *
 * Kinetic Mechanics:
 * - Word: "Loading"
 * - The text is sliced into vertical columns (~2px strips).
 * - A kinetic wave sweeps across the text from left to right (~2.4s sweep).
 * - As the wave encounters each vertical strip, it displaces the strip up or down
 *   according to a cosine envelope and alternating/stochastic vertical offset.
 * - Slices expand into a rhombus-shaped vertical wave of teeth/strips, then smoothly
 *   re-converge into the solid, clean word "Loading".
 * - Followed by a ~0.8s rest period where the text sits crisp and pristine before the next wave.
 * - Hardware accelerated, 60fps, Retina/DPI sharp, zero layout shifts.
 */
export default function LoadingScreen({ onLoadingComplete, minDuration = 2200 }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId = null;
    let isCancelled = false;

    // Canvas & Typography Config
    const STRIP_W = 2; // Width of each vertical slice
    const TEXT = 'Loading';
    const FONT_SIZE = 52;
    const FONT_FAMILY = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const TEXT_COLOR = '#DFC1AC'; // Portfolio Champagne Beige
    const MAX_OFFSET = 64; // Max vertical displacement
    const WAVE_RADIUS = 90; // Width of the travelling wave
    const WAVE_DURATION = 2.4; // Time for wave to travel across text
    const REST_DURATION = 0.8; // Time text rests flat
    const CYCLE_DURATION = WAVE_DURATION + REST_DURATION; // Total loop period

    // Resolution setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasW = 540;
    const canvasH = 260;

    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    ctx.scale(dpr, dpr);

    // Render pristine text on an offscreen canvas
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvasW * dpr;
    offCanvas.height = canvasH * dpr;
    const offCtx = offCanvas.getContext('2d');
    offCtx.scale(dpr, dpr);

    const setupText = () => {
      offCtx.clearRect(0, 0, canvasW, canvasH);
      offCtx.font = `400 ${FONT_SIZE}px ${FONT_FAMILY}`;
      offCtx.fillStyle = TEXT_COLOR;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(TEXT, canvasW / 2, canvasH / 2);
    };

    setupText();

    // Deterministic pseudo-random spread for each vertical strip
    const numStrips = Math.ceil(canvasW / STRIP_W);
    const spreads = new Float32Array(numStrips);
    for (let i = 0; i < numStrips; i++) {
      // Alternating sign with subtle organic variation matching the reference
      const sign = i % 2 === 0 ? 1 : -1;
      const noise = 0.72 + 0.28 * Math.sin(i * 1.618);
      spreads[i] = sign * noise;
    }

    // Text bounding box to compute wave start and end
    ctx.font = `400 ${FONT_SIZE}px ${FONT_FAMILY}`;
    const textWidth = ctx.measureText(TEXT).width;
    const textStartX = (canvasW - textWidth) / 2;
    const textEndX = textStartX + textWidth;
    const waveStartX = textStartX - WAVE_RADIUS - 20;
    const waveEndX = textEndX + WAVE_RADIUS + 20;

    let startTime = null;

    const render = (timestamp) => {
      if (isCancelled) return;
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      ctx.clearRect(0, 0, canvasW, canvasH);

      if (prefersReducedMotion) {
        // Accessibility fallback: Static centered text
        ctx.drawImage(offCanvas, 0, 0, canvasW * dpr, canvasH * dpr, 0, 0, canvasW, canvasH);
        return;
      }

      // Time within current cycle
      const cycleTime = elapsed % CYCLE_DURATION;

      if (cycleTime < WAVE_DURATION) {
        // Wave is traveling across text
        const progress = cycleTime / WAVE_DURATION;
        // Smooth sine ease in and out for natural wave glide
        const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);
        const waveX = waveStartX + ease * (waveEndX - waveStartX);

        for (let i = 0; i < numStrips; i++) {
          const x = i * STRIP_W;
          const dist = x - waveX;

          let offsetY = 0;
          if (Math.abs(dist) < WAVE_RADIUS) {
            // Cosine bell envelope
            const env = Math.pow(Math.cos((dist / WAVE_RADIUS) * (Math.PI / 2)), 2);
            offsetY = spreads[i] * MAX_OFFSET * env;
          }

          // Draw the 2px strip displaced by offsetY
          ctx.drawImage(
            offCanvas,
            x * dpr,
            0,
            STRIP_W * dpr,
            canvasH * dpr,
            x,
            offsetY,
            STRIP_W,
            canvasH
          );
        }
      } else {
        // Rest period: perfectly clean and static
        ctx.drawImage(offCanvas, 0, 0, canvasW * dpr, canvasH * dpr, 0, 0, canvasW, canvasH);
      }

      animFrameId = requestAnimationFrame(render);
    };

    // Ensure fonts are loaded before starting animation loop
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setupText();
        animFrameId = requestAnimationFrame(render);
      });
    } else {
      animFrameId = requestAnimationFrame(render);
    }

    // Readiness & Exit handling
    const startMountTime = Date.now();
    const readyTimer = setTimeout(() => {
      const timeRemaining = Math.max(0, minDuration - (Date.now() - startMountTime));
      setTimeout(() => {
        if (isCancelled) return;
        setIsExiting(true);
        setTimeout(() => {
          if (isCancelled) return;
          setIsVisible(false);
          if (onLoadingComplete) onLoadingComplete();
        }, 650);
      }, timeRemaining);
    }, 100);

    // Failsafe timeout (4.5s)
    const failsafe = setTimeout(() => {
      if (isCancelled) return;
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 650);
    }, 4500);

    return () => {
      isCancelled = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      clearTimeout(readyTimer);
      clearTimeout(failsafe);
    };
  }, [minDuration, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#100D0D] select-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        backgroundColor: '#100D0D',
      }}
      aria-live="polite"
      aria-busy={!isExiting}
    >
      {/* Centered Canvas Container */}
      <div className="relative flex items-center justify-center w-full max-w-[540px] px-4">
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-w-[540px] pointer-events-none block"
          style={{
            aspectRatio: '540 / 260',
          }}
        />
      </div>
    </div>
  );
}
