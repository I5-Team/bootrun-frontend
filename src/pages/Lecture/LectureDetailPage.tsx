import { useRef } from 'react';
import type { SectionRefs } from '../../types/LectureType';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useParams } from 'react-router-dom';
import { useCourseDetailQuery } from '../../queries/useCourseQueries';

// 스타일
import {
  LectureMainLayout,
  ContentWrapper,
  SectionWrapper,
} from './LectureDetailPage.styled';

// 컴포넌트
import LectureBannerSection from './components/LectureBannerSection';
import LectureHeaderSection from './components/LectureHeaderSection';
import LectureIntroSection from './components/LectureIntroSection';
import CurriculumSection from './components/CurriculumSection';
import InstructorSection from './components/InstructorSection';
import FAQSection from './components/FAQSection';
import NoticeSection from './components/NoticeSection';
import ReviewSection from './components/ReviewSection';
import { SectionTabs } from './components/SectionTabs';
import { LectureInfoBox, InfoBoxButtons } from './components/LectureInfoBox';
import { LoadingSpinner } from '../../components/HelperComponents';

// 함수
export const formatDate = (dateString: string): string => {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const weekDayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDayNames[date.getDay()];

  return `${year}.${month}.${day}(${weekDay})`;
};

//
export default function LectureDetailPage() {
  const { isLaptop } = useMediaQuery();
  const params = useParams<{ id: string }>();
  const coursdId = Number(params.id);
  const { data: courseData, isLoading } = useCourseDetailQuery(coursdId);
  
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
        {isLoading
          ? <LoadingSpinner/>
          : courseData && (
            <>
              <LectureBannerSection data={courseData}/>
              <LectureMainLayout>
                {courseData && 
                  <ContentWrapper>
                    {/* 헤더 영역 (왼쪽) */}
                    <LectureHeaderSection data={courseData}/>
    
                    {/* 고정 사이드바 (오른쪽) */}
                    <LectureInfoBox data={courseData} />
    
                    {/* 메인 콘텐츠 영역 (왼쪽) */}
                    <SectionWrapper>
                      <SectionTabs refs={sectionRefs}/>

                      <LectureIntroSection ref={introRef} data={courseData}/>
                      <ReviewSection ref={reviewsRef} data={courseData.student_reviews}/>
                      <CurriculumSection ref={curriculumRef} data={courseData.chapters}/>
                      <InstructorSection ref={instructorRef} data={courseData}/>
                      <FAQSection ref={faqRef} data={courseData.faq}/>
                      <NoticeSection />
                    </SectionWrapper>
    
                    {isLaptop && <InfoBoxButtons/>}
                  </ContentWrapper>
                }
              </LectureMainLayout>
            </>
          )
        }
      </>
  );
}
