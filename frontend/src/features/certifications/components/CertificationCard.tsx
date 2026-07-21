import Link from "next/link";

interface CertificationCardProps {
  certification: {
    id: string;
    name: string;
    description: string;
    progress?: number;
    status: string;
  };
}

const STATUS_STYLES: Record<string, string> = {
  "Em Andamento": "border-amber-500/40 bg-[#EDAA3F]/10 text-amber-400",
  "Concluído": "border-teal-500/40 bg-teal-500/10 text-teal-400",
  "Pausado": "border-sky-500/40 bg-sky-500/10 text-sky-400",
  "Abandonado": "border-red-500/40 bg-red-500/10 text-red-400",
  "Não Iniciado": "border-slate-500/40 bg-slate-500/10 text-slate-400"
};

export function CertificationCard({ certification }: CertificationCardProps) {
  const statusStyle = STATUS_STYLES[certification.status] ?? STATUS_STYLES["Não Iniciado"];

  return (
    <Link
      href={`/certifications/${certification.id}`}
      className="
        rounded-2xl
        border
        border-white/5
        bg-[#1E2834]
        p-6
        transition
        hover:border-amber-500/40
      "
    >
      <h2 className="text-xl font-semibold text-slate-50">
        {certification.name}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {certification.description}
      </p>

      {typeof certification.progress === "number" && (
        <div className="mt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              Progresso
            </span>

            <span className="text-amber-400">
              {certification.progress}%
            </span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-[#EDAA3F]"
              style={{
                width: `${certification.progress}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-5">
        <span
          className={`
            inline-flex
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-medium
            ${statusStyle}
          `}
        >
          {certification.status}
        </span>
      </div>
    </Link>
  );
}