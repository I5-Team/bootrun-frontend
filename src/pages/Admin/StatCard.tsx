import React, { type ReactNode, useId, useMemo } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/HelperComponents'; // (공통 로딩 스피너 임포트)

interface StatCardProps {
  /** 카드 제목 (e.g., "오늘 접속자 수") */
  title: string;
  /** 카드에 표시될 아이콘 (ReactNode) */
  icon: ReactNode;
  /** 로딩 상태 */
  loading: boolean;
  /** 표시할 메인 값 (e.g., "120명") */
  value: string | number;
  /** 전일 대비 등락 (e.g., "+5.2%") */
  change?: string;
  /** 등락 값의 색상 (e.g., 'positive' | 'negative') */
  changeType?: 'positive' | 'negative' | 'neutral';
}

/**
 * 대시보드 상단의 개별 통계 카드를 표시하는 UI 컴포넌트
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  icon,
  loading,
  value,
  change,
  changeType = 'neutral',
}) => {
  const titleId = useId();
  const summaryId = useId();

  const summaryText = useMemo(() => {
    if (loading) {
      return `${title} 데이터를 불러오는 중입니다.`;
    }
    const formattedValue =
      typeof value === 'number' ? value.toLocaleString() : (value?.toString() ?? '0');
    const changeSentence = change ? ` 변화량은 ${change}입니다.` : '';
    return `${title} 현재 값은 ${formattedValue}입니다.${changeSentence}`;
  }, [loading, title, value, change]);

  return (
    <S.CardBox
      role="group"
      aria-labelledby={titleId}
      aria-describedby={!loading ? summaryId : undefined}
    >
      <S.CardHeader>
        <S.CardTitle id={titleId}>{title}</S.CardTitle>
        <S.IconWrapper>{icon}</S.IconWrapper>
      </S.CardHeader>
      <S.CardBody>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <S.VisuallyHidden id={summaryId}>{summaryText}</S.VisuallyHidden>
            <S.ValueText>{value}</S.ValueText>
            {change && <S.ChangeText $type={changeType}>{change}</S.ChangeText>}
          </>
        )}
      </S.CardBody>
    </S.CardBox>
  );
};

// --- Styles ---

const S = {
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3vw, 2.4rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: clamp(15rem, 30vw, 18rem); // 카드 최소 높이
    min-width: 0;
  `,
  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.6rem;
  `,
  CardTitle: styled.h3`
    font-size: clamp(1.6rem, 2vw, 1.8rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0;
  `,
  IconWrapper: styled.div`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary100}; // #DEE8FF
    color: ${({ theme }) => theme.colors.primary300}; // #2E6FF2

    // 아이콘 SVG 크기 조절 (임시)
    svg,
    span {
      font-size: 1.8rem;
    }
  `,
  CardBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: end;
    gap: 0.8rem;
    min-height: clamp(4.8rem, 8vw, 6rem); // 로딩 스피너 공간 확보
    position: relative;
  `,
  ValueText: styled.span`
    font-size: clamp(2rem, 3vw, 2.7rem);
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
  `,
  ChangeText: styled.span<{ $type: string }>`
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 600;
    color: ${({ theme, $type }) =>
      $type === 'positive'
        ? theme.colors.primary300 // (임시) 상승색
        : $type === 'negative'
          ? theme.colors.alert // 하락색
          : theme.colors.gray300}; // 중립색
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
};
