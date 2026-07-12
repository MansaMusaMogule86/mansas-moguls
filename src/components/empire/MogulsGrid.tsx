"use client";

import { MODULES } from "./CommandCenter";
import { MogulGridCard } from "./MogulGridCard";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

export function MogulsGrid() {
  const angledClipPath = {
    clipPath: "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)"
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Render the 7 Moguls */}
        <MogulGridCard data={MODULES.find(m => m.id === "ai")!} delay={0.1} />
        <MogulGridCard data={MODULES.find(m => m.id === "venture")!} delay={0.2} />
        <MogulGridCard data={MODULES.find(m => m.id === "capital")!} delay={0.3} />
        <MogulGridCard data={MODULES.find(m => m.id === "growth")!} delay={0.4} />
        
        <MogulGridCard data={MODULES.find(m => m.id === "studio")!} delay={0.5} />
        <MogulGridCard data={MODULES.find(m => m.id === "innovation")!} delay={0.6} />
        <MogulGridCard data={MODULES.find(m => m.id === "knowledge")!} delay={0.7} />

        {/* The 8th Card: Expand Empire */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          className="relative w-full h-[550px] p-[1px] group transition-all duration-500 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, rgba(212,175,55,0.4) 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 80%, rgba(212,175,55,0.1) 100%)`,
            ...angledClipPath
          }}
        >
          <div 
            className="relative w-full h-full bg-[#050505] p-6 flex flex-col justify-center items-center text-center overflow-hidden"
            style={angledClipPath}
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gold/5 blur-[50px] group-hover:bg-gold/10 transition-colors duration-1000" />
            
            {/* Outer dotted orbit ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] border border-gold/10 rounded-full"
              style={{ x: "-50%", y: "-50%", borderStyle: "dashed" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner dashed orbit ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border border-gold/20 rounded-full"
              style={{ x: "-50%", y: "-50%", borderStyle: "dotted" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Plus Icon with glowing rings */}
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 bg-gold/20 blur-[20px] rounded-full group-hover:bg-gold/40 transition-colors" />
                <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-black">
                  <Plus className="text-gold" size={24} />
                </div>
              </div>

              <h2 className="text-xl font-heading tracking-widest uppercase text-white mb-4">
                EXPAND EMPIRE
              </h2>
              
              <p className="text-gray-400 text-[10px] uppercase tracking-widest leading-relaxed max-w-[80%]">
                New divisions coming soon. <br/> The empire never stops growing.
              </p>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] flex justify-center mt-2 pt-4 border-t border-white/5">
              <button 
                className="flex items-center gap-2 px-6 py-2 rounded text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-gold/20 hover:bg-gold/10 text-gold"
              >
                SUGGEST DIVISION <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
