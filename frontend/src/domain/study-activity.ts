export type StudyActivityType =
  | "READING"
  | "EXERCISES"
  | "FLASHCARDS"
  | "VIDEO"
  | "SIMULATOR"
  | "MOCK_EXAM"
  | "OTHER";

export const STUDY_ACTIVITY_TYPES = [
  "READING",
  "EXERCISES",
  "FLASHCARDS",
  "VIDEO",
  "SIMULATOR",
  "MOCK_EXAM",
  "OTHER",
] as const satisfies readonly StudyActivityType[];
