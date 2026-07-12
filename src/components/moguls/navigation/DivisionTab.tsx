"use client";

import { motion } from "framer-motion";
import { mogulIcons } from "@/lib/data/moguls";
import type { Mogul } from "@/lib/types";
import { getMogulExtras } from "@/lib/data/mogul-extras";
import { ArrowDown } from "lucide-react";

export function DivisionTab({
  mogul,
  isActive,
  onClick,
}: {
  mogul: Mogul;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = mogulIcons[mogul.icon];
  const extras = getMogulExtras(mogul.slug);
  const accent = extras?.accent || "#ffffff";
  const glow = extras?.glow || "255,255,255";

  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`mogul-panel-${mogul.slug}`}
      onClick={onClick}
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      initial="default"
      animate={isActive ? "active" : "default"}
      className={`
        relative isolation-isolate flex flex-col items-center justify-center gap-2 p-3
        min-h-[64px] md:min-h-[96px] md:min-w-[120px] w-full
        cursor-pointer touch-manipulation select-none overflow-hidden
        border transition-colors duration-300 outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03040a]
        ${isActive ? 'bg-black/80' : 'bg-white/[0.02] border-white/5'}
      `}
      style={{
        borderColor: isActive ? accent : undefined,
        boxShadow: isActive ? `0 -2px 20px rgba(${glow}, 0.2), inset 0 20px 40px -20px rgba(${glow}, 0.15)` : undefined,
      }}
    >
      {/* Background Glow */}
      <motion.div 
        variants={{
          default: { opacity: 0 },
          hover: { opacity: 0.5 },
          active: { opacity: 1 }
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(100px circle at 50% 0%, rgba(${glow}, 0.15), transparent 70%)`
        }}
      />
      
      {/* Active Energy Line */}
      {isActive && (
        <motion.div 
          layoutId="activeTabIndicator"
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
        />
      )}

      {/* Index & Icon Row */}
      <div className="flex items-center justify-between w-full px-2 relative z-10">
        <span className="text-[10px] font-mono font-bold tracking-widest text-white/30">
          {String(mogul.orderIndex).padStart(2, "0")}
        </span>
        <motion.div 
          variants={{
            default: { scale: 1, color: "rgba(255,255,255,0.4)" },
            hover: { scale: 1.06, color: accent },
            active: { scale: 1.06, color: accent }
          }}
          className="transition-colors duration-300"
        >
          {Icon && <Icon className="w-4 h-4" strokeWidth={2} />}
        </motion.div>
      </div>

      {/* Title */}
      <motion.span 
        variants={{
          default: { color: "rgba(255,255,255,0.5)" },
          hover: { color: "rgba(255,255,255,0.9)" },
          active: { color: "#ffffff" }
        }}
        className="text-[11px] font-heading font-bold uppercase tracking-widest relative z-10 transition-colors duration-300"
      >
        {mogul.name.replace(" Mogul", "")}
      </motion.span>

      {/* Status Light */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Open</span>
        <ArrowDown className="w-3 h-3 text-white/40" />
      </div>
      
      <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-100">
         <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? accent : 'rgba(255,255,255,0.1)' }} />
      </div>

    </motion.button>
  );
}
