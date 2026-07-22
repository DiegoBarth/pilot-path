"use client";

import { ArrowLeft, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import type { ReviewSessionStats } from "../types";

interface ReviewSummaryProps {
  stats: ReviewSessionStats;
  onRestart: () => void;
  onExit: () => void;
}

export function ReviewSummary({
  stats,
  onRestart,
  onExit,
}: ReviewSummaryProps) {
  const accuracy = stats.total > 0
    ? Math.round((stats.correct / stats.total) * 100)
    : 0;

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/5 bg-[#1E2834] p-8 text-center shadow-xl md:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
        <Trophy className="h-8 w-8" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-white">
        Revisão concluída!
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Você finalizou a revisão de{" "}
        <span className="font-medium text-slate-200">
          {stats.total}{" "}
          {stats.total === 1
            ? "flashcard"
            : "flashcards"}
        </span>
        .
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/5 bg-[#152035] p-4">
          <span className="block text-xs text-slate-400">
            Acerto
          </span>

          <span className="mt-1 block text-xl font-bold text-amber-400">
            {accuracy}%
          </span>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#152035] p-4">
          <CheckCircle2 className="mx-auto h-4 w-4 text-teal-400" />

          <span className="mt-1 block text-xl font-bold text-white">
            {stats.correct}
          </span>

          <span className="block text-xs text-slate-400">
            Acertos
          </span>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#152035] p-4">
          <XCircle className="mx-auto h-4 w-4 text-rose-400" />

          <span className="mt-1 block text-xl font-bold text-white">
            {stats.wrong}
          </span>

          <span className="block text-xs text-slate-400">
            Erros
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onRestart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          <RotateCcw className="h-4 w-4" />
          Revisar novamente
        </button>

        <button
          type="button"
          onClick={onExit}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Flashcards
        </button>
      </div>
    </div>
  );
}