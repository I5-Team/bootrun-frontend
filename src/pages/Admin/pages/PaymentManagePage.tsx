/**
 * 결제 관리 페이지 - 결제 내역 조회, 환불 관리 (탭 분리)
 * 필터/검색, 페이지네이션, 엑셀 다운로드 기능
 */
import { useState, useCallback } from 'react';
import { PaymentManagePageStyles as S } from '../styles/PaymentManagePage.styled';
import type {
  PaymentApiParams,
  PaymentListItem,
  RefundApiParams,
  RefundListItem,
} from '../../../types/AdminPaymentType';
import { updateRefundStatus, exportPayments } from '../../../api/adminApi';
import { Button } from '../../../components/Button';

// 하위 컴포넌트 임포트
import AdminPageLayout from './AdminPageLayout';
import PaymentFilterBar from '../components/PaymentFilterBar';
import PaymentTable from '../components/PaymentTable';
import RefundFilterBar from '../components/RefundFilterBar';
import RefundTable from '../components/RefundTable';
import Pagination from '../../../components/Pagination';
import PaymentDetailModal from '../components/PaymentDetailModal';
import RefundDetailModal from '../components/RefundDetailModal';
import { LoadingSpinner } from '../../../components/HelperComponents';
import { AdminPageStyles } from '../styles/AdminPageStyles';

// 커스텀 훅
import { usePaymentDataLoader } from '../hooks/usePaymentDataLoader';

type TabType = 'payments' | 'refunds';

