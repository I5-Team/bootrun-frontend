import React, { useState } from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockCurriculumData } from '../../../data/mockData';
import type { CurriculumData } from '../../../types/LectureType';
import { ErrorMessage, LoadingSpinner } from '../../../components/HelperComponents';
import ArrowDownIcon from '../../../assets/icons/icon-arrow-down.svg?react';



const CurriculumSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data, loading, error } = useApiData<CurriculumData>(mockCurriculumData, 700);
  // 1주차(id: 1)만 기본으로 열도록 설정
  const [openChapterId, setOpenChapterId] = useState<number | null>(1);

  const toggleChapter = (id: number) => {
    setOpenChapterId(openChapterId === id ? null : id);
  };

  return (
    <S.Section ref={ref} id="curriculum">
      <S.SectionHeader>
        <S.SectionTitle>커리큘럼</S.SectionTitle>
        <S.SectionSubtitle>4주간 진행하는 견고한 커리큘럼</S.SectionSubtitle>
      </S.SectionHeader>

      <S.CurriculumContainer>
        {loading && <LoadingSpinner/>}
        {error && <ErrorMessage message={error.message} />}
        {data?.chapters.map(chapter => {
          const isOpen = openChapterId === chapter.id;
          return (
            <S.Chapter key={chapter.id}>
              <S.ChapterHeader onClick={() => toggleChapter(chapter.id)}>
                <S.ToggleButton $isOpen={isOpen}>
                  <ArrowDownIcon /> 
                </S.ToggleButton>
                <S.ChapterTitleText>
                  <span>Chapter{String(chapter.id).padStart(2, '0')}.&nbsp;</span>{chapter.title}
                </S.ChapterTitleText>
              </S.ChapterHeader>
              {isOpen && (
                <S.LectureList>
                  {chapter.lectures.map((lecture, index) => (
                    <S.LectureItem key={index}>
                      <S.LectureIcon>
                        <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M6.50879 5.47559C6.69956 5.36985 6.9332 5.37561 7.11816 5.49121L10.3184 7.49121C10.4936 7.60088 10.5996 7.79323 10.5996 8C10.5996 8.20677 10.4936 8.39912 10.3184 8.50879L7.11816 10.5088C6.9332 10.6244 6.69956 10.6301 6.50879 10.5244C6.31827 10.4186 6.2002 10.218 6.2002 10V6C6.2002 5.78205 6.31827 5.58138 6.50879 5.47559Z"></path></svg>
                      </S.LectureIcon>
                      <S.LectureTitle>
                        <span>{index + 1}.&nbsp;</span>{lecture.title}
                      </S.LectureTitle>
                    </S.LectureItem>
                  ))}
                </S.LectureList>
              )}
            </S.Chapter>
          );
        })}
      </S.CurriculumContainer>
    </S.Section>
  );
});

const S = {
  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    scroll-margin-top: 100px;
  `,
  SectionHeader: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,
  SectionTitle: styled.h2`
    font-weight: 700;
    font-size: 32px;
    color: #121314;
    margin: 0;
  `,
  SectionSubtitle: styled.p`
    font-weight: 600;
    font-size: 16px;
    color: #2e6ff2;
    margin: 0;
  `,
  CurriculumContainer: styled.div`
    border: 1px solid #D9DBE0;
    border-radius: 12px;
    width: 790px;
    overflow: hidden;
  `,
  Chapter: styled.div`
    border-bottom: 1px solid #D9DBE0;
    &:last-child {
      border-bottom: none;
    }
  `,
  ChapterHeader: styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    background: #F3F5FA;
  `,
  ToggleButton: styled.button<{ $isOpen: boolean }>`
    background: #fff;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #47494D;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
    transition: transform 0.2s ease;
  `,
  ChapterTitleText: styled.h4`
    font-size: 16px;
    font-weight: 500;
    color: #121314;
    margin: 0 0 0 12px;
    span { font-weight: 700; }
  `,
  LectureList: styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    background: #fff;
  `,
  LectureItem: styled.li`
    display: flex;
    align-items: center;
    padding: 16px 20px 16px 52px; /* 20 + 20 + 12 */
    border-top: 1px solid #F3F5FA;
  `,
  LectureIcon: styled.div`
    color: #47494D;
    margin-right: 8px;
  `,
  LectureTitle: styled.h5`
    font-size: 16px;
    font-weight: 400;
    color: #121314;
    margin: 0;
    span { font-weight: 500; }
  `,
};

export default CurriculumSection;
