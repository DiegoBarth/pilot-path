interface CertificationHeaderProps {
  certification: {
    id: string;
    name: string;
    description?: string;
  };
  progress: number;
  status: string;
  onEnroll?: () => void;
  isEnrolling?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  "Em Andamento": "border-amber-500/40 bg-[#EDAA3F]/10 text-amber-400",
  "Concluído": "border-teal-500/40 bg-teal-500/10 text-teal-400",
  "Pausado": "border-slate-500/40 bg-slate-500/10 text-slate-400",
  "Abandonado": "border-red-500/40 bg-red-500/10 text-red-400",
  "Não Iniciado": "border-slate-500/40 bg-slate-500/10 text-slate-400",
};

export function CertificationHeader({
  certification,
  status,
  onEnroll,
  isEnrolling,
}: CertificationHeaderProps) {
  const isNotStarted = status === "Não Iniciado";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {certification.name}
        </h1>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[status] ?? STATUS_STYLES["Não Iniciado"]}`}
        >
          {status}
        </span>
      </div>

      {isNotStarted && (
        <button
          type="button"
          onClick={onEnroll}
          disabled={isEnrolling}
          className="
            cursor-pointer rounded-lg bg-amber-500 px-5 py-3
            text-sm font-semibold text-slate-950 transition
            hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {isEnrolling ? "Iniciando..." : "Iniciar certificação"}
        </button>
      )}
    </div>
  );
}