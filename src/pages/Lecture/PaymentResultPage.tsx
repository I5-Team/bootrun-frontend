import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import SuccessIcon from '../../assets/icons/icon-status-success.svg';
import ErrorIcon from '../../assets/icons/icon-status-error.svg';
import { ROUTES } from '../../router/RouteConfig';
import EmptyState from '../../components/EmptyState/EmptyState';
import { usePaymentDetailQuery, usePostPaymentConfirm } from '../../queries/usePaymentsQueries';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../components/HelperComponents';
import type { PaymentStatus } from '../../types/PaymentsType';

export default function PaymentResultPage() {
  // hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>('pending');
  const [errorMessage, setErrorMessage] = useState('');


  // paymentId 유효성 검사
  const paymentIdParam = searchParams.get('paymentId');
  const paymentId = Number(paymentIdParam);
  const isValidPaymentId =
    paymentIdParam !== null &&
    paymentIdParam !== 'null' &&
    paymentIdParam !== 'undefined' &&
    !isNaN(paymentId) &&
    paymentId > 0;


  // queries: transaction_id
  const { mutate: confirmPayment } = usePostPaymentConfirm();
  const { data: paymentDetailData, isLoading } = usePaymentDetailQuery(Number(paymentId));

  // 결제 확인
  useEffect(() => {
    if (isValidPaymentId && paymentDetailData?.transaction_id) {
      confirmPayment({ 
        payment_id: Number(paymentId), 
        transaction_id: paymentDetailData.transaction_id
      }, {
        onSuccess: (data) => {
          setPaymentStatus(data?.status ?? 'completed');
        },
        onError: (err: any) => {
          setErrorMessage('결제 확인을 실패했어요. 다시 시도해 주세요.');
          if (err.isAxiosError && err.response?.data) {
            setErrorMessage(err.response.data.detail);
          } else if (err instanceof Error) {
            setErrorMessage(err.message);
          }
          console.error('결제 확인 실패:', err);
          setPaymentStatus('failed');
        }
      });
    }
  }, [isValidPaymentId, paymentDetailData?.transaction_id, paymentId, confirmPayment]);

  // 
  useEffect(() => {
    if (!isValidPaymentId || !paymentDetailData) {
      setPaymentStatus('failed');
    }
  }, [isValidPaymentId, paymentDetailData]);


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
  if (isLoading) return <LoadingSpinner />;
  if (paymentStatus === 'pending') return <LoadingSpinner/>;

  const isSuccess = paymentStatus === 'completed';

  return (
    <>
      <EmptyState
        className="payment-empty-state"
        iconAnimation={isSuccess ? 'success' : 'error'}
        icon={<img src={isSuccess ? SuccessIcon : ErrorIcon} alt="" aria-hidden="true" />}
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
