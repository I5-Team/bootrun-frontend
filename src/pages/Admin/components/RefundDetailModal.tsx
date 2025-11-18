import React from 'react';
import { RefundDetailModalStyles as S } from '../styles/RefundDetailModal.styled';
import type { RefundListItem } from '../../../types/AdminPaymentType';

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

export default RefundDetailModal;
