import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

/**
 * Private command-center shell — fixed sidebar (desktop), sheet nav (mobile),
 * sticky topbar, and the scrollable content area.
 *
 * NOTE: no auth in this sprint. Route protection lands with Supabase later.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
