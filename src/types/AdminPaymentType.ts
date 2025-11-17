/**
 * 결제 관리 - 타입 정의
 */

/**
 * 결제 목록 아이템 (백엔드 API 응답 + 기존 필드)
 */
export interface PaymentListItem {
  id: number;
  transaction_id: string; // PG사 거래 ID
  user_id: number;
  user_nickname: string;
  user_email: string;
  course_id: number;
  course_title: string;
  amount: number; // 원래 가격
  discount_amount: number; // 할인 금액
  final_amount: number; // 최종 결제 금액
  payment_method: string; // 결제 방식
  status: string; // 결제 상태
  paid_at: string; // 실제 결제 완료 시각 (ISO 8601)
  created_at: string; // 생성일시 (ISO 8601)

  // 추가 필드 (기존 코드 호환성)
  coupon_id?: number | null;
  receipt_url?: string;
  refund?: {
    id: number;
    payment_id: number;
    user_id: number;
    amount: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_note: string | null;
    requested_at: string;
    processed_at: string | null;
  } | null;
}

/**
 * API 쿼리 파라미터
 */
export interface PaymentApiParams {
  page: number;
  page_size: number;
  keyword?: string; // 사용자 이메일, 닉네임, 강의명 검색
  payment_method?: 'card' | 'transfer' | 'easy' | null;
  status?: 'pending' | 'completed' | 'failed' | 'refunded' | null;
  start_date?: string; // YYYY-MM-DD (결제일 paid_at 기준)
  end_date?: string; // YYYY-MM-DD (결제일 paid_at 기준)
  refund_status?: 'pending' | 'approved' | 'rejected' | null; // 환불 상태 필터
}

/**
 * 환불 승인/거절 요청 데이터
 */
export interface RefundActionRequest {
  refund_id: number; // refund.id
  payment_id: number; // refund.payment_id
  action: 'approve' | 'reject';
  admin_note?: string; // 관리자 메모 (선택)
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

/**
 * 환불 목록 아이템
 */
export interface RefundListItem {
  id: number; // 환불 ID
  payment_id: number; // 결제 ID
  transaction_id: string; // 거래 ID
  user_id: number;
  user_nickname: string;
  course_title: string;
  amount: number; // 환불 금액
  reason: string; // 환불 사유
  status: 'pending' | 'approved' | 'rejected';
  payment_date: string; // 원 결제일 (ISO 8601)
  progress_rate: number; // 강의 진행률 (0-100)
  requested_at: string; // 환불 요청일 (ISO 8601)
  processed_at: string | null; // 환불 처리일 (ISO 8601)
  admin_note: string | null; // 관리자 메모
}

/**
 * 환불 목록 API 응답
 */
export interface RefundListResponse {
  items: RefundListItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * 환불 목록 API 쿼리 파라미터
 */
export interface RefundApiParams {
  page: number;
  page_size: number;
  keyword?: string; // 사용자 닉네임, 강의명 검색
  status?: 'pending' | 'approved' | 'rejected' | null;
  start_date?: string; // YYYY-MM-DD (환불 요청일 requested_at 기준)
  end_date?: string; // YYYY-MM-DD (환불 요청일 requested_at 기준)
}

/**
 * 환불 상세 정보
 */
export interface RefundDetail {
  id: number;
  payment_id: number;
  user_id: number;
  user_nickname: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_note: string | null;
  requested_at: string;
  processed_at: string | null;
  payment_date: string;
  course_title: string;
  progress_rate: number;
}
