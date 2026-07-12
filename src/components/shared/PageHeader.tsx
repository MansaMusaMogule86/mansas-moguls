"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero header — cinematic grid backdrop, dual gold/royal auras,
 * animated eyebrow + title reveal. Used at the top of every secondary public
 * route, so all of them share one premium, animated entrance.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/5 bg-background", className)}>
      <div className="empire-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[-5rem] h-80 w-[52rem] -translate-x-1/2 rounded-full bg-royal/12 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-8rem] top-0 h-72 w-[34rem] rounded-full bg-gold/10 blur-[120px]" />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
              </span>
              <span className="h-px w-8 bg-gold/40" />
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-gold/80">
                {eyebrow}
              </p>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance font-heading text-5xl font-bold leading-[1.05] drop-shadow-md sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-balance font-sans text-xl leading-relaxed text-muted-foreground/90"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
