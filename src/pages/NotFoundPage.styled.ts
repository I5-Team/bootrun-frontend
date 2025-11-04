import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
`;

export const ContentWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 56.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 0 2rem;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
    max-width: 50rem;
    gap: 1rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    max-width: 35rem;
    gap: 0.8rem;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 30rem;
  height: 24rem;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 24rem;
    height: 19.2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 18rem;
    height: 14.4rem;
  }
`;

export const ErrorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  animation: ${bounce} 2s ease-in-out infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

export const TextAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  width: 100%;

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 2.4rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 2rem;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  text-align: center;

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 1.6rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 1.2rem;
  }
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  line-height: 5.6rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
    line-height: 4.2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    line-height: 2.4rem;
  }
`;

export const Description = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 2.4rem;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.gray400};
  margin: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
    line-height: 1.8rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  button:nth-child(2) {
    color: ${({ theme }) => theme.colors.gray300};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;

    button {
      width: 100%;
    }
  }
`;
