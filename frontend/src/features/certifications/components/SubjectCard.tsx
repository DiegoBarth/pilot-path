import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  subject: {
    title: string;
    icon: LucideIcon;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
  };
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const Icon = subject.icon;

  const isStarted = subject.progress > 0;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700">

      <div className="mb-4 flex items-center justify-between">
        <Icon className="h-6 w-6 text-slate-400" />

        {isStarted && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
            In Progress
          </span>
        )}
      </div>

      <h3 className="mb-4 font-semibold text-slate-50">
        {subject.title}
      </h3>

      <div className="mb-3">
        <div className="h-1.5 w-full rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-amber-500 transition-all"
            style={{
              width: `${subject.progress}%`,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>
            {subject.progress}% complete
          </span>

          <span>
            {subject.lessonsCompleted}/{subject.totalLessons}
          </span>
        </div>
      </div>

      <button
        className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
      >
        {subject.progress > 0 ? "Continue Study" : "Start Topic"}
      </button>

    </div>
  );
}