import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  width: 100%;
  padding: 5.2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 3.2rem;
  }
`;

export const MainContainer = styled(Container)`
  @media ${({ theme }) => theme.devices.tablet} {
    gap: 2.4rem;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 3.2rem;
  }
`;
export const FilterGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-left: auto;
`;
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const EmptyState = styled.div`
  padding: 8rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
`;
export const Card = styled.div`
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md}; /* 0.8rem */
`;
export const CardHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 1.2rem;
  padding: 2.4rem 2.4rem 1.6rem;

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }
`;
export const StatusTag = styled.span<{ $completed: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  background: ${({ $completed, theme }) =>
    $completed ? theme.colors.primary300 : theme.colors.gray400};
  color: ${({ $completed, theme }) => ($completed ? theme.colors.white : theme.colors.white)};
`;
export const CourseName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  margin: 0;
`;
export const CardBody = styled.div`
  padding: 0 2.4rem 2.4rem;
`;
export const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1.2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  @media ${({ theme }) => theme.devices.tablet} {
    // 모바일에서는 한 열로 변경, 간격은 두개씩 묶어서 간격 더 넒게
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;
export const InfoItem = styled.div`
  display: contents;

  dt,
  dd {
    min-width: 0;
    word-break: break-all;
  }

  dt {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray300};
  }
  dd {
    width: 100%;
    color: ${({ theme }) => theme.colors.surface};
    font-weight: 500;
    margin: 0;
  }
  dd.price {
    font-weight: 700;
  }
  @media ${({ theme }) => theme.devices.tablet} {
    dd {
      margin-bottom: 1.2rem;
    }
  }
`;
export const PaymentInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
  color: ${({ theme }) => theme.colors.gray400};
  margin: 0;

  a {
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: 500;
    text-decoration: none;
    margin-left: 1.6rem;

    &:hover {
      text-decoration: underline;
    }
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
