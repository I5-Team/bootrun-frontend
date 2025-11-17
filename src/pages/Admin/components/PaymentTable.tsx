import React from 'react';
import type { PaymentListItem } from '../../../types/AdminPaymentType';
import * as S from '../styles/PaymentTable.styled';

interface PaymentTableProps {
  payments: PaymentListItem[];
  onRowClick: (payment: PaymentListItem) => void;
  currentPage: number;
  pageSize: number;
  totalCount: number;
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

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onRowClick,
  currentPage,
  pageSize,
  totalCount,
}) => {
  const getRowNumber = (index: number): number => {
    return totalCount - (currentPage - 1) * pageSize - index;
  };

  return (
    <S.TableWrapper>
      <S.StyledTable role="table" aria-label="결제 내역">
        <thead>
          <tr>
            <th scope="col">순번</th>
            <th scope="col">결제ID</th>
            <th scope="col">결제일</th>
            <th scope="col">사용자</th>
            <th scope="col">강의명</th>
            <th scope="col">결제 방식</th>
            <th scope="col">결제 금액</th>
            <th scope="col">결제 상태</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={8}>검색된 결제 내역이 없습니다.</td>
            </tr>
          ) : (
            payments.map((payment, index) => {
              const rowNumber = getRowNumber(index);
              return (
                <tr
                  key={payment.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onRowClick(payment)}
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
                  <td>{rowNumber}</td>
                  <td>{payment.id}</td>
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
                </tr>
              );
            })
          )}
        </tbody>
      </S.StyledTable>
    </S.TableWrapper>
  );
};

export default PaymentTable;
