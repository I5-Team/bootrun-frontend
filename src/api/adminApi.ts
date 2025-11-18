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
  mockRevenueStats1Day,
  mockRevenueStats7Days,
  mockRevenueStats30Days,
  mockRevenueStats365Days,
  mockCourseStats,
  mockCategoryStats,
  mockAdminSettings,
} from '../data/mockAdminData';

import type { UserApiParams, UserDetail, UserListResponse } from '../types/AdminUserType';
import { getMockUserDetail, getMockUsers } from '../data/mockAdminUserData';

import type {
  CourseApiParams,
  CourseListResponse,
  CreateCourseRequest,
  CourseResponse,
  Chapter,
  ChapterRequest,
  ChapterResponse,
  Lecture,
  LectureRequest,
  LectureResponse,
} from '../types/AdminCourseType';
import { getPaginatedCourses } from '../data/mockAdminCourseData';

import type {
  PaymentApiParams,
  PaymentListResponse,
  RefundApiParams,
  RefundListResponse,
  RefundDetail,
} from '../types/AdminPaymentType';
import { getPaginatedPayments } from '../data/mockPaymentData';

import { apiClient } from './client';
import { API_URL } from '../constants/apiConfig';

// 공통 API 지연 시간 (ms)
const API_DELAY = 100;

// 목업 데이터 사용 여부 (환경변수로 제어)
// VITE_USE_MOCK_DATA=true 또는 미설정 → Mock 데이터 사용
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// 관리자 대시보드 페이지만 목업 데이터 사용
const USE_MOCK_DATA_DASHBOARD = true;

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
export const fetchDashboardStats = async (): Promise<AdminStats> => {
  if (USE_MOCK_DATA_DASHBOARD) {
    return simulateFetch(mockAdminStats, API_DELAY);
  }

  try {
    const response = await apiClient.get<{ success: boolean; message: string; data: AdminStats }>(
      API_URL.ADMIN_DASHBOARD.DASHBOARD_STATS
    );

    // 응답 래퍼에서 data 필드 추출
    return response.data.data;
  } catch (error) {
    console.error('GET /admin/dashboard/stats API Error:', error);
    return simulateFetch(mockAdminStats, API_DELAY);
  }
};

/**
 * GET /admin/dashboard/daily-stats
 * 일별 접속, 조회, 매출 통계 (ChartArea용)
 * (참고: '신규 회원 수' 카드 데이터도 여기서 가져옴)
 */
export const fetchDailyStats = async (params: DateRangeParams): Promise<DailyStat[]> => {
  if (USE_MOCK_DATA_DASHBOARD) {
    return simulateFetch(mockDailyStats, API_DELAY);
  }

  try {
    const response = await apiClient.get<DailyStat[]>('/admin/dashboard/daily-stats', { params });
    return response.data;
  } catch (error) {
    console.error('GET /admin/dashboard/daily-stats API Error:', error);
    return simulateFetch(mockDailyStats, API_DELAY);
  }
};

/**
 * GET /admin/dashboard/revenue-stats
 * 일별 상세 매출 통계
 */
export const fetchRevenueStats = async (params: DateRangeParams): Promise<RevenueStat[]> => {
  if (USE_MOCK_DATA_DASHBOARD) {
    console.log('MOCK data for revenue stats');
    if (params.start_date && params.end_date) {
      const filtered = mockRevenueStats365Days.filter(
        (stat) => stat.date >= params.start_date! && stat.date <= params.end_date!
      );
      return simulateFetch(filtered, API_DELAY);
    }

    // period에 따라 다른 모의 데이터 반환
    if (params.period === 'day') {
      return simulateFetch(mockRevenueStats1Day, API_DELAY);
    } else if (params.period === 'week') {
      return simulateFetch(mockRevenueStats7Days, API_DELAY);
    } else if (params.period === 'month') {
      return simulateFetch(mockRevenueStats30Days, API_DELAY);
    } else if (params.period === 'year') {
      return simulateFetch(mockRevenueStats365Days, API_DELAY);
    }

    // 기본값: 주간 데이터
    return simulateFetch(mockRevenueStats7Days, API_DELAY);
  }

  try {
    // 빈 문자열 제거
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );
    const response = await apiClient.get<RevenueStat[]>('/admin/dashboard/revenue-stats', {
      params: cleanParams,
    });
    return response.data;
  } catch (error) {
    console.error('GET /admin/dashboard/revenue-stats API Error:', error);
    // 폴백: Mock 데이터 사용
    if (params.start_date && params.end_date) {
      const filtered = mockRevenueStats365Days.filter(
        (stat) => stat.date >= params.start_date! && stat.date <= params.end_date!
      );
      return simulateFetch(filtered, API_DELAY);
    }

    if (params.period === 'day') {
      return simulateFetch(mockRevenueStats1Day, API_DELAY);
    } else if (params.period === 'week') {
      return simulateFetch(mockRevenueStats7Days, API_DELAY);
    } else if (params.period === 'month') {
      return simulateFetch(mockRevenueStats30Days, API_DELAY);
    } else if (params.period === 'year') {
      return simulateFetch(mockRevenueStats365Days, API_DELAY);
    }

    return simulateFetch(mockRevenueStats7Days, API_DELAY);
  }
};

