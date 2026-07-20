import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-[#131925]">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <TopBar />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
