import React, { useRef, useState } from 'react';
import { StyledBaseSection as S } from '../styles/LectureDetailPage.styled';
import Curr from '../styles/CurriculumSection.styled';

import type { LectureItem } from '../../../types/CourseType';

import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';
import SvgPlay from '../../../assets/icons/icon-play.svg?react';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';

const CurriculumSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();
  const chapterData = data.chapters;

  const [openChapterIndex, setOpenChapterIndex] = useState<number[]>([1]);
  const chapterRefs = useRef<Record<number, HTMLUListElement | null>>({});

  const toggleChapter = (index: number) => {
    setOpenChapterIndex((prev) =>
      prev.includes(index) ? prev.filter((ch) => ch !== index) : [...prev, index]
    );
  };

  return (
    <S.Section ref={ref} id="curriculum">
      <S.SectionHeader>
        <S.SectionTitle>커리큘럼</S.SectionTitle>
        <S.SectionSubtitle>{chapterData?.[0]?.description ?? '커리큘럼 소개'}</S.SectionSubtitle>
      </S.SectionHeader>

      <Curr.Container>
        {!chapterData || chapterData.length === 0 ? (
          <Curr.Chapter $isOpen={true}>
            <Curr.ChapterHeaderButton style={{ cursor: 'default' }}>
              <Curr.ToggleIcon $isOpen={true}>
                <SvgArrowDown />
              </Curr.ToggleIcon>
              <Curr.ChapterTitleText>커리큘럼 준비중</Curr.ChapterTitleText>
            </Curr.ChapterHeaderButton>

            <Curr.LectureList>
              <Curr.LectureItem>
                <SvgPlay aria-hidden={true} />
                등록된 강의가 없습니다.
              </Curr.LectureItem>
            </Curr.LectureList>
          </Curr.Chapter>
        ) : (
          <>
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
                    ref={(el) => {
                      chapterRefs.current[chapter.order_number] = el;
                    }}
                    style={{
                      height: isOpen
                        ? chapterRefs.current[chapter.order_number]?.scrollHeight + 'px'
                        : '0px',
                    }}
                    id={`chapter${chapter.order_number}-panel`}
                    aria-labelledby={`chapter${chapter.order_number}`}
                  >
                    {chapter.lectures && chapter.lectures.length > 0 ? (
                      (chapter.lectures as LectureItem[]).map((lecture) => (
                        <Curr.LectureItem key={lecture.title}>
                          <SvgPlay aria-hidden={true} />
                          {lecture.order_number}. {lecture.title}
                        </Curr.LectureItem>
                      ))
                    ) : (
                      <Curr.LectureItem>등록된 강의가 없습니다.</Curr.LectureItem>
                    )}
                  </Curr.LectureList>
                </Curr.Chapter>
              );
            })}
          </>
        )}
      </Curr.Container>
    </S.Section>
  );
});

export default CurriculumSection;
