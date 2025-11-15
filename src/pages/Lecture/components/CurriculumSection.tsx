import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';
import SvgPlay from "../../../assets/icons/icon-play.svg?react";
import type { ChapterItem, LectureItem } from '../../../types/CourseType';

type CurriculumSectionProps = {
  data?: ChapterItem[] | null;
}

const CurriculumSection = React.forwardRef<HTMLElement, CurriculumSectionProps>(({ data: chapterData }, ref) => {
  // 1주차(id: 1)만 기본으로 열도록 설정
  const [openChapterId, setOpenChapterId] = useState<number[]>([1]);

  const toggleChapter = (id: number) => {
    setOpenChapterId(prev => prev.includes(id) ? prev.filter(ch => ch !== id) : [...prev, id]);
  };

  return (
    <S.Section ref={ref} id="curriculum">
      <S.SectionHeader>
        <S.SectionTitle>커리큘럼</S.SectionTitle>
        {/* 임시 처리 */}
        <S.SectionSubtitle>{chapterData?.[0]?.description ?? '커리큘럼 소개'}</S.SectionSubtitle>
      </S.SectionHeader>

      <Curr.Container>
        {!chapterData || chapterData.length === 0
        ? <Curr.Chapter>
            <Curr.ChapterHeader>
              <Curr.ToggleButton $isOpen={true}>
                <SvgArrowDown /> 
              </Curr.ToggleButton>
              <Curr.ChapterTitleText>
                <span>커리큘럼 준비중</span>
              </Curr.ChapterTitleText>
            </Curr.ChapterHeader>

            <Curr.LectureList>
                <Curr.LectureItem>
                  <SvgPlay/>
                  <Curr.LectureTitle>
                    등록된 강의가 없습니다.
                  </Curr.LectureTitle>
                </Curr.LectureItem>

            </Curr.LectureList>
          </Curr.Chapter>
        :  <>
            {chapterData?.map((chapter, index) => {
              const isOpen = openChapterId.includes(chapter.id);
              return (
                <Curr.Chapter key={chapter.id}>
  
                  <Curr.ChapterHeader onClick={() => toggleChapter(chapter.id)}>
                    <Curr.ToggleButton $isOpen={isOpen}>
                      <SvgArrowDown /> 
                    </Curr.ToggleButton>
                    <Curr.ChapterTitleText>
                      <span>Chapter{String(index + 1).padStart(2, '0')}.</span>
                      <span>{chapter.title}</span>
                    </Curr.ChapterTitleText>
                  </Curr.ChapterHeader>
  
                  {isOpen && (
                    <Curr.LectureList>
                      {(chapter?.lectures ?? [] as LectureItem[]).map((lecture, index) => (
                        <Curr.LectureItem key={lecture.title}>
                          <SvgPlay/>
                          <Curr.LectureTitle>
                            {index + 1}. {lecture.title}
                          </Curr.LectureTitle>
                        </Curr.LectureItem>
                      ))}
                    </Curr.LectureList>
                  )}
                </Curr.Chapter>
              );
            })}
        </>
        }
      </Curr.Container>
    </S.Section>
  );
});

const Curr = {
  Container: styled.div`
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xl};
    width: 100%;
    overflow: hidden;
  `,
  Chapter: styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    &:last-child {
      border-bottom: none;
    }
  `,
  ChapterHeader: styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 1.2rem;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray100};
  `,
  ToggleButton: styled.button<{ $isOpen: boolean }>`
    background: ${({ theme }) => theme.colors.white};
    border: none;
    width: 2rem;
    height: 2rem;
    border-radius: 0.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.8rem;

    color: ${({ theme }) => theme.colors.gray400};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
    transition: transform 0.2s ease;

    svg {
      width: 50%;
    }
  `,
  ChapterTitleText: styled.p`
    font-weight: 500;
    display: flex;
    gap: 0.4rem;
    span { font-weight: 600; }
  `,
  LectureList: styled.ul`
    background: ${({ theme }) => theme.colors.white};
  `,
  LectureItem: styled.li`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding-block: 1.6rem;
    padding-inline: 5.2rem 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary100};
    }

    svg {
      width: 1.4rem;
      height: 1.4rem;
      path { fill: ${({ theme }) => theme.colors.gray400}; }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  LectureTitle: styled.span`
    span { font-weight: 400; }
  `,
};

export default CurriculumSection;
