// src/types/ApiParamsType.ts

/**
 * 공통 페이징 파라미터
 */
export interface BasePageParams {
  page?: number;
  page_size?: number;
}

// --- 2. 사용자 (User) ---

/**
 * GET /users/me/notifications
 */
export interface NotificationListParams extends BasePageParams {
  is_read?: boolean;
}

// --- 3. 강의 (Course) ---

/**
 * GET /courses
 */
export interface CourseListParams extends BasePageParams {
  category_id?: number;
  search?: string;
  // (기타 필터링 조건 추가)
}

// --- 5. 미션 (Mission) ---

/**
 * GET /missions/courses/{course_id}
 */
// export interface MissionListParams extends BasePageParams {
//   // (course_id는 URL Path로 들어가므로, params 객체에는 미포함)
// }

// --- 6. 결제 (Payment) ---

/**
 * GET /payments
 */
export interface PaymentListParams extends BasePageParams {
  status?: 'pending' | 'completed' | 'failed';
}

// --- 7. 환불 (Refund) ---

/**
 * GET /payments/refunds/my
 */
export interface RefundListParams extends BasePageParams {
  status?: 'requested' | 'approved' | 'rejected';
}

// --- 8. 쿠폰 (Coupon) ---

/**
 * GET /coupons
 */
export interface CouponListParams extends BasePageParams {
  is_valid?: boolean;
}

// --- 10. Q&A (Question) ---

/**
 * GET /questions
 */
export interface QuestionListParams extends BasePageParams {
  course_id?: number;
  search?: string;
}

// --- 11. 관리자: 대시보드 ---

/**
 * GET /admin/dashboard/...
 */
export interface DashboardParams {
  period?: 'day' | 'week' | 'month' | 'year';
  start_date?: string; // YYYY-MM-DD
  end_date?: string;
  category_id?: number;
}

// --- 12. 관리자: 사용자 관리 ---

/**
 * GET /admin/users
 */
export interface AdminUserListParams extends BasePageParams {
  role?: string | null;
  is_active?: boolean | null;
  keyword?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

// --- 13. 관리자: 강의 관리 ---

/**
 * GET /admin/courses
 */
export interface AdminCourseListParams extends BasePageParams {
  search?: string;
  is_published?: boolean;
}

// --- 14. 관리자: 결제/환불 ---

/**
 * GET /admin/payments
 * GET /admin/payments/refunds
 */
export interface AdminPaymentListParams extends BasePageParams {
  search?: string; // (사용자 이메일, 강의명 등)
  status?: string;
}

// --- 15. 관리자: 쿠폰 ---

/**
 * GET /admin/coupons
 */
export interface AdminCouponListParams extends BasePageParams {
  search?: string;
  is_active?: boolean;
}
