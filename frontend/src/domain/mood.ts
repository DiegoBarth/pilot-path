/** Mirrors Prisma `Mood` enum. */
export type Mood =
  | "EXCELLENT"
  | "GOOD"
  | "NEUTRAL"
  | "TIRED"
  | "FRUSTRATED";

export const MOODS = [
  "EXCELLENT",
  "GOOD",
  "NEUTRAL",
  "TIRED",
  "FRUSTRATED",
] as const satisfies readonly Mood[];
