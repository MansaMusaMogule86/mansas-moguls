"use client";

import { useState } from "react";
import { moguls } from "@/lib/data/moguls";
import { DivisionNavigator } from "./DivisionNavigator";
import { ActiveDivisionStage } from "./ActiveDivisionStage";

export function MogulNavigationSystem() {
  const [activeMogulId, setActiveMogulId] = useState(moguls[0].id);

  const activeMogul = moguls.find((m) => m.id === activeMogulId) || moguls[0];

  return (
    <div className="w-full min-h-screen bg-[#03040a] flex flex-col pt-12 pb-24">
      {/* Navigation Rail */}
      <DivisionNavigator 
        activeMogulId={activeMogulId} 
        onSelect={setActiveMogulId} 
      />

      {/* Active Stage */}
      <ActiveDivisionStage 
        mogul={activeMogul} 
        onSelectNext={(nextId) => setActiveMogulId(nextId)}
        onSelectPrev={(prevId) => setActiveMogulId(prevId)}
      />
    </div>
  );
}
