import type { Metadata } from "next";
import { FileText, FileSpreadsheet, Presentation, Image as ImageIcon, File, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { files, type EmpireFile } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Files",
  robots: { index: false, follow: false },
};

const kindIcon: Record<EmpireFile["kind"], LucideIcon> = {
  doc: FileText,
  sheet: FileSpreadsheet,
  deck: Presentation,
  image: ImageIcon,
  pdf: File,
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function FilesPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Files"
        description="Documents and assets across the empire, stored securely per project."
        action={
          <Button className="bg-gold text-primary-foreground hover:bg-gold-bright">
            <Upload className="size-4" />
            Upload
          </Button>
        }
      />

      <div className="glass-panel overflow-hidden rounded-2xl">
        <div className="hidden grid-cols-[2.4fr_1.2fr_1fr_1fr] gap-4 border-b border-white/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground md:grid">
          <span>Name</span>
          <span>Project</span>
          <span>Size</span>
          <span>Updated</span>
        </div>
        <div className="divide-y divide-white/5">
          {files.map((file) => {
            const Icon = kindIcon[file.kind];
            return (
              <div
                key={file.id}
                className="grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-white/[0.02] md:grid-cols-[2.4fr_1.2fr_1fr_1fr] md:items-center md:gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </div>
                  <span className="truncate text-sm font-medium">{file.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{file.projectName}</span>
                <span className="text-sm text-muted-foreground">{file.size}</span>
                <span className="text-sm text-muted-foreground">{formatDate(file.updatedAt)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
