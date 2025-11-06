/**
 * /admin/dashboard/stats
 * (통계 카드용)
 */
export interface AdminStats {
  total_users: number;
  total_courses: number;
  total_enrollments: number;
  active_enrollments: number;
  total_revenue: number;
  pending_refunds: number;
  today_visitors: number;
  today_views: number;
  today_revenue: number;
}

/**
 * /admin/dashboard/daily-stats
 * (일별 접속/매출 차트용)
 */
export interface DailyStat {
  date: string; // "YYYY-MM-DD"
  visitors: number;
  views: number;
  revenue: number;
  enrollments: number;
  new_users: number;
}

/**
 * /admin/dashboard/revenue-stats
 * (일별 상세 매출 차트용)
 */
export interface RevenueStat {
  date: string; // "YYYY-MM-DD"
  revenue: number;
  payment_count: number;
  refund_amount: number;
  refund_count: number;
  net_revenue: number;
}

/**
 * /admin/dashboard/course-stats
 * (강의별 통계 테이블/차트용)
 */
export interface CourseStat {
  course_id: number;
  course_title: string;
  category_name: string;
  total_enrollments: number;
  active_enrollments: number;
  avg_progress: number;
  completion_count: number;
  completion_rate: number;
  total_revenue: number;
}

/**
 * /admin/dashboard/category-stats
 * (카테고리별 통계 차트용)
 */
export interface CategoryStat {
  category_id: number;
  category_name: string;
  course_count: number;
  total_enrollments: number;
  total_revenue: number;
  avg_completion_rate: number;
  [key: string]: unknown;
}

/**
 * /admin/dashboard/settings
 * (시스템 설정용)
 */
export interface AdminSettings {
  site_name: string;
  course_price: number;
  enrollment_period_years: number;
  refund_period_days: number;
  refund_progress_limit: number;
  passing_score_rate: number;
}

/**
 * API 함수에 전달할 파라미터 타입 (예시)
 */
export interface DateRangeParams {
  period?: 'day' | 'week' | 'month' | 'year';
  start_date?: string;
  end_date?: string;
}

export interface CourseStatParams extends DateRangeParams {
  category_id?: number;
}