import styled from 'styled-components';

const Instructor = {
  InfoBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem 4rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 4rem;
    padding-right: 6rem;
    width: 100%;

    img {
      flex-shrink: 0;
      width: 24rem;
      height: 24rem;
      width: clamp(17rem, 30%, 24rem);
      height: clamp(17rem, 30%, 24rem);
    }

    @media ${({ theme }) => theme.devices.tablet} {
      padding: 3.2rem 6rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    @media ${({ theme }) => theme.devices.tablet} {
      justify-content: center;
      align-items: center;
    }
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 0.8rem;
    /* flex-wrap: wrap; */

    @media ${({ theme }) => theme.devices.tablet} {
      align-items: center;
    }
  `,
  Name: styled.p`
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  `,
  SubName: styled.span`
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};

    @media ${({ theme }) => theme.devices.tablet} {
      width: 75%;
      text-align: center;
    }
  `,
  Description: styled.p`
    word-break: keep-all;
    line-height: 1.5;

    @media ${({ theme }) => theme.devices.tablet} {
      text-align: center;
    }
  `,
  PositionList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    li {
      display: flex;
      color: ${({ theme }) => theme.colors.gray400};
      font-weight: 500;
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  PositionLabel: styled.span<{ $isCurrent: boolean }>`
    font-weight: 500;
    color: ${({ $isCurrent, theme }) =>
      $isCurrent ? theme.colors.primary300 : theme.colors.gray300};
    width: 2.4rem;
  `,
  ExperienceTitle: styled.p`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 700;
    margin-bottom: 0.8rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  ExperienceList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    li {
      font-size: ${({ theme }) => theme.fontSize.md};
      color: ${({ theme }) => theme.colors.gray400};
      font-weight: 500;

      @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.sm};
      }
    }
  `,
};

export default Instructor;
