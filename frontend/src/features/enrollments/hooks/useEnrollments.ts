"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getEnrollments } from "../api/enrollments.api";

export function useEnrollments() {
  return useQuery({
    queryKey: queryKeys.enrollments(),
    queryFn: getEnrollments,
  });
}
