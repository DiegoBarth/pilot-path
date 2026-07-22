"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { filterActiveEnrollments } from "@/features/enrollments/lib/utils";
import { formatRelativeDate } from "@/lib/utils";
import { queryKeys } from "@/lib/query-keys";
import { buildStudyActivityHref } from "@/features/study/lib/activity-href";
import { getEnrollments } from "@/features/enrollments/api/enrollments.api";
import {
  getLearningStatistics,
  getSubjectAnalytics,
  getRecentStudyHistory,
} from "../api/dashboard.api";

export function useDashboard() {
  const statistics = useQuery({
    queryKey: queryKeys.learningStatistics(),
    queryFn: getLearningStatistics,
  });

  const subjects = useQuery({
    queryKey: queryKeys.subjectAnalytics(),
    queryFn: getSubjectAnalytics,
  });

  const enrollments = useQuery({
    queryKey: queryKeys.enrollments(),
    queryFn: getEnrollments,
  });

  const recentActivity = useQuery({
    queryKey: queryKeys.recentStudyHistory(6),
    queryFn: () => getRecentStudyHistory(6),
  });

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

  const activeEnrollmentsCount = useMemo(
    () => filterActiveEnrollments(enrollmentList).length,
    [enrollmentList],
  );

  const activities = useMemo(
    () =>
      sessions.map((session) => ({
        id: session.id,
        type: session.studyType,
        title: session.subject.name,
        description: session.certification.name,
        date: formatRelativeDate(session.startedAt),
        href: buildStudyActivityHref({
          studyType: session.studyType,
          subjectId: session.subject.id,
          certificationId: session.certification.id,
        }),
      })),
    [sessions],
  );

  return {
    statistics,
    subjects,
    enrollments,
    recentActivity,
    enrollmentList,
    lastSession,
    enrollmentForLastSession,
    activeEnrollmentsCount,
    activities,
    totalSessions: recentActivity.data?.meta.total ?? sessions.length,
  };
}