/**
 * GET /admin/dashboard/course-stats
 * 강의별 통계 (ProgressArea, TableArea용)
 */
export const fetchCourseStats = async (params: CourseStatParams): Promise<CourseStat[]> => {
  if (USE_MOCK_DATA_DASHBOARD) {
    return simulateFetch(mockCourseStats, API_DELAY);
  }

  try {
    const response = await apiClient.get<CourseStat[]>('/admin/dashboard/course-stats', { params });
    return response.data;
  } catch (error) {
    console.error('GET /admin/dashboard/course-stats API Error:', error);
    return simulateFetch(mockCourseStats, API_DELAY);
  }
};

/**
 * GET /admin/dashboard/category-stats
 * 카테고리별 통계 (ProgressArea용)
 */
export const fetchCategoryStats = async (): Promise<CategoryStat[]> => {
  if (USE_MOCK_DATA_DASHBOARD) {
    return simulateFetch(mockCategoryStats, API_DELAY);
  }

  try {
    const response = await apiClient.get<CategoryStat[]>('/admin/dashboard/category-stats');
    return response.data;
  } catch (error) {
    console.error('GET /admin/dashboard/category-stats API Error:', error);
    return simulateFetch(mockCategoryStats, API_DELAY);
  }
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
export const updateSettings = (newSettings: Partial<AdminSettings>): Promise<AdminSettings> => {
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
/**
 * GET /admin/users
 * 사용자 목록 조회 (필터링, 페이지네이션)
 *
 * @param params - page, page_size, role, is_active, keyword, start_date, end_date
 * @response 200 OK
 * {
 *   "total": 12,
 *   "page": 1,
 *   "page_size": 20,
 *   "total_pages": 1,
 *   "items": [
 *     {
 *       "id": 13,
 *       "email": "test05@test.com",
 *       "nickname": "김밥",
 *       "role": "student",
 *       "is_active": false,
 *       "total_enrollments": 0,
 *       "total_payments": 0,
 *       "total_spent": 0,
 *       "created_at": "2025-11-15T16:44:50.710281",
 *       "last_login": "2025-11-15T16:46:07.899195"
 *     }
 *   ]
 * }
 */
export const fetchUsers = async (params: UserApiParams): Promise<UserListResponse> => {
  if (USE_MOCK_DATA) {
    const data = getMockUsers(params);
    return simulateFetch(data, API_DELAY);
  }

  try {
    // null이거나 빈 문자열인 파라미터 제거
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );

    const response = await apiClient.get<UserListResponse>(API_URL.ADMIN_USERS.USER_LIST, {
      params: cleanParams,
    });
    return response.data;
  } catch (error) {
    console.error('GET /admin/users API Error:', error);
    throw error;
  }
};

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

/**
 * GET /admin/users/{user_id}
 * 특정 사용자 상세 정보 조회
 *
 * @param userId - 사용자 ID
 * @response 200 OK (정상 응답)
 * {
 *   "id": 13,
 *   "email": "test05@test.com",
 *   "nickname": "김밥",
 *   "gender": "female",
 *   "birth_date": "1990-01-15",
 *   "role": "student",
 *   "is_active": false,
 *   "provider": "email",
 *   "created_at": "2025-11-15T16:44:50.710281",
 *   "last_login": "2025-11-15T16:46:07.899195",
 *   "total_study_time": 3600,
 *   "total_enrollments": 2,
 *   "active_enrollments": 1,
 *   "completed_courses": 1,
 *   "avg_progress_rate": 75,
 *   "total_payments": 100000,
 *   "total_spent": 100000,
 *   "total_refunds": 0,
 *   "total_questions": 5,
 *   "total_comments": 10,
 *   "enrollments": []
 * }
 */
export const fetchUserDetail = async (userId: number): Promise<UserDetail> => {
  if (USE_MOCK_DATA) {
    const data = getMockUserDetail(userId);

    if (!data) {
      // 사용자를 찾지 못한 경우 404 에러 시뮬레이션
      return new Promise((_, reject) => setTimeout(() => reject(new Error('USER_NOT_FOUND')), 300));
    }

    return simulateFetch(data, API_DELAY);
  }

  try {
    // 백엔드 응답 형식: { success: boolean; message: string | null; data: UserDetail }
    const response = await apiClient.get<{
      success: boolean;
      message: string | null;
      data: UserDetail;
    }>(API_URL.ADMIN_USERS.USER_DETAIL(userId));

    // data 필드만 추출해서 반환
    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid API response: missing data field');
  } catch (error) {
    console.error('GET /admin/users/{user_id} API Error:', error);
    const data = getMockUserDetail(userId);

    if (!data) {
      throw new Error('USER_NOT_FOUND');
    }

    return simulateFetch(data, API_DELAY);
  }
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

// --- 관리자 강의 관리 API ---

/**
 * GET /admin/courses
 * 강의 목록 조회 (필터링, 페이지네이션)
 */
export const fetchCourses = async (params: CourseApiParams): Promise<CourseListResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터 사용 - getPaginatedCourses는 이미 필터링/페이지네이션 처리함
    const response = getPaginatedCourses(params.page, params.page_size, {
      keyword: params.keyword,
      category_type: params.category_type,
      difficulty: params.difficulty,
      is_published: params.is_published,
    });
    return simulateFetch(response, API_DELAY);
  }

  try {
    // null 값 필터링: null인 필드는 쿼리 파라미터에서 제외
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanParams: Record<string, any> = {
      page: params.page,
      page_size: params.page_size,
    };

    // 선택적 필터 - 값이 있을 떄만 추가
    if (params.keyword) cleanParams.keyword = params.keyword;
    if (params.category_type !== null && params.category_type !== undefined) {
      cleanParams.category_type = params.category_type;
    }
    if (params.difficulty !== null && params.difficulty !== undefined) {
      cleanParams.difficulty = params.difficulty;
    }
    if (params.is_published !== null && params.is_published !== undefined) {
      cleanParams.is_published = params.is_published;
    }

    // 실제 API 호출
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: CourseListResponse;
    }>(API_URL.ADMIN_COURSES.COURSE_LIST, {
      params: cleanParams,
    });
    // 응답 래퍼에서 data 필드 추출

    return response.data.data;
  } catch (error) {
    console.error('GET /admin/courses API Error:', error);
    // API 에러 시 Mock 데이터 폴백
    const fallback = getPaginatedCourses(params.page, params.page_size, {
      keyword: params.keyword,
      category_type: params.category_type,
      difficulty: params.difficulty,
      is_published: params.is_published,
    });
    return simulateFetch(fallback, API_DELAY);
  }
};

