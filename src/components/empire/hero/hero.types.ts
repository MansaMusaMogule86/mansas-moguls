export type PanelId = "mission" | "status" | "pillars" | "portfolio";

export interface SatellitePanelProps {
  id: PanelId;
  title: string;
  accent: string;
  position: { top?: string; left?: string; bottom?: string; right?: string };
  status?: string;
  metrics?: { label: string; value: string }[];
  items?: string[];
  description?: string;
  onClick: (id: PanelId) => void;
  active: boolean;
  onHover?: (id: PanelId | null) => void;
}

export interface Metric {
  label: string;
  value: string;
}
