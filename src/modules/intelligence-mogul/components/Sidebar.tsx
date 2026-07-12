"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal,
  Network,
  Sliders,
  Briefcase,
  Archive,
  FileText,
  Search,
  Compass,
  Radio,
  CornerDownRight,
  Settings,
  LogOut,
} from "lucide-react";
import {
  SectionType,
  SECTION_ROUTES,
  sectionFromPathname,
} from "@/modules/intelligence-mogul/types";

interface SidebarProps {
  openSearchDialog: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  openSearchDialog,
  isMobileOpen,
  onCloseMobile
}: SidebarProps) {
  const pathname = usePathname();
  const activeSection = sectionFromPathname(pathname);
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.getUTCHours().toString().padStart(2, "0") + ":" +
                 now.getUTCMinutes().toString().padStart(2, "0") + ":" +
                 now.getUTCSeconds().toString().padStart(2, "0") + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: "dashboard" as SectionType, label: "Intelligence Command", icon: Terminal, color: "text-[#FF5A1F]" },
    { id: "twin" as SectionType, label: "Empire Twin", icon: Network, color: "text-[#FF5A1F]" },
    { id: "competitors" as SectionType, label: "Rival Intelligence", icon: Compass, color: "text-[#FF5A1F]" },
    { id: "simulation" as SectionType, label: "Scenario Engine", icon: Sliders, color: "text-[#FF5A1F]" },
    { id: "portfolio" as SectionType, label: "Acquisition Intelligence", icon: Briefcase, color: "text-[#FF5A1F]" },
    { id: "archive" as SectionType, label: "Intervention Command", icon: Archive, color: "text-[#FF5A1F]" },
    { id: "report" as SectionType, label: "Outcome Verification", icon: FileText, color: "text-[#FF5A1F]" },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-[#F2EFE7] select-none">
      <div>
        {/* Logo / Brand Header */}
        <div className="p-6 border-b border-editorial-border/60" id="sidebar_logo_area">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse"></span>
            <span className="text-xl font-bold font-serif italic text-editorial-text tracking-tighter">INTELLIGENCE</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[9px] text-[#FF5A1F] font-bold uppercase tracking-[0.2em] rounded-none">
            INTELLIGENCE OS
          </div>
        </div>

        {/* System Search Bar Button */}
        <div className="px-4 py-4" id="sidebar_search_area">
          <button
            id="btn_open_search"
            onClick={openSearchDialog}
            className="w-full flex items-center justify-between px-3 py-2 text-xs bg-[#FDFCF8] border border-editorial-border hover:border-[#FF5A1F] rounded-none text-editorial-muted hover:text-editorial-text transition duration-200 cursor-pointer"
          >
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
              <Search size={12} className="text-[#FF5A1F]" />
              LAUNCHER
            </span>
            <kbd className="px-1 text-[9px] bg-white border border-editorial-border rounded text-editorial-muted">⌘K</kbd>
          </button>
        </div>

        {/* Navigation Elements */}
        <nav className="px-3 space-y-1" id="sidebar_navigation">
          <div className="px-3 mb-2 text-[9px] text-editorial-muted uppercase tracking-[0.2em] font-bold">Workspace Nodes</div>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                id={`sidebar_link_${item.id}`}
                href={SECTION_ROUTES[item.id]}
                onClick={onCloseMobile}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs cursor-pointer select-none font-bold tracking-wide uppercase transition-all duration-200 rounded-none ${
                   isActive
                    ? "bg-[#FDFCF8] border border-editorial-border text-editorial-text border-l-4 border-l-[#FF5A1F]"
                    : "text-editorial-muted hover:text-editorial-text hover:bg-[#FDFCF8]/50"
                }`}
              >
                <IconComponent size={14} className={isActive ? item.color : "text-editorial-muted"} />
                <span className="text-[10px]">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-editorial-border space-y-3 bg-[#F2EFE7] font-mono" id="sidebar_details_footer">
        {/* Return to The Throne + system actions */}
        <Link
          href="/dashboard"
          id="return_to_throne"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-[#171717] text-white hover:bg-[#FF5A1F] transition-colors cursor-pointer rounded-none"
        >
          <CornerDownRight size={12} />
          Return to The Throne
        </Link>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-editorial-text border border-editorial-border bg-[#FFFDF8] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors cursor-pointer rounded-none"
          >
            <Settings size={11} />
            Settings
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-editorial-text border border-editorial-border bg-[#FFFDF8] hover:border-[#D53B32] hover:text-[#D53B32] transition-colors cursor-pointer rounded-none"
          >
            <LogOut size={11} />
            End Session
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-editorial-muted">
          <span className="flex items-center gap-1.5">
            <Radio size={12} className="text-[#FF5A1F] animate-pulse" />
            LIVE_FEED_SYNC
          </span>
          <span className="text-[#FF5A1F] font-bold">ONLINE</span>
        </div>

        <div className="p-2 py-1.5 bg-white rounded-none text-[11px] border border-editorial-border">
          <div className="text-editorial-muted text-[8px] uppercase tracking-[0.15em] font-bold mb-0.5">SYSTEM TIMER</div>
          <div className="text-editorial-text font-black tracking-widest text-sm">
            {utcTime || "00:00:00 UTC"}
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-editorial-muted border-t border-editorial-border/45 pt-2 uppercase font-bold tracking-wider">
          <span>CODENAME_ALPHA</span>
          <span>0x7E4F</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Permanent Desktop Sidebar */}
      <aside
        id="system_sidebar_desktop"
        className="hidden lg:flex w-60 bg-[#F2EFE7] border-r border-editorial-border flex-col justify-between h-full shrink-0 font-mono select-none"
      >
        {sidebarContent}
      </aside>

      {/* Slide-over Mobile sidebar drawer */}
      {isMobileOpen && (
        <div id="mobile_sidebar_drawer_wrapper" className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            id="mobile_sidebar_backdrop"
          />
          <aside
            id="system_sidebar_mobile"
            className="relative w-60 max-w-[80vw] bg-[#F2EFE7] h-full flex flex-col justify-between border-r border-editorial-border font-mono select-none z-50 shadow-xl"
            style={{
              animation: "slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            {/* Quick close link in drawer */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onCloseMobile}
                className="p-1 px-1.5 hover:bg-neutral-100 border border-editorial-border text-editorial-muted hover:text-editorial-text cursor-pointer rounded-none text-[9px] font-bold uppercase"
                id="close_mobile_sidebar_btn"
              >
                CLOSE
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
