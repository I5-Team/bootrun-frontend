/**
 * 강의 목록을 테이블 형태로 표시하는 컴포넌트
 * 강의 클릭, 수정, 삭제, 공개 상태 변경 등의 액션 처리
 */
import React from 'react';
import styled from 'styled-components';
import type { CourseListItem } from '../../types/AdminCourseType';
import { Button } from '../../components/Button';

interface LectureTableProps {
  courses: CourseListItem[];
  onCourseClick?: (courseId: number) => void;
  onEditClick: (courseId: number) => void;
  onDeleteClick: (courseId: number) => void;
  onTogglePublish: (courseId: number, currentStatus: boolean) => void;
}

/**
 * 카테고리 한글 변환
 */
const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    frontend: '프론트엔드',
    backend: '백엔드',
    data_analysis: '데이터 분석',
    ai: 'AI',
    design: '디자인',
    other: '기타',
  };
  return labels[category] || category;
};

/**
 * 난이도 한글 변환
 */
const getDifficultyLabel = (difficulty: string): string => {
  const labels: Record<string, string> = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };
  return labels[difficulty] || difficulty;
};

/**
 * 가격 유형 한글 변환
 */
const getPriceTypeLabel = (priceType: string, price: number): string => {
  if (priceType === 'free') return '무료';
  if (priceType === 'national_support') return '국비지원';
  return `${price.toLocaleString()}원`;
};

/**
 * 초를 시간:분 형식으로 변환
 */
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}시간 ${minutes}분`;
};

/**
 * 날짜 포맷팅
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (e) {
    return 'N/A';
  }
};

const LectureTable: React.FC<LectureTableProps> = ({
  courses,
  onCourseClick,
  onEditClick,
  onDeleteClick,
  onTogglePublish,
}) => {
  return (
    <S.TableWrapper>
      <S.StyledTable role="table" aria-label="강의 목록">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">강의명</th>
            <th scope="col">카테고리</th>
            <th scope="col">강사명</th>
            <th scope="col">난이도</th>
            <th scope="col">가격</th>
            <th scope="col">재생시간</th>
            <th scope="col">챕터</th>
            <th scope="col">수강생</th>
            <th scope="col">공개</th>
            <th scope="col">생성일</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={12}>등록된 강의가 없습니다.</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr
                key={course.id}
                onClick={() => onCourseClick?.(course.id)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && onCourseClick) {
                    e.preventDefault();
                    onCourseClick(course.id);
                  }
                }}
                tabIndex={onCourseClick ? 0 : -1}
                role="button"
                aria-label={`${course.title} 강의 상세보기`}
                style={{ cursor: onCourseClick ? 'pointer' : 'default' }}
              >
                <td>{course.id}</td>
                <td>
                  <S.TitleCell>
                    <S.Title>{course.title}</S.Title>
                  </S.TitleCell>
                </td>
                <td>
                  <S.CategoryBadge $category={course.category_type}>
                    {getCategoryLabel(course.category_type)}
                  </S.CategoryBadge>
                </td>
                <td>{course.instructor_name}</td>
                <td>
                  <S.DifficultyBadge $difficulty={course.difficulty}>
                    {getDifficultyLabel(course.difficulty)}
                  </S.DifficultyBadge>
                </td>
                <td>{getPriceTypeLabel(course.price_type, course.price)}</td>
                <td>{formatDuration(course.total_duration)}</td>
                <td>{course.total_chapters || 0}개</td>
                <td>{course.total_enrollments || 0}명</td>
                <td>
                  <S.PublishToggle
                    $isPublished={course.is_published}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePublish(course.id, course.is_published);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onTogglePublish(course.id, course.is_published);
                      }
                    }}
                    aria-label={`${course.title} 강의 ${course.is_published ? '비공개로 전환' : '공개로 전환'}`}
                    aria-pressed={course.is_published}
                  >
                    {course.is_published ? '공개' : '비공개'}
                  </S.PublishToggle>
                </td>
                <td>{formatDate(course.created_at)}</td>
                <td>
                  <S.ActionButtons onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEditClick(course.id)}
                      ariaLabel={`${course.title} 수정`}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteClick(course.id)}
                      ariaLabel={`${course.title} 삭제`}
                    >
                      삭제
                    </Button>
                  </S.ActionButtons>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </S.StyledTable>
    </S.TableWrapper>
  );
};

// --- Styles ---
const S = {
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

export default LectureTable;
