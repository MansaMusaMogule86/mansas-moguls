"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Clock, Sparkles } from "lucide-react";
import { Intervention } from "@/modules/intelligence-mogul/types";
import { INITIAL_INTERVENTIONS } from "@/modules/intelligence-mogul/data/mock-data";

export default function ArchiveView() {
  const [interventions] = useState<Intervention[]>(INITIAL_INTERVENTIONS);
  const [selectedId, setSelectedId] = useState<string>("SR-902");

  const selectedItem = interventions.find((itm) => itm.id === selectedId) || interventions[0];

  return (
    <div id="archive_view" className="p-6 space-y-6 overflow-y-auto min-h-0 custom-scrollbar font-mono text-editorial-text">
      {/* Top Banner */}
      <div className="p-5 bg-white rounded-none border border-editorial-border flex flex-col md:flex-row md:items-center justify-between gap-4" id="archive_header_banner">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#FF5A1F] block mb-1 tracking-wider">
            INTELLIGENCE AUDITS RECORD
          </span>
          <h2 className="text-sm font-black uppercase tracking-widest">
            STRATEGIC INTERVENTION ARCHIVE
          </h2>
          <p className="text-[10px] text-editorial-muted font-sans mt-0.5 leading-relaxed">
            Cryptographic ledger of autonomous system actions & stabilization reports
          </p>
        </div>

        <div className="text-[10px] text-[#FF5A1F] bg-[#FF5A1F]/10 px-3 py-1.5 rounded-none border border-[#FF5A1F]/20 flex items-center gap-2 font-bold tracking-wider uppercase">
          <Clock size={12} className="text-[#FF5A1F] animate-pulse" />
          <span>LEDGER SYNCHRONIZED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="archive_workspace_grid">
        
        {/* Left Columns: Ledger Ledger List */}
        <div className="lg:col-span-2 bg-white p-5 rounded-none border border-editorial-border" id="archive_ledger_table_card">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-editorial-border pb-3 mb-4 gap-2">
            <div>
              <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest">System Intervention Ledger</h3>
              <p className="text-[10px] text-editorial-muted font-sans mt-0.5">Autonomous triggers logged chronologically</p>
            </div>
            <span className="text-[9px] bg-[#FDFCF8] border border-editorial-border text-editorial-muted font-bold uppercase tracking-wider px-2 py-0.5 rounded-none">Node trace verified</span>
          </div>

          <div className="overflow-x-auto" id="archive_table_wrapper">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-editorial-border text-editorial-muted text-[9px] uppercase font-bold tracking-wider font-mono">
                  <th className="py-2.5">Intervention ID</th>
                  <th className="py-2.5">Target Nominee</th>
                  <th className="py-2.5">Codename</th>
                  <th className="py-2.5">Rating</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial-border/30 text-editorial-text font-serif">
                {interventions.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedId(row.id)}
                    className={`hover:bg-[#FDFCF8] cursor-pointer transition duration-150 ${selectedId === row.id ? "bg-[#FDFCF8] border-l-2 border-[#FF5A1F]" : ""}`}
                  >
                    <td className="py-3 font-bold text-[#FF5A1F] font-mono">{row.id}</td>
                    <td className="py-3 font-semibold text-editorial-text font-sans uppercase text-[10px] tracking-wide">{row.target}</td>
                    <td className="py-3 text-editorial-muted font-mono">{row.codename}</td>
                    <td className="py-3 font-mono">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-none border uppercase tracking-wider ${
                        row.impact_rating === "CRITICAL ACTION" 
                          ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/30" 
                          : "bg-editorial-text border-the-editorial text-white font-extrabold"
                      }`}>
                        {row.impact_rating}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${row.status === "ACTIVE" ? "text-[#FF5A1F] animate-pulse" : "text-editorial-muted font-semibold"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Ledger Log Details panel */}
        <div className="bg-white p-5 rounded-none border border-editorial-border flex flex-col justify-between" id="archive_deep_dive_card">
          <div>
            <div className="flex items-center justify-between border-b border-editorial-border pb-3 mb-4">
              <span className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="text-[#FF5A1F]" size={13} />
                Intervention Intel File
              </span>
              <span className="text-[9px] bg-editorial-text border border-editorial-text text-white px-2 py-0.5 rounded-none font-mono font-bold uppercase tracking-wider">
                {selectedItem.id}
              </span>
            </div>

            <div className="space-y-4 font-mono text-[11px] text-editorial-text">
              <div>
                <span className="text-editorial-muted block uppercase text-[8px] font-bold tracking-wider">CODENAME</span>
                <span className="text-editorial-text text-xs font-black block mt-1 uppercase tracking-wide">{selectedItem.codename}</span>
              </div>

              <div>
                <span className="text-editorial-muted block uppercase text-[8px] font-bold tracking-wider">TARGET&apos;S NOMINEE</span>
                <span className="text-editorial-text font-serif italic text-xs block mt-1">{selectedItem.target}</span>
              </div>

              <div>
                <span className="text-editorial-muted block uppercase text-[8px] font-bold tracking-wider">CATEGORY MATRIX</span>
                <span className="text-[#FF5A1F] block font-bold mt-1 uppercase tracking-wider text-[10px]">{selectedItem.category}</span>
              </div>

              <div>
                <span className="text-editorial-muted block uppercase text-[8px] font-bold tracking-wider">TIMESTAMP DETAIL</span>
                <span className="text-editorial-text block font-bold mt-1 tracking-wide text-[10px]">{selectedItem.timestamp}</span>
              </div>

              <div className="p-4 bg-[#FDFCF8] border border-editorial-border rounded-none leading-relaxed text-editorial-text font-serif italic border-l-2 border-[#FF5A1F]">
                <span className="text-editorial-muted block text-[8px] font-mono font-bold tracking-wider uppercase mb-1.5 not-italic">INTERVENTION DETAILS:</span>
                &ldquo;{selectedItem.description}&rdquo;
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-editorial-border/60 mt-4 flex items-center justify-between text-[10px] text-editorial-muted font-bold uppercase tracking-wider">
            <span>AUDIT ASSIGNED: INTELLIGENCE_SYS</span>
            <span className="text-[#FF5A1F] font-black tracking-widest">MUTATION_VERIFIED</span>
          </div>
        </div>

      </div>

    </div>
  );
}
