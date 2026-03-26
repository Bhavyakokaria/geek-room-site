"use client";
import React, { useEffect, useRef } from "react";

/**
 * Animated Grid Diamond Background
 * Inspired by https://dribbble.com/shots/24643750-grid-animated-background
 *
 * Black background with a grid of white diamond shapes.
 * Diamonds scale based on distance from center (large at edges, tiny at center).
 * A radial pulse wave animates outward continuously.
 * Pure CSS + Canvas for maximum performance.
 */

export default function Robot3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dpr = window.devicePixelRatio || 1;

    // Grid configuration
    const CELL_SIZE = 38; // spacing between diamond centers
    const MAX_DIAMOND_SIZE = 10; // max half-diagonal of a diamond
    const PULSE_SPEED = 0.0008; // speed of the radial pulse
    const PULSE_WAVES = 3; // number of simultaneous pulse waves

    function resize() {
      dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Calculate the max distance from center for normalization
    function getMaxDist(w: number, h: number) {
      const cx = w / 2;
      const cy = h / 2;
      return Math.sqrt(cx * cx + cy * cy);
    }

    function drawDiamond(
      x: number,
      y: number,
      size: number,
      opacity: number
    ) {
      if (size < 0.3 || opacity < 0.01) return;
      ctx!.save();
      ctx!.globalAlpha = opacity;
      ctx!.fillStyle = "#ffffff";
      ctx!.beginPath();
      ctx!.moveTo(x, y - size);
      ctx!.lineTo(x + size, y);
      ctx!.lineTo(x, y + size);
      ctx!.lineTo(x - size, y);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function animate(time: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = getMaxDist(w, h);

      ctx!.clearRect(0, 0, w, h);

      // Number of columns and rows
      const cols = Math.ceil(w / CELL_SIZE) + 2;
      const rows = Math.ceil(h / CELL_SIZE) + 2;

      // Offset to center the grid
      const offsetX = (w - (cols - 1) * CELL_SIZE) / 2;
      const offsetY = (h - (rows - 1) * CELL_SIZE) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * CELL_SIZE;
          const y = offsetY + row * CELL_SIZE;

          // Distance from center (normalized 0-1)
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const normalizedDist = dist / maxDist;

          // Base size: larger at edges, smaller at center
          // Use a power curve for a more dramatic vignette effect
          const baseSizeFactor = Math.pow(normalizedDist, 1.5);
          let size = baseSizeFactor * MAX_DIAMOND_SIZE;

          // Pulse wave effect - multiple concentric waves radiating from center
          let pulseEffect = 0;
          for (let wave = 0; wave < PULSE_WAVES; wave++) {
            const wavePhase = (time * PULSE_SPEED + wave / PULSE_WAVES) % 1;
            const waveDist = wavePhase; // 0 to 1, center to edge
            const distFromWave = Math.abs(normalizedDist - waveDist);
            const waveWidth = 0.15;
            if (distFromWave < waveWidth) {
              const waveIntensity =
                1 - distFromWave / waveWidth;
              pulseEffect += waveIntensity * 0.5;
            }
          }

          // Apply pulse: diamonds near the wave get a size boost
          size = size + pulseEffect * MAX_DIAMOND_SIZE * 0.6;

          // Opacity: more opaque at edges, transparent at center
          let opacity = Math.pow(normalizedDist, 1.2) * 0.9;
          opacity = Math.min(1, opacity + pulseEffect * 0.3);

          // Add subtle shimmer
          const shimmer =
            Math.sin(time * 0.001 + col * 0.5 + row * 0.3) * 0.08;
          opacity = Math.max(0, opacity + shimmer);

          drawDiamond(x, y, size, opacity);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "#000000",
      }}
    />
  );
}
