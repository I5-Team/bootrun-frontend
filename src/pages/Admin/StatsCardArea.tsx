import React from 'react';
import styled from 'styled-components';
import { StatCard } from './StatCard'; // (이전과 동일한 StatCard UI 컴포넌트)
import type { AdminStats, DailyStat } from '../../types/AdminType';

// (임시) 아이콘
const VisitIcon = () => <span>👥</span>;
const ViewIcon = () => <span>👁️</span>;
const RevenueIcon = () => <span>💳</span>;
const NewUserIcon = () => <span>🧾</span>;

// (헬퍼 함수)
const formatCurrency = (amount: number) => `${amount.toLocaleString()}원`;
const formatNumber = (amount: number) => `${amount.toLocaleString()}명`;
const formatView = (amount: number) => `${amount.toLocaleString()}회`;

// Props 타입 정의
interface StatsCardAreaProps {
  stats: AdminStats | null;
  dailyStats: DailyStat[] | null;
}

const StatsCardArea: React.FC<StatsCardAreaProps> = ({ stats, dailyStats }) => {
  // 데이터가 로드되기 전(null)이거나, 로딩 중(부모에서)일 때를 대비
  const loading = !stats || !dailyStats;

  // Swagger 기준, '신규 회원 수'는 dailyStats의 마지막 항목(오늘)에서 가져옵니다.
  const todayNewUsers =
    dailyStats && dailyStats.length > 0
      ? dailyStats[dailyStats.length - 1].new_users
      : 0;

  return (
    <S.StatsGrid>
      <StatCard
        title="오늘 접속자 수"
        icon={<VisitIcon />}
        loading={loading}
        value={loading ? '...' : formatNumber(stats?.today_visitors ?? 0)}
      />
      <StatCard
        title="오늘 조회수"
        icon={<ViewIcon />}
        loading={loading}
        value={loading ? '...' : formatView(stats?.today_views ?? 0)}
      />
      <StatCard
        title="오늘 결제액"
        icon={<RevenueIcon />}
        loading={loading}
        value={loading ? '...' : formatCurrency(stats?.today_revenue ?? 0)}
      />
      <StatCard
        title="신규 회원 수"
        icon={<NewUserIcon />}
        loading={loading}
        value={loading ? '...' : formatNumber(todayNewUsers)}
      />
    </S.StatsGrid>
  );
};

const S = {
  StatsGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    @media (${({ theme }) => theme.devices.laptop}) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (${({ theme }) => theme.devices.mobile}) {
      grid-template-columns: 1fr;
    }
  `,
};

export default StatsCardArea;
