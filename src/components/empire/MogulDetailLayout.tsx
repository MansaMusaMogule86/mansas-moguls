"use client";

import { motion } from "framer-motion";
import { type ModuleData } from "./Module";
import Image from "next/image";
import { ArrowRight, Hexagon, ShieldCheck } from "lucide-react";

export function MogulDetailLayout({ data }: { data: ModuleData }) {
  return (
    <div className="absolute inset-0 w-full h-full p-2 md:p-6 bg-[#050505]">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
