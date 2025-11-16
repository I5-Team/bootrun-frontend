import React from 'react';
import styled from 'styled-components';
import type { RefundListItem } from '../../types/AdminPaymentType';
import { Button } from '../../components/Button';
import * as PaymentStyles from './PaymentTable.styled';

interface RefundTableProps {
  refunds: RefundListItem[];
  onApproveRefund: (refund: RefundListItem) => void;
  onRejectRefund: (refund: RefundListItem) => void;
  onRowClick: (refund: RefundListItem) => void;
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

const RefundTable: React.FC<RefundTableProps> = ({
  refunds,
  onApproveRefund,
  onRejectRefund,
  onRowClick,
  currentPage,
  pageSize,
  totalCount,
}) => {
  const getRowNumber = (index: number): number => {
    return totalCount - (currentPage - 1) * pageSize - index;
  };

  return (
    <PaymentStyles.TableWrapper>
      <PaymentStyles.StyledTable role="table" aria-label="환불 내역">
        <thead>
          <tr>
            <th scope="col">순번</th>
            <th scope="col">환불ID</th>
            <th scope="col">결제ID</th>
            <th scope="col">환불요청일</th>
            <th scope="col">처리일</th>
            <th scope="col">사용자</th>
            <th scope="col">강의명</th>
            <th scope="col">환불금액</th>
            <th scope="col">진행률</th>
            <th scope="col">환불상태</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          {refunds.length === 0 ? (
            <tr>
              <td colSpan={11}>검색된 환불 내역이 없습니다.</td>
            </tr>
          ) : (
            refunds.map((refund, index) => {
              const rowNumber = getRowNumber(index);
              return (
                <tr
                  key={refund.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onRowClick(refund)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onRowClick(refund);
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
                  <td>{refund.id}</td>
                  <td>{refund.payment_id}</td>
                  <td>{formatDateTime(refund.requested_at)}</td>
                  <td>{refund.processed_at ? formatDateTime(refund.processed_at) : '-'}</td>
                  <td>
                    <PaymentStyles.UserInfo>
                      <div>{refund.user_nickname}</div>
                    </PaymentStyles.UserInfo>
                  </td>
                  <td>
                    <PaymentStyles.CourseTitle>{refund.course_title}</PaymentStyles.CourseTitle>
                  </td>
                  <td>
                    <strong>{formatCurrency(refund.amount)}</strong>
                  </td>
                  <td>
                    <S.ProgressBadge $rate={refund.progress_rate}>
                      {refund.progress_rate}%
                    </S.ProgressBadge>
                  </td>
                  <td>
                    <PaymentStyles.RefundStatusBadge $status={refund.status}>
                      {getRefundStatusLabel(refund.status)}
                    </PaymentStyles.RefundStatusBadge>
                  </td>
                  <td>
                    {refund.status === 'pending' ? (
                      <PaymentStyles.ActionButtons>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onApproveRefund(refund);
                          }}
                          ariaLabel={`환불 ID ${refund.id} 승인`}
                        >
                          승인
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRejectRefund(refund);
                          }}
                          ariaLabel={`환불 ID ${refund.id} 거절`}
                        >
                          거절
                        </Button>
                      </PaymentStyles.ActionButtons>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </PaymentStyles.StyledTable>
    </PaymentStyles.TableWrapper>
  );
};

// --- Styles ---
const S = {
  RefundId: styled.button`
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    background: none;
    border: none;
    padding: 0;
    font: inherit;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:focus-visible {
      outline: none;
      text-decoration-thickness: 0.2rem;
    }
  `,
  ProgressBadge: styled.span<{ $rate: number }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    font-size: 1.2rem;
    font-weight: 500;
    background-color: ${({ $rate }) => {
      if ($rate === 0) return '#E3F2FD'; // 파란색 계열
      if ($rate < 50) return '#FFF3E0'; // 주황색 계열
      return '#FFEBEE'; // 빨간색 계열
    }};
    color: ${({ $rate }) => {
      if ($rate === 0) return '#1976D2';
      if ($rate < 50) return '#F57C00';
      return '#C62828';
    }};
  `,
};

export default RefundTable;
