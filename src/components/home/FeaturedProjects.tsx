"use client";

import { motion } from "framer-motion";
import { ProjectCommandCard } from "@/components/projects/ProjectCommandCard";
import { featuredProjects } from "@/lib/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FeaturedProjects() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background border-b border-white/5 overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10 px-4 md:px-8 max-w-[1560px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <h2 className="text-[10px] font-semibold tracking-[0.2em] text-electric-blue uppercase font-mono mb-3">
              In Motion
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground">
              Featured Projects
            </h3>
          </div>
          
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
          >
            View all projects
            <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <ProjectCommandCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
