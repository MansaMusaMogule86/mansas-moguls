"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, User, Building2, PenLine, ChevronRight, ArrowRight } from "lucide-react";

/**
 * "Talk to the Empire" contact section — a code reskin of the exported artwork.
 * Matches the artwork's banner, angular gold-edged cards, and form layout, but
 * every field stays a real, functional, responsive input (an image can't be typed
 * into). Chamfered corners are drawn with a two-layer clip-path so the gold edge
 * renders crisply.
 */

// Chamfer: cut the top-left and bottom-right corners.
const CHAMFER = "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

const CONTACT = [
  { icon: Mail, label: "Email", value: "contact@mansasmoguls.com", href: "mailto:contact@mansasmoguls.com" },
  { icon: MapPin, label: "Headquarters", value: "Dubai, United Arab Emirates", href: null },
  { icon: Briefcase, label: "Entity", value: "Mansas Moguls Holding", href: null },
] as const;

function AngularPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div style={{ clipPath: CHAMFER }} className="bg-gradient-to-br from-gold/50 via-gold/15 to-gold/40 p-px">
      <div style={{ clipPath: CHAMFER }} className={`h-full bg-[#080b12] ${className}`}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50">
          {label}
          {required && <span className="ml-0.5 text-gold">*</span>}
        </label>
        {optional && <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">Optional</span>}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-white/30 transition-colors focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/30";

export function EmpireContact() {
  return (
    <section className="relative w-full overflow-hidden border-t border-white/5 bg-[#040508] py-20 md:py-28">
      {/* Ambient light: gold globe glow (right) + skyline haze (left) evoking the artwork */}
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(214,170,56,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[420px] w-[320px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,170,56,0.10),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Banner ── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 text-xs font-mono uppercase tracking-[0.35em] text-gold">Get in touch</div>
            <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-wide sm:text-6xl md:text-7xl">
              <span className="block text-foreground">Talk To</span>
              <span className="block text-gradient-gold">The Empire</span>
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-40 bg-gradient-to-r from-gold/60 to-transparent" />
              <span className="rotate-45 text-gold/60">◇</span>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Partnerships, investments, press, or building with us — reach the right division.
            </p>
          </motion.div>

          {/* Crown emblem evoking the artwork's ringed logo + globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative hidden h-52 w-52 items-center justify-center lg:flex"
          >
            <div className="absolute inset-0 rounded-full border border-gold/15" />
            <div className="absolute inset-6 rounded-full border border-gold/10" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(214,170,56,0.12),transparent_70%)]" />
            <Image
              src="/mansas-moguls-crown.png"
              alt="Mansas Moguls"
              width={92}
              height={92}
              className="relative z-10 object-contain drop-shadow-[0_0_24px_rgba(214,170,56,0.6)]"
            />
          </motion.div>
        </div>

        {/* ── Cards + Form ── */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-8">

          {/* Left: contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {CONTACT.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="group flex items-center gap-4 p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold transition-colors group-hover:border-gold/70 group-hover:bg-gold/10">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/70">{label}</div>
                    <div className="truncate text-sm font-medium text-foreground">{value}</div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
                </div>
              );
              return (
                <AngularPanel key={label} className="transition-shadow hover:shadow-[0_0_28px_-8px_rgba(214,170,56,0.4)]">
                  {href ? <a href={href} aria-label={`${label}: ${value}`}>{inner}</a> : inner}
                </AngularPanel>
              );
            })}
          </motion.div>

          {/* Right: functional form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <AngularPanel>
              <form className="flex flex-col gap-6 p-7 md:p-9" onSubmit={(e) => e.preventDefault()}>
                <div className="text-sm font-mono uppercase tracking-[0.25em] text-gold">Send a Message</div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label="Name" required>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/50" />
                      <input type="text" name="name" required placeholder="Your name" className={inputClass} />
                    </div>
                  </Field>
                  <Field label="Email" required>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/50" />
                      <input type="email" name="email" required placeholder="you@company.com" className={inputClass} />
                    </div>
                  </Field>
                </div>

                <Field label="Company" optional>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/50" />
                    <input type="text" name="company" placeholder="Company or venture" className={inputClass} />
                  </div>
                </Field>

                <Field label="Message" required>
                  <div className="relative">
                    <PenLine className="pointer-events-none absolute left-4 top-4 size-4 text-gold/50" />
                    <textarea
                      name="message"
                      required
                      placeholder="How can the empire help?"
                      className={`${inputClass} min-h-[120px] resize-none pt-3`}
                    />
                  </div>
                </Field>

                <button
                  type="submit"
                  className="group relative mt-1 flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-md bg-gradient-to-r from-gold via-gold-bright to-gold text-sm font-semibold uppercase tracking-[0.2em] text-empire-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,170,56,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Send Message
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/25 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </form>
            </AngularPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
