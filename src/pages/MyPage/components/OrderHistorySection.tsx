import React, { useState } from 'react';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import Tag from '../../../components/Tag';
import Button from '../../../components/Button';
import { Container, Title, Header } from '../styles/ProfilePage.styled';
import {
  Card,
  CardHeader,
  CourseName,
  CardBody,
  InfoGrid,
  InfoItem,
  PaymentInfo,
  FilterGroup,
  OrderList,
  EmptyState,
} from '../styles/OrderHistorySection.styled';
import type { PaymentsItem } from '../../../types/PaymentsType';
import { usePostPaymentRefund, usePaymentsQuery, useMyRefunds } from '../../../queries/usePaymentsQueries';

  const paymentLabels: Record<string, string> = {
  card: '카드결제',
  toss: '토스결제',
  transfer: '계좌이체',
};

const formattedDate = (date: string) => new Date(date).toLocaleString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

// 주문 내역 아이템 카드 컴포넌트
const OrderCard: React.FC<{ order: PaymentsItem, isRefunded: boolean | undefined, refundLabel: string }> = ({ 
  order, 
  isRefunded,
  refundLabel
}) => {
  const isCompleted = order.status === 'completed';

  const { mutate: refundPayment } = usePostPaymentRefund();
  
  const handleRefund = (id: number) => {
    const reason = window.prompt('환불 사유는 최소 10자 이상 입력해주세요.')?.trim() ?? '';
    if (reason.length < 10) {
        alert('환불 사유를 최소 10자 이상 입력해주세요.');
        return;
    }

    const confirmed = window.confirm('정말 환불을 진행하시겠습니까?');
    if (!confirmed) return;

    refundPayment({
      payment_id: id,
      reason,
    }, {
      onSuccess: () => {
        alert('환불 요청이 완료되었습니다.');
      },
      onError: (err: any) => {
        alert(err?.response?.data?.detail || '환불 요청이 실패하였습니다. 다시 시도해 주세요.');
      }
    })
  }

  return (
    <Card>
      <Button 
        size="sm" 
        variant='outline' 
        disabled={isRefunded} 
        onClick={() => handleRefund(order.id)}
      >{refundLabel}</Button>
      <CardHeader>
        <Tag variant={isCompleted ? 'primary' : 'dark'}>{isCompleted ? '결제 완료' : '결제 대기'}</Tag>
        <CourseName>{order.course_title}</CourseName>
      </CardHeader>
      <CardBody>
        <InfoGrid>
          <InfoItem>
            <dt>결제 금액</dt>
            <dd className="price">{order.amount.toLocaleString()}원</dd>
          </InfoItem>
          <InfoItem>
            <dt>주문 번호</dt>
            <dd>{order.transaction_id}</dd>
          </InfoItem>
          <InfoItem>
            <dt>주문 일시</dt>
            <dd>{formattedDate(order.paid_at ? order.paid_at : '0')}</dd>
          </InfoItem>
          <InfoItem>
            <dt>승인 일시</dt>
            <dd>{formattedDate(order.created_at ? order.created_at : '0')}</dd>
          </InfoItem>
          <InfoItem>
            <dt>결제 수단</dt>
            <PaymentInfo as="dd">
              <span>{paymentLabels[order.payment_method]}</span>
              <a href={order.receipt_url ?? '#'} target="_blank" rel="noopener noreferrer">
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
  const [filter, setFilter] = useState<FilterStatus>('all');
  
  // 결제 내역 
  const { data: orderHistory, isLoading: isLoadingOrders, error: ordersError } = usePaymentsQuery({});
  // 환불 내역
  const { data: refundList, isLoading: isLoadingRefunds, error: refundsError } = useMyRefunds();

  // 로딩 상태 체크
  if (isLoadingOrders || isLoadingRefunds) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  // 에러 체크
  if (ordersError) {
    return (
      <Container>
        <ErrorMessage message={ordersError.message} />
      </Container>
    );
  }

  if (refundsError) {
    return (
      <Container>
        <ErrorMessage message={refundsError.message} />
      </Container>
    );
  }

  // 데이터가 없는 경우
  if (!orderHistory || !Array.isArray(orderHistory) || !refundList) {
    return (
      <Container>
        <ErrorMessage message="결제 내역을 불러올 수 없습니다." />
      </Container>
    );
  }

  // 
  const safeRefundList = Array.isArray(refundList) ? refundList : [];

  // 필터링
  const filteredOrders = orderHistory.filter(
    order => filter === 'all' || order.status === filter
  );

  return (
    <Container>
      <Header>
        <Title as="h2">결제 내역</Title>
        <FilterGroup role="group" aria-label="결제 내역 필터">
          <Button size="sm"
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            전체
          </Button>
          <Button size="sm"
            variant={filter === 'pending' ? 'primary' : 'outline'}
            onClick={() => setFilter('pending')}
            aria-pressed={filter === 'pending'}
          >
            결제 대기
          </Button>
          <Button size="sm"
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
          filteredOrders.map(order => {
            const refundItem = safeRefundList.find(refund => +refund.payment_id === +order.id);
            const refundLabel = refundItem
              ? refundItem.status === 'pending' ? '환불 신청중'
                : refundItem.status === 'approved' ? '환불 완료'
                : '환불 거절'
              : '';

            return (
              <OrderCard 
                key={order.id} 
                order={order}  
                isRefunded={!!refundItem}
                refundLabel={refundLabel}
              />
            );
          })
        ) : (
          <EmptyState>결제 내역이 없습니다.</EmptyState>
        )}
      </OrderList>
    </Container>
  );
}

export default OrderHistoryPage;
