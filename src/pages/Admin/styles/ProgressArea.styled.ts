import styled from 'styled-components';
export const ProgressAreaStyles = {
  ProgressGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1.6rem, 3vw, 2.4rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      grid-template-columns: minmax(0, 1fr);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      gap: 1.6rem;
    }
  `,
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3vw, 2.4rem);
    display: flex;
    flex-direction: column;
    gap: clamp(1.2rem, 2vw, 1.6rem);
    min-width: 0;
    overflow: hidden;
  `,
  SectionTitle: styled.h3`
    font-size: clamp(1.6rem, 2.1vw, 1.9rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.6rem;
    }
  `,
  ChartWrapper: styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      height: 24rem;
    }
  `,
  ChartContent: styled.div`
    width: 100%;
    height: 100%;
  `,
  RadialLabel: styled.text`
    fill: ${({ theme }) => theme.colors.surface};
    text-anchor: middle;
    /* dominant-baseline: central; */
  `,
  VisuallyHidden: styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `,
};
