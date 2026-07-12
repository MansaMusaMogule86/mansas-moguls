"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Network,
  MapPin,
  Cpu,
  Share2,
  Zap
} from "lucide-react";

export default function CompanyTwinView() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"trace" | "render">("trace");
  const [, setPulseCount] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Trigger cyclical pulse effects to simulate high-frequency active queries
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => (prev + 1) % 100);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { id: "rev", label: "REVENUE ENGINE", val: "$4.1B ARR", cx: 200, cy: 155, color: "#FF5A1F", desc: "Core subscriptions and scalable API quotas" },
    { id: "cust", label: "CUSTOMER CLUSTER", val: "92% Retention", cx: 380, cy: 110, color: "#1A1A1A", desc: "Enterprise renewals and localized deployment telemetry" },
    { id: "sec", label: "SECURITY SHARDS", val: "SSO v3 Active", cx: 180, cy: 260, color: "#FF5A1F", desc: "Role-Based Access Controls & Cloudflare edge protection" },
    { id: "cloud", label: "CLOUD CORE (AWS/K8s)", val: "99.98% SLA", cx: 320, cy: 280, color: "#555555", desc: "Kubernetes containers across 3 active region clusters" },
    { id: "rag", label: "VECTOR VAULT", val: "4B Embeddings", cx: 500, cy: 200, color: "#FF5A1F", desc: "Enterprise knowledge-base RAG index" }
  ];

  const connections = [
    { from: "rev", to: "cust" },
    { from: "rev", to: "sec" },
    { from: "cust", to: "cloud" },
    { from: "sec", to: "cloud" },
    { from: "cust", to: "rag" },
    { from: "cloud", to: "rag" }
  ];

  const traceLogs = [
    { time: "11:58:12", log: "Telemetry connection refreshed successfully" },
    { time: "11:54:05", log: "RAG index queried: 1,410 vectors verified" },
    { time: "11:50:33", log: "Kubernetes node stress index evaluated: Stable" },
    { time: "11:42:19", log: "Public sentiment crawled: 79% positive index" }
  ];

  return (
    <div id="company_twin_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      {/* Top Identity Banner */}
      <div className="p-5 bg-white rounded-none border border-editorial-border flex flex-col md:flex-row md:items-center justify-between gap-4" id="twin_identity_banner">
        <div>
          <span className="text-[9px] uppercase font-bold text-[#FF5A1F] flex items-center gap-1.5 mb-1.5 tracking-wider">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse"></span>
            ACTIVE NETWORK SYNCHRONIZATION
          </span>
          <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            VALIDATED COMPANY TWIN: <span className="text-[#FF5A1F] font-serif italic">NeuralLink Dynamics Corp.</span>
          </h2>
          <p className="text-[10px] text-editorial-muted font-sans mt-1">
            Crawled 12 minutes ago • Identity Hash: <span className="text-editorial-text font-semibold">0x7E4FFB9B22F9AC12</span>
          </p>
        </div>

        {/* Score Badges */}
        <div className="flex items-center gap-4">
          {/* Intelligence score widget */}
          <div className="flex items-center gap-2 bg-[#FDFCF8] p-2 px-3 rounded-none border border-editorial-border">
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Outer stroke dial */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(26,26,26,0.1)" strokeWidth="2" />
                <circle cx="16" cy="16" r="14" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="7" />
              </svg>
              <span className="text-[10px] font-black text-editorial-text">94</span>
            </div>
            <div>
              <span className="text-editorial-muted text-[8px] block leading-none uppercase font-bold tracking-wider">INTELLIGENCE SCORE</span>
              <span className="text-editorial-text font-extrabold text-[11px] block mt-1">94.2 / 100</span>
            </div>
          </div>

          {/* AI Readiness */}
          <div className="flex items-center gap-2 bg-[#FDFCF8] p-2 px-3 rounded-none border border-editorial-border">
            <div className="w-8 h-8 rounded-none bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 flex items-center justify-center text-[#FF5A1F]">
              <Zap size={14} className="animate-pulse" />
            </div>
            <div>
              <span className="text-editorial-muted text-[8px] block leading-none uppercase font-bold tracking-wider">AI READINESS</span>
              <span className="text-[#FF5A1F] font-extrabold text-[11px] block mt-1">A+ PLATINUM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Twin Graph & Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="twin_graph_n_scorecard_grid">
        
        {/* Left Neural Workspace */}
        <div className="lg:col-span-2 bg-white p-5 rounded-none border border-editorial-border flex flex-col" id="neural_knowledge_workspace">
          
          {/* Header & Tabs */}
          <div className="flex items-center justify-between border-b border-editorial-border/60 pb-3 mb-4">
            <div>
              <span className="text-xs font-bold text-editorial-text uppercase tracking-wider flex items-center gap-2">
                <Network size={14} className="text-[#FF5A1F]" />
                Neural Knowledge Graph
              </span>
              <p className="text-[10px] text-editorial-muted">Autonomous tracing of enterprise structures & workflows</p>
            </div>

            <div className="flex bg-[#FDFCF8] border border-editorial-border text-[9px] p-0.5 rounded-none">
              <button 
                onClick={() => setActiveWorkspaceTab("trace")}
                className={`px-3 py-1 rounded-none transition cursor-pointer font-bold uppercase tracking-wider ${activeWorkspaceTab === "trace" ? "bg-[#FF5A1F] text-white" : "text-editorial-muted hover:text-editorial-text"}`}
              >
                LIVE TRACE
              </button>
              <button 
                onClick={() => setActiveWorkspaceTab("render")}
                className={`px-3 py-1 rounded-none transition cursor-pointer font-bold uppercase tracking-wider ${activeWorkspaceTab === "render" ? "bg-[#FF5A1F] text-white" : "text-editorial-muted hover:text-editorial-text"}`}
              >
                3D RENDER
              </button>
            </div>
          </div>

          {/* Interactive Screen Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
            {/* Live trace activity logger */}
            <div className="md:col-span-1 bg-[#FDFCF8] p-3 border border-editorial-border flex flex-col justify-between" id="twin_telemetry_logs">
              <div>
                <span className="text-[9px] font-bold text-editorial-text uppercase tracking-widest block border-b border-editorial-border pb-1 mb-2">
                  TRACING PROTOCOL
                </span>
                <div className="space-y-2.5">
                  {traceLogs.map((log, idx) => (
                    <div key={idx} className="text-[9px] leading-tight font-sans">
                      <span className="text-[#FF5A1F] block font-mono font-bold">{log.time}</span>
                      <span className="text-editorial-text">{log.log}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-editorial-border/60 text-[8px] text-[#FF5A1F] uppercase font-bold tracking-wider">
                CORRELATION: <b className="text-editorial-text font-black">98.1%</b>
              </div>
            </div>

            {/* Neural Map Canvas Display */}
            <div className="md:col-span-2 relative h-80 bg-[#FDFCF8] border border-editorial-border rounded-none overflow-hidden flex items-center justify-center select-none" id="neural_nodes_view">
              
              {/* Pulsing Background Radar Grid Lines */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-52 h-52 border border-editorial-border/60 rounded-full animate-ping absolute" style={{ animationDuration: "12s" }}></div>
                <div className="w-68 h-68 border border-editorial-border rounded-full absolute"></div>
                <div className="w-36 h-36 border border-editorial-border/40 rounded-full absolute"></div>
              </div>

              {activeWorkspaceTab === "trace" ? (
                /* Pure SVG Connected Nodes map */
                <svg className="w-full h-full absolute inset-0 text-editorial-text font-mono">
                  {/* Drawing connecting lines */}
                  {connections.map((conn, idx) => {
                    const fromNode = nodes.find(n => n.id === conn.from);
                    const toNode = nodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;
                    return (
                      <line
                        key={idx}
                        x1={fromNode.cx}
                        y1={fromNode.cy}
                        x2={toNode.cx}
                        y2={toNode.cy}
                        stroke="rgba(26,26,26,0.15)"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    );
                  })}

                  {/* Highlight current links on hover */}
                  {hoveredNode && nodes.find(n => n.id === hoveredNode) && (
                    <circle
                      cx={nodes.find(n => n.id === hoveredNode)!.cx}
                      cy={nodes.find(n => n.id === hoveredNode)!.cy}
                      r="16"
                      fill="none"
                      stroke="#FF5A1F"
                      strokeWidth="1.5"
                      className="animate-ping"
                      style={{ animationDuration: "2:5s" }}
                    />
                  )}

                  {/* Rendering Nodes */}
                  {nodes.map((node) => (
                    <g 
                      key={node.id} 
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="8"
                        fill={node.color}
                        opacity="0.9"
                      />
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="12"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        opacity="0.4"
                      />
                      <text
                        x={node.cx + 12}
                        y={node.cy + 4}
                        fill="#1A1A1A"
                        fontSize="9px"
                        fontWeight="bold"
                      >
                        {node.label}
                      </text>
                      <text
                        x={node.cx + 12}
                        y={node.cy + 14}
                        fill="rgba(26,26,26,0.6)"
                        fontSize="8px"
                      >
                        {node.val}
                      </text>
                    </g>
                  ))}
                </svg>
              ) : (
                /* Three-dimensional mock rotation visualization */
                <div className="text-center font-mono space-y-4">
                  <div className="relative w-36 h-36 border-4 border-dashed border-[#FF5A1F]/40 rounded-full animate-spin flex items-center justify-center p-2" style={{ animationDuration: "15s" }}>
                    <div className="w-24 h-24 border-2 border-editorial-border rounded-full animate-pulse flex items-center justify-center">
                      <Network size={28} className="text-[#FF5A1F]" />
                    </div>
                  </div>
                  <span className="text-[10px] text-editorial-muted uppercase tracking-widest block font-bold">
                    3D SPIN MATRIX SYNCHRONIZED
                  </span>
                </div>
              )}

              {/* Node description overlay on hover */}
              {hoveredNode && (
                <div className="absolute bottom-3 left-3 right-3 bg-white p-3 rounded-none border border-[#1A1A1A]/20 shadow-lg text-[10px] space-y-1">
                  <div className="font-black text-[#FF5A1F] uppercase tracking-wide">
                    {nodes.find(n => n.id === hoveredNode)?.label} — {nodes.find(n => n.id === hoveredNode)?.val}
                  </div>
                  <p className="text-editorial-text font-sans">{nodes.find(n => n.id === hoveredNode)?.desc}</p>
                </div>
              )}
            </div>

            {/* Corporate Tech Stacks list */}
            <div className="md:col-span-1 bg-[#FDFCF8] p-3 border border-editorial-border flex flex-col justify-between" id="twin_system_tech_stacks">
              <div>
                <span className="text-[9px] font-bold text-editorial-text uppercase tracking-widest block border-b border-editorial-border pb-1 mb-2">
                  VERIFIED STACKS
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-editorial-text font-bold block leading-none uppercase">Kubernetes</span>
                    <span className="text-editorial-muted text-[8px] font-sans">AWS, 3 regions</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-editorial-text font-bold block leading-none uppercase">PostgreSQL</span>
                    <span className="text-editorial-muted text-[8px] font-sans">Distributed RDS shards</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-editorial-text font-bold block leading-none uppercase">Vector DB</span>
                    <span className="text-editorial-muted text-[8px] font-sans">Milvus clusters</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-editorial-text font-bold block leading-none uppercase">SAP S/4HANA</span>
                    <span className="text-editorial-muted text-[8px] font-sans">Enterprise SAP sync</span>
                  </div>
                </div>
              </div>
              <div className="text-[8px] text-[#FF5A1F] uppercase font-bold tracking-wider">
                COMPUTE_LOAD: STABLE
              </div>
            </div>
          </div>
        </div>

        {/* Right AI Scorecard Panel */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="twin_readiness_scorecard">
          <div>
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-4 border-b border-editorial-border pb-2">
              AI Readiness Scorecard
            </h3>

            <div className="space-y-4">
              {/* Hygiene */}
              <div className="space-y-1.5" id="scorecard_hygiene">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-editorial-text font-bold uppercase tracking-wide">1. Data Hygiene</span>
                  <span className="text-[#FF5A1F] font-bold uppercase">98% OPTIMIZED</span>
                </div>
                <div className="w-full bg-[#FDFCF8] h-2 border border-editorial-border overflow-hidden">
                  <div className="bg-[#FF5A1F] h-full" style={{ width: "98%" }}></div>
                </div>
                <p className="text-[9px] text-editorial-muted leading-relaxed font-sans">No duplicate schemas detected across CRM. Milvus indexed.</p>
              </div>

              {/* Cloud native */}
              <div className="space-y-1.5" id="scorecard_cloud_native">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-editorial-text font-bold uppercase tracking-wide">2. Cloud Native Infrastructure</span>
                  <span className="text-editorial-text font-bold uppercase">72% ROBUST</span>
                </div>
                <div className="w-full bg-[#FDFCF8] h-2 border border-editorial-border overflow-hidden">
                  <div className="bg-editorial-text h-full" style={{ width: "72%" }}></div>
                </div>
                <p className="text-[9px] text-editorial-muted leading-relaxed font-sans">Container configurations stabilized. Stale SSL certificates reported.</p>
              </div>

              {/* Workflow */}
              <div className="space-y-1.5" id="scorecard_agentic_potential">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-editorial-text font-bold uppercase tracking-wide">3. Agentic Workflow Potential</span>
                  <span className="text-[#FF5A1F] font-bold uppercase">HIGH ASSESSMENT</span>
                </div>
                <div className="w-full bg-[#FDFCF8] h-2 border border-editorial-border overflow-hidden">
                  <div className="bg-[#FF5A1F]/70 h-full" style={{ width: "90%" }}></div>
                </div>
                <p className="text-[9px] text-editorial-muted leading-relaxed font-sans">System is primed for autonomous trigger-action agents setup.</p>
              </div>
            </div>
          </div>

          {/* Active AI Recommendation Card */}
          <div className="mt-6 p-4 bg-[#FF5A1F]/5 border border-[#FF5A1F]/15 rounded-none text-[10px] space-y-2" id="scorecard_recommendation">
            <span className="text-editorial-text font-bold uppercase block leading-none tracking-wider">INTELLIGENCE AGENT BRIEFING:</span>
            <p className="text-editorial-muted leading-relaxed font-sans">
              Prioritize Vector Database expansions to cover secondary CRM folders. Integrating these pools is expected to boost the overall model accuracy by <b className="text-editorial-text font-bold text-xs font-serif italic">+8.4%</b>.
            </p>
          </div>
        </div>

      </div>

      {/* STRATEGIC GROWTH MAP (AI IDENTIFIED) */}
      <div className="bg-white p-5 rounded-none border border-editorial-border" id="strategic_growth_map">
        <div className="flex items-center justify-between mb-4 border-b border-editorial-border/60 pb-2">
          <div>
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest">Strategic Growth Map (AI Identified)</h3>
            <p className="text-[10px] text-editorial-muted">Autonomous identification of geographic expandability & vertical acquisitions</p>
          </div>
          <span className="text-[9px] text-editorial-muted uppercase font-bold tracking-wider">Node synced</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="growth_map_blocks_grid">
          {/* Item 1 */}
          <div className="p-4 bg-[#FDFCF8] border border-editorial-border hover:border-[#FF5A1F] hover:bg-white transition duration-200" id="growth_node_sea">
            <div className="flex items-center gap-1.5 text-editorial-text font-bold text-xs mb-1 uppercase tracking-wide">
              <MapPin size={13} className="text-[#FF5A1F]" />
              <span>SOUTHEAST ASIA HUB</span>
            </div>
            <span className="text-[8px] font-bold tracking-wider uppercase text-editorial-muted block">GEOGRAPHIC EXPANSION | $140M EST. EV</span>
            <p className="text-[10px] text-editorial-muted mt-2 leading-relaxed font-sans">
              Establishing local edge caching nodes in Singapore/Jakarta. Leverages high regional connectivity to drive enterprise contract retention.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-4 bg-[#FDFCF8] border border-editorial-border hover:border-[#FF5A1F] hover:bg-white transition duration-200" id="growth_node_agtech">
            <div className="flex items-center gap-1.5 text-[#FF5A1F] font-bold text-xs mb-1 uppercase tracking-wide">
              <Cpu size={13} />
              <span>PRECISION AG-TECH</span>
            </div>
            <span className="text-[8px] font-bold tracking-wider uppercase text-editorial-muted block">VERTICAL CONSOLIDATION | Apex Target</span>
            <p className="text-[10px] text-editorial-muted mt-2 leading-relaxed font-sans">
              Integrating agricultural tracking sensors onto Core Alpha CRM workflows, unlocking high agricultural enterprise contract synergy values.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-4 bg-[#FDFCF8] border border-editorial-border hover:border-[#FF5A1F] hover:bg-white transition duration-200" id="growth_node_vertex">
            <div className="flex items-center gap-1.5 text-editorial-text font-bold text-xs mb-1 uppercase tracking-wide">
              <Share2 size={13} className="text-editorial-muted" />
              <span>VERTEX SYSTEMS INC</span>
            </div>
            <span className="text-[8px] font-bold tracking-wider uppercase text-editorial-muted block">M&A TARGET | Synergistic Neural Engine</span>
            <p className="text-[10px] text-editorial-muted mt-2 leading-relaxed font-sans">
              High-value neural software infrastructure that is currently hampered by slow legacy databases. Modernization is projected to yield 32.4% IRR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
