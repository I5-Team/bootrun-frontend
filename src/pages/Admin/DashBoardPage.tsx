import  { useEffect, useState } from 'react';
import styled from 'styled-components';
import type {
  AdminStats,
  CourseStat,
  DailyStat,
  CategoryStat, 
} from '../../types/AdminType';
import {
  fetchDashboardStats,
  fetchDailyStats,
  fetchCourseStats,
  fetchCategoryStats, 
} from '../../api/adminApi';

import StatsCardArea from './StatsCardArea';
import ChartArea from './ChartArea';
import ProgressArea from './ProgressArea';
import TableArea from './TableArea';

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
        const [
          statsData,
          dailyStatsData,
          courseStatsData,
          categoryStatsData,
        ] = await Promise.all([
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
      <S.PageWrapper>
        <S.PageHeader>
          <S.PageTitle>관리자 대시보드</S.PageTitle>
        </S.PageHeader>
        <S.LoadingContainer>
          <LoadingSpinner />
        </S.LoadingContainer>
      </S.PageWrapper>
    );
  }

  return (
    <S.PageWrapper>
      <S.PageHeader>
        <S.PageTitle>관리자 대시보드</S.PageTitle>
        <S.DateDisplay>{todayDate}</S.DateDisplay>
      </S.PageHeader>

      <S.ContentLayout>
        {/* ▼▼▼ 7. 자식 컴포넌트에 props로 데이터 전달 ▼▼▼ */}
        <StatsCardArea stats={stats} dailyStats={dailyStats} />
        <ChartArea dailyStats={dailyStats} />
        <ProgressArea
          courseStats={courseStats}
          categoryStats={categoryStats}
        />
        <TableArea courseStats={courseStats} />
      </S.ContentLayout>
    </S.PageWrapper>
  );
}

// --- Styles ---
const S = {
  PageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 2.4rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    min-height: 100vh;
  `,
  PageHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  PageTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  DateDisplay: styled.span`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  ContentLayout: styled.main`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  `,
};