"use client";

import { BookOpen, CalendarClock } from "lucide-react";

import { OverallProgressCard } from "@/features/dashboard/components/OverallProgressCard";
import { QuickAccessGrid } from "@/features/dashboard/components/QuickAccessGrid";
import { ProgressSummaryCard } from "@/features/dashboard/components/ProgressSummaryCard";
import { ActivityTimeline } from "@/features/dashboard/components/ActivityTimeline";
import { WeakSubjectsPanel } from "@/features/dashboard/components/WeakSubjectsPanel";
import { QuickAccessPanel } from "@/components/shared/QuickAccessPanel";
import { useAuthContext } from "@/providers/auth-provider";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { formatRelativeDate } from "@/lib/utils";

const ENROLLMENT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Em Andamento",
  COMPLETED: "Concluído",
  PAUSED: "Pausado",
  DROPPED: "Abandonado",
};

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { statistics, subjects, enrollments, recentActivity } = useDashboard();

  if (statistics.isLoading || subjects.isLoading || enrollments.isLoading || recentActivity.isLoading) {
    return (
      <div className="p-8 text-slate-400">
        Carregando dashboard...
      </div>
    );
  }

  const data = statistics.data;

  const userName = user?.name ?? "Piloto";

  const activeEnrollments = (enrollments.data ?? []).slice(0, 3);

  const activities = (recentActivity.data?.data ?? []).map((session) => ({
    id: session.id,
    type: session.studyType,
    title: session.subject.name,
    description: session.certification.name,
    date: formatRelativeDate(session.startedAt),
  }));

  const overallProgress =
    ((data?.flashcardAccuracy ?? 0) + (data?.questionAccuracy ?? 0) + (data?.mockExamPerformance ?? 0)) / 3;

  return (
    <div className="flex flex-col gap-8 px-6 pb-6 pt-2 md:px-8 md:pb-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-50">
          Resumo do Cockpit, {userName}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Acompanhe seu progresso e retome seus estudos.
        </p>
      </div>

      {/* Hero: Progresso geral, ações rápidas e acesso rápido */}
      <div className="grid gap-6 lg:grid-cols-3">
        <OverallProgressCard percent={overallProgress} />

        <QuickAccessGrid />

        <QuickAccessPanel
          stats={[
            { icon: BookOpen, value: activeEnrollments.length, label: "Certificações" },
            { icon: CalendarClock, value: recentActivity.data?.meta.total ?? 0, label: "Sessões" },
          ]}
        />
      </div>

      {/* Precisão por área */}
      <ProgressSummaryCard data={data} />

      {/* Linha do tempo e insights */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <ActivityTimeline activities={activities} />
        </div>

        <div className="flex flex-col gap-6">

          <div className="flex flex-col rounded-2xl border border-white/5 bg-[#1E2834]">
            <div className="border-b border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">Minhas Certificações</h2>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 p-6">
              {activeEnrollments.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Você ainda não está inscrito em nenhuma certificação.
                </p>
              ) : (
                activeEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-200">
                      {enrollment.certification.name}
                    </span>
                    <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-400">
                      {ENROLLMENT_STATUS_LABELS[enrollment.status] ?? enrollment.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <WeakSubjectsPanel weakSubjects={subjects.data?.weakSubjects ?? []} />

        </div>

      </div>
    </div>
  );
}
