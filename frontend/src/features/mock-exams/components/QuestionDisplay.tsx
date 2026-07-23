import { DIFFICULTY_LABELS } from "../constants";
import type { MockExamQuestionContent } from "../types";

interface QuestionDisplayProps {
  question: MockExamQuestionContent;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
}: QuestionDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          Questão {questionNumber} de {totalQuestions}
        </span>

        <span className="rounded-full border border-white/5 bg-surface-elevated px-3 py-1 text-xs font-medium text-slate-400">
          {DIFFICULTY_LABELS[question.difficulty] ?? question.difficulty}
        </span>
      </div>

      <p className="text-lg font-medium leading-relaxed text-white md:text-xl">
        {question.statement}
      </p>
    </div>
  );
}
