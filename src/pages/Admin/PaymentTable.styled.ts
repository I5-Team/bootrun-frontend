import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;
  min-width: 140rem;

  th,
  td {
    padding: 1.6rem 1.2rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray300};
    background: ${({ theme }) => theme.colors.white};
  }

  td {
    color: ${({ theme }) => theme.colors.surface};
    vertical-align: middle;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }

  tbody tr:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary300};
    outline-offset: -0.2rem;
    background: ${({ theme }) => theme.colors.gray100};
  }

  tbody td[colSpan] {
    text-align: center;
    padding: 6rem;
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const PaymentId = styled.button`
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
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const UserEmail = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray300};
`;

export const CourseTitle = styled.div`
  max-width: 25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MethodBadge = styled.span<{ $method: string }>`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${({ $method }) => {
    const colors: Record<string, string> = {
      card: '#E3F2FD',
      transfer: '#E8F5E9',
      easy: '#FFF3E0',
    };
    return colors[$method] || colors.card;
  }};
  color: ${({ $method }) => {
    const colors: Record<string, string> = {
      card: '#1976D2',
      transfer: '#388E3C',
      easy: '#F57C00',
    };
    return colors[$method] || colors.card;
  }};
`;

export const AmountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  strong {
    font-weight: 600;
  }
`;

export const DiscountText = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray300};
`;

export const StatusBadge = styled.span<{ $status: string }>`
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
`;

export const RefundInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-width: 20rem;
`;

export const RefundStatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  font-size: 1.2rem;
  font-weight: 500;
  width: fit-content;
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
`;

export const RefundReason = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray300};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
