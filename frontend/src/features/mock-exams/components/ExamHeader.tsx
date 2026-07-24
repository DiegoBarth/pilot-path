"use client";

import { FileText, ListChecks } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ExamTimer } from "./ExamTimer";

interface ExamHeaderProps {
  subjectName: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  elapsedSeconds: number;
  isTimerActive: boolean;
}

export function ExamHeader({
  subjectName,
  currentQuestion,
  totalQuestions,
  answeredCount,
  elapsedSeconds,
  isTimerActive
}: ExamHeaderProps) {
  const progress =
    totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-5 border-b border-white/5 pb-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Simulado
          </span>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {subjectName}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface-elevated px-3 py-2 text-xs font-medium text-slate-300">
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {currentQuestion}/{totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface-elevated px-3 py-2 text-xs font-medium text-slate-300">
            <ListChecks className="h-3.5 w-3.5 text-teal-400" />
            <span>{answeredCount} respondidas</span>
          </div>

          <ExamTimer
            elapsedSeconds={elapsedSeconds}
            isActive={isTimerActive}
          />
        </div>
      </div>

      <ProgressBar
        value={progress}
        size="sm"
        trackClassName="bg-slate-800"
        indicatorClassName="bg-amber-500"
      />
    </div>
  );
}
