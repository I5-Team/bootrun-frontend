import { useRef } from 'react';
import type { SectionRefs } from '../../types/LectureType';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useParams } from 'react-router-dom';
import type { CoursesDetailItem } from '../../types/CourseType';
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
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0부터 시작하므로 +1
  const day = date.getDate();

  const weekDayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDayNames[date.getDay()];

  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}(${weekDay})`;
}

//
export default function LectureDetailPage() {
  // 임시 데이터
  const schedule = {
    enrollment: { label: '모집 기간', start: '2025-07-01T15:00:00.000Z', end: '2025-07-27T15:00:00.000Z' },
    learning: { label: '교육 기간', start: '2025-07-28T15:00:00.000Z', end: '2025-08-27T15:00:00.000Z' },
  }

  const { isLaptop } = useMediaQuery();
  const params = useParams<{ id: string }>();
  const coursdId = Number(params.id);
  const { data, isLoading } = useCourseDetailQuery(coursdId);
  const courseData = { ...data, schedule } as CoursesDetailItem;
  console.log('[강의 상세 페이지 | 데이터]', courseData);
  
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
        : 
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
                    <SectionTabs refs={sectionRefs} />

                    <LectureIntroSection ref={introRef} />
                    <ReviewSection ref={reviewsRef} />
                    <CurriculumSection ref={curriculumRef} data={courseData.chapters}/>
                    <InstructorSection ref={instructorRef} data={courseData}/>
                    <FAQSection ref={faqRef} data={courseData}/>
                    <NoticeSection />
                  </SectionWrapper>
  
                  {isLaptop && <InfoBoxButtons/>}
                </ContentWrapper>
              }
            </LectureMainLayout>
          </>
        }
      </>
  );
}
