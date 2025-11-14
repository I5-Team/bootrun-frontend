import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCourses, fetchCoursesDetail } from "../api/coursesApi";
import type { CoursesApiParams } from "../types/CourseType";

/**
 * GET /courses
 * 강의 목록 조회
 */
export const useCoursesQuery = (params: CoursesApiParams) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => fetchCourses(params),
    placeholderData: keepPreviousData,
  });
};

/**
 * GET /courses/{course_id}
 * 강의 상세 조회
 */
export const useCourseDetailQuery = (course_id: number) => {
  return useQuery({
    queryKey: ['courseDetial', course_id],
    queryFn: () => fetchCoursesDetail(course_id),
    placeholderData: keepPreviousData,
  });
};