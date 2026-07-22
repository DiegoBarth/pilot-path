import type { StudyType } from "./study-type";

/** UI/routing activity types. Extends Prisma `StudyType` with product-only values. */
export type StudyActivityType = StudyType | "MOCK_EXAM";

export const STUDY_ACTIVITY_TYPES = [
  "READING",
  "EXERCISES",
  "FLASHCARDS",
  "VIDEO",
  "SIMULATOR",
  "MOCK_EXAM",
  "OTHER",
] as const satisfies readonly StudyActivityType[];
