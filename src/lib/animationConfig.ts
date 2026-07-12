/**
 * Shared motion configuration for the live command center.
 * Slow, deliberate, premium — no bounce, no playful springs.
 */

import type { Variants, Transition } from "framer-motion";

/** Signature empire easing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  panel: 0.7,
  glow: 4,
  counter: 1.6,
  feedInsert: 0.55,
  chartDraw: 1.8,
} as const;

export const STAGGER = 0.12;

/** Panel entrance: fade + rise + subtle scale + blur reduction, once. */
export const panelEntrance: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.panel, delay: i * STAGGER, ease: EASE },
  }),
};

/** New live-feed row insertion. */
export const feedRow: Variants = {
  hidden: { opacity: 0, y: -16, height: 0 },
  show: { opacity: 1, y: 0, height: "auto", transition: { duration: DURATION.feedInsert, ease: EASE } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Border-energy pulse fired when a panel receives new data. */
export const borderPulse: Transition = { duration: 1.1, ease: EASE };

/** Reduced-motion fallback: fade only, no movement/scale/blur. */
export const panelEntranceReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export function entranceVariants(reduced: boolean): Variants {
  return reduced ? panelEntranceReduced : panelEntrance;
}
