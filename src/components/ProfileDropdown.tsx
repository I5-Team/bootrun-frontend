import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ROUTES } from '../router/RouteConfig';
import { useLogout } from '../queries/useAuthQueries';

// profile dropdown
export const StyledDropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const StyledProfileDropdown = styled.div<{ $isOpen: boolean; $variant: 'dropdown' | 'sidebar' }>`
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  width: 24rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.shadow};

  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;

  ${({ $variant }) =>
    $variant === 'sidebar' &&
    css`
      position: relative;
      top: 0;
      width: 100%;
      border: none;
      border-radius: 0;
      box-shadow: none;
    `}

  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-0.5rem)')};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;

const StyledItemWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 0;

  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  &:not(:last-child) {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  }
`;

const StyledItem = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  line-height: 2rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const StyledCaption = styled.p`
  width: 100%;
  padding: 0.4rem 1.6rem;
  line-height: 1.6rem;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const ProfileDropdown = ({
  isOpen = true,
  variant = 'dropdown',
}: {
  isOpen?: boolean;
  variant?: 'dropdown' | 'sidebar';
}) => {
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(token);
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const { mutate: logoutMutate } = useLogout();
  const handleLogout = () => {
    console.log('로그아웃');
    logoutMutate();
  };

  return (
    <StyledProfileDropdown $variant={variant} $isOpen={isOpen}>
      {isAdmin ? (
        <StyledItemWrapper>
          <StyledItem as={Link} to={ROUTES.ADMIN_DASHBOARD}>
            관리자 대시보드
          </StyledItem>
          <StyledItem as={Link} to={ROUTES.ADMIN_LECTURE_MANAGE}>
            강의 관리
          </StyledItem>
          <StyledItem as={Link} to={ROUTES.ADMIN_PAYMENT_MANAGE}>
            결제 관리
          </StyledItem>
          <StyledItem as={Link} to={ROUTES.ADMIN_USER_MANAGE}>
            사용자 관리
          </StyledItem>
        </StyledItemWrapper>
      ) : variant === 'dropdown' ? (
        <StyledItemWrapper>
          <StyledItem as={Link} to={ROUTES.MY_LECTURES}>
            내 강의 목록
          </StyledItem>
          <StyledItem as={Link} to={ROUTES.MYPAGE}>
            마이페이지
          </StyledItem>
        </StyledItemWrapper>
      ) : (
        <StyledItemWrapper>
          <StyledItem as={Link} to="*">
            부트런 소개
          </StyledItem>
          <StyledItem as={Link} to="*">
            수강생 후기
          </StyledItem>
        </StyledItemWrapper>
      )}

      {isLoggedIn && (
        <StyledItemWrapper>
          <StyledItem as="button" onClick={handleLogout}>
            로그아웃
          </StyledItem>
        </StyledItemWrapper>
      )}

      <StyledItemWrapper>
        <StyledCaption>
          제보 및 문의: <a href="mailto:boot-run@bootrun.com">boot-run@bootrun.com</a>
        </StyledCaption>
      </StyledItemWrapper>
    </StyledProfileDropdown>
  );
};
