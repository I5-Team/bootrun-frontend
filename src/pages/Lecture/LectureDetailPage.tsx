import { useRef } from 'react';
import type { SectionRefs } from '../../types/LectureType';

// 스타일
import {
  LectureMainLayout,
  ContentWrapper,
  SectionWrapper,
} from './LectureDetailPage.styled';

// 컴포넌트
import LectureBannerSection from './components/LectureBannerSection';
import LectureHeaderSection from './components/LectureHeaderSection';
import { SectionTabs } from './components/SectionTabs';
import LectureInfoBox from './components/LectureInfoBox';
import LectureIntroSection from './components/LectureIntroSection';
import CurriculumSection from './components/CurriculumSection';
import InstructorSection from './components/InstructorSection';
import FAQSection from './components/FAQSection';
import NoticeSection from './components/NoticeSection';
import ReviewSection from './components/ReviewSection';

export default function LectureDetailPage() {
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

  return (
      <>
        <LectureBannerSection />

        <LectureMainLayout>
          {/* 메인 콘텐츠 영역 (왼쪽) */}
          <ContentWrapper>
            <LectureHeaderSection />

            <SectionWrapper>
              <SectionTabs refs={sectionRefs} />
              {/* 각 섹션은 ref를 받고, 데이터는 내부의 useApiData 훅으로 가져온다. */}
              <LectureIntroSection ref={introRef} />
              <ReviewSection ref={reviewsRef} />
              <CurriculumSection ref={curriculumRef} />
              <InstructorSection ref={instructorRef} />
              <FAQSection ref={faqRef} />
              <NoticeSection />
            </SectionWrapper>
          </ContentWrapper>

          {/* 고정 사이드바 (오른쪽) */}
          <LectureInfoBox />
        </LectureMainLayout>
      </>
  );
}
