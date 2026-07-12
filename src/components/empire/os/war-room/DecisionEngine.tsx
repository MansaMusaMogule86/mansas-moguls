"use client";

import { motion } from "framer-motion";
import { useEmpireState } from "../EmpireStateProvider";
import { useState } from "react";
import { GitBranch, Play, CheckCircle2 } from "lucide-react";

const timelines = [
  {
    id: "t-a",
    label: "Timeline A",
    title: "Launch Immediately",
    revenue: "$4.2M",
    capital: "$650K",
    risk: "High",
    prob: "62%",
    description: "Aggressive market entry. Captures first-mover advantage but strains current engineering capacity.",
    recommended: false,
  },
  {
    id: "t-b",
    label: "Timeline B",
    title: "Wait 90 Days",
    revenue: "$2.8M",
    capital: "$400K",
    risk: "Low",
    prob: "85%",
    description: "Allows infrastructure maturation. Sacrifices initial market share but guarantees stability.",
    recommended: false,
  },
  {
    id: "t-c",
    label: "Timeline C",
    title: "Strategic Partner Launch",
    revenue: "$8.5M",
    capital: "$150K",
    risk: "Moderate",
    prob: "91%",
    description: "Leverage local Saudi partner for distribution. Reduces capital requirement and maximizes upside.",
    recommended: true,
  },
  {
    id: "t-d",
    label: "Timeline D",
    title: "Acquire Competitor",
    revenue: "$12M",
    capital: "$4.5M",
    risk: "Extreme",
    prob: "45%",
    description: "Buyout Aura Properties. Massive capital required, high integration risk, total market dominance if successful.",
    recommended: false,
  }
];

export function DecisionEngine() {
  const { activeOpportunity, setViewState, setActiveOpportunity, setActiveMogulId } = useEmpireState();
  const [selectedTimeline, setSelectedTimeline] = useState(timelines[2]); // Default to recommended
  const [isExecuting, setIsExecuting] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsExecuted(true);
      setTimeout(() => {
        // Reset everything back to dashboard
        setViewState("dashboard");
        setActiveOpportunity(null);
        setActiveMogulId(null);
      }, 3000);
    }, 2000);
  };

  if (isExecuted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-emerald-500/5">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-widest text-center">
            Plan Executing
          </h2>
          <p className="text-emerald-400 font-mono text-sm max-w-md text-center leading-relaxed">
            Projects created. Capital allocated. Agents deployed. The Empire graph has been updated.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-12 relative overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-12"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-electric-blue" />
            <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-widest">
              Generated Timelines
            </h2>
          </div>
          <p className="text-sm text-white/50">{activeOpportunity?.title}</p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-12">
        
        {/* Left: Timeline Branches */}
        <div className="w-1/3 flex flex-col gap-4 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[15px] top-8 bottom-8 w-px bg-white/10 z-0" />

          {timelines.map((t, idx) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => setSelectedTimeline(t)}
              className={`relative z-10 flex items-center gap-6 cursor-pointer group ${selectedTimeline.id === t.id ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-[#05070B] transition-colors ${selectedTimeline.id === t.id ? "border-electric-blue shadow-[0_0_15px_rgba(42,138,246,0.3)]" : "border-white/20 group-hover:border-white/50"}`}>
                <div className={`w-2 h-2 rounded-full ${selectedTimeline.id === t.id ? "bg-electric-blue" : "bg-transparent"}`} />
              </div>
              <div className="flex flex-col py-2">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/40">{t.label}</span>
                  {t.recommended && <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">Recommended</span>}
                </div>
                <h3 className="text-sm font-bold text-white tracking-wider uppercase">{t.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Timeline Details & Execution */}
        <motion.div 
          key={selectedTimeline.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-2/3 flex flex-col border border-white/10 bg-black/40 backdrop-blur-md p-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-widest">{selectedTimeline.title}</h2>
            {selectedTimeline.recommended && <span className="text-xs font-mono px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 uppercase">Unified Council Recommendation</span>}
          </div>

          <p className="text-white/70 leading-relaxed max-w-2xl mb-12">
            {selectedTimeline.description}
          </p>

          <div className="grid grid-cols-4 gap-8 mb-16">
            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Proj. Revenue</span>
              <span className="text-2xl font-mono text-emerald-400">{selectedTimeline.revenue}</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Capital Req</span>
              <span className="text-2xl font-mono text-gold">{selectedTimeline.capital}</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Risk Level</span>
              <span className={`text-2xl font-mono ${selectedTimeline.risk === "Extreme" ? "text-rose-500" : selectedTimeline.risk === "High" ? "text-amber-500" : "text-emerald-500"}`}>{selectedTimeline.risk}</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Success Prob</span>
              <span className="text-2xl font-mono text-white">{selectedTimeline.prob}</span>
            </div>
          </div>

          <div className="mt-auto flex justify-end">
            <button 
              onClick={handleExecute}
              disabled={isExecuting}
              className={`group relative overflow-hidden flex items-center gap-4 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-electric-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="absolute inset-0 w-0 bg-electric-blue transition-all duration-300 ease-out group-hover:w-full z-0" />
              <span className="relative z-10">{isExecuting ? "Executing..." : "Execute Plan"}</span>
              <Play className={`w-5 h-5 relative z-10 ${isExecuting ? 'animate-pulse' : ''} fill-current`} />
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
