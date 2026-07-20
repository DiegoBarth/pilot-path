import { ApiError } from "@/types/api-error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

interface ApiRequestOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(options.token && {
        Authorization: `Bearer ${options.token}`
      })
    }
  });
  console.log(response);
  if (!response.ok) {
    const error = await response.json();

    throw error as ApiError;
  }

  return response.json();
}