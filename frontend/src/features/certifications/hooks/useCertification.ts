"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  invalidateEnrollmentMutations,
  queryKeys,
} from "@/lib/query-keys";
import {
  cancelCertificationEnrollment,
  getCertification,
  getCertificationStudySessions,
  getCertificationSubjects,
} from "../api/certifications.api";
import { useEnrollments } from "@/features/enrollments/hooks/useEnrollments";
import { calculateCertificationProgress } from "../lib/progress";

export function useCertification(id: string) {
  const certification = useQuery({
    queryKey: queryKeys.certification(id),
    queryFn: () => getCertification(id),
    enabled: Boolean(id),
  });

  const subjects = useQuery({
    queryKey: queryKeys.certificationSubjects(id),
    queryFn: () => getCertificationSubjects(id),
    enabled: Boolean(id),
  });

  const studySessions = useQuery({
    queryKey: queryKeys.certificationStudySessions(id),
    queryFn: () => getCertificationStudySessions(id),
    enabled: Boolean(id),
  });

  const enrollments = useEnrollments();

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
    return calculateCertificationProgress(
      subjects.data?.length ?? 0,
      studiedSubjectIds.size,
    );
  }, [subjects.data, studiedSubjectIds]);

  const enrollment = useMemo(
    () =>
      enrollments.data?.find((item) => item.certificationId === id),
    [enrollments.data, id],
  );

  const queryClient = useQueryClient();

  const cancelEnrollment = useMutation({
    mutationFn: cancelCertificationEnrollment,
    onSuccess: () => {
      invalidateEnrollmentMutations(queryClient, id);
    },
  });

  return {
    certification,
    subjects,
    studySessions,
    studiedSubjectIds,
    sessionsCountBySubjectId,
    progress,
    enrollment,
    cancelEnrollment,
  };
}
