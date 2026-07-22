import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  handleUnauthorized,
  setAuthSession,
} from "@/lib/api/auth-session";
import { ApiClientError } from "@/lib/api/errors";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);
const DEFAULT_GET_RETRIES = 2;

export interface ApiRequestOptions extends RequestInit {
  retry?: boolean | number;
  skipAuth?: boolean;
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
}

let refreshPromise: Promise<string | null> | null = null;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveRetryCount(method: string, retry?: boolean | number) {
  if (retry === false) {
    return 0;
  }

  if (typeof retry === "number") {
    return retry;
  }

  return method === "GET" ? DEFAULT_GET_RETRIES : 0;
}

function buildHeaders(
  options: ApiRequestOptions,
  token: string | null,
): HeadersInit {
  const headers = new Headers(options.headers);
  const hasBody = options.body !== undefined && options.body !== null;
  const isFormData = options.body instanceof FormData;

  if (hasBody && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !options.skipAuth) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

async function parseErrorResponse(response: Response) {
  try {
    const payload = await response.json();

    if (payload && typeof payload === "object" && "message" in payload) {
      return new ApiClientError(
        String(payload.message),
        response.status,
        "errors" in payload ? (payload.errors as unknown[]) : undefined,
      );
    }
  } catch {
    // Response body is not JSON.
  }

  return new ApiClientError(
    "Não foi possível concluir a requisição.",
    response.status,
  );
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as RefreshTokenResponse;
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    setAuthSession({
      user: JSON.parse(storedUser),
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? refreshToken,
    });

    return data.access_token;
  } catch {
    return null;
  }
}

async function tryRefreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

async function executeRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
  attempt = 0,
  hasRetriedAuth = false,
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const maxRetries = resolveRetryCount(method, options.retry);
  const token = options.skipAuth ? null : getAccessToken();

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: buildHeaders(options, token),
      cache: options.cache ?? "no-store",
    });

    if (response.status === 401 && !options.skipAuth) {
      if (!hasRetriedAuth && token) {
        const refreshedToken = await tryRefreshAccessToken();

        if (refreshedToken) {
          return executeRequest<T>(endpoint, options, attempt, true);
        }
      }

      clearAuthSession();
      handleUnauthorized();
      throw await parseErrorResponse(response);
    }

    if (!response.ok) {
      if (
        RETRYABLE_STATUS_CODES.has(response.status) &&
        attempt < maxRetries
      ) {
        await sleep(300 * (attempt + 1));
        return executeRequest<T>(endpoint, options, attempt + 1, hasRetriedAuth);
      }

      throw await parseErrorResponse(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();

    if (!text) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (attempt < maxRetries) {
      await sleep(300 * (attempt + 1));
      return executeRequest<T>(endpoint, options, attempt + 1, hasRetriedAuth);
    }

    throw error;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  return executeRequest<T>(endpoint, options);
}
