"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createStudySessionBySubject,
  type CreateStudySessionBySubjectPayload,
} from "@/features/study/api/study.api";

export function useCreateStudySessionBySubject() {
  return useMutation({
    mutationFn: (payload: CreateStudySessionBySubjectPayload) =>
      createStudySessionBySubject(payload),
  });
}
