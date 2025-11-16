import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EnrollmentProgressBodyData, LectureProgressBodyData, MyEnrollmentsApiParams } from "../types/CourseType";
import { createEnrollmentProgress, fetchCourseProgress, fetchEnrollmentDashboard, fetchEnrollmentDetail, fetchLectureProgress, fetchMyEnrollments, postEnrollments, updateLectureProgress } from "../api/enrollmentsApi";

const useToken = () => localStorage.getItem('accessToken');

/**
 * POST /enrollments
 * 수강 등록
 */
export const useEnrollmentMutation = () => {
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course_id: number) => {
      if (!token) throw new Error('로그인이 필요합니다');
      return postEnrollments(course_id);
    },
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
export const useMyEnrollmentQuery = (params: MyEnrollmentsApiParams) => {
  const token = useToken();

  return useQuery({
    queryKey: ['myEnrollments', params],
    queryFn: () => fetchMyEnrollments(params),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};

/** 
 * GET /enrollments/dashboard 
 * 학습자 대시보드 조회 
 */
export const useEnrollmentDashboardQuery = () => {
  const token = useToken();

  return useQuery({
    queryKey: ['enrollmentDashboard'],
    queryFn: () => fetchEnrollmentDashboard(),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};

/** 
 * GET /enrollments/{enrollment_id}
 * 수강 상세 조회 
 */
export const useEnrollmentDetailQuery = (enrollment_id: number) => {
  const token = useToken();

  return useQuery({
    queryKey: ['enrollmentDetail', enrollment_id],
    queryFn: () => fetchEnrollmentDetail(enrollment_id),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};

/**
 * POST /enrollments/progress
 * 학습 진행 생성
 */
export const useCreateEnrollmentProgressMutation = () => {
  const queryClient = useQueryClient();
  const token = useToken();

  return useMutation({
    mutationFn: (bodyData: EnrollmentProgressBodyData) => {
      if (!token) throw new Error('로그인이 필요합니다');
      return createEnrollmentProgress(bodyData);
    },
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
  const token = useToken();

  return useMutation({
    mutationFn: ({ lecture_id, bodyData }: { 
      lecture_id: number; 
      bodyData: LectureProgressBodyData 
    }) => {
      if (!token) throw new Error('로그인이 필요합니다');
      return updateLectureProgress(lecture_id, bodyData)
    },
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
  const token = useToken();

  return useQuery({
    queryKey: ['courseProgress', course_id],
    queryFn: () => fetchCourseProgress(course_id),
    enabled: !!token && !!course_id,
  });
};

/**
 * GET /enrollments/progress/lecture/{lecture_id}
 * 강의 진행 상황 조회
 */
export const useLectureProgressQuery = (lecture_id: number) => {
  const token = useToken();
  
  return useQuery({
    queryKey: ['lectureProgress', lecture_id],
    queryFn: () => fetchLectureProgress(lecture_id),
    enabled: !!token && !!lecture_id,
  });
};
