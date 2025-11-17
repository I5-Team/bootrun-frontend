import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";

import type { LectureItem } from '../../../types/CourseType';

import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';
import SvgPlay from "../../../assets/icons/icon-play.svg?react";
import { useLectureContext } from '../../../layouts/LectureDetailLayout';


const CurriculumSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();
  const chapterData = data.chapters;

  const [openChapterIndex, setOpenChapterIndex] = useState<number[]>([1]);
  const chapterRefs = useRef<Record<number, HTMLUListElement | null>>({});

  const toggleChapter = (index: number) => {
    setOpenChapterIndex(prev => prev.includes(index) 
      ? prev.filter(ch => ch !== index) 
      : [...prev, index]);
  };

  return (
    <S.Section ref={ref} id="curriculum">
      <S.SectionHeader>
        <S.SectionTitle>커리큘럼</S.SectionTitle>
        <S.SectionSubtitle>{chapterData?.[0]?.description ?? '커리큘럼 소개'}</S.SectionSubtitle>
      </S.SectionHeader>

      <Curr.Container>
        {!chapterData || chapterData.length === 0
        ? <Curr.Chapter $isOpen={true}>
            <Curr.ChapterHeaderButton
              style={{cursor: 'default'}}            
            >
              <Curr.ToggleIcon $isOpen={true}>
                <SvgArrowDown /> 
              </Curr.ToggleIcon>
              <Curr.ChapterTitleText>
                커리큘럼 준비중
              </Curr.ChapterTitleText>
            </Curr.ChapterHeaderButton>

            <Curr.LectureList>
                <Curr.LectureItem>
                  <SvgPlay aria-hidden={true}/>
                    등록된 강의가 없습니다.
                </Curr.LectureItem>
            </Curr.LectureList>
          </Curr.Chapter>
        :  <>
            {chapterData.map((chapter) => {
              const isOpen = openChapterIndex.includes(chapter.order_number);
              return (
                <Curr.Chapter key={chapter.id} $isOpen={isOpen}>
  
                  <Curr.ChapterHeaderButton 
                    onClick={() => toggleChapter(chapter.order_number)}
                    id={`chapter${chapter.order_number}`}
                    aria-controls={`chapter${chapter.order_number}-panel`}
                    aria-expanded={isOpen}
                  >
                    <Curr.ToggleIcon $isOpen={isOpen}>
                      <SvgArrowDown /> 
                    </Curr.ToggleIcon>
                    <Curr.ChapterTitleText>
                      Chapter{String(chapter.order_number).padStart(2, '0')}.&nbsp;{chapter.title}
                    </Curr.ChapterTitleText>
                  </Curr.ChapterHeaderButton>
  
                  <Curr.LectureList
                    aria-hidden={!isOpen}
                    ref={(el) => {chapterRefs.current[chapter.order_number] = el}}
                    style={{
                      height: isOpen
                        ? chapterRefs.current[chapter.order_number]?.scrollHeight + 'px'
                        : '0px'
                    }}
                    id={`chapter${chapter.order_number}-panel`}
                    aria-labelledby={`chapter${chapter.order_number}`}
                  >
                    {chapter.lectures && chapter.lectures.length > 0 ? (
                      (chapter.lectures as LectureItem[]).map((lecture) => (
                        <Curr.LectureItem key={lecture.title}>
                          <SvgPlay aria-hidden={true}/>
                            {lecture.order_number}. {lecture.title}
                        </Curr.LectureItem>
                      ))
                    ) : (
                        <Curr.LectureItem>
                            등록된 강의가 없습니다.
                        </Curr.LectureItem>
                    )}
                  </Curr.LectureList>
                  
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
  Chapter: styled.div<{ $isOpen: boolean }>`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    &:last-child {
      border-bottom: none;
    }
    overflow: hidden;
  `,
  ChapterHeaderButton: styled.button`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray100};
  `,
  ToggleIcon: styled.span<{ $isOpen: boolean }>`
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
    transition: transform 0.3s ease;

    svg {
      width: 50%;
    }
  `,
  ChapterTitleText: styled.span`
    font-weight: 500;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  LectureList: styled.ul`
    background: ${({ theme }) => theme.colors.white};
    transition: height 0.3s ease;
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
};

export default CurriculumSection;
