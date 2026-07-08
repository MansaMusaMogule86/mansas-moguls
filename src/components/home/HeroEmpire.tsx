"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Layers, Cpu, Code2, Users, Building, ShieldCheck, Activity, ChevronsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const pulse = {
  hidden: { opacity: 0.3, scale: 0.98 },
  show: {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.98, 1, 0.98],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
  }
};

const orbit = {
  animate: {
    rotate: 360,
    transition: { duration: 30, repeat: Infinity, ease: "linear" as const }
  }
};

export function HeroEmpire() {
  return (
    <section className="relative overflow-hidden min-h-[100svh] lg:min-h-[85svh] w-full flex flex-col pt-24 pb-12 lg:pt-32 lg:pb-16 justify-center">
      {/* Background & Lighting Details */}
      <div className="absolute inset-0 bg-empire-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Core Energy Glow */}
      <motion.div 
        variants={pulse}
        initial="hidden"
        animate="show"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-royal/15 blur-[100px] rounded-[100%]"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gold/10 blur-[60px] rounded-[100%]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1">
        
        {/* LEFT HUD PANELS */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col gap-4 col-span-3 lg:mt-8"
        >
          <div className="hud-panel p-4 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 text-gold/80 text-[10px] font-mono tracking-widest uppercase">
              <Globe className="size-3.5" />
              <span>Mission</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed font-sans">
              To build, acquire, and scale transformative businesses that empower generations and elevate communities.
            </p>
          </div>

          <div className="hud-panel p-4 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3 text-gold/80 text-[10px] font-mono tracking-widest uppercase">
              <Layers className="size-3.5" />
              <span>Core Pillars</span>
            </div>
            <ul className="space-y-2">
              {[
                { name: "Capital Intelligence", icon: Activity },
                { name: "Operational Excellence", icon: ShieldCheck },
                { name: "Strategic Acquisitions", icon: Building },
                { name: "AI Automation", icon: Cpu },
                { name: "Talent Empowerment", icon: Users },
                { name: "Legacy Building", icon: Code2 }
              ].map((pillar, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-foreground/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                  <span className="font-sans hover:text-gold transition-colors cursor-default">{pillar.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CENTER CENTERPIECE */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center text-center relative z-20">
          
          {/* Emblem / Crown Placeholder */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8 flex items-center justify-center transform-gpu mx-auto mt-4 md:mt-0"
          >
            {/* Orbit lines */}
            <div className="absolute inset-0 rounded-full border border-gold/20" />
            <motion.div variants={orbit} animate="animate" className="absolute inset-0 rounded-full border border-transparent border-t-gold/70" />
            
            <div className="absolute -inset-2 rounded-full border border-royal/10" />
            <motion.div variants={orbit} animate="animate" transition={{ duration: 40, repeat: Infinity, ease: "linear" as const, repeatType: "reverse" as const }} className="absolute -inset-2 rounded-full border border-transparent border-b-royal/80" />
            
            <div className="absolute -inset-4 rounded-full border border-white/5" />
            <motion.div variants={orbit} animate="animate" transition={{ duration: 25, repeat: Infinity, ease: "linear" as const }} className="absolute -inset-4 rounded-full border border-transparent border-l-white/30" />
            
            <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
              <img 
                 src="/mansas-moguls-crown.png" 
                 alt="Mansas Moguls Echo" 
                 className="w-[85%] h-[85%] object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]"
               />
            </div>
            
            {/* Base platform line */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-royal/50 to-transparent" />
          </motion.div>

          {/* Main Copy */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show" className="text-center font-heading">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3 drop-shadow-lg leading-tight">
              Mansas Moguls
              <span className="block mt-1 text-xl sm:text-2xl lg:text-3xl text-gradient-gold">Ecosystem</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-3 my-3 md:my-5 opacity-70">
            <div className="h-px w-8 bg-gold/40" />
            <div className="w-1 h-1 rotate-45 bg-gold" />
            <div className="h-px w-8 bg-gold/40" />
          </div>

          <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
            <h2 className="text-base sm:text-lg lg:text-xl font-medium tracking-wide text-foreground/90 uppercase font-mono mb-3 text-gradient-royal">
              Build. Acquire. Automate. Scale. Compound.
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground font-sans leading-relaxed px-4">
              An empire operating system for founders, creators, agencies, and businesses ready to engineer legacy.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show" className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
            <Button asChild size="lg" className="w-full sm:w-auto h-11 sm:h-12 bg-gradient-to-r from-gold-deep via-gold to-gold-bright text-empire-black hover:opacity-90 transition-opacity font-semibold tracking-wide border-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Link href="/contact">Book a Strategy Call</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-11 sm:h-12 border-gold/30 bg-empire-surface/50 text-gold hover:bg-gold/10 hover:text-gold-bright backdrop-blur-sm transition-all">
              <Link href="/empire">Explore the Ecosystem</Link>
            </Button>
          </motion.div>

        </div>

        {/* RIGHT HUD PANELS */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex flex-col gap-4 col-span-3 lg:mt-8"
        >
          <div className="hud-panel p-4 rounded-lg backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-gold/80 text-[10px] font-mono tracking-widest uppercase">
                <Activity className="size-3.5" />
                <span>System Status</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-green-500 uppercase tracking-wider">Optimal</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { label: "Network Integrity", val: "100%" },
                { label: "Capital Deployment", val: "Active" },
                { label: "Ecosystem Health", val: "Exceptional" }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-[11px]">
                  <span className="text-foreground/50 uppercase font-mono">{stat.label}</span>
                  <span className="text-foreground font-mono">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hud-panel p-4 rounded-lg backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-royal/10 blur-[25px] rounded-full" />
            <div className="flex items-center gap-2 mb-3 text-gold/80 text-[10px] font-mono tracking-widest uppercase relative z-10">
              <Building className="size-3.5" />
              <span>Portfolio Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {[
                { label: "Companies", val: "24" },
                { label: "Markets", val: "12" },
                { label: "Team Members", val: "250+" },
                { label: "Valuation", val: "$1.2B+" }
              ].map((m, i) => (
                <div key={i}>
                  <div className="text-base font-heading text-foreground mb-0.5">{m.val}</div>
                  <div className="text-[9px] text-foreground/50 uppercase tracking-wider font-mono">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronsDown className="size-5 text-gold/30" />
        </motion.div>
        <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold/20">Scroll</span>
      </motion.div>
    </section>
  );
}
