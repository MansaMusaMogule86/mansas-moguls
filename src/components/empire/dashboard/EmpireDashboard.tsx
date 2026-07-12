"use client";

import { EmpireHeader } from "./EmpireHeader";
import { EmpireFooterRail } from "./EmpireFooterRail";
import { MogulModule } from "./MogulModule";
import { ComingNextModule } from "./ComingNextModule";
import { dashboardDivisions } from "@/lib/data/dashboardData";
import { EmpireStateProvider, useEmpireState } from "../os/EmpireStateProvider";
import { ActiveEnvironment } from "../os/ActiveEnvironment";
import { AnimatePresence, motion } from "framer-motion";
import { DetailDrawer } from "@/components/empire-hud/DetailDrawer";

function EmpireOSContent() {
  const {
    viewState,
    detailDrawerOpen,
    setDetailDrawerOpen,
    selectedDivisionId,
  } = useEmpireState();

  return (
    <div className="relative min-h-screen w-full bg-[#03050A] flex flex-col font-sans overflow-hidden">
      {/* Background glow behind dashboard */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(214,170,56,0.03)_0%,_transparent_100%)] pointer-events-none" />

      {/* Structured Dashboard Frame */}
      <div className="relative flex-1 flex flex-col w-full max-w-[2000px] mx-auto min-h-screen p-4 md:p-8 z-10">
        
        {/* Main Interface Border Frame */}
        <div className="relative flex-1 flex flex-col w-full border border-white/5 bg-[#05070B] rounded-[1px] shadow-2xl overflow-hidden">
          
          <EmpireHeader />

          {/* Grid Area */}
          <main className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {viewState === "dashboard" ? (
                <motion.div 
                  key="dashboard-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="absolute inset-0 overflow-y-auto no-scrollbar p-6"
                >
                  <div className="grid grid-cols-12 gap-5 auto-rows-max">
                    {dashboardDivisions.slice(0, 3).map((division) => (
                      <MogulModule key={division.id} data={division} />
                    ))}
                    {dashboardDivisions.slice(3, 7).map((division) => (
                      <MogulModule key={division.id} data={division} />
                    ))}
                    <MogulModule data={dashboardDivisions[7]} />
                    <ComingNextModule />
                  </div>
                </motion.div>
              ) : (
                <ActiveEnvironment key="active-environment" />
              )}
            </AnimatePresence>
          </main>

          <EmpireFooterRail />

        </div>
      </div>

      {/* Telemetry Detail Drawer */}
      <DetailDrawer
        isOpen={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        divisionId={selectedDivisionId}
      />
    </div>
  );
}

export function EmpireDashboard() {
  return (
    <EmpireStateProvider>
      <EmpireOSContent />
    </EmpireStateProvider>
  );
}
