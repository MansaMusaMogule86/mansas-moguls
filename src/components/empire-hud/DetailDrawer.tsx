"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { StatusPulse } from "./StatusPulse";
import { MetricRow } from "./MetricRow";
import { MiniLineChart } from "./MiniLineChart";
import { HudButton } from "./HudButton";
import { dashboardDivisions } from "@/lib/data/dashboardData";
import { cn } from "@/lib/utils";
import { Terminal, CheckCircle2, RefreshCw } from "lucide-react";

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  divisionId: string | null;
}

export function DetailDrawer({ isOpen, onClose, divisionId }: DetailDrawerProps) {
  const division = dashboardDivisions.find((d) => d.id === divisionId);
  const [chartData, setChartData] = useState<number[]>([60, 65, 62, 70, 75, 78, 85]);
  const [logs, setLogs] = useState<string[]>([]);
  const [optimizing, setOptimizing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Generate random stats and logs on mount/change
  useEffect(() => {
    if (!division) return;
    
    // Initial logs
    setLogs([
      `[SYS_INIT] Initializing telemetry for ${division.title}...`,
      `[AUTH] Accessing security tokens... SECURE`,
      `[NET] Connection stream established. STATUS: ${division.status}`,
    ]);

    // Simulated historical data
    const baseVal = 70 + Math.random() * 15;
    setChartData(Array.from({ length: 12 }, (_, i) => Math.round(baseVal + Math.sin(i) * 10 + Math.random() * 5)));
  }, [divisionId, division]);

  // Auto scroll terminal logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, optimizing]);

  const handleAction = (actionName: string) => {
    if (optimizing) return;
    setOptimizing(true);
    setLogs((prev) => [...prev, `[PROC] Initiating ${actionName} protocol...`]);
    
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[PROC] ${actionName} completed successfully.`,
        `[SYS] Allocation index: OPTIMAL (+${(Math.random() * 5 + 2).toFixed(1)}%)`,
      ]);
      setOptimizing(false);
      // Update chart to reflect optimization
      setChartData((prev) => [...prev.slice(1), prev[prev.length - 1] + Math.round(Math.random() * 6)]);
    }, 1500);
  };

  if (!division) return null;

  const colorKey = {
    intelligence: "blue",
    ai: "purple",
    capital: "gold",
    growth: "emerald",
    studio: "pink",
    venture: "orange",
    innovation: "purple",
    knowledge: "gold",
  }[division.id] || "gold";

  const hexColor = {
    blue: "#3b82f6",
    purple: "#a855f7",
    gold: "#d6aa38",
    emerald: "#10b981",
    pink: "#ec4899",
    orange: "#fb923c",
  }[colorKey as "blue" | "purple" | "gold" | "emerald" | "pink" | "orange"] || "#d6aa38";

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#020306] border-l border-gold/20 text-white font-mono flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.8)] p-0"
      >
        {/* Layered border framing matching the HUD panels */}
        <div className="absolute inset-[3px] border border-white/5 pointer-events-none" />
        
        {/* Top Header */}
        <div className="relative border-b border-gold/15 p-6 bg-[#04060c]">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] text-white/30 tracking-widest">{division.divisionNumber}</span>
            <div className="h-[1px] w-5 bg-white/10" />
            <span className="text-[8px] text-white/30 tracking-widest uppercase">Division Telemetry</span>
          </div>
          
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base md:text-lg font-heading font-extrabold tracking-widest text-white uppercase m-0">
              {division.title}
            </SheetTitle>
            <div className="border border-white/5 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
              <StatusPulse status={division.status} color={colorKey as any} />
            </div>
          </div>
          <SheetDescription className="text-[10px] text-white/50 tracking-wide mt-2 font-mono leading-relaxed text-left">
            {division.description}
          </SheetDescription>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          {/* Section: Live Signals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[9px] text-white/35 font-bold tracking-widest uppercase">
              <span>Live System Metrics</span>
              <span className="text-[8px] animate-pulse">TELEMETRY ACTIVE</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {division.metrics.map((metric, i) => (
                <MetricRow
                  key={i}
                  label={metric.label}
                  value={metric.value}
                  onClick={() => handleAction(`Analyze ${metric.label}`)}
                />
              ))}
            </div>
          </div>

          {/* Section: Historical Performance Signal */}
          <div className="space-y-3">
            <div className="text-[9px] text-white/35 font-bold tracking-widest uppercase text-left">
              Historical Signal Trend
            </div>
            <div className="h-16 border border-white/5 bg-black/35 rounded-sm p-2 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:0.5rem_0.5rem]" />
              <MiniLineChart data={chartData} color={hexColor} className="w-full h-full" />
            </div>
          </div>

          {/* Section: Core Capabilities */}
          <div className="space-y-3">
            <div className="text-[9px] text-white/35 font-bold tracking-widest uppercase text-left">
              Operational Primitives
            </div>
            <div className="space-y-1.5">
              {division.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 py-1.5 px-3 border border-white/5 bg-[#05070B] rounded-sm text-[9.5px] text-white/80"
                >
                  <CheckCircle2 className="size-3 text-gold/60 shrink-0" />
                  <span className="tracking-wide uppercase font-semibold text-left">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Active Console Logs */}
          <div className="space-y-3">
            <div className="text-[9px] text-white/35 font-bold tracking-widest uppercase text-left flex items-center gap-1.5">
              <Terminal className="size-3" />
              <span>Console Log Streams</span>
            </div>
            <div className="h-28 border border-white/5 bg-black/80 rounded-sm p-3 font-mono text-[8.5px] text-emerald/80 overflow-y-auto space-y-1 select-text scroll-smooth">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed text-left truncate">
                  <span className="text-white/20 mr-1.5">[{i + 1}]</span>
                  {log}
                </div>
              ))}
              {optimizing && (
                <div className="flex items-center gap-1.5 text-gold/80 animate-pulse text-left">
                  <RefreshCw className="size-2.5 animate-spin" />
                  <span>Calibrating arrays...</span>
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-6 border-t border-gold/15 bg-[#04060c] space-y-2">
          <HudButton
            variant={colorKey === "gold" || colorKey === "emerald" || colorKey === "purple" ? colorKey as any : "default"}
            disabled={optimizing}
            onClick={() => handleAction("Optimize Resource Allocation")}
          >
            {optimizing ? "Calibrating..." : "Optimize Allocation"}
          </HudButton>
          
          <HudButton
            variant="default"
            onClick={onClose}
            className="border-white/5 text-white/50 hover:text-white"
          >
            Close Telemetry
          </HudButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