export default function PaymentManagePage() {
  // 1. 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('payments');

  // 2. 필터 및 페이지네이션 상태
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [paymentParams, setPaymentParams] = useState<PaymentApiParams>({
    page: 1,
    page_size: 20,
    keyword: '',
    payment_method: null,
    status: null,
    start_date: '',
    end_date: '',
  });
  const [refundParams, setRefundParams] = useState<RefundApiParams>({
    page: 1,
    page_size: 20,
    keyword: '',
    status: null,
    start_date: '',
    end_date: '',
  });

  // 3. 모달 상태
  const [selectedPayment, setSelectedPayment] = useState<PaymentListItem | null>(null);
  const [selectedRefund, setSelectedRefund] = useState<RefundListItem | null>(null);

  // 4. 데이터 로더 훅
  const { payments, paymentLoading, paymentPagination, refunds, refundLoading, refundPagination } =
    usePaymentDataLoader(activeTab, paymentParams, refundParams);

  // 5. 핸들러 구현

  // 탭 전환
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  // 결제 필터 변경
  const handlePaymentFilterChange = useCallback((newFilters: Partial<PaymentApiParams>) => {
    setPaymentParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1,
    }));
  }, []);

  // 결제 페이지 변경
  const handlePaymentPageChange = useCallback((newPage: number) => {
    setPaymentParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 환불 필터 변경
  const handleRefundFilterChange = useCallback((newFilters: Partial<RefundApiParams>) => {
    setRefundParams((prevParams: RefundApiParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1,
    }));
  }, []);

  // 환불 페이지 변경
  const handleRefundPageChange = useCallback((newPage: number) => {
    setRefundParams((prevParams: RefundApiParams) => ({
      ...prevParams,
      page: newPage,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 환불 승인 (환불 테이블에서 호출)
  const handleApproveRefund = useCallback(async (refund: RefundListItem) => {
    const confirmed = window.confirm(
      `환불 ID ${refund.id}를 승인하시겠습니까?\n환불 금액: ${refund.amount.toLocaleString()}원`
    );
    if (!confirmed) return;

    // 승인 시에도 메모 입력 받기 (선택사항)
    const adminNote = window.prompt(
      '승인 메모를 입력하세요 (선택사항):',
      '환불 조건 충족하여 승인 처리'
    );

    try {
      await updateRefundStatus(refund.id, 'approved', adminNote || undefined);
      alert('환불이 승인되었습니다.');

      // 목록 새로고침
      setRefundParams((prev: RefundApiParams) => ({ ...prev }));
    } catch (error) {
      console.error('환불 승인 실패:', error);
      alert('환불 승인에 실패했습니다. 다시 시도해주세요.');
    }
  }, []);

  // 환불 거절 (환불 테이블에서 호출)
  const handleRejectRefund = useCallback(async (refund: RefundListItem) => {
    const adminNote = window.prompt('환불 거절 사유를 입력해주세요:');
    if (!adminNote) return; // 거절 시에는 사유 필수

    try {
      await updateRefundStatus(refund.id, 'rejected', adminNote);
      alert('환불이 거절되었습니다.');

      // 목록 새로고침
      setRefundParams((prev: RefundApiParams) => ({ ...prev }));
    } catch (error) {
      console.error('환불 거절 실패:', error);
      alert('환불 거절에 실패했습니다. 다시 시도해주세요.');
    }
  }, []);

  // 엑셀 다운로드
  const handleDownloadExcel = useCallback(async () => {
    if (activeTab === 'payments') {
      try {
        setDownloadLoading(true);

        // 전체 데이터 다운로드를 위해 페이지와 페이지 크기를 조정
        // 백엔드 제한: page_size 최대 100
        const exportParams = {
          ...paymentParams,
          page: 1,
          page_size: 100, // 백엔드 최대값
        };

        // 백엔드 API 호출하여 파일 다운로드
        const blob = await exportPayments(exportParams);

        // Blob을 파일로 다운로드
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
      } catch (error) {
        console.error('엑셀 다운로드 실패:', error);
        alert('엑셀 다운로드에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setDownloadLoading(false);
      }
    } else {
      // 환불 관리 탭 (추후 백엔드 API 추가 시 구현)
      alert('환불 관리 엑셀 다운로드는 준비 중입니다.');
    }
  }, [activeTab, paymentParams]);

  // 결제 상세 모달
  const handlePaymentRowClick = useCallback((payment: PaymentListItem) => {
    setSelectedPayment(payment);
  }, []);

  const handleClosePaymentModal = useCallback(() => {
    setSelectedPayment(null);
  }, []);

  // 환불 상세 모달
  const handleRefundRowClick = useCallback((refund: RefundListItem) => {
    setSelectedRefund(refund);
  }, []);

  const handleCloseRefundModal = useCallback(() => {
    setSelectedRefund(null);
  }, []);

  return (
    <AdminPageLayout
      title="결제 관리"
      rightElement={
        <Button
          size="md"
          onClick={handleDownloadExcel}
          disabled={downloadLoading}
          ariaLabel="엑셀 다운로드"
        >
          {downloadLoading ? '다운로드 중...' : '엑셀 다운로드'}
        </Button>
      }
    >
      {/* 탭 네비게이션 */}
      <S.TabContainer>
        <S.Tab $active={activeTab === 'payments'} onClick={() => handleTabChange('payments')}>
          결제 내역
        </S.Tab>
        <S.Tab $active={activeTab === 'refunds'} onClick={() => handleTabChange('refunds')}>
          환불 관리
        </S.Tab>
      </S.TabContainer>

      {/* 결제 내역 탭 */}
      {activeTab === 'payments' && (
        <>
          <PaymentFilterBar
            onFilterChange={handlePaymentFilterChange}
            initialFilters={paymentParams}
          />

          <AdminPageStyles.CardBox>
            <AdminPageStyles.TableHeader>
              <span>총 {paymentPagination.total.toLocaleString()}건의 결제 내역</span>
            </AdminPageStyles.TableHeader>

            {paymentLoading ? (
              <AdminPageStyles.LoadingContainer>
                <LoadingSpinner />
              </AdminPageStyles.LoadingContainer>
            ) : (
              <PaymentTable
                payments={payments}
                onRowClick={handlePaymentRowClick}
                currentPage={paymentParams.page}
                pageSize={paymentParams.page_size}
                totalCount={paymentPagination.total}
              />
            )}

            <AdminPageStyles.PaginationWrapper>
              <Pagination
                currentPage={paymentParams.page}
                totalPages={paymentPagination.totalPages}
                onPageChange={handlePaymentPageChange}
              />
            </AdminPageStyles.PaginationWrapper>
          </AdminPageStyles.CardBox>
        </>
      )}

      {/* 환불 관리 탭 */}
      {activeTab === 'refunds' && (
        <>
          <RefundFilterBar
            onFilterChange={handleRefundFilterChange}
            initialFilters={refundParams}
          />

          <AdminPageStyles.CardBox>
            <AdminPageStyles.TableHeader>
              <span>총 {refundPagination.total.toLocaleString()}건의 환불 내역</span>
            </AdminPageStyles.TableHeader>

            {refundLoading ? (
              <AdminPageStyles.LoadingContainer>
                <LoadingSpinner />
              </AdminPageStyles.LoadingContainer>
            ) : (
              <RefundTable
                refunds={refunds}
                onApproveRefund={handleApproveRefund}
                onRejectRefund={handleRejectRefund}
                onRowClick={handleRefundRowClick}
                currentPage={refundParams.page}
                pageSize={refundParams.page_size}
                totalCount={refundPagination.total}
              />
            )}

            <AdminPageStyles.PaginationWrapper>
              <Pagination
                currentPage={refundParams.page}
                totalPages={refundPagination.totalPages}
                onPageChange={handleRefundPageChange}
              />
            </AdminPageStyles.PaginationWrapper>
          </AdminPageStyles.CardBox>
        </>
      )}

      {/* 결제 상세 모달 */}
      {selectedPayment && (
        <PaymentDetailModal payment={selectedPayment} onClose={handleClosePaymentModal} />
      )}

      {/* 환불 상세 모달 */}
      {selectedRefund && (
        <RefundDetailModal refund={selectedRefund} onClose={handleCloseRefundModal} />
      )}
    </AdminPageLayout>
  );
}
