import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';
import MyPage from './MyPage.styled';
import Tag from '../../components/Tag';
import Button from '../../components/Button';
import { useMyRefunds, usePaymentsQuery, usePostPaymentRefund } from '../../queries/usePaymentsQueries';
import type { PaymentsItem } from '../../types/PaymentsType';

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
const OrderCard: React.FC<{ order: PaymentsItem, isRefunded: boolean | undefined }> = ({ 
  order, 
  isRefunded
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
    <S.Card>
      <S.CardHeader>
        <Tag variant={isCompleted ? 'primary' : 'dark'}>{isCompleted ? '결제 완료' : '결제 대기'}</Tag>
        <S.CourseName>{order.course_title}</S.CourseName>
          <Button 
            size="sm" 
            variant='outline' 
            disabled={isRefunded} 
            onClick={() => handleRefund(order.id)}
          >{isRefunded ? '환불 신청중' : '환불 신청'}</Button>

      </S.CardHeader>
      <S.CardBody>
        <S.InfoGrid>
          <S.InfoItem>
            <dt>결제 금액</dt>
            <dd className="price">{order.amount.toLocaleString()}원</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>주문 번호</dt>
            <dd>{order.transaction_id}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>주문 일시</dt>
            <dd>{formattedDate(order.paid_at ? order.paid_at : '0')}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>승인 일시</dt>
            <dd>{formattedDate(order.created_at ? order.created_at : '0')}</dd>
          </S.InfoItem>
          <S.InfoItem>
            <dt>결제 수단</dt>
            <S.PaymentInfo as="dd">
              <span>{paymentLabels[order.payment_method]}</span>
              <a href={order.receipt_url ?? '#'} target="_blank" rel="noopener noreferrer">
                영수증 보기 <span aria-hidden="true">↗</span>
                <span className="sr-only">(새 창)</span>
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
  const [filter, setFilter] = useState<FilterStatus>('all');
  
  // 결제 내역 
  const { data: orderHistory, isLoading: isLoadingOrders, error: ordersError } = usePaymentsQuery({});
  // 환불 내역
  const { data: refundList, isLoading: isLoadingRefunds, error: refundsError } = useMyRefunds();

  // 로딩 상태 체크
  if (isLoadingOrders || isLoadingRefunds) {
    return (
      <MyPage.Container>
        <LoadingSpinner />
      </MyPage.Container>
    );
  }

  // 에러 체크
  if (ordersError) {
    return (
      <MyPage.Container>
        <ErrorMessage message={ordersError.message} />
      </MyPage.Container>
    );
  }

  if (refundsError) {
    return (
      <MyPage.Container>
        <ErrorMessage message={refundsError.message} />
      </MyPage.Container>
    );
  }

  // 데이터가 없는 경우
  if (!orderHistory || !Array.isArray(orderHistory) || !refundList) {
    return (
      <MyPage.Container>
        <ErrorMessage message="결제 내역을 불러올 수 없습니다." />
      </MyPage.Container>
    );
  }

  // 
  const safeRefundList = Array.isArray(refundList) ? refundList : [];

  // 필터링
  const filteredOrders = orderHistory.filter(
    order => filter === 'all' || order.status === filter
  );

  return (
    <S.MainContainer>
      <S.Header>
        <MyPage.Title as="h2">결제 내역</MyPage.Title>
        <S.FilterGroup role="group" aria-label="결제 내역 필터">
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
        </S.FilterGroup>
      </S.Header>

      <S.OrderList>
        {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}  
                  isRefunded={safeRefundList.some(refund => +refund.payment_id === +order.id)}
                />
              )
            )
          ) : (
            <S.EmptyState>결제 내역이 없습니다.</S.EmptyState>
        )}
      </S.OrderList>
    </S.MainContainer>
  );
}

// --- Styles (시안 반영, rem/theme 적용) ---
const S = {
  MainContainer: styled(MyPage.Container)`
    @media ${({ theme }) => theme.devices.tablet} {
      gap: 2.4rem;
    }
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      align-items: flex-start;
      gap: 3.2rem;
    }
  `,
  FilterGroup: styled.div`
    display: flex;
    gap: 0.8rem;
    margin-left: auto;
  `,
  OrderList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  EmptyState: styled.div`
    padding: 8rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
  `,
  Card: styled.div`
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md}; /* 0.8rem */
  `,
  CardHeader: styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
    padding: 2.4rem 2.4rem 1.6rem;

    button { 
      margin-left: auto;
    }

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

    dt, dd {
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
  `,
  PaymentInfo: styled.div`
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
  `,
};

export default OrderHistoryPage;
