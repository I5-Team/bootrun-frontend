import React, { useId, useMemo } from 'react';
import { ProgressAreaStyles as S } from '../styles/ProgressArea.styled';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar,
  type PieLabelRenderProps, // ◀◀◀ 1. PieLabelRenderProps 임포트
} from 'recharts';
import type { CategoryStat, CourseStat } from '../../../types/AdminType';
import { ErrorMessage, LoadingSpinner } from '../../../components/HelperComponents';

const COLORS = ['#0066FF', '#2E6FF2', '#B5CEFF', '#DEE8FF', '#8B38FF'];

// Props 타입 정의
interface ProgressAreaProps {
  categoryStats?: CategoryStat[] | null;
  courseStats?: CourseStat[] | null;
}

const ProgressArea: React.FC<ProgressAreaProps> = ({ categoryStats, courseStats }) => {
  const loading = !categoryStats || !courseStats;

  // 전체 강좌 평균 진도율 계산
  const totalAvgProgress = useMemo(() => {
    if (!courseStats || !Array.isArray(courseStats) || courseStats.length === 0) return 0;
    const sum = courseStats.reduce((acc, course) => acc + course.avg_progress, 0);
    return parseFloat((sum / courseStats.length).toFixed(1));
  }, [courseStats]);

  const categorySummary = useMemo(() => {
    if (!categoryStats || !Array.isArray(categoryStats) || categoryStats.length === 0) {
      return '카테고리별 매출 데이터가 없어 차트 설명을 제공하지 못했습니다.';
    }

    const sortedByRevenue = [...categoryStats].sort((a, b) => b.total_revenue - a.total_revenue);
    const topCategory = sortedByRevenue[0];
    const totalRevenue = categoryStats.reduce((sum, item) => sum + item.total_revenue, 0);

    return `총 ${categoryStats.length}개 카테고리 중 ${topCategory.category_name}이(가) ${topCategory.total_revenue.toLocaleString()}원으로 가장 높고, 전체 매출 합계는 ${totalRevenue.toLocaleString()}원입니다.`;
  }, [categoryStats]);

  const progressSummary = useMemo(() => {
    if (!courseStats || !Array.isArray(courseStats) || courseStats.length === 0) {
      return '강좌 진도율 데이터가 없어 차트 설명을 제공하지 못했습니다.';
    }
    return `전체 ${courseStats.length}개 강좌의 평균 진도율은 ${totalAvgProgress}%입니다.`;
  }, [courseStats, totalAvgProgress]);

  const categoryTitleId = useId();
  const categorySummaryId = useId();
  const progressTitleId = useId();
  const progressSummaryId = useId();

  // 2. Pie Label 렌더 함수 (정확한 타입 사용)
  const renderPieLabel = (props: PieLabelRenderProps) => {
    if (typeof props.percent !== 'number') {
      return '';
    }
    return `${props.name} (${(props.percent * 100).toFixed(0)}%)`;
  };

  return (
    <S.ProgressGrid>
      {/* 차트 1: 카테고리별 매출 비중 (PieChart) */}
      <S.CardBox
        role="group"
        aria-labelledby={categoryTitleId}
        aria-describedby={categoryStats ? categorySummaryId : undefined}
      >
        <S.SectionTitle id={categoryTitleId}>카테고리별 매출 비중</S.SectionTitle>
        <S.ChartWrapper>
          {categoryStats && (
            <S.VisuallyHidden id={categorySummaryId}>{categorySummary}</S.VisuallyHidden>
          )}
          {loading && <LoadingSpinner />}
          {!loading && !categoryStats && <ErrorMessage message="데이터 없음" />}
          {categoryStats && Array.isArray(categoryStats) && (
            <S.ChartContent aria-hidden="true">
              <ResponsiveContainer width="100%" height={320} minHeight={320}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    dataKey="total_revenue"
                    nameKey="category_name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={renderPieLabel} // 4. 수정된 렌더 함수 연결
                  >
                    {categoryStats.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()}원`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContent>
          )}
        </S.ChartWrapper>
      </S.CardBox>

      {/* 차트 2: 전체 강좌 평균 진도율 - RadialBarChart */}
      <S.CardBox
        role="group"
        aria-labelledby={progressTitleId}
        aria-describedby={courseStats ? progressSummaryId : undefined}
      >
        <S.SectionTitle id={progressTitleId}>전체 강좌 평균 진도율</S.SectionTitle>
        <S.ChartWrapper>
          {courseStats && (
            <S.VisuallyHidden id={progressSummaryId}>{progressSummary}</S.VisuallyHidden>
          )}
          {loading && <LoadingSpinner />}
          {courseStats && (
            <S.ChartContent aria-hidden="true">
              <ResponsiveContainer width="100%" height={320} minHeight={320}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  barSize={35}
                  data={[{ name: '평균', value: totalAvgProgress }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background dataKey="value" fill="#0066FF" />
                  <S.RadialLabel>
                    <tspan x="50%" y="50%" dy="-0.5em" fontSize="2.4rem" fontWeight="700">
                      {totalAvgProgress}%
                    </tspan>
                    <tspan x="50%" y="50%" dy="1.2em" fontSize="1.4rem" fill="#8D9299">
                      평균 진도율
                    </tspan>
                  </S.RadialLabel>
                </RadialBarChart>
              </ResponsiveContainer>
            </S.ChartContent>
          )}
        </S.ChartWrapper>
      </S.CardBox>
    </S.ProgressGrid>
  );
};

export default ProgressArea;
