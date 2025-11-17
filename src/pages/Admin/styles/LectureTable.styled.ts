import styled from 'styled-components';

export const LectureTableStyles = {
  TableWrapper: styled.div`
    width: 100%;
    overflow-x: auto;
  `,
  StyledTable: styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.4rem;
    min-width: 120rem; // 최소 너비 설정 (가로 스크롤 발생)

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
      background: ${({ theme }) => theme.colors.white};
    }

    td {
      color: ${({ theme }) => theme.colors.surface};
      vertical-align: middle;
    }

    tbody tr:hover {
      background: ${({ theme }) => theme.colors.gray100};
    }

    tbody tr:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary300};
      outline-offset: -2px;
      background: ${({ theme }) => theme.colors.gray100};
    }

    tbody td[colSpan] {
      text-align: center;
      padding: 6rem;
      color: ${({ theme }) => theme.colors.gray300};
    }
  `,
  TitleCell: styled.div`
    max-width: 30rem;
  `,
  Title: styled.span`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  CategoryBadge: styled.span<{ $category: string }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    font-size: 1.2rem;
    font-weight: 500;
    background-color: ${({ $category, theme }) => {
      const colors: Record<string, string> = {
        frontend: '#E3F2FD',
        backend: '#E8F5E9',
        data_analysis: '#FFF3E0',
        ai: '#F3E5F5',
        design: '#FCE4EC',
        other: theme.colors.gray100,
      };
      return colors[$category] || colors.other;
    }};
    color: ${({ $category, theme }) => {
      const colors: Record<string, string> = {
        frontend: '#1976D2',
        backend: '#388E3C',
        data_analysis: '#F57C00',
        ai: '#7B1FA2',
        design: '#C2185B',
        other: theme.colors.gray400,
      };
      return colors[$category] || colors.other;
    }};
  `,
  DifficultyBadge: styled.span<{ $difficulty: string }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.xs};
    font-size: 1.2rem;
    font-weight: 500;
    background-color: ${({ $difficulty }) => {
      const colors: Record<string, string> = {
        beginner: '#E8F5E9',
        intermediate: '#FFF3E0',
        advanced: '#FFEBEE',
      };
      return colors[$difficulty] || colors.beginner;
    }};
    color: ${({ $difficulty }) => {
      const colors: Record<string, string> = {
        beginner: '#2E7D32',
        intermediate: '#F57C00',
        advanced: '#C62828',
      };
      return colors[$difficulty] || colors.beginner;
    }};
  `,
  PublishToggle: styled.button<{ $isPublished: boolean }>`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: ${({ theme }) => theme.radius.xs};
    border: 1px solid
      ${({ $isPublished, theme }) =>
        $isPublished ? theme.colors.primary300 : theme.colors.gray200};
    background-color: ${({ $isPublished, theme }) =>
      $isPublished ? theme.colors.primary300 : theme.colors.white};
    color: ${({ $isPublished, theme }) =>
      $isPublished ? theme.colors.white : theme.colors.gray400};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ $isPublished, theme }) =>
        $isPublished ? theme.colors.primaryDark : theme.colors.gray100};
      border-color: ${({ $isPublished, theme }) =>
        $isPublished ? theme.colors.primaryDark : theme.colors.gray300};
    }
  `,
  ActionButtons: styled.div`
    display: flex;
    gap: 0.8rem;
    align-items: center;
  `,
};

export default LectureTableStyles;