/**
 * GET /admin/courses/{course_id}
 * 강의 상세 조회
 *
 * @param courseId - 강의 ID
 * @response
 * 200 OK (강의 상세 조회 성공)
 * {
 *   "success": true,
 *   "message": "string",
 *   "data": {
 *     "id": 0,
 *     "category_type": "frontend",
 *     "course_type": "vod",
 *     "title": "string",
 *     "description": "string",
 *     "thumbnail_url": "string",
 *     "instructor_name": "string",
 *     "instructor_bio": "string",
 *     "instructor_image": "string",
 *     "price_type": "free",
 *     "price": 0,
 *     "difficulty": "beginner",
 *     "total_duration": 0,
 *     "faq": "string",
 *     "is_published": true,
 *     "enrollment_count": 0,
 *     "created_at": "2025-11-13T16:38:40.760Z",
 *     "updated_at": "2025-11-13T16:38:40.760Z"
 *   }
 * }
 */
export const fetchCourseDetail = async (courseId: number): Promise<CourseResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터에서 조회
    const { mockCourses } = await import('../data/mockAdminCourseData');
    const course = mockCourses.find((c) => c.id === courseId);

    if (!course) {
      console.error(`GET /admin/courses/{course_id} Course not found: ${courseId}`);
      throw new Error(`강의를 찾을 수 없습니다 (ID: ${courseId})`);
    }

    // CourseResponse 형식으로 변환 (타입 안전성 유지)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const courseData = course as any;
    const response: CourseResponse = {
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      category_type: courseData.category_type,
      course_type: courseData.course_type,
      difficulty: courseData.difficulty,
      price_type: courseData.price_type,
      price: courseData.price,
      thumbnail_url: courseData.thumbnail_url,
      instructor_name: courseData.instructor_name,
      instructor_bio: courseData.instructor_bio,
      instructor_description: courseData.instructor_description || '',
      instructor_image: courseData.instructor_image,
      // 수강 관련
      access_duration_days: courseData.access_duration_days || 365,
      max_students: courseData.max_students || 0,
      recruitment_start_date: courseData.recruitment_start_date || '',
      recruitment_end_date: courseData.recruitment_end_date || '',
      course_start_date: courseData.course_start_date || '',
      course_end_date: courseData.course_end_date || '',
      // 기타
      student_reviews: courseData.student_reviews || '[]',
      faq: courseData.faq || '[]',
      is_published: courseData.is_published,
      // 자동 계산
      total_duration: courseData.total_duration || 0,
      enrollment_count: courseData.enrollment_count || 0,
      created_at: courseData.created_at,
      updated_at: courseData.updated_at,
    };
    return simulateFetch(response, API_DELAY);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiClient.get<any>(API_URL.ADMIN_COURSES.COURSE_DETAIL(courseId));
    // API 응답이 { success, message, data: CourseResponse } 형태이므로 data 필드 추출
    return response.data.data as CourseResponse;
  } catch (error) {
    console.error('GET /admin/courses/{course_id} API Error:', error);
    throw error;
  }
};

