import styled from 'styled-components';

export const RefundTableStyles = {
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
