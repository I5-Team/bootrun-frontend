import React from 'react';
import styled, { css } from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockCardData } from '../../../data/mockLectureData';
import type { CardData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import Button from '../../../components/Button';
import ShareIcon from '../../../assets/icons/icon-share.svg?react';

const LectureInfoBox: React.FC = () => {
  const { data, loading, error } = useApiData<CardData>(mockCardData, 200);

  const calculateDdayFrom = (targetDateString: string) => {
    const targetDate = new Date(targetDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return 'D-Day';
    return `D+${Math.abs(diffDays)}`;
};

  return (
    <S.FloatingCardWrapper>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <>
          <S.Title>{data.title}</S.Title>

          <S.Content>
            <S.LectureInfoList>
              {data.items.map((item) => (
                <li key={item.label}>
                  <S.InfoLabel>{item.label}</S.InfoLabel>
                  <S.InfoValue>
                    <span style={{ whiteSpace: 'nowrap' }}>{item.value}</span>
                    {item.isClosed !== undefined && 
                    (item.isClosed 
                      ? <S.DdayTag $variant="closed">모집마감</S.DdayTag> 
                      : <S.DdayTag $variant="open">{calculateDdayFrom('2025-07-27')}</S.DdayTag>)
                    }
                  </S.InfoValue>
                </li>
              ))}
            </S.LectureInfoList>
          </S.Content>

          <S.ButtonContainer>
            <S.Price>₩{data.price.toLocaleString()}</S.Price>
            {data.status === "closed" 
              ? <Button size="lg" fullWidth disabled={true}>수강신청 마감</Button>
              :   
              <Button size="lg" fullWidth>수강신청 하기</Button>
            }
            <Button variant='outline' size="lg" fullWidth aria-label="강의 링크 공유하기" iconSvg={<ShareIcon/>}>공유하기</Button>
          </S.ButtonContainer>
        </>
      )}
    </S.FloatingCardWrapper>
  );
};

// --- Styles (HTML 클래스명 기반으로 재정리) ---
const S = {
  FloatingCardWrapper: styled.aside`
    flex: 1 1 auto;
    min-width: 34rem;

    display: flex;
    flex-direction: column;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: 3.2rem;

    background: ${({ theme }) => theme.colors.white};
    position: sticky;
    top: calc(7rem + 1.6rem);

    & > *:not(:last-child)::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.1rem;
      border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
      margin-block: 2.4rem;
    }
  `,
  Title: styled.p`
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  LectureInfoList: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  InfoLabel: styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  InfoValue: styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
  DdayTag: styled.span<{ $variant : "open" | "closed"}>`
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0.8rem;
    height: 2.4rem;
    border-radius: ${({ theme }) => theme.radius.xs};

  ${({ $variant, theme }) => {
    const variants = {
      open: css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.primary300};
      `,
      closed: css`
        color: ${theme.colors.gray300};
        background-color: ${theme.colors.gray200};
      `,
    };
    return variants[$variant];
  }}
  `,
  Price: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary300};;
    text-align: left;
    margin-bottom: 1.2rem;
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
};

export default LectureInfoBox;