/**
 * POST /admin/courses
 * 강의 생성
 *
 * @response
 * 201 Created (강의 생성 성공)
{
  "id": 0,
  "category_type": "frontend",
  "course_type": "vod",
  "title": "string",
  "description": "string",
  "thumbnail_url": "string",
  "instructor_name": "string",
  "instructor_bio": "string",
  "instructor_image": "string",
  "price_type": "free",
  "price": 0,
  "difficulty": "beginner",
  "total_duration": 0,
  "faq": "string",
  "is_published": true,
  "enrollment_count": 0,
  "created_at": "2025-11-13T08:40:06.489Z",
  "updated_at": "2025-11-13T08:40:06.489Z"
}
 */
export const createCourse = async (courseData: CreateCourseRequest): Promise<CourseResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터 생성
    const mockResponse = {
      id: Math.floor(Math.random() * 1000),
      ...courseData,
      is_published: courseData.is_published ?? false,
      total_duration: 0,
      enrollment_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.post(API_URL.ADMIN_COURSES.CREATE_COURSE, courseData);
    // 백엔드가 { success, message, data } 형식으로 반환하는 경우 data 추출
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: unknown; status?: number } };
    console.error('POST /admin/courses API Error:', error);
    console.error('Error response:', axiosError.response?.data);
    console.error('Error status:', axiosError.response?.status);
    throw error;
  }
};

/**
 * PATCH /admin/courses/{course_id}
 * 강의 수정
 *
 * @response
 * 200 OK (강의 수정 성공)
{
  "id": 0,
  "category_type": "frontend",
  "course_type": "vod",
  "title": "string",
  "description": "string",
  "thumbnail_url": "string",
  "instructor_name": "string",
  "instructor_bio": "string",
  "instructor_image": "string",
  "price_type": "free",
  "price": 0,
  "difficulty": "beginner",
  "total_duration": 0,
  "faq": "string",
  "is_published": true,
  "enrollment_count": 0,
  "created_at": "2025-11-13T09:13:01.971Z",
  "updated_at": "2025-11-13T09:13:01.971Z"
}
 */
export const updateCourse = async (
  courseId: number,
  courseData: Partial<CreateCourseRequest>
): Promise<CourseResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터 생성
    const mockResponse: CourseResponse = {
      id: courseId,
      category_type: courseData.category_type || '',
      course_type: courseData.course_type || '',
      title: courseData.title || '',
      description: courseData.description || '',
      thumbnail_url: courseData.thumbnail_url || '',
      instructor_name: courseData.instructor_name || '',
      instructor_bio: courseData.instructor_bio || '',
      instructor_description: courseData.instructor_description || '',
      instructor_image: courseData.instructor_image || '',
      price_type: courseData.price_type || '',
      price: courseData.price || 0,
      difficulty: courseData.difficulty || '',
      access_duration_days: courseData.access_duration_days || 365,
      max_students: courseData.max_students || 0,
      recruitment_start_date: courseData.recruitment_start_date || '',
      recruitment_end_date: courseData.recruitment_end_date || '',
      course_start_date: courseData.course_start_date || '',
      course_end_date: courseData.course_end_date || '',
      student_reviews: courseData.student_reviews || '[]',
      total_duration: 0,
      faq: courseData.faq || '',
      is_published: courseData.is_published ?? false,
      enrollment_count: 0,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1일 전
      updated_at: new Date().toISOString(),
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.patch(
      API_URL.ADMIN_COURSES.UPDATE_COURSE(courseId),
      courseData
    );
    return response.data;
  } catch (error) {
    console.error('PATCH /admin/courses/{course_id} API Error:', error);
    throw error;
  }
};

