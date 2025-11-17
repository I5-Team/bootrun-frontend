import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding-inline: 2rem;
  padding-bottom: 8rem;
  padding-top: 8rem;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.devices.mobile} {
    padding-top: 6rem;
    padding-inline: 1.6rem;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 32.2rem;
  gap: 2rem;

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 1.6rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 1.2rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.4rem;
`;

export const LogoIcon = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 6.4rem;
    height: 6.4rem;
  }
`;

export const Title = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 4rem;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
    line-height: 1.4;
    margin-bottom: 4.4rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xxl};
    margin-bottom: 4.8rem;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 2.4rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.gray400};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  white-space: nowrap;
  margin-bottom: 1.2rem;

  @media ${({ theme }) => theme.devices.tablet} {
    margin-top: 1.2rem;
    margin-bottom: 2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
    margin-bottom: 2rem;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary300};
  text-decoration: none;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
    border-radius: 0.2rem;
  }
`;

export const LinkText = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
  cursor: pointer;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const LinkDivider = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
  flex-shrink: 0;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray300};
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

export const DividerText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray300};
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

export const SocialLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 2rem;
  }
`;

export const SocialButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 1.2rem;
  }
`;

// 소셜 로그인 아이콘의 원래 색상을 유지하기 위한 스타일 컴포넌트
// 아래 코드를 추가하지 않으면 아이콘 색상이 기본 테마 색상으로 변경됨
export const OriginalColorIcon = styled.span`
  && svg path[fill] {
    fill: attr(fill) !important;
  }

  /* GitHub 아이콘 색상 */
  && svg path[fill='#47494D'] {
    fill: #47494d !important;
  }

  /* Google 아이콘 색상들 */
  && svg path[fill='#4285F4'] {
    fill: #4285f4 !important;
  }

  && svg path[fill='#34A853'] {
    fill: #34a853 !important;
  }

  && svg path[fill='#FBBC05'] {
    fill: #fbbc05 !important;
  }

  && svg path[fill='#EA4335'] {
    fill: #ea4335 !important;
  }
`;
