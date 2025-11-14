// 관리자 - 챕터 관리 훅 모음

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChapter, updateChapter, deleteChapter } from '../api/adminApi';
import type { ChapterRequest } from '../types/AdminCourseType';

/**
 * 챕터 생성 Mutation 훅
 */
export const useCreateChapterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, chapterData }: { courseId: number; chapterData: ChapterRequest }) =>
      createChapter(courseId, chapterData),
    onSuccess: (data) => {
      console.log('챕터 생성 성공:', data);
      // 강의 목록 및 상세 정보 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', data.data.course_id] });
    },
    onError: (error) => {
      console.error('챕터 생성 실패:', error);
    },
  });
};

/**
 * 챕터 수정 Mutation 훅
 */
export const useUpdateChapterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      chapterId,
      chapterData,
    }: {
      courseId: number;
      chapterId: number;
      chapterData: ChapterRequest;
    }) => updateChapter(courseId, chapterId, chapterData),
    onSuccess: (data) => {
      console.log('챕터 수정 성공:', data);
      // 강의 목록 및 상세 정보 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', data.data.course_id] });
    },
    onError: (error) => {
      console.error('챕터 수정 실패:', error);
    },
  });
};

/**
 * 챕터 삭제 Mutation 훅
 */
export const useDeleteChapterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, chapterId }: { courseId: number; chapterId: number }) =>
      deleteChapter(courseId, chapterId),
    onSuccess: () => {
      console.log('챕터 삭제 성공');
      // 강의 목록 및 상세 정보 쿼리 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      console.error('챕터 삭제 실패:', error);
    },
  });
};
