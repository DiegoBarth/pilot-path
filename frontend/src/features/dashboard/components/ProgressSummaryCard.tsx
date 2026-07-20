import {
  Target,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";

import type {
  LearningStatistics,
} from "../types";


interface ProgressSummaryCardProps {
  data?: LearningStatistics;
}


export function ProgressSummaryCard({
  data,
}: ProgressSummaryCardProps) {

  return (
    <div className="grid gap-4 sm:grid-cols-3">

      {/* Flashcards */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#1E2834] p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Precisão (Flashcards)
          </p>

          <Target className="h-5 w-5 text-amber-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-white">
            {data?.flashcardAccuracy?.toFixed(1) ?? 0}%
          </p>

          <p className="mt-1 flex items-center text-xs text-teal-400">
            <TrendingUp className="mr-1 h-3 w-3" />
            Desempenho atual
          </p>
        </div>
      </div>


      {/* Questões */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#1E2834] p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Precisão (Questões)
          </p>

          <BookOpen className="h-5 w-5 text-slate-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-white">
            {data?.questionAccuracy?.toFixed(1) ?? 0}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Respostas realizadas
          </p>
        </div>
      </div>


      {/* Simulados */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#1E2834] p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Média Simulados
          </p>

          <Award className="h-5 w-5 text-amber-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-white">
            {data?.mockExamPerformance?.toFixed(1) ?? 0}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Desempenho médio
          </p>
        </div>
      </div>

    </div>
  );
}