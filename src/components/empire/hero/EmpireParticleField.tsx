"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  fadeSpeed: number;
}

export function EmpireParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();
  const animationFrameId = useRef<number | null>(null);
  const isInViewport = useRef(true);

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Setup particles (30 count)
    const count = 35;
    const particles: Particle[] = [];
    const colors = ["rgba(214,170,56,", "rgba(59,130,246,", "rgba(255,255,255,"];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.1,
        fadeSpeed: 0.002 + Math.random() * 0.003,
      });
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Reset if goes off screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
          p.alpha = 0;
        }
        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
        }

        // Fade in/out
        if (p.alpha < 0.6) {
          p.alpha += p.fadeSpeed;
        }

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = p.color.includes("214") ? "#d6aa38" : "#3b82f6";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0; // reset

      if (isInViewport.current && document.visibilityState === "visible") {
        animationFrameId.current = requestAnimationFrame(draw);
      }
    };

    // IntersectionObserver to pause offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewport.current = entry.isIntersecting;
        if (isInViewport.current && document.visibilityState === "visible") {
          if (!animationFrameId.current) {
            draw();
          }
        } else {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Tab visibility listener
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isInViewport.current) {
        if (!animationFrameId.current) {
          draw();
        }
      } else {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial draw trigger
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
