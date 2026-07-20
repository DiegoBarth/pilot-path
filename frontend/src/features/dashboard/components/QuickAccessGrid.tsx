import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickAccessGrid() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/5 bg-[#1E2834] p-6">
      <h2 className="text-lg font-semibold text-slate-200">Ações Rápidas</h2>

      <div className="flex flex-1 flex-col justify-center gap-3">
        <Link
          href="/certifications/resume"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:from-amber-300 hover:to-orange-400"
          )}
        >
          <Play className="mr-2 h-4 w-4" />
          Continuar Última Sessão
        </Link>

        <Link
          href="/questions/quick-quiz"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full border-slate-700 text-slate-200 hover:bg-slate-800"
          )}
        >
          <Zap className="mr-2 h-4 w-4 text-amber-500" />
          Quiz Rápido
        </Link>
      </div>
    </div>
  );
}
