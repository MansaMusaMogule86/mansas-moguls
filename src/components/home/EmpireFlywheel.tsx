"use client";

import { CompoundingEngine } from "@/components/empire/compounding/CompoundingEngine";

/**
 * The Empire Flywheel renders the real interactive Continuous Compounding Engine.
 */
export function EmpireFlywheel() {
  return (
    <div id="flywheel" className="w-full">
      <CompoundingEngine />
    </div>
  );
}
