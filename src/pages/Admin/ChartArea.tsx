import React from 'react';
import styled from 'styled-components';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  type TooltipProps
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
  dailyStats: DailyStat[] | null;
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

const ChartArea: React.FC<ChartAreaProps> = ({ dailyStats }) => {
  const loading = !dailyStats;

  return (
    <S.ChartGrid>
      {/* 차트 1: 일별 접속자 수 */}
      <S.CardBox>
        <S.SectionHeader>
          <S.SectionTitle>일별 접속자 수</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartWrapper>
          {loading && <LoadingSpinner />}
          {!loading && !dailyStats && <ErrorMessage message="데이터 없음" />}
          {dailyStats && (
            <ResponsiveContainer width="100%" height={300}>
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
          )}
        </S.ChartWrapper>
      </S.CardBox>

      {/* (차트 2: 일별 조회수 - BarChart) */}
      <S.CardBox>
        <S.SectionHeader>
          <S.SectionTitle>일별 조회수</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartWrapper>
          {loading && <LoadingSpinner />}
          {dailyStats && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                {/* ... (XAxis, YAxis, Tooltip, Legend) ... */}
                <Bar dataKey="views" name="조회수" fill="#B5CEFF" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </S.ChartWrapper>
      </S.CardBox>

      {/* (차트 3: 일별 결제 금액 - LineChart) */}
      <S.CardBox>
        <S.SectionHeader>
          <S.SectionTitle>일별 결제 금액</S.SectionTitle>
        </S.SectionHeader>
        <S.ChartWrapper>
          {loading && <LoadingSpinner />}
          {dailyStats && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                {/* ... (XAxis, Tooltip, Legend) ... */}
                <YAxis fontSize="1.2rem" tickFormatter={formatCurrency} />
                <Line type="monotone" dataKey="revenue" name="결제액(원)" stroke="#8B38FF" />
              </LineChart>
            </ResponsiveContainer>
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
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    @media (${({ theme }) => theme.devices.laptop}) {
      grid-template-columns: 1fr;
    }
  `,
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 2.4rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
  `,
  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.4rem;
  `,
  SectionTitle: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.lg}; // 2.4rem
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  ChartWrapper: styled.div`
    width: 100%;
    height: 300px; // ResponsiveContainer의 높이와 일치
  `,
  FilterWrapper: styled.div`
    display: flex;
    gap: 0.8rem;
  `,
  FilterButton: styled.button<{ $active?: boolean }>`
    padding: 0.8rem 1.2rem;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary100 : theme.colors.gray100};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.primary300 : theme.colors.gray300};
    border: none;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.gray200};
    }
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