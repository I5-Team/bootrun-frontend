// 체크박스: [작성완료] [로컬테스트] [서버테스트]
// ##  인증 (Authentication) - /auth

// - [x] [v ] [v] 1. POST /auth/register - 이메일 회원가입 [필수]
// - [x] [v] [v] 2. POST /auth/login - 이메일 로그인 [필수]
// - [x] [v] [v] 3. POST /auth/logout - 로그아웃 [필수]
// - [x] [v] [v] 4. POST /auth/email/verification/request - 이메일 인증 요청 [필수]
// - [x] [v] [v] 5. POST /auth/email/verification/confirm - 이메일 인증 확인 [필수]
// - [x] [v] [v] 6. POST /auth/social/google - Google 소셜 로그인 [선택]
// - [x] [v] [v] 7. POST /auth/social/github - Github 소셜 로그인 [선택]
// - [ ] [v] [ ] 8. POST /auth/refresh - 토큰 갱신 [추가]
// - [x] [v] [v] 9. GET /auth/verify - 토큰 검증 [추가]
// - [ ] [ ] [ ] 10. POST /auth/password/reset/request - 비밀번호 재설정 요청 [추가]
// - [ ] [ ] [ ] 11. POST /auth/password/reset/confirm - 비밀번호 재설정 확인 [추가]

// ---

// ##  사용자 (User) - /user

// - [x] [v] [v] 1. GET /users/me - 내 프로필 조회 [필수]
// - [x] [v] [v] 2. PATCH /users/me - 프로필 수정 (이름, 성별, 생년월일) [필수]
// - [x] [v] [v] 3. POST /users/me/change-password - 비밀번호 변경 [추가]
// - [x] [v] [v] 4. DELETE /users/me - 회원 탈퇴 [필수]
// - [x] [v] [v] 5. GET /users/me/notifications - 내 알림 목록 [선택] (학습 기간 만료 알림)

// ---

// ##  강의 (Course) - /course

// - [x] [ ] [ ] 1. GET /courses - 전체 강의 목록 조회 (필터링, 카테고리별) [필수]

// - [x] [ ] [ ] 2. GET /courses/{course_id} - 강의 상세 조회 [필수]

// - [x] [ ] [ ] 3. GET /courses/{course_id}/chapters - 챕터 목록 조회 [필수]

// - [x] [ ] [ ] 4. GET /courses/{course_id}/chapters/{chapter_id}/lectures - 강의 영상 목록 조회 [필수]

// ---

// ##  수강 등록 및 학습 진행 (Enrollment) - /enrollment

// - [ ] [ ] [ ] 1. POST /enrollments - 수강 등록 [필수]
// - [ ] [ ] [ ] 2. GET /enrollments/my - 내 수강 목록 조회 [필수]
// - [ ] [ ] [ ] 3. GET /enrollments/{enrollment_id} - 수강 상세 조회 [추가]
// - [ ] [ ] [ ] 4. POST /enrollments/progress - 학습 진행 생성 [필수]
// - [ ] [ ] [ ] 5. PATCH /enrollments/progress/lectures/{lecture_id} - 학습 진행 업데이트 [필수]
// - [ ] [ ] [ ] 6. GET /enrollments/progress/course/{course_id} - 강의별 학습 진행 조회 [필수]
// - [ ] [ ] [ ] 7. GET /enrollments/progress/lecture/{lecture_id} - 강의 영상별 진행 조회 [필수]
// - [ ] [ ] [ ] 8. GET /enrollments/dashboard - 학습자 대시보드 [필수]

// ---

// ##  미션 (Mission) - /mission

// - [ ] [ ] [ ] 1. GET /missions/courses/{course_id} - 강의별 미션 목록 [선택]
// - [ ] [ ] [ ] 2. GET /missions/{mission_id} - 미션 상세 조회 [선택]
// - [ ] [ ] [ ] 3. POST /missions/submissions - 미션 제출 [선택]
// - [ ] [ ] [ ] 4. GET /missions/{mission_id}/submissions - 미션 제출 내역 [선택]
// - [ ] [ ] [ ] 5. GET /missions/{mission_id}/progress - 미션 진행 현황 [선택]

// ---

// ##  결제 (Payment) - /payment

