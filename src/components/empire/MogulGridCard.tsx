"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Hexagon, ShieldCheck } from "lucide-react";
import { type ModuleData } from "./Module";

export function MogulGridCard({ data, delay = 0 }: { data: ModuleData; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full h-[550px] group transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 bg-[#050505]"
    >
      <Image 
        src={data.image} 
        alt={data.title} 
        fill 
        className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" 
      />
      
      {/* Accent glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 80px ${data.accent}30` }}
      />
    </motion.div>
  );
}
