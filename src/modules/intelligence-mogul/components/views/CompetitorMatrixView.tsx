"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Radio,
  Layers,
  Sparkles
} from "lucide-react";
import { Signal, CrawlAgent } from "@/modules/intelligence-mogul/types";
import { INITIAL_SIGNALS, INITIAL_AGENTS } from "@/modules/intelligence-mogul/data/mock-data";

export default function CompetitorMatrixView() {
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [agents] = useState<CrawlAgent[]>(INITIAL_AGENTS);
  const [counterplanText, setCounterplanText] = useState<string>("");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // Simulate incoming live alerts/signals periodically
  useEffect(() => {
    const alertLibrary = [
      "Competitor A registered 2 new patents on compressed attention mechanics, aiming at low-bandwidth edge deployment.",
      "Venture funding alert: Competitor B raised $120M Series C led by Sovereign Wealth Funds.",
      "Official pricing change: Competitor C reduced deep inference costs by 15% across global servers.",
      "System alert: Crawled 4 major GitHub contributions related to Competitor C's local agent compiler."
    ];

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * alertLibrary.length);
      const newSignal: Signal = {
        id: `sig_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) + " UTC",
        category: "COMPETITOR",
        sentiment: Math.random() > 0.5 ? "CRITICAL" : "BULLISH",
        source: "Agent_Crawler_X",
        text: alertLibrary[idx]
      };
      setSignals((prev) => [newSignal, ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const triggerCounterplanGeneration = () => {
    setIsSynthesizing(true);
    setCounterplanText("Initializing Core Counterplan Compiler...");
    setTimeout(() => {
      setCounterplanText("Compiling Competitor C vacancies telemetry...");
      setTimeout(() => {
        setCounterplanText(
          "TACTICAL REPORT CODENAME: COUNTER_VECTOR_X\n" +
          "1. DEPLOYMENT TARGET: Accelerate Aether Edge Seattle regional caching by 14 days, bypassing standard deployment queues.\n" +
          "2. TALENT ACQUISITION: Dispatched anonymous recruitment pipelines targeting Competitor C software architects using equity retention matching pools ($3.2M allocated).\n" +
          "3. PRICING OFFENSIVE: Initiate absolute zero-cost inference for first 50M tokens across Seattle sub-region, neutralizing Competitor A's zero-cost trial campaign."
        );
        setIsSynthesizing(false);
      }, 1500);
    }, 1000);
  };

  const featureComparison = [
    { metric: "LLM Context Window", core: "2.0M tokens", compA: "500k tokens", compB: "1.0M tokens", compC: "2.0M tokens", priority: "MATCHED" },
    { metric: "Inference Latency", core: "4.2ms / tok", compA: "12.8ms / tok", compB: "8.5ms / tok", compC: "4.5ms / tok", priority: "AHEAD" },
    { metric: "Data Sovereignty", core: "Distributed Postgres", compA: "Centralized AWS", compB: "Multi-tenant", compC: "Sovereign Shards", priority: "SECURE" },
    { metric: "API Cost (1k tokens)", core: "$0.00015", compA: "$0.00045", compB: "$0.00028", compC: "$0.00016", priority: "AHEAD" },
    { metric: "Global Edge Nodes", core: "14 Nodes", compA: "3 Nodes", compB: "8 Nodes", compC: "11 Nodes", priority: "LEAD" },
    { metric: "Market Signal Score ID", core: "94.2 (BULL)", compA: "81.0 (HOLD)", compB: "64.5 (BEAR)", compC: "91.8 (BULL)", priority: "MUTED" }
  ];

  const moatAnalysis = [
    { vector: "Predictive AI Engines", maturity: "Advanced v2", demand: "High (Enterprise)", risk: "LOW_RISK", color: "text-[#FF5A1F]" },
    { vector: "Cyber Hardened Proxies", maturity: "Restricted Tunnel", demand: "Critical (Gov/Fin)", risk: "VERIFIED", color: "text-editorial-text" },
    { vector: "Sub-12ms Edge Caching", maturity: "Deploying Seattle", demand: "Heavy (IoT/Apps)", risk: "FLAGGED", color: "text-[#FF5A1F]" },
    { vector: "Sovereign Ledger Synced", maturity: "v3 DB Tunnels", demand: "Regulated markets", risk: "VERIFIED", color: "text-[#FF5A1F]" },
    { vector: "Local Model Distillation", maturity: "7B candidate", demand: "General use", risk: "PENDING", color: "text-editorial-text" }
  ];

  return (
    <div id="competitor_matrix_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      
      {/* Upper Direct Feature Comparison table */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6" id="competitor_grid_layout">
        
        {/* Comparison table panel */}
        <div className="xl:col-span-3 bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="direct_comparison_panel">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-editorial-border pb-3 mb-4 gap-2">
              <div>
                <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest">Direct Feature Comparison</h3>
                <p className="text-[10px] text-editorial-muted font-sans mt-1">Cross-referencing core capabilities against high-priority market rivals</p>
              </div>
              <span className="text-[9px] bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/25 px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider">
                Sentiment: Leading
              </span>
            </div>
 
            {/* Direct Feature Comparison Table */}
            <div className="overflow-x-auto" id="direct_comparison_table_wrapper">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-editorial-border text-editorial-muted text-[9px] uppercase font-bold tracking-wider">
                    <th className="py-2.5">Strategic Vectors</th>
                    <th className="py-2.5 text-[#FF5A1F] font-black">Core Alpha (US)</th>
                    <th className="py-2.5">Competitor A</th>
                    <th className="py-2.5">Competitor B</th>
                    <th className="py-2.5 text-editorial-text font-black">Competitor C</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border/30 text-editorial-text font-sans">
                  {featureComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FDFCF8] transition duration-150">
                      <td className="py-3 font-bold text-editorial-text font-mono text-[11px] uppercase tracking-wide">{row.metric}</td>
                      <td className="py-3 text-[#FF5A1F] font-black">{row.core}</td>
                      <td className="py-3 text-editorial-muted text-[11px] font-mono">{row.compA}</td>
                      <td className="py-3 text-editorial-muted text-[11px] font-mono">{row.compB}</td>
                      <td className="py-3 text-editorial-text font-extrabold">{row.compC}</td>
                      <td className="py-3 text-right">
                        <span className={`text-[9px] font-bold px-2 py-0.5 border uppercase tracking-wider rounded-none ${
                          row.priority === "AHEAD" 
                            ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/35"
                            : row.priority === "SECURE"
                            ? "bg-editorial-text text-white border-editorial-text"
                            : "bg-[#FDFCF8] text-editorial-muted border-editorial-border"
                        }`}>
                          {row.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
          <div className="pt-3 border-t border-editorial-border/60 flex items-center justify-between text-[10px] text-editorial-muted mt-4 uppercase font-bold tracking-wider">
            <span>Response standard: <b className="text-editorial-text">sub-5ms SLA validated</b></span>
            <span>Last Checked Q3 Financial Reports</span>
          </div>
        </div>
 
        {/* Right Live Signals Feed */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col h-full" id="live_signals_feed">
          <div className="flex items-center justify-between border-b border-editorial-border pb-3 mb-3">
            <span className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center gap-1.5">
              <Radio size={13} className="text-[#FF5A1F] animate-pulse" />
              Live Signals
            </span>
            <span className="text-[9px] bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/20 px-1.5 py-0.5 rounded-none font-mono font-bold tracking-wider animate-pulse">
              LIVE_STREAM
            </span>
          </div>
 
          <div className="space-y-3 overflow-y-auto max-h-80 custom-scrollbar pr-1 flex-grow animate-pulse-subtle" id="signals_scroller">
            {signals.map((sig) => (
              <div 
                key={sig.id} 
                id={`signal_item_${sig.id}`}
                className="p-3 bg-[#FDFCF8] rounded-none border border-editorial-border/60 hover:border-[#FF5A1F]/60 transition duration-155 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                  <span className={`font-bold px-1.5 py-0.5 border ${
                    sig.sentiment === "CRITICAL" 
                      ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/30" 
                      : sig.sentiment === "BULLISH"
                      ? "bg-editorial-text border-editorial-text text-white"
                      : "bg-[#FDFCF8] text-editorial-muted border-editorial-border"
                  }`}>
                    {sig.sentiment}
                  </span>
                  <span className="text-editorial-muted font-bold">{sig.timestamp}</span>
                </div>
                <p className="text-[10px] text-editorial-text font-serif italic leading-relaxed">{sig.text}</p>
                <div className="text-[8px] text-editorial-muted font-bold tracking-wider uppercase text-right">
                  SOURCE: <u>{sig.source}</u>
                </div>
              </div>
            ))}
          </div>
        </div>
 
      </div>
 
      {/* LOWER ROW: Heatmap & Synthesis Block */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" id="competitor_synthesis_grid">
        
        {/* Deep Moat Analysis matrix */}
        <div className="xl:col-span-2 bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="moat_analysis_matrix">
          <div>
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-4 border-b border-editorial-border pb-2 flex items-center gap-2">
              <Layers size={14} className="text-[#FF5A1F]" />
              Strategic Moat Analysis Matrix
            </h3>
 
            <div className="overflow-x-auto" id="moat_table_wrapper">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-editorial-border text-editorial-muted text-[9px] uppercase font-bold tracking-wider">
                    <th className="py-2.5">Maturity Vector</th>
                    <th className="py-2.5">Enterprise Demand</th>
                    <th className="py-2.5">Current Maturity State</th>
                    <th className="py-2.5 text-right">Moat Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border/30 text-editorial-text font-sans">
                  {moatAnalysis.map((moat, i) => (
                    <tr key={i} className="hover:bg-[#FDFCF8] transition duration-150">
                      <td className="py-3 font-bold text-editorial-text font-mono text-[11px] uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></span>
                        {moat.vector}
                      </td>
                      <td className="py-3 text-editorial-muted text-[11px] font-bold">{moat.demand}</td>
                      <td className="py-3 font-bold text-editorial-text font-mono text-[11px] uppercase tracking-wide">{moat.maturity}</td>
                      <td className="py-3 text-right">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded-none uppercase tracking-wider ${
                          moat.risk === "LOW_RISK" 
                            ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/30"
                            : moat.risk === "VERIFIED"
                            ? "bg-editorial-text border-the-editorial text-white"
                            : moat.risk === "FLAGGED"
                            ? "bg-[#FF5A1F] border-[#FF5A1F] text-white"
                            : "bg-[#FDFCF8] text-editorial-muted border-editorial-border"
                        }`}>
                          {moat.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
          <div className="text-[9px] text-editorial-muted font-bold uppercase tracking-wider border-t border-editorial-border/40 pt-3 mt-4">
            Security audit handshakes synchronized globally. Milvus storage node telemetry confirmed.
          </div>
        </div>
 
        {/* Rival Synthesis / Counterplan Prompt Block */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="rival_synthesis_container">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-editorial-border/60">
              <span className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="text-[#FF5A1F]" size={13} />
                Intelligence Rival Synthesis
              </span>
              <span className="text-[9px] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-1.5 py-0.5 text-[#FF5A1F] font-bold uppercase tracking-wider">Agentic AI</span>
            </div>
 
            <p className="text-[11px] text-editorial-text leading-relaxed font-serif italic border-l-2 border-[#FF5A1F] pl-3 py-1">
              &ldquo;Competitor C&apos;s hiring patterns indicate an aggressive move to capture Seattle edge caching contracts. Immediate counter-offensive is recommended to isolate local clients and defend regional market premium.&rdquo;
            </p>
 
            {counterplanText && (
              <div className="mt-3 p-3 bg-[#FDFCF8] border border-editorial-border text-[10px] text-editorial-text font-mono whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto custom-scrollbar" id="dynamic_counterplan_log">
                {counterplanText}
              </div>
            )}
          </div>
 
          <button
            id="btn_generate_counterplan"
            onClick={triggerCounterplanGeneration}
            disabled={isSynthesizing}
            className={`w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition duration-200 cursor-pointer ${
              isSynthesizing 
                ? "bg-[#FDFCF8] text-editorial-muted border border-editorial-border pointer-events-none" 
                : "bg-editorial-text hover:bg-[#FF5A1F] font-black text-white border border-editorial-border"
            }`}
          >
            {isSynthesizing ? "COMPILING COUNTERPLAN..." : "GENERATE COMPETITOR COUNTERPLAN"}
          </button>
        </div>
 
      </div>
 
      {/* ACTIVE INTELLIGENCE CRAWLER AGENTS METRICS */}
      <div className="bg-white p-5 rounded-none border border-editorial-border" id="intelligence_agents_panel">
        <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-3">Active Intelligence Bots</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="intelligence_agents_grid">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              id={`agent_box_${agent.id}`}
              className="p-3.5 bg-[#FDFCF8] rounded-none border border-editorial-border/60 hover:border-[#FF5A1F] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-2 font-mono">
                  <span className="text-editorial-text font-bold uppercase tracking-wide">{agent.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 border ${
                    agent.status === "ACTIVE" 
                      ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/30" 
                      : "bg-[#FDFCF8] text-editorial-muted border-editorial-border"
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <p className="text-[10px] text-editorial-muted font-sans leading-relaxed mb-2">{agent.activity}</p>
              </div>
              <div className="text-[9px] text-[#FF5A1F] font-bold uppercase tracking-wider">
                THROUGHPUT: {agent.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
 
    </div>
  );
}
