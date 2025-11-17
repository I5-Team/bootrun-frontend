import React from 'react';
import Notice from '../styles/NoticeSection.styled';
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

export default NoticeSection;
