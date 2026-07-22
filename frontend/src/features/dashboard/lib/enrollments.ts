export function findEnrollmentForCertification<T extends { certificationId: string }>(
  enrollments: T[],
  certificationId: string,
) {
  return enrollments.find((enrollment) => enrollment.certificationId === certificationId);
}
