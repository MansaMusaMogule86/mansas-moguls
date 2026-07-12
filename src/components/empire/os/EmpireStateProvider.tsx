"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ViewState = "dashboard" | "environment" | "war-room" | "decision";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  upside: string;
  risk: string;
  capital: string;
}

interface EmpireStateContextProps {
  activeMogulId: string | null;
  setActiveMogulId: (id: string | null) => void;
  viewState: ViewState;
  setViewState: (view: ViewState) => void;
  activeOpportunity: Opportunity | null;
  setActiveOpportunity: (opp: Opportunity | null) => void;
  detailDrawerOpen: boolean;
  setDetailDrawerOpen: (open: boolean) => void;
  selectedDivisionId: string | null;
  setSelectedDivisionId: (id: string | null) => void;
}

const EmpireStateContext = createContext<EmpireStateContextProps | undefined>(undefined);

export function EmpireStateProvider({ children }: { children: ReactNode }) {
  const [activeMogulId, setActiveMogulId] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("dashboard");
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState<boolean>(false);
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);

  return (
    <EmpireStateContext.Provider
      value={{
        activeMogulId,
        setActiveMogulId,
        viewState,
        setViewState,
        activeOpportunity,
        setActiveOpportunity,
        detailDrawerOpen,
        setDetailDrawerOpen,
        selectedDivisionId,
        setSelectedDivisionId,
      }}
    >
      {children}
    </EmpireStateContext.Provider>
  );
}

export function useEmpireState() {
  const context = useContext(EmpireStateContext);
  if (!context) {
    throw new Error("useEmpireState must be used within an EmpireStateProvider");
  }
  return context;
}
