import styled, { keyframes } from 'styled-components';

// 성공/기본 아이콘 애니메이션: 확대 + 바운스
const successAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// 실패 아이콘 애니메이션: 좌우 흔들림
const errorAnimation = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-8deg);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(8deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-block: 14rem;

  @media ${({ theme }) => theme.devices.tablet} {
    min-height: auto;
    align-items: center;
    padding-block: 16rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    min-height: auto;
    align-items: center;
    padding-block: 12rem;
  }

  /* 결제 페이지용 상단 여백 조정 */
  &.payment-empty-state {
    padding-block: 27rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 56.3rem;
`;

const getAnimation = (animation?: string) => {
  switch (animation) {
    case 'error':
      return errorAnimation;
    case 'success':
    case 'default':
    default:
      return successAnimation;
  }
};

export const IconWrapper = styled.div<{ $animation?: string }>`
  width: 8.8rem;
  height: 8.8rem;

  svg,
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: ${({ $animation }) => getAnimation($animation)} 0.8s ease-out;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 7rem;
    height: 7rem;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  @media ${({ theme }) => theme.devices.mobile} {
    gap: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 600;
  line-height: 5.6rem;
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  margin: 0;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
    line-height: 4rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    line-height: 3rem;
  }
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.mobileFontSize.xl};
  font-weight: 600;
  text-align: center;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: 4rem;
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.gray400};
  text-align: center;
  margin: 0;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
    line-height: 2rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
`;
