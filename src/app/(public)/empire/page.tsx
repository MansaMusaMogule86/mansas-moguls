import type { Metadata } from "next";
import { EmpireDashboard } from "@/components/empire/dashboard/EmpireDashboard";

export const metadata: Metadata = {
  title: "Empire Dashboard | Mansas Moguls",
  description: "The Mansas Moguls Operating System.",
};

export default function EmpirePage() {
  return <EmpireDashboard />;
}
