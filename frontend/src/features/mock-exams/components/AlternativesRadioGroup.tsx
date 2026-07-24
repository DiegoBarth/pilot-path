"use client";

import { cn } from "@/lib/utils";
import type { QuestionAlternative } from "../types";

interface AlternativesRadioGroupProps {
  alternatives: QuestionAlternative[];
  selectedAlternativeId?: string;
  onSelect: (alternativeId: string) => void;
  disabled?: boolean;
  name: string;
}

export function AlternativesRadioGroup({
  alternatives,
  selectedAlternativeId,
  onSelect,
  disabled = false,
  name,
}: AlternativesRadioGroupProps) {
  return (
    <div className="space-y-3" role="radiogroup" aria-label="Alternativas da questão">
      {alternatives.map((alternative) => {
        const isSelected = selectedAlternativeId === alternative.id;

        return (
          <label
            key={alternative.id}
            className={cn(
              "flex items-center cursor-pointer gap-4 rounded-2xl border px-4 py-4 transition",
              isSelected
                ? "border-amber-500/40 bg-amber-500/10"
                : "border-white/5 bg-surface-elevated hover:border-white/10",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            <input
              type="radio"
              name={name}
              value={alternative.id}
              checked={isSelected}
              disabled={disabled}
              onChange={() => onSelect(alternative.id)}
              className="mt-1 h-4 w-4 shrink-0 accent-amber-500"
            />

            <div className="min-w-0 flex items-center h-full gap-2">
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-500">
                {alternative.letter}:
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-200 md:text-base">
                {alternative.content}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
