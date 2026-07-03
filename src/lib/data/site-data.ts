/**
 * Misc static data for careers and events pages (no database yet).
 */

export type Role = {
  id: string;
  title: string;
  mogul: string;
  location: string;
  type: "Full-time" | "Contract" | "Fellowship";
};

export const roles: Role[] = [
  {
    id: "role_ai_eng",
    title: "Founding AI Engineer",
    mogul: "AI Mogul",
    location: "Dubai / Remote",
    type: "Full-time",
  },
  {
    id: "role_growth",
    title: "Head of Growth",
    mogul: "Growth Mogul",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "role_analyst",
    title: "Intelligence Analyst",
    mogul: "Intelligence Mogul",
    location: "Dubai",
    type: "Full-time",
  },
  {
    id: "role_producer",
    title: "Creative Producer",
    mogul: "Studio Mogul",
    location: "Dubai / Remote",
    type: "Contract",
  },
  {
    id: "role_venture",
    title: "Venture Builder in Residence",
    mogul: "Venture Mogul",
    location: "Remote",
    type: "Fellowship",
  },
];

export type EmpireEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  format: "Summit" | "Webinar" | "Roundtable" | "Appearance";
};

export const events: EmpireEvent[] = [
  {
    id: "evt_summit",
    title: "The AI Empire Summit",
    date: "2026-09-24",
    location: "Dubai, UAE",
    format: "Summit",
  },
  {
    id: "evt_webinar",
    title: "Building an AI Holding Company",
    date: "2026-08-12",
    location: "Online",
    format: "Webinar",
  },
  {
    id: "evt_roundtable",
    title: "Capital & Compounding Roundtable",
    date: "2026-07-30",
    location: "Abu Dhabi, UAE",
    format: "Roundtable",
  },
];
