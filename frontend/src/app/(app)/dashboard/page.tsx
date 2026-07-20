"use client";

import { ProgressSummaryCard } from "@/features/dashboard/components/ProgressSummaryCard";
import { QuickAccessGrid } from "@/features/dashboard/components/QuickAccessGrid";
import { ActivityTimeline } from "@/features/dashboard/components/ActivityTimeline";
import { useAuthContext } from "@/providers/auth-provider";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { statistics, subjects } = useDashboard();

  if (statistics.isLoading || subjects.isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-slate-400">
        Carregando dashboard...
      </div>
    );
  }

  const data = statistics.data;

  const userName = user?.name ?? "Piloto";

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 p-6 md:p-8">
      {/* Header & Quick Actions */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">
            Olá, {userName}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Acompanhe seu progresso e retome seus estudos.
          </p>
        </div>
        <QuickAccessGrid />
      </div>

      {/* Analytics Summary Component */}
      <ProgressSummaryCard data={data} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">

        {/* Certifications Overview (mantido inline ou extraível para a feature de certificações futuramente) */}
        <div className="col-span-1 flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 lg:col-span-4">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-50">Minhas Certificações</h2>
          </div>
          <div className="flex flex-1 flex-col justify-center p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">Piloto Privado - Avião (PPA)</span>
                <span className="text-slate-400">65%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full bg-amber-500" style={{ width: "65%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">Piloto Comercial (PCA)</span>
                <span className="text-slate-400">12%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full bg-amber-500" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline Component */}
        <ActivityTimeline
          activities={[
            {
              id: "1",
              type: "FLASHCARD",
              title: "Revisão de Flashcards",
              description: "Regulamentos de Tráfego Aéreo",
              date: "Há 2 horas"
            },
            {
              id: "2",
              type: "MOCK_EXAM",
              title: "Simulado Finalizado",
              description: "Meteorologia (Aprovado: 85%)",
              date: "Ontem"
            }
          ]}
        />

      </div>
    </div>
  );
}