/**
 * DELETE /admin/courses/{course_id}
 * 강의 삭제
 *
 * @response
 * 200 OK (강의 삭제 성공)
{
  "message": "string",
  "detail": "string"
}
 */
export const deleteCourse = async (
  courseId: number
): Promise<{ message: string; detail?: string }> => {
  if (USE_MOCK_DATA) {
    const mockResponse = {
      message: '강의 삭제 완료',
      detail: `강의 ID ${courseId}가 성공적으로 삭제되었습니다.`,
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.delete(API_URL.ADMIN_COURSES.DELETE_COURSE(courseId));
    return response.data;
  } catch (error) {
    console.error('DELETE /admin/courses/{course_id} API Error:', error);
    throw error;
  }
};

/**
 * GET /admin/courses/{course_id}/chapters
 * 챕터 목록 조회
 *
 * @response 200 OK
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "course_id": 0,
      "title": "string",
      "description": "string",
      "order_number": 0,
      "total_duration": 0,
      "created_at": "2025-11-13T13:41:18.661Z",
      "updated_at": "2025-11-13T13:41:18.661Z"
    }
  ]
}
 */
export const fetchChapters = async (courseId: number): Promise<Chapter[]> => {
  if (USE_MOCK_DATA) {
    return simulateFetch([], API_DELAY); // Mock: 빈 배열 반환
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiClient.get<any>(API_URL.ADMIN_COURSES.GET_CHAPTERS(courseId));
    const chapters: Chapter[] = response.data.data || [];

    // 각 챕터의 강의 영상 목록 조회
    const chaptersWithLectures = await Promise.all(
      chapters.map(async (chapter) => {
        try {
          const lectures = await fetchLectures(courseId, chapter.id!);
          return { ...chapter, lectures };
        } catch (error) {
          console.error(`GET /admin/courses/{course_id}/chapters ${chapter.id}:`, error);
          return { ...chapter, lectures: [] };
        }
      })
    );

    return chaptersWithLectures;
  } catch (error) {
    console.error('GET /admin/courses/{course_id}/chapters API Error:', error);
    throw error;
  }
};

/**
 * POST /admin/courses/{course_id}/chapters
 * 챕터 생성
 *
 * @response 201 Created
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "course_id": 0,
    "title": "string",
    "description": "string",
    "order_number": 0,
    "total_duration": 0,
    "created_at": "2025-11-13T13:41:18.661Z",
    "updated_at": "2025-11-13T13:41:18.661Z"
  }
}
 */
export const createChapter = async (
  courseId: number,
  chapterData: ChapterRequest
): Promise<ChapterResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터 생성
    const mockChapter = {
      id: Math.floor(Math.random() * 10000),
      course_id: courseId,
      title: chapterData.title,
      description: chapterData.description,
      order_number: chapterData.order_number,
      total_duration: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const mockResponse: ChapterResponse = {
      success: true,
      message: '챕터가 성공적으로 생성되었습니다.',
      data: mockChapter,
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.post(API_URL.ADMIN_COURSES.ADD_CHAPTER(courseId), chapterData);
    return response.data;
  } catch (error) {
    console.error('POST /admin/courses/{course_id}/chapters API Error:', error);
    throw error;
  }
};

/**
 * PATCH /admin/courses/{course_id}/chapters/{chapter_id}
 * 챕터 수정
 *
 * @response 200 OK
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "course_id": 0,
    "title": "string",
    "description": "string",
    "order_number": 0,
    "total_duration": 0,
    "created_at": "2025-11-13T13:41:18.661Z",
    "updated_at": "2025-11-13T13:41:18.661Z"
  }
}
 */
export const updateChapter = async (
  courseId: number,
  chapterId: number,
  chapterData: ChapterRequest
): Promise<ChapterResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터 생성
    const mockChapter = {
      id: chapterId,
      course_id: courseId,
      title: chapterData.title,
      description: chapterData.description,
      order_number: chapterData.order_number,
      total_duration: 0,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1일 전
      updated_at: new Date().toISOString(),
    };
    const mockResponse: ChapterResponse = {
      success: true,
      message: '챕터가 성공적으로 수정되었습니다.',
      data: mockChapter,
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.patch(
      API_URL.ADMIN_COURSES.UPDATE_CHAPTER(courseId, chapterId),
      chapterData
    );
    return response.data;
  } catch (error) {
    console.error('PATCH /admin/courses/{course_id}/chapters/{chapter_id} API Error:', error);
    throw error;
  }
};

