// 관리자 - 강의 영상 관리 훅 모음

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLecture, updateLecture } from '../api/adminApi';
import type { LectureRequest } from '../types/AdminCourseType';

/**
 * 강의 영상 생성 Mutation 훅
 */
export const useCreateLectureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      chapterId,
      lectureData,
    }: {
      courseId: number;
      chapterId: number;
      lectureData: LectureRequest;
    }) => createLecture(courseId, chapterId, lectureData),
    onSuccess: (data) => {
      console.log('강의 영상 생성 성공:', data);
      // 강의 목록 및 상세 정보 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', data.data.chapter_id] });
    },
    onError: (error) => {
      console.error('강의 영상 생성 실패:', error);
    },
  });
};

/**
 * 강의 영상 수정 Mutation 훅
 */
export const useUpdateLectureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      chapterId,
      lectureId,
      lectureData,
    }: {
      courseId: number;
      chapterId: number;
      lectureId: number;
      lectureData: LectureRequest;
    }) => updateLecture(courseId, chapterId, lectureId, lectureData),
    onSuccess: (data) => {
      console.log('강의 영상 수정 성공:', data);
      // 강의 목록 및 상세 정보 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', data.data.chapter_id] });
    },
    onError: (error) => {
      console.error('강의 영상 수정 실패:', error);
    },
  });
};
