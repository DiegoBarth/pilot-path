"use client";

import { useParams } from "next/navigation";
import { isActiveEnrollment } from "@/features/enrollments/lib/utils";
import { getEnrollmentDisplayStatus } from "@/features/enrollments/constants";
import { useCertificationBreadcrumbs } from "@/hooks/use-breadcrumb-trails";
import { useCertification } from "./useCertification";
import { useEnrollCertification } from "./useEnrollCertification";

export function useCertificationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const enrollCertification = useEnrollCertification();

  const certificationData = useCertification(id);

  const {
    certification,
    subjects,
    studySessions,
    studiedSubjectIds,
    sessionsCountBySubjectId,
    progress,
    cancelEnrollment,
    enrollment,
  } = certificationData;

  const isActive = isActiveEnrollment(enrollment?.status);
  const displayStatus = getEnrollmentDisplayStatus(enrollment);

  useCertificationBreadcrumbs(certification.data);

  const handleEnroll = () => {
    enrollCertification.mutate(id);
  };

  const handleCancel = () => {
    if (!enrollment) {
      return;
    }

    cancelEnrollment.mutate(enrollment.id);
  };

  const subjectList = subjects.data ?? [];
  const sessionList = studySessions.data?.data ?? [];
  const isUpdating =
    enrollCertification.isPending || cancelEnrollment.isPending;

  return {
    id,
    certification,
    subjects,
    studySessions,
    subjectList,
    sessionList,
    studiedSubjectIds,
    sessionsCountBySubjectId,
    progress,
    enrollment,
    isActive,
    displayStatus,
    isUpdating,
    handleEnroll,
    handleCancel,
  };
}
