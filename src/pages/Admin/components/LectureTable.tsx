/**
 * 강의 목록을 테이블 형태로 표시하는 컴포넌트
 * 강의 클릭, 수정, 삭제, 공개 상태 변경 등의 액션 처리
 */
import React from 'react';
import type { CourseListItem } from '../../../types/AdminCourseType';
import { Button } from '../../../components/Button';
import S from '../styles/LectureTable.styled';

interface LectureTableProps {
  courses: CourseListItem[];
  totalCount: number; // 전체 강의 개수
  currentPage: number; // 현재 페이지 번호
  pageSize: number; // 페이지 크기
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
  } catch {
    return 'N/A';
  }
};

const LectureTable: React.FC<LectureTableProps> = ({
  courses,
  totalCount,
  currentPage,
  pageSize,
  onCourseClick,
  onEditClick,
  onDeleteClick,
  onTogglePublish,
}) => {
  // 페이지네이션을 고려한 순번 계산 함수
  // ID 기준 내림차순 정렬 (ID 12 → 순번 12, ID 1 → 순번 1)
  const getRowNumber = (index: number): number => {
    return totalCount - (currentPage - 1) * pageSize - index;
  };
  return (
    <S.TableWrapper>
      <S.StyledTable role="table" aria-label="강의 목록">
        <thead>
          <tr>
            <th scope="col">순번</th>
            <th scope="col">강의 ID</th>
            <th scope="col">강의명</th>
            <th scope="col">카테고리</th>
            <th scope="col">강사명</th>
            <th scope="col">난이도</th>
            <th scope="col">수강생</th>
            <th scope="col">매출</th>
            <th scope="col">평균 진행률</th>
            <th scope="col">완료율</th>
            <th scope="col">공개</th>
            <th scope="col">생성일</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={13}>등록된 강의가 없습니다.</td>
            </tr>
          ) : (
            courses.map((course, index) => (
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
                <td>{getRowNumber(index)}</td>
                <td>{course.id}</td>
                <td>
                  <S.TitleCell>
                    <S.Title>{course.title}</S.Title>
                  </S.TitleCell>
                </td>
                <td>
                  <S.CategoryBadge $category={course.category_name}>
                    {getCategoryLabel(course.category_name)}
                  </S.CategoryBadge>
                </td>
                <td>{course.instructor_name}</td>
                <td>
                  <S.DifficultyBadge $difficulty={course.difficulty}>
                    {getDifficultyLabel(course.difficulty)}
                  </S.DifficultyBadge>
                </td>
                <td>{course.enrollment_count || 0}명</td>
                <td>{course.total_revenue?.toLocaleString()}원</td>
                <td>{course.avg_progress}%</td>
                <td>{course.completion_rate}%</td>
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

export default LectureTable;
