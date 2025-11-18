import styled, { css } from 'styled-components';

const S = {
  FloatingCardWrapper: styled.aside`
    grid-area: infoBox;
    height: fit-content;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: 3.2rem;

    background: ${({ theme }) => theme.colors.white};
    position: sticky;
    top: calc(7rem + 1.6rem);

    @media ${({ theme }) => theme.devices.laptop} {
      display: none;
      position: relative;
      top: 0;
    }
  `,
  Title: styled.p`
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  LectureInfoList: styled.dl`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding-block: 2.4rem;
    border-block: 0.1rem solid ${({ theme }) => theme.colors.gray200};

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  InfoLabel: styled.dt`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  InfoValue: styled.dd`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray400};
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
  DdayTag: styled.span<{ $variant: 'open' | 'closed' }>`
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0.8rem;
    height: 2.4rem;
    border-radius: ${({ theme }) => theme.radius.xs};

    ${({ $variant, theme }) => {
      const variants = {
        open: css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.primary300};
        `,
        closed: css`
          color: ${theme.colors.gray300};
          background-color: ${theme.colors.gray200};
        `,
      };
      return variants[$variant];
    }}
  `,
  Price: styled.p<{ $status?: string }>`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    color: ${({ $status, theme }) =>
      $status === 'learning' ? theme.colors.surface : theme.colors.primary300};
    text-align: left;
  `,
  LearingProgress: styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 1.2rem;
  `,
  ProgressTitle: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    @media ${({ theme }) => theme.devices.laptop} {
      width: 100%;
      padding-block: 1.1rem 2.8rem;
      padding-inline: 1.6rem;
      flex-direction: row-reverse;

      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;

      border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
      background-color: ${({ theme }) => theme.colors.white};

      & > button:nth-child(1) {
        flex: 1 1 70%;
      }
      & > button:nth-child(2) {
        flex: 1 1 30%;
      }
    }
  `,
};

export default S;
