"use client";

import { useMemo } from "react";
import { getEnrollmentDisplayStatus } from "@/features/enrollments/constants";
import type { EnrollmentDisplayStatus } from "@/domain/enrollment";
import { useCertifications } from "./useCertifications";

export interface CertificationListItem {
  id: string;
  name: string;
  description: string;
  status: EnrollmentDisplayStatus;
}

export function useCertificationsPage() {
  const { certifications } = useCertifications();

  const items = useMemo<CertificationListItem[]>(
    () =>
      (certifications.data ?? []).map((certification) => ({
        id: certification.id,
        name: certification.name,
        description: certification.description ?? "",
        status: getEnrollmentDisplayStatus(certification.enrollments[0]),
      })),
    [certifications.data],
  );

  return {
    certifications,
    items,
  };
}
