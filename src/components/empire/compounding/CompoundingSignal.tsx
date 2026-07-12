"use client";

import { motion } from "framer-motion";

export function CompoundingSignal({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#d6aa38]"
        initial={{ x: "0%", y: "50%", opacity: 0 }}
        animate={{
          x: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </div>
  );
}
