import styled, { useTheme } from 'styled-components';
import Button from '../components/Button';
import Profile from '../components/Profile';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/RouteConfig';
import { Flex } from './Box';
import { Text } from './Typography';

import SvgPlay from '../assets/icons/icon-play.svg?react';
import SvgMyPage from '../assets/icons/icon-mypage.svg?react';
import { useProfile } from '../queries/useUserQueries';

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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DEFAULT_PLACEHOLDER_URL = 'https://via.placeholder.com/150';

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(token);
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

  const { data: userProfile } = useProfile();
  let finalImageUrl: string | undefined = undefined;

  if (userProfile?.profile_image && userProfile.profile_image !== DEFAULT_PLACEHOLDER_URL) {
    finalImageUrl = `${API_BASE_URL}${userProfile.profile_image}`;
  }

  const goLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const isSidebar = variant === 'sidebar';

  return (
    <Flex
      as="article"
      direction="column"
      align="center"
      justify="center"
      gap={16}
      style={{
        width: isSidebar ? '100%' : 'clamp(25rem, 24vw, 29rem)',
        minWidth: isSidebar ? undefined : '25rem',
        height: isSidebar ? '33rem' : '100%',
        padding: isSidebar ? '0 3.2rem' : '0 3.2rem',
        border: isSidebar ? 'none' : `0.1rem solid ${theme.colors.gray200}`,
        borderBottom: isSidebar ? `0.1rem solid ${theme.colors.gray200}` : undefined,
        borderRadius: isSidebar ? '0' : theme.radius.md,
        zIndex: isSidebar ? 10 : undefined,
        textAlign: 'center'
      }}
    >
      <Flex direction="column" align="center" gap={12}>
        {isLoggedIn ? <Profile size={10} src={finalImageUrl} /> : <Profile size={10} />}
        <Flex direction="column" align="center" gap={8}>
          <Text weight="bold" style={{ lineHeight: '2.2rem' }}>
            {isLoggedIn ? userProfile?.nickname : '호기심 많은 개발자님'}
          </Text>
          {isLoggedIn && (
            <Text variant="sm" color="gray300" style={{ lineHeight: 1 }}>
              {userProfile?.email}
            </Text>
          )}
        </Flex>
      </Flex>

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
    </Flex>
  );
};

export default ProfileCard;
