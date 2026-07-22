import { getStudyActivityLabel } from "../constants/study-activity";
import { Panel, PanelBody } from "@/components/ui/panel";
import { formatDate } from "@/lib/utils";
import { getSessionDurationMinutes } from "@/lib/study-utils";
import type { StudySession } from "../types";

interface SubjectStudyHistoryProps {
  sessions: StudySession[];
}

export function SubjectStudyHistory({ sessions }: SubjectStudyHistoryProps) {
  return (
    <Panel className="rounded-xl border-slate-800 shadow-sm">
      <PanelBody className="p-6">
        <h3 className="text-sm font-semibold text-white">Histórico de Estudos</h3>

        {sessions.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Você ainda não possui sessões de estudo nesta matéria.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {sessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {getStudyActivityLabel(session.studyType)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatDate(session.startedAt)}
                  </p>
                </div>

                <span className="text-sm font-medium text-amber-500">
                  {getSessionDurationMinutes(session)} min
                </span>
              </div>
            ))}
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}