// - [ ] [ ] [ ] 1. POST /payments - 결제 생성 [필수]
// - [ ] [ ] [ ] 2. GET /payments - 결제 목록 조회 [필수]
// - [ ] [ ] [ ] 3. GET /payments/{payment_id} - 결제 상세 조회 [선택] (마이페이지 결제 내역)
// - [ ] [ ] [ ] 4. POST /payments/{payment_id}/confirm - 결제 확인 [필수]
// - [ ] [ ] [ ] 5. POST /payments/{payment_id}/cancel - 결제 취소 (완료 전) [추가]
// - [ ] [ ] [ ] 6. GET /payments/{payment_id}/refund-check - 환불 가능 여부 확인 [추가]

// ---

// ##  환불 (Refund) - /payment/refund

// - [ ] [ ] [ ] 1. POST /payments/refunds - 환불 요청 [필수]
// - [ ] [ ] [ ] 2. GET /payments/refunds/my - 내 환불 요청 목록 [추가]
// - [ ] [ ] [ ] 3. GET /payments/refunds/{refund_id} - 환불 상세 조회 [추가]
// - [ ] [ ] [ ] 4. DELETE /payments/refunds/{refund_id} - 환불 요청 취소 [추가]

// ---

// ##  쿠폰 (Coupon) - /coupon

// - [ ] [ ] [ ] 1. GET /coupons - 쿠폰 목록 조회 [추가]
// - [ ] [ ] [ ] 2. GET /coupons/{coupon_id} - 쿠폰 상세 조회 [추가]
// - [ ] [ ] [ ] 3. POST /coupons/validate - 쿠폰 유효성 검증 [추가]
// - [ ] [ ] [ ] 4. GET /coupons/my - 내 쿠폰 목록 [추가]

// ---

// ##  수료증 (Certificate) - /certificate

// - [ ] [ ] [ ] 1. POST /certificates - 수료증 발급 [선택]
// - [ ] [ ] [ ] 2. GET /certificates/my - 내 수료증 목록 [선택]
// - [ ] [ ] [ ] 3. GET /certificates/{certificate_id} - 수료증 상세 조회 [선택]
// - [ ] [ ] [ ] 4. POST /certificates/{certificate_id}/pdf - 수료증 PDF 생성 [선택]
// - [ ] [ ] [ ] 5. POST /certificates/verify - 수료증 진위 확인 [선택]

// ---

// ##  학습 Q&A (Question) - /question

// - [ ] [ ] [ ] 1. GET /questions - 질문 목록 조회 [추가]
// - [ ] [ ] [ ] 2. GET /questions/{question_id} - 질문 상세 조회 [추가]
// - [ ] [ ] [ ] 3. POST /questions - 질문 작성 [추가]
// - [ ] [ ] [ ] 4. PATCH /questions/{question_id} - 질문 수정 [추가]
// - [ ] [ ] [ ] 5. DELETE /questions/{question_id} - 질문 삭제 [추가]
// - [ ] [ ] [ ] 6. POST /questions/{question_id}/comments - 답변 작성 [추가]
// - [ ] [ ] [ ] 7. PATCH /questions/{question_id}/comments/{comment_id} - 답변 수정 [추가]
// - [ ] [ ] [ ] 8. DELETE /questions/{question_id}/comments/{comment_id} - 답변 삭제 [추가]

// ---

// ##  관리자 - 대시보드 (Admin Dashboard) - /admin/dashboard

// - [x] [v] [ ] 1. GET /admin/dashboard/stats - 대시보드 통계 [필수]
// - [x] [v] [ ] 2. GET /admin/dashboard/daily-stats - 일별 통계 (접속자, 조회수) [필수]
// - [x] [v] [ ] 3. GET /admin/dashboard/revenue-stats - 매출 통계 [필수]
// - [x] [v] [ ] 4. GET /admin/dashboard/course-stats - 강의별 통계 [필수]
// - [x] [v] [ ] 5. GET /admin/dashboard/category-stats - 카테고리별 통계 [추가]
// - [ ] [ ] [ ] 6. GET /admin/dashboard/settings - 시스템 설정 조회 [추가]
// - [ ] [ ] [ ] 7. PATCH /admin/dashboard/settings - 시스템 설정 수정 [추가]

// ---

// ##  관리자 - 사용자 관리 (Admin Users) - /admin/users

// - [x] [] [ ] 1. GET /admin/users - 사용자 목록 조회 [필수]
// - [x] [ ] [ ] 2. GET /admin/users/{user_id} - 사용자 상세 조회 [필수]
// - [ ] [ ] [ ] 3. PATCH /admin/users/{user_id}/activate - 사용자 활성화 [추가]
// - [ ] [ ] [ ] 4. PATCH /admin/users/{user_id}/deactivate - 사용자 비활성화 [추가]
// - [ ] [ ] [ ] 5. GET /admin/users/{user_id}/learning-report - 사용자 학습 리포트 [선택]

