"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { HudPanel } from "@/components/empire-hud/HudPanel";
import { HudPanelHeader } from "@/components/empire-hud/HudPanelHeader";
import { HudButton } from "@/components/empire-hud/HudButton";
import Image from "next/image";

export function ComingNextModule() {
  return (
    <HudPanel
      colSpan="col-span-12 lg:col-span-6"
      heightClass="min-h-[340px]"
      color="gold"
      className="flex flex-col justify-between"
    >
      {/* Panel Header */}
      <HudPanelHeader
        title="FUTURE FORGE"
        divisionNumber="--"
        status="DORMANT"
        color="gold"
      />

      {/* Blueprint construction visual */}
      <div className="flex-1 flex gap-6 items-center justify-between my-2 overflow-hidden">
        <div className="flex-1 flex flex-col justify-center text-left">
          <h3 className="text-xs font-bold tracking-widest text-white/90 uppercase font-mono">
            A New Division is being forged
          </h3>
          <p className="text-[10px] text-white/40 tracking-wide mt-2 max-w-[85%] leading-relaxed">
            The empire's reach is continuously expanding. Automated pipelines, intelligent agent clusters, and future allocation models will unlock here.
          </p>
        </div>

        {/* Circular blueprint radar graphic */}
        <div className="relative w-32 h-32 flex items-center justify-center border border-white/5 bg-black/20 rounded-[1px] overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:0.5rem_0.5rem]" />
          
          {/* Scanning Beam */}
          <motion.div
            className="absolute inset-x-0 w-full h-8 bg-gradient-to-b from-transparent via-gold/10 to-transparent blur-sm"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute w-24 h-24 rounded-full border border-gold/10 border-dashed"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full border border-gold/25"
            style={{ borderStyle: "dotted" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative w-8 h-8 opacity-45">
            <Image
              src="/mansas-moguls-crown.png"
              alt="MM Crown Logo"
              fill
              className="object-contain filter drop-shadow-[0_0_8px_rgba(214,170,56,0.6)]"
              sizes="32px"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-2 border-t border-white/5">
        <HudButton variant="gold" onClick={() => alert("Telemetry logged: Expansion request registered.")}>
          <Plus className="size-3.5 mr-1" />
          Propose Expansion Division
        </HudButton>
      </div>
    </HudPanel>
  );
}
