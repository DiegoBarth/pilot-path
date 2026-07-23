import Link from "next/link";
import { History } from "lucide-react";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { formatElapsedTime } from "../lib/format-duration";
import type { MockExamSummary } from "../types";

interface MockExamsHistoryProps {
  exams: MockExamSummary[];
}

function formatExamDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function MockExamsHistory({ exams }: MockExamsHistoryProps) {
  if (exams.length === 0) {
    return (
      <Panel>
        <PanelHeader
          title="Histórico"
          description="Seus simulados concluídos e em andamento aparecerão aqui."
          icon={History}
        />
        <PanelBody className="p-6">
          <p className="text-sm text-slate-400">
            Você ainda não realizou nenhum simulado.
          </p>
        </PanelBody>
      </Panel>
    );
  }

  return (
    <Panel>
      <PanelHeader
        title="Histórico"
        description="Retome simulados em andamento ou revise resultados anteriores."
        icon={History}
      />

      <PanelBody className="divide-y divide-white/5 p-0">
        {exams.map((exam) => {
          const isFinished = Boolean(exam.finishedAt);

          return (
            <Link
              key={exam.id}
              href={routes.mockExam(exam.id)}
              className="flex flex-col gap-3 px-6 py-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-white">
                  {exam.subject?.name ?? "Simulado"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatExamDate(exam.startedAt)} · {exam.totalQuestions} questões
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isFinished ? (
                  <>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        exam.passed
                          ? "bg-teal-500/10 text-teal-300"
                          : "bg-amber-500/10 text-amber-400",
                      )}
                    >
                      {exam.score}%
                    </span>
                    {exam.duration != null && (
                      <span className="text-xs text-slate-500">
                        {formatElapsedTime(exam.duration)}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                    Em andamento
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </PanelBody>
    </Panel>
  );
}
