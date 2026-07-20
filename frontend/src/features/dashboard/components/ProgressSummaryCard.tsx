import {
  Target,
  Clock,
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
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {/* Flashcards */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Precisão (Flashcards)
          </p>

          <Target className="h-5 w-5 text-amber-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-slate-50">
            {data?.flashcardAccuracy?.toFixed(1) ?? 0}%
          </p>

          <p className="mt-1 flex items-center text-xs text-emerald-400">
            <TrendingUp className="mr-1 h-3 w-3" />
            Desempenho atual
          </p>
        </div>
      </div>


      {/* Questões */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Precisão (Questões)
          </p>

          <BookOpen className="h-5 w-5 text-slate-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-slate-50">
            {data?.questionAccuracy?.toFixed(1) ?? 0}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Respostas realizadas
          </p>
        </div>
      </div>


      {/* Simulados */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Média Simulados
          </p>

          <Award className="h-5 w-5 text-amber-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-slate-50">
            {data?.mockExamPerformance?.toFixed(1) ?? 0}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Desempenho médio
          </p>
        </div>
      </div>


      {/* Geral */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Evolução Geral
          </p>

          <Clock className="h-5 w-5 text-slate-500" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-slate-50">
            {(
              (
                (data?.flashcardAccuracy ?? 0) +
                (data?.questionAccuracy ?? 0) +
                (data?.mockExamPerformance ?? 0)
              ) / 3
            ).toFixed(1)}%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Média de aprendizado
          </p>
        </div>
      </div>

    </div>
  );
}