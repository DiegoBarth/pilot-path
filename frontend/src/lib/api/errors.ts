import type { ApiError } from "@/types/api-error";

export class ApiClientError extends Error implements ApiError {
  statusCode: number;
  errors?: unknown[];

  constructor(message: string, statusCode: number, errors?: unknown[]) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof ApiClientError ||
    (typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      "message" in error)
  );
}

export function getErrorMessage(
  error: unknown,
  fallback = "Ocorreu um erro. Tente novamente.",
) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (isApiError(error) && typeof error.message === "string" && error.message) {
    return error.message;
  }

  return fallback;
}
