import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { invalidateMockExamQueries } from "@/lib/query-keys";
import { createMockExam } from "../api/mock-exams.api";
import type { CreateMockExamRequest } from "../types";

export function useCreateMockExam() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateMockExamRequest) => createMockExam(data),
    onSuccess: (exam) => {
      invalidateMockExamQueries(queryClient);
      router.push(routes.mockExam(exam.id));
    },
  });
}
