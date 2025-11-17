import styled from 'styled-components';

export const TableAreaStyles = {
  CardBox: styled.section`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3vw, 2.4rem);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  `,
  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.4rem;
    @media (${({ theme }) => theme.devices.tablet}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.6rem;
    }
  `,
  SectionTitle: styled.h3`
    font-size: clamp(1.6rem, 2.1vw, 1.9rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  ActionWrapper: styled.div`
    display: flex;
    gap: 1.2rem;
  `,
  SearchInput: styled.input`
    height: 4rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  ActionButton: styled.button`
    height: 4rem;
    padding: 0 1.6rem;
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray400};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.gray200};
    }
  `,
  TableWrapper: styled.div`
    width: 100%;
    overflow-x: auto; // 모바일/태블릿에서 가로 스크롤
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 0.6rem;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.gray200};
      border-radius: ${({ theme }) => theme.radius.sm};
    }
  `,
  StyledTable: styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.4rem;
    th,
    td {
      padding: 1.6rem 1.2rem;
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
      white-space: nowrap;
    }
    th {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray300};
      background: ${({ theme }) => theme.colors.white}; // (thead 고정 시 필요)
    }
    td {
      color: ${({ theme }) => theme.colors.surface};
      .active {
        color: ${({ theme }) => theme.colors.primary300};
        font-size: 1.3rem;
        margin-left: 0.4rem;
      }
    }
    tbody tr:hover {
      background: ${({ theme }) => theme.colors.gray100};
    }
    tbody td[colSpan] {
      text-align: center;
      padding: 4rem;
      color: ${({ theme }) => theme.colors.gray300};
    }

    @media (${({ theme }) => theme.devices.mobile}) {
      font-size: 1.3rem;

      th,
      td {
        padding: 1.2rem 0.8rem;
      }
    }
  `,
};
