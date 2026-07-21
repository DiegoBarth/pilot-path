"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCertification } from "@/features/certifications/api/certifications.api";
import { useBreadcrumbs } from "@/components/shared/breadcrumb";
import {
  buildCertificationTrail,
  buildSubjectStudyTrail,
} from "@/lib/breadcrumb-trails";

export function useCertificationBreadcrumbs(
  certification?: { name: string } | null,
) {
  const items = useMemo(
    () => (certification ? buildCertificationTrail(certification.name) : null),
    [certification],
  );

  useBreadcrumbs(items);
}

export function useSubjectStudyBreadcrumbs({
  subject,
  certificationId,
}: {
  subject?: { name: string } | null;
  certificationId?: string;
}) {
  const certification = useQuery({
    queryKey: ["certification", certificationId],
    queryFn: () => getCertification(certificationId!),
    enabled: Boolean(certificationId),
  });

  const items = useMemo(() => {
    if (!subject) {
      return null;
    }

    if (!certificationId) {
      return buildSubjectStudyTrail(subject.name);
    }

    if (!certification.data) {
      return null;
    }

    return buildSubjectStudyTrail(subject.name, certification.data);
  }, [subject, certificationId, certification.data]);

  useBreadcrumbs(items);
}
