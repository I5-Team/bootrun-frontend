import React, { useState, useMemo, useRef, useEffect } from 'react';
import { RevenueChartAreaStyles as S } from '../styles/RevenueChartArea.styled';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import type { RevenueStat } from '../../../types/AdminType';
import { ErrorMessage, LoadingSpinner } from '../../../components/HelperComponents';
import Pagination from '../../../components/Pagination';
import Button from '../../../components/Button';
import { PaymentFilterBarStyles as FilterBar } from '../styles/PaymentFilterBar.styled';

interface RevenueChartAreaProps {
  revenueStats?: RevenueStat[] | null;
  isLoading?: boolean;
  period?: 'day' | 'week' | 'month' | 'year';
  onPeriodChange?: (period: 'day' | 'week' | 'month' | 'year') => void;
  onDateRangeChange?: (dateRange: { start: string; end: string }) => void;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

// 포맷 함수
const formatCurrency = (tick: number) => {
  if (tick >= 1000000) return `${(tick / 1000000).toFixed(1)}백만`;
  if (tick >= 1000) return `${(tick / 1000).toFixed(1)}천`;
  return tick.toString();
};

const formatDateLabel = (dateString: string) => {
  try {
    const [, month, day] = dateString.split('-').map(Number);
    return `${month}월 ${day}일`;
  } catch {
    return dateString;
  }
};

// 커스텀 Tooltip
const renderTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload, label } = props as CustomTooltipProps;
  if (active && payload && payload.length) {
    return (
      <S.TooltipContainer>
        <p className="label">{label}</p>
        {payload.map((p) => (
          <p className="desc" style={{ color: p.color }} key={p.dataKey}>
            {`${p.name} : ${formatCurrency(p.value ?? 0)}`}
          </p>
        ))}
      </S.TooltipContainer>
    );
  }
  return null;
};

