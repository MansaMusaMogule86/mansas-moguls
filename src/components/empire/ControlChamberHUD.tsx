"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * The Empire Control Chamber is a single, complete UI composition exported as
 * one artwork (1536x1024, 3:2). It behaves like a full-width hero image:
 * occupies the full width of its container, keeps its natural aspect ratio,
 * and lets its own proportions drive the height — no fixed heights, no
 * object-contain, no crop, no wrapping card.
 *
 * Each of the eight Mogul octagons is made clickable by overlaying an invisible
 * <Link> positioned over it. Positions are measured against the 1536x1024
 * artwork and expressed as % of the image, so they track each octagon at every
 * width (the image keeps a fixed aspect ratio).
 */
const MOGUL_HOTSPOTS = [
  { slug: "intelligence", name: "Intelligence", left: "37%",   top: "3.1%",  width: "26.3%", height: "22.5%" },
  { slug: "ai",           name: "AI",           left: "18.6%", top: "14.6%", width: "16.7%", height: "20.5%" },
  { slug: "capital",      name: "Capital",      left: "64.2%", top: "14.6%", width: "16.9%", height: "20.7%" },
  { slug: "growth",       name: "Growth",       left: "70.8%", top: "37.9%", width: "20.5%", height: "19.5%" },
  { slug: "studio",       name: "Studio",       left: "64.2%", top: "60.2%", width: "18.2%", height: "20.9%" },
  { slug: "venture",      name: "Venture",      left: "37.2%", top: "68.4%", width: "20.6%", height: "25%" },
  { slug: "innovation",   name: "Innovation",   left: "18.6%", top: "60.2%", width: "16.9%", height: "25%" },
  { slug: "knowledge",    name: "Knowledge",    left: "11.5%", top: "37.9%", width: "16.9%", height: "20.9%" },
];

export function ControlChamberHUD() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <Image
        src="/images/control-chamber/empire-control-chamber.webp"
        alt="Empire Control Chamber — the eight Moguls that build, operate, and compound the empire"
        width={1536}
        height={1024}
        sizes="(min-width: 1560px) 1512px, 100vw"
        priority={false}
        className="block h-auto w-full rounded-2xl"
      />

      {/* Clickable Mogul octagons */}
      {MOGUL_HOTSPOTS.map(({ slug, name, left, top, width, height }) => (
        <Link
          key={slug}
          href={`/moguls/${slug}`}
          aria-label={`${name} Mogul`}
          style={{ left, top, width, height }}
          className="absolute z-10 rounded-xl outline-none transition-shadow duration-200 hover:shadow-[0_0_30px_rgba(214,170,56,0.4)] focus-visible:ring-2 focus-visible:ring-gold/80"
        />
      ))}
    </motion.div>
  );
}
