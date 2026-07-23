import type { MockExamQuestionItem } from "../types";

export type ExamAnswers = Record<string, string>;

export function buildFinishAnswers(
  questions: MockExamQuestionItem[],
  answers: ExamAnswers,
) {
  return questions.map((item) => ({
    questionId: item.questionId,
    alternativeId: answers[item.questionId]!,
  }));
}

export function countAnsweredQuestions(
  questions: MockExamQuestionItem[],
  answers: ExamAnswers,
) {
  return questions.filter((item) => Boolean(answers[item.questionId])).length;
}

export function areAllQuestionsAnswered(
  questions: MockExamQuestionItem[],
  answers: ExamAnswers,
) {
  return countAnsweredQuestions(questions, answers) === questions.length;
}
