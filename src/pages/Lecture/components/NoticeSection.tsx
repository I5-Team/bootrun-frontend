import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockNoticeData } from '../../../data/mockLectureData';
import type { NoticeData } from '../../../types/LectureType';

const NoticeSection: React.FC = () => {
  const { data } = useApiData<NoticeData>(mockNoticeData, 100);

  if (!data) return null; // 로딩/에러는 생략 (간단한 컴포넌트)

  return (
    <S.NoticeWrapper>
      <S.NoticeTitle>{data.title}</S.NoticeTitle>
      <S.NoticeList>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </S.NoticeList>
    </S.NoticeWrapper>
  );
};
const S = {
  NoticeWrapper: styled.section`
    width: 100%;
    background: #F3F5FA;
    border-radius: 12px;
    padding: 32px;
    box-sizing: border-box;
    font-size: 14px;
    color: #47494D;
  `,
  NoticeTitle: styled.strong`
    font-weight: 700;
    color: #121314;
    display: block;
    margin-bottom: 12px;
  `,
  NoticeList: styled.ul`
    list-style: disc;
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};

export default NoticeSection;