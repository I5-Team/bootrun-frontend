import styled from 'styled-components';

export const ChartAreaStyles = {
  ChartGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.6rem, 3vw, 2.4rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      > div:last-child {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      > div:last-child {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: minmax(0, 1fr);
      > div:last-child {
        grid-column: auto;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      gap: 1.4rem;
    }
  `,
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3.5vw, 2.4rem);
    display: flex;
    flex-direction: column;
    gap: clamp(1.2rem, 2vw, 1.6rem);
    min-width: 0;
    overflow: hidden;
  `,
  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.4rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.8rem;
    }
  `,
  SectionTitle: styled.h3`
    font-size: clamp(1.6rem, 2.1vw, 1.9rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  ChartWrapper: styled.div`
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
  `,
  ChartContent: styled.div`
    width: 100%;
    height: 100%;
  `,
  FilterWrapper: styled.div`
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  `,
  FilterButton: styled.button<{ $active?: boolean }>`
    padding: 0.8rem 1.2rem;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary100 : theme.colors.gray100};
    color: ${({ theme, $active }) => ($active ? theme.colors.primary300 : theme.colors.gray300)};
    border: none;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.gray200};
    }
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
  TooltipContainer: styled.div`
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: 1.2rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    .label {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
      margin-bottom: 0.8rem;
    }
    .desc {
      font-size: 1.3rem;
      margin: 0;
    }
  `,
};
export default ChartAreaStyles;
