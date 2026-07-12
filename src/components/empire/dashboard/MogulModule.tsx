"use client";

import { motion } from "framer-motion";
import type { DashboardDivision } from "@/lib/data/dashboardData";
import { useEmpireState } from "../os/EmpireStateProvider";
import { HudPanel } from "@/components/empire-hud/HudPanel";
import { HudPanelHeader } from "@/components/empire-hud/HudPanelHeader";
import { MetricRow } from "@/components/empire-hud/MetricRow";
import { MiniLineChart } from "@/components/empire-hud/MiniLineChart";
import { WorldMapNetwork } from "@/components/empire-hud/WorldMapNetwork";
import { AgentNetwork } from "@/components/empire-hud/AgentNetwork";
import { HudButton } from "@/components/empire-hud/HudButton";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

interface MogulModuleProps {
  data: DashboardDivision;
}

export function MogulModule({ data }: MogulModuleProps) {
  const {
    setActiveMogulId,
    setViewState,
    setDetailDrawerOpen,
    setSelectedDivisionId,
  } = useEmpireState();

  const [trendData, setTrendData] = useState<number[]>([]);

  // Generate deterministic trend lines per module
  useEffect(() => {
    const seed = data.title.charCodeAt(0) + data.title.charCodeAt(1);
    const generated = Array.from({ length: 10 }, (_, i) => {
      return Math.round(50 + Math.sin(i + seed) * 15 + (i * 2));
    });
    setTrendData(generated);
  }, [data]);

  const handleOpenTelemetry = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDivisionId(data.id);
    setDetailDrawerOpen(true);
  };

  const handleEnterEnvironment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMogulId(data.id);
    setViewState("environment");
  };

  const colorKey = {
    intelligence: "blue",
    ai: "purple",
    capital: "gold",
    growth: "emerald",
    studio: "pink",
    venture: "orange",
    innovation: "purple",
    knowledge: "gold",
  }[data.id] || "gold";

  return (
    <HudPanel
      colSpan={data.colSpan}
      heightClass={data.heightClass}
      color={colorKey as any}
      className="flex flex-col justify-between"
    >
      {/* Panel Header */}
      <HudPanelHeader
        title={data.title}
        divisionNumber={data.divisionNumber}
        status={data.status}
        color={colorKey as any}
      />

      {/* Middle Content Area (Dense & Structured) */}
      <div className="flex-1 flex gap-4 mt-2 mb-4 overflow-hidden">
        {/* Left Side: Capabilities list & Description */}
        <div className="flex-1 flex flex-col justify-between gap-3 text-left">
          <p className="text-[10px] text-white/50 tracking-wide leading-relaxed">
            {data.description}
          </p>
          
          <div className="flex flex-col gap-1">
            {data.capabilities.slice(0, 3).map((cap, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold/50" />
                <span className="text-[9.5px] text-white/70 font-mono tracking-wide truncate">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Dynamic HUD Visualizers */}
        <div className="w-[50%] flex flex-col justify-center gap-2 shrink-0">
          {/* Intelligence renders AgentNetwork */}
          {data.id === "intelligence" && (
            <div className="border border-white/5 bg-black/25 rounded p-1 h-28 flex items-center justify-center">
              <AgentNetwork className="w-full h-full" />
            </div>
          )}

          {/* AI and Capital render MiniLineChart */}
          {(data.id === "ai" || data.id === "capital") && (
            <div className="border border-white/5 bg-black/25 rounded p-1 h-20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:0.4rem_0.4rem]" />
              <MiniLineChart
                data={trendData}
                color={colorKey === "purple" ? "#a855f7" : "#d6aa38"}
                className="w-full h-full"
              />
            </div>
          )}

          {/* Metrics list */}
          <div className="flex flex-col gap-1 w-full">
            {data.metrics.slice(0, 2).map((metric, i) => (
              <MetricRow
                key={i}
                label={metric.label}
                value={metric.value}
                onClick={handleOpenTelemetry}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Interactive Rail */}
      <div className="flex items-center gap-2 w-full pt-2 border-t border-white/5">
        <HudButton variant="default" className="flex-1" onClick={handleOpenTelemetry}>
          Telemetry Logs
        </HudButton>
        <HudButton variant={colorKey as any} className="flex-1" onClick={handleEnterEnvironment}>
          <span className="flex items-center gap-1">
            Operation Room
            <ArrowUpRight className="size-3 transition-transform group-hover/hudbtn:translate-x-0.5 group-hover/hudbtn:-translate-y-0.5" />
          </span>
        </HudButton>
      </div>
    </HudPanel>
  );
}
