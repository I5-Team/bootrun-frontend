import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/RouteConfig';
import { Button } from '../components/Button';


export default function DevNavigator() {
  const navigate = useNavigate();


  const buttons = [
    { label: '메인', path: ROUTES.HOME },                     
    { label: '로그인', path: ROUTES.LOGIN },
    { label: '회원가입', path: ROUTES.SIGNUP },
    { label: '강의 목록', path: ROUTES.LECTURE_LIST },
    { label: '강의 상세', path: ROUTES.LECTURE_DETAIL },
    { label: '결제', path: ROUTES.LECTURE_PAYMENT },
    { label: '결제 완료', path: ROUTES.LECTURE_PAYMENT_RESULT },
    { label: '내 강의', path: ROUTES.MY_LECTURES },
    { label: '강의실', path: ROUTES.LECTURE_ROOM },
    { label: '관리자 대시보드', path: ROUTES.ADMIN_DASHBOARD },
    { label: '관리자 강의관리', path: ROUTES.ADMIN_LECTURE_MANAGE },
    { label: '관리자 결제관리', path: ROUTES.ADMIN_PAYMENT_MANAGE },
    { label: '관리자 사용자관리', path: ROUTES.ADMIN_USER_MANAGE },
    { label: '404 페이지', path: ROUTES.NOT_FOUND },
    { label: '마이페이지', path: ROUTES.MYPAGE },
    { label: '마이 - 주문내역', path: ROUTES.MYPAGE_ORDERS },
    { label: '마이 - 계정정보', path: ROUTES.MYPAGE_ACCOUNT },

  ];

  return (
    <Container>
      {buttons.map((btn) => (
        <Button variant='primary' size='sm' key={btn.path} onClick={() => navigate(btn.path)}>
          {btn.label}
        </Button>
      ))}
    </Container>
  );
}


const Container = styled.div`
  position: fixed;
right: 0.8rem;
  bottom: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem; /* 4px */
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem; /* 4px */
  border-radius: ${({ theme }) => theme.radius.md}; /* 8px */
  z-index: 9999;
  max-height: calc(100vh - 9.6rem); /* 96px */
  overflow-y: auto;
  overscroll-behavior: contain;
`;
