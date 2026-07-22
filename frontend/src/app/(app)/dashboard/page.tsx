"use client";

import { useAuthContext } from "@/providers/auth-provider";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageLoading } from "@/components/shared/PageLoading";
import { DashboardHero } from "@/features/dashboard/components/DashboardHero";
import { AccuracyStrip } from "@/features/dashboard/components/AccuracyStrip";
import { ActivityTimeline } from "@/features/dashboard/components/ActivityTimeline";
import { DashboardEnrollments } from "@/features/dashboard/components/DashboardEnrollments";
import { WeakSubjectsPanel } from "@/features/dashboard/components/WeakSubjectsPanel";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const {
    statistics,
    subjects,
    enrollments,
    recentActivity,
    enrollmentList,
    lastSession,
    enrollmentForLastSession,
    activeEnrollmentsCount,
    activities,
    totalSessions,
  } = useDashboard();

  if (
    statistics.isLoading ||
    subjects.isLoading ||
    enrollments.isLoading ||
    recentActivity.isLoading
  ) {
    return <PageLoading message="Carregando dashboard..." />;
  }

  return (
    <PageContainer variant="compact" className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
          Olá, {user?.name ?? "Piloto"}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Acompanhe seu progresso e retome seus estudos.
        </p>
      </div>

      <DashboardHero
        lastSession={lastSession}
        activeEnrollmentsCount={activeEnrollmentsCount}
        totalSessions={totalSessions}
        enrollmentForLastSession={enrollmentForLastSession}
      />

      <AccuracyStrip data={statistics.data} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityTimeline activities={activities} />

        <div className="flex flex-col gap-6">
          <DashboardEnrollments enrollments={enrollmentList} />
          <WeakSubjectsPanel weakSubjects={subjects.data?.weakSubjects ?? []} />
        </div>
      </div>
    </PageContainer>
  );
}
