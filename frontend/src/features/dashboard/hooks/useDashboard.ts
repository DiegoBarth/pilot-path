"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getLearningStatistics,
  getSubjectAnalytics,
  getEnrollments,
  getRecentStudyHistory,
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


  const enrollments = useQuery({
    queryKey: [
      "enrollments",
    ],
    queryFn:
      getEnrollments,
  });


  const recentActivity = useQuery({
    queryKey: [
      "recent-study-history",
    ],
    queryFn: () =>
      getRecentStudyHistory(6),
  });


  return {
    statistics,
    subjects,
    enrollments,
    recentActivity,
  };
}