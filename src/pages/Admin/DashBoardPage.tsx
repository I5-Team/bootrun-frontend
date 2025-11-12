import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { AdminStats, CourseStat, DailyStat, CategoryStat } from '../../types/AdminType';
import {
  fetchDashboardStats,
  fetchDailyStats,
  fetchCourseStats,
  fetchCategoryStats,
} from '../../api/adminApi';

import AdminPageLayout from './AdminPageLayout';
import StatsCardArea from './StatsCardArea';
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

  // API 데이터를 저장할 State
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStat[] | null>(null);
  const [courseStats, setCourseStats] = useState<CourseStat[] | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // ▼▼▼ 5. 4개의 API를 동시에 호출 ▼▼▼
        const [statsData, dailyStatsData, courseStatsData, categoryStatsData] = await Promise.all([
          fetchDashboardStats(),
          fetchDailyStats({ period: 'week' }), // 7일치 데이터
          fetchCourseStats({}),
          fetchCategoryStats(), // API 호출 추가
        ]);

        setStats(statsData);
        setDailyStats(dailyStatsData);
        setCourseStats(courseStatsData);
        setCategoryStats(categoryStatsData); // 상태 저장
      } catch (error) {
        console.error('대시보드 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []); // 컴포넌트 마운트 시 1회 실행

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
  `,
};
