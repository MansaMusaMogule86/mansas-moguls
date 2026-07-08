"use client";

import { motion } from "framer-motion";
import { ChevronRight, RefreshCw } from "lucide-react";
import { flywheel } from "@/lib/brand";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const stageVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * The empire flywheel: Build → Acquire → Automate → Scale → Compound.
 */
export function EmpireFlywheel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 -mt-12"
    >
      <div className="glass-panel overflow-hidden rounded-2xl border border-gold/10 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:px-10 bg-empire-ink/80 backdrop-blur-md">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold font-mono">
            The Empire Flywheel
          </p>
          <h2 className="mt-3 text-2xl font-heading tracking-tight sm:text-3xl text-gradient-royal">
            Continuous Compounding Engine
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:flex-nowrap md:overflow-x-auto pb-2"
        >
          {flywheel.map((stage, i) => (
            <motion.div key={stage} variants={stageVariants} className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="flex items-center rounded-full border border-gold/20 bg-empire-surface/60 px-5 py-2.5 text-[13px] uppercase tracking-wider font-mono text-foreground/90 shadow-[0_10px_24px_rgba(0,0,0,0.3)] transition-colors hover:border-gold/50 hover:text-white hover:bg-gold/5 cursor-default">
                <span className="mr-2 text-gold opacity-60">0{i + 1}</span>
                {stage}
              </span>
              {i < flywheel.length - 1 && (
                <ChevronRight className="size-4 text-gold/30 shrink-0" />
              )}
            </motion.div>
          ))}

          {/* Loop indicator */}
          <motion.div variants={stageVariants} className="flex items-center gap-2 sm:gap-4 shrink-0">
            <ChevronRight className="size-4 text-gold/20 shrink-0" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="grid size-9 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/50"
            >
              <RefreshCw className="size-3.5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
