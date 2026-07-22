"use client";

import { useEffect, useState } from "react";
import { Compass, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CockpitWatermarkOverlay } from "@/components/shared/CockpitWatermarkOverlay";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export function Flashcard({
  question,
  answer,
  isFlipped,
  onFlip,
}: FlashcardProps) {
  const [isDropping, setIsDropping] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (!isFlipped) {
      setIsDropping(false);
      setIsRotating(false);
      return;
    }

    setIsDropping(true);

    const rotateTimeout = setTimeout(() => {
      setIsRotating(true);
    }, 250);

    const returnTimeout = setTimeout(() => {
      setIsDropping(false);
    }, 700);

    return () => {
      clearTimeout(rotateTimeout);
      clearTimeout(returnTimeout);
    };
  }, [isFlipped]);

  return (
    <div className="relative mx-auto w-full max-w-2xl py-6 [perspective:1200px]">
      <div className="absolute inset-x-6 top-1 h-full rounded-3xl border border-white/5 bg-surface-deep opacity-40" />
      <div className="absolute inset-x-3 top-3 h-full rounded-3xl border border-white/5 bg-surface-elevated opacity-70" />

      <div
        className={cn(
          "relative min-h-[380px] w-full [transform-style:preserve-3d] transition-transform duration-250 ease-out",
          isDropping && "translate-y-10",
        )}
      >
        <div
          className={cn(
            "relative min-h-[380px] w-full [transform-style:preserve-3d] transition-transform duration-450 ease-in-out",
            isRotating && "[transform:rotateX(180deg)]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 min-h-[380px] w-full overflow-hidden rounded-3xl border bg-card p-8 md:p-10",
              "[backface-visibility:hidden] border-amber-500/30 shadow-[0_0_50px_-10px_rgba(245,158,11,0.2)]",
            )}
          >
            <CockpitWatermarkOverlay />

            <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between rounded-3xl border border-slate-700 bg-surface-elevated p-10">
              <div>
                <span className="text-xs font-semibold tracking-wider text-amber-500">
                  PERGUNTA
                </span>

                <h3 className="mt-6 text-xl font-semibold leading-relaxed text-slate-100 md:text-2xl">
                  {question}
                </h3>
              </div>

              <Button variant="cta" size="xl" onClick={onFlip} className="mx-auto mt-8">
                Mostrar resposta
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 min-h-[380px] w-full overflow-hidden rounded-3xl border bg-card p-8 md:p-10",
              "[backface-visibility:hidden] [transform:rotateX(180deg)]",
              "border-teal-500/30 shadow-[0_0_50px_-10px_rgba(20,184,166,0.15)]",
            )}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 opacity-5">
              <Compass className="h-80 w-80 text-teal-400" />
            </div>

            <div className="relative z-10 flex min-h-[320px] flex-col justify-between">
              <div>
                <span className="text-xs font-semibold tracking-wider text-teal-400">
                  RESPOSTA
                </span>

                <p className="mt-6 text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
                  {answer}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
                <button
                  type="button"
                  onClick={onFlip}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-white"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  Ver pergunta novamente
                </button>

                <span className="text-xs text-slate-500">Como você se saiu?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
