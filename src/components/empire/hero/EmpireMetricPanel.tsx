"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, BarChart3, Database } from "lucide-react";

interface MetricItemProps {
  icon: any;
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "neutral" | "negative";
}

function MetricItem({ icon: Icon, label, value, change, changeType = "positive" }: MetricItemProps) {
  return (
    <div className="flex items-center justify-between p-2.5 border border-white/5 bg-[#05080E] rounded-sm text-left">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-white/[0.02] border border-white/5 text-gold/80 rounded-sm">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/35">{label}</span>
          <span className="text-xs font-mono font-bold text-white tracking-wide">{value}</span>
        </div>
      </div>
      {change && (
        <span className={`text-[8.5px] font-mono font-bold ${changeType === "positive" ? "text-emerald" : "text-white/40"}`}>
          {change}
        </span>
      )}
    </div>
  );
}

export function EmpireMetricPanel() {
  return (
    <div className="space-y-2">
      <MetricItem icon={Globe} label="Total Value Compounding" value="$1.28T" change="+12.4%" />
      <MetricItem icon={Cpu} label="AI Agents Online" value="48 active" change="LOCKED" changeType="neutral" />
      <MetricItem icon={BarChart3} label="Asset Compound Rate" value="1.42x speed" change="+4.2%" />
      <MetricItem icon={Database} label="Sync Pipeline Nodes" value="12,408" change="SYNCED" changeType="neutral" />
    </div>
  );
}
