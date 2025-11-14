import React, { useId, useMemo } from 'react';
import styled from 'styled-components';
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
import type { DailyStat } from '../../types/AdminType';
import { ErrorMessage, LoadingSpinner } from '../../components/HelperComponents';

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
    if (!dailyStats || dailyStats.length === 0) {
      return {
        visitors: '일별 접속자 수 데이터가 없어 차트 설명을 제공하지 못했습니다.',
        views: '일별 조회수 데이터가 없어 차트 설명을 제공하지 못했습니다.',
        revenue: '일별 결제 금액 데이터가 없어 차트 설명을 제공하지 못했습니다.',
      };
    }

    const getExtremes = (key: keyof DailyStat) => {
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
          {dailyStats && (
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
          {dailyStats && (
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
          {dailyStats && (
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

// --- Styles ---
const S = {
  ChartGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.6rem, 3vw, 2.4rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      > div:last-child {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      > div:last-child {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: minmax(0, 1fr);
      > div:last-child {
        grid-column: auto;
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      gap: 1.4rem;
    }
  `,
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3.5vw, 2.4rem);
    box-shadow: ${({ theme }) => theme.colors.shadow};
    display: flex;
    flex-direction: column;
    gap: clamp(1.2rem, 2vw, 1.6rem);
    min-width: 0;
    overflow: hidden;
  `,
  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.4rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.8rem;
    }
  `,
  SectionTitle: styled.h3`
    font-size: clamp(1.6rem, 2.1vw, 1.9rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  ChartWrapper: styled.div`
    width: 100%;
    height: clamp(24rem, 42vw, 34rem);
    max-width: 100%;
    overflow: hidden;
    position: relative;
  `,
  ChartContent: styled.div`
    width: 100%;
    height: 100%;
  `,
  FilterWrapper: styled.div`
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  `,
  FilterButton: styled.button<{ $active?: boolean }>`
    padding: 0.8rem 1.2rem;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary100 : theme.colors.gray100};
    color: ${({ theme, $active }) => ($active ? theme.colors.primary300 : theme.colors.gray300)};
    border: none;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.gray200};
    }
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
  TooltipContainer: styled.div`
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: 1.2rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    .label {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
      margin-bottom: 0.8rem;
    }
    .desc {
      font-size: 1.3rem;
      margin: 0;
    }
  `,
};
export default ChartArea;
