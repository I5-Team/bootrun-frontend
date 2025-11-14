import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardStats,
  fetchDailyStats,
  fetchCourseStats,
  fetchCategoryStats,
  fetchRevenueStats,
} from '../api/adminApi';
import type { DateRangeParams, CourseStatParams } from '../types/AdminType';

/**
 * 대시보드 상단 통계 카드 데이터 조회
 * (오늘 접속자 수, 조회수, 결제액)
 */
export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => fetchDashboardStats(),
  });
};

/**
 * 대시보드 일별 통계 데이터 조회
 * (차트용 데이터: 7일치 접속, 조회, 매출)
 */
export const useDailyStatsQuery = (params: DateRangeParams) => {
  return useQuery({
    queryKey: ['dailyStats', params],
    queryFn: () => fetchDailyStats(params),
  });
};

/**
 * 대시보드 강의별 통계 데이터 조회
 * (진도율, 완료율 등)
 */
export const useCourseStatsQuery = (params: CourseStatParams) => {
  return useQuery({
    queryKey: ['courseStats', params],
    queryFn: () => fetchCourseStats(params),
  });
};

/**
 * 대시보드 카테고리별 통계 데이터 조회
 * (카테고리별 진도율)
 */
export const useCategoryStatsQuery = () => {
  return useQuery({
    queryKey: ['categoryStats'],
    queryFn: () => fetchCategoryStats(),
  });
};

// - [ ] [ ] [ ] 3. GET /admin/dashboard/revenue-stats - 매출 통계 [필수]
export const useRevenueStatsQuery = (params: DateRangeParams) => {
  return useQuery({
    queryKey: ['revenueStats', params],
    queryFn: () => fetchRevenueStats(params),
  });
};
