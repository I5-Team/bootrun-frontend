import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import type { PaymentApiParams } from '../../types/AdminPaymentType';

interface PaymentFilterBarProps {
  /** 현재 적용된 필터 값 (부모로부터 받음) */
  initialFilters: PaymentApiParams;
  /** 필터 변경 및 검색 실행 시 호출될 함수 */
  onFilterChange: (newFilters: Partial<PaymentApiParams>) => void;
}

const PaymentFilterBar: React.FC<PaymentFilterBarProps> = ({ initialFilters, onFilterChange }) => {
  // 1. 컴포넌트 내부에서 사용할 필터 상태 (props와 분리)
  const [filters, setFilters] = useState(initialFilters);

  // 2. 부모의 'initialFilters'가 변경되면 내부 상태도 동기화
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // 3. input, select 변경 시 내부 상태만 업데이트
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setFilters((prev) => {
        if (name === 'payment_method' || name === 'status' || name === 'refund_status') {
          return {
            ...prev,
            [name]: (value === 'null' ? null : value) as PaymentApiParams[typeof name],
          };
        }

        if (name === 'keyword' || name === 'start_date' || name === 'end_date') {
          return {
            ...prev,
            [name]: value,
          };
        }

        return prev;
      });
    },
    []
  );

  // 4. "검색" 버튼 클릭 시, 부모(PaymentManagePage)에게 변경 사항 전송
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFilterChange(filters);
    },
    [filters, onFilterChange]
  );

  return (
    <S.CardBox as="form" onSubmit={handleSubmit}>
      <S.FilterGroup>
        <label htmlFor="keyword-filter">검색</label>
        <S.Input
          id="keyword-filter"
          type="text"
          name="keyword"
          placeholder="이메일, 닉네임, 강의명 검색"
          value={filters.keyword || ''}
          onChange={handleChange}
        />
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="payment-method-filter">결제 방식</label>
        <S.Select
          id="payment-method-filter"
          name="payment_method"
          value={filters.payment_method || 'null'}
          onChange={handleChange}
          aria-label="결제 방식 필터"
        >
          <option value="null">전체</option>
          <option value="card">카드</option>
          <option value="transfer">계좌이체</option>
          <option value="easy">간편결제</option>
        </S.Select>
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="status-filter">결제 상태</label>
        <S.Select
          id="status-filter"
          name="status"
          value={filters.status || 'null'}
          onChange={handleChange}
          aria-label="결제 상태 필터"
        >
          <option value="null">전체</option>
          <option value="pending">대기</option>
          <option value="completed">완료</option>
          <option value="failed">실패</option>
          <option value="refunded">환불</option>
        </S.Select>
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="refund-status-filter">환불 상태</label>
        <S.Select
          id="refund-status-filter"
          name="refund_status"
          value={filters.refund_status || 'null'}
          onChange={handleChange}
          aria-label="환불 상태 필터"
        >
          <option value="null">전체</option>
          <option value="pending">대기중</option>
          <option value="approved">승인</option>
          <option value="rejected">거절</option>
        </S.Select>
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="start-date-filter">시작일</label>
        <S.Input
          id="start-date-filter"
          type="date"
          name="start_date"
          value={filters.start_date || ''}
          onChange={handleChange}
          aria-label="시작일 필터"
        />
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="end-date-filter">종료일</label>
        <S.Input
          id="end-date-filter"
          type="date"
          name="end_date"
          value={filters.end_date || ''}
          onChange={handleChange}
          aria-label="종료일 필터"
        />
      </S.FilterGroup>

      <S.SubmitButton type="submit">검색</S.SubmitButton>
    </S.CardBox>
  );
};

// --- Styles ---
const S = {
  CardBox: styled.form`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 2.4rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;
    align-items: flex-end;
  `,
  FilterGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    label {
      font-size: 1.3rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray400};
    }
  `,
  Input: styled.input`
    height: 4.2rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    min-width: 20rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  Select: styled.select`
    height: 4.2rem;
    padding: 0 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    width: 15rem;
    background: white;
    cursor: pointer;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  SubmitButton: styled.button`
    height: 4.2rem;
    padding: 0 2.4rem;
    background: ${({ theme }) => theme.colors.primary300};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    margin-left: auto;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
};

export default PaymentFilterBar;
