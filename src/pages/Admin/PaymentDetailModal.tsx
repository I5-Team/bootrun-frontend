import React from 'react';
import styled from 'styled-components';
import type { PaymentListItem } from '../../types/AdminPaymentType';

interface PaymentDetailModalProps {
  payment: PaymentListItem;
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

const PaymentDetailModal: React.FC<PaymentDetailModalProps> = ({ payment, onClose }) => {
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
          <S.ModalTitle id="modal-title">결제 상세 정보</S.ModalTitle>
          <S.CloseButton ref={closeButtonRef} onClick={onClose} aria-label="닫기">
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          {/* 결제 기본 정보 */}
          <S.Section>
            <S.SectionTitle>결제 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>결제 번호</S.InfoLabel>
                <S.InfoValue>{payment.id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>거래 ID</S.InfoLabel>
                <S.InfoValue>{payment.transaction_id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>결제일시</S.InfoLabel>
                <S.InfoValue>{formatDateTime(payment.paid_at)}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>생성일시</S.InfoLabel>
                <S.InfoValue>{formatDateTime(payment.created_at)}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>결제 방식</S.InfoLabel>
                <S.InfoValue>{getPaymentMethodLabel(payment.payment_method)}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>결제 상태</S.InfoLabel>
                <S.InfoValue>
                  <S.StatusBadge $status={payment.status}>
                    {getStatusLabel(payment.status)}
                  </S.StatusBadge>
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
                <S.InfoValue>{payment.user_id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>닉네임</S.InfoLabel>
                <S.InfoValue>{payment.user_nickname}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>이메일</S.InfoLabel>
                <S.InfoValue>{payment.user_email}</S.InfoValue>
              </S.InfoRow>
            </S.InfoGrid>
          </S.Section>

          {/* 강의 정보 */}
          <S.Section>
            <S.SectionTitle>강의 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>강의 ID</S.InfoLabel>
                <S.InfoValue>{payment.course_id}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>강의명</S.InfoLabel>
                <S.InfoValue>{payment.course_title}</S.InfoValue>
              </S.InfoRow>
            </S.InfoGrid>
          </S.Section>

          {/* 금액 정보 */}
          <S.Section>
            <S.SectionTitle>금액 정보</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoRow>
                <S.InfoLabel>원가</S.InfoLabel>
                <S.InfoValue>{formatCurrency(payment.amount)}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>할인 금액</S.InfoLabel>
                <S.InfoValue $highlight={payment.discount_amount > 0}>
                  {payment.discount_amount > 0
                    ? `-${formatCurrency(payment.discount_amount)}`
                    : '0원'}
                </S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>쿠폰 ID</S.InfoLabel>
                <S.InfoValue>{payment.coupon_id || '-'}</S.InfoValue>
              </S.InfoRow>
              <S.Divider />
              <S.InfoRow>
                <S.InfoLabel>
                  <strong>최종 결제 금액</strong>
                </S.InfoLabel>
                <S.InfoValue>
                  <strong>{formatCurrency(payment.final_amount)}</strong>
                </S.InfoValue>
              </S.InfoRow>
            </S.InfoGrid>
          </S.Section>

          {/* 영수증 정보 */}
          {payment.receipt_url && (
            <S.Section>
              <S.SectionTitle>영수증</S.SectionTitle>
              <S.InfoGrid>
                <S.InfoRow>
                  <S.InfoLabel>영수증 URL</S.InfoLabel>
                  <S.InfoValue>
                    <S.ReceiptLink
                      onClick={(e) => {
                        e.preventDefault();
                        alert('영수증 보기 기능은 추후 구현 예정입니다.');
                      }}
                    >
                      영수증 보기
                    </S.ReceiptLink>
                  </S.InfoValue>
                </S.InfoRow>
              </S.InfoGrid>
            </S.Section>
          )}

          {/* 환불 정보 */}
          {payment.refund && (
            <S.Section>
              <S.SectionTitle>환불 정보</S.SectionTitle>
              <S.InfoGrid>
                <S.InfoRow>
                  <S.InfoLabel>환불 ID</S.InfoLabel>
                  <S.InfoValue>{payment.refund.id}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>환불 금액</S.InfoLabel>
                  <S.InfoValue>{formatCurrency(payment.refund.amount)}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>환불 상태</S.InfoLabel>
                  <S.InfoValue>
                    <S.RefundStatusBadge $status={payment.refund.status}>
                      {getRefundStatusLabel(payment.refund.status)}
                    </S.RefundStatusBadge>
                  </S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>요청 사유</S.InfoLabel>
                  <S.InfoValue>{payment.refund.reason}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>요청 일시</S.InfoLabel>
                  <S.InfoValue>{formatDateTime(payment.refund.requested_at)}</S.InfoValue>
                </S.InfoRow>
                {payment.refund.processed_at && (
                  <S.InfoRow>
                    <S.InfoLabel>처리 일시</S.InfoLabel>
                    <S.InfoValue>{formatDateTime(payment.refund.processed_at)}</S.InfoValue>
                  </S.InfoRow>
                )}
                {payment.refund.admin_note && (
                  <S.InfoRow>
                    <S.InfoLabel>관리자 메모</S.InfoLabel>
                    <S.InfoValue>{payment.refund.admin_note}</S.InfoValue>
                  </S.InfoRow>
                )}
              </S.InfoGrid>
            </S.Section>
          )}
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
  InfoValue: styled.span<{ $highlight?: boolean }>`
    font-size: 1.4rem;
    color: ${({ theme, $highlight }) =>
      $highlight ? theme.colors.primary300 : theme.colors.surface};
    font-weight: ${({ $highlight }) => ($highlight ? '600' : '400')};
    flex: 1;
    text-align: right;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      text-align: left;
    }
  `,
  Divider: styled.hr`
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    margin: 0.8rem 0;
  `,
  StatusBadge: styled.span<{ $status: string }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    font-size: 1.2rem;
    font-weight: 500;
    background-color: ${({ $status }) => {
      const colors: Record<string, string> = {
        pending: '#FFF3E0',
        completed: '#E8F5E9',
        failed: '#FFEBEE',
        refunded: '#F3E5F5',
      };
      return colors[$status] || colors.pending;
    }};
    color: ${({ $status }) => {
      const colors: Record<string, string> = {
        pending: '#F57C00',
        completed: '#388E3C',
        failed: '#C62828',
        refunded: '#7B1FA2',
      };
      return colors[$status] || colors.pending;
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
  ReceiptLink: styled.button`
    color: ${({ theme }) => theme.colors.primary300};
    text-decoration: underline;
    background: none;
    border: none;
    padding: 0;
    font-size: 1.4rem;
    cursor: pointer;
    font-family: inherit;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
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

export default PaymentDetailModal;
