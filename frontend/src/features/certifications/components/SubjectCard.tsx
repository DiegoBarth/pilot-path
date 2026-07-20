import { MoreVertical, type LucideIcon } from "lucide-react";
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
}

export function SubjectCard({ subject, isCurrent = false }: SubjectCardProps) {
  const Icon = subject.icon;
  const progress = subject.started ? 100 : 0;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-white/5 bg-[#1E2834] p-5 transition-colors",
        isCurrent && "border-sky-500/50 bg-[#152035] shadow-[0_0_0_1px_rgba(56,189,248,0.12)]"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
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

      {subject.started && (
        <p className="mb-3 text-xs font-medium text-teal-400">
          Em Andamento
        </p>
      )}

      {!subject.started && <div className="mb-3 h-4" />}

      <div className="mt-auto">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a2235]">
          <div
            className="h-full rounded-full bg-[#EDAA3F] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{progress}% concluído</span>
          <span>
            {subject.sessionsCount}{" "}
            {subject.sessionsCount === 1 ? "sessão" : "sessões"}
          </span>
        </div>

        <button
          className={cn(
            "mt-4 w-full rounded-xl py-2.5 text-sm font-medium transition",
            isCurrent
              ? "bg-sky-500 text-white hover:bg-sky-400"
              : "bg-[#468ADD] text-slate-200 hover:bg-[#222b42]"
          )}
        >
          {subject.started
            ? "Continuar Estudo"
            : isCurrent
              ? "Iniciar Tópico"
              : "Iniciar Tópico"}
        </button>
      </div>
    </div>
  );
}
