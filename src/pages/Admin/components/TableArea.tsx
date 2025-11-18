import React from 'react';
import { TableAreaStyles as S } from '../styles/TableArea.styled';
import type { CourseStat } from '../../../types/AdminType';
import { ErrorMessage, LoadingSpinner } from '../../../components/HelperComponents';

// Props 타입 정의
interface TableAreaProps {
  courseStats?: CourseStat[] | null;
}

const TableArea: React.FC<TableAreaProps> = ({ courseStats }) => {
  const loading = !courseStats;

  return (
    <S.CardBox>
      <S.SectionHeader>
        <S.SectionTitle>강의별 통계</S.SectionTitle>
        {/* ( ... TableActions ... ) */}
      </S.SectionHeader>

      {loading && <LoadingSpinner />}
      {!loading && !courseStats && <ErrorMessage message="데이터 없음" />}

      {courseStats && Array.isArray(courseStats) && (
        <S.TableWrapper>
          <S.StyledTable>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>강의명</th>
                <th>매출</th>
                <th>수강생(활성)</th>
                <th>평균 진도율</th>
                <th>완료율</th>
              </tr>
            </thead>
            <tbody>
              {!loading && courseStats?.length === 0 && (
                <tr>
                  <td colSpan={6}>데이터가 없습니다.</td>
                </tr>
              )}
              {courseStats?.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.category_name}</td>
                  <td>{course.course_title}</td>
                  <td>{course.total_revenue.toLocaleString()}원</td>
                  <td>
                    {course.total_enrollments.toLocaleString()}
                    <span className="active">({course.active_enrollments.toLocaleString()})</span>
                  </td>
                  <td>{course.avg_progress.toFixed(1)}%</td>
                  <td>{course.completion_rate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </S.StyledTable>
        </S.TableWrapper>
      )}
    </S.CardBox>
  );
};

export default TableArea;
