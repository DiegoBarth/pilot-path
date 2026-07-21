"use client";

import { useMemo } from "react";
import { DashboardHero } from "@/features/dashboard/components/DashboardHero";
import { AccuracyStrip } from "@/features/dashboard/components/AccuracyStrip";
import { ActivityTimeline } from "@/features/dashboard/components/ActivityTimeline";
import { DashboardEnrollments } from "@/features/dashboard/components/DashboardEnrollments";
import { WeakSubjectsPanel } from "@/features/dashboard/components/WeakSubjectsPanel";
import { useAuthContext } from "@/providers/auth-provider";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { formatRelativeDate } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { statistics, subjects, enrollments, recentActivity } = useDashboard();

  const enrollmentList = enrollments.data ?? [];
  const sessions = recentActivity.data?.data ?? [];

  const lastSession = sessions[0];

  const enrollmentForLastSession = useMemo(() => {
    if (!lastSession) {
      return undefined;
    }

    return enrollmentList.find(
      (enrollment) =>
        enrollment.certificationId === lastSession.certification.id,
    );
  }, [lastSession, enrollmentList]);

  const activeEnrollmentsCount = enrollmentList.filter((enrollment) =>
    ["ACTIVE", "COMPLETED"].includes(enrollment.status),
  ).length;

  const activities = sessions.map((session) => ({
    id: session.id,
    type: session.studyType,
    title: session.subject.name,
    description: session.certification.name,
    date: formatRelativeDate(session.startedAt),
    href: `/study/subject/${session.subject.id}?certificationId=${session.certification.id}`,
  }));

  if (
    statistics.isLoading ||
    subjects.isLoading ||
    enrollments.isLoading ||
    recentActivity.isLoading
  ) {
    return (
      <div className="p-8 text-slate-400">
        Carregando dashboard...
      </div>
    );
  }

  const userName = user?.name ?? "Piloto";

  return (
    <div className="flex flex-col gap-6 px-6 pb-8 pt-2 md:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
          Olá, {userName}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Acompanhe seu progresso e retome seus estudos.
        </p>
      </div>

      <DashboardHero
        lastSession={lastSession}
        activeEnrollmentsCount={activeEnrollmentsCount}
        totalSessions={recentActivity.data?.meta.total ?? sessions.length}
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
    </div>
  );
}
