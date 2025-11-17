import { useState, useCallback } from 'react';
import type { CourseApiParams } from '../../../types/AdminCourseType';

/**
 * 강의 필터/검색 상태 관리
 */
export const useLectureFilters = () => {
  // API 쿼리 파라미터 상태
  const [apiParams, setApiParams] = useState<CourseApiParams>({
    page: 1,
    page_size: 10,
    keyword: '',
    category_type: null,
    difficulty: null,
    is_published: null,
  });

  // 필터/검색 핸들러
  const handleFilterChange = useCallback((newFilters: Partial<CourseApiParams>) => {
    setApiParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1, // 필터 변경 시 1페이지로 리셋
    }));
  }, []);

  // 페이지 이동 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    setApiParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  }, []);

  return {
    apiParams,
    handleFilterChange,
    handlePageChange,
  };
};
