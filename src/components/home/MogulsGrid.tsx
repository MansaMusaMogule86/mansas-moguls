"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MogulCard } from "@/components/moguls/MogulCard";
import { moguls } from "@/lib/data/moguls";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Eight Moguls bento grid — the permanent divisions of the empire.
 */
export function MogulsGrid() {
  return (
    <Section className="relative">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="The Divisions"
          title="Eight Moguls"
          description="Permanent strategic divisions that build, operate, and compound the empire."
          link={{ label: "View all Moguls", href: "/moguls" }}
        />
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {moguls.map((mogul) => (
          <motion.div key={mogul.id} variants={itemVariants} className="h-full">
            <MogulCard mogul={mogul} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
