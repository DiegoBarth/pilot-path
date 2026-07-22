import type { BreadcrumbItem } from "@/components/shared/breadcrumb";

export const STATIC_ROUTE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ label: "Painel" }],
  "/certifications": [{ label: "Certificações" }],
  "/flashcards": [{ label: "Flashcards" }],
  "/mock-exams": [{ label: "Simulados" }],
  "/analytics": [{ label: "Estatísticas" }],
};

const certificationsRoot: BreadcrumbItem = {
  label: "Certificações",
  href: "/certifications",
};

const flashcardsRoot: BreadcrumbItem = {
  label: "Flashcards",
  href: "/flashcards",
};

export function buildCertificationTrail(name: string): BreadcrumbItem[] {
  return [certificationsRoot, { label: name }];
}

export function buildSubjectStudyTrail(
  subjectName: string,
  certification?: { id: string; name: string } | null,
): BreadcrumbItem[] {
  if (!certification) {
    return [{ label: subjectName }];
  }

  return [
    certificationsRoot,
    {
      label: certification.name,
      href: `/certifications/${certification.id}`,
    },
    { label: subjectName },
  ];
}

export function buildFlashcardsReviewTrail(
  subject?: { id: string; name: string } | null,
  certification?: { id: string; name: string } | null,
): BreadcrumbItem[] {
  // Fluxo completo: Certificações > Piloto Privado > Teoria de Voo > Flashcards
  if (certification && subject) {
    return [
      certificationsRoot,
      {
        label: certification.name,
        href: `/certifications/${certification.id}`,
      },
      {
        label: subject.name,
        href: `/study/subject/${subject.id}?certificationId=${certification.id}`,
      },
      { label: "Flashcards" },
    ];
  }

  // Fluxo via Sidebar filtrado por matéria: Flashcards > Teoria de Voo
  if (subject) {
    return [
      flashcardsRoot,
      { label: subject.name },
    ];
  }

  // Visão geral de Flashcards
  return [flashcardsRoot];
}