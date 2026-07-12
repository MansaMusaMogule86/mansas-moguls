"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EmpireHeroBackground } from "./EmpireHeroBackground";
import { EmpireParticleField } from "./EmpireParticleField";
import { EmpireCore } from "./EmpireCore";
import { EmpireOrbitSystem } from "./EmpireOrbitSystem";
import { EmpireSatellitePanel } from "./EmpireSatellitePanel";
import { EmpireSignalLine } from "./EmpireSignalLine";
import { EmpireHeroActions } from "./EmpireHeroActions";
import { EmpireMetricPanel } from "./EmpireMetricPanel";
import { commandPanels } from "@/data/empireHero";
import { PanelId } from "./hero.types";
import { X, Shield, Activity, Globe, Database, ArrowRight } from "lucide-react";

export function EmpireHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  // Interaction states
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<PanelId | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [coreHovered, setCoreHovered] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [drawerSource, setDrawerSource] = useState<PanelId | "core" | null>(null);

  // Mouse tracking inside hero container for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handlePanelClick = (id: PanelId) => {
    setDrawerSource(id);
    setDetailDrawerOpen(true);
  };

  const handleCoreClick = () => {
    setDrawerSource("core");
    setDetailDrawerOpen(true);
  };

  const handleExplore = () => {
    // Activate the core briefly
    setCoreHovered(true);
    setTimeout(() => {
      setCoreHovered(false);
      const target = document.getElementById("divisions");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 450);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[920px] lg:h-[105vh] bg-[#020308] overflow-hidden flex flex-col justify-between pt-16 pb-12 select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Background and ambient particle fields */}
      <EmpireHeroBackground />
      <EmpireParticleField />

      {/* Main interactive center/satellite grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center px-4">
        
        {/* Core Stack Container */}
        <div className="relative w-full max-w-[640px] aspect-square flex items-center justify-center mb-6 md:mb-10">
          
          {/* Signal Connection Lines */}
          {commandPanels.map((panel) => (
            <EmpireSignalLine
              key={panel.id}
              id={panel.id}
              active={activePanel === panel.id}
              hovered={hoveredPanel === panel.id}
            />
          ))}

          {/* Concentric Orbit Paths */}
          <EmpireOrbitSystem hoveredPillar={hoveredPillar} />

          {/* Central Interactive Core */}
          <EmpireCore 
            hovered={coreHovered} 
            onHover={setCoreHovered} 
            onClick={handleCoreClick} 
          />

          {/* Floating Panels (Desktop Only) */}
          {commandPanels.map((panel, idx) => (
            <div key={panel.id} className="hidden lg:block">
              <EmpireSatellitePanel
                id={panel.id as PanelId}
                title={panel.title}
                accent={panel.accent}
                position={panel.position}
                description={panel.content}
                items={panel.items}
                metrics={panel.metrics}
                active={activePanel === panel.id}
                onClick={handlePanelClick}
                onHover={setHoveredPanel}
                hoveredPillar={hoveredPillar}
                onHoverPillar={setHoveredPillar}
                mousePosition={mousePosition}
                delay={idx * 0.15}
              />
            </div>
          ))}
        </div>

        {/* Action Header & CTAs */}
        <EmpireHeroActions onExplore={handleExplore} />
      </div>

      {/* Mobile/Tablet list view (Render panels at bottom or layout stack) */}
      <div className="relative z-20 w-full max-w-lg mx-auto px-4 mt-8 flex flex-col gap-4 lg:hidden">
        <h4 className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase text-center">
          — Empire Node Control Hub —
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commandPanels.map((panel, idx) => (
            <div key={panel.id} className="w-full">
              <EmpireSatellitePanel
                id={panel.id as PanelId}
                title={panel.title}
                accent={panel.accent}
                position={{}} // Handled by CSS grid
                description={panel.content}
                items={panel.items}
                metrics={panel.metrics}
                active={activePanel === panel.id}
                onClick={handlePanelClick}
                onHover={setHoveredPanel}
                hoveredPillar={hoveredPillar}
                onHoverPillar={setHoveredPillar}
                mousePosition={mousePosition}
                delay={idx * 0.1}
                status="MOBILE ACTIVE"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slide-out Vault / Telemetry Drawer */}
      <AnimatePresence>
        {detailDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
              onClick={() => setDetailDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#04060b] border-l border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto pointer-events-auto text-left"
              style={{ boxShadow: "-10px 0 30px rgba(0,0,0,0.5)" }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    <h3 className="text-sm font-mono tracking-widest text-white uppercase font-extrabold">
                      {drawerSource === "core" ? "EMPIRE CORE TELEMETRY" : `VAULT: ${drawerSource?.toUpperCase()}`}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setDetailDrawerOpen(false)}
                    className="p-1 border border-white/10 bg-white/5 text-white hover:text-gold rounded-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Core MM Drawer Content */}
                {drawerSource === "core" && (
                  <div className="space-y-6">
                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm">
                      <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest mb-2 font-extrabold">Empire Operating System</h4>
                      <p className="text-xs text-white/70 leading-relaxed font-sans">
                        Universal control panel coordinates capital flow, multi-agent AI processes, growth tracking, and distribution optimization.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold">Active Status Parameters</h4>
                      <EmpireMetricPanel />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold">Recent Empire Events</h4>
                      <div className="space-y-2 text-[10px] font-mono text-white/60">
                        <div className="p-2 border border-white/5 bg-[#05080E] rounded-sm">
                          <span className="text-gold font-bold mr-1">[ECOLOGY_SYNC]</span> Node calibration complete.
                        </div>
                        <div className="p-2 border border-white/5 bg-[#05080E] rounded-sm">
                          <span className="text-gold font-bold mr-1">[CAPITAL]</span> Liquidity deployment finalized for Venture 06.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mission Drawer Content */}
                {drawerSource === "mission" && (
                  <div className="space-y-6">
                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm">
                      <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest mb-2 font-extrabold">Mission Directive</h4>
                      <p className="text-xs text-white/70 leading-relaxed font-sans">
                        To construct, fund, and compound high-leverage systems powered by autonomous AI agent networks and optimized capital allocations.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold">Core Principles</h4>
                      <ul className="space-y-2.5 text-xs text-white/70 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✓</span>
                          <span><strong>Compound-First</strong>: Every asset or codebase must generate long-term leverage.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✓</span>
                          <span><strong>Automated Scaling</strong>: Minimize human operational friction through AI agent integration.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* System Status Drawer Content */}
                {drawerSource === "status" && (
                  <div className="space-y-6">
                    <div className="p-4 bg-[#05080E] border border-white/5 rounded-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald" />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">System Integrity</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald">99.9%</span>
                    </div>

                    <div className="space-y-2 text-xs text-white/70">
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold">Infrastructure Logs</h4>
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm font-mono text-[10px] space-y-1.5">
                        <p className="text-emerald">[OK] AI Consensus layer healthy</p>
                        <p className="text-emerald">[OK] Spanner DB synchronization active</p>
                        <p className="text-emerald">[OK] Telemetry nodes (12,408) reporting online</p>
                        <p className="text-white/40">[LOG] System load: 0.14%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pillars Drawer Content */}
                {drawerSource === "pillars" && (
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold mb-3">Empire Foundations</h4>
                    <div className="space-y-4 text-xs text-white/70">
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm">
                        <span className="text-gold font-bold block mb-1">INTELLIGENCE</span>
                        <span>Multi-agent processing feeds quantitative models with global market indicators.</span>
                      </div>
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm">
                        <span className="text-gold font-bold block mb-1">CAPITAL</span>
                        <span>Sovereign treasury allocations compounding in high-yield automation systems.</span>
                      </div>
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm">
                        <span className="text-gold font-bold block mb-1">TECHNOLOGY</span>
                        <span>Custom tools, serverless architectures, and self-improving codebases.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Portfolio Drawer Content */}
                {drawerSource === "portfolio" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm">
                        <span className="text-[8px] font-mono text-white/40 uppercase block">Total AUM</span>
                        <span className="text-sm font-mono font-bold text-white">$1.28B+</span>
                      </div>
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm">
                        <span className="text-[8px] font-mono text-white/40 uppercase block">Ventures</span>
                        <span className="text-sm font-mono font-bold text-white">24 Active</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-extrabold">Portfolio Distribution</h4>
                      <div className="p-3 border border-white/5 bg-[#05080E] rounded-sm font-mono text-[10px] space-y-2">
                        <div className="flex justify-between">
                          <span>SaaS & Code Bases</span>
                          <span className="text-gold font-bold">40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Media & Audiences</span>
                          <span className="text-gold font-bold">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Treasury & Growth</span>
                          <span className="text-gold font-bold">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer CTA Action buttons */}
              <div className="pt-4 border-t border-white/5">
                <Link
                  href="/dashboard"
                  onClick={() => setDetailDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-gold-bright transition-colors rounded-sm"
                >
                  <span>Enter Operating Room</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
