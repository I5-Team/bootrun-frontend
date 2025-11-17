import React, { useState, useMemo } from 'react';
import { useApiData } from '../../../hooks/useApiData';
import { mockOrderData } from '../../../data/mockMyPageData';
import type { OrderData, OrderItem } from '../../../types/ProfileType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import Tag from '../../../components/Tag';
import Button from '../../../components/Button';
import { Title } from '../../NotFoundPage.styled';
import { Container } from '../styles/ProfilePage.styled';
import { MainContainer } from '../styles/AccountSection.styled';
import {
  Card,
  CardHeader,
  CourseName,
  CardBody,
  InfoGrid,
  InfoItem,
  PaymentInfo,
  Header,
  FilterGroup,
  OrderList,
  EmptyState,
} from '../styles/OrderHistorySection.styled';

// 주문 내역 아이템 카드 컴포넌트
const OrderCard: React.FC<{ order: OrderItem }> = ({ order }) => {
  const isCompleted = order.status === 'completed';

  return (
    <Card>
      <CardHeader>
        <Tag variant={isCompleted ? 'primary' : 'dark'}>
          {isCompleted ? '결제 완료' : '결제 대기'}
        </Tag>
        <CourseName>{order.courseName}</CourseName>
      </CardHeader>
      <CardBody>
        <InfoGrid>
          <InfoItem>
            <dt>결제 금액</dt>
            <dd className="price">{order.price}</dd>
          </InfoItem>
          <InfoItem>
            <dt>주문 번호</dt>
            <dd>{order.orderNumber}</dd>
          </InfoItem>
          <InfoItem>
            <dt>주문 일시</dt>
            <dd>{order.orderDate}</dd>
          </InfoItem>
          <InfoItem>
            <dt>승인 일시</dt>
            <dd>{order.paymentDate}</dd>
          </InfoItem>
          <InfoItem>
            <dt>결제 수단</dt>
            <PaymentInfo as="dd">
              <span>{order.paymentMethod}</span>
              <a href={order.receiptUrl} target="_blank" rel="noopener noreferrer">
                영수증 보기 <span aria-hidden="true">↗</span>
                <span className="sr-only">(새 창)</span>
              </a>
            </PaymentInfo>
          </InfoItem>
        </InfoGrid>
      </CardBody>
    </Card>
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
      <Container>
        <LoadingSpinner />
      </Container>
    );
  if (error)
    return (
      <Container>
        <ErrorMessage message={error.message} />
      </Container>
    );

  return (
    <MainContainer>
      <Header>
        <Title as="h2">결제 내역</Title>
        <FilterGroup role="group" aria-label="결제 내역 필터">
          <Button
            size="sm"
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            전체
          </Button>
          <Button
            size="sm"
            variant={filter === 'pending' ? 'primary' : 'outline'}
            onClick={() => setFilter('pending')}
            aria-pressed={filter === 'pending'}
          >
            결제 대기
          </Button>
          <Button
            size="sm"
            variant={filter === 'completed' ? 'primary' : 'outline'}
            onClick={() => setFilter('completed')}
            aria-pressed={filter === 'completed'}
          >
            결제 완료
          </Button>
        </FilterGroup>
      </Header>

      <OrderList>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <EmptyState>결제 내역이 없습니다.</EmptyState>
        )}
      </OrderList>
    </MainContainer>
  );
};

// --- Styles (시안 반영, rem/theme 적용) ---

export default OrderHistoryPage;
