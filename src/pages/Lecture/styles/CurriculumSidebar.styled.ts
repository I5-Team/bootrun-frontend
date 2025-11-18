/**
 * 커리큘럼 사이드바 스타일
 */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChapterWrapper = styled.div`
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};

  &:last-child {
    border-bottom: none;
  }
`;

export const ChapterHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 2rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: -0.2rem;
  }
`;

export const ChapterIcon = styled.span<{ $isExpanded: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? '180deg' : '0deg')});

  img {
    height: 80%;
    object-fit: contain;
  }
`;

export const ChapterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  text-align: left;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const LectureList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const LectureItem = styled.li<{ $isCurrent: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 2rem 1.2rem 4rem;
  background-color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.colors.primary100 : theme.colors.white};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ $isCurrent, theme }) => {
      if ($isCurrent) return theme.colors.primary100;
      return theme.colors.gray100;
    }};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: -0.2rem;
  }
`;

export const LectureIconWrapper = styled.div<{ $isCurrent: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $isCurrent, theme }) => $isCurrent ? theme.colors.primary300 : theme.colors.gray300};

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export const LectureInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`;

export const LectureTitle = styled.span<{ $isCurrent: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ $isCurrent }) => ($isCurrent ? '600' : '500')};
  color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.colors.primary300 : theme.colors.surface};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const LectureDuration = styled.span`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.gray300};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

export const CompletionBadge = styled.span<{ $isCompleted: boolean }>`
  width: 1.4rem;
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  color: ${({ $isCompleted, theme }) => $isCompleted ? theme.colors.primary300 + 'CC' : theme.colors.gray300 + 'CC'};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
