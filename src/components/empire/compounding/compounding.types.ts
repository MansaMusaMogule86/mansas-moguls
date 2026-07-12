export type StageId = "capture" | "analyze" | "compound" | "multiply" | "dominate";

export interface CompoundingStageData {
  id: StageId;
  number: string;
  name: string;
  purpose: string;
  metrics: { label: string; value: string }[];
  description: string;
  status: "idle" | "hovered" | "selected" | "active" | "completed" | "warning" | "disabled";
  liveMetric: string;
  aiRecommendation: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
}
