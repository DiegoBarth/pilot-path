import {
  MIN_MOCK_EXAM_QUESTION_COUNT,
  MOCK_EXAM_QUESTION_COUNTS,
} from "../constants";
import type { SubjectQuestionAvailability } from "../types";

export interface SubjectWithAvailability {
  id: string;
  name: string;
  questionCount: number;
  isAvailable: boolean;
}

export function buildAvailabilityMap(
  availability: SubjectQuestionAvailability[],
) {
  return new Map(availability.map((item) => [item.subjectId, item.questionCount]));
}

export function enrichSubjectsWithAvailability(
  subjects: { id: string; name: string }[],
  availabilityMap: Map<string, number>,
): SubjectWithAvailability[] {
  return subjects.map((subject) => {
    const questionCount = availabilityMap.get(subject.id) ?? 0;

    return {
      ...subject,
      questionCount,
      isAvailable: questionCount >= MIN_MOCK_EXAM_QUESTION_COUNT,
    };
  });
}

export function getSelectableQuestionCounts(availableCount: number): number[] {
  if (availableCount < MIN_MOCK_EXAM_QUESTION_COUNT) {
    return [];
  }

  const presetOptions = MOCK_EXAM_QUESTION_COUNTS.filter(
    (count) => count <= availableCount,
  );

  if (presetOptions.length > 0) {
    return [...presetOptions];
  }

  return [availableCount];
}

export function resolveQuestionCount(availableCount: number, current: number) {
  const selectable = getSelectableQuestionCounts(availableCount);

  if (selectable.length === 0) {
    return current;
  }

  if (selectable.includes(current)) {
    return current;
  }

  return selectable[selectable.length - 1]!;
}

export function canStartMockExam(availableCount: number, questionCount: number) {
  return (
    availableCount >= MIN_MOCK_EXAM_QUESTION_COUNT &&
    availableCount >= questionCount
  );
}
