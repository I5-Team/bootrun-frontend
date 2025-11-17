import type {
  PaymentListItem,
  PaymentApiParams,
  PaymentListResponse,
} from '../types/AdminPaymentType';

/**
 * 목업 결제 데이터
 */
export const mockPayments: PaymentListItem[] = [
  // 1. 일반 결제 (환불 요청 없음)
  {
    id: 1,
    user_id: 101,
    course_id: 1,
    coupon_id: null,
    amount: 50000,
    discount_amount: 0,
    final_amount: 50000,
    payment_method: 'card',
    status: 'completed',
    transaction_id: 'TXN_20250110_001',
    receipt_url: 'https://example.com/receipt/1',
    paid_at: '2025-01-10T14:30:00',
    created_at: '2025-01-10T14:25:00',
    user_email: 'hong@example.com',
    user_nickname: '홍길동',
    course_title: 'React 완벽 마스터',
    refund: null,
  },
  // 2. 환불 대기 중 (승인/거절 버튼 표시)
  {
    id: 2,
    user_id: 102,
    course_id: 2,
    coupon_id: 1,
    amount: 80000,
    discount_amount: 10000,
    final_amount: 70000,
    payment_method: 'transfer',
    status: 'completed',
    transaction_id: 'TXN_20250111_002',
    receipt_url: 'https://example.com/receipt/2',
    paid_at: '2025-01-11T10:00:00',
    created_at: '2025-01-11T09:55:00',
    user_email: 'kim@example.com',
    user_nickname: '김철수',
    course_title: 'Vue.js 실전 프로젝트',
    refund: {
      id: 1,
      payment_id: 2,
      user_id: 102,
      amount: 70000,
      reason: '강의 수준이 맞지 않아요',
      status: 'pending',
      admin_note: null,
      requested_at: '2025-01-12T15:30:00',
      processed_at: null,
    },
  },
  // 3. 환불 승인됨
  {
    id: 3,
    user_id: 103,
    course_id: 3,
    coupon_id: null,
    amount: 60000,
    discount_amount: 5000,
    final_amount: 55000,
    payment_method: 'easy',
    status: 'refunded',
    transaction_id: 'TXN_20250109_003',
    receipt_url: 'https://example.com/receipt/3',
    paid_at: '2025-01-09T16:20:00',
    created_at: '2025-01-09T16:15:00',
    user_email: 'lee@example.com',
    user_nickname: '이영희',
    course_title: 'Node.js 백엔드 개발',
    refund: {
      id: 2,
      payment_id: 3,
      user_id: 103,
      amount: 55000,
      reason: '개인 사정으로 수강이 어려워요',
      status: 'approved',
      admin_note: '7일 이내, 진도율 5% 미만 확인',
      requested_at: '2025-01-10T09:00:00',
      processed_at: '2025-01-10T14:30:00',
    },
  },
  // 4. 환불 거절됨
  {
    id: 4,
    user_id: 104,
    course_id: 4,
    coupon_id: null,
    amount: 90000,
    discount_amount: 0,
    final_amount: 90000,
    payment_method: 'card',
    status: 'completed',
    transaction_id: 'TXN_20250105_004',
    receipt_url: 'https://example.com/receipt/4',
    paid_at: '2025-01-05T11:00:00',
    created_at: '2025-01-05T10:55:00',
    user_email: 'park@example.com',
    user_nickname: '박민수',
    course_title: 'Python 데이터 분석',
    refund: {
      id: 3,
      payment_id: 4,
      user_id: 104,
      amount: 90000,
      reason: '강의가 마음에 안 들어요',
      status: 'rejected',
      admin_note: '구매 후 15일 경과, 진도율 70% - 환불 불가',
      requested_at: '2025-01-20T10:00:00',
      processed_at: '2025-01-20T16:00:00',
    },
  },
  // 5. 결제 대기 중
  {
    id: 5,
    user_id: 105,
    course_id: 5,
    coupon_id: 2,
    amount: 100000,
    discount_amount: 20000,
    final_amount: 80000,
    payment_method: 'card',
    status: 'pending',
    transaction_id: 'TXN_20250113_005',
    receipt_url: '',
    paid_at: '2025-01-13T09:00:00',
    created_at: '2025-01-13T08:55:00',
    user_email: 'choi@example.com',
    user_nickname: '최지혜',
    course_title: 'TypeScript 완벽 가이드',
    refund: null,
  },
  // 6. 결제 실패
  {
    id: 6,
    user_id: 106,
    course_id: 6,
    coupon_id: null,
    amount: 75000,
    discount_amount: 0,
    final_amount: 75000,
    payment_method: 'transfer',
    status: 'failed',
    transaction_id: 'TXN_20250112_006',
    receipt_url: '',
    paid_at: '2025-01-12T13:00:00',
    created_at: '2025-01-12T12:55:00',
    user_email: 'jung@example.com',
    user_nickname: '정민호',
    course_title: 'Django REST Framework',
    refund: null,
  },
  // 추가 샘플 데이터 (7-30) - ID와 날짜가 일치하도록 수정
  ...Array.from({ length: 24 }, (_, i) => {
    const id = i + 7;
    const userId = 106 + i;
    const hasRefund = i % 5 === 0;
    const refundStatus: 'pending' | 'approved' | 'rejected' =
      i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'approved' : 'rejected';

    // ID가 증가할수록 최신 날짜가 되도록 수정 (유효한 날짜 범위 내에서)
    const baseDate = new Date(2025, 0, 14); // 2025-01-14부터 시작
    const paymentDate = new Date(baseDate.getTime() + i * 60 * 60 * 1000); // 매 결제마다 1시간씩 증가

    const year = paymentDate.getFullYear();
    const month = String(paymentDate.getMonth() + 1).padStart(2, '0');
    const day = String(paymentDate.getDate()).padStart(2, '0');
    const hour = String(paymentDate.getHours()).padStart(2, '0');
    const minute = String(paymentDate.getMinutes()).padStart(2, '0');

    // created_at은 결제 5분 전
    const createdDate = new Date(paymentDate.getTime() - 5 * 60 * 1000);
    const createdHour = String(createdDate.getHours()).padStart(2, '0');
    const createdMinute = String(createdDate.getMinutes()).padStart(2, '0');

    // 환불 요청일은 결제 후 1일 뒤
    const refundRequestDate = new Date(paymentDate.getTime() + 24 * 60 * 60 * 1000);
    const refundReqMonth = String(refundRequestDate.getMonth() + 1).padStart(2, '0');
    const refundReqDay = String(refundRequestDate.getDate()).padStart(2, '0');

    // 환불 처리일은 요청 후 1일 뒤
    const refundProcessDate = new Date(refundRequestDate.getTime() + 24 * 60 * 60 * 1000);
    const refundProcMonth = String(refundProcessDate.getMonth() + 1).padStart(2, '0');
    const refundProcDay = String(refundProcessDate.getDate()).padStart(2, '0');

    return {
      id,
      user_id: userId,
      course_id: (i % 10) + 1,
      coupon_id: i % 3 === 0 ? (i % 5) + 1 : null,
      amount: [50000, 70000, 90000, 100000][i % 4],
      discount_amount: i % 3 === 0 ? 10000 : 0,
      final_amount: [50000, 70000, 90000, 100000][i % 4] - (i % 3 === 0 ? 10000 : 0),
      payment_method: (['card', 'transfer', 'easy'] as const)[i % 3],
      status: (['completed', 'pending', 'failed', 'refunded'] as const)[i % 4],
      transaction_id: `TXN_${year}${month}${day}_${String(id).padStart(3, '0')}`,
      receipt_url: i % 4 !== 2 ? `https://example.com/receipt/${id}` : '',
      paid_at: `${year}-${month}-${day}T${hour}:${minute}:00`,
      created_at: `${year}-${month}-${day}T${createdHour}:${createdMinute}:00`,
      user_email: `user${userId}@example.com`,
      user_nickname: `사용자${userId}`,
      course_title: ['React 강의', 'Vue 강의', 'Angular 강의', 'Node 강의', 'Python 강의'][i % 5],
      refund: hasRefund
        ? {
            id: Math.floor(i / 5) + 4,
            payment_id: id,
            user_id: userId,
            amount: [50000, 70000, 90000, 100000][i % 4] - (i % 3 === 0 ? 10000 : 0),
            reason: ['강의 수준 불만', '개인 사정', '중복 구매'][i % 3],
            status: refundStatus,
            admin_note: refundStatus === 'pending' ? null : `처리 완료: ${refundStatus}`,
            requested_at: `${year}-${refundReqMonth}-${refundReqDay}T10:00:00`,
            processed_at:
              refundStatus === 'pending'
                ? null
                : `${year}-${refundProcMonth}-${refundProcDay}T15:00:00`,
          }
        : null,
    } as PaymentListItem;
  }),
];

