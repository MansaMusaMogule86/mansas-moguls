"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StageId } from "./compounding.types";

interface CompoundingTimelineProps {
  stages: StageId[];
  currentStageId: StageId;
  activeIndex: number;
  onSelectStage: (id: StageId) => void;
  orientation?: "horizontal" | "vertical";
}

export function CompoundingTimeline({
  stages,
  currentStageId,
  activeIndex,
  onSelectStage,
  orientation = "horizontal",
}: CompoundingTimelineProps) {
  const percentage = activeIndex / (stages.length - 1);
  const shouldReduce = useReducedMotion();

  if (orientation === "vertical") {
    return (
      <div className="relative w-2 h-full min-h-[450px] mx-auto flex flex-col justify-between items-center py-4">
        {/* Background rail */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-white/5" />
        
        {/* Filled progress rail */}
        <motion.div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-gold/50 to-gold origin-top"
          style={{ height: `${percentage * 100}%` }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Floating node points */}
        {stages.map((stageId, idx) => {
          const isSelected = stageId === currentStageId;
          const isPassed = idx <= activeIndex;

          return (
            <button
              key={stageId}
              onClick={() => onSelectStage(stageId)}
              className="relative z-10 w-4 h-4 rounded-full bg-black flex items-center justify-center cursor-pointer pointer-events-auto outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-black border-gold scale-125 shadow-[0_0_8px_#d6aa38]"
                    : isPassed
                    ? "bg-gold border-gold"
                    : "bg-black border-white/20"
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  }

  // SVG Horizontal Timeline
  const startX = 30;
  const endX = 470;
  const totalWidth = endX - startX;
  const stepWidth = totalWidth / (stages.length - 1);
  const currentX = startX + activeIndex * stepWidth;

  return (
    <div className="w-full h-16 max-w-5xl mx-auto flex items-center justify-center pointer-events-auto my-3 px-4">
      <svg viewBox="0 0 500 30" className="w-full h-full overflow-visible">
        {/* Base dim line */}
        <line
          x1={startX}
          y1="15"
          x2={endX}
          y2="15"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Filling Progress line */}
        <motion.line
          x1={startX}
          y1="15"
          x2={currentX}
          y2="15"
          stroke="#d6aa38"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ x2: currentX }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />

        {/* Moving energy pulse signal along line */}
        {!shouldReduce && (
          <motion.circle
            r="3"
            fill="#d6aa38"
            style={{ filter: "drop-shadow(0 0 3px #d6aa38)" }}
            animate={{
              cx: [startX, endX],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            cy="15"
          />
        )}

        {/* Anchors */}
        {stages.map((stageId, idx) => {
          const cx = startX + idx * stepWidth;
          const isSelected = stageId === currentStageId;
          const isPassed = idx <= activeIndex;

          return (
            <g 
              key={stageId} 
              className="cursor-pointer group"
              onClick={() => onSelectStage(stageId)}
            >
              {/* Invisible larger hit area */}
              <circle cx={cx} cy="15" r="12" fill="transparent" />

              {/* Anchor Glow */}
              {isSelected && (
                <circle
                  cx={cx}
                  cy="15"
                  r="6"
                  fill="none"
                  stroke="#d6aa38"
                  strokeWidth="1.5"
                  className="animate-ping"
                  opacity={0.4}
                />
              )}

              {/* Anchor Dot */}
              <circle
                cx={cx}
                cy="15"
                r={isSelected ? 4.5 : 3.5}
                fill={isPassed ? "#d6aa38" : "#020306"}
                stroke={isSelected ? "#d6aa38" : isPassed ? "#d6aa38" : "rgba(255, 255, 255, 0.25)"}
                strokeWidth={isSelected ? 1.5 : 1}
                className="transition-colors duration-300"
              />

              {/* Anchor Tooltip labels */}
              <text
                x={cx}
                y="27"
                fill={isSelected ? "#d6aa38" : "rgba(255, 255, 255, 0.3)"}
                fontSize="6"
                fontFamily="monospace"
                textAnchor="middle"
                className="font-bold tracking-widest transition-colors duration-300"
              >
                {(stageId === "compound" ? "COMPOUND" : stageId.toUpperCase())}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
