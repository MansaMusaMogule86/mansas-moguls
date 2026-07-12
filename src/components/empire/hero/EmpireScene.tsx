"use client";

import { motion, useReducedMotion } from "framer-motion";

export function EmpireScene({ scrollProgress }: { scrollProgress: any }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden flex items-end justify-center">
      
      {/* The Planet Container */}
      <motion.div
        className="relative w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] lg:w-[120vw] lg:h-[120vw] rounded-full translate-y-[85%] md:translate-y-[80%] lg:translate-y-[75%]"
        initial={{ y: "85%", opacity: 0 }}
        animate={{ y: "80%", opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Core Planet Base */}
        <div 
          className="absolute inset-0 rounded-full bg-[#050814]"
          style={{
            boxShadow: `
              inset 0 150px 200px -50px rgba(59, 130, 246, 0.4),
              inset 0 0 250px rgba(0,0,0,0.9),
              0 -30px 100px rgba(59, 130, 246, 0.2),
              0 0 150px rgba(214, 170, 56, 0.1)
            `,
            background: "radial-gradient(circle at 50% 5%, rgba(16, 24, 40, 0.9) 0%, rgba(2, 3, 8, 1) 50%)"
          }}
        />

        {/* Global Grid System */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            WebkitMaskImage: "radial-gradient(circle at 50% 5%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)",
            maskImage: "radial-gradient(circle at 50% 5%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)"
          }}
        >
          <motion.div
            className="w-full h-full opacity-30"
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(214, 170, 56, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "4% 4%",
              backgroundPosition: "center center",
              transformOrigin: "center center",
              // Create a 3D spherical distortion illusion
              transform: "perspective(1000px) rotateX(60deg) scale(2)"
            }}
          />
        </div>

        {/* Energy Nodes / Cities */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          >
            {/* Some fake glowing nodes scattered around the northern hemisphere */}
            <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-gold rounded-full shadow-[0_0_15px_2px_rgba(214,170,56,1)]" />
            <div className="absolute top-[15%] left-[60%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.8)]" />
            <div className="absolute top-[28%] left-[45%] w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_20px_2px_rgba(214,170,56,1)]" />
            <div className="absolute top-[12%] left-[75%] w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_10px_1px_rgba(59,130,246,0.8)]" />
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
              <path d="M 30% 20% Q 40% 10% 60% 15%" fill="transparent" stroke="url(#arc-gradient)" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 45% 28% Q 60% 20% 75% 12%" fill="transparent" stroke="url(#arc-gradient-2)" strokeWidth="1" strokeDasharray="4 4" />
              <defs>
                <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d6aa38" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="arc-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d6aa38" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Horizon Atmosphere Overlay */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 40%)"
          }}
        />
        
      </motion.div>
    </div>
  );
}
