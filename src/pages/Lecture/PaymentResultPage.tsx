import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import SuccessIcon from '../../assets/icons/icon-status-success.svg';
import ErrorIcon from '../../assets/icons/icon-status-error.svg';
import { ROUTES } from '../../router/RouteConfig';
import EmptyState from '../../components/EmptyState/EmptyState';
import { usePostPaymentConfirm } from '../../queries/usePaymentsQueries';
import { useEffect, useState } from 'react';
import { ErrorMessage, LoadingSpinner } from '../../components/HelperComponents';
import type { PaymentStatus } from '../../types/PaymentsType';

export default function PaymentResultPage() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);

  // const { paymentId } = use
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentId = searchParams.get('paymentId');
  const { mutate: confirmPayment } = usePostPaymentConfirm();

  useEffect(() => {
    if (!paymentId) {
      alert('결제 정보가 없습니다. 이전 페이지로 돌아갑니다.');
      navigate(-1);
    }
  }, [paymentId, navigate]);

  useEffect(() => {
    if (paymentId) {
      confirmPayment(Number(paymentId), {
        onSuccess: (data) => {
          setPaymentStatus(data?.status as PaymentStatus | null);
        },
      });
    }
  }, [paymentId, confirmPayment]);

  // 이동 버튼
  const handleGoToLectureRoom = () => {
    navigate(ROUTES.MY_LECTURES);
  };

  const handleGoToMain = () => {
    navigate(ROUTES.HOME);
  };

  const isSuccess = paymentStatus === 'completed';

// 로딩 중이면 스피너 표시 가능
  if (paymentStatus === 'pending') return <LoadingSpinner/>;
  if (paymentStatus === 'failed') return <ErrorMessage message='결제 확인 중 오류가 발생했습니다.'/>;

  return (
    <>
      <EmptyState
        className="payment-empty-state"
        iconAnimation={isSuccess ? 'success' : 'error'}
        icon={<img src={isSuccess ? SuccessIcon : ErrorIcon} alt="" aria-hidden="true" />}
        title={isSuccess ? '결제가 완료되었습니다' : '결제에 실패했어요'}
        description={isSuccess ? '수강 준비가 끝났어요. 지금 시작해볼까요?' : undefined}
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
                variant="primary"
                size="md"
                onClick={handleGoToMain}
                ariaLabel="메인 페이지로 이동"
              >
                메인 페이지
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleGoToLectureRoom}
                ariaLabel="내 강의실로 이동"
              >
                내 강의실로 이동
              </Button>
            </>
          )
        }
      />
    </>
  );
}
