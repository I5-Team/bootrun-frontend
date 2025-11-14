import { useState } from 'react';
import styled from 'styled-components';
import {
  useDashboardStatsQuery,
  useDailyStatsQuery,
  useCourseStatsQuery,
  useCategoryStatsQuery,
  useRevenueStatsQuery,
} from '../../queries/useDashboardQueries';

import AdminPageLayout from './AdminPageLayout';
import StatsCardArea from './StatsCardArea';
import RevenueChartArea from './RevenueChartArea';
import ChartArea from './ChartArea';
import ProgressArea from './ProgressArea';
import TableArea from './TableArea';
import { AdminPageStyles as S } from './AdminPageStyles';

import { LoadingSpinner } from '../../components/HelperComponents';

// --- 헬퍼 함수 ---
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// --- 관리자 대시보드 메인 페이지 ---
export default function DashboardPage() {
  const todayDate = getTodayDate();

  // 매출 차트 기간 필터 상태
  const [revenuePeriod, setRevenuePeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');

  // 커스텀 날짜 범위 상태
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // React Query를 사용한 데이터 조회
  const { data: stats, isLoading: statsLoading } = useDashboardStatsQuery();
  const { data: dailyStats, isLoading: dailyStatsLoading } = useDailyStatsQuery({ period: 'week' });
  const { data: courseStats, isLoading: courseStatsLoading } = useCourseStatsQuery({});
  const { data: categoryStats, isLoading: categoryStatsLoading } = useCategoryStatsQuery();
  const { data: revenueStats, isLoading: revenueStatsLoading } = useRevenueStatsQuery({
    period: revenuePeriod,
    start_date: dateRange.start,
    end_date: dateRange.end,
  });

  // 모든 데이터가 로딩 중인지 확인 (revenueStatsLoading 제외 - 스크롤 유지)
  const loading = statsLoading || dailyStatsLoading || courseStatsLoading || categoryStatsLoading;

  // 로딩 중 표시
  if (loading) {
    return (
      <AdminPageLayout title="관리자 대시보드">
        <S.LoadingContainer>
          <LoadingSpinner />
        </S.LoadingContainer>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="관리자 대시보드"
      rightElement={<S.DateDisplay>{todayDate}</S.DateDisplay>}
    >
      <Layout.Wrapper>
        <Layout.Section>
          <StatsCardArea stats={stats} dailyStats={dailyStats} />
        </Layout.Section>

        <Layout.Section>
          <RevenueChartArea
            revenueStats={revenueStats}
            isLoading={revenueStatsLoading}
            period={revenuePeriod}
            onPeriodChange={setRevenuePeriod}
            onDateRangeChange={setDateRange}
          />
        </Layout.Section>

        <Layout.Section>
          <ChartArea dailyStats={dailyStats} />
        </Layout.Section>

        <Layout.Section>
          <ProgressArea courseStats={courseStats} categoryStats={categoryStats} />
        </Layout.Section>

        <Layout.Section>
          <TableArea courseStats={courseStats} />
        </Layout.Section>
      </Layout.Wrapper>
    </AdminPageLayout>
  );
}

const Layout = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(1.6rem, 5vw, 3.2rem);
    display: flex;
    flex-direction: column;
    gap: clamp(2rem, 4vw, 3.2rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      padding: 0 clamp(1.2rem, 4vw, 2.4rem);
      gap: 2.4rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 1.2rem;
      gap: 2rem;
    }
  `,
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: clamp(1.6rem, 3vw, 2.4rem);
    width: 100%;
    min-width: 0;
  `,
};
