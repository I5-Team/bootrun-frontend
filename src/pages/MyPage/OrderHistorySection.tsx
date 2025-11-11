import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useApiData } from '../../hooks/useApiData';
import { mockOrderData } from '../../data/mockMyPageData';
import type { OrderData, OrderItem } from '../../types/ProfileType';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';

// 주문 내역 아이템 카드 컴포넌트
const OrderCard: React.FC<{ order: OrderItem }> = ({ order }) => {
  const isCompleted = order.status === 'completed';

  return (
    <S.Card>
      <S.CardHeader>
        <S.StatusTag $completed={isCompleted}>
          {isCompleted ? '결제 완료' : '결제 대기'}
        </S.StatusTag>
        <S.CourseName>{order.courseName}</S.CourseName>
      </S.CardHeader>
      <S.CardBody>
        <S.InfoGrid>
          <S.InfoItem>
            <dt>결제 금액</dt>
            <dd className="price">{order.price}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>주문 번호</dt>
            <dd>{order.orderNumber}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>주문 일시</dt>
            <dd>{order.orderDate}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>승인 일시</dt>
            <dd>{order.paymentDate}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>결제 수단</dt>
            <S.PaymentInfo>
              <span>{order.paymentMethod}</span>
              <a href={order.receiptUrl} target="_blank" rel="noopener noreferrer">
                영수증 보기 ↗
              </a>
            </S.PaymentInfo>
          </S.InfoItem>
        </S.InfoGrid>
      </S.CardBody>
    </S.Card>
  );
};

type FilterStatus = 'all' | 'pending' | 'completed';

const OrderHistoryPage: React.FC = () => {
  const { data, loading, error } = useApiData<OrderData>(mockOrderData, 500);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredOrders = useMemo(() => {
    if (!data) return [];
    if (filter === 'all') return data.orders;
    return data.orders.filter((order) => order.status === filter);
  }, [data, filter]);

  if (loading)
    return (
      <S.PageWrapper>
        <LoadingSpinner />
      </S.PageWrapper>
    );
  if (error)
    return (
      <S.PageWrapper>
        <ErrorMessage message={error.message} />
      </S.PageWrapper>
    );

  return (
    <S.PageWrapper>
      <S.Header>
        <S.Title>결제 내역</S.Title>
        <S.FilterGroup>
          <S.FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>
            전체
          </S.FilterButton>
          <S.FilterButton $active={filter === 'pending'} onClick={() => setFilter('pending')}>
            결제 대기
          </S.FilterButton>
          <S.FilterButton $active={filter === 'completed'} onClick={() => setFilter('completed')}>
            결제 완료
          </S.FilterButton>
        </S.FilterGroup>
      </S.Header>

      <S.OrderList>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <S.EmptyState>결제 내역이 없습니다.</S.EmptyState>
        )}
      </S.OrderList>
    </S.PageWrapper>
  );
};

// --- Styles (시안 반영, rem/theme 적용) ---
const S = {
  PageWrapper: styled.div`
    width: 100%;
    max-width: 72rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.lg}; /* 1.2rem */
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      align-items: flex-start;
      gap: 3.2rem;
    }
  `,
  Title: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg}; /* 2.4rem */
    font-weight: 700;
    margin: 0;
  `,
  FilterGroup: styled.div`
    display: flex;
    gap: 0.8rem;
  `,
  FilterButton: styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
    font-weight: 500;
    border-radius: ${({ theme }) => theme.radius.sm}; /* 0.6rem */
    border: 1px solid
      ${({ $active, theme }) => ($active ? theme.colors.primary300 : theme.colors.gray200)};
    background: ${({ $active, theme }) => ($active ? theme.colors.primary300 : theme.colors.white)};
    color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.gray400)};
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.gray100};
    }
  `,
  OrderList: styled.div`
    display: flex;
    flex-direction: column;
  `,
  EmptyState: styled.div`
    padding: 8rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
  `,
  Card: styled.div`
    margin: 2.4rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md}; /* 0.8rem */
  `,
  CardHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 2.4rem 2.4rem 1.6rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.6rem;
    }
  `,
  StatusTag: styled.span<{ $completed: boolean }>`
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    background: ${({ $completed, theme }) =>
      $completed ? theme.colors.primary300 : theme.colors.gray400};
    color: ${({ $completed, theme }) => ($completed ? theme.colors.white : theme.colors.white)};
  `,
  CourseName: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    margin: 0;
  `,
  CardBody: styled.div`
    padding: 0 2.4rem 2.4rem;
  `,
  InfoGrid: styled.dl`
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1.2rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    @media ${({ theme }) => theme.devices.tablet} {
      // 모바일에서는 한 열로 변경, 간격은 두개씩 묶어서 간격 더 넒게
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }
  `,
  InfoItem: styled.div`
    display: contents;
    dt {
      color: ${({ theme }) => theme.colors.gray300};
    }
    dd {
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
  `,
  PaymentInfo: styled.div`
    font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
    color: ${({ theme }) => theme.colors.gray400};

    a {
      color: ${({ theme }) => theme.colors.primary300};
      font-weight: 500;
      text-decoration: none;
      margin-left: 1.6rem;

      &:hover {
        text-decoration: underline;
      }
    }
  `,
};

export default OrderHistoryPage;
