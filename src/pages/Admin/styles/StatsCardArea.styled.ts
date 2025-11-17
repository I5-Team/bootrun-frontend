import styled from 'styled-components';

export const StatsCardAreaStyles = {
  StatsGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(1.6rem, 3vw, 2.4rem);
    align-items: stretch;

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
};