// ---

// ##  관리자 - 강의 관리 (Admin Courses) - /admin/courses

// - [x] [x] [ ] 1. GET /admin/courses - 강의 목록 조회 [필수]
// - [x] [x] [ ] 1. GET /admin/courses/{course_id} - 강의 상세 조회 [추가]
// - [x] [x] [ ] 2. POST /admin/courses - 강의 생성 [필수]
// - [x] [x] [ ] 3. PATCH /admin/courses/{course_id} - 강의 수정 [필수]
// - [x] [x] [ ] 4. DELETE /admin/courses/{course_id} - 강의 삭제 [필수]
// - [x] [x] [ ] ?. GET /admin/courses/{course_id}/chapters - 챕터 목록 조회 [?]
// - [x] [x] [ ] 5. POST /admin/courses/{course_id}/chapters - 챕터 추가 [필수]
// - [x] [x] [ ] 6. PATCH /admin/courses/{course_id}/chapters/{chapter_id} - 챕터 수정 [필수]
// - [x] [x] [ ] 7. DELETE /admin/courses/{course_id}/chapters/{chapter_id} - 챕터 삭제 [추가]
// - [x] [x] [ ] ?. GET /admin/courses/{course_id}/chapters/{chapter_id}/lectures - 강의 영상 목록 조회 [?]
// - [x] [x] [ ] 8. POST /admin/courses/{course_id}/chapters/{chapter_id}/lectures - 강의 영상 추가 [필수]
// - [x] [x] [ ] 9. PATCH /admin/courses/{course_id}/chapters/{chapter_id}/lectures/{lecture_id} - 강의 영상 수정 [필수]
// - [ ] [ ] [ ] 10. DELETE /admin/courses/{course_id}/chapters/{chapter_id}/lectures/{lecture_id} - 강의 영상 삭제 [추가]
// - [ ] [ ] [ ] 11. POST /admin/courses/{course_id}/publish - 강의 공개 [추가]
// - [ ] [ ] [ ] 12. POST /admin/courses/{course_id}/unpublish - 강의 비공개 [추가]
// - [ ] [ ] [ ] 13. GET /admin/courses/{course_id}/analytics - 강의 분석 [추가]

// ---

// ##  관리자 - 결제 및 환불 관리 (Admin Payments) - /admin/payments

// - [ ] [ ] [ ] 1. GET /admin/payments - 결제 목록 조회 [필수]

// - [ ] [ ] [ ] 2. GET /admin/payments/export - 결제 내역 엑셀 다운로드 [필수]

// - [ ] [ ] [ ] 3. GET /admin/payments/refunds - 환불 목록 조회 [필수]

// - [ ] [ ] [ ] 4. PATCH /admin/payments/refunds/{refund_id} - 환불 승인/거절 [필수]

// ---

// ##  관리자 - 쿠폰 관리 (Admin Coupons) - /admin/coupons

// - [ ] [ ] [ ] 1. GET /admin/coupons - 쿠폰 목록 조회 [추가]
// - [ ] [ ] [ ] 2. GET /admin/coupons/{coupon_id} - 쿠폰 상세 조회 [추가]
// - [ ] [ ] [ ] 3. POST /admin/coupons - 쿠폰 생성 [추가]
// - [ ] [ ] [ ] 4. PATCH /admin/coupons/{coupon_id} - 쿠폰 수정 [추가]
// - [ ] [ ] [ ] 5. DELETE /admin/coupons/{coupon_id} - 쿠폰 삭제 [추가]

// ---

// ##  관리자 - 미션 관리 (Admin Missions) - /admin/missions

// - [ ] [ ] [ ] 1. POST /admin/missions/courses/{course_id}/missions - 미션 생성 [선택]
// - [ ] [ ] [ ] 2. PATCH /admin/missions/{mission_id} - 미션 수정 [선택]
// - [ ] [ ] [ ] 3. DELETE /admin/missions/{mission_id} - 미션 삭제 [선택]

// ---

