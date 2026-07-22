import type { ReviewSessionStats } from "../types";

export function buildSessionStats(
  total: number,
  correct: number,
  wrong: number,
): ReviewSessionStats {
  return { total, correct, wrong };
}
