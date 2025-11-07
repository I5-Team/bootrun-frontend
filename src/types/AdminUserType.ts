/**
 * GET /admin/users 쿼리 파라미터
 */
export interface UserApiParams {
  page: number;
  page_size: number;
  role?: string | null;
  is_active?: boolean | null;
  keyword?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

/**
 * GET /admin/users 아이템 (목록의 개별 유저)
 */
export interface UserListItem {
  id: number;
  email: string;
  nickname: string;
  role: string;
  is_active: boolean;
  total_enrollments: number;
  total_payments: number;
  total_spent: number;
  created_at: string; // "2025-11-07T07:41:27.191Z"
  last_login: string;
}

/**
 * GET /admin/users 전체 응답 (페이지네이션 포함)
 */
export interface UserListResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: UserListItem[];
}

/**
 * GET /admin/users/{user_id} 상세 정보
 */
export interface UserDetail extends UserListItem {
  gender: string;
  birth_date: string; // "2025-11-07"
  provider: string;
  total_study_time: number;
  active_enrollments: number;
  completed_courses: number;
  avg_progress_rate: number;
  total_refunds: number;
  total_questions: number;
  total_comments: number;
  enrollments: any[]; // (타입이 명시되지 않아 any, 추후 구체화 필요)
}

/**
 * GET /admin/users/{user_id}/learning-report
 */
export interface LearningReport {
  user_id: number;
  user_nickname: string;
  report_period: string;
  total_study_time: number;
  attendance_rate: number;
  avg_progress_rate: number;
  courses: any[];
  attendance: any[];
}