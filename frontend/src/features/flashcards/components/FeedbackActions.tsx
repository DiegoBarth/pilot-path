"use client";

import { Check, X } from "lucide-react";

interface FeedbackActionsProps {
  onFeedback: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export function FeedbackActions({
  onFeedback,
  disabled = false,
}: FeedbackActionsProps) {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onFeedback(false)}
        className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-3.5 text-sm font-semibold text-rose-400 transition hover:border-rose-500/50 hover:bg-rose-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <X className="h-4 w-4" />
        Errei
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onFeedback(true)}
        className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 py-3.5 text-sm font-semibold text-teal-400 transition hover:border-teal-500/50 hover:bg-teal-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check className="h-4 w-4" />
        Acertei
      </button>
    </div>
  );
}