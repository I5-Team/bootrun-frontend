import styled from 'styled-components';

export const RevenueChartAreaStyles = {
  CardBox: styled.section`
    background: white;
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3vw, 2.4rem);
  `,

  HeaderWithFilters: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,

  SectionTitle: styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
    min-width: fit-content;
  `,

  FilterContainer: styled.div`
    margin-left: auto;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  `,

  PresetButtons: styled.div`
    display: flex;
    gap: 0.8rem;
  `,

  Divider: styled.span`
    color: ${({ theme }) => theme.colors.gray200};
    font-size: 1.4rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  `,

  DatePickerWrapper: styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    div {
      flex: 1;
      min-width: 0;
      input {
        flex-shrink: 1;
        min-width: 0;
      }
    }

    button {
      margin-left: auto;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      width: 100%;
      flex-wrap: wrap;
    }
  `,

  DateInput: styled.input`
    padding: 0.6rem 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.3rem;
    background: ${({ theme }) => theme.colors.white};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary300};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary100};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0.5rem 0.6rem;
      font-size: 1.1rem;
      flex: 1;
      min-width: 100px;
    }
  `,

  DateDash: styled.span`
    color: ${({ theme }) => theme.colors.gray300};
    font-weight: 500;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  `,

  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
  `,

  ErrorContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
  `,

  SummaryStats: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
    margin-bottom: 2rem;
    padding: 2.4rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.8rem;
      padding: 1.8rem;
    }
  `,

  StatItem: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  `,

  StatLabel: styled.span`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};
    font-weight: 500;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize.caption};
    }
  `,

  StatValue: styled.span`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray400};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,

  ChartWrapper: styled.div`
    width: 100%;
    max-width: 100%;
    overflow: visible;
    position: relative;
    margin-bottom: 3rem;
    padding: 2.8rem 1.6rem 1.6rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 2.4rem 0.8rem 1.2rem;
    }
  `,

  ChartContent: styled.div`
    width: 100%;
    height: 100%;
  `,

  TooltipContainer: styled.div`
    background: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    p {
      margin: 0.4rem 0;
      font-size: 1.2rem;
    }

    .label {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray400};
    }

    .desc {
      color: ${({ theme }) => theme.colors.gray300};
    }
  `,

  TableWrapper: styled.div`
    overflow-x: auto;
    margin-top: 2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-top: 1.5rem;
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: ${({ theme }) => theme.fontSize.sm};

    thead {
      background: ${({ theme }) => theme.colors.gray100};
    }

    tbody tr {
      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
      }
      transition: background-color 0.2s ease;

      &:hover {
        background: ${({ theme }) => theme.colors.gray100};
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.1rem;
    }
  `,

  TableHeader: styled.th`
    padding: 1.4rem;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray400};
    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0.8rem 0.6rem;
      font-size: 1rem;
    }
  `,

  TableCell: styled.td`
    padding: 1.4rem;
    color: ${({ theme }) => theme.colors.gray400};
    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0.8rem 0.6rem;
      font-size: 1rem;
    }
  `,

  NetRevenueValue: styled.span`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary300};
  `,

  PaginationWrapper: styled.div<{ $totalPage: number }>`
    display: ${({ $totalPage }) => ($totalPage > 1 ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1.6rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-top: 1.5rem;
      padding-top: 1.2rem;
    }
  `,
};
