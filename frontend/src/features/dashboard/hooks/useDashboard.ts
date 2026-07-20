"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getLearningStatistics,
  getSubjectAnalytics,
} from "../api/dashboard.api";


export function useDashboard() {

  const statistics = useQuery({
    queryKey: [
      "learning-statistics",
    ],
    queryFn:
      getLearningStatistics,
  });


  const subjects = useQuery({
    queryKey: [
      "subject-analytics",
    ],
    queryFn:
      getSubjectAnalytics,
  });


  return {
    statistics,
    subjects,
  };
}