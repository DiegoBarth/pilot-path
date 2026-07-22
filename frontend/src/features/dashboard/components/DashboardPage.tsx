"use client";

import { useAuthContext } from "@/providers/auth-provider";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { PageLoading } from "@/components/shared/PageLoading";
import { DashboardHero } from "./DashboardHero";
import { AccuracyStrip } from "./AccuracyStrip";
import { ActivityTimeline } from "./ActivityTimeline";
import { DashboardEnrollments } from "./DashboardEnrollments";
import { WeakSubjectsPanel } from "./WeakSubjectsPanel";
import { useDashboard } from "../hooks/useDashboard";

export function DashboardPage() {
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
      <PageHeader
        title={`Olá, ${user?.name ?? "Piloto"}`}
        description="Acompanhe seu progresso e retome seus estudos."
      />

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
