export const routes = {
  dashboard: "/dashboard",
  certifications: "/certifications",
  certification: (id: string) => `/certifications/${id}`,
  flashcards: "/flashcards",
  mockExams: "/mock-exams",
  analytics: "/analytics",
  login: "/login",
  register: "/register",
  studySubject: (subjectId: string, certificationId?: string) => {
    if (certificationId) {
      return `/study/subject/${subjectId}?certificationId=${certificationId}`;
    }

    return `/study/subject/${subjectId}`;
  },
} as const;
