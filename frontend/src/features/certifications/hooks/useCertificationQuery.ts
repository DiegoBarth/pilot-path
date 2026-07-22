"use client";

import { useQuery } from "@tanstack/react-query";
import { getCertification } from "../api/certifications.api";
import { queryKeys } from "@/lib/query-keys";

export function useCertificationQuery(certificationId?: string) {
  return useQuery({
    queryKey: queryKeys.certification(certificationId ?? ""),
    queryFn: () => getCertification(certificationId!),
    enabled: Boolean(certificationId),
  });
}
