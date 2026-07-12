"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Intelligence Mogul workspace shell.
 *
 * Adapted from the standalone application's App.tsx: the view switcher was a
 * client-side state machine; here the active view arrives as `children` from
 * the Next.js App Router and navigation goes through real routes. Everything
 * else (integrity scan, audio cues, launcher, support terminus) is preserved.
 */

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/modules/intelligence-mogul/components/Sidebar";
import Header from "@/modules/intelligence-mogul/components/Header";
import SearchDialog from "@/modules/intelligence-mogul/components/SearchDialog";
import SupportFormModal from "@/modules/intelligence-mogul/components/SupportFormModal";
import LiveStatusTicker from "@/modules/intelligence-mogul/components/LiveStatusTicker";
import {
  SectionType,
  SECTION_ROUTES,
  sectionFromPathname,
} from "@/modules/intelligence-mogul/types";
import { playPingSound, playAbortedSound } from "@/modules/intelligence-mogul/lib/system-sounds";
import { HelpCircle, Loader2, CheckCircle } from "lucide-react";

const SECTION_TITLES: Record<SectionType, { title: string; subtitle: string }> = {
  dashboard: {
    title: "INTELLIGENCE MISSION CONTROL",
    subtitle: "100-Day Strategic Integration Schedule & Telematry Stream",
  },
  twin: {
    title: "Validated Empire Twin Workspace",
    subtitle: "Active Neural Knowledge Graph Tracing: NeuralLink Dynamics Corp",
  },
  competitors: {
    title: "Direct Feature Rival Matrix",
    subtitle: "Cross-referencing core metrics and live crawling alerts",
  },
  simulation: {
    title: "What-if Scenario Simulation Engine",
    subtitle: "Dynamic modeling of automation, personnel resources, and APAC hubs",
  },
  portfolio: {
    title: "Acquisition Diligence Targets",
    subtitle: "High-conviction acquisition candidates, synergy dials, and projected growth",
  },
  archive: {
    title: "System Intervention Cryptographic Archive",
    subtitle: "Ledger register tracking autonomous mitigation triggers",
  },
  report: {
    title: "Tactical Stabilization Report Audit",
    subtitle: "Post-intervention monitoring for SR-902 retention packages",
  },
};

