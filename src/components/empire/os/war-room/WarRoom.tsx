"use client";

import { motion } from "framer-motion";
import { useEmpireState } from "../EmpireStateProvider";
import { useState, useEffect } from "react";
import { dashboardDivisions } from "@/lib/data/dashboardData";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { DecisionEngine } from "./DecisionEngine";

export function WarRoom() {
  const { activeOpportunity } = useEmpireState();
  const [analysisStage, setAnalysisStage] = useState(0);

  // Simulate the debate and analysis process
  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i <= 8; i++) {
        await new Promise(r => setTimeout(r, 800));
        setAnalysisStage(i);
      }
    };
    sequence();
  }, []);

  if (!activeOpportunity) return null;

  if (analysisStage === 8) {
    return <DecisionEngine />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 relative overflow-hidden">
      
      {/* Central Opportunity Display */}
      <div className="flex flex-col items-center text-center max-w-2xl mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-1.5 border border-rose-500/30 bg-rose-500/10 rounded-full mb-6 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-rose-500 font-bold">War Room Assembled</span>
        </motion.div>
        <h2 className="text-3xl font-heading font-bold text-white mb-4 uppercase tracking-wider">
          {activeOpportunity.title}
        </h2>
        <p className="text-sm text-white/50 leading-relaxed max-w-xl">
          {activeOpportunity.description}
        </p>
      </div>

      {/* The AI Council Grid */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-5xl relative z-10">
        {dashboardDivisions.map((mogul, idx) => {
          const isAnalyzing = analysisStage === idx;
          const hasAnalyzed = analysisStage > idx;

          return (
            <motion.div 
              key={mogul.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-5 border bg-black/40 backdrop-blur-md flex flex-col gap-3 transition-all duration-500 ${
                isAnalyzing ? `border-${mogul.accentClass.replace("text-", "")} shadow-[0_0_30px_rgba(var(--${mogul.accentClass.replace("text-", "")}),0.2)]` : 
                hasAnalyzed ? 'border-white/10 opacity-70' : 
                'border-white/5 opacity-30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${mogul.accentClass}`}>
                  {mogul.title}
                </span>
                {hasAnalyzed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {isAnalyzing && <div className={`w-3 h-3 rounded-full border-2 border-t-transparent animate-spin border-${mogul.accentClass.replace("text-", "")}`} />}
              </div>

              <div className="h-10 flex items-center">
                {isAnalyzing && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-white/80 leading-relaxed"
                  >
                    Simulating structural impact and calculating projection...
                  </motion.p>
                )}
                {hasAnalyzed && (
                  <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                    Analysis complete. Constraints identified.
                  </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Footer */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-4 h-4 text-white/30" />
          <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            {analysisStage < 8 ? `Council analyzing... ${Math.round((analysisStage / 8) * 100)}%` : "Consensus Reached."}
          </span>
        </div>
      </div>

    </div>
  );
}
