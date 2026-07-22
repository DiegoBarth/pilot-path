"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollInCertification } from "../api/certifications.api";
import { invalidateEnrollmentMutations } from "@/lib/query-keys";

export function useEnrollCertification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCertification,
    onSuccess: (_data, certificationId) => {
      invalidateEnrollmentMutations(queryClient, certificationId);
    },
  });
}