export default function IntelligenceMogulShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = sectionFromPathname(pathname);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);

  // Premium first-entry transition: a thin orange intelligence scan sweeps the
  // canvas once per browser session, then the OS shell resolves. Subsequent
  // in-session navigations are instant (no long cinematic intro every time).
  // The component is client-only (ssr:false), so sessionStorage is safe here.
  const [entryScan, setEntryScan] = useState(() => {
    try {
      return sessionStorage.getItem("im_entry_seen") !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!entryScan) return;
    try {
      sessionStorage.setItem("im_entry_seen", "1");
    } catch {
      /* ignore sandboxed storage */
    }
    const t = setTimeout(() => setEntryScan(false), 900);
    return () => clearTimeout(t);
  }, [entryScan]);
  const [scanProgress, setScanProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [scanStartTime, setScanStartTime] = useState<number | null>(null);
  const [scanElapsed, setScanElapsed] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState(() => {
    try {
      const saved = localStorage.getItem("intelligence_mogul_audio_muted");
      return saved === "true";
    } catch {
      return false;
    }
  });

  const toggleAudioMuted = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("intelligence_mogul_audio_muted", String(next));
      } catch {
        // Safe fallback if localStorage is sandboxed
      }
      return next;
    });
  };

  const [autoScanInterval, setAutoScanInterval] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("intelligence_mogul_auto_scan_interval");
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const handleSetAutoScanInterval = (val: number) => {
    setAutoScanInterval(val);
    try {
      localStorage.setItem("intelligence_mogul_auto_scan_interval", String(val));
    } catch {
      // Safe fallback if localStorage is sandboxed
    }
  };

  // Automated background recurring sweeps of the computing matrix
  useEffect(() => {
    if (autoScanInterval <= 0) return;

    const autoTimer = setInterval(() => {
      // Only trigger auto-scan if not already scanning, and not succeeding right now
      if (!isScanning && !isSuccessAnimating) {
        setIsScanning(true);
        setScanProgress(0);
        setScanElapsed(0);
        setScanStartTime(Date.now());
        playPingSound(isAudioMuted);
      }
    }, autoScanInterval * 1000);

    return () => clearInterval(autoTimer);
  }, [autoScanInterval, isScanning, isSuccessAnimating, isAudioMuted]);

  // Core System Integrity Scan progress trigger
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isScanning && scanStartTime !== null) {
      timer = setInterval(() => {
        const elapsed = (Date.now() - scanStartTime) / 1000;
        setScanElapsed(elapsed);

        setScanProgress((prev) => {
          // Organic uneven increments to feel like a real system check
          const step = Math.floor(Math.random() * 14) + 6;
          const next = prev + step;
          if (next >= 100) {
            clearInterval(timer);
            setIsScanning(false);
            setIsSuccessAnimating(true);

            // Allow the user to admire the green success confirmation animation on the button
            setTimeout(() => {
              setIsSuccessAnimating(false);
              setIsSupportOpen(true);
              setShowToast(true);
            }, 1500);

            return 100;
          }
          return next;
        });
      }, 150); // Fast but highly noticeable ~1.5s visual progression
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isScanning, scanStartTime]);

  // Auto-dismiss the 'Scan Complete' toast notification after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSupportTrigger = () => {
    if (isSupportOpen) return;
    if (isSuccessAnimating) return;

    if (isScanning) {
      // Trigger synthesized low-frequency error/aborted tone
      playAbortedSound(isAudioMuted);
      setIsScanning(false);
      setScanProgress(0);
      setScanElapsed(0);
      setScanStartTime(null);
      return;
    }

    // Trigger synthesized Web Audio API technical ping
    playPingSound(isAudioMuted);

    setIsScanning(true);
    setScanProgress(0);
    setScanElapsed(0);
    setScanStartTime(Date.now());
  };

  const navigateToSection = (section: SectionType) => {
    router.push(SECTION_ROUTES[section]);
  };

  // Keyboard shortcut handlers for seamless command system
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD + K or CTRL + K triggers System Launcher
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }

      // Alt + Number keys to quick jump workspace nodes
      if (e.altKey && !isNaN(Number(e.key))) {
        const num = Number(e.key);
        const sections: SectionType[] = ["dashboard", "twin", "competitors", "simulation", "portfolio", "archive", "report"];
        if (num >= 1 && num <= sections.length) {
          e.preventDefault();
          router.push(SECTION_ROUTES[sections[num - 1]]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Dynamic progress bar color interpolation: safety green (16, 185, 129) to brand warning red (255, 62, 0)
  const scanRatio = scanProgress / 100;
  const scanR = Math.round(16 + scanRatio * (255 - 16));
  const scanG = Math.round(185 + scanRatio * (62 - 185));
  const scanB = Math.round(129 + scanRatio * (0 - 129));
  const progressColor = `rgb(${scanR}, ${scanG}, ${scanB})`;

  return (
    <div
      id="intelligence_mogul_root"
      className="intelligence-mogul-root im-shell flex h-[100dvh] w-full overflow-hidden bg-editorial-bg text-editorial-text font-sans relative"
    >
      {/* Responsive unified Sidebar component */}
      <Sidebar
        openSearchDialog={() => {
          setIsSearchOpen(true);
          setIsMobileSidebarOpen(false);
        }}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content viewport */}
        <main id="intelligence_viewport_main" className="flex-grow flex flex-col min-w-0 min-h-0 bg-[#FDFCF8] relative">
        <Header
          title={SECTION_TITLES[activeSection].title}
          subtitle={SECTION_TITLES[activeSection].subtitle}
          activeSection={activeSection}
          onToggleSidebarMobile={() => setIsMobileSidebarOpen(true)}
          isMuted={isAudioMuted}
          onToggleMute={toggleAudioMuted}
          isScanning={isScanning}
          scanElapsed={scanElapsed}
        />

        {/* View content section */}
        <div className="flex-grow overflow-y-auto min-h-0 bg-editorial-bg" id="current_node_viewport">
          {children}
        </div>

        {/* Real-time system performance & model health status ticker */}
        <LiveStatusTicker />
      </main>

      {/* Floating System Diagnostic & Support Terminus Trigger Button with embedded Integrity Scan overlay */}
      <button
        onClick={handleSupportTrigger}
        style={{
          background: isScanning
            ? `linear-gradient(90deg, ${progressColor} 0%, ${progressColor} ${scanProgress}%, #1A1A1A ${scanProgress}%, #1A1A1A 100%)`
            : isSuccessAnimating
              ? "#10B981"
              : undefined,
          borderColor: isScanning
            ? progressColor
            : isSuccessAnimating
              ? "#10B981"
              : undefined
        }}
        className={`absolute bottom-6 right-6 z-40 text-white p-3 border shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group font-mono text-[9.5px] uppercase tracking-wider h-10 select-none cursor-pointer ${
          isScanning
            ? "min-w-[245px]"
            : isSuccessAnimating
              ? "min-w-[245px] bg-[#10B981] border-[#10B981] animate-pulse"
              : "border-white/20 bg-[#1A1A1A] hover:bg-[#FF5A1F] hover:border-[#FF5A1F] support-button-idle min-w-[130px]"
        }`}
        title={isScanning
          ? `System Integrity Scan in progress: ${scanProgress}% (${scanElapsed.toFixed(1)}s) - Click to Abort`
          : isSuccessAnimating
            ? "System Integrity Secured!"
            : "Access Support Terminus & Integrity Diagnostic Form"}
        id="floating_support_trigger"
      >
        {isScanning ? (
          <>
            <Loader2 size={13} className="animate-spin text-white shrink-0 group-hover:hidden" />
            <span className="font-black tracking-widest text-[9px] group-hover:hidden">SCANNING INTEGRITY... {scanProgress}% ({scanElapsed.toFixed(1)}s)</span>
            <span className="font-black tracking-widest text-[9px] hidden group-hover:inline text-[#FFF] animate-pulse">✕ ABORT INTEGRITY SCAN</span>
          </>
        ) : isSuccessAnimating ? (
          <>
            <CheckCircle size={14} className="text-white shrink-0 animate-bounce scale-110" />
            <span className="font-black tracking-widest text-[9px] text-white">INTEGRITY SECURED: 100%</span>
          </>
        ) : (
          <>
            <HelpCircle size={14} className="text-[#FF5A1F] group-hover:text-white shrink-0" />
            <span className="font-bold">SYSTEM TERMINUS</span>
          </>
        )}
      </button>

      {/* Interactive Command Search Overlay modal popup */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveSection={navigateToSection}
      />

      {/* Interactive System Support Form, validation, and real-time ledger query modal */}
      <SupportFormModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        isAudioMuted={isAudioMuted}
        onToggleAudioMuted={toggleAudioMuted}
        autoScanInterval={autoScanInterval}
        onSetAutoScanInterval={handleSetAutoScanInterval}
      />

      {/* Subtle 'Scan Complete' toast notification */}
      {showToast && (
        <div
          id="scan_complete_toast"
          className="absolute top-20 right-6 z-50 bg-[#FDFCF8] border-2 border-[#1a1a1a] p-4 max-w-xs sm:max-w-sm shadow-xl flex items-start gap-3 animate-fade-in font-mono select-none"
        >
          <div className="text-[#10B981] shrink-0 mt-0.5">
            <CheckCircle size={16} className="stroke-[2.5]" />
          </div>
          <div className="flex-grow space-y-1 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[8px] font-black tracking-widest text-[#FF5A1F] uppercase">
                INTEGRITY SEAL VERIFIED
              </span>
              <button
                onClick={() => setShowToast(false)}
                className="text-editorial-muted hover:text-editorial-text font-black text-[10px] cursor-pointer hover:scale-110 transition-transform h-3 w-3 flex items-center justify-center p-0"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
            <p className="text-[10px] font-black text-editorial-text uppercase tracking-wider">
              SCAN COMPLETE: NOMINAL
            </p>
            <p className="text-[9px] text-editorial-muted font-sans leading-relaxed">
              System telemetry, CPU core thermals, and company neural sharding validated with 100% structural cohesion.
            </p>
          </div>
        </div>
      )}

      {/* Premium first-entry intelligence scan — single orange sweep per session */}
      {entryScan && (
        <div className="im-entry-scan" aria-hidden>
          <div className="im-entry-scan-line" />
          <div className="im-entry-scan-label">INTELLIGENCE MOGUL</div>
        </div>
      )}
    </div>
  );
}
