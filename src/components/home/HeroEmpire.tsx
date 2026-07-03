"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, empireMetrics } from "@/lib/brand";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Full-bleed cinematic hero: crown eyebrow, empire headline, dual CTAs,
 * and the four headline metrics.
 */
export function HeroEmpire() {
  return (
    <section className="relative overflow-hidden">
      <div className="empire-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold"
          >
            <Sparkles className="size-3.5" />
            THE EMPIRE OPERATING SYSTEM
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-7 text-balance text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-gold">{brand.name}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl"
          >
            {brand.description} An AI-powered holding empire that compounds
            intelligent businesses.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group w-full bg-gold text-primary-foreground shadow-[0_0_0_1px_rgba(255,214,102,0.22),0_18px_40px_rgba(255,196,61,0.14)] hover:bg-gold-bright sm:w-auto"
            >
              <Link href="/empire">
                Explore The Empire
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/15 bg-white/5 hover:bg-white/10 sm:w-auto"
            >
              <Link href="/join">Join The Empire</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Metrics bento row */}
        <motion.div
          initial="hidden"
          animate="show"
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {empireMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              custom={4 + i}
              className="glass-panel rounded-2xl border border-white/10 px-5 py-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
            >
              <div className="font-heading text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                {metric.value}
              </div>
              <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
