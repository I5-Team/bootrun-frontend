export const ROUTES = {
    HOME: '/',                                  // 메인 페이지
    LOGIN: '/login',                            // 로그인 페이지
    SIGNUP: '/signup',                          // 회원가입 페이지
    LECTURE_LIST: '/lectures',                  // 강의 목록 페이지
    LECTURE_DETAIL: '/lectures/:id',            // 강의 상세 페이지
    LECTURE_PAYMENT: '/lectures/:id/payment',   // 강의 결제 페이지
    LECTURE_PAYMENT_RESULT: '/lectures/:id/payment/result', // 강의 결제 완료 페이지
    MY_LECTURES: '/my/lectures',              // 내 강의 페이지
    LECTURE_ROOM: '/lectures/:id/room',        // 강의실 페이지
    PAYMENT: 'payment/:id',                 // 결제 페이지
    PAYMENT_RESULT: 'payment/result',    // 결제 완료 페이지
    PROFILE: '/my/profile',                     // 프로필 페이지
    ADMIN_DASHBOARD: '/admin',                 // 관리자 대시보드
    ADMIN_LECTURE_MANAGE: '/admin/lectures',    // 관리자 강의 관리
    ADMIN_PAYMENT_MANAGE: '/admin/payments',    // 관리자 결제 관리   
    ADMIN_USER_MANAGE: '/admin/users',        // 관리자 사용자 관리
    NOT_FOUND: '*',                           // 404 페이지
}