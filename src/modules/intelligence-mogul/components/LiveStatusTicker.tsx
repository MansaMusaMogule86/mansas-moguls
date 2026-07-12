"use client";

import React, { useState, useEffect } from "react";
import { Clock, Cpu } from "lucide-react";

export default function LiveStatusTicker() {
  const [uptime, setUptime] = useState({ h: 2, m: 14, s: 0 });
  const [aiHealth, setAiHealth] = useState(99.82);
  const [latency, setLatency] = useState(84);
  const [activeSegment, setActiveSegment] = useState(0); // For an auto-rotating indicator statement

  // Session-based real-time incrementing uptime counter
  useEffect(() => {
    const uptimeTimer = setInterval(() => {
      setUptime((prev) => {
        let ns = prev.s + 1;
        let nm = prev.m;
        let nh = prev.h;
        if (ns >= 60) {
          ns = 0;
          nm += 1;
        }
        if (nm >= 60) {
          nm = 0;
          nh += 1;
        }
        return { h: nh, m: nm, s: ns };
      });
    }, 1000);

    return () => clearInterval(uptimeTimer);
  }, []);

  // AI model simulated dynamic health and latency tick
  useEffect(() => {
    const healthTimer = setInterval(() => {
      // Fluctuates slightly between 99.75% and 99.98%
      const delta = (Math.random() - 0.5) * 0.04;
      setAiHealth((prev) => {
        const nextVal = prev + delta;
        return parseFloat(Math.min(99.99, Math.max(99.65, nextVal)).toFixed(2));
      });

      // Latency fluctuates between 72ms and 96ms
      setLatency(() => Math.floor(75 + Math.random() * 20));
      
      // Rotate active info item text ticker
      setActiveSegment((prev) => (prev + 1) % 3);
    }, 4500);

    return () => clearInterval(healthTimer);
  }, []);

  const formatSegmentText = () => {
    switch (activeSegment) {
      case 0:
        return `LATENCY: ${latency}ms (OPTIMIZED)`;
      case 1:
        return `NEURAL LOADS: NOMINAL`;
      case 2:
        return `SHARDS: 12/12 ACTIVE`;
      default:
        return `DESPATCH QUEUE: 0`;
    }
  };

  return (
    <div 
      className="absolute bottom-4 left-6 z-30 font-mono text-[9px] bg-white border border-editorial-border hover:border-editorial-text transition-all duration-300 p-2 py-1.5 flex items-center gap-3 shadow-sm select-none"
      id="live_status_viewport_ticker"
    >
      {/* Live Pulsating Indicator Badge */}
      <div className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-editorial-text border-r border-editorial-border/60 pr-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[8px] font-black tracking-widest text-[#FF5A1F]">LIVE</span>
      </div>

      {/* UPTIME COUNTER TOCK */}
      <div className="flex items-center gap-1 hidden sm:flex border-r border-editorial-border/60 pr-2.5">
        <Clock size={11} className="text-editorial-muted" />
        <span className="text-editorial-muted">UPTIME:</span>
        <span className="font-bold text-editorial-text tracking-wide">
          {uptime.h.toString().padStart(2, "0")}h {uptime.m.toString().padStart(2, "0")}m {uptime.s.toString().padStart(2, "0")}s
        </span>
      </div>

      {/* AI PROCESSING HEALTH TICKER */}
      <div className="flex items-center gap-1 border-r border-editorial-border/60 pr-2.5">
        <Cpu size={11} className="text-editorial-muted" />
        <span className="text-editorial-muted hidden md:inline">NODE MODEL HEALTH:</span>
        <span className="font-extrabold text-[#10B981]">{aiHealth}%</span>
      </div>

      {/* ROTATING MODEL TELEMETRY TICKER */}
      <div className="flex items-center gap-1">
        <span className="text-editorial-muted uppercase hidden lg:inline">STATUS:</span>
        <span className="font-semibold text-editorial-text transition-all duration-500 text-[8.5px] uppercase">
          {formatSegmentText()}
        </span>
      </div>
    </div>
  );
}
