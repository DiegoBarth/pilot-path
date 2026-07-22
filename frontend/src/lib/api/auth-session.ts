import { routes } from "@/lib/routes";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthSession {
  user: StoredUser;
  accessToken: string;
  refreshToken?: string;
}

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

function setAccessTokenCookie(accessToken: string) {
  document.cookie = `${ACCESS_TOKEN_KEY}=${accessToken}; path=/; max-age=${TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearAccessTokenCookie() {
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as StoredUser;
  } catch {
    return null;
  }
}

export function setAuthSession({
  user,
  accessToken,
  refreshToken,
}: AuthSession) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  setAccessTokenCookie(accessToken);

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  clearAccessTokenCookie();
}

export function handleUnauthorized() {
  if (typeof window === "undefined") {
    return;
  }

  const pathname = window.location.pathname;

  if (pathname === routes.login || pathname === routes.register) {
    return;
  }

  clearAuthSession();
  unauthorizedHandler?.();
}
