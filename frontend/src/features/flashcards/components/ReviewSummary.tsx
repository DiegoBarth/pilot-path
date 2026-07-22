"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOOD_OPTIONS } from "../lib/mood-options";
import type { ReviewSessionStats } from "../types";
import type { Mood } from "@/features/study/types";

interface ReviewSummaryProps {
  stats: ReviewSessionStats;
  canSaveSession: boolean;
  isSaving?: boolean;
  saveError?: string | null;
  onSaveSession: (mood: Mood) => Promise<void>;
  onRestart: () => void;
  onExit: () => void;
}

export function ReviewSummary({
  stats,
  canSaveSession,
  isSaving = false,
  saveError,
  onSaveSession,
  onRestart,
  onExit,
}: ReviewSummaryProps) {
  const [selectedMood, setSelectedMood] = useState<Mood>(MOOD_OPTIONS[1]!.value);
  const [isSaved, setIsSaved] = useState(false);

  const accuracy = stats.total > 0
    ? Math.round((stats.correct / stats.total) * 100)
    : 0;

  const handleSave = async () => {
    await onSaveSession(selectedMood);
    setIsSaved(true);
  };

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
          {stats.total} {stats.total === 1 ? "flashcard" : "flashcards"}
        </span>
        .
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/5 bg-[#152035] p-4">
          <span className="block text-xs text-slate-400">Acerto</span>
          <span className="mt-1 block text-xl font-bold text-amber-400">
            {accuracy}%
          </span>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#152035] p-4">
          <CheckCircle2 className="mx-auto h-4 w-4 text-teal-400" />
          <span className="mt-1 block text-xl font-bold text-white">
            {stats.correct}
          </span>
          <span className="block text-xs text-slate-400">Acertos</span>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#152035] p-4">
          <XCircle className="mx-auto h-4 w-4 text-rose-400" />
          <span className="mt-1 block text-xl font-bold text-white">
            {stats.wrong}
          </span>
          <span className="block text-xs text-slate-400">Erros</span>
        </div>
      </div>

      {canSaveSession && !isSaved && (
        <div className="mb-6 text-left">
          <p className="mb-3 text-sm font-medium text-slate-300">
            Como você se sentiu nesta sessão?
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {MOOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={isSaving}
                onClick={() => setSelectedMood(option.value)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm transition cursor-pointer",
                  selectedMood === option.value
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                    : "border-white/5 bg-[#152035] text-slate-400 hover:border-white/10 hover:text-slate-200",
                )}
              >
                <span className="mr-1.5">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>

          {saveError && (
            <p className="mt-3 text-sm text-rose-400">{saveError}</p>
          )}
        </div>
      )}

      {isSaved && (
        <p className="mb-6 text-sm text-teal-400">
          Sessão registrada com sucesso. Ela aparecerá na sua atividade recente.
        </p>
      )}

      <div className="space-y-3">
        {canSaveSession && !isSaved && (
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Salvando sessão..." : "Salvar sessão de estudo"}
          </button>
        )}

        {!canSaveSession && (
          <p className="text-sm text-slate-500">
            Não foi possível registrar a sessão (matéria ou matrícula não
            encontrada).
          </p>
        )}

        <button
          type="button"
          onClick={onRestart}
          disabled={isSaving}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          Revisar novamente
        </button>

        <button
          type="button"
          onClick={onExit}
          disabled={isSaving}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Flashcards
        </button>
      </div>
    </div>
  );
}
