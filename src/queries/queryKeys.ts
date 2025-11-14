// src/queries/queryKeys.ts

// (가정) API 파라미터 타입들을 모두 임포트
import type {
  NotificationListParams,
  CourseListParams,
  //   MissionListParams,
  PaymentListParams,
  RefundListParams,
  CouponListParams,
  //   CertificateListParams,
  QuestionListParams,
  DashboardParams,
  AdminUserListParams,
  AdminCourseListParams,
  AdminPaymentListParams,
  AdminCouponListParams,
} from '../types/ApiParamsType'; // ◀ (파라미터 타입 정의 파일)

// --- 1. 인증 (Auth) ---
export const authKeys = {
  all: ['auth'] as const,
  verify: ['auth', 'verify'] as const, // GET /auth/verify
};

// --- 2. 사용자 (User) ---
export const userKeys = {
  all: ['users'] as const,
  me: ['users', 'me'] as const, // GET /users/me
  notifications: (params: NotificationListParams) =>
    ['users', 'me', 'notifications', params] as const, // GET /users/me/notifications
};

// --- 3. 강의 (Course) ---
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => ['courses', 'list'] as const,
  list: (params: CourseListParams) => ['courses', 'list', params] as const, // GET /courses
  details: () => ['courses', 'detail'] as const,
  detail: (id: number) => ['courses', 'detail', id] as const, // GET /courses/{id}
  chapters: (courseId: number) => ['courses', 'detail', courseId, 'chapters'] as const, // GET /courses/{id}/chapters
  lectures: (courseId: number, chapterId: number) =>
    ['courses', 'detail', courseId, 'chapters', chapterId, 'lectures'] as const, // GET /courses/{id}/chapters/{id}/lectures
};

// --- 4. 수강 (Enrollment) ---
export const enrollmentKeys = {
  all: ['enrollments'] as const,
  myList: ['enrollments', 'myList'] as const, // GET /enrollments/my
  details: () => ['enrollments', 'detail'] as const,
  detail: (id: number) => ['enrollments', 'detail', id] as const, // GET /enrollments/{id}
  dashboard: ['enrollments', 'dashboard'] as const, // GET /enrollments/dashboard
  progressByCourse: (courseId: number) => ['enrollments', 'progress', courseId] as const, // GET /enrollments/progress/course/{id}
  progressByLecture: (lectureId: number) =>
    ['enrollments', 'progress', 'lecture', lectureId] as const, // GET /enrollments/progress/lecture/{id}
};

// --- 5. 미션 (Mission) ---
export const missionKeys = {
  all: ['missions'] as const,
  lists: () => ['missions', 'list'] as const,
  listByCourse: (courseId: number) => ['missions', 'list', 'course', courseId] as const, // GET /missions/courses/{id}
  details: () => ['missions', 'detail'] as const,
  detail: (id: number) => ['missions', 'detail', id] as const, // GET /missions/{id}
  submissions: (missionId: number) => ['missions', 'detail', missionId, 'submissions'] as const, // GET /missions/{id}/submissions
  progress: (missionId: number) => ['missions', 'detail', missionId, 'progress'] as const, // GET /missions/{id}/progress
};

// --- 6. 결제 (Payment) ---
export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => ['payments', 'list'] as const,
  list: (params: PaymentListParams) => ['payments', 'list', params] as const, // GET /payments
  details: () => ['payments', 'detail'] as const,
  detail: (id: number) => ['payments', 'detail', id] as const, // GET /payments/{id}
  refundCheck: (id: number) => ['payments', 'detail', id, 'refundCheck'] as const, // GET /payments/{id}/refund-check
};

// --- 7. 환불 (Refund) ---
export const refundKeys = {
  all: ['refunds'] as const,
  myLists: () => ['refunds', 'myList'] as const,
  myList: (params: RefundListParams) => ['refunds', 'myList', params] as const, // GET /payments/refunds/my
  details: () => ['refunds', 'detail'] as const,
  detail: (id: number) => ['refunds', 'detail', id] as const, // GET /payments/refunds/{id}
};