/**
 * 필터링 및 페이지네이션 처리
 */
export const getPaginatedPayments = (params: PaymentApiParams): PaymentListResponse => {
  let filteredPayments = [...mockPayments];

  // 1. 키워드 검색 (이메일, 닉네임, 강의명)
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filteredPayments = filteredPayments.filter(
      (p) =>
        p.user_email.toLowerCase().includes(keyword) ||
        p.user_nickname.toLowerCase().includes(keyword) ||
        p.course_title.toLowerCase().includes(keyword)
    );
  }

  // 2. 결제 방식 필터
  if (params.payment_method) {
    filteredPayments = filteredPayments.filter((p) => p.payment_method === params.payment_method);
  }

  // 3. 결제 상태 필터
  if (params.status) {
    filteredPayments = filteredPayments.filter((p) => p.status === params.status);
  }

  // 4. 날짜 범위 필터
  if (params.start_date) {
    filteredPayments = filteredPayments.filter((p) => p.paid_at >= params.start_date!);
  }
  if (params.end_date) {
    filteredPayments = filteredPayments.filter((p) => p.paid_at <= params.end_date! + 'T23:59:59');
  }

  // 5. 환불 상태 필터
  if (params.refund_status) {
    filteredPayments = filteredPayments.filter(
      (p) => p.refund && p.refund.status === params.refund_status
    );
  }

  // 6. 정렬 (최신순)
  filteredPayments.sort((a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime());

  // 7. 페이지네이션
  const total = filteredPayments.length;
  const total_pages = Math.ceil(total / params.page_size);
  const startIndex = (params.page - 1) * params.page_size;
  const endIndex = startIndex + params.page_size;
  const items = filteredPayments.slice(startIndex, endIndex);

  return {
    items,
    total,
    page: params.page,
    page_size: params.page_size,
    total_pages,
  };
};
