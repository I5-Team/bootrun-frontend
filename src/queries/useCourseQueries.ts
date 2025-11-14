// 관리자 - 강의 관리 훅 모음

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse, updateCourse, deleteCourse } from '../api/adminApi';
import type { CreateCourseRequest } from '../types/AdminCourseType';

/**
 * 강의 생성 Mutation 훅
 */
export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData: CreateCourseRequest) => createCourse(courseData),
    onSuccess: (data) => {
      console.log('강의 생성 성공:', data);
      // 강의 목록 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      console.error('강의 생성 실패:', error);
    },
  });
};

/**
 * 강의 수정 Mutation 훅
 */
export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, courseData }: { courseId: number; courseData: Partial<CreateCourseRequest> }) =>
      updateCourse(courseId, courseData),
    onSuccess: (data) => {
      console.log('강의 수정 성공:', data);
      // 강의 목록 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      console.error('강의 수정 실패:', error);
    },
  });
};

/**
 * 강의 삭제 Mutation 훅
 */
export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: (data) => {
      console.log('강의 삭제 성공:', data);
      // 강의 목록 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      console.error('강의 삭제 실패:', error);
    },
  });
};
