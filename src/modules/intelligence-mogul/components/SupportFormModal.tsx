"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  AlertCircle,
  Check,
  ShieldAlert,
  Terminal,
  Clock,
  Copy,
  Loader2,
  Cpu,
  Zap,
  RefreshCw,
  Database,
  Flame,
  Activity,
  Volume2,
  VolumeX
} from "lucide-react";

interface SupportFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAudioMuted: boolean;
  onToggleAudioMuted: () => void;
  autoScanInterval: number;
  onSetAutoScanInterval: (interval: number) => void;
}

interface FormFields {
  name: string;
  email: string;
  subsystem: string;
  severity: "low" | "medium" | "critical";
  delta: number;
  description: string;
  termsChecked: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subsystem?: string;
  description?: string;
  termsChecked?: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  msg: string;
  type: "info" | "warn" | "success" | "critical";
}

export default function SupportFormModal({ 
  isOpen, 
  onClose,
  isAudioMuted,
  onToggleAudioMuted,
  autoScanInterval,
  onSetAutoScanInterval
}: SupportFormModalProps) {
  // Navigation Tabs: 'form' | 'diagnostics' | 'settings'
  const [activeTab, setActiveTab] = useState<"form" | "diagnostics" | "settings">("form");

  // Form values
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subsystem: "tech_cohesion",
    severity: "medium",
    delta: 15,
    description: "",
    termsChecked: false,
  });

  // Client-side validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: input, 1: loading, 2: success
  const [loadingText, setLoadingText] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [cooldown, setCooldown] = useState(120); // 2 minutes countdown
  const [copiedId, setCopiedId] = useState(false);

  // Success screen mock interaction
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "intelligence"; text: string }[]>([]);
  const [isChatReplying, setIsChatReplying] = useState(false);

  // Interactive Diagnostic Sensors
  const [temp, setTemp] = useState(44.2);
  const [cpuLoad, setCpuLoad] = useState(24);
  const [ramUsage, setRamUsage] = useState(13.8); // GB used of 32GB
  const [fanSpeed, setFanSpeed] = useState(3150); // RPM
  const [coolantFlushed, setCoolantFlushed] = useState(false);
  const [isStressing, setIsStressing] = useState(false);
  const [copiedDump, setCopiedDump] = useState(false);

  // Live Scrolling Terminal Log State
  const [diagLogs, setDiagLogs] = useState<LogEntry[]>([
    { id: "1", timestamp: "15:12:04", source: "CORE", msg: "Sentinel kernel engine handshake certified.", type: "success" },
    { id: "2", timestamp: "15:12:12", source: "MEM", msg: "Neural model weight memory segment initialized at offset 0x7E4F.", type: "info" },
    { id: "3", timestamp: "15:14:45", source: "SYS", msg: "Double Exponential Smoothener (Holt's Linear Mode) baseline loaded.", type: "success" },
    { id: "4", timestamp: "15:15:02", source: "NET", msg: "Distributed telemetry node synchronization check: 100% compliant.", type: "success" },
    { id: "5", timestamp: "15:17:18", source: "TEMP", msg: "Cpu core package 0 thermals baseline: 44.2°C.", type: "info" },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Generate unique Ticket ID on submit
  const generateTicketId = () => {
    const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, "0");
    return `IM-SYS-${hex}`;
  };

  // Cooldown countdown effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (submitStep === 2 && cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [submitStep, cooldown]);

  // Simulated live sensor feed updates & automated periodic log insertions
  useEffect(() => {
    if (!isOpen) return;

    const sensorTimer = setInterval(() => {
      // Slow background temperature fluctuation (recovers back to 44°C eventually)
      setTemp((prev) => {
        const target = coolantFlushed ? 21.5 : 44.2;
        const drift = target + (Math.random() - 0.5) * 1.5;
        // Gradually interpolate back
        const next = prev + (drift - prev) * 0.15;
        return parseFloat(next.toFixed(1));
      });

      // Slowly bounce back cooling flush status
      if (coolantFlushed && temp < 26) {
        setCoolantFlushed(false);
      }

      // Fan speed is proportional to temp and stress
      setFanSpeed(() => {
        let baseFan = 3100;
        if (isStressing) baseFan = 5800;
        else if (temp > 50) baseFan = 4200;
        return Math.floor(baseFan + (Math.random() - 0.5) * 120);
      });

      // Fluctuate CPU unless under stress test
      setCpuLoad((prev) => {
        if (isStressing) return prev; // handled by stress function
        const baseCpu = 22;
        const randomDelta = Math.floor((Math.random() - 0.5) * 8);
        return Math.max(5, Math.min(65, baseCpu + randomDelta));
      });

      // Fluctuate RAM
      setRamUsage((prev) => {
        const next = prev + (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.max(10.2, Math.min(22.8, next)).toFixed(1));
      });

      // Randomly append background diagnostic logs occasionally
      if (Math.random() > 0.75) {
        setDiagLogs((prev) => {
          const timestamp = new Date().toTimeString().split(" ")[0];
          const sources = ["CORE", "SYS", "NET", "MODEL", "THERM"];
          const msgs = [
            "Predictive ML lookahead safety buffers: within 95% certainty basin limit.",
            "Dynamic volatility coefficient normalized with threshold criteria.",
            "Shard databases holding persistent active ledger connections.",
            "Holt's linear tracking: no high volatility outliers evaluated.",
            "Thermal margins check: stable delta."
          ];
          const source = sources[Math.floor(Math.random() * sources.length)];
          const msg = msgs[Math.floor(Math.random() * msgs.length)];
          const id = Math.random().toString();
          return [...prev, { id, timestamp, source, msg, type: "info" }];
        });
      }

    }, 3000);

    return () => clearInterval(sensorTimer);
  }, [isOpen, coolantFlushed, temp, isStressing]);

  // Keep terminal logs scrolled to bottom when a new log arrives
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [diagLogs, activeTab]);

  // Action: COOLANT FLUSH
  const handleCoolantFlush = () => {
    setCoolantFlushed(true);
    setTemp(20.1);
    
    const timestamp = new Date().toTimeString().split(" ")[0];
    const log1: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "COOL",
      msg: "Operator triggered immediate safety valve flush. Coolant channels active.",
      type: "success"
    };
    const log2: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "TEMP",
      msg: "System thermals dropped below baseline thresholds to 20.1°C safely.",
      type: "info"
    };

    setDiagLogs((prev) => [...prev, log1, log2]);
  };

  // Action: STRESS TEST SIMULATION
  const handleSimulateStress = () => {
    setIsStressing(true);
    setCpuLoad(96);
    
    const timestamp = new Date().toTimeString().split(" ")[0];
    const log1: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "STRESS",
      msg: "INITIATING PARALLEL SYNAPTIC WEIGHT ESTIMATION OVER ALL CORES...",
      type: "warn"
    };
    const log2: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "SYS",
      msg: "WARNING: Shard calculations spike CPU usage above 95% limit threshold.",
      type: "critical"
    };

    setDiagLogs((prev) => [...prev, log1, log2]);

    setTimeout(() => {
      setIsStressing(false);
      setCpuLoad(28);
      const endTimestamp = new Date().toTimeString().split(" ")[0];
      const recoverLog: LogEntry = {
        id: Math.random().toString(),
        timestamp: endTimestamp,
        source: "SYS",
        msg: "Synaptic parallel stress test completed successfully. Baseline restored safely.",
        type: "success"
      };
      setDiagLogs((prev) => [...prev, recoverLog]);
    }, 4500);
  };

  // Action: RUN TELEMETRY DIAGNOSTIC CHECK
  const handleTelemetryHandshake = () => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    const checkLog1: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "DIAG",
      msg: "Verification packet transmitted to Core: Cultural Alignment System. Output Status: nominal.",
      type: "success"
    };
    const checkLog2: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "DIAG",
      msg: "Verification packet transmitted to Core: Technical Cohesion System. Output Status: nominal.",
      type: "success"
    };
    const checkLog3: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      source: "DIAG",
      msg: "Verification packet transmitted to Core: Operational Sync System. Output Status: nominal.",
      type: "success"
    };

    setDiagLogs((prev) => [...prev, checkLog1, checkLog2, checkLog3]);
  };

  // Action: EXPORT LOG DUMP
  const handleExportDump = () => {
    const logString = diagLogs
      .map((l) => `[${l.timestamp}] [${l.source}] (${l.type.toUpperCase()}) ${l.msg}`)
      .join("\n");
      
    navigator.clipboard.writeText(logString);
    setCopiedDump(true);
    setTimeout(() => setCopiedDump(false), 2000);
  };

  // Handle support form validation
  const validateForm = (): boolean => {
    const currentErrors: FormErrors = {};
    
    if (!fields.name.trim()) {
      currentErrors.name = "Operator credentials required.";
    } else if (fields.name.trim().length < 3) {
      currentErrors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email) {
      currentErrors.email = "Valid network security email required.";
    } else if (!emailRegex.test(fields.email)) {
      currentErrors.email = "Format error: Use a valid email (e.g., name@matrix.sys).";
    }

    if (!fields.subsystem) {
      currentErrors.subsystem = "Select an affected node subsystem.";
    }

    if (!fields.description.trim()) {
      currentErrors.description = "Incident logs must be populated.";
    } else if (fields.description.trim().length < 15) {
      currentErrors.description = `Insufficient telemetry logs. Minimum 15 characters needed (current: ${fields.description.trim().length}).`;
    }

    if (!fields.termsChecked) {
      currentErrors.termsChecked = "Authentication terms must be acknowledged to initiate security routing.";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFields((prev) => ({ ...prev, [name]: checkbox.checked }));
      if (errors.termsChecked) {
        setErrors((prev) => ({ ...prev, termsChecked: undefined }));
      }
    } else {
      setFields((prev) => ({ ...prev, [name]: value }));
      // Clear specific validation error as user is typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, delta: parseInt(e.target.value) }));
  };

  const handleSeveritySelect = (level: "low" | "medium" | "critical") => {
    setFields((prev) => ({ ...prev, severity: level }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStep(1);

    // Multi-staged loading sequence
    const steps = [
      "Establishing sub-orbital tunnel secure handshakes...",
      "Hashing incident reports into Merkle cryptographic proof...",
      "Assigning priority dispatch with core Neural model weight adjustments...",
      "Filing ledger intervention records..."
    ];

    let currentTextIdx = 0;
    setLoadingText(steps[currentTextIdx]);

    const interval = setInterval(() => {
      currentTextIdx++;
      if (currentTextIdx < steps.length) {
        setLoadingText(steps[currentTextIdx]);
      } else {
        clearInterval(interval);
        setTicketId(generateTicketId());
        setSubmitStep(2);
        setIsSubmitting(false);
        // Pre-populate chat logs
        setChatLog([
          { 
            sender: "intelligence", 
            text: `System Alert: Ticket logged under ${generateTicketId()}. Our machine learning diagnostic algorithms are parsing your synergy drift logs. Ask a follow-up query below.` 
          }
        ]);
      }
    }, 900);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuery.trim() || isChatReplying) return;

    const userMessage = followUpQuery;
    setChatLog((prev) => [...prev, { sender: "user", text: userMessage }]);
    setFollowUpQuery("");
    setIsChatReplying(true);

    // Simulated responsive system terminal response based on field selection
    setTimeout(() => {
      let replyText = "";
      if (fields.subsystem === "res_efficiency") {
        replyText = `Resource Drift alert registered. Core systems are recalibrating reactor thresholds to buffer your specified ${fields.delta}% synergy anomaly. Standby.`;
      } else if (fields.severity === "critical") {
        replyText = `CRITICAL DEPLOYMENT PRIORITY DETECTED. The Intelligence Core has routed an automated sub-orbital thread audit under command security code SEC-AL-9. Monitor the Mission Control Telemetry map closely.`;
      } else {
        replyText = `Telemetry drift noted. Systems are running neural estimator models (Holt's Linear Mode) to track baseline stabilization. Cooldown lock closes in ${Math.floor(cooldown / 60)}m ${cooldown % 60}s.`;
      }

      setChatLog((prev) => [...prev, { sender: "intelligence", text: replyText }]);
      setIsChatReplying(false);
    }, 1200);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTerminal = () => {
    setFields({
      name: "",
      email: "",
      subsystem: "tech_cohesion",
      severity: "medium",
      delta: 15,
      description: "",
      termsChecked: false,
    });
    setErrors({});
    setSubmitStep(0);
    setCooldown(120);
    setChatLog([]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-100 font-mono"
      id="support_terminal_overlay"
    >
      <div 
        className="w-full max-w-2xl bg-[#FDFCF8] border border-editorial-border shadow-2xl relative flex flex-col max-h-[90vh]"
        id="support_terminal_dialog"
      >
        {/* Banner header to maintain editorial brand styling */}
        <div className="bg-editorial-dark text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-[#FF5A1F] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] font-mono">
              INTELLIGENCE OS : SECURITY & DIAGNOSTIC RECONSTRUCT
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 hover:bg-white/10 transition rounded-sm cursor-pointer"
            title="Acknowledge and exit terminal"
            id="close_terminal_top_btn"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex border-b border-editorial-border bg-neutral-100 font-mono text-[9px] shrink-0">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-3 text-center font-black uppercase tracking-widest border-r border-editorial-border transition-all duration-150 cursor-pointer ${
              activeTab === "form" 
                ? "bg-[#FDFCF8] text-[#FF5A1F] border-t-2 border-t-[#FF5A1F]" 
                : "text-editorial-muted hover:bg-neutral-200 hover:text-editorial-text"
            }`}
            id="tab_trigger_form"
          >
            Security Transmission Form
          </button>
          <button
            onClick={() => setActiveTab("diagnostics")}
            className={`flex-1 py-3 text-center font-black uppercase tracking-widest border-r border-editorial-border transition-all duration-150 cursor-pointer ${
              activeTab === "diagnostics" 
                ? "bg-[#FDFCF8] text-[#FF5A1F] border-t-2 border-t-[#FF5A1F]" 
                : "text-editorial-muted hover:bg-neutral-200 hover:text-editorial-text"
            }`}
            id="tab_trigger_diagnostics"
          >
            System Diagnostic Log
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-3 text-center font-black uppercase tracking-widest transition-all duration-150 cursor-pointer ${
              activeTab === "settings" 
                ? "bg-[#FDFCF8] text-[#FF5A1F] border-t-2 border-t-[#FF5A1F]" 
                : "text-editorial-muted hover:bg-neutral-200 hover:text-editorial-text"
            }`}
            id="tab_trigger_settings"
          >
            System Scan Preferences
          </button>
        </div>

        <div className="overflow-y-auto p-5 md:p-7 flex-grow custom-scrollbar">

          {/* TAB 1: FORM INPUT SYSTEM (Existing form / loading / success logic) */}
          {activeTab === "form" && (
            <>
              {/* STEP 0: FORM INPUT VIEW */}
              {submitStep === 0 && (
                <form onSubmit={handleFormSubmit} className="space-y-5" id="support_transmission_form" noValidate>
                  <div className="border-b border-editorial-border pb-3">
                    <h3 className="text-xs font-black text-editorial-text uppercase tracking-widest font-serif italic text-left">
                      SYSTEM OVERRIDE REQUEST PORTAL
                    </h3>
                    <p className="text-[10px] text-editorial-muted mt-1 leading-relaxed text-left">
                      File encrypted synergy correction requests directly to the Sentinel core. Secure validator hashes will be automatically calculated on submission.
                    </p>
                  </div>

                  {/* Form Validation Global Error summary */}
                  {Object.keys(errors).length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 text-[#FF5A1F] text-[10px] flex items-start gap-2.5 rounded-none font-sans font-bold">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider mb-0.5">TRANSMISSION DELTA BLOCKED:</div>
                        <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                          {Object.values(errors).map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TWO COLUMN GRID FOR OPERATOR DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* OPERATOR NAME */}
                    <div className="space-y-1 text-left">
                      <label className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                        Operator Credentials / Name <span className="text-[#FF5A1F]">*</span>
                      </label>
                      <input 
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Officer Vance"
                        className={`w-full p-2 bg-white border ${
                          errors.name ? "border-[#FF5A1F] bg-red-50/10" : "border-editorial-border focus:border-[#FF5A1F]"
                        } outline-none text-xs font-mono rounded-none text-editorial-text`}
                        id="input_operator_name"
                      />
                      {errors.name && (
                        <span className="text-[8px] text-[#FF5A1F] font-bold flex items-center gap-1 mt-0.5">
                          <AlertCircle size={10} /> {errors.name}
                        </span>
                      )}
                    </div>

                    {/* NETWORK SECURITY EMAIL */}
                    <div className="space-y-1 text-left">
                      <label className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                        Network Security Email <span className="text-[#FF5A1F]">*</span>
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleInputChange}
                        placeholder="vance@sentinel.intelligence.sys"
                        className={`w-full p-2 bg-white border ${
                          errors.email ? "border-[#FF5A1F] bg-red-50/10" : "border-editorial-border focus:border-[#FF5A1F]"
                        } outline-none text-xs font-mono rounded-none text-editorial-text`}
                        id="input_security_email"
                      />
                      {errors.email && (
                        <span className="text-[8px] text-[#FF5A1F] font-bold flex items-center gap-1 mt-0.5">
                          <AlertCircle size={10} /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SUBSYSTEM AND SEVERITY DROPDOWN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* SUBSYSTEM */}
                    <div className="space-y-1 text-left">
                      <label className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                        Incident Subsystem Target Node
                      </label>
                      <select
                        name="subsystem"
                        value={fields.subsystem}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white border border-editorial-border focus:border-[#FF5A1F] outline-none text-xs font-mono rounded-none text-editorial-text"
                        id="select_subsystem"
                      >
                        <option value="cultural_alignment">Cultural Alignment Matrix</option>
                        <option value="tech_cohesion">Technical Cohesion Engine</option>
                        <option value="operational_sync">Operational Sync Database</option>
                        <option value="res_efficiency">Resource Efficiency Core</option>
                      </select>
                    </div>

                    {/* SEVERITY SELECTION BADGES */}
                    <div className="space-y-1 text-left">
                      <label className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                        Incident Severity Matrix Rating
                      </label>
                      <div className="grid grid-cols-3 gap-2 h-[34px]">
                        {(["low", "medium", "critical"] as const).map((level) => {
                          const isActive = fields.severity === level;
                          const colors = {
                            low: isActive ? "bg-emerald-500 text-white border-emerald-500 font-bold" : "hover:bg-emerald-50 border-editorial-border text-emerald-800",
                            medium: isActive ? "bg-amber-500 text-white border-amber-500 font-bold" : "hover:bg-amber-50 border-editorial-border text-amber-800",
                            critical: isActive ? "bg-[#FF5A1F] text-white border-[#FF5A1F] font-bold animate-[shimmer_2s_infinite]" : "hover:bg-red-50 border-editorial-border text-red-800"
                          };
                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() => handleSeveritySelect(level)}
                              className={`border text-[9px] font-black uppercase tracking-wider text-center transition flex items-center justify-center cursor-pointer ${colors[level]}`}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* SLIDER FOR SYNERGY DELTA AFFECTED */}
                  <div className="space-y-2 p-3 bg-white border border-editorial-border">
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className="font-sans text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                        Current Observed Synergy Drift / Variance:
                      </span>
                      <span className="text-[#FF5A1F] font-black text-xs">{fields.delta}% DELTA</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={fields.delta}
                      onChange={handleSliderChange}
                      className="w-full h-1.5 bg-neutral-100 accent-[#FF5A1F] outline-none cursor-ew-resize rounded-none"
                      id="incident_synergy_range"
                    />
                    <div className="flex justify-between text-[6.5px] text-editorial-muted font-bold">
                      <span>0% (NOMINAL STABILITY)</span>
                      <span>50% (HIGH METRIC DEVIATION)</span>
                      <span>100% (CRITICAL NETWORK DRIFT)</span>
                    </div>
                  </div>

                  {/* INCIDENT DETAILS LOG */}
                  <div className="space-y-1 text-left">
                    <div className="flex justify-between items-baseline">
                      <label className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                        Telemetry Description & Incident Logs <span className="text-[#FF5A1F]">*</span>
                      </label>
                      <span className="text-[7.5px] font-mono text-editorial-muted uppercase font-bold">
                        {fields.description.trim().length} chars (min 15)
                      </span>
                    </div>
                    <textarea 
                      name="description"
                      rows={3}
                      value={fields.description}
                      onChange={handleInputChange}
                      placeholder="Detail the anomalous spike, neural model drift triggers, or alignment variances observed in the dashboard metrics..."
                      className={`w-full p-2 bg-white border ${
                        errors.description ? "border-[#FF5A1F] bg-red-50/10" : "border-editorial-border focus:border-[#FF5A1F]"
                      } outline-none text-xs font-mono rounded-none text-editorial-text resize-none`}
                      id="textarea_incident_logs"
                    />
                    {errors.description && (
                      <span className="text-[8px] text-[#FF5A1F] font-bold flex items-center gap-1 mt-0.5">
                        <AlertCircle size={10} /> {errors.description}
                      </span>
                    )}
                  </div>

                  {/* TERMS OF ENGAGEMENT */}
                  <div className="space-y-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-left select-none" id="label_terms_sec">
                      <input 
                        type="checkbox"
                        name="termsChecked"
                        checked={fields.termsChecked}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#FF5A1F] cursor-pointer"
                        id="checkbox_terms_security"
                      />
                      <div className="text-[9px] text-editorial-muted leading-tight font-sans font-medium">
                        I verify that these telemetry entries are accurate. Submitting this reports initiates an automated sub-orbital threat evaluation and neural weighting loop. <span className="text-[#FF5A1F] font-black font-mono">*</span>
                      </div>
                    </label>
                    {errors.termsChecked && (
                      <span className="text-[8px] text-[#FF5A1F] font-bold block pt-1 text-left">
                        ⚠️ {errors.termsChecked}
                      </span>
                    )}
                  </div>

                  {/* FORM SUBMIT ACTIONS */}
                  <div className="pt-3 border-t border-editorial-border flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-white hover:bg-neutral-50 border border-editorial-border hover:border-editorial-text transition text-xs font-bold uppercase tracking-wider text-editorial-muted hover:text-editorial-text cursor-pointer rounded-none"
                      id="btn_dismiss_terminus"
                    >
                      DISMISS
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#FF5A1F] hover:bg-[#D63000] text-white transition text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md rounded-none"
                      id="btn_transmit_envelope"
                    >
                      <Send size={12} />
                      TRANSMIT SECUR_LOG
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 1: TRANSMITTING SECURE LOADING VIEW */}
              {submitStep === 1 && (
                <div className="py-16 flex flex-col items-center justify-center space-y-6 text-center" id="support_transmission_loading">
                  <div className="relative">
                    <Loader2 size={40} className="text-[#FF5A1F] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-editorial-text">
                      Ω
                    </div>
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="text-xs uppercase font-black tracking-[0.25em] text-editorial-text">
                      TRANSMISSION LOOP IN ACTION
                    </h4>
                    <p className="text-[10px] font-mono text-[#FF5A1F] font-extrabold animate-pulse h-10 px-4">
                      {loadingText}
                    </p>
                    <div className="w-48 h-1 bg-neutral-200 mx-auto relative overflow-hidden mt-3">
                      <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-[#FF5A1F] animate-[shimmer_1s_infinite_linear]"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: TRANSMISSION SUCCESS VIEW AND INTERACTIVE CHAT */}
              {submitStep === 2 && (
                <div className="space-y-5 px-1" id="support_transmission_success">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/30 flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                      <Check size={18} className="stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800">
                        CRYPTOGRAPHIC TRANSMISSION BUFFER VERIFIED
                      </h4>
                      <p className="text-[10px] text-emerald-700 font-sans">
                        Core node processed your incident logs. Safe handshakes have finalized without packet drop.
                      </p>
                    </div>
                  </div>

                  {/* TICKET DETAILS AND REALTIME COOLDOWN DASHBOARD */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-editorial-border space-y-3 font-mono text-left">
                      <span className="text-[8px] text-editorial-muted font-bold uppercase tracking-wider block">
                        LEDGER INCIDENT IDENTITY:
                      </span>
                      
                      <div className="flex items-center justify-between bg-[#FDFCF8] border border-editorial-border p-2">
                        <span className="text-xs font-black text-editorial-text">{ticketId}</span>
                        <button 
                          onClick={copyToClipboard}
                          className="p-1 hover:bg-neutral-100 border border-editorial-border transition-all flex items-center justify-center cursor-pointer"
                          title="Copy Incident ID"
                          id="btn_copy_ticket_id"
                        >
                          {copiedId ? (
                            <span className="text-[8px] text-emerald-600 font-black px-1">COPIED</span>
                          ) : (
                            <Copy size={11} className="text-editorial-muted" />
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[9px] pt-1">
                        <div>
                          <span className="text-editorial-muted block uppercase">AFFECTED HUB:</span>
                          <span className="font-extrabold text-editorial-text">{fields.subsystem.toUpperCase().replace("_", " ")}</span>
                        </div>
                        <div>
                          <span className="text-editorial-muted block uppercase">SEVERITY RATING:</span>
                          <span className={`font-extrabold uppercase ${fields.severity === "critical" ? "text-[#FF5A1F]" : "text-amber-600"}`}>
                            {fields.severity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-editorial-border flex flex-col justify-between font-mono text-left">
                      <div>
                        <span className="text-[8px] text-editorial-muted font-bold uppercase tracking-wider block">
                          STABILIZATION COOLDOWN TIMER:
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <Clock size={16} className="text-[#FF5A1F] shrink-0 self-center" />
                          <span className="text-2xl font-black text-editorial-text tracking-widest">
                            {formatTime(cooldown)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[8.5px] text-editorial-muted leading-tight font-sans mt-2">
                        This sector remains under strict sub-orbital evaluation until the cooldown counter reaches zero. Avoid consecutive redundant dispatches.
                      </p>
                    </div>
                  </div>

                  {/* INTERACTIVE COMPONENT: CHAT QUERY ENGINE */}
                  <div className="border border-editorial-border bg-white rounded-none flex flex-col overflow-hidden text-left shadow-inner">
                    <div className="bg-[#1A1A1A] text-white px-3 py-2 text-[9px] uppercase tracking-widest font-black flex items-center justify-between">
                      <span>INTELLIGENCE CHAT COMPENSATOR</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    
                    {/* Chat feed */}
                      <div className="p-4 h-40 overflow-y-auto space-y-3 bg-[#FDFCF8]/40 custom-scrollbar text-[10px]" id="intelligence_interactive_chat_logs">
                      {chatLog.map((log, i) => (
                        <div 
                          key={i}
                          className={`p-2.5 max-w-[85%] rounded-none flex flex-col relative ${
                            log.sender === "intelligence" 
                              ? "bg-stone-100 text-editorial-text border-l-2 border-l-[#FF5A1F] mr-auto" 
                              : "bg-neutral-800 text-white ml-auto"
                          }`}
                        >
                          <span className="text-[7px] text-editorial-muted font-bold uppercase tracking-wider mb-1">
                            {log.sender === "intelligence" ? "INTELLIGENCE CORE" : `${fields.name.toUpperCase()} (YOU)`}
                          </span>
                          <p className="font-sans font-medium text-[9.5px] leading-tight whitespace-pre-wrap">{log.text}</p>
                        </div>
                      ))}
                      {isChatReplying && (
                        <div className="bg-stone-50 text-editorial-muted p-2 max-w-[85%] mr-auto border-l-2 border-l-amber-500 text-[9px] animate-pulse">
                          Analyzing ticket params and streaming live resolution weights...
                        </div>
                      )}
                    </div>

                    {/* Chat message dispatch input */}
                    <form onSubmit={handleChatSubmit} className="border-t border-editorial-border flex bg-white" id="chat_query_form">
                      <input
                        type="text"
                        value={followUpQuery}
                        onChange={(e) => setFollowUpQuery(e.target.value)}
                        placeholder="Ask a question or request mitigation overrides..."
                        className="flex-grow p-2 py-3 outline-none text-xs text-editorial-text font-mono placeholder-stone-400"
                        disabled={isChatReplying}
                        id="chat_query_input"
                      />
                      <button
                        type="submit"
                        className="px-4 hover:bg-neutral-50 bg-white border-l border-editorial-border text-editorial-text font-bold text-[10px] uppercase cursor-pointer disabled:opacity-50 transition"
                        disabled={followUpQuery.trim() === "" || isChatReplying}
                        id="btn_chat_dispatch"
                      >
                        DISPATCH
                      </button>
                    </form>
                  </div>

                  {/* SYSTEM RESET BUTTON */}
                  <div className="pt-2 border-t border-editorial-border flex items-center justify-between">
                    <p className="text-[8px] text-editorial-muted font-sans font-medium text-left">
                      Ticket dispatched under SHA-256 validation criteria. Security ledger verified.
                    </p>
                    <button
                      onClick={resetTerminal}
                      className="px-4 py-2 bg-white hover:bg-stone-100 border border-editorial-border text-[9px] text-[#FF5A1F] font-black uppercase tracking-wider rounded-none cursor-pointer text-right"
                      id="btn_refresh_terminal"
                    >
                      New Discrepancy
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: SYSTEM HARDWARE SENSORS & SERIAL DIAGNOSTIC LOG (NEW ENGAGING VIEW) */}
          {activeTab === "diagnostics" && (
            <div className="space-y-6" id="diag_logs_tab_viewport">
              {/* Header Info */}
              <div className="border-b border-editorial-border pb-2.5 text-left">
                <h4 className="text-xs font-black uppercase tracking-widest text-editorial-text mb-1">
                  LIVE HARDWARE TELEMETRY & CHIP DIAGNOSTICS
                </h4>
                <p className="text-[9.5px] text-editorial-muted">
                  Verify subsegment core temperatures, computing burdens, and log ledger transactions dynamically generated from server-side sensors.
                </p>
              </div>

              {/* Simulated Hardware Health Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Temp Component */}
                <div className="p-3 bg-white border border-editorial-border flex flex-col justify-between text-left relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase text-editorial-muted">Core Temp</span>
                    <Flame size={12} className={`${temp > 50 ? "text-[#FF5A1F] animate-bounce" : "text-amber-500"}`} />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-xl font-black ${temp > 50 ? "text-[#FF5A1F]" : "text-editorial-text"}`}>{temp}°C</span>
                  </div>
                  {/* Minichip visual status bar */}
                  <div className="w-full bg-neutral-100 h-1 mt-2.5">
                    <div 
                      className={`h-full transition-all duration-500 ${temp > 50 ? "bg-[#FF5A1F]" : "bg-emerald-500"}`} 
                      style={{ width: `${Math.min(100, (temp / 90) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[7px] text-editorial-muted mt-1 uppercase font-bold">
                    {temp > 50 ? "OUTLIER WARNING" : "THERMAL NOMINAL"}
                  </span>
                </div>

                {/* CPU load */}
                <div className="p-3 bg-white border border-editorial-border flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase text-editorial-muted">CPU BURDEN</span>
                    <Cpu size={12} className="text-blue-500" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xl font-black text-editorial-text">{cpuLoad}%</span>
                  </div>
                  {/* Load bar */}
                  <div className="w-full bg-neutral-100 h-1 mt-2.5">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300" 
                      style={{ width: `${cpuLoad}%` }}
                    />
                  </div>
                  <span className="text-[7px] text-editorial-muted mt-1 uppercase font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                    SYSTEM CAP: 12 CORES
                  </span>
                </div>

                {/* RAM Allocation */}
                <div className="p-3 bg-white border border-editorial-border flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase text-editorial-muted">RAM Burden</span>
                    <Database size={12} className="text-purple-500" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xl font-black text-editorial-text">{ramUsage} GB</span>
                    <span className="text-[8px] text-editorial-muted">/32</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1 mt-2.5">
                    <div 
                      className="h-full bg-purple-500 transition-all duration-300" 
                      style={{ width: `${(ramUsage / 32) * 100}%` }}
                    />
                  </div>
                  <span className="text-[7px] text-editorial-muted mt-1 uppercase font-bold">
                    BUFFER LEAK STATE: 0%
                  </span>
                </div>

                {/* Cooling System Fan speed */}
                <div className="p-3 bg-white border border-editorial-border flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase text-editorial-muted">Reactor Fans</span>
                    <RefreshCw size={12} className={`text-emerald-500 ${isStressing ? "animate-spin" : ""}`} />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xl font-black text-editorial-text">{fanSpeed}</span>
                    <span className="text-[8px] text-editorial-muted">RPM</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1 mt-2.5">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300" 
                      style={{ width: `${Math.min(100, (fanSpeed / 6500) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[7px] text-editorial-muted mt-1 uppercase font-bold">
                    COOLING DUCTS ARMED
                  </span>
                </div>
              </div>

              {/* INTERACTIVE CONTROLS FOR TERMINAL */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3.5 bg-[#FF5A1F]/5 border border-[#FF5A1F]/10 text-left">
                <div className="space-y-0.5">
                  <span className="text-[8.5px] font-black uppercase text-editorial-text tracking-wider block">
                    INTERACTION TERMINAL MODULES
                  </span>
                  <span className="text-[8px] text-editorial-muted leading-tight block">
                    Trigger synthetic telemetry test events or execute active system coolant corrections.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCoolantFlush}
                    title="Engage emergency coolant flushes to reduce temperatures instantly"
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-[8px] font-mono uppercase tracking-wider rounded-none cursor-pointer flex items-center gap-1 transition"
                  >
                    <Activity size={10} className="animate-pulse" />
                    Flush Coolant
                  </button>

                  <button
                    onClick={handleSimulateStress}
                    disabled={isStressing}
                    title="Perform mathematical stress cycles across 12 logical cores"
                    className="px-3 py-1.5 bg-[#FF5A1F] hover:bg-[#D63000] disabled:bg-neutral-300 text-white font-bold text-[8px] font-mono uppercase tracking-wider rounded-none cursor-pointer flex items-center gap-1 transition"
                  >
                    <Zap size={10} />
                    {isStressing ? "Stressing..." : "Burden CPU test"}
                  </button>

                  <button
                    onClick={handleTelemetryHandshake}
                    title="Instruct nodes to re-audit secure telemetry baseline handshakes"
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-black text-white font-bold text-[8px] font-mono uppercase tracking-wider rounded-none cursor-pointer flex items-center gap-1 transition"
                  >
                    <RefreshCw size={10} />
                    Audit Handshake
                  </button>
                </div>
              </div>

              {/* Simulated Scrollable terminal log viewport */}
              <div className="border border-editorial-border bg-neutral-900 rounded-none shadow-md flex flex-col text-left">
                {/* Terminal top header */}
                <div className="bg-neutral-800 px-3 py-1.5 flex items-center justify-between text-[8px] text-neutral-400 select-none border-b border-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="ml-1 uppercase font-bold tracking-wider font-mono">SERIAL HARDWARE CONSOLE OUTPUT : TTY1</span>
                  </div>
                  <span className="font-bold text-neutral-500 uppercase">SPEED: 115200 BAUD</span>
                </div>

                {/* Logs terminal box */}
                <div 
                  className="p-4 bg-neutral-950 text-neutral-200 h-56 overflow-y-auto font-mono text-[9px] space-y-1.5 leading-snug custom-scrollbar selection:bg-[#FF5A1F]/30"
                  id="diagnostics_console_log_lines"
                >
                  {diagLogs.map((log) => {
                    // Type-specific style mappings
                    let typeColor = "text-neutral-400";
                    let prefixSym = "ℹ";
                    if (log.type === "success") {
                      typeColor = "text-emerald-400";
                      prefixSym = "✔";
                    } else if (log.type === "warn") {
                      typeColor = "text-amber-400 animate-pulse";
                      prefixSym = "⚠";
                    } else if (log.type === "critical") {
                      typeColor = "text-[#FF5A1F] font-bold blink";
                      prefixSym = "🛑";
                    }

                    return (
                      <div key={log.id} className="flex items-start gap-2 border-b border-white/[0.02] pb-1 font-mono">
                        <span className="text-neutral-500 select-none">[{log.timestamp}]</span>
                        <span className={`px-1 text-[7.5px] uppercase font-black bg-white/5 border border-white/10 shrink-0 select-none ${typeColor}`}>
                          {prefixSym} {log.source}
                        </span>
                        <span className="text-neutral-300 break-all">{log.msg}</span>
                      </div>
                    );
                  })}
                  <div ref={terminalEndRef} />
                </div>

                {/* Console input simulation line */}
                <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-800 text-[8.5px] text-neutral-400 flex items-center justify-between select-none font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#FF5A1F] font-black animate-pulse font-mono tracking-widest">&gt;</span>
                    <span className="text-emerald-400 font-bold">sentinel@intelligence-core-os:~$</span>
                    <span className="text-neutral-100 placeholder-neutral-500 bg-transparent outline-none">
                      {isStressing ? "multiproc_synaptic_estimator --intensity_cycles=99" : coolantFlushed ? "emergency_coolant_purge --force" : "tail -f /var/log/intelligence/systems"}
                    </span>
                    <span className="w-1.5 h-3 bg-neutral-300 animate-pulse"></span>
                  </div>
                  
                  <button
                    onClick={handleExportDump}
                    className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition rounded-sm text-[7.5px] border border-neutral-700 text-neutral-300 font-bold cursor-pointer"
                    title="Copy full terminal print history to clipboard"
                  >
                    {copiedDump ? "COPIED HISTORY OK" : "COPY LOG HISTORY"}
                  </button>
                </div>
              </div>

              {/* Summary assurance footnote block */}
              <div className="pt-2 border-t border-editorial-border flex items-center justify-between text-[8px] text-editorial-muted">
                <span>Diag SHA-256 Checksum: 0x8F9A4E - Sentinel Core compliant</span>
                <span>Active thread: sub_orbital_04</span>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM SCAN PREFERENCES */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in" id="settings_tab_viewport">
              {/* Header Info */}
              <div className="border-b border-editorial-border pb-2.5 text-left">
                <h4 className="text-xs font-black uppercase tracking-widest text-editorial-text mb-1 font-mono">
                  INTELLIGENCE PREFERENCES & SCAN DIRECTIVES
                </h4>
                <p className="text-[9.5px] text-editorial-muted">
                  Configure automated hardware integrity evaluation intervals and background audiosonic warning feedback channels.
                </p>
              </div>

              {/* Preferences Settings Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                {/* SETTING A: PING AUDIO FEEDBACK CONTROL */}
                <div id="setting_ping_audio_card" className="p-4 bg-white border border-editorial-border flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                      AUDIOSONIC TELEMETRY SIGNALING
                    </span>
                    <h5 className="text-[11px] font-black uppercase text-editorial-text flex items-center gap-1.5 font-mono">
                      {isAudioMuted ? (
                        <>
                          <VolumeX size={13} className="text-[#FF5A1F]" />
                          <span>PINGS DEACTIVATED</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={13} className="text-emerald-500" />
                          <span>PINGS ACTIVE</span>
                        </>
                      )}
                    </h5>
                    <p className="text-[9px] text-editorial-muted leading-relaxed font-sans pt-1">
                      Enables or disables audible Web Audio API frequency chiming/pings when initiating hardware telemetry audits and handshakes.
                    </p>
                  </div>

                  {/* Elegant toggle switch button design */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[8px] font-bold text-editorial-muted uppercase font-mono">
                      Cue state: {isAudioMuted ? "MUTED (PERMANENT)" : "ACTIVE (PLAYING)"}
                    </span>
                    
                    <button
                      type="button"
                      id="toggle_setting_audio_mute"
                      onClick={onToggleAudioMuted}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isAudioMuted ? "bg-neutral-200" : "bg-[#FF5A1F]"
                      }`}
                      aria-pressed={!isAudioMuted}
                      title={isAudioMuted ? "Activate audio clues permanently" : "Deactivate audio clues permanently"}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          isAudioMuted ? "translate-x-0" : "translate-x-5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* SETTING B: AUTOMATED INTEGRITY PERIODIC EVAL INTERVALS */}
                <div id="setting_auto_scan_card" className="p-4 bg-white border border-editorial-border flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="block text-[8px] font-black uppercase tracking-wider text-editorial-muted">
                      INTEGRITY MONITOR AUTOMATION
                    </span>
                    <h5 className="text-[11px] font-black uppercase text-editorial-text flex items-center gap-1.5 font-mono">
                      <Clock size={13} className="text-[#FF5A1F]" />
                      <span>
                        {autoScanInterval === 0 
                          ? "AUTO-SCAN CLOSED" 
                          : `EVERY ${autoScanInterval} SECONDS`
                        }
                      </span>
                    </h5>
                    <p className="text-[9px] text-editorial-muted leading-relaxed font-sans pt-1">
                      Instructs Mission Control to schedule automatic recurring sweeps of the computing matrix dynamically in the background.
                    </p>
                  </div>

                  {/* Interval Selection Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-[7.5px] font-black text-editorial-muted uppercase font-mono">
                      SELECT INTERVAL PATTERN:
                    </label>
                    <select
                      id="select_setting_scan_interval"
                      value={autoScanInterval}
                      onChange={(e) => onSetAutoScanInterval(Number(e.target.value))}
                      className="w-full p-1.5 bg-[#FDFCF8] border border-editorial-border focus:border-[#FF5A1F] outline-none text-[10px] font-mono rounded-none text-editorial-text cursor-pointer"
                    >
                      <option value={0}>DISABLED & OFF (MANUAL ONLY)</option>
                      <option value={15}>15 SECONDS (HIGH FREQUENCY)</option>
                      <option value={30}>30 SECONDS (REGULAR MONITOR)</option>
                      <option value={60}>1 MINUTE (RECOMMENDED)</option>
                      <option value={300}>5 MINUTES (LOW INTENSITY)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Information visual advisory block */}
              <div className="p-4 bg-amber-50/50 border border-amber-500/20 text-left font-mono text-[9px] leading-relaxed text-amber-800 space-y-1.5">
                <div className="font-extrabold uppercase tracking-wide text-amber-900 flex items-center gap-1">
                  <ShieldAlert size={12} className="text-[#FF5A1F]" />
                  <span>Intelligence Mogul Hardware Safety Notice</span>
                </div>
                <p className="font-sans font-medium text-editorial-muted">
                  Enabling automatic high-frequency scans will apply continuous mathematical stress cycles to your hardware cores. Under prolonged scanning periods, the system&apos;s battery status indicator may report energy dissipation levels.
                </p>
              </div>

              {/* Summary assurance footnote block */}
              <div className="pt-2 border-t border-editorial-border flex items-center justify-between text-[8px] text-editorial-muted font-mono">
                <span>Preference Register SHA-256: 0xE7B9F1</span>
                <span>Active Sync Mode: Local Storage Ledger</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
