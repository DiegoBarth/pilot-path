import Link from "next/link";
import { Lock } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    started: boolean;
    sessionsCount: number;
  };
  isCurrent?: boolean;
  isEnrolled: boolean;
  certificationId: string;
}

export function SubjectCard({
  subject,
  certificationId,
  isCurrent = false,
  isEnrolled,
}: SubjectCardProps) {
  const progress = subject.started ? 100 : 0;
  const studyHref = `/study/subject/${subject.id}?certificationId=${certificationId}`;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-white/5 bg-card p-5 transition-colors",
        isCurrent &&
          "border-sky-500/50 bg-surface-input shadow-[0_0_0_1px_rgba(56,189,248,0.12)]",
        !isEnrolled && "opacity-80",
      )}
    >
      <h3 className="mb-2 text-base font-semibold text-white">{subject.title}</h3>

      {!isEnrolled ? (
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Lock className="h-3.5 w-3.5" />
          Inscreva-se para começar
        </div>
      ) : subject.started ? (
        <p className="mb-3 text-xs font-medium text-teal-400">Em andamento</p>
      ) : (
        <p className="mb-3 text-xs font-medium text-slate-400">Não iniciado</p>
      )}

      <div className="mt-auto">
        <ProgressBar value={progress} size="sm" />

        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{progress}% concluído</span>
          <span>
            {subject.sessionsCount}{" "}
            {subject.sessionsCount === 1 ? "sessão" : "sessões"}
          </span>
        </div>

        {isEnrolled ? (
          <Link
            href={studyHref}
            className={cn(
              "mt-4 flex w-full items-center justify-center rounded-xl py-2.5 text-center text-sm font-medium transition",
              isCurrent
                ? "bg-sky-500 text-white hover:bg-sky-400"
                : "bg-action-secondary text-slate-200 hover:brightness-110",
            )}
          >
            {subject.started ? "Continuar estudo" : "Iniciar tópico"}
          </Link>
        ) : (
          <div
            className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-center text-sm font-medium text-slate-500"
            title="Inscreva-se na certificação para começar os estudos"
          >
            <Lock className="h-4 w-4" />
            Bloqueado
          </div>
        )}
      </div>
    </div>
  );
}
