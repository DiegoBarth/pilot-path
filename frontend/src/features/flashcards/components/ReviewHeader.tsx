"use client";

import { CheckCircle2, Layers } from "lucide-react";
import { FlashcardsBackLink } from "./FlashcardsBackLink";

interface ReviewHeaderProps {
  title?: string;
  subtitle?: string;
  reviewedToday: number;
  dailyGoal: number;
  sessionReviewed: number;
  sessionCorrect: number;
  sessionTotal: number;
  onExit?: () => void;
}

export function ReviewHeader({
  title = "Revisão de Flashcards",
  subtitle,
  reviewedToday,
  dailyGoal,
  sessionReviewed,
  sessionCorrect,
  sessionTotal,
  onExit,
}: ReviewHeaderProps) {
  return (
    <div className="space-y-5 border-b border-white/5 pb-6">
      {onExit && <FlashcardsBackLink onClick={onExit} />}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {subtitle && (
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              {subtitle}
            </span>
          )}

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface-elevated px-3 py-2 text-xs font-medium text-slate-300">
            <Layers className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {Math.min(sessionReviewed + 1, sessionTotal)}/{sessionTotal}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface-elevated px-3 py-2 text-xs font-medium text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
            <span>{sessionCorrect} acertos</span>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-400">
            Hoje: {reviewedToday}/{dailyGoal}
          </div>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{
            width:
              sessionTotal > 0
                ? `${(Math.min(sessionReviewed + 1, sessionTotal) / sessionTotal) * 100}%`
                : "0%",
          }}
        />
      </div>
    </div>
  );
}
