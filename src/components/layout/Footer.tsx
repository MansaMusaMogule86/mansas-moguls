"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { brand, footerNav } from "@/lib/brand";

const colVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Public footer — empire lockup, link groups, legal row.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-empire-ink/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[1.4fr_2fr]"
        >
          {/* Brand column */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {brand.mission}
            </p>
            <p className="mt-4 text-[11px] font-mono uppercase tracking-[0.22em] text-gold/50">
              {brand.tagline}
            </p>
          </div>

          {/* Link columns — flat, no card wrappers */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {footerNav.map((group) => (
              <motion.div key={group.title} variants={itemVariants}>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold/70">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="gold-hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
            <span className="hidden sm:inline h-3 w-px bg-white/10" />
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.22em] text-gold/30 uppercase">
              {brand.monogram}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
