import { useRef } from 'react';
import type { SectionRefs } from '../../../types/LectureType';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useLectureContext } from '../../../context/LectureContext';

// 스타일
import { ContentWrapper, SectionWrapper } from '../styles/LectureDetailPage.styled';

// 컴포넌트
import LectureBannerSection from '../components/LectureBannerSection';
import LectureHeaderSection from '../components/LectureHeaderSection';
import LectureIntroSection from '../components/LectureIntroSection';
import CurriculumSection from '../components/CurriculumSection';
import InstructorSection from '../components/InstructorSection';
import FAQSection from '../components/FAQSection';
import NoticeSection from '../components/NoticeSection';
import ReviewSection from '../components/ReviewSection';
import { SectionTabs } from '../components/SectionTabs';
import { LectureInfoBox, InfoBoxButtons } from '../components/LectureInfoBox';
import { usePageMeta } from '../../../hooks/usePageMeta';

// 함수


//
export default function LectureDetailPage() {
  const { isLaptop } = useMediaQuery();
  const { data } = useLectureContext();

  // 1. 스크롤을 위한 Ref 생성
  const introRef = useRef<HTMLElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const instructorRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  // 2. Ref 객체를 SectionTabs에 전달
  const sectionRefs: SectionRefs = {
    introRef,
    reviewsRef,
    curriculumRef,
    instructorRef,
    faqRef,
  };

  const metaHelmet = usePageMeta({
    title: `${data.title} - 강의 상세 | 부트런`,
    description: data.description,
    thumbnail: data.thumbnail_url,
  });

  return (
    <>
      {metaHelmet}

      <LectureBannerSection />

      <ContentWrapper>
        {/* 헤더 영역 (왼쪽) */}
        <LectureHeaderSection />

        {/* 고정 사이드바 (오른쪽) */}
        {!isLaptop && <LectureInfoBox />}
        {isLaptop && <InfoBoxButtons />}

        {/* 메인 콘텐츠 영역 (왼쪽) */}
        <SectionWrapper>
          <SectionTabs refs={sectionRefs} />

          <LectureIntroSection ref={introRef} />
          <ReviewSection ref={reviewsRef} />
          <CurriculumSection ref={curriculumRef} />
          <InstructorSection ref={instructorRef} />
          <FAQSection ref={faqRef} />
          <NoticeSection />
        </SectionWrapper>
      </ContentWrapper>
    </>
  );
}
