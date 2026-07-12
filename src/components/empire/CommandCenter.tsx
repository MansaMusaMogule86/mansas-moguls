"use client";

import { useState, useEffect } from "react";
import { Module } from "./Module";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Activity, Globe } from "lucide-react";
import { moguls } from "@/lib/data/moguls";
import { useLiveEmpireData } from "@/hooks/useLiveEmpireData";
import { EmpireStatusPanel } from "./EmpireStatusPanel";
import { LiveFeedPanel } from "./LiveFeedPanel";
import { GlobalImpactPanel } from "./GlobalImpactPanel";
import { SystemLogPanel } from "./SystemLogPanel";

// Transform the moguls data into the ModuleData format needed
export const MODULES = moguls.map(m => ({
  id: m.slug,
  number: `0${m.orderIndex}`,
  title: m.name,
  description: m.shortDescription,
  accent: m.accentColor === 'gold' ? '#d6aa38' : '#377cff',
  image: m.image || "",
  features: [
    { icon: Globe, text: m.capabilities[0] },
    { icon: Activity, text: m.capabilities[1] },
  ],
  stats: [
    { label: "STATUS", value: "ACTIVE" },
    { label: "INDEX", value: `0${m.orderIndex}` },
  ],
  status: "ACTIVE", 
  pipeline: "OPTIMAL"
}));

export function CommandCenter() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [radius, setRadius] = useState(480);
  const [isMobile, setIsMobile] = useState(false);
  const live = useLiveEmpireData();

  // Responsive radius & mobile detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      if (width < 1400) setRadius(340);
      else if (width < 1800) setRadius(420);
      else setRadius(500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPosition = (index: number) => {
    const angles = [
      -Math.PI / 2,         // Top
      -3 * Math.PI / 4,     // Top Left
      Math.PI,              // Left
      3 * Math.PI / 4,      // Bottom Left
      Math.PI / 2,          // Bottom
      Math.PI / 4,          // Bottom Right
      0,                    // Right
      -Math.PI / 4          // Top Right
    ];
    
    const angle = angles[index];
    
    return {
      x: Math.cos(angle) * (radius * 1.3),
      y: Math.sin(angle) * radius,
      rotate: angle,
    };
  };

  // MOBILE FALLBACK GRID
  if (isMobile) {
    return (
      <div className="w-full py-12 flex flex-col gap-6">
        {/* Live command panels (stacked on mobile) */}
        <div className="flex flex-col gap-4">
          <EmpireStatusPanel health={live.health} reducedMotion={live.reducedMotion} index={0} />
          <GlobalImpactPanel impact={live.impact} activeRoute={live.activeRoute} reducedMotion={live.reducedMotion} index={1} />
          <LiveFeedPanel feed={live.feed} feedPulse={live.feedPulse} formatAge={live.formatAge} reducedMotion={live.reducedMotion} index={2} />
          <SystemLogPanel log={live.log} logPulse={live.logPulse} formatAge={live.formatAge} reducedMotion={live.reducedMotion} index={3} />
        </div>

        {MODULES.map((mod) => (
          <div 
            key={mod.id} 
            className="relative w-full aspect-[16/9] rounded-2xl cursor-pointer group flex items-center justify-center overflow-hidden border border-white/5 bg-black/20"
            onClick={() => setActiveModuleId(mod.id)}
          >
            <Image 
              src={mod.image} 
              alt={mod.title} 
              fill 
              className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        ))}

        {/* Re-use the modal logic even on mobile for expansion */}
        <AnimatePresence>
          {activeModuleId && (
            <Module
              identity={MODULES.find(m => m.id === activeModuleId)!}
              position={{x: 0, y: 0, rotate: 0}}
              isActive={true}
              onActivate={setActiveModuleId}
              onClose={() => setActiveModuleId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // DESKTOP ORBITAL VIEW
  return (
    <div className="relative w-full min-h-[1200px] bg-transparent font-sans text-foreground rounded-[2rem] border border-white/5 hud-panel">
      
      {/* Extreme Left HUD Column — live status + feed */}
      <div className="absolute top-10 left-10 z-20 flex w-72 flex-col gap-4">
        <EmpireStatusPanel health={live.health} reducedMotion={live.reducedMotion} index={0} />
        <LiveFeedPanel feed={live.feed} feedPulse={live.feedPulse} formatAge={live.formatAge} reducedMotion={live.reducedMotion} index={1} />
      </div>

      {/* Extreme Right HUD Column — live impact + system log */}
      <div className="absolute top-10 right-10 z-20 flex w-72 flex-col gap-4">
        <GlobalImpactPanel impact={live.impact} activeRoute={live.activeRoute} reducedMotion={live.reducedMotion} index={0} />
        <SystemLogPanel log={live.log} logPulse={live.logPulse} formatAge={live.formatAge} reducedMotion={live.reducedMotion} index={1} />
      </div>

      {/* Main Orbital Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Advanced HUD Orbital Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <circle cx="50%" cy="50%" r={radius * 0.5} fill="none" stroke="rgba(214, 170, 56, 0.1)" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="rgba(214, 170, 56, 0.05)" strokeWidth="1" />
          <circle cx="50%" cy="50%" r={radius * 1.5} fill="none" stroke="rgba(214, 170, 56, 0.02)" strokeWidth="1" strokeDasharray="10 20" />
          
          {/* Energetic connection lines */}
          {MODULES.map((identity, i) => {
            const pos = getPosition(i);
            return (
              <g key={`connection-${i}`}>
                {/* Outer solid line */}
                <motion.line
                  x1="50%" y1="50%"
                  x2={`calc(50% + ${pos.x}px)`} y2={`calc(50% + ${pos.y}px)`}
                  stroke={identity.accent} strokeWidth="1" strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: activeModuleId ? 0.1 : 1 }}
                  transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center MM Core */}
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center cursor-pointer group perspective-1000"
          onClick={() => setActiveModuleId(null)}
        >
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
            animate={{ 
              backgroundColor: ["rgba(214,170,56,0.05)", "rgba(214,170,56,0.15)", "rgba(214,170,56,0.05)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <Image
            src="/mansas-moguls-crown.png"
            alt="Mansas Moguls crown"
            width={180}
            height={180}
            className="relative z-10 object-contain drop-shadow-[0_0_20px_rgba(214,170,56,0.6)] group-hover:drop-shadow-[0_0_40px_rgba(214,170,56,0.8)] transition-all duration-500"
          />
          <div className="mt-8 text-center z-10">
            <h2 className="text-3xl font-heading tracking-[0.2em] text-gold uppercase drop-shadow-[0_0_10px_rgba(214,170,56,0.5)]">
              Mansas Moguls
            </h2>
            <p className="text-[9px] font-mono tracking-[0.4em] text-muted-foreground mt-3">
              BUILD. ACQUIRE. AUTOMATE. SCALE. COMPOUND.
            </p>
          </div>
        </motion.div>

        {/* The 8 Modules in Orbit */}
        <AnimatePresence>
          {MODULES.map((identity, i) => {
            const isActive = activeModuleId === identity.id;
            const pos = getPosition(i);
            
            // If another module is active, hide the non-active ones
            if (activeModuleId && !isActive) return null;

            return (
              <Module
                key={identity.id}
                identity={identity}
                position={pos}
                isActive={isActive}
                onActivate={setActiveModuleId}
                onClose={() => setActiveModuleId(null)}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
