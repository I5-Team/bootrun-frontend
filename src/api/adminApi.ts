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
  UserDetail,
  UserListResponse,
} from '../types/AdminUserType';
import { getMockUserDetail, getMockUsers } from '../data/mockAdminUserData';
import { apiClient } from './client';

// 공통 API 지연 시간 (ms)
const API_DELAY = 100;

// 목업 데이터 사용 여부
const USE_MOCK_DATA = true;

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
  return simulateFetch(mockAdminStats, API_DELAY);
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
  return simulateFetch(mockDailyStats, API_DELAY);
};

/**
 * GET /admin/dashboard/revenue-stats
 * 일별 상세 매출 통계
 */
export const fetchRevenueStats = (
  params: DateRangeParams,
): Promise<RevenueStat[]> => {
  console.log('Fetching revenue stats with params:', params);
  return simulateFetch(mockRevenueStats, API_DELAY);
};

/**
 * GET /admin/dashboard/course-stats
 * 강의별 통계 (ProgressArea, TableArea용)
 */
export const fetchCourseStats = (
  params: CourseStatParams,
): Promise<CourseStat[]> => {
  console.log('Fetching course stats with params:', params);
  return simulateFetch(mockCourseStats, API_DELAY);
};

/**
 * GET /admin/dashboard/category-stats
 * 카테고리별 통계 (ProgressArea용)
 */
export const fetchCategoryStats = (): Promise<CategoryStat[]> => {
  return simulateFetch(mockCategoryStats, API_DELAY);
};

/**
 * GET /admin/dashboard/settings
 * 시스템 설정 조회
 */
export const fetchSettings = (): Promise<AdminSettings> => {
  return simulateFetch(mockAdminSettings, API_DELAY);
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
  return simulateFetch(updatedSettings, API_DELAY);
};


/** [GET] /admin/users - 사용자 목록 조회 (필터링, 페이지네이션)
 *
 * @description
 * 관리자 전용 사용자 목록 조회 API입니다.
 * 필터링 조건과 페이지네이션을 지원합니다.
 *
 * @response
 * 200 OK (정상 응답)
{
  "total": 0,
  "page": 0,
  "page_size": 0,
  "total_pages": 0,
  "items": [
    {
      "id": 0,
      "email": "string",
      "nickname": "string",
      "role": "string",
      "is_active": true,
      "total_enrollments": 0,
      "total_payments": 0,
      "total_spent": 0,
      "created_at": "2025-11-10T14:19:39.363Z",
      "last_login": "2025-11-10T14:19:39.363Z"
    }
  ]
}
 * === 위 영역만 편집하세요 ===
 *
 * 401 Unauthorized (인증 실패)
{
  "error": "UNAUTHORIZED",
  "detail": "인증이 필요합니다"
}
 *
 * 403 Forbidden (권한 없음)
{
  "error": "FORBIDDEN",
  "detail": "접근 권한이 없습니다"
}
 *
 * 422 Unprocessable Entity (유효성 검사 오류)
{
  "error": "VALIDATION_ERROR",
  "detail": "입력값이 올바르지 않습니다",
  "errors": [
    {
      "loc": ["body", "email"],
      "msg": "유효한 이메일 주소를 입력하세요",
      "type": "value_error.email"
    }
  ],
  "path": "/api/users/register"
}
 *
 * 500 Internal Server Error (서버 오류)
{
  "error": "INTERNAL_SERVER_ERROR",
  "detail": "서버 오류가 발생했습니다"
}
 */
export const fetchUsers = async(
  params: UserApiParams,
): Promise<UserListResponse> => {

  if(USE_MOCK_DATA) {
  // 목업 데이터 함수를 호출하여 실제 필터링/페이지네이션 흉내
const data = getMockUsers(params);
  return simulateFetch(data, API_DELAY);
  } else {
  const response = await apiClient.get<UserListResponse>('/admin/users', { params });
  return response.data;
  }  
};





/** 
 * PATCH /admin/users/{user_id}/activate
 * 사용자 활성화
 */
export const activateUser = async (userId: number): Promise<{ message: string }> => {
  if(USE_MOCK_DATA) {
  console.log(`[Mock API] 사용자 ${userId} 활성화`);
  return simulateFetch({ message: '사용자 활성화 완료' }, API_DELAY);
  } else {
    const response = await apiClient.patch<{ message: string }>(`/admin/users/${userId}/activate`);
    return response.data;
  }
};

