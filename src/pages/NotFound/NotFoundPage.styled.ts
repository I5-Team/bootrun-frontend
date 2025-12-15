import styled from 'styled-components';

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: clamp(1rem, 10vw, 2rem);
  padding-block: 6rem 8rem;
  overflow: auto;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
    max-width: 50rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    max-width: 35rem;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: clamp(26rem, 30vw, 32rem);
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 22rem;
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
  font-size: ${({ theme }) => theme.fontSize.headingXl};
  line-height: 5.6rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.headingLg};
    line-height: 4.2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.fontSize.lg};
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
    font-size: ${({ theme }) => theme.fontSize.caption};
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
