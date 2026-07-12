"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface HeaderProps {
  title: string;
  subtitle?: string;
  activeSection: string;
  onToggleSidebarMobile?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  isScanning?: boolean;
  scanElapsed?: number;
}

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CornerDownRight,
  TrendingUp,
  Menu,
  X,
  Volume2,
  VolumeX,
  Battery,
  BatteryMedium,
  BatteryWarning
} from "lucide-react";

import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from "recharts";
import { VolatilityAlert } from "@/modules/intelligence-mogul/types";
import { PredictionResult } from "@/modules/intelligence-mogul/lib/predictive_analytics";

type PredictiveAlert = PredictionResult & { cleared?: boolean };


export default function Header({ 
  title, 
  subtitle, 
  activeSection, 
  onToggleSidebarMobile,
  isMuted = false,
  onToggleMute,
  isScanning = false,
  scanElapsed = 0
}: HeaderProps) {
  const [volatilityAlerts, setVolatilityAlerts] = useState<VolatilityAlert[]>([]);
  const [predictiveAlerts, setPredictiveAlerts] = useState<PredictiveAlert[]>([]);
  const [isAlertDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAlertTime, setLastAlertTime] = useState<string>("");

  useEffect(() => {
    const handleAlerts = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { volatility = [], predictive = [] } = customEvent.detail as {
          volatility?: VolatilityAlert[];
          predictive?: PredictiveAlert[];
        };

        // Check if there are new alerts to highlight
        const activeVol = volatility.filter((a) => !a.cleared);
        const activePred = predictive.filter((a) => !a.cleared);
        
        setVolatilityAlerts(activeVol);
        setPredictiveAlerts(activePred);

        if ((activeVol.length > 0 || activePred.length > 0) && 
            (activeVol.length !== volatilityAlerts.length || activePred.length !== predictiveAlerts.length)) {
          setLastAlertTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    };

    window.addEventListener("intelligence-alert-broadcast", handleAlerts);
    return () => {
      window.removeEventListener("intelligence-alert-broadcast", handleAlerts);
    };
  }, [volatilityAlerts.length, predictiveAlerts.length]);

  const totalActive = volatilityAlerts.length + predictiveAlerts.length;

  // Track system uptime (simulated inside header, initialized close to 4 hours to let users see the transition)
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("intelligence_mogul_system_uptime");
      return saved ? Number(saved) : (3 * 3600 + 59 * 60 + 50); // 3h 59m 50s
    } catch {
      return 3 * 3600 + 59 * 60 + 50;
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds(prev => {
        const next = prev + 1;
        try {
          localStorage.setItem("intelligence_mogul_system_uptime", String(next));
        } catch {}
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleUptimeSimulation = () => {
    if (uptimeSeconds >= 14400) { // 4 hours
      // Toggle back to nominal uptime
      setUptimeSeconds(24 * 60 + 15); // 24m 15s
    } else {
      // Toggle forward to critical uptime (4 hours 12 minutes)
      setUptimeSeconds(4 * 3600 + 12 * 60 + 35);
    }
  };

  const formatUptime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const hStr = h.toString().padStart(2, "0");
    const mStr = m.toString().padStart(2, "0");
    const sStr = s.toString().padStart(2, "0");
    return `${hStr}:${mStr}:${sStr}`;
  };

  // Battery drain dynamics:
  // - Starts at 94% on low uptime, slowly decreases (e.g. 1.2% per hour).
  // - Once uptime exceeds 4 hours (14,400s), battery throttles with low-power alert and drops below 35%!
  const uptimeHours = uptimeSeconds / 3600;
  const isUptimeLowPower = uptimeHours >= 4;

  let baseBattery = 94;
  if (isUptimeLowPower) {
    // Exceeded 4 hours threshold: drop to low-power (e.g., 28% and slowly continuing to drain)
    const hoursExceeded = uptimeHours - 4;
    baseBattery = Math.max(12, Math.round(28 - hoursExceeded * 8));
  } else {
    // Nominal system mode: slight overhead
    baseBattery = Math.max(78, Math.round(94 - uptimeHours * 1.5));
  }

  const batteryDrainRate = 6.8; // drop percentage per second of intensive scan
  const currentBattery = isScanning 
    ? Math.max(9, Math.round(baseBattery - scanElapsed * batteryDrainRate)) 
    : baseBattery;

  const isLowPowerMode = currentBattery < 35;

  // Generate initial historical 60-point power data array
  const [powerTrendData, setPowerTrendData] = useState<{ minute: number; power: number }[]>(() => {
    const initialData = [];
    for (let i = 1; i <= 60; i++) {
      // Background baseline around 15-22W, styled with slight sine curves for lifelike micro-noise
      const baseVal = 16 + Math.sin(i / 5.5) * 3 + Math.cos(i / 8) * 1.5;
      initialData.push({
        minute: i,
        power: Math.max(10, Math.round(baseVal + Math.random() * 2.5))
      });
    }
    return initialData;
  });

  // Live power consumption, ticked by an interval so render stays pure.
  const [currentPowerValue, setCurrentPowerValue] = useState(16);

  useEffect(() => {
    const computePower = () =>
      isScanning
        ? 76 + Math.round(Math.sin(Date.now() / 250) * 8 + Math.random() * 4)
        : isLowPowerMode
          ? 8 + Math.round(Math.cos(Date.now() / 1200) * 1.5 + Math.random() * 1)
          : 16 + Math.round(Math.sin(Date.now() / 800) * 2.5 + Math.random() * 2);

    const timer = setInterval(() => {
      setCurrentPowerValue(computePower());
    }, 500);
    return () => clearInterval(timer);
  }, [isScanning, isLowPowerMode]);

  // Periodically slide-shift the 60-minute array to update the power consumption graph live
  useEffect(() => {
    const timer = setInterval(() => {
      setPowerTrendData(prev => {
        const next = [...prev.slice(1)];
        const nextMinute = prev[prev.length - 1].minute + 1;
        next.push({
          minute: nextMinute,
          power: Math.round(currentPowerValue)
        });
        return next;
      });
    }, 2000); // Shift slice history every 2 seconds for active feedback
    return () => clearInterval(timer);
  }, [currentPowerValue]);

  const [isBatteryHistoryOpen, setIsBatteryHistoryOpen] = useState(false);

  // Generate initial historical 60-point battery data array representing the last 60 minutes
  const [batteryHistoryData, setBatteryHistoryData] = useState<{ minute: number; battery: number; drainage: number }[]>(() => {
    const initialData = [];
    const b = currentBattery;
    for (let i = 1; i <= 60; i++) {
      // Create a retrogradely shifting battery level simulating historical discharge
      const factor = isScanning ? 0.4 : 0.08;
      // Synthesize elegant battery curves
      const histVal = Math.min(100, Math.max(9, b + (60 - i) * factor + Math.cos(i / 10) * 0.4));
      initialData.push({
        minute: i - 60, // -59 to 0 representing relative time offset
        battery: Math.round(histVal),
        drainage: Number((1.5 + Math.sin(i / 6.5) * 0.5 + (histVal < 35 ? 4.8 : 0) + (isScanning ? 12 : 0)).toFixed(1))
      });
    }
    return initialData;
  });

  // Keep historical battery ledger synchronous with current battery states
  useEffect(() => {
    const timer = setInterval(() => {
      setBatteryHistoryData(prev => {
        const next = [...prev.slice(1)];
        // Keep numbering aligned relative from -59 to 0
        const updated = next.map((item, idx) => ({
          ...item,
          minute: idx - 59
        }));

        const currentDrainRate = isScanning 
          ? 14.8 + Math.random() * 2 
          : isLowPowerMode 
            ? 3.8 + Math.random() * 0.6 
            : 1.4 + Math.random() * 0.3;

        updated.push({
          minute: 0,
          battery: Math.round(currentBattery),
          drainage: Number(currentDrainRate.toFixed(1))
        });
        return updated;
      });
    }, 4000); // Record new sample every 4 seconds for immediate visual feedback
    return () => clearInterval(timer);
  }, [currentBattery, isScanning, isLowPowerMode]);

  const handleDismissPredictive = (id: string) => {
    const nextPred = predictiveAlerts.filter(a => a.metricKey !== id);
    setPredictiveAlerts(nextPred);
    // Propagate dismiss back to listeners
    window.dispatchEvent(new CustomEvent("intelligence-alert-dismiss", {
      detail: { type: "predictive", key: id }
    }));
  };

  const handleClearAllHeaderAlerts = () => {
    setVolatilityAlerts([]);
    setPredictiveAlerts([]);
    setIsDrawerOpen(false);
    window.dispatchEvent(new CustomEvent("intelligence-alert-clear-all"));
  };

  return (
    <header 
      id="system_header_global"
      className="relative border-b border-editorial-border/60 bg-[#FDFCF8] z-45 shrink-0 font-mono select-none"
    >
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Mobile navigation toggle hamburger button */}
          <button
            onClick={onToggleSidebarMobile}
            className="lg:hidden p-1.5 text-editorial-text hover:bg-neutral-100 border border-editorial-border hover:border-editorial-text transition-all rounded-none cursor-pointer flex items-center justify-center shrink-0"
            title="Open system navigation menu"
            id="mobile_hamburger_toggle"
          >
            <Menu size={14} className="stroke-[2.5]" />
          </button>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[10px] text-[#FF5A1F] font-bold uppercase tracking-wider">
            <Activity size={10} className="animate-pulse" />
            SEC: {activeSection.toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-black text-editorial-text uppercase tracking-widest font-serif italic line-clamp-1">{title}</h1>
            {subtitle && (
              <p className="text-[9px] sm:text-[10px] text-editorial-muted font-sans mt-0.5 hidden sm:block line-clamp-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Real-time ML Warning Indicator Badge */}
          {totalActive > 0 ? (
            <button 
              onClick={() => setIsDrawerOpen(!isAlertDrawerOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#FF5A1F]/5 border border-[#FF5A1F] text-[#FF5A1F] cursor-pointer hover:bg-[#FF5A1F]/10 transition-all text-[10px] uppercase font-bold tracking-wider relative group"
              title="Click to toggle telemetry alerts inspect HUD"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A1F]"></span>
              </span>
              <span className="animate-pulse font-black text-[10px]">
                {predictiveAlerts.length > 0 ? "ML DETECTED BREED DETECTED" : "ALERTS ACTIVE"}
              </span>
              <span className="bg-[#FF5A1F] text-white font-mono px-1.5 py-0.2 text-[8px] font-black">
                {totalActive} ACTIVE
              </span>
              {isAlertDrawerOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-wider text-editorial-muted bg-white px-3 py-1.5 border border-editorial-border animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>FORECAST SECURE: <b className="text-editorial-text font-black">NOMINAL</b></span>
            </div>
          )}

          {/* Interactive System Uptime Tracker Indicator */}
          <button 
            id="system_uptime_tracker"
            onClick={toggleUptimeSimulation}
            className={`flex items-center gap-2 px-2.5 py-1.5 bg-white border transition-all text-[9.5px] uppercase font-bold tracking-wider h-[26px] self-center select-none cursor-pointer hover:border-editorial-text ${
              isUptimeLowPower 
                ? 'border-amber-500/50 text-amber-800 bg-amber-50/50' 
                : 'border-editorial-border text-editorial-muted'
            }`}
            title={`Intelligence Mogul OS Uptime: ${formatUptime(uptimeSeconds)} (Limit warning at 4h). Click to toggle simulation between normal and overloaded (>4h) states.`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isUptimeLowPower ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`}></span>
            <span className="font-mono text-editorial-text">UPTIME: <b>{formatUptime(uptimeSeconds)}</b></span>
            {isUptimeLowPower && (
              <span className="text-red-600 font-extrabold text-[8px] tracking-wide animate-pulse bg-red-100 px-1 py-0.2">
                OVERTIME LIMIT
              </span>
            )}
          </button>

          {/* Sleek Sparkline Panel representing the 60m Power Consumption Trend */}
          <div 
            id="system_power_trend_sparkline"
            className="hidden xs:flex items-center gap-2.5 px-2.5 py-1 bg-white border border-editorial-border h-[26px] self-center transition-all select-none hover:border-editorial-text"
            title={`60-Minute Power Consumption Trend: Live draw is ${Math.round(currentPowerValue)}W. Standard normal load is ~16-22W, surging up to ~80W+ during system scans.`}
          >
            <div className="flex flex-col justify-center text-left">
              <span className="text-[7px] font-black uppercase text-editorial-muted tracking-wider font-mono leading-none">
                60m Power
              </span>
              <span className="text-[8.5px] font-black text-editorial-text font-mono leading-none mt-0.5 whitespace-nowrap">
                Live: <span className={isScanning ? "text-[#FF5A1F] font-extrabold animate-pulse" : isLowPowerMode ? "text-amber-600 font-extrabold" : "text-emerald-600 font-extrabold"}>{Math.round(currentPowerValue)}W</span>
              </span>
            </div>

            {/* Elegant mini Recharts AreaChart visual */}
            <div className="w-[50px] h-[16px] relative shrink-0">
              <ResponsiveContainer width={50} height={16}>
                <AreaChart data={powerTrendData} margin={{ top: 1, right: 1, left: 1, bottom: 1 }}>
                  <defs>
                    <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isScanning ? "#FF5A1F" : isLowPowerMode ? "#D97706" : "#10B981"} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={isScanning ? "#FF5A1F" : isLowPowerMode ? "#D97706" : "#10B981"} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="power" 
                    stroke={isScanning ? "#FF5A1F" : isLowPowerMode ? "#D97706" : "#10B981"} 
                    strokeWidth={1.2} 
                    fill="url(#powerGradient)"
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Battery Level Indicator & Dropdown */}
          <div className="relative self-center flex">
            <button 
              id="system_battery_level_indicator"
              onClick={() => setIsBatteryHistoryOpen(!isBatteryHistoryOpen)}
              className={`flex items-center gap-2 px-2.5 py-1.5 bg-white border transition-all text-[9.5px] uppercase font-bold tracking-wider h-[26px] self-center select-none cursor-pointer hover:bg-neutral-50 ${
                isLowPowerMode 
                  ? 'border-[#FF5A1F] bg-orange-50/75 animate-pulse text-[#FF5A1F]' 
                  : 'border-editorial-border text-editorial-text hover:border-editorial-text'
              } ${isBatteryHistoryOpen ? 'border-editorial-text ring-1 ring-editorial-text bg-[#FDFCF8]' : ''}`}
              title={isLowPowerMode 
                ? `Dynamic stress drain detected. Current battery is low due to extended uptime/scans (${currentBattery}% remaining). Click to toggle historical consumption ledger.` 
                : `Intelligence Mogul OS Power Station status: ${currentBattery}% - Nominal. Click to toggle historical consumption ledger.`}
            >
              {currentBattery >= 60 ? (
                <Battery size={12} className="text-emerald-500 shrink-0" />
              ) : currentBattery >= 30 ? (
                <BatteryMedium size={12} className="text-amber-500 shrink-0" />
              ) : (
                <BatteryWarning size={12} className="text-[#FF5A1F] shrink-0 animate-bounce" />
              )}
              <span className="font-mono font-extrabold">{currentBattery}%</span>
              {isLowPowerMode && (
                <span className="text-[#FF5A1F] font-black text-[8px] tracking-tighter ml-1 animate-pulse hidden md:inline">
                  {isUptimeLowPower ? 'UPTIME OVERLOAD' : 'LOW-POWER ALR'}
                </span>
              )}
              <ChevronDown size={10} className={`text-editorial-muted shrink-0 transition-transform duration-200 ${isBatteryHistoryOpen ? 'rotate-180 text-editorial-text' : ''}`} />
            </button>

            {/* Historical Battery Consumption Popover Dropdown */}
            {isBatteryHistoryOpen && (
              <div 
                id="battery_history_telemetry_popover"
                className="absolute right-0 top-8 w-[340px] md:w-[380px] bg-[#FDFCF8] border border-editorial-border shadow-xl p-4 z-55 animate-fade-in text-editorial-text text-left font-mono"
              >
                {/* Header Information */}
                <div className="flex items-center justify-between border-b border-editorial-border pb-2 mb-3">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                      SYSTEM POWER DIAGNOSTICS
                    </span>
                    <h4 className="text-[10px] font-black uppercase text-editorial-text tracking-wide flex items-center gap-1">
                      <TrendingUp size={11} className="text-[#FF5A1F]" />
                      <span>60-Min Battery Drainage Ledger</span>
                    </h4>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBatteryHistoryOpen(false);
                    }}
                    className="p-1 hover:bg-neutral-100 border border-editorial-border hover:border-editorial-text transition-colors cursor-pointer rounded-none"
                    title="Close Telemetry Dropdown"
                  >
                    <X size={10} />
                  </button>
                </div>

                {/* Simulated Power Capacity Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-[9px] mb-3 bg-white p-2 border border-editorial-border/60">
                  <div className="space-y-0.5 border-r border-editorial-border/40 pr-1">
                    <span className="text-editorial-muted block text-[7.5px] uppercase">OPERATING ZONE:</span>
                    <span className={`font-black uppercase flex items-center gap-1 ${
                      currentBattery >= 60 
                        ? 'text-emerald-600' 
                        : currentBattery >= 30 
                          ? 'text-amber-600' 
                          : 'text-[#FF5A1F]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        currentBattery >= 60 
                          ? 'bg-emerald-500' 
                          : currentBattery >= 30 
                            ? 'bg-amber-500' 
                            : 'bg-red-500 animate-ping'
                      }`} />
                      {currentBattery >= 60 ? 'NOMINAL' : currentBattery >= 30 ? 'EVAL LIMIT' : 'CRITICAL VOLT'}
                    </span>
                  </div>
                  <div className="space-y-0.5 pl-1">
                    <span className="text-editorial-muted block text-[7.5px] uppercase">DRAIN WEIGHT:</span>
                    <span className="font-extrabold text-editorial-text">
                      {isScanning ? '14.8 W/h (HEAVY)' : isLowPowerMode ? '3.8 W/h (CONSERVED)' : '1.4 W/h (IDLE)'}
                    </span>
                  </div>
                </div>

                {/* Line Chart showing battery charge level & color-coded warning zones */}
                <div className="w-full h-[150px] bg-white border border-editorial-border relative p-1.5 mb-3 select-none">
                  {/* Color-coded quick warning background labels */}
                  <div className="absolute top-1 left-2 pointer-events-none text-[7px] text-emerald-600/70 font-bold uppercase z-10">Nominal Zone (&gt;60%)</div>
                  <div className="absolute top-[55px] left-2 pointer-events-none text-[7px] text-amber-600/70 font-bold uppercase z-10">Warning Zone (30% - 60%)</div>
                  <div className="absolute bottom-2 left-2 pointer-events-none text-[7px] text-red-500/70 font-bold uppercase z-10 font-mono">Critical Zone (&lt;30%)</div>

                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={batteryHistoryData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                      <XAxis 
                        dataKey="minute" 
                        tickFormatter={(v) => v === 0 ? "now" : `${v}m`} 
                        stroke="#AEADAA"
                        fontSize={8}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        ticks={[0, 30, 60, 100]}
                        stroke="#AEADAA"
                        fontSize={8}
                        tickLine={false}
                      />
                      
                      {/* Color coded reference areas */}
                      <ReferenceArea
                        y1={0}
                        y2={30}
                        fill="#FEF2F2"
                        fillOpacity={0.65}
                        stroke="#FEE2E2"
                        strokeWidth={0.5}
                        strokeDasharray="2 2"
                      />
                      <ReferenceArea
                        y1={30}
                        y2={60}
                        fill="#FFFBEB"
                        fillOpacity={0.65}
                        stroke="#FEF3C7"
                        strokeWidth={0.5}
                        strokeDasharray="2 2"
                      />
                      <ReferenceArea
                        y1={60}
                        y2={100}
                        fill="#ECFDF5"
                        fillOpacity={0.65}
                        stroke="#D1FAE5"
                        strokeWidth={0.5}
                        strokeDasharray="2 2"
                      />

                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="p-2 bg-[#FDFCF8] border border-editorial-border shadow-md text-[8px] font-mono leading-relaxed space-y-0.5">
                                <div className="font-extrabold text-[#FF5A1F]">
                                  TIME: {data.minute === 0 ? "LIVE STATE" : `${data.minute} MINUTES AGO`}
                                </div>
                                <div className="text-editorial-text">
                                  LEVEL: <b className="font-sans font-bold text-editorial-text">{data.battery}%</b>
                                </div>
                                <div className="text-editorial-text">
                                  DRAIN RATE: <b className="font-sans font-bold text-editorial-text">{data.drainage} W/h</b>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />

                      <Line 
                        type="monotone" 
                        dataKey="battery" 
                        stroke={isScanning ? "#FF5A1F" : isLowPowerMode ? "#D97706" : "#10B981"} 
                        strokeWidth={1.8} 
                        dot={false}
                        activeDot={{ r: 4, stroke: "#333", strokeWidth: 1 }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Footer and statistical telemetry info */}
                <div className="flex items-center justify-between text-[7px] text-editorial-muted font-bold pt-1.5 border-t border-editorial-border">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    <span>DISCHARGE: {Number(((100 - currentBattery) / Math.max(1, uptimeHours)).toFixed(2))}%/HR RATE</span>
                  </div>
                  <div>
                    REF: 60M_STRESS_LEDG
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Global Mute/Unmute toggle */}
          <button
            id="global_audio_mute_toggle"
            onClick={onToggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-editorial-border hover:border-editorial-text transition-all text-[9.5px] uppercase font-bold tracking-wider cursor-pointer group shrink-0 h-[26px] self-center"
            title={isMuted ? "Unmute integrity scan sounds" : "Mute integrity scan sounds"}
          >
            {isMuted ? (
              <>
                <VolumeX size={11} className="text-[#FF5A1F] shrink-0" />
                <span className="text-editorial-muted group-hover:text-editorial-text hidden xs:inline">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 size={11} className="text-emerald-500 shrink-0" />
                <span className="text-editorial-text hidden xs:inline">SOUND ON</span>
              </>
            )}
          </button>

          {/* Return to The Throne — compact handoff control */}
          <Link
            href="/dashboard"
            id="header_return_to_throne"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] text-white border border-[#171717] hover:bg-[#FF5A1F] hover:border-[#FF5A1F] transition-all text-[9.5px] uppercase font-bold tracking-wider cursor-pointer h-[26px] self-center rounded-none"
            title="Return to The Throne"
          >
            <CornerDownRight size={11} />
            Throne
          </Link>

          {/* Active User Container Card */}
          <div className="flex items-center gap-2.5 px-3 py-1 bg-white border border-editorial-border rounded-none self-stretch text-xs">
            <div className="w-5 h-5 bg-editorial-text flex items-center justify-center font-bold text-white font-serif italic shadow-inner">
              Ω
            </div>
            <div className="text-left hidden lg:block">
              <div className="font-bold text-editorial-text text-[9px] uppercase tracking-wider leading-none">ORCHESTRATOR</div>
              <div className="text-[9px] text-[#FF5A1F] leading-none mt-1 uppercase font-bold tracking-wider">SYS_OP_SEC_5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Threat/Predictive Warning Drawer Dropdown */}
      {isAlertDrawerOpen && totalActive > 0 && (
        <div 
          className="absolute left-0 right-0 top-16 bg-[#FDFCF8] border-b border-editorial-border border-t border-[#FF5A1F] shadow-xl p-5 z-50 transition-all font-mono text-editorial-text"
          id="global_header_alert_drawer"
        >
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-editorial-border/60 pb-2.5">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-[#FF5A1F] animate-bounce" />
                <span className="text-xs font-black text-editorial-text uppercase tracking-widest">
                  SYS INTELLIGENCE RISK ALERT CENTER
                </span>
                <span className="text-[8px] bg-red-100 text-[#FF5A1F] px-1.5 py-0.5 rounded-none uppercase font-extrabold font-mono">
                  Real-time Neural Predictions Enabled
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] text-editorial-muted font-bold font-sans">
                  Last event registered: <b className="text-editorial-text font-serif italic">{lastAlertTime || "N/A"}</b>
                </span>
                <button
                  onClick={handleClearAllHeaderAlerts}
                  className="px-2.5 py-1 bg-white border border-[#FF5A1F]/40 text-[#FF5A1F] hover:bg-[#FF5A1F]/5 text-[9px] font-bold uppercase cursor-pointer rounded-none tracking-wider"
                >
                  Force Clear All Warnings
                </button>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 hover:bg-neutral-100 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* MACHINE LEARNING PREDICTIVE ALERTS OUTLOOK (-15m) */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-amber-700 text-[10px] font-black uppercase tracking-wider border-b border-amber-200 pb-1">
                  <Sparkles size={11} className="animate-spin text-amber-500" />
                  <span>PREDICTIVE SHIFT WARNINGS (15-MIN CRITICAL LOOKAHEAD)</span>
                </div>

                {predictiveAlerts.length === 0 ? (
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 text-[9px] text-amber-800 italic rounded-none font-sans">
                    No future threshold breaches forecasted in the next 15 minutes. Trend parameters are computationally stable.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar">
                    {predictiveAlerts.map((alert) => (
                      <div 
                        key={`pred-hdr-${alert.metricKey}`}
                        className="p-3 bg-amber-500/5 border border-amber-500/30 flex items-start justify-between gap-3 text-[10px] relative overflow-hidden"
                      >
                        {/* Visual blinking Amber Block Sidebar */}
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500"></div>

                        <div className="pl-1.5 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="bg-amber-600 text-white font-extrabold px-1.5 py-0.2 text-[8px] rounded-none">
                              PREDICTED BREACH @ {alert.timestamp}
                            </span>
                            <span className="font-extrabold text-editorial-text text-[9px] uppercase">{alert.metricName}</span>
                          </div>
                          
                          <p className="text-[9px] text-editorial-muted leading-tight font-sans italic">
                            Forecasted value: <b className="text-[#FF5A1F] font-mono font-extrabold">{alert.predictedValue}%</b>
                            &nbsp;(Current: {alert.historicalValues[alert.historicalValues.length - 1]}% | Model Confidence: <b className="text-emerald-700">{alert.confidenceScore}%</b>)
                          </p>

                          <div className="flex items-center gap-1 text-[8px] text-amber-800 font-bold uppercase tracking-wider font-sans mt-1">
                            <CornerDownRight size={8} />
                            <span>Action Needed: {alert.recommendedAction || "Monitor metric stability."}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDismissPredictive(alert.metricKey)}
                          className="shrink-0 text-[8px] font-bold text-editorial-muted hover:text-editorial-text px-1.5 py-0.5 border border-editorial-border hover:bg-white cursor-pointer rounded-none uppercase"
                        >
                          DISMISS
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* REAL-TIME VOLATILITY ALERTS */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-[#FF5A1F] text-[10px] font-black uppercase tracking-wider border-b border-[#FF5A1F]/20 pb-1">
                  <Activity size={11} />
                  <span>ACTIVE VOLATILITY ANOMALIES (MEASURED DELTAS)</span>
                </div>

                {volatilityAlerts.length === 0 ? (
                  <div className="p-4 bg-[#FF5A1F]/5 border border-[#FF5A1F]/10 text-[9px] text-editorial-muted italic rounded-none font-sans">
                    No active real-time volatility warnings recorded. Slopes are within baseline margins.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar">
                    {volatilityAlerts.map((alert) => (
                      <div 
                        key={`vol-hdr-${alert.id}`}
                        className="p-3 bg-[#FF5A1F]/5 border border-[#FF5A1F]/30 flex items-start justify-between gap-3 text-[10px] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#FF5A1F]"></div>
                        <div className="pl-1.5 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-editorial-text uppercase">{alert.metric}</span>
                            <span className="text-[8px] font-mono text-white bg-[#FF5A1F] px-1 py-0.2 uppercase leading-none font-bold">
                              DELTA BREAKOUT
                            </span>
                          </div>
                          <p className="text-[9px] text-editorial-muted leading-tight font-sans">
                            Observed Delta: <b className="text-[#FF5A1F] font-bold font-mono">+{alert.delta}%</b>
                            &nbsp;(Shifted from {alert.prev}% to {alert.last}% at {alert.time})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
