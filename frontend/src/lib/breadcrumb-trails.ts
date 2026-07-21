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
