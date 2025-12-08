import styled, { css } from 'styled-components';
import Button from '../components/Button';
import Profile from '../components/Profile';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/RouteConfig';
import { getFullImageUrl } from '../utils/imageUtils';
import { useProfile } from '../queries/useUserQueries';

import SvgPlay from '../assets/icons/icon-play.svg?react';
import SvgMyPage from '../assets/icons/icon-mypage.svg?react';

// ==================================
// styled Components
// ==================================
const StyledProfileCard = styled.article<{ $variant: 'main' | 'sidebar' }>`
  width: clamp(25rem, 24vw, 29rem);
  min-width: 25rem;
  height: 100%;

  padding: 0 3.2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.6rem;
  text-align: center;

  ${({ $variant }) =>
    $variant === 'sidebar' &&
    css`
      border: none;
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
      border-radius: 0;
      width: 100%;
      height: 33rem;
      z-index: 10;
    `}
`;

// 유저 프로필 + infoText
const StyledUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;
`;

// 유저 이름 + 이메일 콘테이너
const StyledUserInfoText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledName = styled.span`
  font-weight: 600;
  text-align: center;
  line-height: 2.2rem;
`;

const StyledEmail = styled.span`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
`;

// 비로그인시 안내 문구
const StyledText = styled.span`
  line-height: 2.2rem;
`;

// 로그인시 링크
const StyledLink = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1.2rem;

  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
  font-weight: 500;

  width: 100%;
  padding-block: 0.4rem;

  &:hover {
    color: ${({ theme }) => theme.colors.surface};
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    path {
      fill: currentColor;
    }
  }
`;

// 액션 리스트
const StyledActionList = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 0.8rem;
  width: 14.8rem;
  min-width: fit-content;
`;


// ==================================
// Components
// ==================================

// 유저역할별 액션 리스트
const AdminActionList = () => {
  return <></>;
};

const UserActionList = () => {
  return (
    <StyledActionList>
      <StyledLink to={ROUTES.MY_LECTURES}>
        <SvgPlay />내 강의 목록 보기
      </StyledLink>
      <StyledLink to={ROUTES.MYPAGE}>
        <SvgMyPage />
        마이페이지
      </StyledLink>
    </StyledActionList>
  );
};

// 프로필카드 컴포넌트
// : 로그인 상태에 따라 사용자 정보 또는 로그인 버튼 표시
// : variant props에 따라 메인 화면용(main) 또는 사이드바용(sidebar) 스타일 적용
export const ProfileCard = ({ variant = 'main' }: { variant?: 'main' | 'sidebar' }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(token);
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

  const { data: userProfile } = useProfile();
  let profileImageUrl = getFullImageUrl(userProfile?.profile_image);

  const goLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <StyledProfileCard $variant={variant}>
      <StyledUserInfo>
        {isLoggedIn ? <Profile size={10} src={profileImageUrl} /> : <Profile size={10} />}
        <StyledUserInfoText>
          <StyledName>{isLoggedIn ? userProfile?.nickname : '호기심 많은 개발자님'}</StyledName>
          {isLoggedIn && <StyledEmail>{userProfile?.email}</StyledEmail>}
        </StyledUserInfoText>
      </StyledUserInfo>

      {!isLoggedIn && (
        <StyledText>
          부트런에 로그인 후<br />
          커뮤니티와 함께 성장하세요.
        </StyledText>
      )}

      {isLoggedIn ? (
        isAdmin ? (
          <AdminActionList />
        ) : (
          <UserActionList />
        )
      ) : (
        <Button size="lg" fullWidth onClick={goLogin}>
          로그인
        </Button>
      )}
    </StyledProfileCard>
  );
};

export default ProfileCard;
