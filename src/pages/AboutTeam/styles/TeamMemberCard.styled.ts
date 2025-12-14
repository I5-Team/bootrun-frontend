import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TeamMemberCardStyles = {
  MainCardContainer: styled.div`
    flex: 1;
    min-width: 0;
    display: flex;
  `,

  MainCard: styled(motion.div)`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.xxl};
    padding: 4rem;
    box-shadow: ${({ theme }) => theme.shadows.xl};
    width: 100%;
    display: flex;
    flex-direction: column;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 2.4rem;
    }
  `,

  CardName: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.headingLg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    text-align: center;
    margin-bottom: 0.8rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.headingMd};
    }
  `,

  CardRole: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.6rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
      margin-bottom: 1.2rem;
    }
  `,

  CardDescription: styled.p`
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray400};
    text-align: center;
    line-height: 1.6;
    margin-bottom: 3.2rem;
    padding: 0 2rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
      margin-bottom: 2.4rem;
      padding: 0 1rem;
    }
  `,

  HiddenSection: styled(motion.div)`
    margin-top: 3.2rem;
    padding-top: 3.2rem;
    padding-bottom: 4rem;
    border-top: 0.2rem dashed ${({ theme }) => theme.colors.gray300};
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media ${({ theme }) => theme.devices.mobile} {
      margin-top: 2.4rem;
      padding-top: 2.4rem;
      padding-bottom: 3rem;
      min-height: 16rem;
    }
  `,

  EmojiImageContainer: styled.div`
    margin-top: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
    }

    @media ${({ theme }) => theme.devices.mobile} {
      img {
        width: 6rem;
        height: 6rem;
      }
    }
  `,

  HiddenTitle: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary300};
    text-align: center;
    margin-bottom: 2rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
      margin-bottom: 1.6rem;
    }
  `,

  DeveloperStory: styled.p`
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray400};
    line-height: 1.8;
    text-align: center;
    padding: 0 2rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
      padding: 0 1rem;
    }
  `,

  LockedStoryContainer: styled(motion.div)`
    margin-top: 3.2rem;
    padding: 2.4rem 2rem;
    border: 0.2rem dashed ${({ theme }) => theme.colors.gray300};
    border-radius: ${({ theme }) => theme.radius.lg};
    background: ${({ theme }) => theme.colors.gray100};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    height: 100%;

    @media ${({ theme }) => theme.devices.mobile} {
      margin-top: 2.4rem;
      padding: 1.8rem 1.6rem;
    }
  `,

  LockIconWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2rem;
      height: 2rem;

      path {
        fill: ${({ theme }) => theme.colors.gray400};
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      width: 3.5rem;
      height: 3.5rem;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  `,

  LockedText: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,

  LockedHint: styled.p`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.caption};
    }
  `,
};

export default TeamMemberCardStyles;
