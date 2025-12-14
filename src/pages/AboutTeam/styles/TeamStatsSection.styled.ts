import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TeamStatsSectionStyles = {
  StatsSection: styled.section`
    width: 100%;
    padding: 8rem 2rem;
    background: ${({ theme }) => theme.colors.white};

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 6rem 2rem;
    }
  `,

  StatsContainer: styled.div`
    max-width: 120rem;
    margin: 0 auto;
  `,

  SectionTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.headingLg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    text-align: center;
    margin-bottom: 4rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.headingMd};
      margin-bottom: 3rem;
    }
  `,

  StatsGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.4rem;

    @media ${({ theme }) => theme.devices.tablet} {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    @media ${({ theme }) => theme.devices.mobile} {
      grid-template-columns: 1fr;
      gap: 1.6rem;
    }
  `,

  StatCard: styled(motion.div)`
    background: ${({ theme }) => theme.colors.gray100};
    padding: 3.2rem;
    border-radius: ${({ theme }) => theme.radius.xxl};
    text-align: center;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 2.4rem;
    }
  `,

  StatValue: styled.div`
    font-size: ${({ theme }) => theme.fontSize.headingLg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary300};
    margin-bottom: 0.8rem;
    white-space: nowrap;
    word-break: keep-all;

    @media ${({ theme }) => theme.devices.laptop} {
      font-size: ${({ theme }) => theme.fontSize.headingMd};
    }
  `,

  StatLabel: styled.div`
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray400};
    font-weight: 500;
    white-space: nowrap;
    word-break: keep-all;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
};

export default TeamStatsSectionStyles;
