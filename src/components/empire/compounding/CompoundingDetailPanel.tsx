"use client";

import { motion } from "framer-motion";
import { X, Shield, Terminal, ArrowUpRight } from "lucide-react";
import { CompoundingStageData } from "./compounding.types";
import Link from "next/link";

interface CompoundingDetailPanelProps {
  stage: CompoundingStageData | null;
  onClose: () => void;
}

export function CompoundingDetailPanel({ stage, onClose }: CompoundingDetailPanelProps) {
  if (!stage) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 pointer-events-auto"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#04060b] border-l border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto pointer-events-auto text-left"
        style={{ boxShadow: "-10px 0 30px rgba(0,0,0,0.6)" }}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              <h3 className="text-sm font-mono tracking-widest text-white uppercase font-extrabold">
                {`STAGE ${stage.number}: ${stage.name}`}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 border border-white/10 bg-white/5 text-white hover:text-gold rounded-sm transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Purpose */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm">
              <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest mb-1.5 font-extrabold">Directive Purpose</h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {stage.purpose}
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold">Operational Metrics</h4>
              <div className="space-y-2">
                {stage.metrics.map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center p-2.5 border border-white/5 bg-[#05080E] rounded-sm font-mono">
                    <span className="text-[9px] text-white/45">{metric.label}</span>
                    <span className="text-xs font-bold text-white">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="p-4 bg-gold/[0.01] border border-gold/15 rounded-sm">
              <div className="flex items-center gap-1.5 mb-2">
                <Terminal className="w-4 h-4 text-gold" />
                <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest font-extrabold">AI Recommendation</h4>
              </div>
              <p className="text-xs text-gold/90 leading-relaxed font-sans">
                {stage.aiRecommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
          <Link
            href={stage.primaryAction.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-gold-bright transition-colors rounded-sm"
          >
            <span>{stage.primaryAction.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href={stage.secondaryAction.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 bg-transparent border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-widest hover:border-gold/30 hover:bg-gold/[0.02] transition-all rounded-sm"
          >
            <span>{stage.secondaryAction.label}</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
