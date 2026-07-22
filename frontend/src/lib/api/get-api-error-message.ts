import type { ApiError } from "@/types/api-error";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Ocorreu um erro. Tente novamente.",
) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as ApiError).message;

    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }

  return fallback;
}
