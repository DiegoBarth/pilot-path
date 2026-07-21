"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollInCertification } from "../api/certifications.api";

export function useEnrollCertification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "enrollments"
        ]
      });
    }
  });

}