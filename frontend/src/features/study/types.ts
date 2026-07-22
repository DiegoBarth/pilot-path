export enum StudyType {
  READING = "READING",
  VIDEO = "VIDEO",
  SIMULATOR = "SIMULATOR",
  FLASHCARDS = "FLASHCARDS",
  MOCK_EXAM = "MOCK_EXAM",
}

export enum Mood {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  NEUTRAL = "NEUTRAL",
  TIRED = "TIRED",
  FRUSTRATED = "FRUSTRATED",
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Certification {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CertificationSubject {
  id: string;
  certificationId: string;
  subjectId: string;
  displayOrder: number;
  isRequired: boolean;
  estimatedHours: number;
  certification: Certification;
  subject: Subject;
}

export interface StudySession {
  id: string;
  enrollmentId: string;
  certificationSubjectId: string;

  startedAt: string;
  endedAt: string;

  studyType: StudyType;
  mood?: Mood | null;
  notes?: string | null;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;

  certificationSubject: CertificationSubject;
}

export interface StudyHistoryItem {
  id: string;
  enrollmentId: string;
  certificationSubjectId: string;
  studyType: StudyType;
  duration: number;
  studiedAt: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  certificationSubject: CertificationSubject;
}

export interface StudyHistoryResponse {
  data: StudyHistoryItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}