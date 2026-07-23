import { apiClient } from "@/lib/api/client";
import type {
  CreateMockExamRequest,
  FinishMockExamRequest,
  MockExam,
  MockExamSummary,
  SubjectQuestionAvailability,
} from "../types";

export function getMockExams() {
  return apiClient<MockExamSummary[]>("/mock-exams");
}

export function getMockExamSubjectsAvailability() {
  return apiClient<SubjectQuestionAvailability[]>("/mock-exams/subjects-availability");
}

export function getMockExam(id: string) {
  return apiClient<MockExam>(`/mock-exams/${id}`);
}

export function createMockExam(data: CreateMockExamRequest) {
  return apiClient<MockExam>("/mock-exams", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function finishMockExam(id: string, data: FinishMockExamRequest) {
  return apiClient<MockExam>(`/mock-exams/${id}/finish`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
