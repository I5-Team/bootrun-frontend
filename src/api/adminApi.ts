import type {
  AdminStats,
  DailyStat,
  RevenueStat,
  CourseStat,
  CategoryStat,
  AdminSettings,
  DateRangeParams,
  CourseStatParams,
} from '../types/AdminType';

import {
  mockAdminStats,
  mockDailyStats,
  mockRevenueStats,
  mockCourseStats,
  mockCategoryStats,
  mockAdminSettings,
} from '../data/mockAdminData';

import type {
  UserApiParams,
  UserListResponse,
} from '../types/AdminUserType';
import { getMockUsers } from '../data/mockAdminUserData';

// 공통 API 지연 시간 (ms)
const API_DELAY = 500;

/**
 * API 호출을 시뮬레이션하는 래퍼
 * @param data 반환할 목업 데이터
 * @param delay 지연 시간
 */
const simulateFetch = <T>(data: T, delay: number = API_DELAY): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// --- API 함수들 ---

/**
 * GET /admin/dashboard/stats
 * 대시보드 상단 카드 통계 조회
 */
export const fetchDashboardStats = (): Promise<AdminStats> => {
  // StatsCardArea에서 사용할 데이터:
  // today_visitors, today_views, today_revenue
  // (참고: new_users는 daily-stats에서 가져와야 함)
  return simulateFetch(mockAdminStats, 300);
};

/**
 * GET /admin/dashboard/daily-stats
 * 일별 접속, 조회, 매출 통계 (ChartArea용)
 * (참고: '신규 회원 수' 카드 데이터도 여기서 가져옴)
 */
export const fetchDailyStats = (
  params: DateRangeParams,
): Promise<DailyStat[]> => {
  console.log('Fetching daily stats with params:', params);
  // TODO: 실제 API 연결 시 params에 따라 mockDailyStats 필터링
  return simulateFetch(mockDailyStats, 800);
};

/**
 * GET /admin/dashboard/revenue-stats
 * 일별 상세 매출 통계
 */
export const fetchRevenueStats = (
  params: DateRangeParams,
): Promise<RevenueStat[]> => {
  console.log('Fetching revenue stats with params:', params);
  return simulateFetch(mockRevenueStats, 1000);
};

/**
 * GET /admin/dashboard/course-stats
 * 강의별 통계 (ProgressArea, TableArea용)
 */
export const fetchCourseStats = (
  params: CourseStatParams,
): Promise<CourseStat[]> => {
  console.log('Fetching course stats with params:', params);
  return simulateFetch(mockCourseStats, 1200);
};

/**
 * GET /admin/dashboard/category-stats
 * 카테고리별 통계 (ProgressArea용)
 */
export const fetchCategoryStats = (): Promise<CategoryStat[]> => {
  return simulateFetch(mockCategoryStats, 900);
};

/**
 * GET /admin/dashboard/settings
 * 시스템 설정 조회
 */
export const fetchSettings = (): Promise<AdminSettings> => {
  return simulateFetch(mockAdminSettings, 400);
};

/**
 * PUT /admin/dashboard/settings
 * 시스템 설정 수정
 */
export const updateSettings = (
  newSettings: Partial<AdminSettings>,
): Promise<AdminSettings> => {
  console.log('Updating settings:', newSettings);
  // 실제로는 mockAdminSettings를 업데이트해야 함
  const updatedSettings = { ...mockAdminSettings, ...newSettings };
  return simulateFetch(updatedSettings, 600);
};


/**
 * GET /admin/users
 * 사용자 목록 조회 (필터링, 페이지네이션)
 */
export const fetchUsers = (
  params: UserApiParams,
): Promise<UserListResponse> => {
  // 목업 데이터 함수를 호출하여 실제 필터링/페이지네이션 흉내
  const data = getMockUsers(params);
  return simulateFetch(data, 500);
};

/**
 * PATCH /admin/users/{user_id}/activate
 * 사용자 활성화
 */
export const activateUser = (userId: number): Promise<{ message: string }> => {
  console.log(`[Mock API] 사용자 ${userId} 활성화`);
  return simulateFetch({ message: '사용자 활성화 완료' }, 300);
};

/**
 * PATCH /admin/users/{user_id}/deactivate
 * 사용자 비활성화
 */
export const deactivateUser = (userId: number): Promise<{ message: string }> => {
  console.log(`[Mock API] 사용자 ${userId} 비활성화`);
  return simulateFetch({ message: '사용자 비활성화 완료' }, 300);
};