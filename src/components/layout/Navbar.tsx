"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { mainNav, primaryCta } from "@/lib/brand";

// "Join The Empire" is a CTA link — style it differently
const CTA_NAV_LABEL = "Join The Empire";

/**
 * Public marketing navbar — scroll-aware glass bar, active links, mobile drawer.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sheet on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 sm:px-4 transition-all duration-300",
            scrolled
              ? "glass-panel border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
              : "border-transparent bg-transparent shadow-none backdrop-blur-none",
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-0.5 whitespace-nowrap lg:flex xl:gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              const isCta = item.label === CTA_NAV_LABEL;

              if (isCta) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="ml-1 rounded-full border border-gold/25 bg-gold/5 px-3.5 py-1.5 text-[13px] font-medium text-gold transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold-bright xl:text-sm"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA + mobile trigger */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden whitespace-nowrap bg-gold px-4 text-primary-foreground shadow-[0_8px_24px_rgba(212,175,55,0.2)] hover:bg-gold-bright sm:inline-flex"
            >
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="size-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-empire-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-16 z-50 flex h-[calc(100svh-4rem)] w-full max-w-xs flex-col border-l border-white/10 bg-empire-ink px-5 py-6 lg:hidden"
            >
              {/* Logo row */}
              <div className="flex items-center justify-between pb-5 border-b border-white/8">
                <Logo />
                <span className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Nav
                </span>
              </div>

              {/* Nav items — staggered */}
              <nav className="mt-4 flex flex-col gap-1 flex-1">
                {mainNav.map((item, i) => {
                  const active = isActive(item.href);
                  const isCta = item.label === CTA_NAV_LABEL;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-4 py-3 text-[15px] font-medium transition-colors",
                          isCta
                            ? "border-gold/25 bg-gold/5 text-gold hover:border-gold/40 hover:bg-gold/10"
                            : active
                              ? "border-white/12 bg-white/6 text-foreground"
                              : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/5 hover:text-foreground",
                        )}
                      >
                        {item.label}
                        {active && !isCta && (
                          <span className="size-1.5 rounded-full bg-gold" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * mainNav.length, duration: 0.3 }}
                className="pt-4 border-t border-white/8"
              >
                <Button
                  asChild
                  className="w-full bg-gold text-primary-foreground shadow-[0_8px_24px_rgba(212,175,55,0.2)] hover:bg-gold-bright"
                >
                  <Link href={primaryCta.href} onClick={() => setOpen(false)}>
                    {primaryCta.label}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
