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
import { SimulationLever, MetricImpact } from "@/modules/intelligence-mogul/types";

export default function SimulationView() {
  const [levers, setLevers] = useState<SimulationLever>({
    automationTarget: 5,
    talentAggregation: 20,
    marketExpansion: "balanced"
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);

  // States that reflect recalculations
  const [currentScore] = useState<number>(84.2);
  const [projectedScore, setProjectedScore] = useState<number>(84.2);

  // Dynamic metrics state
  const [metrics, setMetrics] = useState<MetricImpact[]>([
    { name: "Annual Recurring Revenue (ARR)", current: "$4.20B", projected: "$4.20B", delta: "0.0%", isPositive: true, confidence: 94 },
    { name: "Operating Profit Margin", current: "28.4%", projected: "28.4%", delta: "+0.0%", isPositive: true, confidence: 91 },
    { name: "Support Cost Overhead", current: "$320M", projected: "$320M", delta: "0.0%", isPositive: true, confidence: 95 },
    { name: "User Retention Rate (Churn)", current: "92.0%", projected: "92.0%", delta: "+0.0%", isPositive: true, confidence: 88 }
  ]);

  // Chart data: 6 points representing Month 0, 4, 8, 12, 16, 20, 24
  const [chartData, setChartData] = useState([
    { month: "M0", BaseCase: 84.2, BullCase: 84.2, BearCase: 84.2 },
    { month: "M4", BaseCase: 85.1, BullCase: 86.5, BearCase: 83.0 },
    { month: "M8", BaseCase: 86.2, BullCase: 89.2, BearCase: 81.5 },
    { month: "M12", BaseCase: 87.5, BullCase: 92.1, BearCase: 79.4 },
    { month: "M16", BaseCase: 89.0, BullCase: 94.6, BearCase: 78.0 },
    { month: "M20", BaseCase: 90.4, BullCase: 97.2, BearCase: 76.2 },
    { month: "M24", BaseCase: 91.8, BullCase: 99.4, BearCase: 74.0 }
  ]);

  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Calculate dynamic values based on levers
      const aut = levers.automationTarget;
      const tal = levers.talentAggregation;
      const exp = levers.marketExpansion;

      // Base formula offsets
      let scoreBump = 1.4;
      if (aut > 30) scoreBump += (aut / 25);
      if (tal > 40) scoreBump += (tal / 30);
      if (exp === "aggressive") scoreBump += 4.5;
      if (exp === "conservative") scoreBump -= 1.5;

      const nextScore = parseFloat((84.2 + scoreBump).toFixed(1));
      setProjectedScore(nextScore);

      // ARR calculation
      let arrMultiplier = 1.0;
      if (exp === "aggressive") arrMultiplier += 0.12;
      if (exp === "balanced") arrMultiplier += 0.05;
      if (tal > 50) arrMultiplier += 0.04;
      const nextARR = (4.2 * arrMultiplier).toFixed(2);
      const arrDelta = ((arrMultiplier - 1) * 100).toFixed(1);

      // Margin
      let marginAddition = 0.0;
      if (aut > 20) marginAddition += (aut / 10);
      if (tal > 60) marginAddition -= 1.8; // higher recruitment labor costs
      const nextMargin = (28.4 + marginAddition).toFixed(1);
      const marginDelta = (marginAddition >= 0 ? "+" : "") + marginAddition.toFixed(1) + "%";

      // Support Overhead
      let supportSavings = 0.0;
      if (aut > 10) supportSavings = (aut * 3.2); // reduces cost overhead
      const nextSupport = (320 - supportSavings).toFixed(0);
      const supportDelta = "-" + ((supportSavings / 320) * 100).toFixed(1) + "%";

      // Retention (Churn)
      let churnShift = 0.0;
      if (aut > 60) churnShift -= 2.4; // heavy automation might cause minor client frustration
      if (tal > 30) churnShift += 1.8; // stronger product updates
      const nextChurn = (92.0 + churnShift).toFixed(1);
      const churnDelta = (churnShift >= 0 ? "+" : "") + churnShift.toFixed(1) + "%";

      setMetrics([
        { name: "Annual Recurring Revenue (ARR)", current: "$4.20B", projected: `$${nextARR}B`, delta: `+${arrDelta}%`, isPositive: true, confidence: 93 },
        { name: "Operating Profit Margin", current: "28.4%", projected: `${nextMargin}%`, delta: marginDelta, isPositive: parseFloat(marginDelta) >= 0, confidence: 90 },
        { name: "Support Cost Overhead", current: "$320M", projected: `$${nextSupport}M`, delta: supportDelta, isPositive: true, confidence: 95 },
        { name: "User Retention Rate (Churn)", current: "92.0%", projected: `${nextChurn}%`, delta: churnDelta, isPositive: parseFloat(churnDelta) >= 0, confidence: 87 }
      ]);

      // Regenerate chart curves
      const newChart = [
        { month: "M0", BaseCase: 84.2, BullCase: 84.2, BearCase: 84.2 },
        { month: "M4", BaseCase: parseFloat((85.1 + scoreBump * 0.15).toFixed(1)), BullCase: parseFloat((86.5 + scoreBump * 0.25).toFixed(1)), BearCase: parseFloat((83.0 - scoreBump * 0.1).toFixed(1)) },
        { month: "M8", BaseCase: parseFloat((86.2 + scoreBump * 0.3).toFixed(1)), BullCase: parseFloat((89.2 + scoreBump * 0.5).toFixed(1)), BearCase: parseFloat((81.5 - scoreBump * 0.2).toFixed(1)) },
        { month: "M12", BaseCase: parseFloat((87.5 + scoreBump * 0.5).toFixed(1)), BullCase: parseFloat((92.1 + scoreBump * 0.7).toFixed(1)), BearCase: parseFloat((79.4 - scoreBump * 0.35).toFixed(1)) },
        { month: "M16", BaseCase: parseFloat((89.0 + scoreBump * 0.7).toFixed(1)), BullCase: parseFloat((94.6 + scoreBump * 0.85).toFixed(1)), BearCase: parseFloat((78.0 - scoreBump * 0.5).toFixed(1)) },
        { month: "M20", BaseCase: parseFloat((90.4 + scoreBump * 0.85).toFixed(1)), BullCase: parseFloat((97.2 + scoreBump * 0.95).toFixed(1)), BearCase: parseFloat((76.2 - scoreBump * 0.6).toFixed(1)) },
        { month: "M24", BaseCase: parseFloat((91.8 + scoreBump).toFixed(1)), BullCase: parseFloat((99.4 + scoreBump * 1.05).toFixed(1)), BearCase: parseFloat((74.0 - scoreBump * 0.75).toFixed(1)) }
      ];
      setChartData(newChart);

      setIsRunning(false);
      setHasRun(true);
    }, 1800);
  };

  return (
    <div id="simulation_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      
      {/* Simulation Header */}
      <div className="p-5 bg-white rounded-none border border-editorial-border flex flex-col md:flex-row md:items-center justify-between gap-4" id="sim_header_node">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#FF5A1F] block mb-1 tracking-wider">
            PREDICTIVE MODE INTERACTIVE
          </span>
          <h2 className="text-sm font-black uppercase tracking-widest">
            WHAT-IF SIMULATION ENGINE
          </h2>
          <p className="text-[10px] text-editorial-muted font-sans mt-1">
            Modeling: Corporate Transformation & Autonomous Integration
          </p>
        </div>

        {/* Score delta */}
        <div className="flex bg-[#FDFCF8] p-2 border border-editorial-border rounded-none text-xs gap-3">
          <div>
            <span className="text-editorial-muted text-[8px] block font-bold tracking-wider">CURRENT SCORE</span>
            <span className="text-editorial-text font-black mt-0.5 block">{currentScore}</span>
          </div>
          <div className="border-l border-editorial-border/60 pl-3">
            <span className="text-editorial-muted text-[8px] block font-bold tracking-wider">POST-SIM PROJECTED</span>
            <span className={`font-black mt-0.5 block ${projectedScore > currentScore ? "text-[#FF5A1F]" : "text-editorial-text"}`}>
              {projectedScore} ({projectedScore >= currentScore ? "+" : ""}{(projectedScore - currentScore).toFixed(1)})
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="simulation_workspace_grid">
        
        {/* Left Column: Active Scenario Levers */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="scenario_levers_card">
          <div>
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-4 border-b border-editorial-border pb-2">
              Active Scenario Levers
            </h3>

            <div className="space-y-6">
              {/* Slider 1: Support Automation */}
              <div className="space-y-2" id="lever_support_automation">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-editorial-text font-bold uppercase tracking-wide font-sans">1. Customer Support Automation</span>
                  <span className="text-[#FF5A1F] font-bold">{levers.automationTarget}% TARGET</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={levers.automationTarget}
                  onChange={(e) => setLevers({...levers, automationTarget: parseInt(e.target.value)})}
                  className="w-full accent-[#FF5A1F] bg-[#FDFCF8] border border-editorial-border rounded-none h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-editorial-muted leading-none font-bold uppercase">
                  <span>CURRENT: 5%</span>
                  <span>TARGET: 40% (RECOMMENDED)</span>
                </div>
              </div>

              {/* Slider 2: R&D Aggregation */}
              <div className="space-y-2" id="lever_talent_aggregation">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-editorial-text font-bold uppercase tracking-wide font-sans">2. R&D Talent Aggregation</span>
                  <span className="text-editorial-text font-black">{levers.talentAggregation}% POOL</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={levers.talentAggregation}
                  onChange={(e) => setLevers({...levers, talentAggregation: parseInt(e.target.value)})}
                  className="w-full accent-editorial-text bg-[#FDFCF8] border border-editorial-border rounded-none h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-editorial-muted leading-none font-bold uppercase">
                  <span>CURRENT: 20%</span>
                  <span>GLOBAL LIMIT: 100%</span>
                </div>
              </div>

              {/* Selector 3: Market expansion */}
              <div className="space-y-2" id="lever_market_expansion">
                <span className="text-[10px] text-editorial-text font-bold uppercase tracking-wide block font-sans">3. Market Expansion Strategy</span>
                <div className="grid grid-cols-3 gap-2 font-mono">
                  {(["conservative", "balanced", "aggressive"] as const).map((strat) => (
                    <button
                      key={strat}
                      onClick={() => setLevers({...levers, marketExpansion: strat})}
                      className={`py-1.5 rounded-none text-[9px] uppercase font-bold tracking-wider transition duration-150 border cursor-pointer ${
                        levers.marketExpansion === strat 
                          ? "bg-editorial-text border-editorial-text text-white font-black" 
                          : "bg-[#FDFCF8] border-editorial-border text-editorial-muted hover:text-editorial-text"
                      }`}
                    >
                      {strat}
                    </button>
                  ))}
                </div>
                <p className="text-[8px] text-editorial-muted italic font-sans">Aggressive model deploys 14 APAC caches nodes immediately.</p>
              </div>
            </div>
          </div>

          <button
            id="btn_run_simulation"
            onClick={runSimulation}
            disabled={isRunning}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition duration-200 cursor-pointer ${
              isRunning 
                ? "bg-[#FDFCF8] text-editorial-muted border border-editorial-border pointer-events-none" 
                : "bg-editorial-text hover:bg-[#FF5A1F] text-white font-black border border-editorial-border"
            }`}
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <Activity size={14} className="animate-spin text-editorial-muted" />
                SIMULATING MATRIX NODES...
              </span>
            ) : "RUN SIMULATION ENGINE"}
          </button>
        </div>

        {/* Right Columns: Multi-Outcome Line Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="multi_outcome_chart_container">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-editorial-border pb-3 mb-4 gap-2">
              <div>
                <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest">Multi-Outcome Projection</h3>
                <p className="text-[10px] text-editorial-muted font-sans mt-0.5">24-Month simulation curves across diverging scenarios</p>
              </div>
              <div className="flex text-[9px] gap-3 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></span>Bull Case</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-editorial-text"></span>Base Case</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-editorial-muted"></span>Bear Case</span>
              </div>
            </div>

            {/* Recharts graph */}
            <div className="h-68 w-full font-mono text-[9px]" id="simulation_chart_wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.1)" opacity={0.5} />
                  <XAxis dataKey="month" stroke="rgba(26,26,26,0.5)" fontSize={9} />
                  <YAxis domain={[70, 105]} stroke="rgba(26,26,26,0.5)" fontSize={9} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "rgba(26,26,26,0.15)", borderRadius: "0px" }}
                    labelStyle={{ color: "#1a1a1a", fontWeight: "bold" }}
                    itemStyle={{ fontSize: 10, color: "#1A1A1A" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="BullCase" 
                    stroke="#FF5A1F" 
                    strokeWidth={2} 
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="BaseCase" 
                    stroke="#1A1A1A" 
                    strokeWidth={1.5}
                    dot={{ r: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="BearCase" 
                    stroke="rgba(26,26,26,0.4)" 
                    strokeDasharray="4 4" 
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-[9px] text-[#FF5A1F] uppercase font-bold tracking-wider bg-[#FF5A1F]/5 border border-[#FF5A1F]/15 p-2.5 rounded-none flex items-center justify-between mt-3 font-mono">
            <span>Projection confidence rate: <b>91.5% SLA</b></span>
            <span>Based on Q3 Competitor Aggression Models</span>
          </div>
        </div>

      </div>

      {/* LOWER ROW: Strategy Agent Analysis & Key Metric Impact */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" id="sim_impacts_grid">
        
        {/* Left Column: Strategy Agent Commentary */}
        <div className="xl:col-span-1 bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="sim_agent_commentary">
          <div>
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-3 flex items-center gap-1.5 pb-2 border-b border-editorial-border/60">
              <Sparkles className="text-[#FF5A1F]" size={13} />
              Simulation Agent Analysis
            </h3>
            <p className="text-[11px] text-editorial-text leading-relaxed font-serif italic border-l-2 border-[#FF5A1F] pl-3 py-1">
              {!hasRun ? (
                "Configure scenario levers on the left and click 'RUN SIMULATION ENGINE' to engage the autonomous predictive compiler. Real-time metric deltas and confidence parameters will execute immediately."
              ) : (
                `"Scenario compiled successfully. Automating ${levers.automationTarget}% of customer support combined with R&D Talent adjustments yields a robust profit margin pivot. However, keeping automation above 60% flags potential short-term customer satisfaction friction. Proceed with balanced mitigation."`
              )}
            </p>
          </div>
          <div className="pt-3 border-t border-editorial-border/60 mt-3 flex items-center justify-between text-[10px] text-editorial-muted font-bold uppercase tracking-wider">
            <span>MODEL: SCENARIO A-40</span>
            <span>VERIFIED SYNC</span>
          </div>
        </div>

        {/* Right Columns: Key Metric Impact table */}
        <div className="xl:col-span-2 bg-white p-5 rounded-none border border-editorial-border" id="metric_impact_table_card">
          <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-3 border-b border-editorial-border pb-2">
            Key Metric Impact: Scenario A-40
          </h3>

          <div className="overflow-x-auto" id="metric_impact_table_wrapper">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-editorial-border text-editorial-muted text-[9px] uppercase font-bold tracking-wider">
                  <th className="py-2">Performance Metrics</th>
                  <th className="py-2">Current State</th>
                  <th className="py-2 text-[#FF5A1F] font-black">Projected State</th>
                  <th className="py-2">Delta %</th>
                  <th className="py-2 text-right">Model Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial-border/30 text-editorial-text font-serif">
                {metrics.map((row, i) => (
                  <tr key={i} className="hover:bg-[#FDFCF8] transition duration-150">
                    <td className="py-3 font-semibold text-editorial-text font-sans uppercase text-[10px] tracking-wide">{row.name}</td>
                    <td className="py-3 text-editorial-muted font-mono">{row.current}</td>
                    <td className="py-3 text-[#FF5A1F] font-black font-mono">{row.projected}</td>
                    <td className={`py-3 font-bold font-mono ${row.isPositive ? "text-[#FF5A1F]" : "text-editorial-text"}`}>
                      {row.delta}
                    </td>
                    <td className="py-3 text-right text-editorial-muted font-mono">{row.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
