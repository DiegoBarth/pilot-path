"use client";

import { useMemo } from "react";
import { useBreadcrumbs } from "@/components/shared/breadcrumb";
import { useCertificationQuery } from "@/features/certifications/hooks/useCertificationQuery";
import {
  buildCertificationTrail,
  buildSubjectStudyTrail,
  buildFlashcardsReviewTrail,
  buildMockExamTrail,
} from "@/lib/breadcrumb-trails";

function useCertificationBreadcrumbContext(certificationId?: string) {
  const query = useCertificationQuery(certificationId);

  return {
    certification: query.data ?? null,
    isPending: Boolean(certificationId) && query.isLoading,
  };
}

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
  const { certification, isPending } =
    useCertificationBreadcrumbContext(certificationId);

  const items = useMemo(() => {
    if (!subject) {
      return null;
    }

    if (!certificationId) {
      return buildSubjectStudyTrail(subject.name);
    }

    if (isPending || !certification) {
      return null;
    }

    return buildSubjectStudyTrail(subject.name, certification);
  }, [subject, certificationId, certification, isPending]);

  useBreadcrumbs(items);
}

export function useFlashcardReviewBreadcrumbs({
  subject,
  certificationId,
}: {
  subject?: { id: string; name: string } | null;
  certificationId?: string;
}) {
  const { certification, isPending } =
    useCertificationBreadcrumbContext(certificationId);

  const items = useMemo(() => {
    if (certificationId && (isPending || !certification)) {
      return null;
    }

    return buildFlashcardsReviewTrail(subject ?? null, certification);
  }, [subject, certificationId, certification, isPending]);

  useBreadcrumbs(items);
}

export function useMockExamBreadcrumbs({
  subject,
  certificationId,
}: {
  subject?: { id: string; name: string } | null;
  certificationId?: string;
  examLabel?: string;
}) {
  const { certification, isPending } =
    useCertificationBreadcrumbContext(certificationId);

  const items = useMemo(() => {
    if (certificationId && (isPending || !certification)) {
      return null;
    }

    return buildMockExamTrail(subject ?? null, certification);
  }, [subject, certificationId, certification, isPending]);

  useBreadcrumbs(items);
}
