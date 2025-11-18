import { useState } from 'react';
import {
  useDashboardStatsQuery,
  useDailyStatsQuery,
  useCourseStatsQuery,
  useCategoryStatsQuery,
  useRevenueStatsQuery,
} from '../../../queries/useDashboardQueries';

import AdminPageLayout from './AdminPageLayout';
import RevenueChartArea from '../components/RevenueChartArea';
import ChartArea from '../components/ChartArea';
import ProgressArea from '../components/ProgressArea';
import TableArea from '../components/TableArea';
import { AdminPageStyles as S } from '../styles/AdminPageStyles';

import { LoadingSpinner } from '../../../components/HelperComponents';
import StatsCardArea from '../components/StatsCardArea';

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
      <StatsCardArea stats={stats} dailyStats={dailyStats} />

      <RevenueChartArea
        revenueStats={revenueStats}
        isLoading={revenueStatsLoading}
        period={revenuePeriod}
        onPeriodChange={setRevenuePeriod}
        onDateRangeChange={setDateRange}
      />

      <ChartArea dailyStats={dailyStats} />

      <ProgressArea courseStats={courseStats} categoryStats={categoryStats} />

      <TableArea courseStats={courseStats} />
    </AdminPageLayout>
  );
}