const RevenueChartArea: React.FC<RevenueChartAreaProps> = ({
  revenueStats,
  isLoading = false,
  period: propPeriod = 'week',
  onPeriodChange,
  onDateRangeChange,
}) => {
  // 스크롤 위치 저장 (버튼 클릭 시 현재 위치 기억)
  const scrollYRef = useRef(0);

  // 기간 필터 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // props에서 받은 period 사용 (또는 로컬 상태 사용)
  const period = propPeriod;

  // 데이터 확인
  const loading = isLoading || !revenueStats;
  const hasData = Boolean(revenueStats && revenueStats.length > 0);

  // 차트용 요약 정보
  const chartSummary = useMemo(() => {
    if (!revenueStats || !Array.isArray(revenueStats) || revenueStats.length === 0) {
      return {
        totalRevenue: '0원',
        totalRefund: '0원',
        netRevenue: '0원',
        avgDaily: '0원',
      };
    }

    const total = revenueStats.reduce((sum, stat) => sum + stat.revenue, 0);
    const refund = revenueStats.reduce((sum, stat) => sum + stat.refund_amount, 0);
    const net = revenueStats.reduce((sum, stat) => sum + stat.net_revenue, 0);

    return {
      totalRevenue: `${total.toLocaleString()}원`,
      totalRefund: `${refund.toLocaleString()}원`,
      netRevenue: `${net.toLocaleString()}원`,
      avgDaily: `${Math.floor(net / revenueStats.length).toLocaleString()}원`,
    };
  }, [revenueStats]);

  // 테이블 전체 데이터 (최신순)
  const allTableData = useMemo(() => {
    if (!revenueStats || !Array.isArray(revenueStats)) return [];
    return revenueStats.slice().reverse(); // 최신순
  }, [revenueStats]);

  // 페이지네이션 적용된 테이블 데이터
  const tableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return allTableData.slice(start, end);
  }, [allTableData, currentPage]);

  // 전체 페이지 수
  const totalPages = Math.ceil(allTableData.length / itemsPerPage);

  // 버튼 클릭 시 스크롤 위치 저장 후 기간 변경
  const handlePeriodChange = (newPeriod: 'day' | 'week' | 'month' | 'year') => {
    scrollYRef.current = window.scrollY; // 현재 스크롤 위치 저장
    onPeriodChange?.(newPeriod);
  };

  // 데이터 변경 후 저장된 스크롤 위치로 복원
  useEffect(() => {
    if (!isLoading && hasData && scrollYRef.current > 0) {
      window.scrollTo(0, scrollYRef.current);
    }
  }, [isLoading, hasData]); // isLoading이 false로 바뀔 때 (로딩 완료) 실행

  return (
    <S.CardBox>
      <S.HeaderWithFilters>
        <S.SectionTitle>매출 상세 분석</S.SectionTitle>

        <S.FilterContainer>
          {/* 프리셋 버튼 */}
          <S.PresetButtons>
            <Button
              variant={period === 'day' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('day')}
            >
              일간
            </Button>
            <Button
              variant={period === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('week')}
            >
              주간
            </Button>
            <Button
              variant={period === 'month' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('month')}
            >
              월간
            </Button>
            <Button
              variant={period === 'year' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('year')}
            >
              연간
            </Button>
          </S.PresetButtons>

          {/* 날짜 피커 */}
          <S.DatePickerWrapper>
            <S.Divider>|</S.Divider>
            <FilterBar.FilterGroup>
              <label htmlFor="start-date-filter" className="sr-only">
                조회 시작일
              </label>
              <FilterBar.Input
                id="start-date-filter"
                type="date"
                name="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="시작일"
              />
            </FilterBar.FilterGroup>

            <S.DateDash>~</S.DateDash>

            <FilterBar.FilterGroup>
              <label htmlFor="end-date-filter" className="sr-only">
                조회 종료일
              </label>
              <FilterBar.Input
                id="end-date-filter"
                type="date"
                name="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="종료일"
              />
            </FilterBar.FilterGroup>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (startDate && endDate) {
                  // 스크롤 위치 저장
                  scrollYRef.current = window.scrollY;
                  // 날짜 범위 전달
                  onDateRangeChange?.({ start: startDate, end: endDate });
                } else {
                  alert('시작일과 종료일을 모두 선택해주세요.');
                }
              }}
            >
              조회
            </Button>
          </S.DatePickerWrapper>
        </S.FilterContainer>
      </S.HeaderWithFilters>

      {/* 로딩 상태 */}
      {loading && (
        <S.LoadingContainer>
          <LoadingSpinner />
        </S.LoadingContainer>
      )}

      {/* 데이터 없음 */}
      {!loading && !hasData && (
        <S.ErrorContainer>
          <ErrorMessage message="매출 데이터가 없습니다" />
        </S.ErrorContainer>
      )}

      {/* 차트 + 테이블 */}
      {!loading && hasData && Array.isArray(revenueStats) && (
        <>
          {/* 요약 통계 */}
          <S.SummaryStats>
            <S.StatItem>
              <S.StatLabel>총 매출</S.StatLabel>
              <S.StatValue>{chartSummary.totalRevenue}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>총 환불액</S.StatLabel>
              <S.StatValue>{chartSummary.totalRefund}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>순 매출</S.StatLabel>
              <S.StatValue>{chartSummary.netRevenue}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>평균 일 매출</S.StatLabel>
              <S.StatValue>{chartSummary.avgDaily}</S.StatValue>
            </S.StatItem>
          </S.SummaryStats>

          {/* 차트 */}
          <S.ChartWrapper>
            <S.ChartContent>
              <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <LineChart data={revenueStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDateLabel}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={formatCurrency}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatCurrency}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <Tooltip content={renderTooltip} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="매출"
                    stroke="#3b82f6"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="net_revenue"
                    name="순 매출"
                    stroke="#10b981"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </S.ChartContent>
          </S.ChartWrapper>

          {/* 테이블 */}
          <S.TableWrapper>
            <S.Table>
              <thead>
                <tr>
                  <S.TableHeader>날짜</S.TableHeader>
                  <S.TableHeader>매출</S.TableHeader>
                  <S.TableHeader>결제건수</S.TableHeader>
                  <S.TableHeader>환불액</S.TableHeader>
                  <S.TableHeader>환불건수</S.TableHeader>
                  <S.TableHeader>순 매출</S.TableHeader>
                </tr>
              </thead>
              <tbody>
                {tableData.map((stat) => (
                  <tr key={stat.date}>
                    <S.TableCell>{formatDateLabel(stat.date)}</S.TableCell>
                    <S.TableCell>{stat.revenue.toLocaleString()}원</S.TableCell>
                    <S.TableCell>{stat.payment_count}건</S.TableCell>
                    <S.TableCell>{stat.refund_amount.toLocaleString()}원</S.TableCell>
                    <S.TableCell>{stat.refund_count}건</S.TableCell>
                    <S.TableCell>
                      <S.NetRevenueValue>{stat.net_revenue.toLocaleString()}원</S.NetRevenueValue>
                    </S.TableCell>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrapper>

          {/* 페이지네이션 */}
          <S.PaginationWrapper $totalPage={totalPages}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </S.PaginationWrapper>
        </>
      )}
    </S.CardBox>
  );
};

export default RevenueChartArea;
