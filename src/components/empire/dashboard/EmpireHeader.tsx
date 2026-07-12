import Image from "next/image";

export function EmpireHeader() {
  const angledClipPath = {
    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
  };

  return (
    <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-gold/10 bg-[#03050A]">
      {/* Subtle gold lines running horizontally across the header (simulated via border-b and top border on main) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Top left: Small MM crest chamber */}
      <div className="flex items-center">
        <div 
          className="relative w-12 h-12 border border-gold/30 bg-gold/5 flex items-center justify-center p-[1px]"
          style={angledClipPath}
        >
          <div className="w-full h-full bg-[#070B12] flex items-center justify-center" style={angledClipPath}>
            <Image 
              src="/mansas-moguls-crown.png" 
              alt="MM Crest" 
              width={24} 
              height={24} 
              className="object-contain filter drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]" 
            />
          </div>
        </div>
      </div>

      {/* Top center: Main Title Block */}
      <div className="flex flex-col items-center text-center -mt-1">
        <div className="text-[9px] font-mono tracking-[0.3em] text-gold/80 uppercase mb-1">
          Mansas Moguls Operating System
        </div>
        <h1 className="text-xl md:text-2xl font-heading text-white tracking-[0.15em] uppercase mb-1">
          THE MANSAS MOGULS MASTER ECOLOGY
        </h1>
        <div className="text-[7.5px] font-mono uppercase tracking-[0.1em] text-gray-400">
          ALIGN. OPTIMIZE. INTEGRATE. SYNCHRONIZE. AN EMPIRE SYSTEM OF PERFECT ALIGNMENT.
        </div>
      </div>

      {/* Top right: System status block */}
      <div className="flex flex-col items-end gap-1.5 text-right">
        <div className="flex items-center gap-3 border border-white/5 bg-[#070B12] px-3 py-1.5 rounded" style={{ clipPath: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)" }}>
          <span className="text-[8px] font-mono tracking-widest text-gray-500 uppercase">ECOLOGICAL HARMONY</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold font-mono tracking-widest text-emerald uppercase">CONFIRMED</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse shadow-[0_0_8px_rgba(17,217,138,0.8)]" />
          </div>
        </div>
        <div className="flex items-center gap-3 border border-white/5 bg-[#070B12] px-3 py-1 rounded" style={{ clipPath: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)" }}>
          <span className="text-[8px] font-mono tracking-widest text-gray-500 uppercase">SYSTEM ALIGNMENT</span>
          <span className="text-[9px] font-bold font-mono tracking-widest text-white">100%</span>
        </div>
      </div>
    </header>
  );
}
