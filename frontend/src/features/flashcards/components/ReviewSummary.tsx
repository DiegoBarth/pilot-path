"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAccuracy, formatCountLabel } from "@/lib/utils";
import type { ReviewSessionStats } from "../types";

interface ReviewSummaryProps {
  stats: ReviewSessionStats;
  canSaveSession: boolean;
  isSaving?: boolean;
  saveError?: string | null;
  onSaveSession: () => Promise<void>;
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
  const [isSaved, setIsSaved] = useState(false);

  const accuracy = stats.total > 0
    ? Math.round((stats.correct / stats.total) * 100)
    : 0;

  const handleSave = async () => {
    await onSaveSession();
    setIsSaved(true);
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/5 bg-card p-8 text-center shadow-xl md:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
        <Trophy className="h-8 w-8" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-white">Revisão concluída!</h2>

      <p className="mt-2 text-sm text-slate-400">
        Você finalizou a revisão de{" "}
        <span className="font-medium text-slate-200">
          {formatCountLabel(stats.total, "flashcard", "flashcards")}
        </span>
        .
      </p>

      <div className="my-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/5 bg-surface-input p-4">
          <span className="block text-xs text-slate-400">Acerto</span>
          <span className="mt-1 block text-xl font-bold text-amber-400">
            {formatAccuracy(accuracy, 0)}
          </span>
        </div>

        <div className="rounded-xl border border-white/5 bg-surface-input p-4">
          <CheckCircle2 className="mx-auto h-4 w-4 text-teal-400" />
          <span className="mt-1 block text-xl font-bold text-white">
            {stats.correct}
          </span>
          <span className="block text-xs text-slate-400">Acertos</span>
        </div>

        <div className="rounded-xl border border-white/5 bg-surface-input p-4">
          <XCircle className="mx-auto h-4 w-4 text-rose-400" />
          <span className="mt-1 block text-xl font-bold text-white">
            {stats.wrong}
          </span>
          <span className="block text-xs text-slate-400">Erros</span>
        </div>
      </div>

      {canSaveSession && !isSaved && saveError && (
        <p className="mb-6 text-sm text-rose-400">{saveError}</p>
      )}

      {isSaved && (
        <p className="mb-6 text-sm text-teal-400">
          Sessão registrada com sucesso. Ela aparecerá na sua atividade recente.
        </p>
      )}

      <div className="space-y-3">
        {canSaveSession && !isSaved && (
          <Button
            className="w-full rounded-xl py-3"
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaving ? "Salvando sessão..." : "Salvar sessão de estudo"}
          </Button>
        )}

        {!canSaveSession && (
          <p className="text-sm text-slate-500">
            Não foi possível registrar a sessão (matéria ou matrícula não
            encontrada).
          </p>
        )}

        <Button
          variant="outline"
          className="w-full rounded-xl border-slate-700 bg-slate-800 py-3 text-slate-200 hover:bg-slate-700"
          disabled={isSaving}
          onClick={onRestart}
        >
          <RotateCcw />
          Revisar novamente
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-xl border-slate-700 bg-slate-800 py-3 text-slate-200 hover:bg-slate-700"
          disabled={isSaving}
          onClick={onExit}
        >
          <ArrowLeft />
          Voltar para Flashcards
        </Button>
      </div>
    </div>
  );
}
