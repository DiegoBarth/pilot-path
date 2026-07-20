import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickAccessGrid() {
  return (
    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
      <Link 
        href="/questions/quick-quiz" 
        className={cn(
          buttonVariants({ variant: "default" }), 
          "bg-slate-800 text-slate-50 hover:bg-slate-700"
        )}
      >
        <Zap className="mr-2 h-4 w-4 text-amber-500" />
        Quiz Rápido
      </Link>
      
      <Link 
        href="/certifications/resume" 
        className={cn(
          buttonVariants({ variant: "default" }), 
          "bg-amber-500 font-semibold text-slate-950 hover:bg-amber-400"
        )}
      >
        <Play className="mr-2 h-4 w-4" />
        Continuar Última Sessão
      </Link>
    </div>
  );
}