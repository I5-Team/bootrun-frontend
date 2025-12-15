import styled from 'styled-components';

export const TeamIntroSectionStyles = {
  CardSection: styled.section`
    width: 100%;
    padding: 8rem 2rem 12rem;
    max-width: 140rem;
    margin: 0 auto;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 6rem 2rem 8rem;
    }
  `,

  SectionHeader: styled.div`
    text-align: center;
    margin-bottom: 4rem;

    @media ${({ theme }) => theme.devices.mobile} {
      margin-bottom: 3rem;
    }
  `,

  SectionTitleWithHint: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.headingLg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 0 auto;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.xl};
      flex-direction: row;
      gap: 0.4rem;
    }
  `,

  UnlockedText: styled.span`
    color: ${({ theme }) => theme.colors.primary300};

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  `,

  Container: styled.div`
    display: flex;
    gap: 3rem;
    align-items: stretch;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      align-items: center;
    }
  `,
};

export default TeamIntroSectionStyles;
