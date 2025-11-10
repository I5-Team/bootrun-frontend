import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockNoticeData } from '../../../data/mockLectureData';
import type { NoticeData } from '../../../types/LectureType';

const NoticeSection: React.FC = () => {
  const { data } = useApiData<NoticeData>(mockNoticeData, 100);

  if (!data) return null; // 로딩/에러는 생략 (간단한 컴포넌트)

  return (
    <Notice.NoticeWrapper>
      <Notice.NoticeTitle>{data.title}</Notice.NoticeTitle>
      <Notice.NoticeList>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </Notice.NoticeList>
    </Notice.NoticeWrapper>
  );
};
const Notice = {
  NoticeWrapper: styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 3.2rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray400};
  `,
  NoticeTitle: styled.strong`
    font-weight: 500;
    display: block;
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  NoticeList: styled.ul`
    list-style: disc;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
};

export default NoticeSection;