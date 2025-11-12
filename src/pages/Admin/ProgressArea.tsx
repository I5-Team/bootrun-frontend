import React, { useId, useMemo } from 'react';
import styled from 'styled-components';
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
import type { CategoryStat, CourseStat } from '../../types/AdminType';
import { ErrorMessage, LoadingSpinner } from '../../components/HelperComponents';

const COLORS = ['#0066FF', '#2E6FF2', '#B5CEFF', '#DEE8FF', '#8B38FF'];

// Props 타입 정의
interface ProgressAreaProps {
  categoryStats: CategoryStat[] | null;
  courseStats: CourseStat[] | null;
}

const ProgressArea: React.FC<ProgressAreaProps> = ({ categoryStats, courseStats }) => {
  const loading = !categoryStats || !courseStats;

  // 전체 강좌 평균 진도율 계산
  const totalAvgProgress = useMemo(() => {
    if (!courseStats || courseStats.length === 0) return 0;
    const sum = courseStats.reduce((acc, course) => acc + course.avg_progress, 0);
    return parseFloat((sum / courseStats.length).toFixed(1));
  }, [courseStats]);

  const categorySummary = useMemo(() => {
    if (!categoryStats || categoryStats.length === 0) {
      return '카테고리별 매출 데이터가 없어 차트 설명을 제공하지 못했습니다.';
    }

    const sortedByRevenue = [...categoryStats].sort((a, b) => b.total_revenue - a.total_revenue);
    const topCategory = sortedByRevenue[0];
    const totalRevenue = categoryStats.reduce((sum, item) => sum + item.total_revenue, 0);

    return `총 ${categoryStats.length}개 카테고리 중 ${topCategory.category_name}이(가) ${topCategory.total_revenue.toLocaleString()}원으로 가장 높고, 전체 매출 합계는 ${totalRevenue.toLocaleString()}원입니다.`;
  }, [categoryStats]);

  const progressSummary = useMemo(() => {
    if (!courseStats || courseStats.length === 0) {
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
          {categoryStats && (
            <S.ChartContent aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    // 3. recharts의 타입 정의가 엄격하지 않아 any[] 캐스팅이 필요할 수 있으나,
                    //    우선 캐스팅 없이 시도합니다. 오류 시 'as any[]'가 필요합니다.
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

      {/* (차트 2: 전체 강좌 평균 진도율 - RadialBarChart) */}
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
              <ResponsiveContainer width="100%" height="100%">
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

// --- Styles ---
const S = {
  ProgressGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1.6rem, 3vw, 2.4rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      grid-template-columns: minmax(0, 1fr);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      gap: 1.6rem;
    }
  `,
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3vw, 2.4rem);
    box-shadow: ${({ theme }) => theme.colors.shadow};
    display: flex;
    flex-direction: column;
    gap: clamp(1.2rem, 2vw, 1.6rem);
    min-width: 0;
    overflow: hidden;
  `,
  SectionTitle: styled.h3`
    font-size: clamp(1.6rem, 2.1vw, 1.9rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.6rem;
    }
  `,
  ChartWrapper: styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: clamp(24rem, 45vw, 32rem);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      min-height: 24rem;
    }
  `,
  ChartContent: styled.div`
    width: 100%;
    height: 100%;
  `,
  RadialLabel: styled.text`
    fill: ${({ theme }) => theme.colors.surface};
    text-anchor: middle;
    dominant-baseline: central;
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
};

export default ProgressArea;
