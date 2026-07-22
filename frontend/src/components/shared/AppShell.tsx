"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";
import { BreadcrumbProvider } from "@/components/shared/breadcrumb";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <BreadcrumbProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <TopBar />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}
