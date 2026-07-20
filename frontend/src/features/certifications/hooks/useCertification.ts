"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getCertification,
  getCertificationStudySessions,
  getCertificationSubjects,
  getEnrollments,
} from "../api/certifications.api";

export function useCertification(id: string) {

  const certification = useQuery({
    queryKey: [
      "certification",
      id,
    ],
    queryFn: () =>
      getCertification(id),
    enabled: Boolean(id),
  });


  const subjects = useQuery({
    queryKey: [
      "certification-subjects",
      id,
    ],
    queryFn: () =>
      getCertificationSubjects(id),
    enabled: Boolean(id),
  });


  const studySessions = useQuery({
    queryKey: [
      "certification-study-sessions",
      id,
    ],
    queryFn: () =>
      getCertificationStudySessions(id),
    enabled: Boolean(id),
  });


  const enrollments = useQuery({
    queryKey: [
      "enrollments",
    ],
    queryFn:
      getEnrollments,
  });


  const sessionsCountBySubjectId = useMemo(() => {
    const sessions = studySessions.data?.data ?? [];
    const counts = new Map<string, number>();

    for (const session of sessions) {
      counts.set(
        session.subject.id,
        (counts.get(session.subject.id) ?? 0) + 1,
      );
    }

    return counts;
  }, [studySessions.data]);


  const studiedSubjectIds = useMemo(
    () => new Set(sessionsCountBySubjectId.keys()),
    [sessionsCountBySubjectId],
  );


  const progress = useMemo(() => {
    const totalSubjects = subjects.data?.length ?? 0;

    if (totalSubjects === 0) {
      return 0;
    }

    return Math.round(
      (studiedSubjectIds.size / totalSubjects) * 100,
    );
  }, [subjects.data, studiedSubjectIds]);


  const enrollment = useMemo(
    () => enrollments.data?.find(
      (item) => item.certificationId === id,
    ),
    [enrollments.data, id],
  );


  return {
    certification,
    subjects,
    studySessions,
    studiedSubjectIds,
    sessionsCountBySubjectId,
    progress,
    enrollment,
  };
}
