import styled, { css, useTheme } from 'styled-components';
import Button from '../components/Button';
import Profile from '../components/Profile';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/RouteConfig';
import { Flex } from './Box';
import { Text } from './Typography';

import SvgPlay from '../assets/icons/icon-play.svg?react';
import SvgMyPage from '../assets/icons/icon-mypage.svg?react';
import { useProfile } from '../queries/useUserQueries';

import { getFullImageUrl } from '../utils/imageUtils';

// profileCard
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

// userInfo - name + email
const StyledUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledInfoText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledName = styled.p`
  font-weight: 600;
  text-align: center;
  line-height: 2.2rem;
`;

const StyledEmail = styled.p`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
`;

// !loggedIn > text
const StyledText = styled.p`
  line-height: 2.2rem;
`;

// loggedIn > actionList
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

const AdminActionList = () => {
  return <></>;
};

// components
const UserActionList = () => {
  return (
    <Flex direction="column" align="flex-start" gap={12} mt={8} width="14.8rem" style={{ minWidth: 'fit-content' }}>
      <StyledLink to={ROUTES.MY_LECTURES}>
        <SvgPlay />내 강의 목록 보기
      </StyledLink>
      <StyledLink to={ROUTES.MYPAGE}>
        <SvgMyPage />
        마이페이지
      </StyledLink>
    </Flex>
  );
};

// 프로필 카드 컴포넌트
// 로그인 상태에 따라 사용자 정보 또는 로그인 버튼 표시
// variant props에 따라 메인 화면용(main) 또는 사이드바용(sidebar) 스타일 적용
export const ProfileCard = ({ variant = 'main' }: { variant?: 'main' | 'sidebar' }) => {
  const theme = useTheme();


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
        <StyledInfoText>
          <StyledName>{isLoggedIn ? userProfile?.nickname : '호기심 많은 개발자님'}</StyledName>
          {isLoggedIn && <StyledEmail>{userProfile?.email}</StyledEmail>}
        </StyledInfoText>
      </StyledUserInfo>

      {!isLoggedIn && (
        <Text style={{ lineHeight: '2.2rem' }}>
          부트런에 로그인 후<br />
          커뮤니티와 함께 성장하세요.
        </Text>
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
