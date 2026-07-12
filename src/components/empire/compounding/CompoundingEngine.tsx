"use client";

import { useState } from "react";
import { StageId, CompoundingStageData } from "./compounding.types";
import { COMPOUNDING_STAGES } from "./compoundingData";
import { CompoundingStage } from "./CompoundingStage";
import { CompoundingTimeline } from "./CompoundingTimeline";
import { CompoundingCore } from "./CompoundingCore";
import { CompoundingProgress } from "./CompoundingProgress";
import { CompoundingDetailPanel } from "./CompoundingDetailPanel";

export function CompoundingEngine() {
  const [stages] = useState<CompoundingStageData[]>(COMPOUNDING_STAGES);
  const [selectedStageId, setSelectedStageId] = useState<StageId>("capture");
  const [engineStatus, setEngineStatus] = useState<"idle" | "running" | "complete">("idle");
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stageIds: StageId[] = ["capture", "analyze", "compound", "multiply", "dominate"];

  const handleSelectStage = (id: StageId) => {
    setSelectedStageId(id);
    setActiveStageIndex(stageIds.indexOf(id));
    setDrawerOpen(true);
  };

  const runSimulation = () => {
    if (engineStatus === "running") return;
    
    setEngineStatus("running");
    setLogs([]);
    setActiveStageIndex(0);

    const logTemplates = {
      capture: [
        "Connecting to data storage pipelines...",
        "Crawling audience signal hubs...",
        "Opportunities captured: 17 detected.",
      ],
      analyze: [
        "Ingesting raw vectors...",
        "Executing LLM multi-agent consensus protocols...",
        "Accuracy confirmed at 99.8%.",
      ],
      compound: [
        "Synthesizing codebase components...",
        "Running compounding loops...",
        "Knowledge base reuse increased by 24.6%.",
      ],
      multiply: [
        "Publishing dynamic routing tables...",
        "Triggering scale automation workflows...",
        "Channels multiplied: 3 targets scale.",
      ],
      dominate: [
        "Consolidating market locks...",
        "Evaluating barriers to entry...",
        "Ecosystem category share locked at #1.",
      ],
    };

    let stageIdx = 0;
    
    const executeStep = () => {
      if (stageIdx >= stageIds.length) {
        setEngineStatus("complete");
        setLogs((prev) => [...prev, "COMPOUNDING CYCLE COMPLETE. Ecosystem synchronized."]);
        setSelectedStageId("dominate");
        setActiveStageIndex(4);
        setDrawerOpen(true);
        return;
      }

      const stageId = stageIds[stageIdx];
      setSelectedStageId(stageId);
      setActiveStageIndex(stageIdx);
      
      const stepLogs = logTemplates[stageId];
      stepLogs.forEach((log, subIdx) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, `[${stageId.toUpperCase()}] ${log}`]);
        }, subIdx * 250);
      });

      stageIdx++;
      setTimeout(executeStep, 1000);
    };

    executeStep();
  };

  const selectedStage = stages.find((s) => s.id === selectedStageId) || null;

  return (
    <section className="relative w-full border-b border-white/5 bg-background py-16 md:py-24 text-center">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase font-bold">
            — MM Systems —
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-white font-bold tracking-wide mt-2">
            Continuous Compounding Engine
          </h2>
        </div>

        {/* Action button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={runSimulation}
            disabled={engineStatus === "running"}
            className="px-6 py-2.5 bg-gold hover:bg-gold-bright disabled:bg-white/5 text-black disabled:text-white/40 font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
          >
            {engineStatus === "running" ? "RUNNING SIMULATION..." : "RUN ENGINE"}
          </button>
        </div>

        {/* Timeline (Desktop/Tablet) */}
        <div className="hidden md:block mb-8">
          <CompoundingTimeline
            stages={stageIds}
            currentStageId={selectedStageId}
            activeIndex={activeStageIndex}
            onSelectStage={handleSelectStage}
          />
        </div>

        {/* Grid containing stages */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-6 mt-6 max-w-5xl mx-auto">
          {stages.map((stage) => (
            <CompoundingStage
              key={stage.id}
              stage={stage}
              isSelected={selectedStageId === stage.id}
              isActive={engineStatus === "running" && selectedStageId === stage.id}
              isCompleted={engineStatus === "complete" || (engineStatus === "running" && stageIds.indexOf(stage.id) < activeStageIndex)}
              onClick={() => handleSelectStage(stage.id)}
              onHover={() => {}}
            />
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden flex gap-4 items-stretch mt-8 max-w-sm mx-auto">
          <CompoundingTimeline
            stages={stageIds}
            currentStageId={selectedStageId}
            activeIndex={activeStageIndex}
            onSelectStage={handleSelectStage}
            orientation="vertical"
          />
        </div>

        {/* Core MM trigger */}
        <CompoundingCore status={engineStatus} onClick={runSimulation} />

        {/* Logs visualizer */}
        <CompoundingProgress logs={logs} />

        {/* Drawer detail panel */}
        {drawerOpen && (
          <CompoundingDetailPanel
            stage={selectedStage}
            onClose={() => setDrawerOpen(false)}
          />
        )}

      </div>
    </section>
  );
}
