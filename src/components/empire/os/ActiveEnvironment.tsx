"use client";

import { motion } from "framer-motion";
import { useEmpireState } from "./EmpireStateProvider";
import { dashboardDivisions } from "@/lib/data/dashboardData";
import { X } from "lucide-react";
import { IntelligenceRadar } from "./intelligence/IntelligenceRadar";
import { WarRoom } from "./war-room/WarRoom";

export function ActiveEnvironment() {
  const { activeMogulId, viewState, setViewState, setActiveMogulId } = useEmpireState();

  const mogul = dashboardDivisions.find((m) => m.id === activeMogulId);

  if (!mogul) return null;

  const handleClose = () => {
    setViewState("dashboard");
    setActiveMogulId(null);
  };

  return (
    <motion.div
      layoutId={`mogul-${mogul.id}`}
      className={`absolute inset-0 z-50 flex flex-col bg-[#05070B] border ${mogul.borderClass.replace("border-white/5", "border-white/10")} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background spread color */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-${mogul.accentClass.replace("text-", "")} to-transparent pointer-events-none`} 
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />

      {/* Header Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-black/40 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/30 tracking-widest">{mogul.divisionNumber}</span>
            <div className={`h-px w-8 ${mogul.accentClass.replace("text-", "bg-")}/50`} />
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Division</span>
          </div>
          <h2 className={`text-xl font-heading tracking-widest font-bold uppercase ${mogul.accentClass}`}>
            {mogul.title} Command
          </h2>
        </div>

        <button 
          onClick={handleClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Operating Environment Content */}
      <div className="relative z-10 flex-1 w-full h-full overflow-hidden">
        {viewState === "environment" && mogul.id === "intelligence" && <IntelligenceRadar />}
        {viewState === "environment" && mogul.id !== "intelligence" && (
          <div className="w-full h-full flex items-center justify-center flex-col gap-4">
            <div className={`w-12 h-12 rounded-full border border-white/10 ${mogul.accentClass.replace("text-", "border-t-")} animate-spin`} />
            <p className="text-sm font-mono tracking-widest text-white/50 uppercase">Environment Initializing...</p>
          </div>
        )}
        {viewState === "war-room" && <WarRoom />}
      </div>

    </motion.div>
  );
}
