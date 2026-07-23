import type { StudyType } from "./study-type";

/** UI/routing activity types aligned with Prisma `StudyType`. */
export type StudyActivityType = StudyType;

export const STUDY_ACTIVITY_TYPES = [
  "READING",
  "EXERCISES",
  "FLASHCARDS",
  "VIDEO",
  "SIMULATOR",
  "MOCK_EXAM",
  "OTHER",
] as const satisfies readonly StudyActivityType[];
