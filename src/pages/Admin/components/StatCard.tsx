import React, { useId, useMemo } from 'react';
import { StatCardStyles as S } from '../styles/StatCard.styled';
import { LoadingSpinner } from '../../../components/HelperComponents'; // (공통 로딩 스피너 임포트)

interface StatCardProps {
  /** 카드 제목 (e.g., "오늘 접속자 수") */
  title: string;

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