/**
 * GET /admin/courses/{course_id}/chapters/{chapter_id}/lectures
 * 강의 영상 목록 조회
 *
 * @response 200 OK
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "chapter_id": 0,
      "title": "string",
      "description": "string",
      "video_url": "string",
      "video_type": "vod",
      "duration_seconds": 0,
      "order_number": 0,
      "material_url": "string",
      "is_completed": true,
      "last_position": 0,
      "watched_seconds": 0,
      "created_at": "2025-11-13T07:08:22Z",
      "updated_at": "2025-11-13T07:08:22Z"
    }
  ]
}
 */
export const fetchLectures = async (courseId: number, chapterId: number): Promise<Lecture[]> => {
  if (USE_MOCK_DATA) {
    return simulateFetch([], API_DELAY); // Mock: 빈 배열 반환
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiClient.get<any>(
      API_URL.ADMIN_COURSES.GET_LECTURES(courseId, chapterId)
    );
    // API 응답이 { success, message, data: Lecture[] } 형태이므로 data 필드 추출
    return response.data.data || [];
  } catch (error) {
    console.error(
      'GET /admin/courses/{course_id}/chapters/{chapter_id}/lectures API Error:',
      error
    );
    throw error;
  }
};

/**
 * DELETE /admin/courses/{course_id}/chapters/{chapter_id}
 * 챕터 삭제
 *
 * @response 200 OK
{
  "success": true,
  "message": "string"
}
 */
