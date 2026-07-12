"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/data/empireHero";
import { useRef, useState, ReactNode } from "react";

// Magnetic Button Wrapper
function MagneticWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull (max 5px)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-50 inline-block"
    >
      {children}
    </motion.div>
  );
}

export function EmpireHeroContent() {
  const { headline, description, primaryCTA, secondaryCTA } = heroContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 1.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-40 w-full max-w-4xl mx-auto mt-4 md:mt-8 text-center flex flex-col items-center px-4"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-gold uppercase">
          Mansas Moguls Ecosystem
        </h2>
      </motion.div>

      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white uppercase tracking-wider mb-6 leading-tight"
      >
        {headline.map((word, i) => (
          <span key={i} className="inline-block mr-3 md:mr-5 last:mr-0">
            {word}
          </span>
        ))}
      </motion.h1>

      <motion.p 
        variants={itemVariants}
        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
      >
        {description}
      </motion.p>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
      >
        <MagneticWrapper>
          <Link
            href={primaryCTA.href}
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gold text-black rounded-sm font-bold uppercase tracking-widest text-sm transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03040a] focus-visible:ring-gold"
          >
            <span>{primaryCTA.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            
            {/* Inner Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]" />
          </Link>
        </MagneticWrapper>

        <Link
          href={secondaryCTA.href}
          className="group relative flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-sm font-bold uppercase tracking-widest text-sm transition-all hover:bg-white/5 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03040a] focus-visible:ring-white/50"
        >
          <span>{secondaryCTA.label}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
