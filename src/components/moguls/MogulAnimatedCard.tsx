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
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{ width: '30%', top: `${30 + i * 20}%`, left: '-10%' }}
          animate={{ x: [0, 200, -10] }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  ),
  'neural-network': (color: string) => (
    <div className="absolute inset-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.sin(i) * 20}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),
  'cascading-coins': (color: string) => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${color}, rgba(200, 169, 110, 0.5))`,
            left: `${25 + i * 15}%`,
            top: '-10px',
          }}
          animate={{ y: [0, 160] }}
          transition={{
            duration: 2,
            delay: i * 0.25,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),
  'upward-curve': (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
      <motion.path
        d="M 20 160 Q 60 80 100 40 T 180 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </svg>
  ),
  'film-strip': (color: string) => (
    <div className="absolute inset-0 flex items-center gap-1 px-2">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-6 h-8 border-2 border-pink-400 rounded"
          animate={{ x: [0, -24, -48, 0] }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),
  'rocket-trail': (color: string) => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-orange-400"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            y: [-100, 20],
            x: -i * 3,
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),
  'spark-radiation': (color: string) => (
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 60,
            y: Math.sin((i / 8) * Math.PI * 2) * 60,
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  ),
  'page-flip': (color: string) => (
    <div className="absolute inset-0 flex items-center justify-center gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-6 border border-white border-opacity-40 rounded"
          animate={{ rotateY: [0, 180, 0] }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
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
        stiffness: 320,
        damping: 32,
        delay: index * 0.04,
      }}
      className="w-full"
    >
      <motion.div
        onClick={onToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative w-full ${heightClass} rounded-lg cursor-pointer overflow-hidden transition-colors duration-300`}
        style={{
          backgroundColor: '#0a0a0a',
          borderWidth: '1px',
          borderColor: isExpanded || isHovered ? mogul.accent : '#333333',
        }}
        animate={{
          boxShadow: isExpanded || isHovered 
            ? `0 0 30px ${mogul.accent}40, inset 0 0 20px ${mogul.accent}20`
            : '0 0 0px transparent',
        }}
        transition={{
          boxShadow: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
          borderColor: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
        }}
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            opacity: isExpanded || isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.2 }}
        >
          {animationComponents[mogul.animation]?.(mogul.accent)}
        </motion.div>

        {/* Closed/Hover State Content */}
        <AnimatePresence mode="wait">
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6"
            >
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="text-5xl"
              >
                {mogul.icon}
              </motion.div>

              <div className="text-center">
                <motion.h3
                  className={`${sizes.title} font-bold text-white`}
                  style={{ fontFamily: 'Cormorant Garamond' }}
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
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${sizes.desc} text-gray-300 text-center max-w-xs`}
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
              className="absolute inset-0 p-6 flex flex-col gap-4 overflow-y-auto"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
              >
                <X size={20} className="text-white" />
              </motion.button>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.2 }}
                className={`${sizes.title} font-bold text-white mt-2`}
                style={{ fontFamily: 'Cormorant Garamond' }}
              >
                {mogul.title}
              </motion.h2>

              {/* Category Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.2 }}
                className={`${sizes.category} font-semibold`}
                style={{ color: mogul.accent }}
              >
                {mogul.icon} {mogul.title}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.2 }}
                className={`${sizes.desc} text-gray-300`}
              >
                {mogul.description}
              </motion.p>

              {/* Full Details */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.2 }}
                className={`text-xs text-gray-400 leading-relaxed`}
                style={{ fontFamily: 'DM Sans' }}
              >
                {mogul.fullDetail}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
