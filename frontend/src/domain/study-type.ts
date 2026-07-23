/** Mirrors Prisma `StudyType` enum. */
export type StudyType =
  | "READING"
  | "EXERCISES"
  | "FLASHCARDS"
  | "VIDEO"
  | "SIMULATOR"
  | "MOCK_EXAM"
  | "OTHER";

export const STUDY_TYPES = [
  "READING",
  "EXERCISES",
  "FLASHCARDS",
  "VIDEO",
  "SIMULATOR",
  "MOCK_EXAM",
  "OTHER",
] as const satisfies readonly StudyType[];
