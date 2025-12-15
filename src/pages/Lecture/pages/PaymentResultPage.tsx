import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import SuccessIcon from '../../../assets/icons/icon-status-success.svg?react';
import ErrorIcon from '../../../assets/icons/icon-status-error.svg?react';
import { ROUTES } from '../../../router/RouteConfig';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { usePostPaymentConfirm } from '../../../queries/usePaymentsQueries';
import { useEffect, useState, useRef } from 'react';
import { LoadingSpinner } from '../../../components/HelperComponents';
import type { PaymentStatus } from '../../../types/PaymentsType';
import { AxiosError } from 'axios';
import { getTossPaymentResult } from '../../../utils/tossPayments';
import { useQueryClient } from '@tanstack/react-query';

export default function PaymentResultPage() {
  // hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);
  const MIN_DELAY_MS = 300;
  const isProcessing = useRef(false);

  // paymentId 유효성 검사
  const paymentIdParam = searchParams.get('paymentId');
  const paymentId = Number(paymentIdParam);
  const isValidPaymentId =
    paymentIdParam !== null &&
    paymentIdParam !== 'null' &&
    paymentIdParam !== 'undefined' &&
    !isNaN(paymentId) &&
    paymentId > 0;

  const { mutateAsync: confirmPayment } = usePostPaymentConfirm();

  // 결제 확인 - 토스 페이
  useEffect(() => {
    if (isProcessing.current) {
      return;
    }

    if (paymentStatus !== null) {
      return;
    }

    const { paymentKey, orderId, amount } = getTossPaymentResult();

    if (paymentKey && orderId && amount && isValidPaymentId) {
      console.log('결제 승인 시작:', { paymentId, paymentKey, orderId, amount });
      isProcessing.current = true;

      const processPayment = async () => {
        try {
          const data = await confirmPayment({
            payment_id: Number(paymentId),
            payment_key: paymentKey,
            order_id: orderId,
            amount: amount,
          });

          const status = data?.status ?? 'completed';
          setPaymentStatus(status);

          queryClient.invalidateQueries({ queryKey: ['paymentDetail'] });
          queryClient.invalidateQueries({ queryKey: ['payments'] });
        } catch (err) {
          setErrorMessage('결제 승인에 실패했어요. 다시 시도해 주세요.');
          if (err instanceof AxiosError && err.response?.data) {
            setErrorMessage((err.response.data as { detail: string }).detail);
          } else if (err instanceof Error) {
            setErrorMessage(err.message);
          }
          console.error('토스 결제 승인 실패:', err);
          setPaymentStatus('failed');
        }
      };

      processPayment();
    } else if (!paymentKey) {
      setPaymentStatus('failed');
      setErrorMessage('결제 승인에 실패했어요. 다시 시도해 주세요.');
    }
  }, [isValidPaymentId, paymentId, confirmPayment, paymentStatus, queryClient]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimeElapsed(true);
    }, MIN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // 이벤트 핸들러: 이동 버튼
  const handleGoToLectureRoom = () => {
    navigate(ROUTES.MY_LECTURES);
  };

  const handleGoToMain = () => {
    navigate(ROUTES.HOME);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // 조건부 렌더링: 예외 처리
  if (paymentStatus === null || paymentStatus === 'pending' || !isMinTimeElapsed)
    return <LoadingSpinner />;

  const isSuccess = paymentStatus === 'completed';

  return (
    <>
      <EmptyState
        className="payment-empty-state"
        iconAnimation={isSuccess ? 'success' : 'error'}
        icon={isSuccess ? <SuccessIcon /> : <ErrorIcon />}
        title={isSuccess ? '결제가 완료되었습니다' : '결제에 실패했어요'}
        description={isSuccess ? '수강 준비가 끝났어요. 지금 시작해볼까요?' : errorMessage}
        buttons={
          isSuccess ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleGoToLectureRoom}
              ariaLabel="내 강의실로 이동"
            >
              내 강의실로 이동
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="md"
                onClick={handleGoBack}
                ariaLabel="내 강의실로 이동"
              >
                이전으로
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleGoToMain}
                ariaLabel="메인 페이지로 이동"
              >
                메인 페이지
              </Button>
            </>
          )
        }
      />
    </>
  );
}
