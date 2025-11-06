import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  RadialBarChart, RadialBar,
  type PieLabelRenderProps // ◀◀◀ 1. PieLabelRenderProps 임포트
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
      <S.CardBox>
        <S.SectionTitle>카테고리별 매출 비중</S.SectionTitle>
        <S.ChartWrapper>
          {loading && <LoadingSpinner />}
          {!loading && !categoryStats && <ErrorMessage message="데이터 없음" />}
          {categoryStats && (
            <ResponsiveContainer width="100%" height={300}>
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
          )}
        </S.ChartWrapper>
      </S.CardBox>

      {/* (차트 2: 전체 강좌 평균 진도율 - RadialBarChart) */}
      <S.CardBox>
        <S.SectionTitle>전체 강좌 평균 진도율</S.SectionTitle>
        <S.ChartWrapper>
          {loading && <LoadingSpinner />}
          {courseStats && (
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="60%" outerRadius="90%"
                barSize={30}
                data={[{ name: '평균', value: totalAvgProgress }]}
                startAngle={90} endAngle={-270}
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
          )}
        </S.ChartWrapper>
      </S.CardBox>
    </S.ProgressGrid>
  );
};

// --- Styles ---
const S = {
  ProgressGrid: styled.section`...`, // (스타일 동일)
  CardBox: styled.div`...`,
  SectionTitle: styled.h3`...`,
  ChartWrapper: styled.div`...`,
  RadialLabel: styled.text`...`,
};

export default ProgressArea;