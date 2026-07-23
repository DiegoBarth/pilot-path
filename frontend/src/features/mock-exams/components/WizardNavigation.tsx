"use client";

import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WizardNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  answeredByIndex: boolean[];
  onPrevious: () => void;
  onNext: () => void;
  onGoToQuestion: (index: number) => void;
  onFinish: () => void;
  canFinish: boolean;
  isFinishing?: boolean;
}

export function WizardNavigation({
  currentIndex,
  totalQuestions,
  answeredByIndex,
  onPrevious,
  onNext,
  onGoToQuestion,
  onFinish,
  canFinish,
  isFinishing = false,
}: WizardNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="space-y-5 border-t border-white/5 pt-6">
      <div className="flex flex-wrap gap-2">
        {answeredByIndex.map((isAnswered, index) => {
          const isCurrent = index === currentIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onGoToQuestion(index)}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition",
                isCurrent && "border-amber-500 bg-amber-500 text-slate-950",
                !isCurrent &&
                  isAnswered &&
                  "border-teal-500/30 bg-teal-500/10 text-teal-300",
                !isCurrent &&
                  !isAnswered &&
                  "border-white/5 bg-surface-elevated text-slate-400 hover:border-white/10",
              )}
              aria-label={`Ir para questão ${index + 1}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          <ChevronLeft />
          Anterior
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          {!isLast && (
            <Button
              type="button"
              variant="cta"
              size="lg"
              onClick={onNext}
            >
              Próxima
              <ChevronRight />
            </Button>
          )}

          {(isLast || canFinish) && (
            <Button
              type="button"
              variant="cta"
              size="lg"
              onClick={onFinish}
              disabled={!canFinish || isFinishing}
            >
              <Flag className="fill-current" />
              {isFinishing ? "Finalizando..." : "Finalizar simulado"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