/**
 * PATCH /admin/users/{user_id}/deactivate
 * 사용자 비활성화
 */
export const deactivateUser = async(userId: number): Promise<{ message: string }> => {
  if(USE_MOCK_DATA) {
  console.log(`[Mock API] 사용자 ${userId} 비활성화`);
  return simulateFetch({ message: '사용자 비활성화 완료' }, API_DELAY);
  } else {
    const response = await apiClient.patch<{ message: string }>(`/admin/users/${userId}/deactivate`);
    return response.data;
  }
};

/**
 * GET /admin/users/{user_id}
 * 특정 사용자 상세 정보 조회
 */
export const fetchUserDetail = (userId: number): Promise<UserDetail> => {
  console.log(`[Mock API] 사용자 ${userId} 상세 정보 조회`);
  
  // ▼▼▼ 2. 수정: 동적 생성 함수 호출 ▼▼▼
  const data = getMockUserDetail(userId);

  if (!data) {
    // 사용자를 찾지 못한 경우 404 에러 시뮬레이션
    return new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('USER_NOT_FOUND')),
        300
      )
    );
  }
  
  return simulateFetch(data, 400);
  
};




// 아래는 Swagger 문서에서 가져온 응답 예시 입니다. 참고용으로 남겨두세요. --------------------------
/**
 * [GET]  /admin/users
 * 사용자 목록 조회 (필터링, 페이지네이션)
 *
 * @description
 * 관리자 전용 사용자 목록 조회 API입니다.
 * 필터링 조건과 페이지네이션을 지원합니다.
 *
 * @response
 * 200 OK (정상 응답)
 * === 아래 영역에 Swagger 예시 JSON 그대로 붙여넣기 ===
{
  (예시 응답)
}
 * === 위 영역만 편집하세요 ===
 *
 * 401 Unauthorized (인증 실패)
{
  (예시 응답)
}
 *
 * 403 Forbidden (권한 없음)
{
  (예시 응답)
}
 *
 * 422 Unprocessable Entity (유효성 검사 오류)
{
  (예시 응답)
}
 *
 * 500 Internal Server Error (서버 오류)
{
  (예시 응답)
}
 */

// 다음은 각 CRUD 예시 템플릿입니다. 필요에 따라 주석 해제 후 사용하세요. --------------------------
  // GET 예시
  // 목록 조회 (필터링, 페이지네이션)
  // export const fetch목록 = async(
  //   params: 목록ApiParams,
  // ): Promise<목록ListResponse> => {
  // if(USE_MOCK_DATA) {
  // // 목업 데이터 함수를 호출하여 실제 필터링/페이지네이션 흉내
  // const data = getMock목록s(params);
  // return simulateFetch(data, API_DELAY);
  // } else {
  // const response = await apiClient.get<목록ListResponse>('/admin/목록s', { params });
  // return response.data;
  // }  
  // };

  // PATCH 예시
  // 특정 항목 수정
  // export const update항목 = async(
  //   항목Id: number,
  //   updateData: Partial<항목Type>,
  // ): Promise<항목Type> => {
  // if(USE_MOCK_DATA) {
  // console.log(`[Mock API] 항목 ${항목Id} 수정`, updateData);
  // return simulateFetch({ ...mock항목Data, ...updateData }, API_DELAY);
  // } else {
  // const response = await apiClient.patch<항목Type>(`/admin/항목s/${항목Id}`, updateData);
  // return response.data;
  // }
  // };

  // POST 예시
  // 특정 항목 생성
  // export const create항목 = async(
  //   createData: New항목Type,
  // ): Promise<항목Type> => {
  // if(USE_MOCK_DATA) {
  // console.log('[Mock API] 항목 생성', createData);
  // return simulateFetch({ id: newId, ...createData }, API_DELAY);
  // } else {
  // const response = await apiClient.post<항목Type>(`/admin/항목s`, createData);
  // return response.data;
  // }
  // };

  // DELETE 예시
  // 특정 항목 삭제
  // export const delete항목 = async(
  //   항목Id: number,
  // ): Promise<{ message: string }> => {
  // if(USE_MOCK_DATA) {
  // console.log(`[Mock API] 항목 ${항목Id} 삭제`);
  // return simulateFetch({ message: '항목 삭제 완료' }, API_DELAY);
  // } else {
  // const response = await apiClient.delete<{ message: string }>(`/admin/항목s/${항목Id}`);
  // return response.data;
  // }
  // };
  // ----------------------------------------------------------------------------------------
  