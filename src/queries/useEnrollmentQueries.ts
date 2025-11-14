import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CoursesApiParams, EnrollmentProgressBodyData, LectureProgressBodyData } from "../types/CourseType";
import { createEnrollmentProgress, fetchCourseProgress, fetchEnrollmentDashboard, fetchEnrollmentDetail, fetchLectureProgress, fetchMyEnrollments, postEnrollments, updateLectureProgress } from "../api/enrollmentsApi";

/**
 * POST /enrollments
 * 수강 등록
 */
export const useEnrollmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course_id: number) => postEnrollments(course_id),
    onSuccess: () => {
      // 수강 등록 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['myEnrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollmentDashboard'] });
    },
  });
};

/**
 * GET /enrollments/my
 * 내 수강 목록 조회
 */
export const useMyEnrollmentQuery = (params: CoursesApiParams) => {
  return useQuery({
    queryKey: ['myEnrollments', params],
    queryFn: () => fetchMyEnrollments(params),
    placeholderData: keepPreviousData,
  });
};

/** 
 * GET /enrollments/dashboard 
 * 학습자 대시보드 조회 
 */
export const useEnrollmentDashboardQuery = () => {
  return useQuery({
    queryKey: ['enrollmentDashboard'],
    queryFn: () => fetchEnrollmentDashboard(),
    placeholderData: keepPreviousData,
  });
};

/** 
 * GET /enrollments/{enrollment_id}
 * 수강 상세 조회 
 */
export const useEnrollmentDetailQuery = (enrollment_id: number) => {
  return useQuery({
    queryKey: ['enrollmentDetail', enrollment_id],
    queryFn: () => fetchEnrollmentDetail(enrollment_id),
    placeholderData: keepPreviousData,
  });
};

/**
 * POST /enrollments/progress
 * 학습 진행 생성
 */
export const useCreateEnrollmentProgressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bodyData: EnrollmentProgressBodyData) => 
      createEnrollmentProgress(bodyData),
    onSuccess: () => {
      // 학습 진행 생성 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['courseProgress'] });
      queryClient.invalidateQueries({ queryKey: ['lectureProgress'] });
      queryClient.invalidateQueries({ queryKey: ['enrollmentDetail'] });
    },
  });
};

/**
 * PATCH /enrollments/progress/lecture/{lecture_id}
 * 학습 진행 상황 업데이트
 */
export const useUpdateLectureProgressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lecture_id, bodyData }: { 
      lecture_id: number; 
      bodyData: LectureProgressBodyData 
    }) => updateLectureProgress(lecture_id, bodyData),
    onSuccess: (_, variables) => {
      // 강의 진행 업데이트 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ 
        queryKey: ['lectureProgress', variables.lecture_id] 
      });
      queryClient.invalidateQueries({ queryKey: ['courseProgress'] });
      queryClient.invalidateQueries({ queryKey: ['enrollmentDetail'] });
      queryClient.invalidateQueries({ queryKey: ['myEnrollments'] });
    },
  });
};

/**
 * GET /enrollments/progress/course/{course_id}
 * 강의별 학습 진행 조회
 */
export const useCourseProgressQuery = (course_id: number) => {
  return useQuery({
    queryKey: ['courseProgress', course_id],
    queryFn: () => fetchCourseProgress(course_id),
    enabled: !!course_id,
  });
};

/**
 * GET /enrollments/progress/lecture/{lecture_id}
 * 강의 진행 상황 조회
 */
export const useLectureProgressQuery = (lecture_id: number) => {
  return useQuery({
    queryKey: ['lectureProgress', lecture_id],
    queryFn: () => fetchLectureProgress(lecture_id),
    enabled: !!lecture_id,
  });
};
