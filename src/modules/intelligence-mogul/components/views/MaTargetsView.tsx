"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Activity, Sparkles } from "lucide-react";
import { MATarget } from "@/modules/intelligence-mogul/types";
import { INITIAL_TARGETS } from "@/modules/intelligence-mogul/data/mock-data";

export default function MaTargetsView() {
  const [targets] = useState<MATarget[]>(INITIAL_TARGETS);
  const [selectedId, setSelectedId] = useState<string>("apex");

  const selectedTarget = targets.find((t) => t.id === selectedId) || targets[0];

  // Post merger projection data: Month 0 to Month 24 (M0, M6, M12, M18, M24)
  const projectionData = [
    { month: "M0", Combined: 88.2, Standalone: 84.2 },
    { month: "M6", Combined: 91.0, Standalone: 85.0 },
    { month: "M12", Combined: 94.6, Standalone: 86.1 },
    { month: "M18", Combined: 97.2, Standalone: 87.0 },
    { month: "M24", Combined: 99.8, Standalone: 88.2 }
  ];

  const drawCircularGauge = (value: number, label: string) => {
    const radius = 32;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    // Map gauge colors to elegant high-contrast Editorial Palette
    let strokeColor = "#FF5A1F"; // Primary highlight orange-red
    if (label.toLowerCase() === "tech debt") {
      strokeColor = "#1A1A1A"; // Tech debt represented in solid warning charcoal
    } else if (label.toLowerCase() === "culture fit") {
      strokeColor = "rgba(26,26,26,0.6)"; // Muted charcoal
    }

    return (
      <div className="flex flex-col items-center p-3 bg-[#FDFCF8] border border-editorial-border/60 rounded-none text-center font-mono">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(26,26,26,0.1)" strokeWidth={strokeWidth} />
            <circle 
              cx="40" 
              cy="40" 
              r={radius} 
              fill="none" 
              stroke={strokeColor} 
              strokeWidth={strokeWidth} 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-sm font-black text-editorial-text">{value}%</span>
        </div>
        <span className="text-[8px] text-editorial-muted font-bold uppercase mt-2 tracking-wider">{label}</span>
      </div>
    );
  };

  return (
    <div id="ma_targets_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      {/* Top Header Selector */}
      <div className="p-5 bg-white rounded-none border border-editorial-border flex flex-col md:flex-row md:items-center justify-between gap-4" id="ma_header_banner">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#FF5A1F] block mb-1 tracking-wider">
            PORTFOLIO PIPELINE DILIGENCE
          </span>
          <h2 className="text-sm font-black uppercase tracking-widest">
            M&A TARGET ANALYSIS — HIGH-CONVICTION INTELLIGENCE
          </h2>
          <p className="text-[10px] text-editorial-muted font-sans mt-1">
            Diligence auditing & autonomous synergy models
          </p>
        </div>

        <div className="text-[10px] text-[#FF5A1F] bg-[#FF5A1F]/10 px-3 py-1.5 rounded-none border border-[#FF5A1F]/20 flex items-center gap-2 font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse"></span>
          <span>DILIGENCE SECURED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="ma_targets_workspace_grid">
        
        {/* Left Columns: Candidates List Table & Score Projections */}
        <div className="lg:col-span-2 space-y-6" id="ma_targets_left_content">
          
          {/* Targets list */}
          <div className="bg-white p-5 rounded-none border border-editorial-border" id="targets_list_container">
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-3 border-b border-editorial-border pb-2">Enterprise Target Diligence</h3>
            <div className="overflow-x-auto" id="targets_table_wrapper">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-editorial-border text-editorial-muted text-[9px] uppercase font-bold tracking-wider">
                    <th className="py-2.5">Target Nominee</th>
                     <th className="py-2.5">Market Signal Score</th>
                    <th className="py-2.5">Cost (EV)</th>
                    <th className="py-2.5">AI Readiness</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border/30 text-editorial-text font-sans">
                  {targets.map((tgt) => (
                    <tr 
                      key={tgt.id} 
                      onClick={() => setSelectedId(tgt.id)}
                      className={`hover:bg-[#FDFCF8] cursor-pointer transition duration-150 ${selectedId === tgt.id ? "bg-[#FDFCF8] border-l-2 border-[#FF5A1F]" : ""}`}
                    >
                      <td className="py-3 font-semibold text-editorial-text font-mono text-[11px] uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedId === tgt.id ? "bg-[#FF5A1F]" : "bg-editorial-border"}`}></span>
                          {tgt.name}
                        </div>
                      </td>
                      <td className="py-3 font-black text-editorial-text font-mono">
                        {tgt.intelligenceScore} / 100
                      </td>
                      <td className="py-3 text-editorial-muted font-mono">{tgt.cost}</td>
                      <td className="py-3">
                        <span className="text-[9px] font-bold px-2 py-0.5 border border-editorial-border bg-[#FDFCF8] text-editorial-text uppercase tracking-wider rounded-none">
                          {tgt.aiReadiness}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          id={`btn_diligence_select_${tgt.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(tgt.id);
                          }}
                          className={`text-[9px] py-1 px-2.5 rounded-none font-bold uppercase transition duration-150 cursor-pointer tracking-wider ${
                            selectedId === tgt.id 
                              ? "bg-editorial-text text-white" 
                              : "bg-[#FDFCF8] text-editorial-muted hover:text-editorial-text border border-editorial-border"
                          }`}
                        >
                          AUDIT_DEEP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Curved Line graph */}
          <div className="bg-white p-5 rounded-none border border-editorial-border" id="post_merger_intelligence_projection">
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-1">
              Intelligence Projection (24 Months)
            </h3>
            <p className="text-[10px] text-editorial-muted mb-4 font-sans leading-relaxed">
              Modeled synergy accruals on corporate integration workflows
            </p>

            <div className="h-60 w-full text-[9px] font-mono" id="projections_chart_wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.1)" opacity={0.5} />
                  <XAxis dataKey="month" stroke="rgba(26,26,26,0.5)" fontSize={9} />
                  <YAxis domain={[80, 105]} stroke="rgba(26,26,26,0.5)" fontSize={9} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26,26,26,0.15)", borderRadius: "0px" }}
                    itemStyle={{ fontSize: 10, color: "#1A1A1A" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Combined" 
                    stroke="#FF5A1F" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Standalone" 
                    stroke="#1A1A1A" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Deep Dive details for target */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="ma_deep_dive_card">
          <div>
            <div className="flex items-center justify-between border-b border-editorial-border pb-3 mb-4">
              <span className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="text-[#FF5A1F]" size={13} />
                Target Deep Dive
              </span>
              <span className="text-[9px] bg-editorial-text border border-editorial-text text-white px-2 py-0.5 rounded-none font-mono uppercase font-bold tracking-wider">
                {selectedTarget.id.toUpperCase()}_INTEL
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-extrabold text-editorial-text uppercase tracking-wide font-mono">{selectedTarget.name}</h4>
                <p className="text-[11px] text-editorial-text font-serif italic leading-relaxed mt-1.5">{selectedTarget.rationale}</p>
              </div>

              {/* Dials layout */}
              <div className="grid grid-cols-3 gap-2 py-2" id="target_circular_gauges">
                {drawCircularGauge(selectedTarget.synergy, "Synergy")}
                {drawCircularGauge(selectedTarget.cultureFit, "Culture Fit")}
                {drawCircularGauge(selectedTarget.techDebt, "Tech Debt")}
              </div>

              {/* Agent Advisory block */}
              <div className="p-4 bg-[#FDFCF8] rounded-none border border-editorial-border text-[10px] space-y-2" id="target_agent_advisory_area">
                <div className="text-editorial-text font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-editorial-border/60 pb-1">
                  <Activity size={11} className="text-[#FF5A1F] animate-pulse" />
                  AGENT ADVISORY LIVE SCANNER
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar pr-1 font-serif italic" id="agent_advisory_logs font-sans">
                  <div className="text-[10px] text-editorial-text leading-relaxed">
                    • Synergy overlap rating computed: <b className="text-[#FF5A1F] font-mono font-black">{selectedTarget.synergy}% OVERLAP</b>
                  </div>
                  <div className="text-[10px] text-editorial-text leading-relaxed">
                    • Technical debt risk rating: <b className="text-editorial-text font-mono font-black">{selectedTarget.techDebt}% IMPRACTICALITIES</b>
                  </div>
                  <div className="text-[10px] text-editorial-muted leading-relaxed">
                    • Estimated Integration Duration: <b className="text-editorial-text font-mono font-black">14 Weeks</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-editorial-border/60 mt-4 flex items-center justify-between text-[10px] text-editorial-muted font-bold uppercase tracking-wider">
            <span>DILIGENCE RATING: A-SECURE</span>
            <span className="text-[#FF5A1F] font-black tracking-widest">100% READY</span>
          </div>
        </div>

      </div>

    </div>
  );
}
