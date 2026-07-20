import { Files, Target } from "lucide-react";

export function QuickAccessMini() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-200">Quick access</h2>
      
      {/* Cockpit Gauge Placeholder */}
      <div className="h-28 w-full overflow-hidden rounded-xl bg-gradient-to-b from-blue-500 to-amber-900 shadow-lg border border-slate-700" />
      
      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
          <Files className="mx-auto mb-2 h-5 w-5 text-slate-400" />
          <p className="text-xl font-bold text-slate-50">5</p>
          <p className="text-[10px] uppercase text-slate-500">Cid</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
          <Target className="mx-auto mb-2 h-5 w-5 text-slate-400" />
          <p className="text-xl font-bold text-slate-50">2</p>
          <p className="text-[10px] uppercase text-slate-500">Tar</p>
        </div>
      </div>
    </div>
  );
}