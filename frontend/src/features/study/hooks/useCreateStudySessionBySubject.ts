"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStudySessionBySubject,
  type CreateStudySessionBySubjectPayload,
} from "@/features/study/api/study.api";
import { invalidateStudySessionMutations } from "@/lib/query-keys";

export function useCreateStudySessionBySubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudySessionBySubjectPayload) =>
      createStudySessionBySubject(payload),
    onSuccess: (_data, variables) => {
      invalidateStudySessionMutations(queryClient, {
        subjectId: variables.subjectId,
        certificationId: variables.certificationId,
      });
    },
  });
}
