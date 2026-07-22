"use client";

import { useQuery } from "@tanstack/react-query";
import { getCertifications } from "../api/certifications.api";

export function useCertifications() {

  const certifications = useQuery({
    queryKey: [
      "certifications",
    ],
    queryFn:
      getCertifications,
  });

  return {
    certifications
  };
}
