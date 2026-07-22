"use client";

import { useMemo } from "react";
import { useBreadcrumbs } from "@/components/shared/breadcrumb";
import { useCertificationQuery } from "@/features/certifications/hooks/useCertificationQuery";
import {
  buildCertificationTrail,
  buildSubjectStudyTrail,
  buildFlashcardsReviewTrail,
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
  const certification = useCertificationQuery(certificationId);

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

export function useFlashcardReviewBreadcrumbs({
  subject,
  certificationId,
}: {
  subject?: { id: string; name: string } | null;
  certificationId?: string;
}) {
  const certification = useCertificationQuery(certificationId);

  const items = useMemo(() => {
    if (certificationId && !certification.data) {
      return null;
    }

    return buildFlashcardsReviewTrail(
      subject ?? null,
      certification.data ?? null,
    );
  }, [subject, certificationId, certification.data]);

  useBreadcrumbs(items);
}
