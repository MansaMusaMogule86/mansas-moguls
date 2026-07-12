"use client";

import { useState } from "react";
import { moguls, mogulIcons } from "@/lib/data/moguls";
import { DivisionTab } from "./DivisionTab";

export function DivisionNavigator({
  activeMogulId,
  onSelect,
}: {
  activeMogulId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 mb-12">
      <div className="flex flex-col gap-6">
        {/* Tab List */}
        <div 
          role="tablist" 
          aria-label="Traverse the Divisions"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2"
        >
          {moguls.map((mogul) => {
            const isActive = mogul.id === activeMogulId;
            return (
              <DivisionTab 
                key={mogul.id}
                mogul={mogul}
                isActive={isActive}
                onClick={() => onSelect(mogul.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
