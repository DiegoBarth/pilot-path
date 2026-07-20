import { ProgressRing } from "@/components/shared/ProgressRing";

interface OverallProgressCardProps {
  percent: number;
}

export function OverallProgressCard({ percent }: OverallProgressCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#1E2834] p-6 text-center">
      <h2 className="text-lg font-semibold text-slate-200">Progresso Geral</h2>

      <ProgressRing percent={percent} size={140} strokeWidth={10} label="Média Geral" />

      <p className="text-xs text-slate-500">
        Média entre flashcards, questões e simulados.
      </p>
    </div>
  );
}