export const API_URL = {
  /* 인증 */
  AUTH: {
    REGISTER: '/auth/register', // 이메일 회원가입      (POST)
    LOGIN: '/auth/login', // 이메일 로그인       (POST)
    LOGOUT: '/auth/logout', // 로그아웃           (POST)
    EMAIL_VERIFICATION_REQUEST: '/auth/email/verification/request', // 이메일 인증 요청     (POST)
    EMAIL_VERIFICATION_CONFIRM: '/auth/email/verification/confirm', // 이메일 인증 확인     (POST)
    SOCIAL_GOOGLE: '/auth/social/google', // Google 소셜 로그인   (POST) [선택]
    SOCIAL_GITHUB: '/auth/social/github', // Github 소셜 로그인   (POST)  [선택]
    VERIFY: '/auth/verify', // 토큰 검증            (GET)
    REFRESH: '/auth/refresh', // 토큰 갱신          (POST)
    PASSWORD_RESET_REQUEST: '/auth/password/reset/request', // 비밀번호 재설정 요청  (POST)
    PASSWORD_RESET_CONFIRM: '/auth/password/reset/confirm', // 비밀번호 재설정 확인     (POST)
  },
  /* 사용자 */
  USER: {
    PROFILE: '/users/me', // 내 프로필 조회       (GET)
    UPDATE_PROFILE: '/users/me', // 프로필 수정         (PATCH)
    CHANGE_PASSWORD: '/users/me/change-password', // 비밀번호 변경       (POST)
    DELETE_ACCOUNT: '/users/me', // 회원 탈퇴          (DELETE)
    NOTIFICATIONS: '/users/me/notifications', // 내 알림 목록        (GET)

    PROFILE_IMAGE: '/users/me/profile-image', // 프로필 이미지 업로드 (POST)
    PROFILE_IMAGE_DELETE: '/users/me/profile-image', // 프로필 이미지 삭제  (DELETE)

  },
  /* 강의 */
  COURSE: {
    COURSE_LIST: '/courses', // 전체 강의 목록 조회   (GET)
    COURSE_DETAIL: (courseId: number) => `/courses/${courseId}`, // 강의 상세 조회      (GET)
    CHAPTERS: (courseId: number) => `/courses/${courseId}/chapters`, // 챕터 목록 조회   (GET)
    LECTURES: (courseId: number, chapterId: number) =>
      `/courses/${courseId}/chapters/${chapterId}/lectures`, // 강의 영상 목록 조회 (GET)
  },
  /* 수강 등록 및 학습 진행 */
  ENROLLMENT: {
    ENROLLMENTS: '/enrollments', // 수강 등록           (POST)
    MY_ENROLLMENTS: '/enrollments/my', // 내 수강 목록 조회    (GET)
    ENROLLMENT_DETAIL: (enrollmentId: number) => `/enrollments/${enrollmentId}`, // 수강 상세 조회  (GET)
    CREATE_PROGRESS: '/enrollments/progress', // 학습 진행 생성      (POST)
    UPDATE_LECTURE_PROGRESS: (lectureId: number) => `/enrollments/progress/lectures/${lectureId}`, // 학습 진행 업데이트 (PATCH)
    COURSE_PROGRESS: (courseId: number) => `/enrollments/progress/course/${courseId}`, // 강의별 학습 진행 조회 (GET)
    LECTURE_PROGRESS: (lectureId: number) => `/enrollments/progress/lecture/${lectureId}`, // 강의 영상별 진행 조회 (GET)
    DASHBOARD: '/enrollments/dashboard', // 학습자 대시보드     (GET)
  },
  /* 결제 */
  PAYMENT: {
    PAYMENTS: '/payments', // 결제 생성          (POST)
    PAYMENT_LIST: '/payments', // 결제 목록 조회      (GET)
    PAYMENT_DETAIL: (paymentId: number) => `/payments/${paymentId}`, // 결제 상세 조회  (GET)
    CONFIRM_PAYMENT: (paymentId: number) => `/payments/${paymentId}/confirm`, // 결제 확인   (POST)
    CANCEL_PAYMENT: (paymentId: number) => `/payments/${paymentId}/cancel`, // 결제 취소   (POST)
    REFUND_CHECK: (paymentId: number) => `/payments/${paymentId}/refund-check`, // 환불 가능 여부 확인 (GET)
  },
  /* 환불 */
  REFUND: {
    REQUEST_REFUND: '/payments/refunds', // 환불 요청         (POST)
    MY_REFUNDS: '/payments/refunds/my', // 내 환불 요청 목록  (GET)
    REFUND_DETAIL: (refundId: number) => `/payments/refunds/${refundId}`, // 환불 상세 조회 (GET)
    CANCEL_REFUND: (refundId: number) => `/payments/refunds/${refundId}`, // 환불 요청 취소 (DELETE)
  },
  /* 쿠폰 */
  COUPON: {
    COUPONS: '/coupons', // 쿠폰 목록 조회     (GET)
    COUPON_DETAIL: (couponId: number) => `/coupons/${couponId}`, // 쿠폰 상세 조회  (GET)
    VALIDATE_COUPON: '/coupons/validate', // 쿠폰 유효성 검증   (POST)
    MY_COUPONS: '/coupons/my', // 내 쿠폰 목록      (GET)
  },
  /* 학습 Q&A */
  QNA: {
    QUESTIONS: '/questions', // 질문 목록 조회     (GET)
    QUESTION_DETAIL: (questionId: number) => `/questions/${questionId}`, // 질문 상세 조회 (GET)
    CREATE_QUESTION: '/questions', // 질문 작성         (POST)
    UPDATE_QUESTION: (questionId: number) => `/questions/${questionId}`, // 질문 수정    (PATCH)
    DELETE_QUESTION: (questionId: number) => `/questions/${questionId}`, // 질문 삭제    (DELETE)
    CREATE_COMMENT: (questionId: number) => `/questions/${questionId}/comments`, // 답변 작성 (POST)
    UPDATE_COMMENT: (questionId: number, commentId: number) =>
      `/questions/${questionId}/comments/${commentId}`, // 답변 수정 (PATCH)
    DELETE_COMMENT: (questionId: number, commentId: number) =>
      `/questions/${questionId}/comments/${commentId}`, // 답변 삭제 (DELETE)
  },

  /* 관리자 - 대시보드 */
  ADMIN_DASHBOARD: {
    DASHBOARD_STATS: '/admin/dashboard/stats', // 대시보드 통계            (GET)
    DAILY_STATS: '/admin/dashboard/daily-stats', // 일별 통계 (접속자, 조회수) (GET)
    REVENUE_STATS: '/admin/dashboard/revenue-stats', // 매출 통계                (GET)
    COURSE_STATS: '/admin/dashboard/course-stats', // 강의별 통계              (GET)
    CATEGORY_STATS: '/admin/dashboard/category-stats', // 카테고리별 통계          (GET)
    SETTINGS: '/admin/dashboard/settings', // 시스템 설정 조회         (GET)
    UPDATE_SETTINGS: '/admin/dashboard/settings', // 시스템 설정 수정         (PATCH)
  },
  /* 관리자 - 사용자 관리 */
  ADMIN_USERS: {
    USER_LIST: '/admin/users', // 사용자 목록 조회         (GET)
    USER_DETAIL: (userId: number) => `/admin/users/${userId}`, // 사용자 상세 조회         (GET)
    ACTIVATE_USER: (userId: number) => `/admin/users/${userId}/activate`, // 사용자 활성화      (PATCH)
    DEACTIVATE_USER: (userId: number) => `/admin/users/${userId}/deactivate`, // 사용자 비활성화   (PATCH)
    LEARNING_REPORT: (userId: number) => `/admin/users/${userId}/learning-report`, // 사용자 학습 리포트 (GET)
  },
  /* 관리자 - 강의 관리(겹치는 부분 삭제 필요) */
  ADMIN_COURSES: {
    COURSE_LIST: '/admin/courses', // 강의 목록 조회          (GET)

    COURSE_DETAIL: (courseId: number) => `/admin/courses/${courseId}`, // 강의 상세 조회   (GET)
    CREATE_COURSE: '/admin/courses', // 강의 생성              (POST)
    UPDATE_COURSE: (courseId: number) => `/admin/courses/${courseId}`, // 강의 수정              (PATCH)
    DELETE_COURSE: (courseId: number) => `/admin/courses/${courseId}`, // 강의 삭제              (DELETE)
    GET_CHAPTERS: (courseId: number) => `/admin/courses/${courseId}/chapters`, // 챕터 목록 조회  (GET)
    ADD_CHAPTER: (courseId: number) => `/admin/courses/${courseId}/chapters`, // 챕터 추가        (POST)
    UPDATE_CHAPTER: (courseId: number, chapterId: number) =>
      `/admin/courses/${courseId}/chapters/${chapterId}`, // 챕터 수정 (PATCH)
    DELETE_CHAPTER: (courseId: number, chapterId: number) =>
      `/admin/courses/${courseId}/chapters/${chapterId}`, // 챕터 삭제 (DELETE)

    GET_LECTURES: (courseId: number, chapterId: number) =>
      `/admin/courses/${courseId}/chapters/${chapterId}/lectures`, // 강의 영상 목록 조회 (GET)

    ADD_LECTURE: (courseId: number, chapterId: number) =>
      `/admin/courses/${courseId}/chapters/${chapterId}/lectures`, // 강의 영상 추가 (POST)
    UPDATE_LECTURE: (courseId: number, chapterId: number, lectureId: number) =>
      `/admin/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}`, // 강의 영상 수정 (PATCH)
    DELETE_LECTURE: (courseId: number, chapterId: number, lectureId: number) =>
      `/admin/courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}`, // 강의 영상 삭제 (DELETE)
    PUBLISH_COURSE: (courseId: number) => `/admin/courses/${courseId}/publish`, // 강의 공개      (POST)
    UNPUBLISH_COURSE: (courseId: number) => `/admin/courses/${courseId}/unpublish`, // 강의 비공개    (POST)
    COURSE_ANALYTICS: (courseId: number) => `/admin/courses/${courseId}/analytics`, // 강의 분석      (GET)
  },
  /* 관리자 - 결제 및 환불 관리 */
  ADMIN_PAYMENTS: {
    PAYMENT_LIST: '/admin/payments', // 결제 목록 조회         (GET)
    EXPORT_PAYMENTS: '/admin/payments/export', // 결제 내역 엑셀 다운로드 (GET)
    REFUND_LIST: '/admin/payments/refunds', // 환불 목록 조회         (GET)
    PROCESS_REFUND: (refundId: number) => `/admin/payments/refunds/${refundId}`, // 환불 승인/거절  (PATCH)
  },
  /* 관리자 - 쿠폰 관리 */
  ADMIN_COUPONS: {
    COUPON_LIST: '/admin/coupons', // 쿠폰 목록 조회         (GET)
    COUPON_DETAIL: (couponId: number) => `/admin/coupons/${couponId}`, // 쿠폰 상세 조회      (GET)
    CREATE_COUPON: '/admin/coupons', // 쿠폰 생성           (POST)
    UPDATE_COUPON: (couponId: number) => `/admin/coupons/${couponId}`, // 쿠폰 수정          (PATCH)
    DELETE_COUPON: (couponId: number) => `/admin/coupons/${couponId}`, // 쿠폰 삭제          (DELETE)
  },
  // 선택 구현 항목들 -----------------
  /* 미션 */
  MISSION: {
    COURSE_MISSIONS: (courseId: number) => `/missions/courses/${courseId}`, // 강의별 미션 목록 (GET)
    MISSION_DETAIL: (missionId: number) => `/missions/${missionId}`, // 미션 상세 조회   (GET)
    SUBMIT_MISSION: '/missions/submissions', // 미션 제출       (POST)
    MISSION_SUBMISSIONS: (missionId: number) => `/missions/${missionId}/submissions`, // 미션 제출 내역 (GET)
    MISSION_PROGRESS: (missionId: number) => `/missions/${missionId}/progress`, // 미션 진행 현황 (GET)
  },
  /* 수료증 */
  CERTIFICATE: {
    CREATE_CERTIFICATE: '/certificates', // 수료증 발급         (POST)
    MY_CERTIFICATES: '/certificates/my', // 내 수료증 목록      (GET)
    CERTIFICATE_DETAIL: (certificateId: number) => `/certificates/${certificateId}`, // 수료증 상세 조회 (GET)
    GENERATE_PDF: (certificateId: number) => `/certificates/${certificateId}/pdf`, // 수료증 PDF 생성 (POST)
    VERIFY_CERTIFICATE: '/certificates/verify', // 수료증 진위 확인    (POST)
  },
  /* 관리자 - 미션 관리 */
  ADMIN_MISSIONS: {
    CREATE_MISSION: (courseId: number) => `/admin/missions/courses/${courseId}/missions`, // 미션 생성 (POST)
    UPDATE_MISSION: (missionId: number) => `/admin/missions/${missionId}`, // 미션 수정 (PATCH)
    DELETE_MISSION: (missionId: number) => `/admin/missions/${missionId}`, // 미션 삭제 (DELETE)
  },
};
// 이미지 처리(디폴트 이미지)
// 개발 환경과 프로덕션 환경 모두 지원하는 이미지 경로
// 개발: /assets/images/OG.jpg
// 프로덕션: /bootrun-frontend/assets/images/OG.jpg
const getImagePath = (filename: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}assets/images/${filename}`.replace(/\/+/g, '/');
};

export const DEFAULT_THUMBNAIL_URL = getImagePath('OG.jpg');
export const DEFAULT_INSTRUCTOR_IMAGE = getImagePath('profile-default.jpg');

