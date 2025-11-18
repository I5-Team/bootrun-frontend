import React, { useId, useMemo } from 'react';
import S from '../styles/ChartArea.styled';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import type { DailyStat } from '../../../types/AdminType';
import { ErrorMessage, LoadingSpinner } from '../../../components/HelperComponents';

// 1. Tooltip의 payload 타입 정의 (any 대신 사용)
interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

// 2. Tooltip의 props 타입 정의
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// 3. Props 타입 정의
interface ChartAreaProps {
  dailyStats?: DailyStat[] | null;
}

// 4. 헬퍼 함수
const formatCurrency = (tick: number) => {
  if (tick >= 1000000) return `${tick / 1000000}백만`;
  if (tick >= 1000) return `${tick / 1000}천`;
  return tick.toString();
};

// 5. Tooltip 커스텀 렌더 함수 (타입 적용)
const renderTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload, label } = props as CustomTooltipProps;
  if (active && payload && payload.length) {
    return (
      <S.TooltipContainer>
        {/* label 타입은 'string | number'이므로 그대로 사용 가능 */}
        <p className="label">{label}</p>
        {payload.map((p) => (
          <p className="desc" style={{ color: p.color }} key={p.dataKey}>
            {`${p.name} : ${
              p.dataKey === 'revenue'
                ? formatCurrency(p.value ?? 0) // p.value는 number
                : (p.value ?? 0).toLocaleString()
            }`}
          </p>
        ))}
      </S.TooltipContainer>
    );
  }
  return null;
};

const formatDateLabel = (dateString: string) => {
  try {
    const [, month, day] = dateString.split('-').map(Number);
    return `${month}월 ${day}일`;
  } catch {
    return dateString;
  }
};

const ChartArea: React.FC<ChartAreaProps> = ({ dailyStats }) => {
  const loading = !dailyStats;
  const hasDailyStats = Boolean(dailyStats && dailyStats.length > 0);

  const chartSummary = useMemo(() => {
    if (!dailyStats || !Array.isArray(dailyStats) || dailyStats.length === 0) {
      return {
        visitors: '일별 접속자 수 데이터가 없어 차트 설명을 제공하지 못했습니다.',
        views: '일별 조회수 데이터가 없어 차트 설명을 제공하지 못했습니다.',
        revenue: '일별 결제 금액 데이터가 없어 차트 설명을 제공하지 못했습니다.',
      };
    }

    const getExtremes = (key: keyof DailyStat) => {
      if (dailyStats.length === 0) {
        return { max: dailyStats[0], min: dailyStats[0] };
      }
      const sorted = [...dailyStats].sort((a, b) => (b[key] as number) - (a[key] as number));
      const max = sorted[0];
      const min = sorted[sorted.length - 1];
      return { max, min };
    };

    const visitorsExtremes = getExtremes('visitors');
    const viewsExtremes = getExtremes('views');
    const revenueExtremes = getExtremes('revenue');

    const viewsTotal = dailyStats.reduce((sum, item) => sum + item.views, 0);
    const revenueTotal = dailyStats.reduce((sum, item) => sum + item.revenue, 0);

    return {
      visitors: `${formatDateLabel(visitorsExtremes.max.date)}에는 ${visitorsExtremes.max.visitors.toLocaleString()}명이 방문했고, ${formatDateLabel(
        visitorsExtremes.min.date
      )}에는 ${visitorsExtremes.min.visitors.toLocaleString()}명으로 가장 적었습니다.`,
      views: `최근 ${dailyStats.length}일간 총 조회수는 ${viewsTotal.toLocaleString()}회이며, ${formatDateLabel(
        viewsExtremes.max.date
      )}에 ${viewsExtremes.max.views.toLocaleString()}회로 최고치를 보였습니다.`,
      revenue: `동일 기간 총 결제액은 ${revenueTotal.toLocaleString()}원으로, ${formatDateLabel(
        revenueExtremes.max.date
      )}에 ${revenueExtremes.max.revenue.toLocaleString()}원이 가장 많았습니다.`,
    };
  }, [dailyStats]);

  const visitorsTitleId = useId();
  const visitorsSummaryId = useId();
  const viewsTitleId = useId();
  const viewsSummaryId = useId();
  const revenueTitleId = useId();
  const revenueSummaryId = useId();

  return (
    <S.ChartGrid>
      {/* 차트 1: 일별 접속자 수 */}
      <S.CardBox
        role="group"
        aria-labelledby={visitorsTitleId}
        aria-describedby={hasDailyStats ? visitorsSummaryId : undefined}
      >
        <S.SectionHeader>
          <S.SectionTitle id={visitorsTitleId}>일별 접속자 수</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartWrapper>
          {hasDailyStats && (
            <S.VisuallyHidden id={visitorsSummaryId}>{chartSummary.visitors}</S.VisuallyHidden>
          )}
          {loading && <LoadingSpinner />}
          {!loading && !dailyStats && <ErrorMessage message="데이터 없음" />}
          {hasDailyStats && Array.isArray(dailyStats) && (
            <S.ChartContent aria-hidden="true">
              <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <LineChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" fontSize="1.2rem" />
                  <YAxis fontSize="1.2rem" />
                  <Tooltip content={renderTooltip} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    name="접속자"
                    stroke="#2E6FF2"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </S.ChartContent>
          )}
        </S.ChartWrapper>
      </S.CardBox>

      {/* (차트 2: 일별 조회수 - BarChart) */}
      <S.CardBox
        role="group"
        aria-labelledby={viewsTitleId}
        aria-describedby={hasDailyStats ? viewsSummaryId : undefined}
      >
        <S.SectionHeader>
          <S.SectionTitle id={viewsTitleId}>일별 조회수</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartWrapper>
          {hasDailyStats && (
            <S.VisuallyHidden id={viewsSummaryId}>{chartSummary.views}</S.VisuallyHidden>
          )}
          {loading && <LoadingSpinner />}
          {hasDailyStats && Array.isArray(dailyStats) && (
            <S.ChartContent aria-hidden="true">
              <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <BarChart data={dailyStats}>
                  {/* ... (XAxis, YAxis, Tooltip, Legend) ... */}
                  <Bar dataKey="views" name="조회수" fill="#B5CEFF" />
                </BarChart>
              </ResponsiveContainer>
            </S.ChartContent>
          )}
        </S.ChartWrapper>
      </S.CardBox>

      {/* (차트 3: 일별 결제 금액 - LineChart) */}
      <S.CardBox
        role="group"
        aria-labelledby={revenueTitleId}
        aria-describedby={hasDailyStats ? revenueSummaryId : undefined}
      >
        <S.SectionHeader>
          <S.SectionTitle id={revenueTitleId}>일별 결제 금액</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartWrapper>
          {hasDailyStats && (
            <S.VisuallyHidden id={revenueSummaryId}>{chartSummary.revenue}</S.VisuallyHidden>
          )}
          {loading && <LoadingSpinner />}
          {hasDailyStats && Array.isArray(dailyStats) && (
            <S.ChartContent aria-hidden="true">
              <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <LineChart data={dailyStats}>
                  {/* ... (XAxis, Tooltip, Legend) ... */}
                  <YAxis fontSize="1.2rem" tickFormatter={formatCurrency} />
                  <Line type="monotone" dataKey="revenue" name="결제액(원)" stroke="#8B38FF" />
                </LineChart>
              </ResponsiveContainer>
            </S.ChartContent>
          )}
        </S.ChartWrapper>
      </S.CardBox>
    </S.ChartGrid>
  );
};

export default ChartArea;
