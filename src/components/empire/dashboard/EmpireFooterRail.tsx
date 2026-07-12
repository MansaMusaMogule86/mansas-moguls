export function EmpireFooterRail() {
  return (
    <div className="relative w-full border-t border-white/5 bg-[#03050A] px-6 py-2.5 flex items-center justify-between z-10">
      {/* Left indicator */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 opacity-50">
          <span className="w-1 h-3 bg-gold/40 rounded-sm animate-pulse" />
          <span className="w-1 h-3 bg-gold/20 rounded-sm" />
          <span className="w-1 h-3 bg-gold/10 rounded-sm" />
        </div>
      </div>

      {/* Center text */}
      <div className="flex items-center gap-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
        <span className="text-[8.5px] font-mono tracking-[0.2em] text-gold uppercase font-bold text-center">
          ONE VISION. EIGHT FORCES. ONE PERFECT ECOLOGY. SUSTAINING THE MANSAS MOGULS LEGACY.
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
      </div>

      {/* Right indicator */}
      <div className="flex items-center gap-2">
        <div className="text-[8px] font-mono text-gray-600 tracking-widest uppercase">System Online</div>
        <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
      </div>
    </div>
  );
}
