"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectCommandCardProps {
  project: Project;
}

export function ProjectCommandCard({ project }: ProjectCommandCardProps) {
  // Determine accent color
  let accentClass = "group-hover:border-white/20";
  let textClass = "text-white";
  
  if (project.industry === "AI Infrastructure" || project.industry === "Market Intelligence") {
    accentClass = "group-hover:border-electric-blue/50 group-hover:shadow-[0_0_30px_rgba(55,124,255,0.15)]";
    textClass = "text-electric-blue";
  } else if (project.type === "portfolio_company" || project.type === "empire_project") {
    accentClass = "group-hover:border-gold/50 group-hover:shadow-[0_0_30px_rgba(214,170,56,0.15)]";
    textClass = "text-gold";
  }

  return (
    <Link href={`/projects/${project.slug}`} className={`group relative flex flex-col justify-end w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden hud-panel border-white/5 transition-all duration-500 hover:-translate-y-1.5 ${accentClass}`}>
      
      {/* Background artwork */}
      {project.image && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.image} 
            alt={project.name} 
            fill 
            className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
          />
          {/* Deep gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
      )}

      <div className="relative z-10 p-6 md:p-8 w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className={`text-[10px] font-mono uppercase tracking-widest ${textClass}`}>
            {project.industry}
          </div>
          <ArrowUpRight className="size-5 text-white/30 group-hover:text-white transition-colors" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-heading text-foreground mt-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>
        
        <p className="text-sm text-muted-foreground font-sans line-clamp-2 mt-1 max-w-md group-hover:text-white/80 transition-colors">
          {project.shortDescription}
        </p>

        {/* Animated progress rail */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 group-hover:w-full transition-all duration-1000 ease-out" style={{ color: textClass.includes("gold") ? "#d6aa38" : textClass.includes("blue") ? "#377cff" : "#fff" }} />
      </div>

    </Link>
  );
}
