import styled from 'styled-components';

export const PaymentDetailModalStyles = {
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

export default PaymentDetailModalStyles;
