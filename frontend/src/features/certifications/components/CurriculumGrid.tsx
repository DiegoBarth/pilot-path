import { BookOpen, Cloud, Compass, LucideIcon, Plane, Scale } from "lucide-react";
import { SubjectCard } from "./SubjectCard";
import type { CertificationSubject } from "../types";

const SUBJECT_ICONS: LucideIcon[] = [
  Plane,
  Cloud,
  Scale,
  Compass,
  BookOpen
];

interface CurriculumGridProps {
  subjects: CertificationSubject[];
  studiedSubjectIds: Set<string>;
  sessionsCountBySubjectId: Map<string, number>;
  isEnrolled: boolean;
}

export function CurriculumGrid({
  subjects,
  studiedSubjectIds,
  sessionsCountBySubjectId,
  isEnrolled
}: CurriculumGridProps) {
  if (subjects.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Nenhuma matéria cadastrada para esta certificação ainda.
      </p>
    );
  }

  const currentSubjectId = subjects.find(
    (certificationSubject) => !studiedSubjectIds.has(certificationSubject.subject.id)
  )?.subject.id;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {subjects.map((certificationSubject, index) => (
        <SubjectCard
          key={certificationSubject.id}
          isCurrent={isEnrolled && certificationSubject.subject.id === currentSubjectId}
          isEnrolled={isEnrolled}
          subject={{
            id: certificationSubject.subject.id,
            title: certificationSubject.subject.name,
            icon: SUBJECT_ICONS[index % SUBJECT_ICONS.length],
            started: studiedSubjectIds.has(
              certificationSubject.subject.id,
            ),
            sessionsCount: sessionsCountBySubjectId.get(certificationSubject.subject.id) ?? 0,
          }}
          certificationId={certificationSubject.certificationId}
        />
      ))}
    </div>
  );
}