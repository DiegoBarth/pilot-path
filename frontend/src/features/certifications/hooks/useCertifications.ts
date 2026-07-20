"use client";

import { useQuery } from "@tanstack/react-query";

import { getCertifications, getEnrollments } from "../api/certifications.api";

export function useCertifications() {

  const certifications = useQuery({
    queryKey: [
      "certifications",
    ],
    queryFn:
      getCertifications,
  });


  const enrollments = useQuery({
    queryKey: [
      "enrollments",
    ],
    queryFn:
      getEnrollments,
  });


  return {
    certifications,
    enrollments,
  };
}
