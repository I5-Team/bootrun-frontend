import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CoursesApiParams } from "../types/CourseType";
import { fetchMyEnrollments } from "../api/enrollmentsApi";

/**
 * GET /enrollments/my
 * 내 수강 목록 조회
 */
export const useMyEnrollmentQuery = (params: CoursesApiParams) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => fetchMyEnrollments(params),
    placeholderData: keepPreviousData,
  });
};