import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateMockExamQueries, invalidateStudySessionMutations } from "@/lib/query-keys";
import { finishMockExam } from "../api/mock-exams.api";
import type { FinishMockExamRequest } from "../types";

interface FinishMockExamVariables {
  examId: string;
  data: FinishMockExamRequest;
}

export function useFinishMockExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ examId, data }: FinishMockExamVariables) =>
      finishMockExam(examId, data),
    onSuccess: (exam, variables) => {
      invalidateMockExamQueries(queryClient, variables.examId);
      invalidateStudySessionMutations(queryClient, {
        subjectId: exam.subjectId ?? undefined,
      });
    },
  });
}
