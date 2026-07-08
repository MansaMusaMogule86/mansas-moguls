'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MogulData {
  id: string;
  title: string;
  accent: string;
  icon: string;
  animation: string;
  description: string;
  fullDetail: string;
  typeScale: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  slug: string;
  metrics?: { label: string; value: string }[];
}

interface MogulAnimatedCardProps {
  mogul: MogulData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const animationComponents: Record<string, (color: string) => React.ReactNode> = {
  'data-flow': (color: string) => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Horizontal flowing lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            width: '40%',
            top: `${20 + i * 18}%`,
            left: '-20%',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
          animate={{ x: [0, 280, -280] }}
          transition={{
            duration: 4,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
      ))}
      {/* Decorative nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${15 + i * 13}%`,
            top: '50%',
            background: color,
            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}60`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),

  'neural-network': (color: string) => (
    <div className="absolute inset-0">
      {/* Network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-50" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${15 + i * 18}%`}
            y1="30%"
            x2={`${15 + ((i + 1) % 5) * 18}%`}
            y2="70%"
            stroke={color}
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
      </svg>
      {/* Pulsing nodes */}
      {[...Array(7)].map((_, i) => {
        const x = 20 + (i % 3) * 30;
        const y = 25 + Math.floor(i / 3) * 25;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: color,
              boxShadow: `0 0 16px ${color}, inset 0 0 8px ${color}`,
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  ),

  'cascading-coins': (color: string) => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            left: `${18 + i * 14}%`,
            top: '-20px',
            background: `radial-gradient(circle at 30% 30%, ${color}, ${color}80)`,
            boxShadow: `0 0 12px ${color}, inset -2px -2px 4px rgba(0,0,0,0.5)`,
          }}
          animate={{
            y: [0, 200],
            opacity: [1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.25,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  ),

  'upward-curve': (color: string) => (
    <div className="absolute inset-0">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(90deg, ${color}20 1px, transparent 1px), linear-gradient(${color}20 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />
      {/* Animated curve */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <motion.path
          d="M 10 180 Q 50 100 100 40 T 190 20"
          stroke={`url(#grad-${color})`}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          filter={`drop-shadow(0 0 6px ${color})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  ),

  'film-strip': (color: string) => (
    <div className="absolute inset-0 flex items-center justify-center gap-2 px-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-6 h-8 border-2 rounded"
          style={{
            borderColor: color,
            boxShadow: `0 0 8px ${color}60, inset 0 0 4px ${color}40`,
          }}
          animate={{ x: [0, -24, -48, -72, 0] }}
          transition={{
            duration: 2.5,
            delay: i * 0.12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Film perforations */}
          <div className="h-full flex flex-col justify-between py-1 px-0.5">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="w-full h-0.5 rounded-px" style={{ backgroundColor: color, opacity: 0.6 }} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  ),

  'rocket-trail': (color: string) => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main rocket flame */}
      <motion.div
        className="absolute w-2 h-3 rounded-full"
        style={{
          left: '50%',
          top: '60%',
          background: color,
          boxShadow: `0 0 16px ${color}, 0 0 32px ${color}80`,
          filter: `blur(0.5px)`,
        }}
        animate={{
          y: [-150, 40],
          x: [0, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
      {/* Trail particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: '50%',
            top: '60%',
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
          animate={{
            y: [-100 + i * 12, 60],
            x: Math.cos((i / 8) * Math.PI * 2) * 20,
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),

  'spark-radiation': (color: string) => (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Central glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}60, transparent)`,
          boxShadow: `0 0 24px ${color}, 0 0 48px ${color}40`,
        }}
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      {/* Radiating sparks */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: color,
            boxShadow: `0 0 12px ${color}`,
          }}
          animate={{
            x: Math.cos((i / 12) * Math.PI * 2) * 80,
            y: Math.sin((i / 12) * Math.PI * 2) * 80,
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  ),

  'page-flip': (color: string) => (
    <div className="absolute inset-0 flex items-center justify-center gap-2">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-5 h-7 border-2 rounded"
          style={{
            borderColor: color,
            boxShadow: `0 0 10px ${color}60, inset 0 0 4px ${color}30`,
          }}
          animate={{
            rotateY: [0, 180, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 1.8,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  ),
};

const typeScaleClasses = {
  xl: 'h-96',
  lg: 'h-80',
  md: 'h-72',
  sm: 'h-64',
  xs: 'h-56',
};

const typeSizeClasses = {
  xl: { title: 'text-3xl', category: 'text-base', desc: 'text-sm' },
  lg: { title: 'text-2xl', category: 'text-sm', desc: 'text-xs' },
  md: { title: 'text-xl', category: 'text-sm', desc: 'text-xs' },
  sm: { title: 'text-lg', category: 'text-xs', desc: 'text-xs' },
  xs: { title: 'text-base', category: 'text-xs', desc: 'text-xs' },
};

export const MogulAnimatedCard: React.FC<MogulAnimatedCardProps> = ({
  mogul,
  index,
  isExpanded,
  onToggle,
  onClose,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const sizes = typeSizeClasses[mogul.typeScale];
  const heightClass = typeScaleClasses[mogul.typeScale];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: index * 0.04,
      }}
      className="w-full h-full"
    >
      <motion.div
        onClick={onToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative w-full ${heightClass} rounded-xl cursor-pointer overflow-hidden group`}
        style={{
          backgroundColor: '#0a0a0a',
        }}
        animate={{
          borderColor: isExpanded || isHovered ? mogul.accent : '#2a2a2a',
        }}
        transition={{
          borderColor: { duration: 0.3, ease: 'easeOut' },
        }}
      >
        {/* Outer glow container */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: isExpanded || isHovered 
              ? `inset 0 0 30px ${mogul.accent}20, 0 0 40px ${mogul.accent}40, 0 0 60px ${mogul.accent}20`
              : `inset 0 0 0px transparent, 0 0 0px transparent`,
          }}
          transition={{
            boxShadow: { duration: 0.3, ease: 'easeOut' },
          }}
        />

        {/* Border gradient */}
        <div 
          className="absolute inset-0 rounded-xl p-px pointer-events-none"
          style={{
            background: isExpanded || isHovered 
              ? `linear-gradient(135deg, ${mogul.accent}40, ${mogul.accent}10, transparent)`
              : 'linear-gradient(135deg, #333333, #1a1a1a)',
          }}
        >
          <div className="absolute inset-0 rounded-xl" style={{ backgroundColor: '#0a0a0a' }} />
        </div>

        {/* Thin border line */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: `1px solid ${isExpanded || isHovered ? mogul.accent : '#2a2a2a'}40`,
            transition: 'border-color 0.3s ease-out',
          }}
        />

        {/* Background animation container */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl opacity-30"
          animate={{
            opacity: isExpanded || isHovered ? 0.5 : 0.15,
          }}
          transition={{ duration: 0.3 }}
        >
          {animationComponents[mogul.animation]?.(mogul.accent)}
        </motion.div>

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isHovered ? '30%' : '50%'} ${isHovered ? '20%' : '50%'}, ${mogul.accent}10, transparent 70%)`,
          }}
        />

        {/* Closed/Hover State Content */}
        <AnimatePresence mode="wait">
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 z-10"
            >
              {/* Icon */}
              <motion.div
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="text-6xl drop-shadow-lg"
                style={{
                  textShadow: isHovered ? `0 0 20px ${mogul.accent}60` : 'none',
                }}
              >
                {mogul.icon}
              </motion.div>

              {/* Title */}
              <div className="text-center">
                <motion.h3
                  className={`${sizes.title} font-bold text-white tracking-wide`}
                  style={{ 
                    fontFamily: 'Cormorant Garamond',
                    textShadow: isHovered ? `0 0 16px ${mogul.accent}40` : 'none',
                  }}
                >
                  {mogul.title}
                </motion.h3>
              </div>

              {/* Description slide-in on hover */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 20,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${sizes.desc} text-gray-300 text-center max-w-xs leading-relaxed`}
              >
                {mogul.description}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded State Content */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-6 flex flex-col gap-4 overflow-y-auto z-20"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
                style={{
                  boxShadow: `0 0 12px ${mogul.accent}30`,
                }}
              >
                <X size={20} className="text-white" style={{ color: mogul.accent }} />
              </motion.button>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.25 }}
                className={`${sizes.title} font-bold text-white mt-4`}
                style={{ fontFamily: 'Cormorant Garamond' }}
              >
                {mogul.title}
              </motion.h2>

              {/* Category Label with accent */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.25 }}
                className={`${sizes.category} font-semibold uppercase tracking-widest`}
                style={{
                  color: mogul.accent,
                  textShadow: `0 0 12px ${mogul.accent}40`,
                }}
              >
                {mogul.icon} {mogul.title}
              </motion.div>

              {/* Separator line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.16, duration: 0.3 }}
                className="h-px w-12"
                style={{
                  background: `linear-gradient(90deg, ${mogul.accent}, transparent)`,
                }}
              />

              {/* Short Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.25 }}
                className={`${sizes.desc} text-gray-300 leading-relaxed`}
              >
                {mogul.description}
              </motion.p>

              {/* Full Details */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                className={`text-xs text-gray-400 leading-relaxed`}
                style={{ fontFamily: 'DM Sans' }}
              >
                {mogul.fullDetail}
              </motion.p>

              {/* Metrics Grid (if available) */}
              {mogul.metrics && mogul.metrics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.25 }}
                  className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-700"
                >
                  {mogul.metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 + idx * 0.04, duration: 0.25 }}
                      className="pt-3"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: mogul.accent }}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
