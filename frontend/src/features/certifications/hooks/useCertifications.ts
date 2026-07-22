"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getCertifications } from "../api/certifications.api";

export function useCertifications() {
  const certifications = useQuery({
    queryKey: queryKeys.certifications(),
    queryFn: getCertifications,
  });

  return {
    certifications,
  };
}
