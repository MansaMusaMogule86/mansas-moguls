"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  CheckSquare,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";
import { INITIAL_TIMELINE } from "@/modules/intelligence-mogul/data/mock-data";

export default function StabilizationReportView() {
  const drawDial = (value: number, label: string, desc: string) => {
    const radius = 38;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center p-5 bg-[#FDFCF8] border border-editorial-border/60 rounded-none text-center" id="stabilization_equilibrium_dial">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(26,26,26,0.1)" strokeWidth={strokeWidth} />
            <circle 
              cx="48" 
              cy="48" 
              r={radius} 
              fill="none" 
              stroke="#FF5A1F" 
              strokeWidth={strokeWidth} 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="animate-pulse"
            />
          </svg>
          <span className="absolute text-base font-black text-editorial-text">{value}%</span>
        </div>
        <span className="text-[9px] text-editorial-muted font-bold uppercase tracking-wider mt-2">{label}</span>
        <span className="text-[10px] text-[#FF5A1F] font-black mt-1 font-mono uppercase tracking-widest">{desc}</span>
      </div>
    );
  };

  const telemetryComparison = [
    { metric: "Developer Turnover Rate", pre: "18.4% Annually", post: "4.2% Estimated", target: "Sub-5.0%", status: "OPTIMIZED", color: "text-[#FF5A1F]" },
    { metric: "Sprint Velocity Standard", pre: "74.1 Story Pts", post: "88.5 Story Pts", target: "85.0 Pts Min", status: "STABILIZED", color: "text-editorial-text" },
    { metric: "Database Ingestion Latency", pre: "142ms Avg", post: "14.1ms Avg", target: "Sub-20ms", status: "STABILIZED", color: "text-editorial-text" },
    { metric: "Core AWS Ingress Latency", pre: "98.4ms Avg", post: "12.8ms Avg", target: "Sub-15ms", status: "STABILIZED", color: "text-[#FF5A1F]" },
    { metric: "Security Shard Firewalls", pre: "Stale SSL", post: "SSO Tunnel v3", target: "Active proxy", status: "VERIFIED", color: "text-[#FF5A1F]" },
  ];

  return (
    <div id="stabilization_report_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      {/* Top Header Selector */}
      <div className="p-5 bg-white rounded-none border border-editorial-border flex flex-col md:flex-row md:items-center justify-between gap-4" id="report_header_banner">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#FF5A1F] block mb-1 tracking-wider">
            INTELLIGENCE AUDITS REPORT
          </span>
          <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            STABILIZATION REPORT: <span className="text-[#FF5A1F] font-serif italic">SR-902 ASSURANCE</span>
          </h2>
          <p className="text-[10px] text-editorial-muted font-sans mt-1">
            Diligence auditing & telemetry verification post-intervention
          </p>
        </div>

        <div className="text-[10px] text-[#FF5A1F] bg-[#FF5A1F]/10 px-3 py-1.5 rounded-none border border-[#FF5A1F]/20 flex items-center gap-2 font-bold tracking-wider uppercase">
          <Clock size={12} className="text-[#FF5A1F] animate-pulse" />
          <span>VERIFICATION SECURED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="report_workspace_grid">
        
        {/* Left Columns: Timeline of Intervention Logs & Metrics Comparisons */}
        <div className="lg:col-span-2 space-y-6" id="report_left_content">
          
          {/* Timeline Table */}
          <div className="bg-white p-5 rounded-none border border-editorial-border" id="timeline_logs_card">
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-1.5 pb-2 border-b border-editorial-border">
              Timeline of Intervention — SR-902
            </h3>
            <p className="text-[10px] text-editorial-muted font-sans mb-4">
              Cryptographical chronology record mapping system adjustments
            </p>

            <div className="space-y-3" id="timeline_scroller">
              {INITIAL_TIMELINE.map((log, idx) => (
                <div 
                  key={idx} 
                  className="p-4 bg-[#FDFCF8] rounded-none border border-editorial-border hover:border-[#FF5A1F]/40 transition duration-155 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs leading-relaxed"
                >
                  <div className="space-y-1.5 max-w-[80%] font-sans">
                    <span className="text-[9px] font-mono font-bold text-[#FF5A1F] px-2 py-0.5 rounded-none bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 uppercase tracking-widest">
                      {log.time}
                    </span>
                    <p className="text-[11px] text-editorial-text font-serif italic mt-1">{log.event}</p>
                    <span className="inline-block text-[9px] text-[#FF5A1F]/80 font-mono">
                      Operator ID: <b className="text-editorial-text font-black font-mono">{log.actor}</b>
                    </span>
                  </div>
                  <div className="shrink-0 text-right font-mono">
                    <span className="text-[8px] text-editorial-muted font-bold block uppercase tracking-wider">BLOCK_HASH</span>
                    <span className="text-[9px] text-[#FF5A1F] font-bold block">{log.hash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparative Telemetry Table */}
          <div className="bg-white p-5 rounded-none border border-editorial-border" id="comparative_telemetry_table_card">
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-3 border-b border-editorial-border pb-2 animate-none">
              Comparative Telemetry Verification
            </h3>
            <div className="overflow-x-auto" id="comparative_telemetry_wrapper flex-grow">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-editorial-border text-editorial-muted text-[10px] uppercase font-bold tracking-wider">
                    <th className="py-2.5">System Telemetry Matrix</th>
                    <th className="py-2.5">Pre-Intervention</th>
                    <th className="py-2.5 text-[#FF5A1F] font-black">Post-Intervention</th>
                    <th className="py-2.5">Target Metric</th>
                    <th className="py-2.5 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border/30 text-editorial-text">
                  {telemetryComparison.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FDFCF8] transition duration-150">
                      <td className="py-3 font-semibold text-editorial-text uppercase text-[10px] tracking-wide">{row.metric}</td>
                      <td className="py-3 text-editorial-muted font-mono">{row.pre}</td>
                      <td className="py-3 text-[#FF5A1F] font-black font-mono">{row.post}</td>
                      <td className="py-3 text-editorial-muted font-mono">{row.target}</td>
                      <td className="py-3 text-right">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-none border tracking-wider uppercase ${
                          row.status === "OPTIMIZED" 
                            ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/30" 
                            : "bg-editorial-text border-editorial-text text-white font-black"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Stabilization dial details */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="report_right_content">
          <div>
            <div className="flex items-center justify-between border-b border-editorial-border pb-3 mb-4">
              <span className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center gap-1.5 font-display">
                <CheckSquare size={14} className="text-[#FF5A1F]" />
                System Assessments
              </span>
              <span className="text-[10px] font-mono text-editorial-muted font-bold uppercase tracking-wider">82% Equilibrium</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-extrabold text-editorial-text uppercase tracking-wide font-mono">Autonomous Mitigation File</h4>
                <p className="text-[11px] text-editorial-text leading-relaxed mt-1.5 font-serif italic">
                  The intervention logs generated by Sentinel verify zero duplicate postgres schemas, and a positive talent retention compensation adjustment. System stressors dismissed.
                </p>
              </div>

              {/* Dial gauge layout */}
              <div className="flex justify-center py-2">
                {drawDial(82, "System Equilibrium", "System Stabilized")}
              </div>

              {/* Sub metrics list */}
              <div className="space-y-3 pt-2" id="assessment_sub_metrics font-mono text-[10px]">
                <div className="flex justify-between items-center text-[10px] border-b border-editorial-border/60 pb-2">
                  <span className="text-editorial-muted font-bold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <Users size={12} className="text-editorial-text" />
                    Developer Retention
                  </span>
                  <span className="text-[#FF5A1F] font-black">84% ALIGNMENT</span>
                </div>

                <div className="flex justify-between items-center text-[10px] border-b border-editorial-border/60 pb-2">
                  <span className="text-editorial-muted font-bold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <TrendingUp size={12} className="text-editorial-text" />
                    Sprint Velocity Standard
                  </span>
                  <span className="text-[#FF5A1F] font-black">76% ALIGNMENT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-editorial-border/60 mt-4 flex items-center justify-between text-[10px] text-editorial-muted font-bold uppercase tracking-wider">
            <span>MUTATION FILE_ID: {INITIAL_TIMELINE[INITIAL_TIMELINE.length - 1].hash}</span>
            <span className="text-[#FF5A1F] font-black">MUTATION_SUCCESS</span>
          </div>
        </div>

      </div>

    </div>
  );
}
