import React from 'react';
import { StatsCardAreaStyles as S } from '../styles/StatsCardArea.styled';
import { StatCard } from './StatCard'; // (이전과 동일한 StatCard UI 컴포넌트)
import type { AdminStats, DailyStat } from '../../../types/AdminType';

// (헬퍼 함수)
const formatCurrency = (amount: number) => `${amount.toLocaleString()}원`;
const formatNumber = (amount: number) => `${amount.toLocaleString()}명`;
const formatView = (amount: number) => `${amount.toLocaleString()}회`;

// Props 타입 정의
interface StatsCardAreaProps {
  stats?: AdminStats | null;
  dailyStats?: DailyStat[] | null;
}

const StatsCardArea: React.FC<StatsCardAreaProps> = ({ stats, dailyStats }) => {
  // 데이터가 로드되기 전(null)이거나, 로딩 중(부모에서)일 때를 대비
  const loading = !stats || !dailyStats;

  // Swagger 기준, '신규 회원 수'는 dailyStats의 마지막 항목(오늘)에서 가져옵니다.
  const todayNewUsers =
    dailyStats && dailyStats.length > 0 ? dailyStats[dailyStats.length - 1].new_users : 0;

  return (
    <S.StatsGrid>
      <StatCard
        title="오늘 접속자 수"
        loading={loading}
        value={loading ? '...' : formatNumber(stats?.today_visitors ?? 0)}
      />
      <StatCard
        title="오늘 조회수"
        loading={loading}
        value={loading ? '...' : formatView(stats?.today_views ?? 0)}
      />
      <StatCard
        title="오늘 결제액"
        loading={loading}
        value={loading ? '...' : formatCurrency(stats?.today_revenue ?? 0)}
      />
      <StatCard
        title="신규 회원 수"
        loading={loading}
        value={loading ? '...' : formatNumber(todayNewUsers)}
      />
    </S.StatsGrid>
  );
};

export default StatsCardArea;
