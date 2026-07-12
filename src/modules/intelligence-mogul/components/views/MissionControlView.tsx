"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  Compass,
  Layers,
  TrendingUp,
  Award,
  Activity,
  Sparkles,
  Clock,
  Cpu,
  Server,
  Bell,
  BellOff,
  AlertTriangle,
  Sliders,
  Download,
  Brain
} from "lucide-react";
import { jsPDF } from "jspdf";
import { ROADMAP_ITEMS } from "@/modules/intelligence-mogul/data/mock-data";
import { analyzeMetricPredictiveTrend, PredictionResult } from "@/modules/intelligence-mogul/lib/predictive_analytics";
import { VolatilityAlert } from "@/modules/intelligence-mogul/types";

export default function MissionControlView() {
  const [activeTab, setActiveTab] = useState<"foundational" | "expansion" | "realization">("foundational");
  const [telemetryTicks, setTelemetryTicks] = useState({
    cultural: [30, 40, 35, 50, 68, 72, 79, 84, 82],
    technical: [40, 45, 55, 60, 58, 67, 72, 75, 76],
    operational: [10, 20, 25, 45, 50, 55, 61, 65, 68],
    efficiency: [80, 85, 82, 88, 91, 89, 93, 94, 94]
  });

  const [telemetryState, setTelemetryState] = useState<"online" | "syncing" | "failed">("online");
  const [pausedTimer, setPausedTimer] = useState<number>(0);

  // Volatility Interceptor state definitions
  const [volatilityThreshold, setVolatilityThreshold] = useState<number>(6);
  const [alertLog, setAlertLog] = useState<VolatilityAlert[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Machine Learning-based Predictive Trend Analyzer State
  const [modelType, setModelType] = useState<"regression" | "exponential" | "bayesian">("exponential");
  const [predictiveLowerLimit, setPredictiveLowerLimit] = useState<number>(20);
  const [predictiveUpperLimit, setPredictiveUpperLimit] = useState<number>(95);
  const [confidenceIntervalInput, setConfidenceIntervalInput] = useState<number>(95);
  const [dismissedPredictiveKeys, setDismissedPredictiveKeys] = useState<string[]>([]);


  // Decrement custom override pause timer (allows manual testing of connection states)
  useEffect(() => {
    if (pausedTimer > 0) {
      const pId = setTimeout(() => {
        setPausedTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(pId);
    }
  }, [pausedTimer]);

  // Periodic automatic simulated telemetry connection updates
  useEffect(() => {
    if (pausedTimer > 0) return;

    const intervalId = setInterval(() => {
      // Trigger update sync sequences
      setTelemetryState("syncing");

      const delay = 1500 + Math.random() * 1500; // sync duration between 1.5s to 3s

      const finishTimeout = setTimeout(() => {
        // 85% success chance, 15% transient error chance
        if (Math.random() < 0.85) {
          setTelemetryState("online");
          
          // Generate a real-time shift in metric sparklines
          setTelemetryTicks(prev => {
            const injectUpdateNoise = (arr: number[]) => {
              const last = arr[arr.length - 1];
              const noise = Math.floor(Math.random() * 5) - 2; // -2 to +2
              const nextVal = Math.min(100, Math.max(10, last + noise));
              return [...arr.slice(1), nextVal];
            };
            return {
              cultural: injectUpdateNoise(prev.cultural),
              technical: injectUpdateNoise(prev.technical),
              operational: injectUpdateNoise(prev.operational),
              efficiency: injectUpdateNoise(prev.efficiency)
            };
          });
        } else {
          setTelemetryState("failed");
          // Hold the failure brief check before returning back to online
          const recoverTimeout = setTimeout(() => {
            setTelemetryState("online");
          }, 3500);
          return () => clearTimeout(recoverTimeout);
        }
      }, delay);

      return () => clearTimeout(finishTimeout);
    }, 12000); // Trigger a sync sequence every 12 seconds

    return () => clearInterval(intervalId);
  }, [pausedTimer]);

  // Trigger effect that watches D3 sparkline trends and flags threshold-crossing volatility events.
  // Detection is deferred to a timeout callback so no setState runs synchronously in the effect body.
  useEffect(() => {
    const detectTimer = setTimeout(() => {
      const keys = ["cultural", "technical", "operational", "efficiency"] as const;
      const names = {
        cultural: "Cultural Alignment Rating",
        technical: "Technical Cohesion Rating",
        operational: "Operational Sync Deployment",
        efficiency: "Resource Efficiency Assurance",
      };

      const triggered: VolatilityAlert[] = [];
      const now = new Date().toLocaleTimeString();

      keys.forEach((key) => {
        const arr = telemetryTicks[key];
        if (arr.length >= 2) {
          const last = arr[arr.length - 1];
          const prev = arr[arr.length - 2];
          const delta = Math.abs(last - prev);
          if (delta >= volatilityThreshold) {
            triggered.push({
              id: `${key}-${arr.length}-${last}-${prev}`, // unique ID per specific tick event configuration
              metric: names[key],
              key,
              delta,
              prev,
              last,
              time: now,
              cleared: false,
            });
          }
        }
      });

      if (triggered.length > 0) {
        setAlertLog((prev) => {
          // Prevent registering active duplicate events for the exact same event signature (id)
          const filtered = triggered.filter(t => !prev.some(p => p.id === t.id));
          if (filtered.length === 0) return prev;
          return [...filtered, ...prev].slice(0, 12); // Keep up to 12 elements
        });
      }
    }, 0);

    return () => clearTimeout(detectTimer);
  }, [telemetryTicks, volatilityThreshold]);

  // Evaluates mathematical ML predictions on every telemetry tick or hyperparameter change.
  // Purely derived from inputs, so it is memoized instead of mirrored into state.
  const predictiveAlerts = useMemo(() => {
    const keys = ["cultural", "technical", "operational", "efficiency"] as const;
    const names = {
      cultural: "Cultural Alignment Rating",
      technical: "Technical Cohesion Rating",
      operational: "Operational Sync Deployment",
      efficiency: "Resource Efficiency Assurance",
    };

    const nextPredictiveAlerts: PredictionResult[] = [];

    keys.forEach((key) => {
      const history = telemetryTicks[key];
      const result = analyzeMetricPredictiveTrend(
        key,
        names[key],
        history,
        modelType,
        predictiveUpperLimit,
        predictiveLowerLimit,
        volatilityThreshold,
        confidenceIntervalInput
      );

      if (result.hasBreached && !dismissedPredictiveKeys.includes(key)) {
        nextPredictiveAlerts.push(result);
      }
    });

    return nextPredictiveAlerts;
  }, [
    telemetryTicks,
    modelType,
    predictiveLowerLimit,
    predictiveUpperLimit,
    volatilityThreshold,
    confidenceIntervalInput,
    dismissedPredictiveKeys
  ]);

  // Broadcast alert updates dynamically to the global Header.tsx component
  useEffect(() => {
    const activeVo = alertLog.filter(a => !a.cleared);
    const activePr = predictiveAlerts;

    window.dispatchEvent(
      new CustomEvent("intelligence-alert-broadcast", {
        detail: {
          volatility: activeVo,
          predictive: activePr
        }
      })
    );
  }, [alertLog, predictiveAlerts]);

  // Dynamic feedback sync: Listen for dismiss and clear operations starting in the header alert panel
  useEffect(() => {
    const handleDismiss = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.type === "predictive") {
        const key = customEvent.detail.key;
        setDismissedPredictiveKeys((prev) => {
          if (prev.includes(key)) return prev;
          return [...prev, key];
        });
      }
    };

    const handleClearAll = () => {
      setAlertLog(prev => prev.map(a => ({ ...a, cleared: true })));
      setDismissedPredictiveKeys(["cultural", "technical", "operational", "efficiency"]);
    };

    window.addEventListener("intelligence-alert-dismiss", handleDismiss);
    window.addEventListener("intelligence-alert-clear-all", handleClearAll);

    return () => {
      window.removeEventListener("intelligence-alert-dismiss", handleDismiss);
      window.removeEventListener("intelligence-alert-clear-all", handleClearAll);
    };
  }, []);


  // Command injector simulating random high volatility telemetry spike for validation/testing
  const triggerVolatilitySpike = () => {
    const keys = ["cultural", "technical", "operational", "efficiency"] as const;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    setTelemetryTicks(prev => {
      const arr = prev[randomKey];
      const last = arr[arr.length - 1];
      // Generate a huge spike! Jump 10 to 18 units up or down
      const isUp = Math.random() > 0.5;
      const jump = 10 + Math.floor(Math.random() * 8); // 10 to 17 units
      const diff = isUp ? jump : -jump;
      let nextVal = last + diff;
      if (nextVal > 100) nextVal = 100 - (jump / 2);
      if (nextVal < 15) nextVal = 15 + (jump / 2);
      
      const newArr = [...arr.slice(1), Math.round(nextVal)];
      return {
        ...prev,
        [randomKey]: newArr
      };
    });
  };

  // Command injector forcing a steep mathematical slope resulting in a projected 15-minute breach
  const triggerPredictiveBreachSpike = () => {
    const keys = ["cultural", "technical", "operational", "efficiency"] as const;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    // Un-dismiss key so threat indicator pops up instantly in UI
    setDismissedPredictiveKeys(prev => prev.filter(k => k !== randomKey));
    
    setTelemetryTicks(prev => {
      const arr = [...prev[randomKey]];
      const len = arr.length;
      if (len >= 3) {
        const isUp = Math.random() > 0.5;
        // Inject a steep, sequential slope
        if (isUp) {
          arr[len - 3] = 45;
          arr[len - 2] = 70;
          arr[len - 1] = 95; // Rocket vector pointing above Upper Limit
        } else {
          arr[len - 3] = 75;
          arr[len - 2] = 45;
          arr[len - 1] = 15; // Steep vector pointing below Lower Limit
        }
      }
      return {
        ...prev,
        [randomKey]: arr
      };
    });
  };


  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Color definitions
    const cPrimary = [255, 62, 0]; // #FF5A1F
    const cDark = [26, 26, 26]; // #1A1A1A
    const cMuted = [115, 115, 115]; // #737373
    const cLightBg = [253, 252, 248]; // #FDFCF8
    const cBorder = [220, 215, 200]; // editorial-border

    // Add border around the page (editorial styling)
    doc.setDrawColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setLineWidth(1);
    doc.rect(8, 8, 194, 281); // 210-16 x 297-16
    
    // Grid Lines/Header border
    doc.setDrawColor(cDark[0], cDark[1], cDark[2]);
    doc.setLineWidth(0.3);
    doc.line(8, 48, 202, 48);

    // Header Brief Title
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
      doc.text("INTELLIGENCE SYSTEM INTEL DIRECTIVE", 15, 18);

    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("EXECUTIVE TELEMETRY INTEGRATION REPORT", 15, 26);

    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.text("SR-902 Verification Brief | Local Timestamp: " + new Date().toLocaleString(), 15, 32);

    // Active connection state badge on the top right
    const connStr = telemetryState.toUpperCase();
    const connColor = telemetryState === "online" ? [16, 185, 129] : telemetryState === "syncing" ? [245, 158, 11] : [220, 38, 38];
    doc.setFillColor(connColor[0], connColor[1], connColor[2]);
    doc.rect(150, 15, 45, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);
    doc.text("STATUS: " + connStr, 172.5, 20.5, { align: "center" });

    // Section 1: HIGH-LEVEL EXECUTIVE SUMMARY KEY METRICS
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("01 / CURRENT INTEGRATION INDICES", 15, 56);

    // Section block background
    doc.setFillColor(cLightBg[0], cLightBg[1], cLightBg[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.rect(15, 62, 180, 24, "FD");

    // Divider lines in summary block
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.line(75, 62, 75, 86);
    doc.line(135, 62, 135, 86);

    // System Uptime Metric
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.text("SYSTEM UPTIME", 20, 68);
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(telemetryState === "failed" ? "99.91%" : "99.98%", 20, 75);
    doc.setTextColor(telemetryState === "failed" ? 220 : 16, telemetryState === "failed" ? 38 : 185, telemetryState === "failed" ? 38 : 129);
    doc.setFontSize(7);
    doc.text(telemetryState === "failed" ? "CRITICAL" : "OPERATIONAL", 20, 81);

    // Active Agents Metric
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.text("ACTIVE COMPILER AGENTS", 80, 68);
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(telemetryState === "failed" ? "12 Active" : "14 Operational", 80, 75);
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFontSize(7);
    doc.text("BALANCED SHARDS", 80, 81);

    // Resource Utilization Metric
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.text("RESOURCE CPU LOADING", 140, 68);
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    const cpuStr = telemetryState === "syncing" ? "68.1% CPU" : telemetryState === "failed" ? "18.2% CPU" : "42.6% CPU";
    doc.text(cpuStr, 140, 75);
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFontSize(7);
    doc.text("X86_64 OPTIMIZED", 140, 81);


    // Section 2: REAL-TIME SYSTEM TELEMETRY RATINGS
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("02 / REAL-TIME SYSTEM TELEMETRY RATINGS", 15, 98);

    // Table headers
    const startY = 104;
    doc.setFillColor(cDark[0], cDark[1], cDark[2]);
    doc.rect(15, startY, 180, 7, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("METRIC CATEGORY", 20, startY + 5);
    doc.text("LAST OBSERVED VALUE", 80, startY + 5);
    doc.text("DELTA SHIFT", 130, startY + 5);
    doc.text("ALARM STATUS", 165, startY + 5);

    // Table rows
    const ratings = [
      { name: "CULTURAL ALIGNMENT", val: telemetryTicks.cultural[telemetryTicks.cultural.length - 1], prev: telemetryTicks.cultural[telemetryTicks.cultural.length - 2] || 0 },
      { name: "TECHNICAL COHESION", val: telemetryTicks.technical[telemetryTicks.technical.length - 1], prev: telemetryTicks.technical[telemetryTicks.technical.length - 2] || 0 },
      { name: "OPERATIONAL SYNC", val: telemetryTicks.operational[telemetryTicks.operational.length - 1], prev: telemetryTicks.operational[telemetryTicks.operational.length - 2] || 0 },
      { name: "RESOURCE EFFICIENCY", val: telemetryTicks.efficiency[telemetryTicks.efficiency.length - 1], prev: telemetryTicks.efficiency[telemetryTicks.efficiency.length - 2] || 0 },
    ];

    let currentY = startY + 7;
    ratings.forEach((row) => {
      // Row alternating color background
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
      doc.rect(15, currentY, 180, 10, "FD");

      doc.setTextColor(cDark[0], cDark[1], cDark[2]);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.text(row.name, 20, currentY + 6.5);

      doc.setFont("Helvetica", "normal");
      doc.text(`${row.val}%`, 80, currentY + 6.5);

      const delta = row.val - row.prev;
      const isUp = delta >= 0;
      doc.setTextColor(isUp ? 16 : 220, isUp ? 185 : 38, isUp ? 129 : 38);
      doc.setFont("Helvetica", "bold");
      doc.text(`${isUp ? "▲ +" : "▼ "}${delta}%`, 130, currentY + 6.5);

      const isBreached = Math.abs(delta) >= volatilityThreshold;
      doc.setTextColor(isBreached ? 220 : 115, isBreached ? 38 : 115, isBreached ? 38 : 115);
      doc.setFont("Helvetica", "bold");
      doc.text(isBreached ? "VOLATILE" : "STABLE", 165, currentY + 6.5);

      currentY += 10;
    });


    // Section 3: ACTIVE VOLATILITY TRIGGERS & DISPATCH LOG
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("03 / VOLATILITY BREACH EVENT LOGS", 15, 154);

    const activeAlerts = alertLog.filter(a => !a.cleared);
    let currentY3 = 160;

    if (activeAlerts.length === 0) {
      doc.setFillColor(cLightBg[0], cLightBg[1], cLightBg[2]);
      doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
      doc.rect(15, currentY3, 180, 12, "FD");
      
      doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.text("No active volatility breaches registered. Volatility settings within the nominal limits.", 20, currentY3 + 7);
      currentY3 += 12;
    } else {
      doc.setFillColor(245, 245, 245);
      doc.rect(15, currentY3, 180, 5, "F");
      
      doc.setTextColor(cDark[0], cDark[1], cDark[2]);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7);
      doc.text("TIMESTAMP", 20, currentY3 + 3.5);
      doc.text("BREACH COMPLIANT EVENT", 50, currentY3 + 3.5);
      doc.text("SHIFT MARGIN", 140, currentY3 + 3.5);
      doc.text("LIMIT TARGET", 170, currentY3 + 3.5);

      currentY3 += 5;
      activeAlerts.slice(0, 3).forEach((alert) => {
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
        doc.rect(15, currentY3, 180, 7, "FD");

        doc.setTextColor(cDark[0], cDark[1], cDark[2]);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(7);
        doc.text(alert.time, 20, currentY3 + 4.5);
        
        doc.setFont("Helvetica", "bold");
        doc.text(alert.metric, 50, currentY3 + 4.5);

        doc.setTextColor(220, 38, 38);
        doc.text(`${alert.prev}% -> ${alert.last}%`, 140, currentY3 + 4.5);

        doc.setTextColor(cDark[0], cDark[1], cDark[2]);
        doc.text(`>= ${volatilityThreshold}%`, 170, currentY3 + 4.5);

        currentY3 += 7;
      });
      if (activeAlerts.length > 3) {
        doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
        doc.setFont("Helvetica", "italic");
        doc.setFontSize(6.5);
        doc.text(`... and ${activeAlerts.length - 3} additional volatility alarms suppressed.`, 20, currentY3 + 5);
        currentY3 += 7;
      }
    }

    // Section 4: MACHINE LEARNING PREDICTIVE FORECASTS
    const predC = analyzeMetricPredictiveTrend("cultural", "Cultural Alignment Rating", telemetryTicks.cultural, modelType, predictiveUpperLimit, predictiveLowerLimit, volatilityThreshold, confidenceIntervalInput);
    const predT = analyzeMetricPredictiveTrend("technical", "Technical Cohesion Rating", telemetryTicks.technical, modelType, predictiveUpperLimit, predictiveLowerLimit, volatilityThreshold, confidenceIntervalInput);
    const predO = analyzeMetricPredictiveTrend("operational", "Operational Sync Deployment", telemetryTicks.operational, modelType, predictiveUpperLimit, predictiveLowerLimit, volatilityThreshold, confidenceIntervalInput);
    const predE = analyzeMetricPredictiveTrend("efficiency", "Resource Efficiency Assurance", telemetryTicks.efficiency, modelType, predictiveUpperLimit, predictiveLowerLimit, volatilityThreshold, confidenceIntervalInput);

    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("04 / ML PREDICTIVE TELEMETRY FOCUS (15-MIN CRITICAL LOOKAHEAD)", 15, currentY3 + 7);

    // Context Card
    doc.setFillColor(cLightBg[0], cLightBg[1], cLightBg[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.rect(15, currentY3 + 12, 180, 26, "FD");

    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(`ACTIVE FORECAST SOLVER: ${modelType.toUpperCase()} MODEL ENGINE`, 20, currentY3 + 17);
    
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7);
    doc.text(`Hyperparameters: Upper Basin Limit: ${predictiveUpperLimit}% | Lower Basin Limit: ${predictiveLowerLimit}% | Model Confidence Interval: ${confidenceIntervalInput}%`, 20, currentY3 + 22);

    // Predictive metric rows
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.text(`• CULTURAL_ALIGN: ${predC.predictedValue}%  (Status: ${predC.hasBreached ? "BREACH_WARNING" : "STABLE"})`, 20, currentY3 + 28);
    doc.text(`• TECH_COHESION: ${predT.predictedValue}%  (Status: ${predT.hasBreached ? "BREACH_WARNING" : "STABLE"})`, 105, currentY3 + 28);
    doc.text(`• OPERATIONAL_SYNC: ${predO.predictedValue}%  (Status: ${predO.hasBreached ? "BREACH_WARNING" : "STABLE"})`, 20, currentY3 + 33);
    doc.text(`• RESOURCE_EFF: ${predE.predictedValue}%  (Status: ${predE.hasBreached ? "BREACH_WARNING" : "STABLE"})`, 105, currentY3 + 33);

    // Section 5: EXECUTIVE AUTHORIZATION DIRECTIVES
    doc.setTextColor(cPrimary[0], cPrimary[1], cPrimary[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("05 / SYSTEM ASSURANCES & OPERATIONS STANDARDS", 15, currentY3 + 45);

    doc.setFillColor(cLightBg[0], cLightBg[1], cLightBg[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.rect(15, currentY3 + 50, 180, 16, "FD");

    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("OFFICER METADATA CERTIFICATE STATEMENT:", 20, currentY3 + 55);
    
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Cryptographic snap-logs verified. Prediction values run through distributed neural estimators.", 20, currentY3 + 60);

    // Signatures
    doc.line(130, currentY3 + 81, 185, currentY3 + 81);
    doc.setTextColor(cDark[0], cDark[1], cDark[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.text("VERIFYING OFFICER SIGNATURE", 130, currentY3 + 85);
    
    doc.setFont("Helvetica", "italic");
    doc.text("Sentinel Core Auto-sign", 135, currentY3 + 78);

    // Save PDF
      doc.save(`INTELLIGENCE_INTEGRATION_BRIEF_${Date.now()}.pdf`);
  };


  const generateSparkline = (data: number[], projections?: number[]) => {
    const width = 140;
    const height = 24;
    const allData = projections ? [...data, ...projections] : data;
    const min = Math.min(...allData);
    const max = Math.max(...allData);
    const range = max - min || 1;
    
    // Historical segment coordinates
    const points = data.map((val, index) => {
      const x = (index / (allData.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(" ");

    // Projected segment coordinates (connects end of history to forecast points)
    let projectionPoints = "";
    if (projections) {
      projectionPoints = [data[data.length - 1], ...projections].map((val, index) => {
        const x = ((data.length - 1 + index) / (allData.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
      }).join(" ");
    }

    return (
      <svg className="w-[140px] h-[24px]">
        <polyline
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="1.5"
          points={points}
        />
        {projections && (
          <polyline
            fill="none"
            stroke="#D97706"
            strokeWidth="1.25"
            strokeDasharray="2,2"
            points={projectionPoints}
          />
        )}
        <circle
          cx={width}
          cy={height - ((allData[allData.length - 1] - min) / range) * height}
          r="2.5"
          fill={projections ? "#D97706" : "#1A1A1A"}
        />
      </svg>
    );
  };


  const activeRoadmap = ROADMAP_ITEMS[activeTab];

  return (
    <div id="mission_control_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      
      {/* Dedicated Mission Control Header with Real-time LED Indicators */}
      <div className="p-5 bg-white rounded-none border border-editorial-border flex flex-col xl:flex-row xl:items-center justify-between gap-4" id="mission_control_header">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#FF5A1F] block mb-1 tracking-wider">
            INTELLIGENCE SYSTEM CORE VIEW
          </span>
          <h2 className="text-sm font-black uppercase tracking-widest">
            OPERATIONAL INTEGRATION INDEX
          </h2>
          <p className="text-[10px] text-editorial-muted font-sans mt-1">
            Real-time telemetry streams & autonomous system orchestrations
          </p>
        </div>

        {/* Right-side Action HUD Panel */}
        <div className="flex flex-wrap items-center gap-3 self-start xl:self-auto" id="header_action_panel">
          {/* Telemetry LED Control and Status Area */}
          <div className="flex flex-wrap items-center gap-3 bg-[#FDFCF8] p-3 border border-editorial-border rounded-none" id="telemetry_status_hud_container">
            
            <div className="flex items-center gap-2.5 pr-3.5 border-r border-editorial-border/60">
              <span className="text-[8px] uppercase tracking-wider font-extrabold text-editorial-muted font-sans">CONN STATUS:</span>
              <div className="flex items-center gap-1.5 font-bold text-[9px] tracking-widest">
                {telemetryState === "online" && (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-700 font-extrabold">ONLINE</span>
                  </>
                )}
                {telemetryState === "syncing" && (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-amber-700 font-extrabold">SYNCING</span>
                  </>
                )}
                {telemetryState === "failed" && (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span className="text-red-600 font-extrabold">FAILED</span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Manual Override LED Shunts */}
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[8px] uppercase tracking-wider font-extrabold text-editorial-muted mr-1 font-sans">FORCE:</span>
              
              {/* ONLINE FORCE INDICATOR */}
              <button
                onClick={() => {
                  setTelemetryState("online");
                  setPausedTimer(10); // Pauses auto cycle for 10 seconds
                }}
                title="Force Telemetry State -> ONLINE"
                className={`px-1.5 py-0.5 text-[8px] font-bold tracking-wider transition duration-150 border cursor-pointer rounded-none uppercase ${
                  telemetryState === "online"
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                    : "bg-white border-editorial-border text-editorial-muted hover:text-editorial-text"
                }`}
              >
                ON
              </button>

              {/* SYNCING FORCE INDICATOR */}
              <button
                onClick={() => {
                  setTelemetryState("syncing");
                  setPausedTimer(10); // Pauses auto cycle for 10 seconds
                }}
                title="Force Telemetry State -> SYNCING"
                className={`px-1.5 py-0.5 text-[8px] font-bold tracking-wider transition duration-150 border cursor-pointer rounded-none uppercase ${
                  telemetryState === "syncing"
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                    : "bg-white border-editorial-border text-editorial-muted hover:text-editorial-text"
                }`}
              >
                SYNC
              </button>

              {/* SYNC RUNAWAY COLLISION TRIGGER */}
              <button
                onClick={() => {
                  setTelemetryState("failed");
                  setPausedTimer(10); // Pauses auto cycle for 10 seconds
                }}
                title="Force Telemetry State -> DISCONNECTED / FAILED"
                className={`px-1.5 py-0.5 text-[8px] font-bold tracking-wider transition duration-150 border cursor-pointer rounded-none uppercase ${
                  telemetryState === "failed"
                    ? "bg-[#1A1A1A] border-[#FF5A1F] text-[#FF5A1F] font-black"
                    : "bg-white border-editorial-border text-editorial-muted hover:text-[#FF5A1F]"
                }`}
              >
                FAIL
              </button>
            </div>
          </div>

          {/* Executive Report Exporter */}
          <button
            onClick={handleExportPDF}
            className="h-[43px] px-3.5 text-[10px] font-bold text-white bg-[#1A1A1A] hover:bg-[#FF5A1F] border border-[#1A1A1A] hover:border-[#FF5A1F] active:scale-95 transition-all flex items-center gap-2 rounded-none uppercase tracking-widest cursor-pointer leading-none"
            title="Download executive-level structured PDF telemetry analysis report"
            id="btn_export_pdf_report"
          >
            <Download size={12} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Volatility Threshold Monitor Indicator Sub-bar */}
      <div className="px-5 py-3.5 bg-[#FF5A1F]/5 border-l-4 border-l-[#FF5A1F] border-t border-b border-r border-[#FF5A1F]/30 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono" id="volatility_configuration_bar">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#FF5A1F] text-[10px] font-bold uppercase tracking-wider">
            <Sliders size={12} />
            <span>Volatility Settings</span>
          </div>
          <span className="text-[10px] text-editorial-muted hidden md:inline">|</span>
          <div className="flex items-center gap-2.5 text-[10px] text-editorial-text font-bold">
            <span className="whitespace-nowrap">CROSS THRESHOLD: <b className="text-[#FF5A1F] font-mono">{volatilityThreshold}%</b></span>
            <input 
              type="range" 
              min="2" 
              max="15" 
              value={volatilityThreshold} 
              onChange={(e) => setVolatilityThreshold(parseInt(e.target.value))}
              className="w-24 accent-[#FF5A1F] cursor-ew-resize h-1 bg-editorial-border/60 outline-none"
              title="Drag slider to set the volatility alarm trigger threshold"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerVolatilitySpike}
            className="px-3 py-1 text-[9px] font-bold text-white bg-[#FF5A1F] hover:bg-[#D63000] active:scale-95 transition-all flex items-center gap-1.5 rounded-none uppercase tracking-wider cursor-pointer"
            title="Surgically inject a random high volatility telemetry shift to verify immediate crossing reaction"
          >
            <Activity size={10} className="animate-pulse" />
            Inject Spike Trigger
          </button>
          
          {alertLog.some(a => !a.cleared) && (
            <button
              onClick={() => {
                setAlertLog(prev => prev.map(a => ({ ...a, cleared: true })));
              }}
              className="px-2.5 py-1 text-[9px] font-bold text-editorial-muted hover:text-editorial-text bg-white border border-editorial-border hover:border-editorial-text transition-all rounded-none uppercase tracking-wider cursor-pointer"
            >
              Clear Active Alerts
            </button>
          )}
        </div>
      </div>

      {/* Predictive ML Trend Analyzer Configuration Panel */}
      <div 
        className="px-5 py-4 bg-[#D97706]/5 border-l-4 border-l-[#D97706] border-t border-b border-r border-[#D97706]/20 flex flex-col xl:flex-row xl:items-center justify-between gap-4 font-mono mt-3" 
        id="predictive_configuration_bar"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#D97706] text-[10px] font-black uppercase tracking-wider">
            <Brain size={12} className="text-[#D97706] animate-pulse" />
            <span>ML Predictive Trend Settings</span>
          </div>
          <span className="text-[10px] text-editorial-border hidden xl:inline">|</span>
          
          {/* Model Selection Dropdown */}
          <div className="flex items-center gap-1.5 text-[10px] text-editorial-text">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-editorial-muted">ENGINE:</span>
            <select
              value={modelType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setModelType(e.target.value as "regression" | "exponential" | "bayesian")
              }
              className="px-2 py-1 bg-white border border-editorial-border text-editorial-text font-mono text-[9px] font-bold outline-none cursor-pointer focus:border-[#D97706]"
              title="Select the machine learning mathematical solver for the 15-minute lookahead forecast"
            >
              <option value="regression">Standard Linear Regression Solver</option>
              <option value="exponential">Double Exponential Smoothener (Holt&apos;s Linear Mode)</option>
              <option value="bayesian">Bayesian Estimator (Mean Reverting Drift)</option>
            </select>
          </div>

          <span className="text-[10px] text-editorial-border hidden xl:inline">|</span>

          {/* LOWER LIMIT SLIDER */}
          <div className="flex items-center gap-2 text-[10px] text-editorial-text font-bold">
            <span className="whitespace-nowrap text-editorial-muted font-sans text-[9px] font-bold uppercase">SAFETY BASIN floor:</span>
            <span className="text-[#D97706] font-mono">{predictiveLowerLimit}%</span>
            <input 
              type="range" 
              min="10" 
              max="40" 
              value={predictiveLowerLimit} 
              onChange={(e) => setPredictiveLowerLimit(parseInt(e.target.value))}
              className="w-16 h-1 bg-editorial-border accent-[#D97706] outline-none cursor-ew-resize"
              title="Forecast safety floor trigger limit"
            />
          </div>

          <span className="text-[10px] text-editorial-border hidden xl:inline">|</span>

          {/* UPPER LIMIT SLIDER */}
          <div className="flex items-center gap-2 text-[10px] text-editorial-text font-bold">
            <span className="whitespace-nowrap text-editorial-muted font-sans text-[9px] font-bold uppercase">SAFETY BASIN CEILING:</span>
            <span className="text-[#FF5A1F] font-mono">{predictiveUpperLimit}%</span>
            <input 
              type="range" 
              min="75" 
              max="98" 
              value={predictiveUpperLimit} 
              onChange={(e) => setPredictiveUpperLimit(parseInt(e.target.value))}
              className="w-16 h-1 bg-editorial-border accent-[#D97706] outline-none cursor-ew-resize"
              title="Forecast safety ceiling trigger limit"
            />
          </div>

          <span className="text-[10px] text-editorial-border hidden xl:inline">|</span>

          {/* CONFIDENCE INTERVAL */}
          <div className="flex items-center gap-1.5 text-[10px] text-editorial-text font-bold">
            <span className="font-sans text-[9px] font-bold uppercase text-editorial-muted">INTERVAL:</span>
            <div className="flex border border-editorial-border rounded-none bg-white p-0.5 text-[8px]">
              {[80, 95, 99].map((val) => (
                <button
                  key={`conf-${val}`}
                  onClick={() => setConfidenceIntervalInput(val)}
                  className={`px-1.5 py-0.5 font-bold cursor-pointer transition ${
                    confidenceIntervalInput === val 
                      ? "bg-[#D97706] text-white" 
                      : "text-editorial-muted hover:text-editorial-text"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end xl:self-auto">
          {/* Active alerts count inside this view */}
          {predictiveAlerts.length > 0 && (
            <span className="text-[8px] bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706] px-2 py-0.5 font-black uppercase tracking-wider animate-pulse font-mono">
              {predictiveAlerts.length} FORECAST WARNS ACTIVE
            </span>
          )}

          <button
            onClick={triggerPredictiveBreachSpike}
            className="px-3 py-1 bg-[#D97706] hover:bg-[#B45309] active:scale-95 transition-all text-white font-mono text-[9px] font-bold uppercase rounded-none tracking-wider flex items-center gap-1 cursor-pointer"
            title="Force a steep trend direction simulation to test pre-breach model triggers"
          >
            <Brain size={10} className="animate-bounce" />
            Inject ML Predictive Anomaly
          </button>

          {dismissedPredictiveKeys.length > 0 && (
            <button
              onClick={() => setDismissedPredictiveKeys([])}
              className="px-2.5 py-1 text-[9px] font-bold text-editorial-muted hover:text-editorial-text bg-white border border-editorial-border hover:border-editorial-text transition-all rounded-none uppercase tracking-wider cursor-pointer"
            >
              Reset Dismissed Warnings
            </button>
          )}
        </div>
      </div>


      {/* Volatility Indicator Alerts List in Header */}
      {alertLog.filter(a => !a.cleared).length > 0 && (
        <div className="border border-[#FF5A1F] bg-[#FF5A1F]/10 p-4 rounded-none space-y-3" id="header_active_alarms_panel">
          <div className="flex items-center justify-between border-b border-[#FF5A1F]/20 pb-2">
            <div className="flex items-center gap-2 text-[#FF5A1F] text-[10px] font-black uppercase tracking-widest leading-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A1F]"></span>
              </span>
              <span>VOLATILITY BREACH DETECTED</span>
              <span className="bg-[#FF5A1F] text-white px-1.5 py-0.5 text-[8px] font-mono font-bold leading-none">
                TRIGGER CROSSING
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#FF5A1F] font-black tracking-wider">
                {alertLog.filter(a => !a.cleared).length} ACTIVE ALARMS
              </span>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-editorial-muted hover:text-editorial-text p-0.5 transition cursor-pointer"
                title={isMuted ? "Unmute alarm sounds/signals" : "Mute alarm signal"}
              >
                {isMuted ? <BellOff size={11} /> : <Bell size={11} className="text-[#FF5A1F] animate-bounce" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {alertLog.filter(a => !a.cleared).map((alert) => (
              <div 
                key={alert.id}
                className="p-3 bg-white border border-[#FF5A1F]/30 hover:border-[#FF5A1F]/60 flex items-start justify-between gap-3 text-[10px] relative overflow-hidden"
              >
                {/* Visual red block sidebar */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#FF5A1F]"></div>
                
                <div className="pl-1.5 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle size={11} className="text-[#FF5A1F]" />
                    <span className="font-extrabold text-editorial-text uppercase text-[9px] tracking-wide">{alert.metric}</span>
                  </div>
                  <div className="text-[10px] text-editorial-muted leading-tight font-sans">
                    Friction Shifted: <b className="text-editorial-text font-mono font-bold">{alert.prev}%</b> → <b className="text-[#FF5A1F] font-mono font-black">{alert.last}%</b>
                  </div>
                  <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-[#FF5A1F] font-bold font-sans">
                    <span>Delta: {alert.delta}%</span>
                    <span>•</span>
                    <span>Limit Limit: {volatilityThreshold}%</span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full min-h-[36px] font-mono shrink-0">
                  <span className="text-[8px] text-editorial-muted font-bold">{alert.time}</span>
                  <button
                    onClick={() => {
                      setAlertLog(prev => prev.map(a => a.id === alert.id ? { ...a, cleared: true } : a));
                    }}
                    className="p-1 text-[8px] font-black text-editorial-muted hover:text-[#FF5A1F] hover:bg-[#FF5A1F]/5 border border-editorial-border hover:border-[#FF5A1F]/30 transition leading-none cursor-pointer rounded-none uppercase"
                    title="Dismiss alert"
                  >
                    DISMISS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upper Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="stats_overview_grid">
        <div className="bg-white p-5 rounded-none border border-editorial-border flex items-center justify-between">
          <div className="flex-grow">
            <div className="text-editorial-muted text-[9px] uppercase tracking-[0.15em] font-bold">100-Day Progress</div>
            <div className="text-xl font-serif italic font-extrabold text-[#1A1A1A] mt-1">38.4% COMPLETE</div>
            <div className="w-full bg-[#FDFCF8] h-1.5 rounded-none mt-2 overflow-hidden border border-editorial-border/30">
              <div className="bg-[#FF5A1F] h-full" style={{ width: "38.4%" }}></div>
            </div>
          </div>
          <Layers className="text-[#FF5A1F] ml-4 shrink-0" size={24} />
        </div>

        <div className="bg-white p-5 rounded-none border border-editorial-border flex items-center justify-between">
          <div>
            <div className="text-editorial-muted text-[9px] uppercase tracking-[0.15em] font-bold">Strategy Moat Level</div>
            <div className="text-xl font-serif italic font-extrabold text-[#FF5A1F] mt-1">94.2 ASSESSMENT</div>
            <div className="text-[9px] uppercase font-bold text-editorial-muted mt-2">Active Defensibility Core</div>
          </div>
          <Award className="text-editorial-text" size={24} />
        </div>

        <div className="bg-white p-5 rounded-none border border-editorial-border flex items-center justify-between">
          <div>
            <div className="text-editorial-muted text-[9px] uppercase tracking-[0.15em] font-bold">Intervention Stream</div>
            <div className="text-xl font-serif italic font-extrabold text-editorial-text mt-1">SR-902 ACTIVE</div>
            <div className="text-[9px] uppercase font-bold mt-2 flex items-center gap-1.5">
              {telemetryState === "online" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-emerald-700 text-[10px]">Synchronized 10s ago</span>
                </>
              )}
              {telemetryState === "syncing" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-amber-700 text-[10px]">HANDSHAKE SYNCING</span>
                </>
              )}
              {telemetryState === "failed" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  <span className="text-red-600 text-[10px]">TELEMETRY REFUSED</span>
                </>
              )}
            </div>
          </div>
          <Activity className="text-[#FF5A1F]" size={24} />
        </div>
      </div>

      {/* High-Level Aggregated Metrics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="high_level_aggregated_metrics">
        
        {/* Metric 1: System Uptime */}
        <div className="bg-white p-4 border border-editorial-border flex items-start justify-between font-mono rounded-none" id="summary_metric_uptime">
          <div className="space-y-1">
            <span className="text-[8px] tracking-wider uppercase font-bold text-editorial-muted block font-sans">
              System Telemetry Status
            </span>
            <span className="text-[9px] uppercase tracking-[0.10em] font-bold text-editorial-muted block">
              SYSTEM UPTIME
            </span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-lg font-serif italic font-extrabold text-[#1A1A1A]">
                {telemetryState === "failed" ? "99.91%" : "99.98%"}
              </span>
              <span className={`text-[8px] font-bold block px-1 border ${telemetryState === "failed" ? "text-[#FF5A1F] bg-red-50 border-red-200" : "text-emerald-700 bg-emerald-50 border-emerald-200"}`}>
                {telemetryState === "failed" ? "WARNING" : "EXCEEDS SLA"}
              </span>
            </div>
            <p className="text-[9px] text-editorial-muted mt-1 leading-none font-sans">
              {telemetryState === "failed" ? "Packet loss detected on line-6" : "Continuous cycle since last boot"}
            </p>
          </div>
          <div className="p-2 bg-[#FDFCF8] border border-editorial-border/60 rounded-none text-[#FF5A1F]" id="uptime_icon_holder">
            <Clock size={16} />
          </div>
        </div>

        {/* Metric 2: Active Agents */}
        <div className="bg-white p-4 border border-editorial-border flex items-start justify-between font-mono rounded-none" id="summary_metric_agents">
          <div className="space-y-1">
            <span className="text-[8px] tracking-wider uppercase font-bold text-editorial-muted block font-sans">
              Distributed Compiler Nodes
            </span>
            <span className="text-[9px] uppercase tracking-[0.10em] font-bold text-editorial-muted block">
              ACTIVE AGENTS
            </span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-lg font-serif italic font-extrabold text-[#1A1A1A]">
                {telemetryState === "failed" ? "12 Active" : "14 Operational"}
              </span>
              <span className={`text-[8px] font-bold block px-1 border ${telemetryState === "syncing" ? "text-amber-600 bg-amber-50 border-amber-200 animate-pulse" : "text-editorial-text bg-[#FDFCF8] border-editorial-border"}`}>
                {telemetryState === "syncing" ? "SHUTTLING" : "STABLE"}
              </span>
            </div>
            <p className="text-[9px] text-editorial-muted mt-1 leading-none font-sans">
              {telemetryState === "failed" ? "2 secondary agents disconnected" : "Distributed intelligence compilation mesh"}
            </p>
          </div>
          <div className="p-2 bg-[#FDFCF8] border border-editorial-border/60 rounded-none text-[#FF5A1F]" id="agents_icon_holder">
            <Cpu size={16} />
          </div>
        </div>

        {/* Metric 3: Resource Utilization */}
        <div className="bg-white p-4 border border-editorial-border flex items-start justify-between font-mono rounded-none" id="summary_metric_resources">
          <div className="space-y-1">
            <span className="text-[8px] tracking-wider uppercase font-bold text-editorial-muted block font-sans">
              Hypervisor Performance Core
            </span>
            <span className="text-[9px] uppercase tracking-[0.10em] font-bold text-editorial-muted block">
              RESOURCE UTILIZATION
            </span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-lg font-serif italic font-extrabold text-[#1A1A1A]">
                {telemetryState === "syncing" ? "68.1% CPU" : telemetryState === "failed" ? "18.2% CPU" : "42.6% CPU"}
              </span>
              <span className={`text-[8px] font-bold block px-1 border ${telemetryState === "syncing" ? "text-amber-600 bg-amber-50 border-amber-200 animate-pulse" : "text-editorial-text bg-[#FDFCF8] border-editorial-border"}`}>
                {telemetryState === "syncing" ? "SYNC LOAD" : "OPTIMIZED"}
              </span>
            </div>
            <p className="text-[9px] text-editorial-muted mt-1 leading-none font-sans">
              {telemetryState === "syncing" ? "Telemetry stream active synchronization" : "Load balanced across 8 shards"}
            </p>
          </div>
          <div className="p-2 bg-[#FDFCF8] border border-editorial-border/60 rounded-none text-[#FF5A1F]" id="resources_icon_holder">
            <Server size={16} />
          </div>
        </div>

      </div>

      {/* Main Roadmap Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="roadmap_workspace_grid">
        {/* Left Column: 100-Day Interactive Roadmap */}
        <div className="lg:col-span-2 bg-white p-6 rounded-none border border-editorial-border flex flex-col justify-between" id="roadmap_interactive_card">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 border-b border-editorial-border/60 pb-3 gap-3">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-editorial-text">100-Day Strategic Roadmap</h3>
                <p className="text-[10px] text-editorial-muted">Autonomous corporate integration schedule</p>
              </div>
              <div className="flex bg-[#FDFCF8] p-0.5 border border-editorial-border text-[9px] rounded-none">
                <button 
                  onClick={() => setActiveTab("foundational")}
                  className={`px-3 py-1 rounded-none transition duration-200 cursor-pointer font-bold uppercase tracking-wider ${activeTab === "foundational" ? "bg-[#FF5A1F] text-white" : "text-editorial-muted hover:text-editorial-text"}`}
                >
                  Days 1-30
                </button>
                <button 
                  onClick={() => setActiveTab("expansion")}
                  className={`px-3 py-1 rounded-none transition duration-200 cursor-pointer font-bold uppercase tracking-wider ${activeTab === "expansion" ? "bg-[#FF5A1F] text-white" : "text-editorial-muted hover:text-editorial-text"}`}
                >
                  Days 31-60
                </button>
                <button 
                  onClick={() => setActiveTab("realization")}
                  className={`px-3 py-1 rounded-none transition duration-200 cursor-pointer font-bold uppercase tracking-wider ${activeTab === "realization" ? "bg-[#FF5A1F] text-white" : "text-editorial-muted hover:text-editorial-text"}`}
                >
                  Days 61-100
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {activeRoadmap.map((item) => (
                <div 
                  key={item.id} 
                  id={`roadmap_item_block_${item.id}`}
                  className="p-4 bg-[#FDFCF8] rounded-none border border-editorial-border/60 hover:border-[#FF5A1F] transition duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-[70%]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#FF5A1F] px-2 py-0.5 border border-[#FF5A1F]/30 bg-[#FF5A1F]/5 leading-none">
                        {item.days}
                      </span>
                      <h4 className="text-xs font-bold text-editorial-text tracking-wide uppercase">{item.title}</h4>
                    </div>
                    <p className="text-[10px] text-editorial-muted leading-relaxed font-sans">{item.desc}</p>
                    <span className="inline-block text-[9px] font-mono text-[#FF5A1F] bg-white border border-editorial-border/60 px-1.5 py-0.5">
                      HASH_ID: {item.badge}
                    </span>
                  </div>

                  <div className="text-right flex flex-col items-end shrink-0">
                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-1 border ${
                      item.status === "COMPLETED" 
                        ? "border-[#FF5A1F]/20 bg-[#FF5A1F]/5 text-[#FF5A1F]" 
                        : item.status === "IN_PROGRESS"
                        ? "bg-editorial-text border-[#1A1A1A] text-white"
                        : "bg-white border-editorial-border text-editorial-muted"
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider font-bold text-editorial-muted mt-1.5">No latency</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-editorial-border/40 flex items-center justify-between text-[10px] text-editorial-muted uppercase tracking-wider font-bold">
            <span>Overall Moat: <b className="text-editorial-text">94.2</b></span>
            <span>Last Sync State Confirmed</span>
          </div>
        </div>

        {/* Right Column: Strategic Pillars & AI Synthesis */}
        <div className="space-y-6" id="roadmap_pillars_and_synthesis">
          {/* Strategic Pillars Cards */}
          <div className="bg-white p-5 rounded-none border border-editorial-border" id="strategic_pillars_card">
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest mb-4 border-b border-editorial-border pb-2">Core Strategic Pillars</h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-white border border-editorial-border border-l-4 border-l-[#FF5A1F]">
                <div className="flex items-center gap-2 text-[#FF5A1F] text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp size={13} />
                  <span>REVENUE ENGINE AUTONOMY</span>
                </div>
                <p className="text-[10px] text-editorial-muted mt-1 leading-relaxed font-sans">
                  Locking workflow dependencies down to autonomous LLM instances. Estimated post-integration output bump: <b className="text-editorial-text font-bold">+41% efficiency</b>.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-editorial-border border-l-4 border-l-[#FF5A1F]/60">
                <div className="flex items-center gap-2 text-editorial-text text-[10px] font-bold uppercase tracking-wider">
                  <Layers size={13} />
                  <span>DATA HYGIENE STANDARD</span>
                </div>
                <p className="text-[10px] text-editorial-muted mt-1 leading-relaxed font-sans">
                  Unpacking silos into localized PostgreSQL clusters. Establishing vector databases to maximize RAG coverage across corporate files.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-editorial-border border-l-4 border-l-[#1A1A1A]">
                <div className="flex items-center gap-2 text-editorial-text text-[10px] font-bold uppercase tracking-wider">
                  <Compass size={13} />
                  <span>INTELLIGENCE PREDOMINANCE</span>
                </div>
                <p className="text-[10px] text-editorial-muted mt-1 leading-relaxed font-sans">
                  Crawling real-time competitor signals to flag high-value candidates & target acquisitions before market trends shape valuations.
                </p>
              </div>
            </div>
          </div>

          {/* Strategy Agent Synthesis & Audit */}
          <div className="bg-white p-5 rounded-none border border-editorial-border" id="synthesis_audit_card">
            <div className="flex items-center justify-between mb-3 border-b border-editorial-border/60 pb-2">
              <span className="text-xs font-bold text-editorial-text uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#FF5A1F]" />
                Strategy Agent Synthesis
              </span>
              <span className="text-[10px] bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/25 px-1.5 py-0.5 font-mono font-bold">
                94.2% CONF
              </span>
            </div>
            
            <p className="text-[11px] text-editorial-text italic font-serif leading-relaxed border-l-2 border-[#FF5A1F] pl-3 py-1">
              &ldquo;System analysis indicates high enterprise defensibility upon completing the Data Hygiene Protocol. The M&A integration pipeline remains highly optimized, with a low-moderate risk profile. Target modernizations prioritized.&rdquo;
            </p>

            <div className="mt-4 pt-3 border-t border-editorial-border/60 grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-[#FDFCF8] border border-editorial-border">
                <span className="text-editorial-muted block text-[8px] uppercase tracking-wider font-bold">RISK PROFILE</span>
                <span className="text-[#FF5A1F] font-bold block mt-0.5">LOW-MODERATE</span>
              </div>
              <div className="p-2 bg-[#FDFCF8] border border-editorial-border">
                <span className="text-editorial-muted block text-[8px] uppercase tracking-wider font-bold">RECOMMENDATION</span>
                <span className="text-editorial-text font-black block mt-0.5">TRIGGER M&A V2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER ROW: Post-Intervention Simulation & Monitoring Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" id="post_intervention_grid">
        {/* Left Columns: Post-Intervention Monitoring */}
        <div className="xl:col-span-2 bg-white p-5 rounded-none border border-editorial-border space-y-4" id="post_intervention_monitoring">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-editorial-border/60 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse"></span>
                <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest">Post-Intervention Monitoring</h3>
              </div>
              <p className="text-[9px] text-[#FF5A1F] font-mono leading-none font-bold uppercase mt-1">RETENTION PACKAGE ALPHA | Launched 04:00 UTC</p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] text-editorial-muted font-bold">PROGRESS:</span>
              <div className="inline-flex items-center px-2 py-0.5 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[10px] font-bold">
                68% COMPLETE
              </div>
            </div>
          </div>

          {/* Telemetry Metrics with Sparklines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cultural Alignment */}
            {(() => {
              const arr = telemetryTicks.cultural;
              const last = arr[arr.length - 1];
              const prev = arr[arr.length - 2] || 0;
              const delta = Math.abs(last - prev);
              const isVolatile = delta >= volatilityThreshold;
              const pred = analyzeMetricPredictiveTrend(
                "cultural",
                "Cultural Alignment Rating",
                arr,
                modelType,
                predictiveUpperLimit,
                predictiveLowerLimit,
                volatilityThreshold,
                confidenceIntervalInput
              );
              const isPredBreaching = pred.hasBreached && !dismissedPredictiveKeys.includes("cultural");
              
              return (
                <div 
                  className={`p-4 transition-all duration-200 flex items-center justify-between border ${
                    isVolatile 
                      ? "bg-[#FF5A1F]/5 border-[#FF5A1F]" 
                      : isPredBreaching
                      ? "bg-amber-500/5 border-amber-500 animate-pulse"
                      : "bg-[#FDFCF8] border-editorial-border/60"
                  }`} 
                  id="telemetry_item_cultural"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] text-editorial-muted font-bold uppercase tracking-wider block">CULTURAL ALIGNMENT</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-editorial-text font-serif italic">{last}% Rating</span>
                      <span className={`text-[9px] font-mono font-bold ${last >= prev ? "text-emerald-700" : "text-[#FF5A1F]"}`}>
                        {last >= prev ? "▲" : "▼"}{delta}%
                      </span>
                    </div>
                    {isVolatile && (
                      <span className="inline-block text-[8px] bg-[#FF5A1F] text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚠️ SPEED DELTA
                      </span>
                    )}
                    {isPredBreaching && (
                      <span className="inline-block text-[8px] bg-amber-600 text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚡ {modelType.toUpperCase().slice(0, 4)} PRE-BREACH (T-15m: {pred.predictedValue}%)
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {generateSparkline(arr, pred.projectedValues)}
                    {isPredBreaching ? (
                      <span className="text-[7.5px] text-amber-700 font-bold uppercase tracking-wider font-mono">
                        P_OUT: {pred.predictedValue}% ({pred.confidenceScore}% CONF)
                      </span>
                    ) : (
                      <span className="text-[8px] text-editorial-muted uppercase tracking-wider font-mono">Delta: {delta}%</span>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Technical Cohesion */}
            {(() => {
              const arr = telemetryTicks.technical;
              const last = arr[arr.length - 1];
              const prev = arr[arr.length - 2] || 0;
              const delta = Math.abs(last - prev);
              const isVolatile = delta >= volatilityThreshold;
              const pred = analyzeMetricPredictiveTrend(
                "technical",
                "Technical Cohesion Rating",
                arr,
                modelType,
                predictiveUpperLimit,
                predictiveLowerLimit,
                volatilityThreshold,
                confidenceIntervalInput
              );
              const isPredBreaching = pred.hasBreached && !dismissedPredictiveKeys.includes("technical");
              
              return (
                <div 
                  className={`p-4 transition-all duration-200 flex items-center justify-between border ${
                    isVolatile 
                      ? "bg-[#FF5A1F]/5 border-[#FF5A1F]" 
                      : isPredBreaching
                      ? "bg-amber-500/5 border-amber-500 animate-pulse"
                      : "bg-[#FDFCF8] border-editorial-border/60"
                  }`} 
                  id="telemetry_item_technical"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] text-editorial-muted font-bold uppercase tracking-wider block">TECHNICAL COHESION</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-editorial-text font-serif italic">{last}% Rating</span>
                      <span className={`text-[9px] font-mono font-bold ${last >= prev ? "text-emerald-700" : "text-[#FF5A1F]"}`}>
                        {last >= prev ? "▲" : "▼"}{delta}%
                      </span>
                    </div>
                    {isVolatile && (
                      <span className="inline-block text-[8px] bg-[#FF5A1F] text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚠️ SPEED DELTA
                      </span>
                    )}
                    {isPredBreaching && (
                      <span className="inline-block text-[8px] bg-amber-600 text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚡ {modelType.toUpperCase().slice(0, 4)} PRE-BREACH (T-15m: {pred.predictedValue}%)
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {generateSparkline(arr, pred.projectedValues)}
                    {isPredBreaching ? (
                      <span className="text-[7.5px] text-amber-700 font-bold uppercase tracking-wider font-mono">
                        P_OUT: {pred.predictedValue}% ({pred.confidenceScore}% CONF)
                      </span>
                    ) : (
                      <span className="text-[8px] text-editorial-muted uppercase tracking-wider font-mono">Delta: {delta}%</span>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Operational Sync */}
            {(() => {
              const arr = telemetryTicks.operational;
              const last = arr[arr.length - 1];
              const prev = arr[arr.length - 2] || 0;
              const delta = Math.abs(last - prev);
              const isVolatile = delta >= volatilityThreshold;
              const pred = analyzeMetricPredictiveTrend(
                "operational",
                "Operational Sync Deployment",
                arr,
                modelType,
                predictiveUpperLimit,
                predictiveLowerLimit,
                volatilityThreshold,
                confidenceIntervalInput
              );
              const isPredBreaching = pred.hasBreached && !dismissedPredictiveKeys.includes("operational");
              
              return (
                <div 
                  className={`p-4 transition-all duration-200 flex items-center justify-between border ${
                    isVolatile 
                      ? "bg-[#FF5A1F]/5 border-[#FF5A1F]" 
                      : isPredBreaching
                      ? "bg-amber-500/5 border-amber-500 animate-pulse"
                      : "bg-[#FDFCF8] border-editorial-border/60"
                  }`} 
                  id="telemetry_item_operational"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] text-editorial-muted font-bold uppercase tracking-wider block">OPERATIONAL SYNC</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-editorial-text font-serif italic">{last}% Deployed</span>
                      <span className={`text-[9px] font-mono font-bold ${last >= prev ? "text-emerald-700" : "text-[#FF5A1F]"}`}>
                        {last >= prev ? "▲" : "▼"}{delta}%
                      </span>
                    </div>
                    {isVolatile && (
                      <span className="inline-block text-[8px] bg-[#FF5A1F] text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚠️ SPEED DELTA
                      </span>
                    )}
                    {isPredBreaching && (
                      <span className="inline-block text-[8px] bg-amber-600 text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚡ {modelType.toUpperCase().slice(0, 4)} PRE-BREACH (T-15m: {pred.predictedValue}%)
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {generateSparkline(arr, pred.projectedValues)}
                    {isPredBreaching ? (
                      <span className="text-[7.5px] text-amber-700 font-bold uppercase tracking-wider font-mono">
                        P_OUT: {pred.predictedValue}% ({pred.confidenceScore}% CONF)
                      </span>
                    ) : (
                      <span className="text-[8px] text-editorial-muted uppercase tracking-wider font-mono">Delta: {delta}%</span>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Resource Efficiency */}
            {(() => {
              const arr = telemetryTicks.efficiency;
              const last = arr[arr.length - 1];
              const prev = arr[arr.length - 2] || 0;
              const delta = Math.abs(last - prev);
              const isVolatile = delta >= volatilityThreshold;
              const pred = analyzeMetricPredictiveTrend(
                "efficiency",
                "Resource Efficiency Assurance",
                arr,
                modelType,
                predictiveUpperLimit,
                predictiveLowerLimit,
                volatilityThreshold,
                confidenceIntervalInput
              );
              const isPredBreaching = pred.hasBreached && !dismissedPredictiveKeys.includes("efficiency");
              
              return (
                <div 
                  className={`p-4 transition-all duration-200 flex items-center justify-between border ${
                    isVolatile 
                      ? "bg-[#FF5A1F]/5 border-[#FF5A1F]" 
                      : isPredBreaching
                      ? "bg-amber-500/5 border-amber-500 animate-pulse"
                      : "bg-[#FDFCF8] border-editorial-border/60"
                  }`} 
                  id="telemetry_item_efficiency"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] text-editorial-muted font-bold uppercase tracking-wider block">RESOURCE EFFICIENCY</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-editorial-text font-serif italic">{last}% Assured</span>
                      <span className={`text-[9px] font-mono font-bold ${last >= prev ? "text-emerald-700" : "text-[#FF5A1F]"}`}>
                        {last >= prev ? "▲" : "▼"}{delta}%
                      </span>
                    </div>
                    {isVolatile && (
                      <span className="inline-block text-[8px] bg-[#FF5A1F] text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚠️ SPEED DELTA
                      </span>
                    )}
                    {isPredBreaching && (
                      <span className="inline-block text-[8px] bg-amber-600 text-white px-1.5 py-0.5 font-bold uppercase leading-none mt-1 animate-pulse font-mono">
                        ⚡ {modelType.toUpperCase().slice(0, 4)} PRE-BREACH (T-15m: {pred.predictedValue}%)
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {generateSparkline(arr, pred.projectedValues)}
                    {isPredBreaching ? (
                      <span className="text-[7.5px] text-amber-700 font-bold uppercase tracking-wider font-mono">
                        P_OUT: {pred.predictedValue}% ({pred.confidenceScore}% CONF)
                      </span>
                    ) : (
                      <span className="text-[8px] text-editorial-muted uppercase tracking-wider font-mono">Delta: {delta}%</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* System stabilization details */}
          <div className="p-4 bg-[#FDFCF8] border border-editorial-border/80 text-[10px] space-y-2.5">
            <div className="text-editorial-text uppercase tracking-widest font-extrabold flex items-center gap-1.5 text-[9px] border-b border-editorial-border pb-2">
              <Activity size={11} className="text-[#FF5A1F]" />
              STABILIZATION METRICS REGISTRY
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-0.5">
              <div>
                <span className="text-editorial-muted block text-[8px] uppercase tracking-wider font-bold">DB TUNNEL SHARDS</span>
                <span className="text-[#FF5A1F] font-bold block mt-0.5">8 ACTIVE</span>
              </div>
              <div>
                <span className="text-editorial-muted block text-[8px] uppercase tracking-wider font-bold">HANDSHAKE_LATENCY</span>
                <span className="text-editorial-text font-bold block mt-0.5">14.1ms</span>
              </div>
              <div>
                <span className="text-editorial-muted block text-[8px] uppercase tracking-wider font-bold">CPU STRESS RATIO</span>
                <span className="text-editorial-text font-bold block mt-0.5">24.2%</span>
              </div>
              <div>
                <span className="text-editorial-muted block text-[8px] uppercase tracking-wider font-bold">SECURITY_PROXY</span>
                <span className="text-editorial-text font-bold block mt-0.5">OK / TUNNEL_v3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Agent Sigma Qualitative Feedback Tracker */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="agent_sigma_container">
          <div>
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-editorial-border/60 pb-2">
              <Sparkles className="text-[#FF5A1F]" size={13} />
              Agent Sigma Commentary
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#FDFCF8] border border-editorial-border text-[10px] leading-relaxed">
                <span className="text-[#FF5A1F] font-bold block mb-1">05:40 UTC UPDATE:</span>
                &ldquo;Technical cohesion telemetry shifted positive following the cold-migration of the secondary legacy region. Database lock-ups dismissed, API endpoints returned status 200.&rdquo;
              </div>
              <div className="p-3 bg-[#FDFCF8] border border-editorial-border text-[10px] leading-relaxed">
                <span className="text-[#FF5A1F] font-bold block mb-1">05:12 UTC UPDATE:</span>
                &ldquo;Compensation adjustment logs crawled. Team sentiment index increased from 68% to 79%. System friction stress metrics decayed accordingly.&rdquo;
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-editorial-border mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse"></span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-editorial-muted">Autonomous Stabilization Verified</span>
          </div>
        </div>
      </div>

    </div>
  );
}
