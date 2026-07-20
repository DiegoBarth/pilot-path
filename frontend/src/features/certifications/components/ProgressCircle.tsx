import { Check, Clock, ShieldCheck, Zap } from "lucide-react";

export function ProgressCircle({ percent }: { percent: number }) {
  const radius = 70;
  const stroke = 6; // Gráfico mais fino
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Ícones representativos ao redor do círculo
  const statusIcons = [
    { icon: Clock, style: "top-[-10px] left-[50%] translate-x-[-50%]" },
    { icon: Zap, style: "right-[-10px] top-[50%] translate-y-[-50%]" },
    { icon: ShieldCheck, style: "bottom-[-10px] left-[50%] translate-x-[-50%]" },
    { icon: Check, style: "left-[-10px] top-[50%] translate-y-[-50%]" },
  ];

  return (
    <div className="flex w-full items-center justify-start rounded-xl border border-slate-800 bg-slate-900/50 p-8">
      <div className="relative flex h-44 w-44 items-center justify-center">
        {/* Gráfico SVG */}
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle stroke="#1e293b" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} />
          <circle
            stroke="#f59e0b"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Marcadores ao redor do círculo */}
        {statusIcons.map((item, i) => (
          <div key={i} className={cn("absolute flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800", item.style)}>
            <item.icon className="h-4 w-4 text-emerald-500" />
          </div>
        ))}

        {/* Centro do Progresso */}
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold text-slate-50">{percent}%</span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Complete</span>
        </div>
      </div>

      {/* Texto descritivo à direita */}
      <div className="ml-12">
        <h3 className="text-xl font-semibold text-slate-50">Private Pilot Certification</h3>
        <p className="mt-2 text-sm text-slate-400 max-w-xs">
          Acompanhe o progresso detalhado de cada módulo do seu curso PPL diretamente pelo cockpit.
        </p>
      </div>
    </div>
  );
}

// Utilitário para facilitar as classes dinâmicas
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}