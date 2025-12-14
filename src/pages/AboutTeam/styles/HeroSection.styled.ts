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

    @media ${({ theme }) => theme.devices.tablet} {
      font-size: ${({ theme }) => theme.fontSize.headingLg};
    }
  `,

  ClickableI5: styled.span`
    color: ${({ theme }) => theme.colors.primary300};
    display: inline-block;
  `,

  StaticRocketImage: styled.img`
    width: 5.5rem;
    height: 5.5rem;
    margin-right: 1.5rem;
    vertical-align: middle;

    @media ${({ theme }) => theme.devices.mobile} {
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
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
