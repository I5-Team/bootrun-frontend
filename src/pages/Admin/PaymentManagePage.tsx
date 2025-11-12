/**
 * 결제 관리 페이지 - 결제 내역 조회, 환불 승인/거절 기능 제공
 * 필터/검색, 페이지네이션, 엑셀 다운로드 기능
 */
import { useState, useEffect, useCallback } from 'react';
import type { PaymentApiParams, PaymentListItem } from '../../types/AdminPaymentType';
import { getPaginatedPayments } from '../../data/mockPaymentData';
import { Button } from '../../components/Button';

// 하위 컴포넌트 임포트
import AdminPageLayout from './AdminPageLayout';
import PaymentFilterBar from './PaymentFilterBar';
import PaymentTable from './PaymentTable';
import Pagination from '../../components/Pagination';
import PaymentDetailModal from './PaymentDetailModal';
import { LoadingSpinner } from '../../components/HelperComponents';
import { AdminPageStyles as S } from './AdminPageStyles';

/**
 * 엑셀(CSV) 다운로드 함수
 */
const downloadExcel = (payments: PaymentListItem[]) => {
  // CSV 헤더
  const headers = [
    'ID',
    '결제일',
    '사용자 이메일',
    '사용자 닉네임',
    '강의명',
    '결제 방식',
    '원래 가격',
    '할인 금액',
    '최종 결제 금액',
    '결제 상태',
    '환불 금액',
    '환불 상태',
    '환불 사유',
    '거래 ID',
  ];

  // CSV 데이터 생성
  const rows = payments.map((p) => [
    p.id,
    new Date(p.paid_at).toLocaleString('ko-KR'),
    p.user_email,
    p.user_nickname,
    p.course_title,
    p.payment_method === 'card'
      ? '카드'
      : p.payment_method === 'transfer'
        ? '계좌이체'
        : '간편결제',
    p.amount,
    p.discount_amount,
    p.final_amount,
    p.status === 'pending'
      ? '대기'
      : p.status === 'completed'
        ? '완료'
        : p.status === 'failed'
          ? '실패'
          : '환불',
    p.refund?.amount || '',
    p.refund?.status === 'pending'
      ? '대기중'
      : p.refund?.status === 'approved'
        ? '승인'
        : p.refund?.status === 'rejected'
          ? '거절'
          : '',
    p.refund?.reason || '',
    p.transaction_id,
  ]);

  // CSV 문자열 생성 (BOM 추가로 엑셀에서 한글 깨짐 방지)
  const csvContent =
    '\uFEFF' +
    [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');

  // Blob 생성 및 다운로드
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const now = new Date();
  const padNumber = (value: number) => value.toString().padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(
    now.getDate()
  )}-Time-${padNumber(now.getHours())}-${padNumber(now.getMinutes())}-${padNumber(now.getSeconds())}`;
  link.href = url;
  link.download = `payments_${timestamp}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export default function PaymentManagePage() {
  // 1. 상태 정의
  const [payments, setPayments] = useState<PaymentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentListItem | null>(null);

  // API 쿼리 파라미터 상태
  const [apiParams, setApiParams] = useState<PaymentApiParams>({
    page: 1,
    page_size: 20,
    keyword: '',
    payment_method: null,
    status: null,
    start_date: '',
    end_date: '',
    refund_status: null,
  });

  // API 응답의 페이지네이션 정보 상태
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // 2. 데이터 흐름 (useEffect)
  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      try {
        // 목업 데이터 로드
        const response = getPaginatedPayments(apiParams);
        setPayments(response.items);
        setPagination({
          total: response.total,
          totalPages: response.total_pages,
        });
      } catch (error) {
        console.error('결제 내역 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPayments();
  }, [apiParams]);

  // 3. 핸들러 구현

  // 필터/검색 핸들러
  const handleFilterChange = useCallback((newFilters: Partial<PaymentApiParams>) => {
    setApiParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1, // 필터 변경 시 1페이지로 리셋
    }));
  }, []);

  // 페이지 이동 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    setApiParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
    // 페이지 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 환불 승인 핸들러
  const handleApproveRefund = useCallback((payment: PaymentListItem) => {
    if (!payment.refund) return;

    const confirmed = window.confirm(
      `결제 ID ${payment.id}의 환불을 승인하시겠습니까?\n환불 금액: ${payment.refund.amount.toLocaleString()}원`
    );

    if (confirmed) {
      console.log('환불 승인:', {
        refund_id: payment.refund.id,
        payment_id: payment.refund.payment_id,
        action: 'approve',
      });
      // TODO: API 호출
      alert('환불이 승인되었습니다.');
      // 목록 새로고침
      setApiParams((prev) => ({ ...prev }));
    }
  }, []);

  // 환불 거절 핸들러
  const handleRejectRefund = useCallback((payment: PaymentListItem) => {
    if (!payment.refund) return;

    const reason = window.prompt('환불 거절 사유를 입력해주세요:');
    if (!reason) return;

    console.log('환불 거절:', {
      refund_id: payment.refund.id,
      payment_id: payment.refund.payment_id,
      action: 'reject',
      admin_note: reason,
    });
    // TODO: API 호출
    alert('환불이 거절되었습니다.');
    // 목록 새로고침
    setApiParams((prev) => ({ ...prev }));
  }, []);

  // 엑셀 다운로드 핸들러
  const handleDownloadExcel = useCallback(() => {
    if (payments.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }
    downloadExcel(payments);
  }, [payments]);

  // 결제 상세 모달 열기 핸들러
  const handleRowClick = useCallback((payment: PaymentListItem) => {
    setSelectedPayment(payment);
  }, []);

  // 결제 상세 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setSelectedPayment(null);
  }, []);

  return (
    <AdminPageLayout
      title="결제 관리"
      rightElement={
        <Button size="md" onClick={handleDownloadExcel} ariaLabel="엑셀 다운로드">
          엑셀 다운로드
        </Button>
      }
    >
      <PaymentFilterBar onFilterChange={handleFilterChange} initialFilters={apiParams} />

      {/* 테이블과 페이지네이션을 카드에 함께 표시 */}
      <S.CardBox>
        <S.TableHeader>
          <span>총 {pagination.total.toLocaleString()}건의 결제 내역</span>
        </S.TableHeader>

        {loading ? (
          <S.LoadingContainer>
            <LoadingSpinner />
          </S.LoadingContainer>
        ) : (
          <PaymentTable
            payments={payments}
            onApproveRefund={handleApproveRefund}
            onRejectRefund={handleRejectRefund}
            onRowClick={handleRowClick}
          />
        )}

        <S.PaginationWrapper>
          <Pagination
            currentPage={apiParams.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </S.PaginationWrapper>
      </S.CardBox>

      {/* 결제 상세 모달 */}
      {selectedPayment && (
        <PaymentDetailModal payment={selectedPayment} onClose={handleCloseModal} />
      )}
    </AdminPageLayout>
  );
}
