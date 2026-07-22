"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSessionDurationMinutes } from "@/lib/study-utils";
import { getSubjects, getSubjectStudyHistory } from "../api/study.api";

export function useSubjectStudy({
  subjectId,
  certificationId,
}: {
  subjectId: string;
  certificationId?: string;
}) {
  const subjects = useQuery({
    queryKey: queryKeys.subjects(),
    queryFn: getSubjects,
    enabled: Boolean(subjectId),
  });

  const studyHistory = useQuery({
    queryKey: queryKeys.subjectStudyHistory(subjectId, certificationId),
    queryFn: () => getSubjectStudyHistory(subjectId, certificationId),
    enabled: Boolean(subjectId),
  });

  const subject = useMemo(
    () => subjects.data?.find((item) => item.id === subjectId),
    [subjects.data, subjectId],
  );

  const sessions = studyHistory.data?.data ?? [];

  const totalStudyMinutes = useMemo(
    () =>
      sessions.reduce(
        (total, session) => total + getSessionDurationMinutes(session),
        0,
      ),
    [sessions],
  );

  const lastStudySession = sessions[0];

  return {
    subject,
    subjects,
    studyHistory,
    sessions,
    totalStudyMinutes,
    totalStudySessions: sessions.length,
    lastStudySession,
    isLoading: subjects.isLoading || studyHistory.isLoading,
    isError: subjects.isError || studyHistory.isError,
  };
}
