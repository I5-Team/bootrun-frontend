import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import SuccessIcon from '../../assets/icons/icon-status-success.svg';
import ErrorIcon from '../../assets/icons/icon-status-error.svg';
import { ROUTES } from '../../router/RouteConfig';
import EmptyState from '../../components/EmptyState/EmptyState';
import * as S from './PaymentResultPage.styled';

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get('status'); // 'success' | 'fail'
  const isSuccess = status === 'success';

  const handleGoToLectureRoom = () => {
    navigate(ROUTES.MY_LECTURES);
  };

  const handleGoToMain = () => {
    navigate(ROUTES.HOME);
  };

  // 나중에 삭제 필요 // 개발용 토글 버튼(결제 완료 <-> 결제 실패 페이지 이동)
  const handleToggleStatus = () => {
    const newStatus = isSuccess ? 'fail' : 'success';
    navigate(`?status=${newStatus}`, { replace: true });
  };

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

      {/* // 나중에 삭제 필요 */}
      {/* 개발용 토글 버튼 */}
      <S.DevToggle onClick={handleToggleStatus}>
        {isSuccess ? '실패 화면 보기' : '성공 화면 보기'}
      </S.DevToggle>
    </>
  );
}
