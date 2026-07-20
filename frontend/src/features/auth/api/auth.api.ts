import { apiClient } from "@/lib/api/client";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types";

export function login(data: LoginRequest) {
  return apiClient<AuthResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
}

export function register(data: RegisterRequest) {
  return apiClient<AuthResponse>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
}