"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { formatElapsedTime } from "../lib/format-duration";
import type { MockExam } from "../types";
import { MockExamsBackLink } from "./MockExamsBackLink";

interface ExamResultProps {
  exam: MockExam;
}

export function ExamResult({ exam }: ExamResultProps) {
  const durationSeconds = exam.duration ?? 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <MockExamsBackLink />

      <div className="flex flex-col items-center gap-6 text-center">
        <ProgressRing
          percent={exam.score}
          size={160}
          strokeWidth={12}
          label="aproveitamento"
        />

        <div>
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold",
              exam.passed
                ? "bg-teal-500/10 text-teal-300"
                : "bg-amber-500/10 text-amber-400",
            )}
          >
            {exam.passed ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {exam.passed ? "Aprovado" : "Reprovado"}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white">
            {exam.subject?.name ?? "Simulado"}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Nota mínima: {exam.passingScore}% · você acertou {exam.correctAnswers} de{" "}
            {exam.totalQuestions} questões
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-surface-elevated p-5">
          <Target className="h-5 w-5 text-amber-500" />
          <p className="mt-3 text-2xl font-bold text-white">{exam.score}%</p>
          <p className="text-sm text-slate-400">Pontuação final</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-surface-elevated p-5">
          <CheckCircle2 className="h-5 w-5 text-teal-400" />
          <p className="mt-3 text-2xl font-bold text-white">
            {exam.correctAnswers}/{exam.totalQuestions}
          </p>
          <p className="text-sm text-slate-400">Acertos</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-surface-elevated p-5">
          <Clock3 className="h-5 w-5 text-sky-400" />
          <p className="mt-3 text-2xl font-bold text-white">
            {formatElapsedTime(durationSeconds)}
          </p>
          <p className="text-sm text-slate-400">Tempo total</p>
        </div>
      </div>

      <Panel>
        <PanelHeader
          title="Revisão das questões"
          description="Confira o gabarito e as explicações de cada item."
        />

        <PanelBody className="space-y-4 p-6">
          {exam.questions.map((item, index) => {
            const selected = item.selectedAlternative;
            const isCorrect = item.isCorrect;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/5 bg-surface-elevated p-5"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Questão {index + 1}
                  </span>

                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      isCorrect
                        ? "bg-teal-500/10 text-teal-300"
                        : "bg-red-500/10 text-red-300",
                    )}
                  >
                    {isCorrect ? "Correta" : "Incorreta"}
                  </span>
                </div>

                <p className="text-sm font-medium text-white md:text-base">
                  {item.question.statement}
                </p>

                {selected && (
                  <p className="mt-3 text-sm text-slate-300">
                    Sua resposta:{" "}
                    <span className="font-semibold text-white">
                      {selected.letter}. {selected.content}
                    </span>
                  </p>
                )}

                {item.question.explanation && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.question.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </PanelBody>
      </Panel>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href={routes.mockExams}
          className={buttonVariants({ variant: "cta", size: "lg" })}
        >
          <RotateCcw />
          Novo simulado
        </Link>
      </div>
    </div>
  );
}
