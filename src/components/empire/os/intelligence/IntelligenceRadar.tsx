"use client";

import { motion } from "framer-motion";
import { useEmpireState } from "../EmpireStateProvider";
import { useState, useEffect } from "react";
import { ArrowRight, Activity, Globe, ShieldAlert } from "lucide-react";

const opportunities = [
  {
    id: "opp-1",
    title: "Projected Weakness: Saudi Arabian Premium RE Platform",
    description: "Competitor 'Aura Properties' is experiencing a 14% decline in regional market share. A strategic gap is opening for a premium AI-driven real estate platform in Riyadh.",
    upside: "$4.2M ARR",
    risk: "Moderate",
    capital: "$650K",
  },
  {
    id: "opp-2",
    title: "Regulatory Shift: Dubai Digital Assets",
    description: "New VARA regulations create an immediate need for automated compliance infrastructure. We have the internal engineering capacity to deploy a B2B SaaS solution.",
    upside: "$8.5M ARR",
    risk: "High",
    capital: "$1.2M",
  },
  {
    id: "opp-3",
    title: "Talent Acquisition: AI Robotics Team",
    description: "A prominent autonomous robotics startup has lost funding. Their entire 12-person senior engineering team is seeking immediate placement.",
    upside: "Strategic",
    risk: "Low",
    capital: "$2.4M",
  }
];

export function IntelligenceRadar() {
  const { setActiveOpportunity, setViewState } = useEmpireState();
  const [briefingStage, setBriefingStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBriefingStage(1), 1500);
    const t2 = setTimeout(() => setBriefingStage(2), 3500);
    const t3 = setTimeout(() => setBriefingStage(3), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleSelect = (opp: typeof opportunities[0]) => {
    setActiveOpportunity(opp);
    setViewState("war-room");
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 relative">
      
      {/* Central Globe Visualization */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
      >
        <div className="relative w-[600px] h-[600px] rounded-full border border-electric-blue/20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-electric-blue/10 scale-75 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-0 rounded-full border border-electric-blue/5 scale-50 animate-[spin_40s_linear_infinite_reverse]" />
          <Globe className="w-48 h-48 text-electric-blue/30" strokeWidth={0.5} />
        </div>
      </motion.div>

      <div className="w-full max-w-5xl z-10 grid grid-cols-12 gap-12 items-center">
        
        {/* Left: Briefing */}
        <div className="col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-electric-blue">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase font-bold">Live Intercept</span>
          </div>
          
          <div className="min-h-[120px]">
            {briefingStage >= 1 && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-heading text-white leading-relaxed"
              >
                Three strategic developments require your immediate attention.
              </motion.p>
            )}
            {briefingStage >= 2 && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-white/50 mt-4 leading-relaxed max-w-sm"
              >
                The Opportunity Radar has identified critical market shifts based on external signals and our internal capacity.
              </motion.p>
            )}
          </div>
        </div>

        {/* Right: Opportunities List */}
        <div className="col-span-7 flex flex-col gap-4">
          {briefingStage >= 3 && opportunities.map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onClick={() => handleSelect(opp)}
              className="group relative w-full border border-white/10 bg-black/50 backdrop-blur-md p-5 flex flex-col gap-4 cursor-pointer hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/0 to-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  <h3 className="text-sm font-bold tracking-wider uppercase text-white group-hover:text-electric-blue transition-colors">
                    {opp.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-electric-blue transition-colors group-hover:translate-x-1" />
              </div>

              <p className="text-xs text-white/60 leading-relaxed max-w-[85%] relative z-10">
                {opp.description}
              </p>

              <div className="flex items-center gap-6 mt-2 pt-4 border-t border-white/5 relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">Upside</span>
                  <span className="text-xs font-mono text-emerald-400">{opp.upside}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">Capital Req</span>
                  <span className="text-xs font-mono text-gold">{opp.capital}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">Risk</span>
                  <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    {opp.risk}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
