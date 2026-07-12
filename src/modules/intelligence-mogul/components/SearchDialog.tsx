"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { Search, X, Terminal, CornerDownLeft, Sparkles } from "lucide-react";
import { SectionType } from "@/modules/intelligence-mogul/types";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveSection: (section: SectionType) => void;
}

const searchIndex = [
  { id: "dashboard" as SectionType, title: "Mission Control — Roadmap & Core Pillars", category: "Workspace Node", shortcut: "G1" },
  { id: "twin" as SectionType, title: "Empire Twin — Neural Network Graph & Scorecard", category: "Workspace Node", shortcut: "G2" },
  { id: "competitors" as SectionType, title: "Rival Intelligence — Direct Rival Comparison", category: "Workspace Node", shortcut: "G3" },
  { id: "simulation" as SectionType, title: "Scenario Engine — What-If Predictive Simulations", category: "Workspace Node", shortcut: "G4" },
  { id: "portfolio" as SectionType, title: "Acquisition Targets — Diligence Pipelines", category: "Workspace Node", shortcut: "G5" },
  { id: "archive" as SectionType, title: "Intervention Ledger — Historical Action Logs", category: "Workspace Node", shortcut: "G6" },
  { id: "report" as SectionType, title: "Outcome Verification — Telemetry Reports for SR-902", category: "Workspace Node", shortcut: "G7" },
];

export default function SearchDialog({ isOpen, onClose, setActiveSection }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  // Results are derived from the query — no state/effect needed.
  const results = useMemo(() => {
    if (!query) return searchIndex;
    const q = query.toLowerCase();
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Handle ESC key press and overall hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="search_dialog_backdrop"
      className="fixed inset-0 z-50 bg-[#1A1A1A]/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        id="search_dialog_content"
        className="w-full max-w-lg bg-white border border-editorial-border rounded-none overflow-hidden flex flex-col font-mono shadow-2xl animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Field */}
        <div className="p-4 border-b border-editorial-border bg-[#FDFCF8] flex items-center gap-3">
          <Search size={16} className="text-[#FF5A1F]" />
          <input
            id="search_system_input"
            type="text"
            placeholder="Type command, workspace node, or audit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-editorial-text text-xs placeholder-editorial-muted outline-none font-bold"
            autoFocus
          />
          <button onClick={onClose} className="text-editorial-muted hover:text-editorial-text transition cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-60 overflow-y-auto custom-scrollbar p-2 space-y-0.5" id="search_results_scroller">
          {results.length === 0 ? (
            <div className="p-4 text-center text-[10px] text-editorial-muted uppercase tracking-wider">
              No matching tactical nodes or commands found
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                id={`search_result_btn_${item.id}`}
                onClick={() => {
                  setActiveSection(item.id);
                  onClose();
                }}
                className="w-full text-left flex items-center justify-between p-2.5 rounded-none hover:bg-[#FDFCF8] group transition text-xs cursor-pointer select-none border-b border-editorial-border/30 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Terminal size={14} className="text-editorial-muted group-hover:text-[#FF5A1F] transition" />
                  <div>
                    <div className="font-bold text-editorial-text group-hover:text-[#FF5A1F] transition uppercase tracking-wide text-[11px]">{item.title}</div>
                    <div className="text-[9px] text-[#FF5A1F] uppercase font-bold mt-0.5 tracking-wider">{item.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-[#FDFCF8] text-editorial-muted px-1.5 py-0.5 border border-editorial-border font-bold group-hover:bg-[#FF5A1F]/10 group-hover:text-[#FF5A1F] group-hover:border-[#FF5A1F]/30 transition">
                    {item.shortcut}
                  </span>
                  <CornerDownLeft size={10} className="text-[#FF5A1F] opacity-0 group-hover:opacity-100 transition" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Quick Footer commands info */}
        <div className="p-3 bg-[#FDFCF8] border-t border-editorial-border/60 text-[9px] text-editorial-muted flex items-center justify-between">
          <span className="flex items-center gap-1 font-bold uppercase tracking-wider">
            <Sparkles size={10} className="text-[#FF5A1F]" />
            Route status: <b className="text-editorial-text font-black">Vector Sync Verified</b>
          </span>
          <span className="uppercase font-bold tracking-wider">Press <kbd className="px-1 py-0.5 bg-white border border-editorial-border">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
}
