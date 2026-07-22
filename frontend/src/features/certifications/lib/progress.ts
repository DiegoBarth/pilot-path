export function calculateCertificationProgress(
  totalSubjects: number,
  studiedSubjectCount: number,
) {
  if (totalSubjects === 0) {
    return 0;
  }

  return Math.round((studiedSubjectCount / totalSubjects) * 100);
}
