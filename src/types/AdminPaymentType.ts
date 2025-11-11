/**
 * 결제 관리 - 타입 정의
 */

/**
 * 결제 목록 아이템 (JOIN된 데이터 포함)
 */
export interface PaymentListItem {
  // ========== Payment 테이블 기본 정보 ==========
  id: number;
  user_id: number;
  course_id: number;
  coupon_id: number | null;

  amount: number;                // 원래 가격
  discount_amount: number;       // 할인 금액
  final_amount: number;          // 최종 결제 금액

  payment_method: 'card' | 'transfer' | 'easy';
  status: 'pending' | 'completed' | 'failed' | 'refunded';

  transaction_id: string;        // PG사 거래 ID
  receipt_url: string;           // 영수증 URL
  paid_at: string;               // 실제 결제 완료 시각
  created_at: string;            // 생성일시

  // ========== JOIN: Users 테이블 ==========
  user_email: string;
  user_nickname: string;

  // ========== JOIN: Courses 테이블 ==========
  course_title: string;

  // ========== JOIN: Refunds 테이블 (nullable) ==========
  // Payments와 Refunds는 One-to-One 관계 (payment_id가 unique)
  refund: {
    id: number;                  // refund.id
    payment_id: number;          // refund.payment_id (FK → payment.id)
    user_id: number;             // refund.user_id (FK → users.id)
    amount: number;              // refund.amount (환불 금액)
    reason: string;              // refund.reason (환불 사유)
    status: 'pending' | 'approved' | 'rejected';  // refund.status
    admin_note: string | null;   // refund.admin_note (관리자 메모)
    requested_at: string;        // refund.requested_at (환불 요청일시)
    processed_at: string | null; // refund.processed_at (처리 완료일시)
  } | null;  // 환불 요청이 없으면 null
}

/**
 * API 쿼리 파라미터
 */
export interface PaymentApiParams {
  page: number;
  page_size: number;
  keyword?: string;              // 사용자 이메일, 닉네임, 강의명 검색
  payment_method?: 'card' | 'transfer' | 'easy' | null;
  status?: 'pending' | 'completed' | 'failed' | 'refunded' | null;
  start_date?: string;           // YYYY-MM-DD
  end_date?: string;             // YYYY-MM-DD
  refund_status?: 'pending' | 'approved' | 'rejected' | null;
}

/**
 * 환불 승인/거절 요청 데이터
 */
export interface RefundActionRequest {
  refund_id: number;             // refund.id
  payment_id: number;            // refund.payment_id
  action: 'approve' | 'reject';
  admin_note?: string;           // 관리자 메모 (선택)
}

/**
 * API 응답 타입
 */
export interface PaymentListResponse {
  items: PaymentListItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
