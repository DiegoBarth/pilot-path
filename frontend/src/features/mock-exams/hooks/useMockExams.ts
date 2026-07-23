import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getMockExam, getMockExams } from "../api/mock-exams.api";

export function useMockExams() {
  return useQuery({
    queryKey: queryKeys.mockExams(),
    queryFn: getMockExams,
  });
}

export function useMockExam(id: string) {
  return useQuery({
    queryKey: queryKeys.mockExam(id),
    queryFn: () => getMockExam(id),
    enabled: Boolean(id),
  });
}