// --- 8. 쿠폰 (Coupon) ---
export const couponKeys = {
  all: ['coupons'] as const,
  lists: () => ['coupons', 'list'] as const,
  list: (params: CouponListParams) => ['coupons', 'list', params] as const, // GET /coupons
  details: () => ['coupons', 'detail'] as const,
  detail: (id: number) => ['coupons', 'detail', id] as const, // GET /coupons/{id}
  myList: ['coupons', 'myList'] as const, // GET /coupons/my
};

// --- 9. 수료증 (Certificate) ---
// export const certificateKeys = {
//   all: ['certificates'] as const,
//   myLists: () => ['certificates', 'myList'] as const,
//   myList: (params: CertificateListParams) => ['certificates', 'myList', params] as const, // GET /certificates/my
//   details: () => ['certificates', 'detail'] as const,
//   detail: (id: number) => ['certificates', 'detail', id] as const, // GET /certificates/{id}
// };

// --- 10. Q&A (Question) ---
export const questionKeys = {
  all: ['questions'] as const,
  lists: () => ['questions', 'list'] as const,
  list: (params: QuestionListParams) => ['questions', 'list', params] as const, // GET /questions
  details: () => ['questions', 'detail'] as const,
  detail: (id: number) => ['questions', 'detail', id] as const, // GET /questions/{id}
};

// --- 11. 관리자: 대시보드 ---
export const adminDashboardKeys = {
  all: ['adminDashboard'] as const,
  stats: ['adminDashboard', 'stats'] as const, // GET .../stats
  dailyStats: (params: DashboardParams) => ['adminDashboard', 'dailyStats', params] as const,
  revenueStats: (params: DashboardParams) => ['adminDashboard', 'revenueStats', params] as const,
  courseStats: (params: DashboardParams) => ['adminDashboard', 'courseStats', params] as const,
  categoryStats: ['adminDashboard', 'categoryStats'] as const,
  settings: ['adminDashboard', 'settings'] as const,
};

// --- 12. 관리자: 사용자 관리 ---
export const adminUserKeys = {
  all: ['adminUsers'] as const,
  lists: () => ['adminUsers', 'list'] as const,
  list: (params: AdminUserListParams) => ['adminUsers', 'list', params] as const, // GET /admin/users
  details: () => ['adminUsers', 'detail'] as const,
  detail: (id: number) => ['adminUsers', 'detail', id] as const, // GET /admin/users/{id}
  report: (id: number) => ['adminUsers', 'detail', id, 'report'] as const, // GET /admin/users/{id}/learning-report
};

// --- 13. 관리자: 강의 관리 ---
export const adminCourseKeys = {
  all: ['adminCourses'] as const,
  lists: () => ['adminCourses', 'list'] as const,
  list: (params: AdminCourseListParams) => ['adminCourses', 'list', params] as const, // GET /admin/courses
  details: () => ['adminCourses', 'detail'] as const, // (GET /admin/courses/{id}는 목록에 없지만, 필요할 수 있음)
  analytics: (id: number) => ['adminCourses', 'detail', id, 'analytics'] as const, // GET /admin/courses/{id}/analytics
};

// --- 14. 관리자: 결제/환불 ---
export const adminPaymentKeys = {
  all: ['adminPayments'] as const,
  lists: () => ['adminPayments', 'list'] as const,
  list: (params: AdminPaymentListParams) => ['adminPayments', 'list', params] as const, // GET /admin/payments
  refundLists: () => ['adminPayments', 'refunds', 'list'] as const,
  refundList: (params: AdminPaymentListParams) =>
    ['adminPayments', 'refunds', 'list', params] as const, // GET /admin/payments/refunds
};

// --- 15. 관리자: 쿠폰 ---
export const adminCouponKeys = {
  all: ['adminCoupons'] as const,
  lists: () => ['adminCoupons', 'list'] as const,
  list: (params: AdminCouponListParams) => ['adminCoupons', 'list', params] as const, // GET /admin/coupons
  details: () => ['adminCoupons', 'detail'] as const,
  detail: (id: number) => ['adminCoupons', 'detail', id] as const, // GET /admin/coupons/{id}
};
