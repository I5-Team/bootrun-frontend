import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockCardData } from '../../../data/mockData';
import type { CardData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from './HelperComponents';
import Button from '../../../components/Button';
import ShareIcon from '../../../assets/icons/icon-share.svg?react';



const LectureInfoBox: React.FC = () => {
  const { data, loading, error } = useApiData<CardData>(mockCardData, 200);

  return (
    <S.FloatingCardWrapper>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <>
          <S.Content>
            <S.Title>{data.title}</S.Title>
            <S.LectureInfoList>
              {data.items.map((item) => (
                <li key={item.label}>
                  <S.InfoLabel>{item.label}</S.InfoLabel>
                  <S.InfoValue>
                    <span style={{ whiteSpace: 'nowrap' }}>{item.value}</span>
                    {item.isClosed && (
                      <S.DdayClosed>모집마감</S.DdayClosed>
                    )}
                  </S.InfoValue>
                </li>
              ))}
            </S.LectureInfoList>
            <S.Price>{data.price}</S.Price>
          </S.Content>

          <S.ButtonContainer>
            <Button variant='primary' fullWidth disabled={data.status === 'closed'}>
              {data.status === 'closed' ? '수강신청 마감' : '수강신청 하기'}
            </Button>
            <Button variant='outline' fullWidth aria-label="강의 링크 공유하기" iconSvg={<ShareIcon/>}>
              공유하기
            </Button>
          </S.ButtonContainer>
        </>
      )}
    </S.FloatingCardWrapper>
  );
};

// --- Styles (HTML 클래스명 기반으로 재정리) ---
const S = {
  FloatingCardWrapper: styled.aside`
    /* _container_8lgj3_34 */
    width: 360px;
    display: flex;
    flex-direction: column;
    border: 1px solid #d9dbe0;
    border-radius: 12px;
    background: #ffffff;
    position: sticky;
    top: 140px; 
    box-sizing: border-box;
    /* 내부에 padding을 주는 대신, content와 button 영역으로 분리 */
  `,
  Content: styled.div`
    /* _content_8lgj3_49 */
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Title: styled.p`
    /* _title_8lgj3_14 */
    font-size: 18px;
    font-weight: 700;
    color: #121314;
    margin: 0;
  `,
  LectureInfoList: styled.ul`
    /* _lectureInfo_8lgj3_71 */
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  InfoLabel: styled.span`
    /* _label_8lgj3_10 */
    font-size: 16px;
    font-weight: 500;
    color: #8D9299;
  `,
  InfoValue: styled.span`
    /* _value_8lgj3_10 */
    font-size: 16px;
    font-weight: 600;
    color: #121314;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  DdayClosed: styled.span`
    /* _ddayClosed_8lgj3_6 */
    font-size: 12px;
    font-weight: 600;
    color: #FF4D4D; // (색상 추정)
    background-color: #FFF0F0; // (색상 추정)
    padding: 4px 8px;
    border-radius: 4px;
  `,
  Price: styled.p`
    /* _price_8lgj3_22 */
    font-size: 24px;
    font-weight: 600;
    color: #121314;
    margin: 8px 0 0; /* 위 목록과의 여백 */
    text-align: right;
  `,
  ButtonContainer: styled.div`
    /* _btnContainer_8lgj3_145 */
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 24px 24px; /* 하단 버튼 영역 패딩 */
    border-top: 1px solid #F3F5FA; // (스타일 추가)
    padding-top: 24px; // (스타일 추가)
  `,
  PrimaryButton: styled.button`
    /* _solid_hjb3g_64, _mainBtn_8lgj3_176 */
    width: 100%;
    height: 48px;
    background: #2e6ff2;
    border-radius: 10px;
    border: none;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
    
    &:disabled {
      background: #D9DBE0; // (비활성 색상 추정)
      color: #8D9299;
      cursor: not-allowed;
    }
  `,
  SecondaryButton: styled.button`
    /* _outline_hjb3g_74, _shareBtn_8lgj3_173 */
    width: 100%;
    height: 48px;
    background: #ffffff;
    border: 1px solid #d9dbe0;
    border-radius: 10px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    
    font-weight: 500;
    font-size: 14px;
    color: #121314;
    cursor: pointer;

    svg {
      fill: #8D9299;
    }

    &:hover {
      background: #f3f5fa;
    }
  `,
};

export default LectureInfoBox;