export const deleteChapter = async (
  courseId: number,
  chapterId: number
): Promise<{ success: boolean; message: string }> => {
  if (USE_MOCK_DATA) {
    const mockResponse = {
      success: true,
      message: '챕터가 성공적으로 삭제되었습니다.',
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.delete(
      API_URL.ADMIN_COURSES.DELETE_CHAPTER(courseId, chapterId)
    );
    return response.data;
  } catch (error) {
    console.error('DELETE /admin/courses/{course_id}/chapters/{chapter_id} API Error:', error);
    throw error;
  }
};

/**
 * POST /admin/courses/{course_id}/chapters/{chapter_id}/lectures
 * 강의 영상 추가
 *
 * @response 201 Created
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "chapter_id": 0,
    "title": "string",
    "description": "string",
    "video_url": "string",
    "video_type": "vod",
    "duration_seconds": 0,
    "order_number": 0,
    "material_url": "string",
    "is_completed": true,
    "last_position": 0,
    "watched_seconds": 0,
    "created_at": "2025-11-13T07:08:22Z",
    "updated_at": "2025-11-13T07:08:22Z"
  }
}
 */
export const createLecture = async (
  courseId: number,
  chapterId: number,
  lectureData: LectureRequest
): Promise<LectureResponse> => {
  if (USE_MOCK_DATA) {
    // Mock 데이터 생성
    const mockLecture = {
      id: Math.floor(Math.random() * 10000),
      chapter_id: chapterId,
      title: lectureData.title,
      description: lectureData.description,
      video_url: lectureData.video_url,
      video_type: lectureData.video_type,
      duration_seconds: lectureData.duration_seconds,
      order_number: lectureData.order_number,
      material_url: lectureData.material_url,
      is_completed: false,
      last_position: 0,
      watched_seconds: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const mockResponse: LectureResponse = {
      success: true,
      message: '강의 영상이 성공적으로 생성되었습니다.',
      data: mockLecture,
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.post(
      API_URL.ADMIN_COURSES.ADD_LECTURE(courseId, chapterId),
      lectureData
    );

    return response.data;
  } catch (error) {
    console.error(
      'POST /admin/courses/{course_id}/chapters/{chapter_id}/lectures API Error:',
      error
    );
    throw error;
  }
};

/**
 * PATCH /admin/courses/{course_id}/chapters/{chapter_id}/lectures/{lecture_id}
 * 강의 영상 수정
 *
 * @response 200 OK
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "chapter_id": 0,
    "title": "string",
    "description": "string",
    "video_url": "string",
    "video_type": "vod",
    "duration_seconds": 0,
    "order_number": 0,
    "material_url": "string",
    "is_completed": true,
    "last_position": 0,
    "watched_seconds": 0,
    "created_at": "2025-11-13T07:08:22Z",
    "updated_at": "2025-11-13T07:08:22Z"
  }
}
 */
export const updateLecture = async (
  courseId: number,
  chapterId: number,
  lectureId: number,
  lectureData: LectureRequest
): Promise<LectureResponse> => {
  console.log(
    `강의 업데이트 - 강의 ID: ${lectureId} 챕터 ID: ${chapterId} 강의 ID: ${courseId}:`,
    lectureData
  );

  if (USE_MOCK_DATA) {
    // Mock 데이터 생성
    const mockLecture = {
      id: lectureId,
      chapter_id: chapterId,
      title: lectureData.title,
      description: lectureData.description,
      video_url: lectureData.video_url,
      video_type: lectureData.video_type,
      duration_seconds: lectureData.duration_seconds,
      order_number: lectureData.order_number,
      material_url: lectureData.material_url,
      is_completed: false,
      last_position: 0,
      watched_seconds: 0,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1일 전
      updated_at: new Date().toISOString(),
    };
    const mockResponse: LectureResponse = {
      success: true,
      message: '강의 영상이 성공적으로 수정되었습니다.',
      data: mockLecture,
    };
    return simulateFetch(mockResponse, API_DELAY);
  }

  try {
    const response = await apiClient.patch(
      API_URL.ADMIN_COURSES.UPDATE_LECTURE(courseId, chapterId, lectureId),
      lectureData
    );
    return response.data;
  } catch (error) {
    console.error(
      'PATCH /admin/courses/{course_id}/chapters/{chapter_id}/lectures/{lecture_id} API Error:',
      error
    );
    throw error;
  }
};

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

// --- 관리자 결제 관리 API ---

/**
 * GET /admin/payments
 * 결제 목록 조회 (필터링, 페이지네이션)
 *
 * @param params - page, page_size, keyword, payment_method, status, start_date, end_date, refund_status
 * @response 200 OK
 * {
 *   "total": 0,
 *   "page": 0,
 *   "page_size": 0,
 *   "total_pages": 0,
 *   "items": [
 *     {
 *       "id": 0,
 *       "transaction_id": "string",
 *       "user_id": 0,
 *       "user_nickname": "string",
 *       "user_email": "string",
 *       "course_id": 0,
 *       "course_title": "string",
 *       "amount": 0,
 *       "discount_amount": 0,
 *       "final_amount": 0,
 *       "payment_method": "string",
 *       "status": "string",
 *       "paid_at": "2025-11-15T18:55:10.119Z",
 *       "created_at": "2025-11-15T18:55:10.119Z"
 *     }
 *   ]
 * }
 */
export const fetchPayments = async (params: PaymentApiParams): Promise<PaymentListResponse> => {
  if (USE_MOCK_DATA) {
    const data = getPaginatedPayments(params);
    return simulateFetch(data, API_DELAY);
  }

  try {
    // null이거나 빈 문자열인 파라미터 제거
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );

    const response = await apiClient.get<PaymentListResponse>(API_URL.ADMIN_PAYMENTS.PAYMENT_LIST, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error('GET /admin/payments API Error:', error);

    const data = getPaginatedPayments(params);
    return simulateFetch(data, API_DELAY);
  }
};

/**
 * GET /admin/payments/refunds
 * 환불 목록 조회 (필터링, 페이지네이션)
 *
 * @param params - page, page_size, keyword, status, start_date, end_date
 * @response 200 OK
 * {
 *   "total": 2,
 *   "page": 1,
 *   "page_size": 20,
 *   "total_pages": 1,
 *   "items": [
 *     {
 *       "id": 3,
 *       "payment_id": 4,
 *       "transaction_id": "dd31a95e-eef2-403b-b57d-22f269c66f88",
 *       "user_id": 12,
 *       "user_nickname": "강미윤",
 *       "course_title": "string",
 *       "amount": 50000,
 *       "reason": "사유: 환불 요청 재테스트",
 *       "status": "approved",
 *       "payment_date": "2025-11-15T10:12:00.286888",
 *       "progress_rate": 0,
 *       "requested_at": "2025-11-15T15:45:09.829884",
 *       "processed_at": "2025-11-15T16:03:52.327462",
 *       "admin_note": "환불 조건 충족하여 승인 처리"
 *     }
 *   ]
 * }
 */
export const fetchRefunds = async (params: RefundApiParams): Promise<RefundListResponse> => {
  if (USE_MOCK_DATA) {
    // TODO: Mock 데이터 추가 필요 시 구현
    const mockData: RefundListResponse = {
      items: [],
      total: 0,
      page: params.page,
      page_size: params.page_size,
      total_pages: 0,
    };
    return simulateFetch(mockData, API_DELAY);
  }

  try {
    // null이거나 빈 문자열인 파라미터 제거
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );

    const response = await apiClient.get<RefundListResponse>(API_URL.ADMIN_PAYMENTS.REFUND_LIST, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error('GET /admin/payments/refunds API Error:', error);
    throw error;
  }
};

/**
 * GET /admin/payments/refunds/{refund_id}
 * 환불 상세 조회
 *
 * @param refundId - 환불 ID
 * @response 200 OK
 * {
 *   "success": true,
 *   "message": null,
 *   "data": {
 *     "id": 2,
 *     "payment_id": 3,
 *     "user_id": 12,
 *     "user_nickname": "강미윤",
 *     "amount": 50000,
 *     "reason": "사유: 환불 요청 테스트",
 *     "status": "approved",
 *     "admin_note": "환불 조건 충족하여 승인 처리",
 *     "requested_at": "2025-11-15T10:08:49.450238",
 *     "processed_at": "2025-11-15T10:10:49.713481",
 *     "payment_date": "2025-11-15T10:06:45.979162",
 *     "course_title": "string",
 *     "progress_rate": 0
 *   }
 * }
 */
export const fetchRefundDetail = async (refundId: number): Promise<RefundDetail> => {
  if (USE_MOCK_DATA) {
    throw new Error('REFUND_NOT_FOUND');
  }

  try {
    const response = await apiClient.get<{
      success: boolean;
      message: string | null;
      data: RefundDetail;
    }>(API_URL.ADMIN_PAYMENTS.REFUND_DETAIL(refundId));

    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('유효하지 않은 API 응답: data 필드가 없습니다.');
  } catch (error) {
    console.error('GET /admin/payments/refunds/{refund_id} API Error:', error);
    throw error;
  }
};

/**
 * PATCH /admin/payments/refunds/{refund_id}
 * 환불 상태 변경 (승인/거절)
 *
 * @param refundId - 환불 ID
 * @param status - 변경할 상태 ('approved' | 'rejected')
 * @param adminNote - 관리자 메모 (선택사항)
 * @response 200 OK
 * {
 *   "success": true,
 *   "message": "string",
 *   "data": {
 *     "id": 0,
 *     "payment_id": 0,
 *     "user_id": 0,
 *     "user_nickname": "string",
 *     "amount": 0,
 *     "reason": "string",
 *     "status": "approved",
 *     "admin_note": "string",
 *     "requested_at": "2025-11-16T08:20:40.465Z",
 *     "processed_at": "2025-11-16T08:20:40.465Z",
 *     "payment_date": "2025-11-16T08:20:40.465Z",
 *     "course_title": "string",
 *     "progress_rate": 0
 *   }
 * }
 */
export const updateRefundStatus = async (
  refundId: number,
  status: 'approved' | 'rejected',
  adminNote?: string
): Promise<RefundDetail> => {
  if (USE_MOCK_DATA) {
    const mockData: RefundDetail = {
      id: refundId,
      payment_id: 1,
      user_id: 1,
      user_nickname: '테스트 사용자',
      amount: 50000,
      reason: '환불 요청 사유',
      status: status,
      admin_note: adminNote || null,
      requested_at: new Date(Date.now() - 86400000).toISOString(),
      processed_at: new Date().toISOString(),
      payment_date: new Date(Date.now() - 172800000).toISOString(),
      course_title: '테스트 강의',
      progress_rate: 0,
    };
    return simulateFetch(mockData, API_DELAY);
  }

  try {
    const requestBody: { status: string; admin_note?: string } = { status };
    if (adminNote) {
      requestBody.admin_note = adminNote;
    }

    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: RefundDetail;
    }>(API_URL.ADMIN_PAYMENTS.PROCESS_REFUND(refundId), requestBody);
    if (response.data.data) {
      return response.data.data;
    }

    throw new Error('유효하지 않은 API 응답: data 필드가 없습니다.');
  } catch (error) {
    console.error('PATCH /admin/payments/refunds/{refund_id} API Error:', error);
    throw error;
  }
};

/**
 * GET /admin/payments/export
 * 결제 내역 엑셀 다운로드 (필터 조건에 맞는 전체 데이터)
 *
 * @param params - 필터 파라미터 (keyword, payment_method, status, start_date, end_date)
 * @response 200 OK - Excel/CSV 파일 (Blob)
 */
export const exportPayments = async (
  params: Omit<PaymentApiParams, 'page' | 'page_size'>
): Promise<Blob> => {
  if (USE_MOCK_DATA) {
    // Mock: CSV 파일 생성
    const mockCsv = 'ID,결제일,사용자,강의명,금액\n1,2025-11-15,테스트,테스트 강의,50000';
    const blob = new Blob([mockCsv], { type: 'text/csv;charset=utf-8;' });
    return simulateFetch(blob, API_DELAY);
  }

  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );

    const response = await apiClient.get(API_URL.ADMIN_PAYMENTS.EXPORT_PAYMENTS, {
      params: cleanParams,
      responseType: 'blob', // 중요: Blob 형식으로 받기
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

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
