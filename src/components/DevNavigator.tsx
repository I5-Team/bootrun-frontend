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
    { label: '프로필', path: ROUTES.PROFILE },
    { label: '관리자 대시보드', path: ROUTES.ADMIN_DASHBOARD },
    { label: '관리자 강의 관리', path: ROUTES.ADMIN_LECTURE_MANAGE },
    { label: '관리자 결제 관리', path: ROUTES.ADMIN_PAYMENT_MANAGE },
    { label: '관리자 사용자 관리', path: ROUTES.ADMIN_USER_MANAGE },
    { label: '404 페이지', path: ROUTES.NOT_FOUND },

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
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 8px;
  z-index: 9999;
`;