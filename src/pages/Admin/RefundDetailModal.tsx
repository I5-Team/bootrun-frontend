import React from 'react';
import styled from 'styled-components';
import type { RefundListItem } from '../../types/AdminPaymentType';

interface RefundDetailModalProps {
  refund: RefundListItem;
  onClose: () => void;
}

/**
 * 날짜 포맷팅 (YYYY-MM-DD HH:mm:ss)
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
      second: '2-digit',
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

const RefundDetailModal: React.FC<RefundDetailModalProps> = ({ refund, onClose }) => {
  const modalContainerRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  // 모달 열릴 때 body 스크롤 차단 및 포커스 복원 준비
  React.useEffect(() => {
    const scrollY = window.scrollY;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);

      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  // 포커스 트랩 및 ESC 처리
  React.useEffect(() => {
    const modalElement = modalContainerRef.current;
    if (!modalElement) return undefined;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusFirstElement = () => {
      const focusableElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute('data-focus-disabled'));

      const initialTarget = closeButtonRef.current || focusableElements[0] || modalElement;
      initialTarget.focus();
    };

    focusFirstElement();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute('data-focus-disabled'));

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalElement.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const { activeElement } = document;

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer
        ref={modalContainerRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <S.ModalHeader>
          <S.ModalTitle id="modal-title">환불 상세 정보</S.ModalTitle>
          <S.CloseButton ref={closeButtonRef} onClick={onClose} aria-label="닫기">
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          {/* 환불 기본 정보 */}
          <S.Section>
            <S.SectionTitle>환불 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>환불 ID</S.InfoLabel>
                <S.InfoValue>{refund.id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>결제 ID</S.InfoLabel>
                <S.InfoValue>{refund.payment_id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>거래 ID</S.InfoLabel>
                <S.InfoValue>{refund.transaction_id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>환불 금액</S.InfoLabel>
                <S.InfoValue>
                  <strong>{formatCurrency(refund.amount)}</strong>
                </S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>환불 상태</S.InfoLabel>
                <S.InfoValue>
                  <S.RefundStatusBadge $status={refund.status}>
                    {getRefundStatusLabel(refund.status)}
                  </S.RefundStatusBadge>
                </S.InfoValue>
              </S.InfoRow>
            </S.InfoGrid>
          </S.Section>

          {/* 사용자 정보 */}
          <S.Section>
            <S.SectionTitle>사용자 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>사용자 ID</S.InfoLabel>
                <S.InfoValue>{refund.user_id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>닉네임</S.InfoLabel>
                <S.InfoValue>{refund.user_nickname}</S.InfoValue>
              </S.InfoRow>
            </S.InfoGrid>
          </S.Section>

          {/* 강의 정보 */}
          <S.Section>
            <S.SectionTitle>강의 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>강의명</S.InfoLabel>
                <S.InfoValue>{refund.course_title}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>진행률</S.InfoLabel>
                <S.InfoValue>
                  <S.ProgressBadge $rate={refund.progress_rate}>
                    {refund.progress_rate}%
                  </S.ProgressBadge>
                </S.InfoValue>
              </S.InfoRow>
            </S.InfoGrid>
          </S.Section>

          {/* 일자 정보 */}
          <S.Section>
            <S.SectionTitle>일자 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>원 결제일</S.InfoLabel>
                <S.InfoValue>{formatDateTime(refund.payment_date)}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>환불 요청일</S.InfoLabel>
                <S.InfoValue>{formatDateTime(refund.requested_at)}</S.InfoValue>
              </S.InfoRow>
              {refund.processed_at && (
                <S.InfoRow>
                  <S.InfoLabel>환불 처리일</S.InfoLabel>
                  <S.InfoValue>{formatDateTime(refund.processed_at)}</S.InfoValue>
                </S.InfoRow>
              )}
            </S.InfoGrid>
          </S.Section>

          {/* 환불 사유 및 관리자 메모 */}
          <S.Section>
            <S.SectionTitle>환불 사유 및 관리자 메모</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>환불 사유</S.InfoLabel>
                <S.InfoValue>{refund.reason}</S.InfoValue>
              </S.InfoRow>
              {refund.admin_note && (
                <S.InfoRow>
                  <S.InfoLabel>관리자 메모</S.InfoLabel>
                  <S.InfoValue>{refund.admin_note}</S.InfoValue>
                </S.InfoRow>
              )}
            </S.InfoGrid>
          </S.Section>
        </S.ModalBody>

        <S.ModalFooter>
          <S.CloseButtonFooter onClick={onClose}>닫기</S.CloseButtonFooter>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.Overlay>
  );
};

// --- Styles ---
const S = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
  `,
  ModalContainer: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
    max-width: 80rem;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
    margin-top: 7rem;
  `,
  ModalHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  `,
  ModalTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
  `,
  CloseButton: styled.button`
    background: none;
    border: none;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    cursor: pointer;
    padding: 0;
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  ModalBody: styled.div`
    padding: 2.4rem;
    overflow-y: auto;
    flex: 1;
  `,
  Section: styled.section`
    margin-bottom: 2.4rem;

    &:last-child {
      margin-bottom: 0;
    }
  `,
  SectionTitle: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0 0 1.6rem 0;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary300};
  `,
  InfoGrid: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  InfoRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
    }
  `,
  InfoLabel: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    min-width: 12rem;
  `,
  InfoValue: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.surface};
    flex: 1;
    text-align: right;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      text-align: left;
    }
  `,
  ProgressBadge: styled.span<{ $rate: number }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    font-size: 1.2rem;
    font-weight: 500;
    background-color: ${({ $rate }) => {
      if ($rate === 0) return '#E3F2FD';
      if ($rate < 50) return '#FFF3E0';
      return '#FFEBEE';
    }};
    color: ${({ $rate }) => {
      if ($rate === 0) return '#1976D2';
      if ($rate < 50) return '#F57C00';
      return '#C62828';
    }};
  `,
  RefundStatusBadge: styled.span<{ $status: string }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    font-size: 1.2rem;
    font-weight: 500;
    background-color: ${({ $status }) => {
      const colors: Record<string, string> = {
        pending: '#FFF3E0',
        approved: '#E8F5E9',
        rejected: '#FFEBEE',
      };
      return colors[$status] || colors.pending;
    }};
    color: ${({ $status }) => {
      const colors: Record<string, string> = {
        pending: '#F57C00',
        approved: '#388E3C',
        rejected: '#C62828',
      };
      return colors[$status] || colors.pending;
    }};
  `,
  ModalFooter: styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  `,
  CloseButtonFooter: styled.button`
    padding: 1.2rem 2.4rem;
    background: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.surface};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.gray300};
    }
  `,
};

export default RefundDetailModal;
