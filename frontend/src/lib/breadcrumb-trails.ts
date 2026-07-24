import type { BreadcrumbItem } from "@/components/shared/breadcrumb";
import { routes } from "@/lib/routes";

export const STATIC_ROUTE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  [routes.dashboard]: [{ label: "Painel" }],
  [routes.certifications]: [{ label: "Certificações" }],
  [routes.flashcards]: [{ label: "Flashcards" }],
  [routes.mockExams]: [{ label: "Simulados" }],
  [routes.analytics]: [{ label: "Estatísticas" }],
};

const certificationsRoot: BreadcrumbItem = {
  label: "Certificações",
  href: routes.certifications
};

const flashcardsRoot: BreadcrumbItem = {
  label: "Flashcards",
  href: routes.flashcards
};

export function buildCertificationTrail(name: string): BreadcrumbItem[] {
  return [certificationsRoot, { label: name }];
}

export function buildSubjectStudyTrail(subjectName: string, certification?: { id: string; name: string } | null): BreadcrumbItem[] {
  if (!certification) {
    return [{ label: subjectName }];
  }

  return [
    certificationsRoot,
    {
      label: certification.name,
      href: routes.certification(certification.id)
    },
    { label: subjectName }
  ];
}

export function buildFlashcardsReviewTrail(
  subject?: { id: string; name: string } | null,
  certification?: { id: string; name: string } | null,
): BreadcrumbItem[] {
  if (certification && subject) {
    return [
      certificationsRoot,
      {
        label: certification.name,
        href: routes.certification(certification.id)
      },
      {
        label: subject.name,
        href: routes.studySubject(subject.id, certification.id)
      },
      { label: "Flashcards" },
    ];
  }

  if (subject) {
    return [
      flashcardsRoot,
      { label: subject.name }
    ];
  }

  return [flashcardsRoot];
}

const mockExamsRoot: BreadcrumbItem = {
  label: "Simulados",
  href: routes.mockExams
};

export function buildMockExamTrail(
  subject?: { id: string; name: string } | null,
  certification?: { id: string; name: string } | null
): BreadcrumbItem[] {
  if (certification && subject) {
    return [
      certificationsRoot,
      {
        label: certification.name,
        href: routes.certification(certification.id)
      },
      {
        label: subject.name,
        href: routes.studySubject(subject.id, certification.id)
      }
    ];
  }

  if (subject) {
    return [mockExamsRoot, { label: subject.name }];
  }

  return [mockExamsRoot];
}