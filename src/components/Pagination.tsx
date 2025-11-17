/**
 * 페이지네이션 공통 컴포넌트
 * 관리자 페이지 및 기타 목록 페이지에서 사용
 */
import React from 'react';
import styled from 'styled-components';

// 좌우 화살표 아이콘
const PrevIcon = () => <>＜</>;
const NextIcon = () => <>＞</>;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** 페이지 번호를 인자로 받는 콜백 함수 */
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 렌더링할 페이지가 없거나 1페이지뿐이면 아무것도 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  return (
    <S.Nav role="navigation" aria-label="페이지네이션">
      <S.PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        <PrevIcon />
      </S.PageButton>

      <S.PageInfo aria-live="polite" aria-atomic="true">
        <span className="sr-only">현재 페이지: </span>
        <strong>{currentPage}</strong> / {totalPages}
      </S.PageInfo>

      <S.PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
      >
        <NextIcon />
      </S.PageButton>
    </S.Nav>
  );
};

// --- Styles ---
const S = {
  Nav: styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  `,
  PageButton: styled.button`
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray400};
    cursor: pointer;

    &:disabled {
      background: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray200};
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${({ theme }) => theme.colors.gray100};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary300};
      outline-offset: 2px;
    }
  `,
  PageInfo: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    padding: 0 0.8rem;

    strong {
      color: ${({ theme }) => theme.colors.surface};
      font-weight: 600;
    }
  `,
};

export default Pagination;
