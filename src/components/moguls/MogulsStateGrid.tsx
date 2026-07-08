'use client';

import React, { useState, useEffect } from 'react';
import { MogulAnimatedCard } from './MogulAnimatedCard';

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

const MOGULS_DATA: MogulData[] = [
  {
    id: 'intelligence',
    title: 'STRATEGY',
    accent: '#3B82F6',
    icon: '⚡',
    animation: 'data-flow',
    description: 'Market intelligence, research, and strategic foresight for the empire.',
    fullDetail:
      'Autonomous market research systems, competitive analysis engines, and strategic decision frameworks that power acquisition and positioning.',
    typeScale: 'xl',
    slug: 'intelligence',
    metrics: [
      { label: 'Market Models', value: '128+' },
      { label: 'Accuracy Rate', value: '94.7%' },
    ],
  },
  {
    id: 'ai',
    title: 'TECHNOLOGY',
    accent: '#06B6D4',
    icon: '🧠',
    animation: 'neural-network',
    description: 'Autonomous agents, automation, and applied AI systems at scale.',
    fullDetail:
      'LLM-powered workflows, n8n orchestration, multi-channel automation, and AI systems that compound operational efficiency across the empire.',
    typeScale: 'lg',
    slug: 'ai',
    metrics: [
      { label: 'Agents Deployed', value: '1,248' },
      { label: 'Automation Links', value: '342' },
    ],
  },
  {
    id: 'capital',
    title: 'CAPITAL',
    accent: '#C8A96E',
    icon: '💰',
    animation: 'cascading-coins',
    description: 'Capital allocation, acquisitions, and compounding ownership.',
    fullDetail:
      'Strategic capital deployment, portfolio management, M&A execution, and wealth compounding mechanisms that build empire valuation.',
    typeScale: 'lg',
    slug: 'capital',
    metrics: [
      { label: 'Total AUM', value: '$1.2B' },
      { label: 'Portfolio Cos', value: '18' },
    ],
  },
  {
    id: 'growth',
    title: 'GROWTH',
    accent: '#22C55E',
    icon: '📈',
    animation: 'upward-curve',
    description: 'Distribution, performance systems, and revenue acceleration.',
    fullDetail:
      'Sales infrastructure, go-to-market execution, performance metrics, and revenue growth engines that scale from 0 to million ARR.',
    typeScale: 'md',
    slug: 'growth',
    metrics: [
      { label: 'Total ARR', value: '$24.6M' },
      { label: 'Growth Rate', value: '+156%' },
    ],
  },
  {
    id: 'studio',
    title: 'CREATIVE',
    accent: '#EC4899',
    icon: '🎬',
    animation: 'film-strip',
    description: 'Creative production, brand, and cinematic content at empire scale.',
    fullDetail:
      'High-end video production, brand storytelling, cinematic assets, and content that positions the empire as category authority.',
    typeScale: 'md',
    slug: 'studio',
    metrics: [
      { label: 'Content Created', value: '1.2B' },
      { label: 'Engagement Rate', value: '12.6%' },
    ],
  },
  {
    id: 'venture',
    title: 'BUILDING',
    accent: '#F97316',
    icon: '🚀',
    animation: 'rocket-trail',
    description: 'Building and launching new ventures from idea to revenue.',
    fullDetail:
      'Product development, platform launches, go-to-market strategy, and venture execution that builds standalone businesses within the empire.',
    typeScale: 'sm',
    slug: 'venture',
    metrics: [
      { label: 'Ventures Launched', value: '24' },
      { label: 'Active Ventures', value: '12' },
    ],
  },
  {
    id: 'innovation',
    title: 'R&D',
    accent: '#A855F7',
    icon: '⚙️',
    animation: 'spark-radiation',
    description: 'R&D, emerging technology, and the next frontier of the empire.',
    fullDetail:
      'Experimental systems, emerging tech integration, future-facing infrastructure, and innovation that positions the empire ahead of market.',
    typeScale: 'sm',
    slug: 'innovation',
    metrics: [
      { label: 'Active Projects', value: '37' },
      { label: 'Beta Trials', value: '14' },
    ],
  },
  {
    id: 'knowledge',
    title: 'KNOWLEDGE',
    accent: '#E5E7EB',
    icon: '📚',
    animation: 'page-flip',
    description: 'Playbooks, systems, and the compounding knowledge base of the empire.',
    fullDetail:
      'Documentation, process frameworks, IP libraries, and the foundational knowledge systems that compound every decision across empire.',
    typeScale: 'xs',
    slug: 'knowledge',
    metrics: [
      { label: 'Playbooks', value: '128' },
      { label: 'Impact Score', value: '9.8/10' },
    ],
  },
];

export const MogulsStateGrid: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedId) {
        setExpandedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedId]);

  const handleCardToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCardClose = () => {
    setExpandedId(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'Cormorant Garamond' }}
        >
          The Empire&apos;s Eight Moguls
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Strategic divisions that compound intelligence, automation, capital, growth, creativity,
          innovation, building, and knowledge. Click to explore each division.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOGULS_DATA.map((mogul, index) => (
          <MogulAnimatedCard
            key={mogul.id}
            mogul={mogul}
            index={index}
            isExpanded={expandedId === mogul.id}
            onToggle={() => handleCardToggle(mogul.id)}
            onClose={handleCardClose}
          />
        ))}
      </div>

      {/* Instruction text */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Click any card to expand • Press Esc to close</p>
      </div>
    </div>
  );
};
