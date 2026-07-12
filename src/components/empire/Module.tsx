"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { MogulDetailLayout } from "./MogulDetailLayout";
import { type LucideIcon } from "lucide-react";

export type ModuleData = {
  id: string;
  number: string;
  title: string;
  description: string;
  accent: string;
  image: string;
  features: { icon: LucideIcon; text: string }[];
  stats: { label: string; value: string }[];
  status: string;
  pipeline: string;
};

interface ModuleProps {
  identity: ModuleData;
  position: { x: number; y: number; rotate: number };
  isActive: boolean;
  onActivate: (id: string) => void;
  onClose: () => void;
}

export function Module({ identity, position, isActive, onActivate, onClose }: ModuleProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Symmetrical octagonal clip path for the massive HUD orbit cards
  const orbitClipPath = {
    clipPath: "polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)"
  };

  // Asymmetrical mechanical clip path for the fully expanded view
  const expandedClipPath = {
    clipPath: "polygon(60px 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%, 0 60px)"
  };

  if (isActive) {
    return (
      <motion.div
        layoutId={`module-${identity.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          className="relative w-[95vw] max-w-6xl h-[60vh] md:h-[80vh] hud-panel overflow-hidden rounded-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent glow on border */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ boxShadow: `inset 0 0 150px ${identity.accent}` }}
          />
          
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest z-50 p-2"
          >
            [ CLOSE SYSTEM ]
          </button>

          <MogulDetailLayout data={identity} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`module-${identity.id}`}
      className="absolute cursor-pointer group z-10"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        x: "-50%",
        y: "-50%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onActivate(identity.id)}
      animate={{ zIndex: isHovered ? 50 : 10 }}
    >
      <motion.div
        className="relative w-[340px] h-[180px] bg-[#050505]/80 backdrop-blur-xl border border-white/10 transition-colors duration-500 overflow-hidden group-hover:border-white/30"
        style={orbitClipPath}
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        {/* Glow Effects */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-10"
          style={{ boxShadow: `inset 0 0 50px ${identity.accent}40` }}
        />
        
        <Image 
          src={identity.image} 
          alt={identity.title} 
          fill 
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
        />
      </motion.div>
    </motion.div>
  );
}
