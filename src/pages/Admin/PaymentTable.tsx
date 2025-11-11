import React from 'react';
import type { PaymentListItem } from '../../types/AdminPaymentType';
import { Button } from '../../components/Button';
import * as S from './PaymentTable.styled';

interface PaymentTableProps {
  payments: PaymentListItem[];
  onApproveRefund: (payment: PaymentListItem) => void;
  onRejectRefund: (payment: PaymentListItem) => void;
  onRowClick: (payment: PaymentListItem) => void;
}

/**
 * 날짜 포맷팅 (YYYY-MM-DD HH:mm)
 */
const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'N/A';
  }
};

/**
 * 금액 포맷팅 (원화)
 */
const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()}원`;
};

/**
 * 결제 방식 한글 변환
 */
const getPaymentMethodLabel = (method: string): string => {
  const labels: Record<string, string> = {
    card: '카드',
    transfer: '계좌이체',
    easy: '간편결제',
  };
  return labels[method] || method;
};

/**
 * 결제 상태 한글 변환
 */
const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: '대기',
    completed: '완료',
    failed: '실패',
    refunded: '환불',
  };
  return labels[status] || status;
};

/**
 * 환불 상태 한글 변환
 */
const getRefundStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: '대기중',
    approved: '승인',
    rejected: '거절',
  };
  return labels[status] || status;
};

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onApproveRefund,
  onRejectRefund,
  onRowClick,
}) => {
  return (
    <S.TableWrapper>
      <S.StyledTable role="table" aria-label="결제 내역">
        <thead>
          <tr>
            <th scope="col">결제번호</th>
            <th scope="col">결제일</th>
            <th scope="col">사용자</th>
            <th scope="col">강의명</th>
            <th scope="col">결제 방식</th>
            <th scope="col">결제 금액</th>
            <th scope="col">결제 상태</th>
            <th scope="col">환불 요청</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={9}>검색된 결제 내역이 없습니다.</td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr
                key={payment.id}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onRowClick(payment);
                    return;
                  }

                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextRow = event.currentTarget
                      .nextElementSibling as HTMLTableRowElement | null;
                    nextRow?.focus();
                    return;
                  }

                  if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const previousRow = event.currentTarget
                      .previousElementSibling as HTMLTableRowElement | null;
                    previousRow?.focus();
                  }
                }}
              >
                <td>
                  <S.PaymentId
                    type="button"
                    onClick={() => onRowClick(payment)}
                    aria-label={`결제 ${payment.id} 상세 보기`}
                  >
                    {payment.id}
                  </S.PaymentId>
                </td>
                <td>{formatDateTime(payment.paid_at)}</td>
                <td>
                  <S.UserInfo>
                    <div>{payment.user_nickname}</div>
                    <S.UserEmail>{payment.user_email}</S.UserEmail>
                  </S.UserInfo>
                </td>
                <td>
                  <S.CourseTitle>{payment.course_title}</S.CourseTitle>
                </td>
                <td>
                  <S.MethodBadge $method={payment.payment_method}>
                    {getPaymentMethodLabel(payment.payment_method)}
                  </S.MethodBadge>
                </td>
                <td>
                  <S.AmountInfo>
                    <strong>{formatCurrency(payment.final_amount)}</strong>
                    {payment.discount_amount > 0 ? (
                      <S.DiscountText>
                        (원가: {formatCurrency(payment.amount)}, 할인:{' '}
                        {formatCurrency(payment.discount_amount)})
                      </S.DiscountText>
                    ) : (
                      <S.DiscountText>(원가: {formatCurrency(payment.amount)})</S.DiscountText>
                    )}
                  </S.AmountInfo>
                </td>
                <td>
                  <S.StatusBadge $status={payment.status}>
                    {getStatusLabel(payment.status)}
                  </S.StatusBadge>
                </td>
                <td>
                  {payment.refund ? (
                    <S.RefundInfo>
                      <div>{formatCurrency(payment.refund.amount)}</div>
                      <S.RefundStatusBadge $status={payment.refund.status}>
                        {getRefundStatusLabel(payment.refund.status)}
                      </S.RefundStatusBadge>
                      {payment.refund.reason && (
                        <S.RefundReason>사유: {payment.refund.reason}</S.RefundReason>
                      )}
                    </S.RefundInfo>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {payment.refund?.status === 'pending' ? (
                    <S.ActionButtons>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onApproveRefund(payment)}
                        ariaLabel={`결제 ID ${payment.id} 환불 승인`}
                      >
                        승인
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRejectRefund(payment)}
                        ariaLabel={`결제 ID ${payment.id} 환불 거절`}
                      >
                        거절
                      </Button>
                    </S.ActionButtons>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </S.StyledTable>
    </S.TableWrapper>
  );
};

export default PaymentTable;
