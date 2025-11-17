import styled from 'styled-components';

export const StatCardStyles = {
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

export default StatCardStyles;
