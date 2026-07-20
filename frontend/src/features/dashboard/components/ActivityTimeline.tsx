"use client";

export type ActivityType =
  | "READING"
  | "EXERCISES"
  | "FLASHCARDS"
  | "VIDEO"
  | "SIMULATOR"
  | "OTHER";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ACTIVITY_DOT_COLORS: Record<ActivityType, string> = {
  READING: "bg-sky-500",
  EXERCISES: "bg-[#EDAA3F]",
  FLASHCARDS: "bg-emerald-500",
  VIDEO: "bg-violet-500",
  SIMULATOR: "bg-pink-500",
  OTHER: "bg-slate-500",
};

export function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-[#1E2834]">

      <div className="border-b border-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">
          Linha do Tempo de Estudos
        </h2>
      </div>


      <div className="p-6">

        {
          activities.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nenhuma atividade recente.
            </p>
          ) : (

            <ol className="relative space-y-6 border-l border-slate-800 pl-6">

              {
                activities.map((activity) => (
                  <li key={activity.id} className="relative">

                    <span
                      className={`absolute -left-[29px] top-1 h-3 w-3 rounded-full ring-4 ring-slate-900 ${ACTIVITY_DOT_COLORS[activity.type]}`}
                    />

                    <p className="text-sm font-medium text-slate-200">
                      {activity.title}
                    </p>

                    <p className="text-xs text-slate-500">
                      {activity.description} • {activity.date}
                    </p>

                  </li>
                ))
              }

            </ol>

          )
        }

      </div>

    </div>
  );
}
