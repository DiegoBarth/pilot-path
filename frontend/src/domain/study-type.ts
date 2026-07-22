/** Mirrors Prisma `StudyType` enum. */
export type StudyType =
  | "READING"
  | "EXERCISES"
  | "FLASHCARDS"
  | "VIDEO"
  | "SIMULATOR"
  | "OTHER";

export const STUDY_TYPES = [
  "READING",
  "EXERCISES",
  "FLASHCARDS",
  "VIDEO",
  "SIMULATOR",
  "OTHER",
] as const satisfies readonly StudyType[];
