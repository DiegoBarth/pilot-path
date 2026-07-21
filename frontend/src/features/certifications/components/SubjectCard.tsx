import Link from "next/link";
import { Lock, MoreVertical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    icon: LucideIcon;
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
  isEnrolled
}: SubjectCardProps) {
  const Icon = subject.icon;

  const progress = subject.started ? 100 : 0;

  const studyHref = `/study/subject/${subject.id}` + `?certificationId=${certificationId}`;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-white/5 bg-[#1E2834] p-5 transition-colors",
        isCurrent &&
        "border-sky-500/50 bg-[#152035] shadow-[0_0_0_1px_rgba(56,189,248,0.12)]",
        !isEnrolled &&
        "opacity-80",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            isEnrolled ? "bg-teal-500/10 text-teal-400" : "bg-slate-500/10 text-slate-500",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>

        <button
          type="button"
          aria-label="Mais opções"
          className="rounded-md p-1 text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mb-2 text-base font-semibold text-white">
        {subject.title}
      </h3>

      {!isEnrolled ? (
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Lock className="h-3.5 w-3.5" />
          Inscreva-se para começar
        </div>
      ) : subject.started ? (
        <p className="mb-3 text-xs font-medium text-teal-400">
          Em Andamento
        </p>
      ) : (
        <div className="mb-3 h-4" />
      )}

      <div className="mt-auto">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a2235]">
          <div
            className="h-full rounded-full bg-[#EDAA3F] transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>
            {progress}% concluído
          </span>

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
              isCurrent ? "bg-sky-500 text-white hover:bg-sky-400" : "bg-[#468ADD] text-slate-200 hover:bg-[#3b79c4]",
            )}
          >
            {subject.started ? "Continuar Estudo" : "Iniciar Tópico"}
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