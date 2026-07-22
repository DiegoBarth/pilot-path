import { PageHeader } from "@/components/shared/PageHeader";
import { SubjectStudyStats } from "./SubjectStudyStats";
import { SubjectStudyMaterial } from "./SubjectStudyMaterial";
import { SubjectPracticePanel } from "./SubjectPracticePanel";
import { SubjectStudyHistory } from "./SubjectStudyHistory";
import type { StudyHistorySession, Subject } from "../types";

interface SubjectStudyLandingProps {
  subject: Subject;
  sessions: StudyHistorySession[];
  totalStudySessions: number;
  totalStudyMinutes: number;
  lastStudySession?: StudyHistorySession;
  flashcardsHref: string;
}

export function SubjectStudyLanding({
  subject,
  sessions,
  totalStudySessions,
  totalStudyMinutes,
  lastStudySession,
  flashcardsHref,
}: SubjectStudyLandingProps) {
  return (
    <>
      <PageHeader
        title={subject.name}
        description={
          subject.description ||
          "Continue seus estudos e acompanhe seu progresso nesta matéria."
        }
        className="border-b border-slate-800 pb-6"
      />

      <SubjectStudyStats
        totalStudySessions={totalStudySessions}
        totalStudyMinutes={totalStudyMinutes}
        lastStudySession={lastStudySession}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SubjectStudyMaterial subject={subject} />
        </div>

        <div className="space-y-6">
          <SubjectPracticePanel flashcardsHref={flashcardsHref} />
          <SubjectStudyHistory sessions={sessions} />
        </div>
      </div>
    </>
  );
}
