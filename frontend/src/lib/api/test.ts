import { apiClient } from "./client";

export async function testApi() {
  return apiClient("/health");
}