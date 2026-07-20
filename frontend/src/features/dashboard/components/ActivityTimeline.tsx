"use client";

import {
  Target,
  BookOpen,
} from "lucide-react";

interface Activity {
  id: string;
  type: "FLASHCARD" | "MOCK_EXAM";
  title: string;
  description: string;
  date: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {

  return (
    <div className="col-span-1 flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 lg:col-span-3">

      <div className="border-b border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-slate-50">
          Atividade Recente
        </h2>
      </div>


      <div className="p-6">

        {
          activities.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nenhuma atividade recente.
            </p>
          ) : (

            <div className="space-y-6">

              {
                activities.map((activity) => (

                  <div
                    key={activity.id}
                    className="flex gap-4"
                  >

                    <div
                      className="
                        mt-0.5
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-800
                      "
                    >

                      {
                        activity.type === "FLASHCARD" ? (
                          <Target
                            className="
                              h-4
                              w-4
                              text-amber-500
                            "
                          />
                        ) : (
                          <BookOpen
                            className="
                              h-4
                              w-4
                              text-emerald-500
                            "
                          />
                        )
                      }

                    </div>


                    <div className="flex-1 space-y-1">

                      <p
                        className="
                          text-sm
                          font-medium
                          text-slate-200
                        "
                      >
                        {activity.title}
                      </p>


                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        {activity.description} • {activity.date}
                      </p>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>
  );
}