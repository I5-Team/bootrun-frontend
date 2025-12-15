import styled from 'styled-components';

export const HeroSectionStyles = {
  HeroSection: styled.section`
    width: 100%;
    padding: 12rem 2rem 8rem;
    background: ${({ theme }) => theme.colors.white};
    text-align: center;
    position: relative;
    overflow: hidden;
    min-height: 40rem;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 8rem 2rem 6rem;
      min-height: 30rem;
    }
  `,

  Title: styled.h1`
    font-size: ${({ theme }) => theme.fontSize.headingXl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin-bottom: 1.6rem;
    text-align: center;

    @media ${({ theme }) => theme.devices.tablet} {
      font-size: ${({ theme }) => theme.fontSize.headingLg};
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.headingMd};
    }
  `,

  TitleText: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: nowrap;
  `,

  ClickableI5: styled.span`
    color: ${({ theme }) => theme.colors.primary300};
    display: inline-block;
  `,

  RocketImageContainer: styled.div`
    text-align: center;
    margin-bottom: 2rem;
    animation: floatRocket 3s ease-in-out infinite;

    @keyframes floatRocket {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-1rem);
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      margin-bottom: 1.5rem;
    }
  `,

  StaticRocketImage: styled.img`
    width: 8rem;
    height: 8rem;

    @media ${({ theme }) => theme.devices.mobile} {
      width: 6rem;
      height: 6rem;
    }
  `,

  Subtitle: styled.p`
    font-size: ${({ theme }) => theme.fontSize.headingMd};
    color: ${({ theme }) => theme.colors.gray400};

    span {
      color: ${({ theme }) => theme.colors.primary300};
      font-weight: 600;
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  `,
};

export default HeroSectionStyles;
