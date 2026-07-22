"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSubjects, getSubjectStudyHistory, getStudySessions } from "../api/study.api";
import { getSessionDurationMinutes } from "@/lib/study-utils";
import type { StudySession } from "../types";

export function useSubjectStudy({ subjectId, certificationId }: {
  subjectId: string;
  certificationId?: string;
}) {
  const subjects = useQuery({
    queryKey: [
      "subjects"
    ],
    queryFn: getSubjects,
    enabled: Boolean(subjectId)
  });

  const studyHistory = useQuery({
    queryKey: [
      "study-history",
      subjectId,
      certificationId
    ],
    queryFn: () => getSubjectStudyHistory(
      subjectId,
      certificationId
    ),
    enabled: Boolean(subjectId)
  });

  const studySessions = useQuery({
    queryKey: [
      "study-sessions"
    ],
    queryFn: getStudySessions,
    enabled: Boolean(subjectId)
  });

  const subject = useMemo(
    () => subjects.data?.find((item) => item.id === subjectId),
    [
      subjects.data,
      subjectId
    ]
  );

  const sessions = useMemo(
    () => studySessions.data?.filter(
      (session) => session.certificationSubject.subjectId === subjectId &&
        (
          !certificationId ||
          session.certificationSubject.certificationId ===
          certificationId
        ),
    ) ?? [],
    [
      studySessions.data,
      subjectId,
      certificationId
    ]
  );

  const totalStudyMinutes = useMemo(
    () => sessions.reduce(
      (
        total,
        session,
      ) => total + getSessionDurationMinutes(session),
      0,
    ),
    [sessions]
  );

  const totalStudySessions = sessions.length;

  const lastStudySession = useMemo(
    () => {
      if (sessions.length === 0) {
        return undefined;
      }

      return [
        ...sessions
      ].sort(
        (a, b) =>
          new Date(b.startedAt).getTime() -
          new Date(a.startedAt).getTime(),
      )[0];

    },
    [sessions]
  );

  return {
    subject,
    subjects,
    studyHistory,
    studySessions,
    sessions,
    totalStudyMinutes,
    totalStudySessions,
    lastStudySession,
    isLoading: subjects.isLoading || studyHistory.isLoading || studySessions.isLoading,
    isError: subjects.isError || studyHistory.isError || studySessions.isError,
  };
}