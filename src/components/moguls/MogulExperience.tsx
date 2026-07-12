"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Activity, Radio, Terminal } from "lucide-react";
import { mogulIcons } from "@/lib/data/moguls";
import type { Mogul, Project } from "@/lib/types";
import type { MogulExtras, MogulMetric } from "@/lib/data/mogul-extras";

export type NavMogul = {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  order: number;
};

const OCTAGON = "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)";
const FEED_TIMES = ["1m ago", "3m ago", "6m ago", "9m ago", "12m ago"];

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ────────────────────────────── Count-up metric ───────────────────────────── */
function Counter({ metric }: { metric: MogulMetric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const decimals = metric.decimals ?? 0;
  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const [display, setDisplay] = useState(reduce ? fmt(metric.value) : fmt(0));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, metric.value, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, metric.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {metric.prefix}
      {display}
      {metric.suffix}
    </span>
  );
}

/* ─────────────────────────────── Live sparkline ───────────────────────────── */
const SPARK = [34, 48, 40, 58, 52, 70, 63, 82, 74, 90, 84, 98];
function Sparkline({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref} className="flex h-12 items-end gap-1">
      {SPARK.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 2 }}
          animate={inView ? { height: `${h}%` } : {}}
          transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex-1 rounded-sm"
          style={{ background: `linear-gradient(to top, ${accent}, ${accent}55)` }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────── Command-center hero ─────────────────────────────── */
function Hero({ mogul, extras }: { mogul: Mogul; extras: MogulExtras }) {
  const Icon = mogulIcons[mogul.icon];
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(720px circle at ${mx}% ${my}%, rgba(${extras.glow}, 0.16), transparent 60%)`;

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  function onMove(e: React.MouseEvent) {
    if (reduce || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  const panelBorder = `rgba(${extras.glow},0.3)`;

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      className="relative flex min-h-[94vh] w-full items-center overflow-hidden bg-[#03040a] py-24"
    >
      {/* Immersive backdrop: the mogul's subject, dimmed to ambient */}
      {mogul.image && (
        <motion.div style={reduce ? undefined : { y: bgY, scale: bgScale }} className="absolute inset-0">
          <Image src={mogul.image} alt={mogul.name} fill priority sizes="100vw" className="object-cover object-center opacity-[0.5]" />
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#03040a] via-[#03040a]/85 to-[#03040a]/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent to-[#03040a]/70" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40" />
      {!reduce && <motion.div style={{ background: spotlight }} className="pointer-events-none absolute inset-0" />}

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 lg:grid-cols-[1fr_460px]">
        {/* Identity */}
        <div>
          <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
            <Link
              href="/moguls"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/80"
            >
              <ArrowLeft className="size-3.5" />
              Empire / Divisions
            </Link>
          </motion.div>

          <motion.div variants={rise} initial="hidden" animate="show" custom={1} className="mt-6 flex items-center gap-3">
            <span
              className="grid size-11 place-items-center rounded-xl border"
              style={{ borderColor: `rgba(${extras.glow},0.4)`, background: `rgba(${extras.glow},0.1)`, color: extras.accent }}
            >
              {Icon && <Icon className="size-5" strokeWidth={1.75} />}
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
              Division {String(mogul.orderIndex).padStart(2, "0")} · {mogul.category}
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 font-heading text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            {mogul.name.replace(" Mogul", "")}
            <span className="mt-1 block text-3xl font-light text-white/50 sm:text-4xl">Mogul</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/65"
          >
            <span style={{ color: extras.accent }}>{extras.mandate}</span> {mogul.fullDescription}
          </motion.p>

          <motion.div variants={rise} initial="hidden" animate="show" custom={4} className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-widest"
              style={{ borderColor: `rgba(${extras.glow},0.35)`, color: extras.accent }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: extras.accent }} />
                <span className="relative inline-flex size-2 rounded-full" style={{ background: extras.accent }} />
              </span>
              {extras.status}
            </span>
            <span className="text-sm text-white/45">{extras.tagline}</span>
          </motion.div>

          <motion.div variants={rise} initial="hidden" animate="show" custom={5} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg px-7 text-sm font-semibold text-[#05060a] transition-transform hover:-translate-y-0.5"
              style={{ background: extras.accent, boxShadow: `0 0 34px rgba(${extras.glow},0.45)` }}
            >
              Partner with this division
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#divisions"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/15 px-7 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
            >
              Return to control chamber
            </Link>
          </motion.div>
        </div>

        {/* Live HUD stack */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          {/* COMMAND panel — live metrics + sparkline */}
          <div className="rounded-2xl border bg-black/60 p-5 backdrop-blur-xl" style={{ borderColor: panelBorder }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                <Terminal className="size-3.5" style={{ color: extras.accent }} />
                {mogul.name.replace(" Mogul", "")} Command
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest" style={{ color: extras.accent }}>
                <span className="size-1.5 animate-pulse rounded-full" style={{ background: extras.accent }} />
                {extras.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5">
              {extras.metrics.map((m) => (
                <div key={m.label} className="bg-[#080b12] px-4 py-3.5">
                  <div className="font-heading text-2xl font-bold" style={{ color: extras.accent }}>
                    <Counter metric={m} />
                  </div>
                  <div className="mt-1 text-[9px] font-mono uppercase tracking-wider text-white/40">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/35">
              <span>Throughput · 12mo</span>
              <span className="flex items-center gap-1" style={{ color: extras.accent }}>
                <Activity className="size-3" /> live
              </span>
            </div>
            <div className="mt-2">
              <Sparkline accent={extras.accent} />
            </div>

            <Link
              href="/dashboard"
              className="group mt-4 flex h-11 items-center justify-center gap-2 rounded-lg border text-xs font-mono uppercase tracking-widest transition-colors"
              style={{ borderColor: panelBorder, color: extras.accent }}
            >
              Open command deck
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ACTIVITY panel — live feed */}
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
              <Radio className="size-3.5" style={{ color: extras.accent }} />
              Live activity
            </div>
            <ul className="mt-3 space-y-2.5">
              {extras.signals.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between gap-2 text-[12px]"
                >
                  <span className="flex items-center gap-2 text-white/70">
                    <span className="size-1.5 rounded-full" style={{ background: extras.accent }} />
                    {s}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-white/25">{FEED_TIMES[i] ?? "now"}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="group mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] font-mono uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            >
              View full log
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────── Capabilities ──────────────────────────────── */
function Capabilities({ mogul, extras }: { mogul: Mogul; extras: MogulExtras }) {
  const Icon = mogulIcons[mogul.icon];
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionHeading eyebrow="Operating capabilities" title="What this division commands" accent={extras.accent} />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:row-span-2"
          style={{ boxShadow: `inset 0 0 60px rgba(${extras.glow},0.06)` }}
        >
          <div>
            <span
              className="grid size-12 place-items-center rounded-xl border"
              style={{ borderColor: `rgba(${extras.glow},0.4)`, background: `rgba(${extras.glow},0.1)`, color: extras.accent }}
            >
              {Icon && <Icon className="size-6" strokeWidth={1.75} />}
            </span>
            <h3 className="mt-6 font-heading text-2xl font-semibold text-white">{extras.mandate}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/50">{mogul.shortDescription}</p>
          </div>
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full blur-3xl"
            style={{ background: `rgba(${extras.glow},0.18)` }}
          />
        </motion.div>

        {mogul.capabilities.map((cap, i) => (
          <motion.div
            key={cap}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            custom={i}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(400px circle at 50% 0%, rgba(${extras.glow},0.1), transparent 70%)` }}
            />
            <div className="relative flex items-start gap-3">
              <span
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md"
                style={{ background: `rgba(${extras.glow},0.14)`, color: extras.accent }}
              >
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] font-medium text-white/80">{cap}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Sequence ─────────────────────────────────── */
function Sequence({ extras }: { extras: MogulExtras }) {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#04050b] py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${extras.glow},0.35), transparent)` }}
      />
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading eyebrow="The operating sequence" title="How the division compounds" accent={extras.accent} />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {extras.sequence.map((step, i) => (
            <motion.div
              key={step.title}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
              className="relative rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid size-9 place-items-center rounded-full border text-sm font-bold"
                  style={{ borderColor: `rgba(${extras.glow},0.5)`, color: extras.accent }}
                >
                  {i + 1}
                </span>
                <span className="font-heading text-lg font-semibold text-white">{step.title}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Projects ─────────────────────────────────── */
function Projects({ projects, extras }: { projects: Project[]; extras: MogulExtras }) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionHeading eyebrow="In this division" title="Active projects" accent={extras.accent} />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            custom={i}
          >
            <Link
              href={`/projects/${p.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
            >
              <div className="flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest"
                  style={{ background: `rgba(${extras.glow},0.12)`, color: extras.accent }}
                >
                  {p.status}
                </span>
                <ArrowUpRight className="size-5 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-white">{p.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/50">{p.shortDescription}</p>
              <div className="mt-5 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/40">
                <span>{p.industry}</span>
                <span>{p.progressPercent}%</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.progressPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: extras.accent }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────── Division navigator ────────────────────────────── */
function DivisionNavigator({ allMoguls, current }: { allMoguls: NavMogul[]; current: string }) {
  const ordered = [...allMoguls].sort((a, b) => a.order - b.order);
  const idx = ordered.findIndex((m) => m.slug === current);
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#03040a] py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading eyebrow="Eight forces, one empire" title="Traverse the divisions" accent="#d6aa38" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {ordered.map((m) => {
            const Icon = mogulIcons[m.icon];
            const active = m.slug === current;
            return (
              <Link
                key={m.slug}
                href={`/moguls/${m.slug}`}
                aria-current={active ? "page" : undefined}
                className="group relative flex aspect-square flex-col items-center justify-center gap-2 border p-3 text-center transition-transform hover:-translate-y-1"
                style={{
                  clipPath: OCTAGON,
                  borderColor: active ? m.accent : "rgba(255,255,255,0.1)",
                  background: active ? `rgba(${hexToRgb(m.accent)},0.12)` : "rgba(255,255,255,0.02)",
                  boxShadow: active ? `0 0 30px rgba(${hexToRgb(m.accent)},0.35)` : undefined,
                }}
              >
                {Icon && <Icon className="size-5 transition-colors" style={{ color: m.accent }} />}
                <span className={active ? "text-[11px] font-semibold text-white" : "text-[11px] text-white/50 group-hover:text-white/80"}>
                  {m.name.replace(" Mogul", "")}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
          <Link href={`/moguls/${prev.slug}`} className="group flex items-center gap-3 text-left">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" style={{ color: prev.accent }} />
            <span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-white/30">Previous</span>
              <span className="text-sm font-medium text-white/80 group-hover:text-white">{prev.name.replace(" Mogul", "")}</span>
            </span>
          </Link>
          <Link href={`/moguls/${next.slug}`} className="group flex items-center gap-3 text-right">
            <span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-white/30">Next</span>
              <span className="text-sm font-medium text-white/80 group-hover:text-white">{next.name.replace(" Mogul", "")}</span>
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" style={{ color: next.accent }} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────── CTA ───────────────────────────────────── */
function FinalCta({ mogul, extras }: { mogul: Mogul; extras: MogulExtras }) {
  return (
    <section className="relative overflow-hidden bg-[#04050b] py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: `rgba(${extras.glow},0.14)` }}
      />
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-heading text-4xl font-bold text-white md:text-5xl"
        >
          Partner with the{" "}
          <span style={{ color: extras.accent }}>{mogul.name.replace(" Mogul", "")}</span> Mogul
        </motion.h2>
        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="mx-auto mt-5 max-w-lg text-lg text-white/50"
        >
          Bring a project, a company, or capital to this division and compound it inside the empire.
        </motion.p>
        <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2} className="mt-9">
          <Link
            href="/contact"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg px-8 text-sm font-semibold text-[#05060a] transition-transform hover:-translate-y-0.5"
            style={{ background: extras.accent, boxShadow: `0 0 40px rgba(${extras.glow},0.5)` }}
          >
            Initialize partnership
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Shared bits ─────────────────────────────── */
function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      <div className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: accent }}>
        {eyebrow}
      </div>
      <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/* ─────────────────────────────── Main export ──────────────────────────────── */
export function MogulExperience({
  mogul,
  extras,
  projects,
  allMoguls,
}: {
  mogul: Mogul;
  extras: MogulExtras;
  projects: Project[];
  allMoguls: NavMogul[];
}) {
  return (
    <div className="bg-[#03040a]">
      <Hero mogul={mogul} extras={extras} />
      <Capabilities mogul={mogul} extras={extras} />
      <Sequence extras={extras} />
      {projects.length > 0 && <Projects projects={projects} extras={extras} />}
      <DivisionNavigator allMoguls={allMoguls} current={mogul.slug} />
      <FinalCta mogul={mogul} extras={extras} />
    </div>
  );
}
