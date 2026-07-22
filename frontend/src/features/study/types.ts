import type { PaginatedResult } from "@/domain/pagination";
import type { StudyActivityType } from "@/domain/study-activity";

export enum StudyType {
  READING = "READING",
  VIDEO = "VIDEO",
  EXERCISES = "EXERCISES",
  SIMULATOR = "SIMULATOR",
  FLASHCARDS = "FLASHCARDS",
  MOCK_EXAM = "MOCK_EXAM",
  OTHER = "OTHER",
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

export interface StudyHistorySession {
  id: string;
  startedAt: string;
  endedAt: string;
  studyType: StudyActivityType;
  mood?: Mood | null;
  notes?: string | null;
  createdAt: string;
  certification: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
}

export type StudyHistoryResponse = PaginatedResult<StudyHistorySession>;
